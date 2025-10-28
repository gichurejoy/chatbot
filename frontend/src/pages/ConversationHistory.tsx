import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { SearchIcon, FilterIcon, DownloadIcon, MessageSquareIcon, ClockIcon, UserIcon, BotIcon } from 'lucide-react';
export function ConversationHistory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChatbot, setSelectedChatbot] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const conversations = [{
    id: 1,
    user: 'John Smith',
    chatbot: 'Customer Support',
    messages: 12,
    duration: '8 min',
    satisfaction: 'positive',
    timestamp: '2 hours ago',
    preview: 'I need help with my order...'
  }, {
    id: 2,
    user: 'Sarah Johnson',
    chatbot: 'Sales Assistant',
    messages: 8,
    duration: '5 min',
    satisfaction: 'positive',
    timestamp: '4 hours ago',
    preview: 'Can you tell me more about...'
  }, {
    id: 3,
    user: 'Mike Davis',
    chatbot: 'Technical Support',
    messages: 15,
    duration: '12 min',
    satisfaction: 'neutral',
    timestamp: '6 hours ago',
    preview: 'I am having issues with...'
  }, {
    id: 4,
    user: 'Emily Brown',
    chatbot: 'Customer Support',
    messages: 6,
    duration: '3 min',
    satisfaction: 'positive',
    timestamp: 'Yesterday',
    preview: 'Quick question about...'
  }, {
    id: 5,
    user: 'David Wilson',
    chatbot: 'Sales Assistant',
    messages: 20,
    duration: '15 min',
    satisfaction: 'negative',
    timestamp: 'Yesterday',
    preview: 'I am not satisfied with...'
  }];
  return <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Conversation History
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            View and analyze all chatbot conversations
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <Button variant="outline" icon={<FilterIcon className="h-5 w-5" />}>
            Filters
          </Button>
          <Button variant="outline" icon={<DownloadIcon className="h-5 w-5" />}>
            Export
          </Button>
        </div>
      </div>
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search conversations..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <select value={selectedChatbot} onChange={e => setSelectedChatbot(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="all">All Chatbots</option>
              <option value="customer-support">Customer Support</option>
              <option value="sales">Sales Assistant</option>
              <option value="technical">Technical Support</option>
            </select>
            <select value={selectedStatus} onChange={e => setSelectedStatus(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="all">All Satisfaction</option>
              <option value="positive">Positive</option>
              <option value="neutral">Neutral</option>
              <option value="negative">Negative</option>
            </select>
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 gap-4">
        {conversations.map(conversation => <Card key={conversation.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="flex-shrink-0 h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <UserIcon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-lg font-medium text-gray-900">
                        {conversation.user}
                      </h3>
                      <Badge variant={conversation.satisfaction === 'positive' ? 'success' : conversation.satisfaction === 'neutral' ? 'warning' : 'danger'}>
                        {conversation.satisfaction}
                      </Badge>
                    </div>
                    <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <BotIcon className="h-4 w-4 mr-1" />
                        {conversation.chatbot}
                      </span>
                      <span className="flex items-center">
                        <MessageSquareIcon className="h-4 w-4 mr-1" />
                        {conversation.messages} messages
                      </span>
                      <span className="flex items-center">
                        <ClockIcon className="h-4 w-4 mr-1" />
                        {conversation.duration}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">
                      {conversation.preview}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2 ml-4">
                  <span className="text-sm text-gray-500">
                    {conversation.timestamp}
                  </span>
                  <Link to={`/conversations/${conversation.id}`}>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>)}
      </div>
      <div className="flex justify-center">
        <nav className="flex items-center space-x-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" className="bg-blue-50 text-blue-600">
            1
          </Button>
          <Button variant="outline" size="sm">
            2
          </Button>
          <Button variant="outline" size="sm">
            3
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </nav>
      </div>
    </div>;
}