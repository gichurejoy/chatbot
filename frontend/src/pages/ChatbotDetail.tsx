import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { 
  MessageSquareIcon, Settings2Icon, DatabaseIcon, BarChart3Icon, 
  PlayIcon, PauseIcon, RefreshCwIcon, MessageCircleIcon, ClockIcon, 
  CheckCircleIcon, XCircleIcon, PlusIcon, DownloadIcon, TrendingUpIcon, 
  CodeIcon, CopyIcon, ExternalLinkIcon, CheckIcon 
} from 'lucide-react';
import { ChatbotsAPI } from '../services/api';

interface Chatbot {
  id: string;
  name: string;
  description: string;
  type: string;
  status: string;
  project: string;
  project_name: string;
  ai_model: string;
  temperature: string;
  max_tokens: number;
  system_prompt: string;
  avatar_url: string;
  primary_color: string;
  conversations_count: number;
  knowledge_bases_count: number;
  created_at: string;
  updated_at: string;
  created_by_email: string;
}

interface KnowledgeBaseLink {
  id: string;
  knowledge_base: string;
  knowledge_base_name: string;
  priority: number;
}

interface Conversation {
  id: string;
  session_id: string;
  user_identifier: string;
  started_at: string;
  ended_at: string;
  messages_count: number;
}

