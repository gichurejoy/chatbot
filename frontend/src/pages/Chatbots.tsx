import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { 
  PlusIcon, 
  SearchIcon, 
  FilterIcon, 
  MessageSquareIcon, 
  MessageSquareTextIcon, 
  BarChart3Icon, 
  SettingsIcon, 
  BookOpenIcon 
} from 'lucide-react';
import { ChatbotsAPI } from '../services/api';

interface Chatbot {
  id: string;
  name: string;
  description: string;
  type: string;
  status: string;
  project_name: string;
  ai_model: string;
  conversations_count: number;
  created_at: string;
  updated_at: string;
}

export function Chatbots() {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [chatbots, setChatbots] = useState<Chatbot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchChatbots();
  }, []);

  // ✅ SAFE FETCH WITH NORMALIZATION
  const fetchChatbots = async () => {
    try {
      setLoading(true);
      const data = await ChatbotsAPI.list();

      console.log('RAW CHATBOTS API RESPONSE:', data);

      // ✅ Normalize API response (array OR { results: [] })
      if (Array.isArray(data)) {
        setChatbots(data);
      } else if (Array.isArray((data as any)?.results)) {
        setChatbots((data as any).results);
      } else {
        console.error('Unexpected chatbots API format:', data);
        setChatbots([]);
      }

      setError(null);
    } catch (err: any) {
      console.error('Failed to fetch chatbots:', err);
      setError('Failed to load chatbots. Please try again.');
      setChatbots([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ ABSOLUTE SAFETY BEFORE FILTERING
  const safeChatbots = Array.isArray(chatbots) ? chatbots : [];

  const filteredChatbots = safeChatbots.filter((bot) => {
    const matchesType =
      filterType === 'all' || bot.type === filterType;

    const matchesSearch =
      bot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bot.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bot.project_name?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesType && matchesSearch;
  });

  const getStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'success';
      case 'training':
        return 'info';
      case 'draft':
        return 'default';
      case 'inactive':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'customer_support':
      case 'customer support':
        return <MessageSquareIcon className="h-6 w-6 text-blue-600" />;
      case 'sales':
        return <BarChart3Icon className="h-6 w-6 text-green-600" />;
      case 'technical':
      case 'technical support':
        return <SettingsIcon className="h-6 w-6 text-purple-600" />;
      case 'general':
      case 'general purpose':
        return <MessageSquareTextIcon className="h-6 w-6 text-orange-600" />;
      case 'hr':
        return <BookOpenIcon className="h-6 w-6 text-red-600" />;
      default:
        return <MessageSquareTextIcon className="h-6 w-6 text-gray-600" />;
    }
  };

  // ✅ LOADING STATE
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // ✅ ERROR STATE
  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Chatbots</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage and monitor your AI chatbot assistants
          </p>
        </div>

        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
          <button
            onClick={fetchChatbots}
            className="ml-4 text-red-600 hover:text-red-800 font-medium"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Chatbots</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage and monitor your AI chatbot assistants
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Button variant="primary" icon={<PlusIcon className="h-5 w-5" />}>
            New Chatbot
          </Button>
        </div>
      </div>

      {/* FILTERS */}
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search chatbots..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>

        <div className="flex space-x-2">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white"
          >
            <option value="all">All Types</option>
            <option value="customer_support">Customer Support</option>
            <option value="sales">Sales</option>
            <option value="technical">Technical Support</option>
            <option value="general">General Purpose</option>
            <option value="hr">HR</option>
          </select>

          <Button variant="outline" icon={<FilterIcon className="h-5 w-5" />}>
            Filter
          </Button>
        </div>
      </div>

      {/* EMPTY STATE */}
      {filteredChatbots.length === 0 && (
        <div className="text-center py-12">
          <MessageSquareIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No chatbots found
          </h3>
          <p className="text-gray-600 mb-4">
            {filterType === 'all'
              ? 'Create your first chatbot to get started'
              : 'No chatbots match the selected filter'}
          </p>
          {filterType === 'all' && (
            <Button variant="primary" icon={<PlusIcon className="h-5 w-5" />}>
              Create Chatbot
            </Button>
          )}
        </div>
      )}

      {/* CHATBOTS GRID */}
      {filteredChatbots.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChatbots.map((chatbot) => (
            <Link
              key={chatbot.id}
              to={`/chatbots/${chatbot.id}`}
              className="block"
            >
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-md bg-blue-100 flex items-center justify-center">
                        {getTypeIcon(chatbot.type)}
                      </div>
                      <div className="ml-3">
                        <h3 className="text-lg font-medium text-gray-900">
                          {chatbot.name}
                        </h3>
                        <p className="text-xs text-gray-500 capitalize">
                          {chatbot.type.replace('_', ' ')}
                        </p>
                      </div>
                    </div>
                    <Badge variant={getStatusVariant(chatbot.status)}>
                      {chatbot.status}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {chatbot.description || 'No description provided'}
                  </p>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Project:</span>
                      <span className="font-medium text-gray-900">
                        {chatbot.project_name}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-500">Conversations:</span>
                      <span className="font-medium text-gray-900">
                        {chatbot.conversations_count}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-500">AI Model:</span>
                      <span className="font-medium text-gray-900">
                        {chatbot.ai_model}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
