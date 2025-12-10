/**
 * API Service - Handles all backend communication
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api/v1';


// Token management
const TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

export const TokenService = {
  getAccessToken: () => localStorage.getItem(TOKEN_KEY),
  getRefreshToken: () => localStorage.getItem(REFRESH_TOKEN_KEY),
  setTokens: (accessToken: string, refreshToken: string) => {
    localStorage.setItem(TOKEN_KEY, accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  },
  clearTokens: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },
};

// Base fetch wrapper
async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = TokenService.getAccessToken();

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    (headers as Record<string, string>).Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    if (response.status === 401) {
      // Token expired - redirect to login
      TokenService.clearTokens();
      window.location.href = '/login';
    }
    const error = await response.json().catch(() => ({ message: 'An error occurred' }));
    throw new Error(error.message || `HTTP ${response.status}`);
  }

  return response.json();
}

// Authentication API
export const AuthAPI = {
  register: async (data: {
    email: string;
    password: string;
    password2: string;
    first_name: string;
    last_name: string;
  }) => {
    const response = await fetchAPI('/auth/register/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    TokenService.setTokens(response.tokens.access, response.tokens.refresh);
    return response;
  },

  login: async (email: string, password: string) => {
    const response = await fetchAPI('/auth/login/', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    TokenService.setTokens(response.tokens.access, response.tokens.refresh);
    return response;
  },

  logout: () => {
    TokenService.clearTokens();
    window.location.href = '/login';
  },

  getCurrentUser: () => fetchAPI('/auth/me/'),

  updateProfile: (data: Partial<{ first_name: string; last_name: string; avatar_url: string }>) =>
    fetchAPI('/auth/update_profile/', {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),
};

// Organizations API
export const OrganizationsAPI = {
  list: () => fetchAPI('/organizations/'),
  get: (id: string) => fetchAPI(`/organizations/${id}/`),
  create: (data: any) => fetchAPI('/organizations/', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: string, data: any) => fetchAPI(`/organizations/${id}/`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  }),
  delete: (id: string) => fetchAPI(`/organizations/${id}/`, { method: 'DELETE' }),
  getMembers: (id: string) => fetchAPI(`/organizations/${id}/members/`),
  addMember: (id: string, data: any) => fetchAPI(`/organizations/${id}/add_member/`, {
    method: 'POST',
    body: JSON.stringify(data),
  }),
};

// Projects API
export const ProjectsAPI = {
  list: () => fetchAPI('/projects/'),
  get: (id: string) => fetchAPI(`/projects/${id}/`),
  create: (data: any) => fetchAPI('/projects/', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: string, data: any) => fetchAPI(`/projects/${id}/`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  }),
  delete: (id: string) => fetchAPI(`/projects/${id}/`, { method: 'DELETE' }),
  getMembers: (id: string) => fetchAPI(`/projects/${id}/members/`),
  getChatbots: (id: string) => fetchAPI(`/projects/${id}/chatbots/`),
  getKnowledgeBases: (id: string) => fetchAPI(`/projects/${id}/knowledge_bases/`),
};

// Chatbots API
export const ChatbotsAPI = {
  list: () => fetchAPI('/chatbots/'),
  get: (id: string) => fetchAPI(`/chatbots/${id}/`),
  create: (data: any) => 
    fetchAPI('/chatbots/', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  update: (id: string, data: any) => 
    fetchAPI(`/chatbots/${id}/`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),
  delete: (id: string) => 
    fetchAPI(`/chatbots/${id}/`, {
      method: 'DELETE',
    }),
  
  // Chatbot-specific actions
  chat: (id: string, data: { message: string; session_id?: string; user_identifier?: string }) =>
    fetchAPI(`/chatbots/${id}/chat/`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  
  getConversations: (id: string) => fetchAPI(`/chatbots/${id}/conversations/`),
  
  getKnowledgeBases: (id: string) => fetchAPI(`/chatbots/${id}/knowledge_bases/`),
  
  linkKnowledgeBase: (id: string, knowledgeBaseId: string, priority: number = 2) =>
    fetchAPI(`/chatbots/${id}/link_knowledge_base/`, {
      method: 'POST',
      body: JSON.stringify({
        knowledge_base: knowledgeBaseId,
        priority
      }),
    }),
  
  unlinkKnowledgeBase: (id: string, knowledgeBaseId: string) =>
    fetchAPI(`/chatbots/${id}/knowledge-bases/${knowledgeBaseId}/`, {
      method: 'DELETE',
    }),
};

// Knowledge Bases API
export const KnowledgeBasesAPI = {
  list: () => fetchAPI('/knowledge-bases/'),
  get: (id: string) => fetchAPI(`/knowledge-bases/${id}/`),
  create: (data: any) => fetchAPI('/knowledge-bases/', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: string, data: any) => fetchAPI(`/knowledge-bases/${id}/`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  }),
  delete: (id: string) => fetchAPI(`/knowledge-bases/${id}/`, { method: 'DELETE' }),
  getDocuments: (id: string) => fetchAPI(`/knowledge-bases/${id}/documents/`),
  uploadDocument: (id: string, data: any) => fetchAPI(`/knowledge-bases/${id}/upload_document/`, {
    method: 'POST',
    body: JSON.stringify(data),
  }),
};

// Documents API
export const DocumentsAPI = {
  list: () => fetchAPI('/documents/'),
  get: (id: string) => fetchAPI(`/documents/${id}/`),
  delete: (id: string) => fetchAPI(`/documents/${id}/`, { method: 'DELETE' }),
  process: (id: string) => fetchAPI(`/documents/${id}/process/`, { method: 'POST' }),
  getChunks: (id: string) => fetchAPI(`/documents/${id}/chunks/`),
};

// Conversations API
export const ConversationsAPI = {
  list: () => fetchAPI('/conversations/'),
  get: (id: string) => fetchAPI(`/conversations/${id}/`),
  delete: (id: string) => fetchAPI(`/conversations/${id}/`, { method: 'DELETE' }),
};

// Analytics API
export const AnalyticsAPI = {
  overview: () => fetchAPI('/analytics/overview/'),
  events: () => fetchAPI('/analytics/'),
};