export function ChatbotDetail() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('overview');
  const [chatbot, setChatbot] = useState<Chatbot | null>(null);
  const [knowledgeBases, setKnowledgeBases] = useState<KnowledgeBaseLink[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [copiedEmbed, setCopiedEmbed] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [widgetPosition, setWidgetPosition] = useState<'bottom-right' | 'bottom-left'>('bottom-right');
  const [widgetColor, setWidgetColor] = useState('#3B82F6');

  useEffect(() => {
    if (id) {
      fetchChatbotData();
    }
  }, [id]);

  const fetchChatbotData = async () => {
    try {
      setLoading(true);
      const [chatbotData, kbData, convData] = await Promise.all([
        ChatbotsAPI.get(id!),
        ChatbotsAPI.getKnowledgeBases(id!).catch(() => []),
        ChatbotsAPI.getConversations(id!).catch(() => [])
      ]);
      
      setChatbot(chatbotData);
      setKnowledgeBases(Array.isArray(kbData) ? kbData : []);
      setConversations(Array.isArray(convData) ? convData : []);
      
      if (chatbotData.primary_color) {
        setWidgetColor(chatbotData.primary_color);
      }
    } catch (err: any) {
      console.error('Failed to fetch chatbot:', err);
      setError('Failed to load chatbot details');
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: MessageSquareIcon },
    { id: 'settings', name: 'Settings', icon: Settings2Icon },
    { id: 'knowledge', name: 'Knowledge Base', icon: DatabaseIcon },
    { id: 'integration', name: 'Integration', icon: CodeIcon },
    { id: 'analytics', name: 'Analytics', icon: BarChart3Icon }
  ];

  const embedCode = chatbot ? `<!-- Add this script before closing </body> tag -->
<script>
  (function(w,d,s,o,f,js,fjs){
    w['ChatbotWidget']=o;w[o] = w[o] || function () { (w[o].q = w[o].q || []).push(arguments) };
    js = d.createElement(s), fjs = d.getElementsByTagName(s)[0];
    js.id = o; js.src = f; js.async = 1; fjs.parentNode.insertBefore(js, fjs);
  }(window, document, 'script', 'cbw', 'https://cdn.chatbot-stack.com/widget.js'));
  cbw('init', { 
    chatbotId: '${chatbot.id}',
    position: '${widgetPosition}',
    primaryColor: '${widgetColor}'
  });
</script>` : '';

  const directLink = chatbot ? `https://chat.chatbot-stack.com/bot/${chatbot.id}` : '';

  const handleCopyEmbed = () => {
    navigator.clipboard.writeText(embedCode);
    setCopiedEmbed(true);
    setTimeout(() => setCopiedEmbed(false), 2000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(directLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const getTypeDisplayName = (type: string) => {
    return type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays === 1) return 'Yesterday';
    return `${diffDays} days ago`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !chatbot) {
    return (
      <div className="space-y-6">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error || 'Chatbot not found'}
        </div>
        <Link to="/chatbots">
          <Button variant="outline">Back to Chatbots</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
        <div className="flex items-center">
          <div className="h-12 w-12 rounded-md bg-blue-100 flex items-center justify-center">
            <MessageSquareIcon className="h-6 w-6 text-blue-600" />
          </div>
          <div className="ml-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">{chatbot.name}</h1>
              <Badge 
                variant={chatbot.status === 'active' ? 'success' : chatbot.status === 'training' ? 'info' : 'default'} 
                className="ml-3"
              >
                {chatbot.status}
              </Badge>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              {getTypeDisplayName(chatbot.type)} • Project: {chatbot.project_name}
            </p>
          </div>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" icon={<RefreshCwIcon className="h-5 w-5" />}>
            Retrain
          </Button>
          {chatbot.status === 'active' ? (
            <Button variant="outline" icon={<PauseIcon className="h-5 w-5" />}>
              Pause
            </Button>
          ) : (
            <Button variant="primary" icon={<PlayIcon className="h-5 w-5" />}>
              Activate
            </Button>
          )}
          <Button 
            variant="primary" 
            icon={<MessageCircleIcon className="h-5 w-5" />}
            as={Link}
            to={`/chatbots/${id}/test`}
          >
            Test Chat
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
        {/* Tabs Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <Card>
            <CardContent className="p-0">
              <nav className="flex flex-col">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center px-4 py-3 text-sm font-medium ${
                      activeTab === tab.id
                        ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <tab.icon className="h-5 w-5 mr-3" />
                    {tab.name}
                  </button>
                ))}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Area */}
        <div className="flex-1">
          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <h2 className="text-lg font-medium text-gray-900">Chatbot Information</h2>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Description</h3>
                      <p className="mt-1 text-sm text-gray-900">
                        {chatbot.description || 'No description provided'}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">System Prompt</h3>
                      <p className="mt-1 text-sm text-gray-900">
                        {chatbot.system_prompt || 'No system prompt configured'}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">AI Model</h3>
                      <p className="mt-1 text-sm text-gray-900">{chatbot.ai_model}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Created</h3>
                      <p className="mt-1 text-sm text-gray-900">
                        {formatDate(chatbot.created_at)} by {chatbot.created_by_email}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Knowledge Bases</h3>
                      <div className="mt-1 flex flex-wrap gap-2">
                        {knowledgeBases.length > 0 ? (
                          knowledgeBases.map((kb) => (
                            <Badge key={kb.id} variant="info">
                              {kb.knowledge_base_name}
                            </Badge>
                          ))
                        ) : (
                          <span className="text-sm text-gray-500">No knowledge bases linked</span>
                        )}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Last Updated</h3>
                      <p className="mt-1 text-sm text-gray-900">{getTimeAgo(chatbot.updated_at)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className="p-2 rounded-md bg-blue-100">
                        <MessageSquareIcon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-500">Total Conversations</div>
                        <div className="mt-1 text-2xl font-semibold text-gray-900">
                          {chatbot.conversations_count.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className="p-2 rounded-md bg-green-100">
                        <CheckCircleIcon className="h-6 w-6 text-green-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-500">Status</div>
                        <div className="mt-1 text-2xl font-semibold text-gray-900 capitalize">
                          {chatbot.status}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className="p-2 rounded-md bg-purple-100">
                        <DatabaseIcon className="h-6 w-6 text-purple-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-500">Knowledge Bases</div>
                        <div className="mt-1 text-2xl font-semibold text-gray-900">
                          {chatbot.knowledge_bases_count}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Conversations */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-medium text-gray-900">Recent Conversations</h2>
                    <Button variant="outline" size="sm">View All</Button>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  {conversations.length > 0 ? (
                    <div className="divide-y divide-gray-200">
                      {conversations.slice(0, 5).map((conv) => (
                        <div key={conv.id} className="px-6 py-4 hover:bg-gray-50">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center font-medium text-gray-600">
                                {conv.user_identifier?.substring(0, 2).toUpperCase() || 'AN'}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {conv.user_identifier || 'Anonymous'}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {getTimeAgo(conv.started_at)} • {conv.messages_count || 0} messages
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              <Badge variant={conv.ended_at ? 'success' : 'warning'}>
                                {conv.ended_at ? 'Completed' : 'Active'}
                              </Badge>
                              <Link to={`/conversations/${conv.id}`}>
                                <Button variant="outline" size="sm">View</Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="px-6 py-12 text-center text-gray-500">
                      <MessageSquareIcon className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                      <p>No conversations yet</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* SETTINGS TAB - See next artifact */}
          {activeTab === 'settings' && (
            <SettingsTab chatbot={chatbot} />
          )}

          {/* KNOWLEDGE TAB */}
          {activeTab === 'knowledge' && (
            <KnowledgeTab chatbot={chatbot} knowledgeBases={knowledgeBases} />
          )}

          {/* INTEGRATION TAB */}
          {activeTab === 'integration' && (
            <IntegrationTab 
              chatbot={chatbot}
              embedCode={embedCode}
              directLink={directLink}
              copiedEmbed={copiedEmbed}
              copiedLink={copiedLink}
              widgetPosition={widgetPosition}
              widgetColor={widgetColor}
              handleCopyEmbed={handleCopyEmbed}
              handleCopyLink={handleCopyLink}
              setWidgetPosition={setWidgetPosition}
              setWidgetColor={setWidgetColor}
            />
          )}

          {/* ANALYTICS TAB */}
          {activeTab === 'analytics' && (
            <AnalyticsTab chatbot={chatbot} />
          )}
        </div>
      </div>
    </div>
  );
}

// COMPLETE SETTINGS TAB WITH ALL FEATURES
function SettingsTab({ chatbot }: { chatbot: Chatbot }) {
  return (
    <Card>
      <CardHeader>
        <h2 className="text-lg font-medium text-gray-900">Chatbot Settings</h2>
        <p className="mt-1 text-sm text-gray-500">
          Configure your chatbot's behavior and appearance
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Basic Information */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Basic Information</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="chatbotName" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="chatbotName"
                  defaultValue={chatbot.name}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="chatbotDescription" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="chatbotDescription"
                  rows={3}
                  defaultValue={chatbot.description}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="chatbotType" className="block text-sm font-medium text-gray-700">
                  Type
                </label>
                <select
                  id="chatbotType"
                  defaultValue={chatbot.type}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="customer_support">Customer Support</option>
                  <option value="sales">Sales</option>
                  <option value="technical">Technical Support</option>
                  <option value="general">General Purpose</option>
                  <option value="hr">HR</option>
                </select>
              </div>
            </div>
          </div>

          {/* AI Configuration */}
          <div className="pt-6 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-900 mb-3">AI Configuration</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="model" className="block text-sm font-medium text-gray-700">
                  Model
                </label>
                <select
                  id="model"
                  defaultValue={chatbot.ai_model}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="gpt-4">GPT-4</option>
                  <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                  <option value="claude-3-opus">Claude 3 Opus</option>
                  <option value="claude-3-sonnet">Claude 3 Sonnet</option>
                </select>
              </div>
              <div>
                <label htmlFor="temperature" className="block text-sm font-medium text-gray-700">
                  Temperature: {chatbot.temperature}
                </label>
                <input
                  type="range"
                  id="temperature"
                  min="0"
                  max="1"
                  step="0.1"
                  defaultValue={chatbot.temperature}
                  className="mt-1 block w-full"
                />
                <div className="mt-1 flex justify-between text-xs text-gray-500">
                  <span>Precise (0)</span>
                  <span>Balanced (0.5)</span>
                  <span>Creative (1)</span>
                </div>
              </div>
              <div>
                <label htmlFor="maxTokens" className="block text-sm font-medium text-gray-700">
                  Max Tokens
                </label>
                <input
                  type="number"
                  id="maxTokens"
                  defaultValue={chatbot.max_tokens}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Maximum number of tokens for each response
                </p>
              </div>
            </div>
          </div>

          {/* Chat Interface */}
          <div className="pt-6 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Chat Interface</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="welcomeMessage" className="block text-sm font-medium text-gray-700">
                  Welcome Message
                </label>
                <textarea
                  id="welcomeMessage"
                  rows={3}
                  defaultValue={chatbot.system_prompt || "Hi! How can I help you today?"}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div className="flex items-center">
                <input
                  id="enableHistory"
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="enableHistory" className="ml-2 block text-sm text-gray-700">
                  Enable conversation history
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="enableFeedback"
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="enableFeedback" className="ml-2 block text-sm text-gray-700">
                  Allow users to provide feedback
                </label>
              </div>
            </div>
          </div>

          {/* Advanced Settings */}
          <div className="pt-6 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Advanced</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  id="enableHumanHandoff"
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="enableHumanHandoff" className="ml-2 block text-sm text-gray-700">
                  Enable human handoff for complex queries
                </label>
              </div>
              <div>
                <label htmlFor="handoffThreshold" className="block text-sm font-medium text-gray-700">
                  Confidence Threshold for Handoff: 0.4
                </label>
                <input
                  type="range"
                  id="handoffThreshold"
                  min="0"
                  max="1"
                  step="0.1"
                  defaultValue="0.4"
                  className="mt-1 block w-full"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-6">
            <Button variant="secondary">Cancel</Button>
            <Button variant="primary">Save Changes</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// COMPLETE KNOWLEDGE TAB WITH ALL FEATURES
function KnowledgeTab({ chatbot, knowledgeBases }: { chatbot: Chatbot; knowledgeBases: KnowledgeBaseLink[] }) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h2 className="text-lg font-medium text-gray-900">Knowledge Base Configuration</h2>
          <p className="mt-1 text-sm text-gray-500">
            Connect and manage knowledge sources for this chatbot
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Linked Knowledge Bases */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Linked Knowledge Bases</h3>
              <div className="border border-gray-200 rounded-md divide-y divide-gray-200">
                {knowledgeBases.length > 0 ? (
                  knowledgeBases.map((kb) => (
                    <div key={kb.id} className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-md bg-purple-100 flex items-center justify-center">
                            <DatabaseIcon className="h-6 w-6 text-purple-600" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {kb.knowledge_base_name}
                            </div>
                            <div className="text-xs text-gray-500">
                              156 documents • 24.6 MB
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <select className="text-sm border border-gray-300 rounded-md shadow-sm py-1 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                            <option>High Priority</option>
                            <option>Medium Priority</option>
                            <option>Low Priority</option>
                          </select>
                          <Button variant="outline" size="sm">
                            Configure
                          </Button>
                          <Button variant="danger" size="sm">
                            Unlink
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center">
                    <DatabaseIcon className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                    <p className="text-sm text-gray-600">No knowledge bases linked</p>
                  </div>
                )}
              </div>
              <div className="mt-4">
                <Button variant="outline" icon={<PlusIcon className="h-5 w-5" />}>
                  Link Knowledge Base
                </Button>
              </div>
            </div>

            {/* Knowledge Processing Settings */}
            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-900 mb-3">
                Knowledge Processing Settings
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Automatically process new documents
                    </span>
                  </label>
                </div>
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Use semantic search for improved accuracy
                    </span>
                  </label>
                </div>
                <div>
                  <label htmlFor="embeddingModel" className="block text-sm font-medium text-gray-700 mb-1">
                    Embedding Model
                  </label>
                  <select
                    id="embeddingModel"
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option>Default (text-embedding-ada-002)</option>
                    <option>text-embedding-3-small</option>
                    <option>text-embedding-3-large</option>
                    <option>Custom Model</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="chunkSize" className="block text-sm font-medium text-gray-700 mb-1">
                    Chunk Size
                  </label>
                  <select
                    id="chunkSize"
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option>Small (256 tokens)</option>
                    <option>Medium (512 tokens)</option>
                    <option>Large (1024 tokens)</option>
                    <option>Extra Large (2048 tokens)</option>
                  </select>
                  <p className="mt-1 text-xs text-gray-500">
                    Determines how documents are split for processing
                  </p>
                </div>
              </div>
            </div>

            {/* Retrieval Settings */}
            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Retrieval Settings</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="retrievalMethod" className="block text-sm font-medium text-gray-700 mb-1">
                    Retrieval Method
                  </label>
                  <select
                    id="retrievalMethod"
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option>Semantic Search</option>
                    <option>Hybrid Search</option>
                    <option>Keyword Search</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="topK" className="block text-sm font-medium text-gray-700 mb-1">
                    Top-K Retrieval: 5
                  </label>
                  <input
                    type="range"
                    id="topK"
                    min="1"
                    max="20"
                    defaultValue="5"
                    className="w-full"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Number of most relevant chunks to retrieve
                  </p>
                </div>
                <div>
                  <label htmlFor="similarityThreshold" className="block text-sm font-medium text-gray-700 mb-1">
                    Similarity Threshold: 0.7
                  </label>
                  <input
                    type="range"
                    id="similarityThreshold"
                    min="0"
                    max="1"
                    step="0.05"
                    defaultValue="0.7"
                    className="w-full"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Minimum relevance score for retrieved documents
                  </p>
                </div>
              </div>
            </div>

            {/* Citation Settings */}
            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Citation Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Include citations in responses
                    </span>
                  </label>
                </div>
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Allow users to view source documents
                    </span>
                  </label>
                </div>
                <div>
                  <label htmlFor="citationFormat" className="block text-sm font-medium text-gray-700 mb-1">
                    Citation Format
                  </label>
                  <select
                    id="citationFormat"
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option>Inline (Source: Document Name)</option>
                    <option>Numbered ([1], [2], [3])</option>
                    <option>End of Message</option>
                    <option>Hidden (Available on Request)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-6">
              <Button variant="secondary">Cancel</Button>
              <Button variant="primary">Save Changes</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


// COMPLETE INTEGRATION TAB WITH ALL FEATURES
function IntegrationTab({ 
  chatbot, embedCode, directLink, copiedEmbed, copiedLink, 
  widgetPosition, widgetColor, handleCopyEmbed, handleCopyLink,
  setWidgetPosition, setWidgetColor 
}: any) {
  return (
    <div className="space-y-6">
      {/* Embed Code Section */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-medium text-gray-900">Embed on Your Website</h2>
          <p className="mt-1 text-sm text-gray-500">
            Copy and paste this code into your website to add the chatbot widget
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="relative">
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                <code>{embedCode}</code>
              </pre>
              <Button
                variant="outline"
                size="sm"
                className="absolute top-2 right-2 bg-gray-800 border-gray-700 text-gray-100 hover:bg-gray-700"
                icon={copiedEmbed ? <CheckIcon className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
                onClick={handleCopyEmbed}
              >
                {copiedEmbed ? 'Copied!' : 'Copy'}
              </Button>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <h4 className="text-sm font-medium text-blue-900 mb-2">
                Installation Instructions
              </h4>
              <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                <li>Copy the embed code above</li>
                <li>Paste it into your website's HTML, just before the closing {`</body>`} tag</li>
                <li>Save and publish your changes</li>
                <li>The chatbot widget will appear on your website</li>
              </ol>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Direct Link Section */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-medium text-gray-900">Direct Link</h2>
          <p className="mt-1 text-sm text-gray-500">
            Share this link to open the chatbot in a standalone page
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={directLink}
              readOnly
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm"
            />
            <Button
              variant="outline"
              size="sm"
              icon={copiedLink ? <CheckIcon className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
              onClick={handleCopyLink}
            >
              {copiedLink ? 'Copied!' : 'Copy'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              icon={<ExternalLinkIcon className="h-4 w-4" />}
              onClick={() => window.open(directLink, '_blank')}
            >
              Open
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Widget Customization */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-medium text-gray-900">Widget Customization</h2>
          <p className="mt-1 text-sm text-gray-500">
            Customize how the chatbot widget appears on your website
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Widget Position
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setWidgetPosition('bottom-right')}
                  className={`p-4 border-2 rounded-md text-sm font-medium transition-colors ${
                    widgetPosition === 'bottom-right'
                      ? 'border-blue-600 bg-blue-50 text-blue-900'
                      : 'border-gray-300 text-gray-700 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-center justify-center mb-2">
                    <div className="w-16 h-16 border-2 border-gray-300 rounded relative">
                      <div className="absolute bottom-1 right-1 w-4 h-4 bg-blue-600 rounded"></div>
                    </div>
                  </div>
                  Bottom Right
                </button>
                <button
                  onClick={() => setWidgetPosition('bottom-left')}
                  className={`p-4 border-2 rounded-md text-sm font-medium transition-colors ${
                    widgetPosition === 'bottom-left'
                      ? 'border-blue-600 bg-blue-50 text-blue-900'
                      : 'border-gray-300 text-gray-700 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-center justify-center mb-2">
                    <div className="w-16 h-16 border-2 border-gray-300 rounded relative">
                      <div className="absolute bottom-1 left-1 w-4 h-4 bg-blue-600 rounded"></div>
                    </div>
                  </div>
                  Bottom Left
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="widgetColor" className="block text-sm font-medium text-gray-700 mb-2">
                Primary Color
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="color"
                  id="widgetColor"
                  value={widgetColor}
                  onChange={(e) => setWidgetColor(e.target.value)}
                  className="h-10 w-20 rounded border border-gray-300 cursor-pointer"
                />
                <input
                  type="text"
                  value={widgetColor}
                  onChange={(e) => setWidgetColor(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">
                This color will be used for the chat bubble, header, and buttons
              </p>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <h4 className="text-sm font-medium text-gray-900 mb-3">Preview</h4>
              <div className="bg-gray-100 rounded-md p-8 relative h-64">
                <div
                  className={`absolute ${
                    widgetPosition === 'bottom-right' ? 'bottom-4 right-4' : 'bottom-4 left-4'
                  }`}
                >
                  <div
                    className="w-14 h-14 rounded-full shadow-lg flex items-center justify-center cursor-pointer transition-transform hover:scale-110"
                    style={{ backgroundColor: widgetColor }}
                  >
                    <MessageCircleIcon className="h-7 w-7 text-white" />
                  </div>
                </div>
                <div className="text-center text-sm text-gray-500 mt-20">
                  Widget preview
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> After changing customization settings, make sure to update
                the embed code on your website with the new configuration.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* API Integration */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-medium text-gray-900">API Integration</h2>
          <p className="mt-1 text-sm text-gray-500">
            For custom integrations, use our REST API
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                API Endpoint
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={`https://api.yourapp.com/v1/chat/${chatbot.id}/message`}
                  readOnly
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm font-mono"
                />
                <Button variant="outline" size="sm" icon={<CopyIcon className="h-4 w-4" />}>
                  Copy
                </Button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Example Request
              </label>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto text-xs">
                <code>{`POST /v1/chat/${chatbot.id}/message
Content-Type: application/json
Authorization: Bearer YOUR_API_KEY

{
  "message": "Hello, I need help with my order",
  "sessionId": "user-session-123",
  "userId": "user-456"
}`}</code>
              </pre>
            </div>
            <div>
              <Button variant="outline" icon={<ExternalLinkIcon className="h-4 w-4" />}>
                View API Documentation
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Options */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-medium text-gray-900">Advanced Options</h2>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-900">Enable on Mobile</div>
                <div className="text-xs text-gray-500">Show chatbot widget on mobile devices</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-900">Auto-open Widget</div>
                <div className="text-xs text-gray-500">Automatically open chat widget when page loads</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-900">Show Branding</div>
                <div className="text-xs text-gray-500">Show branding in the chatbot widget</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Analytics Tab Component
function AnalyticsTab({ chatbot }: { chatbot: Chatbot }) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-medium text-gray-900">
                Chatbot Performance Analytics
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Insights and statistics about your chatbot's performance
              </p>
            </div>
            <select className="border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-white text-sm">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 3 months</option>
              <option>Last 6 months</option>
            </select>
          </div>
        </CardHeader>
        <CardContent>
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="text-sm font-medium text-gray-500">Total Conversations</div>
              <div className="mt-1 flex items-baseline">
                <div className="text-2xl font-semibold text-gray-900">
                  {chatbot.conversations_count.toLocaleString()}
                </div>
                <div className="ml-2 flex items-baseline text-sm text-green-600">
                  +12.5%
                  <TrendingUpIcon className="h-4 w-4 ml-1" />
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="text-sm font-medium text-gray-500">Avg. Conversation Length</div>
              <div className="mt-1 flex items-baseline">
                <div className="text-2xl font-semibold text-gray-900">4.8 messages</div>
                <div className="ml-2 flex items-baseline text-sm text-green-600">
                  +3.2%
                  <TrendingUpIcon className="h-4 w-4 ml-1" />
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="text-sm font-medium text-gray-500">Satisfaction Rate</div>
              <div className="mt-1 flex items-baseline">
                <div className="text-2xl font-semibold text-gray-900">92%</div>
                <div className="ml-2 flex items-baseline text-sm text-green-600">
                  +5.4%
                  <TrendingUpIcon className="h-4 w-4 ml-1" />
                </div>
              </div>
            </div>
          </div>

          {/* Conversations Chart */}
          <div className="mb-8">
            <h3 className="text-base font-medium text-gray-900 mb-4">
              Conversations Over Time
            </h3>
            <div className="h-64 bg-white p-4 rounded-lg border border-gray-200">
              <div className="h-full w-full flex items-end justify-between space-x-2">
                {Array.from({ length: 30 }).map((_, i) => {
                  const height = 30 + Math.random() * 70;
                  return (
                    <div key={i} className="h-full flex items-end">
                      <div
                        className={`w-2 rounded-t-sm ${i === 20 ? 'bg-blue-600' : 'bg-blue-200'}`}
                        style={{ height: `${height}%` }}
                      ></div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Satisfaction & Resolution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="text-base font-medium text-gray-900 mb-4">User Satisfaction</h3>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex justify-between mb-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-500">76%</div>
                    <div className="text-xs text-gray-500 mt-1">Positive</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-500">16%</div>
                    <div className="text-xs text-gray-500 mt-1">Neutral</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-500">8%</div>
                    <div className="text-xs text-gray-500 mt-1">Negative</div>
                  </div>
                </div>
                <div className="h-4 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div className="flex h-full">
                    <div className="bg-green-500 h-full" style={{ width: '76%' }}></div>
                    <div className="bg-blue-500 h-full" style={{ width: '16%' }}></div>
                    <div className="bg-red-500 h-full" style={{ width: '8%' }}></div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-base font-medium text-gray-900 mb-4">Resolution Rate</h3>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center justify-center mb-4">
                  <div className="relative h-32 w-32">
                    <svg className="h-full w-full" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#E5E7EB"
                        strokeWidth="3"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#3B82F6"
                        strokeWidth="3"
                        strokeDasharray="85, 100"
                      />
                    </svg>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                      <div className="text-3xl font-bold text-gray-900">85%</div>
                      <div className="text-xs text-gray-500">Resolved</div>
                    </div>
                  </div>
                </div>
                <div className="text-center text-sm text-gray-600">
                  <div>Most conversations resolved successfully</div>
                </div>
              </div>
            </div>
          </div>

          {/* Knowledge Base Usage */}
          <div className="mb-8">
            <h3 className="text-base font-medium text-gray-900 mb-4">
              Knowledge Base Utilization
            </h3>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <div className="text-sm font-medium text-gray-700">Primary Knowledge Base</div>
                    <div className="text-sm font-medium text-gray-900">68%</div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '68%' }}></div>
                  </div>
                  <div className="mt-1 text-xs text-gray-500">846 queries answered</div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <div className="text-sm font-medium text-gray-700">Secondary Knowledge Base</div>
                    <div className="text-sm font-medium text-gray-900">32%</div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '32%' }}></div>
                  </div>
                  <div className="mt-1 text-xs text-gray-500">399 queries answered</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-6">
            <Button variant="outline" icon={<DownloadIcon className="h-5 w-5" />}>
              Export Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}