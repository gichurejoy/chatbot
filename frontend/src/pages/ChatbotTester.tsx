import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { 
  SendIcon, ArrowLeftIcon, SettingsIcon, RefreshCwIcon, 
  DownloadIcon, ThumbsUpIcon, ThumbsDownIcon 
} from 'lucide-react';
import { ChatbotsAPI } from '../services/api';

interface Chatbot {
  id: string;
  name: string;
  description: string;
  type: string;
  status: string;
  project_name: string;
}

interface Message {
  id: number;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

export function ChatbotTester() {
  const { id } = useParams<{ id: string }>();
  const [chatbot, setChatbot] = useState<Chatbot | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sessionId] = useState(`session-${Date.now()}`);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (id) {
      fetchChatbot();
      // Add initial bot message
      setMessages([{
        id: 1,
        type: 'bot',
        content: "Hi! I'm ready to help you. How can I assist you today?",
        timestamp: new Date()
      }]);
    }
  }, [id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchChatbot = async () => {
    try {
      const data = await ChatbotsAPI.get(id!);
      setChatbot(data);
      
      // Update initial message with chatbot name
      setMessages([{
        id: 1,
        type: 'bot',
        content: `Hi! I'm ${data.name}. How can I assist you today?`,
        timestamp: new Date()
      }]);
    } catch (error) {
      console.error('Failed to fetch chatbot:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !chatbot) return;

    const userMessage: Message = {
      id: messages.length + 1,
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      // Call the chatbot API
      const response = await ChatbotsAPI.chat(id!, {
        message: inputMessage,
        session_id: sessionId,
        user_identifier: 'test-user'
      });

      const botMessage: Message = {
        id: messages.length + 2,
        type: 'bot',
        content: response.response || 'I received your message.',
        timestamp: new Date()
      };

      setTimeout(() => {
        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
      }, 500);
    } catch (error) {
      console.error('Failed to send message:', error);
      const errorMessage: Message = {
        id: messages.length + 2,
        type: 'bot',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleReset = () => {
    setMessages([{
      id: 1,
      type: 'bot',
      content: chatbot ? `Hi! I'm ${chatbot.name}. How can I assist you today?` : "Hi! How can I help you today?",
      timestamp: new Date()
    }]);
  };

  const handleExportChat = () => {
    const chatContent = messages.map(m => 
      `[${m.timestamp.toLocaleTimeString()}] ${m.type.toUpperCase()}: ${m.content}`
    ).join('\n');
    
    const blob = new Blob([chatContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat-export-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const quickActions = [
    { label: 'Test Password Reset', message: 'How do I reset my password?' },
    { label: 'Test Business Hours', message: 'What are your business hours?' },
    { label: 'Test Order Tracking', message: 'How do I track my order?' },
    { label: 'Test Human Handoff', message: 'I need to speak with a human' }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!chatbot) {
    return (
      <div className="space-y-6">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          Chatbot not found
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
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to={`/chatbots/${id}`}>
            <Button variant="outline" icon={<ArrowLeftIcon className="h-5 w-5" />}>
              Back to Chatbot
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Test Chatbot</h1>
            <p className="mt-1 text-sm text-gray-500">
              Testing: {chatbot.name}
            </p>
          </div>
        </div>
        <div className="flex space-x-3">
          <Button 
            variant="outline" 
            icon={<RefreshCwIcon className="h-5 w-5" />}
            onClick={handleReset}
          >
            Reset
          </Button>
          <Button 
            variant="outline" 
            icon={<DownloadIcon className="h-5 w-5" />}
            onClick={handleExportChat}
          >
            Export Chat
          </Button>
          <Link to={`/chatbots/${id}`}>
            <Button variant="outline" icon={<SettingsIcon className="h-5 w-5" />}>
              Settings
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Interface */}
        <div className="lg:col-span-2">
          <Card className="h-[600px] flex flex-col">
            <CardHeader className="border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
                    {chatbot.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      {chatbot.name}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {chatbot.status === 'active' ? 'Online' : 'Offline'}
                    </p>
                  </div>
                </div>
              </div>
            </CardHeader>

            {/* Messages */}
            <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="max-w-xs lg:max-w-md px-4 py-2 rounded-lg bg-gray-100">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </CardContent>

            {/* Input Area */}
            <div className="border-t border-gray-200 p-4">
              <div className="flex space-x-2">
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  rows={1}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  disabled={isTyping}
                />
                <Button
                  variant="primary"
                  icon={<SendIcon className="h-5 w-5" />}
                  onClick={handleSendMessage}
                  disabled={isTyping || !inputMessage.trim()}
                >
                  Send
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Statistics */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-medium text-gray-900">Test Statistics</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-500">Messages Sent</div>
                  <div className="text-2xl font-semibold text-gray-900">
                    {messages.filter(m => m.type === 'user').length}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Bot Responses</div>
                  <div className="text-2xl font-semibold text-gray-900">
                    {messages.filter(m => m.type === 'bot').length}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Session Time</div>
                  <div className="text-2xl font-semibold text-gray-900">
                    {Math.floor((Date.now() - messages[0]?.timestamp.getTime()) / 60000)}m
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start text-left"
                    onClick={() => setInputMessage(action.message)}
                  >
                    {action.label}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Rate Response */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-medium text-gray-900">Rate Response</h3>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  icon={<ThumbsUpIcon className="h-5 w-5" />}
                >
                  Helpful
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  icon={<ThumbsDownIcon className="h-5 w-5" />}
                >
                  Not Helpful
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}