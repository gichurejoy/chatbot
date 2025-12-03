import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import Login from './pages/Login';
import Register from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { Projects } from './pages/Projects';
import { Chatbots } from './pages/Chatbots';
import { KnowledgeBase } from './pages/KnowledgeBase';
import { Analytics } from './pages/Analytics';
import { UserManagement } from './pages/UserManagement';
import { Settings } from './pages/Settings';
import { MainLayout } from './components/layout/MainLayout';
import { ChatbotDetail } from './pages/ChatbotDetail';
import { ProjectDetail } from './pages/ProjectDetail';
import { KnowledgeBaseDetail } from './pages/KnowledgeBaseDetail';
import { ChatbotTester } from './pages/ChatbotTester';
import { ConversationHistory } from './pages/ConversationHistory';
import { ConversationDetail } from './pages/ConversationDetail';
import { Templates } from './pages/Templates';
import { AuditLogs } from './pages/AuditLogs';
import { Notifications } from './pages/Notifications';
import { Billing } from './pages/Billing';
import { Documentation } from './pages/Documentation';
import { SupportCenter } from './pages/SupportCenter';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Routes>
            <Route index element={<Dashboard />} />
            <Route path="projects" element={<Projects />} />
            <Route path="projects/:id" element={<ProjectDetail />} />
            <Route path="chatbots" element={<Chatbots />} />
            <Route path="chatbots/:id" element={<ChatbotDetail />} />
            <Route path="chatbots/:id/test" element={<ChatbotTester />} />
            <Route path="knowledge-base" element={<KnowledgeBase />} />
            <Route path="knowledge-base/:id" element={<KnowledgeBaseDetail />} />
            <Route path="conversations" element={<ConversationHistory />} />
            <Route path="conversations/:id" element={<ConversationDetail />} />
            <Route path="templates" element={<Templates />} />
            <Route path="audit-logs" element={<AuditLogs />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="billing" element={<Billing />} />
            <Route path="documentation" element={<Documentation />} />
            <Route path="support" element={<SupportCenter />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="settings" element={<Settings />} />
            </Routes>
                </MainLayout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;