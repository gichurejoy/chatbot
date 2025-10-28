import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { PlusIcon, SearchIcon, FilterIcon, MessageSquareIcon, MessageSquareTextIcon, BarChart3Icon, SettingsIcon, BookOpenIcon } from 'lucide-react';
import { NewChatbotModal, ChatbotFormData } from '../components/modals/NewChatbotModal';
export function Chatbots() {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const chatbots = [{
    id: 1,
    name: 'Customer Support Assistant',
    description: 'Handles common customer inquiries and support tickets',
    type: 'Customer Support',
    status: 'Active',
    project: 'E-commerce Assistant',
    interactions: 1245,
    accuracy: 92,
    lastUpdated: '2 days ago'
  }, {
    id: 2,
    name: 'Sales Bot',
    description: 'Qualifies leads and assists with product recommendations',
    type: 'Sales',
    status: 'Active',
    project: 'Sales Automation',
    interactions: 856,
    accuracy: 88,
    lastUpdated: '1 day ago'
  }, {
    id: 3,
    name: 'Product Guide',
    description: 'Provides detailed product information and troubleshooting',
    type: 'Technical Support',
    status: 'Training',
    project: 'Technical Support',
    interactions: 723,
    accuracy: 85,
    lastUpdated: '5 hours ago'
  }, {
    id: 4,
    name: 'FAQ Bot',
    description: 'Answers frequently asked questions about services and policies',
    type: 'General Purpose',
    status: 'Active',
    project: 'Customer Support',
    interactions: 512,
    accuracy: 94,
    lastUpdated: '1 week ago'
  }, {
    id: 5,
    name: 'Onboarding Assistant',
    description: 'Guides new employees through onboarding process',
    type: 'HR',
    status: 'Draft',
    project: 'HR Assistant',
    interactions: 0,
    accuracy: 0,
    lastUpdated: '3 days ago'
  }, {
    id: 6,
    name: 'Order Status Bot',
    description: 'Provides updates on order status and shipping information',
    type: 'Customer Support',
    status: 'Inactive',
    project: 'E-commerce Assistant',
    interactions: 320,
    accuracy: 91,
    lastUpdated: '12 hours ago'
  }];
  const handleCreateChatbot = (data: ChatbotFormData) => {
    console.log('Creating new chatbot:', data);
    // In a real app, this would make an API call to create the chatbot
  };
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Active':
        return 'success';
      case 'Training':
        return 'info';
      case 'Draft':
        return 'default';
      case 'Inactive':
        return 'warning';
      default:
        return 'default';
    }
  };
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Customer Support':
        return <MessageSquareIcon className="h-6 w-6 text-blue-600" />;
      case 'Sales':
        return <BarChart3Icon className="h-6 w-6 text-green-600" />;
      case 'Technical Support':
        return <SettingsIcon className="h-6 w-6 text-purple-600" />;
      case 'General Purpose':
        return <MessageSquareTextIcon className="h-6 w-6 text-orange-600" />;
      case 'HR':
        return <BookOpenIcon className="h-6 w-6 text-red-600" />;
      default:
        return <MessageSquareTextIcon className="h-6 w-6 text-gray-600" />;
    }
  };
  return <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Chatbots</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage and monitor your AI chatbot assistants
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Button variant="primary" icon={<PlusIcon className="h-5 w-5" />} onClick={() => setIsModalOpen(true)}>
            New Chatbot
          </Button>
        </div>
      </div>
      {/* Filters */}
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="relative flex-1">
          <input type="text" placeholder="Search chatbots..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        <div className="flex space-x-2">
          <select className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white">
            <option>All Types</option>
            <option>Customer Support</option>
            <option>Sales</option>
            <option>Technical Support</option>
            <option>General Purpose</option>
            <option>HR</option>
          </select>
          <Button variant="outline" icon={<FilterIcon className="h-5 w-5" />}>
            Filter
          </Button>
          <div className="flex border border-gray-300 rounded-md">
            <button className={`px-3 py-2 ${view === 'grid' ? 'bg-gray-100 text-gray-900' : 'text-gray-500'}`} onClick={() => setView('grid')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
              </svg>
            </button>
            <button className={`px-3 py-2 ${view === 'list' ? 'bg-gray-100 text-gray-900' : 'text-gray-500'}`} onClick={() => setView('list')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="8" y1="6" x2="21" y2="6"></line>
                <line x1="8" y1="12" x2="21" y2="12"></line>
                <line x1="8" y1="18" x2="21" y2="18"></line>
                <line x1="3" y1="6" x2="3.01" y2="6"></line>
                <line x1="3" y1="12" x2="3.01" y2="12"></line>
                <line x1="3" y1="18" x2="3.01" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Chatbots Grid/List View */}
      {view === 'grid' ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {chatbots.map(chatbot => <Link key={chatbot.id} to={`/chatbots/${chatbot.id}`} className="block">
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
                        <p className="text-xs text-gray-500">{chatbot.type}</p>
                      </div>
                    </div>
                    <Badge variant={getStatusVariant(chatbot.status)}>
                      {chatbot.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    {chatbot.description}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <div className="text-gray-500">
                      Project:{' '}
                      <span className="text-gray-700">{chatbot.project}</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex space-x-4">
                        <div className="text-gray-500">
                          <span className="font-medium text-gray-900">
                            {chatbot.interactions.toLocaleString()}
                          </span>{' '}
                          interactions
                        </div>
                        {chatbot.status !== 'Draft' && <div className="text-gray-500">
                            <span className="font-medium text-gray-900">
                              {chatbot.accuracy}%
                            </span>{' '}
                            accuracy
                          </div>}
                      </div>
                      <div className="text-xs text-gray-400">
                        Updated {chatbot.lastUpdated}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>)}
        </div> : <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Chatbot
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Project
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Interactions
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Accuracy
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Updated
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {chatbots.map(chatbot => <tr key={chatbot.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link to={`/chatbots/${chatbot.id}`} className="flex items-center">
                          <div className="h-8 w-8 rounded-md bg-blue-100 flex items-center justify-center">
                            {getTypeIcon(chatbot.type)}
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">
                              {chatbot.name}
                            </div>
                            <div className="text-xs text-gray-500 max-w-xs truncate">
                              {chatbot.description}
                            </div>
                          </div>
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {chatbot.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {chatbot.project}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant={getStatusVariant(chatbot.status)}>
                          {chatbot.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {chatbot.interactions.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {chatbot.status !== 'Draft' ? `${chatbot.accuracy}%` : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {chatbot.lastUpdated}
                      </td>
                    </tr>)}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>}
      <NewChatbotModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleCreateChatbot} />
    </div>;
}