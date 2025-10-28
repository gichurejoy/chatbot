import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { FoldersIcon, UsersIcon, MessageSquareIcon, DatabaseIcon, SettingsIcon, PlusIcon, CalendarIcon, ClockIcon, MessageSquareTextIcon, FileTextIcon, TrendingUpIcon } from 'lucide-react';
export function ProjectDetail() {
  const {
    id
  } = useParams<{
    id: string;
  }>();
  const [activeTab, setActiveTab] = useState('overview');
  const project = {
    id: Number(id),
    name: 'E-commerce Assistant',
    description: 'AI-powered chatbot for e-commerce customer support and product recommendations',
    status: 'Active',
    members: 5,
    chatbots: 3,
    knowledgeBases: 2,
    lastUpdated: '2 days ago',
    organization: 'Acme Inc.',
    createdAt: 'June 10, 2023',
    createdBy: 'John Doe'
  };
  const tabs = [{
    id: 'overview',
    name: 'Overview',
    icon: FoldersIcon
  }, {
    id: 'chatbots',
    name: 'Chatbots',
    icon: MessageSquareIcon
  }, {
    id: 'knowledge',
    name: 'Knowledge Bases',
    icon: DatabaseIcon
  }, {
    id: 'team',
    name: 'Team',
    icon: UsersIcon
  }, {
    id: 'settings',
    name: 'Settings',
    icon: SettingsIcon
  }];
  const chatbots = [{
    id: 1,
    name: 'Customer Support Assistant',
    description: 'Handles common customer inquiries and support tickets',
    type: 'Customer Support',
    status: 'Active',
    interactions: 1245,
    accuracy: 92,
    lastUpdated: '2 days ago'
  }, {
    id: 2,
    name: 'Product Recommendations',
    description: 'Suggests products based on customer preferences and browsing history',
    type: 'Sales',
    status: 'Active',
    interactions: 856,
    accuracy: 88,
    lastUpdated: '1 day ago'
  }, {
    id: 3,
    name: 'Order Status Bot',
    description: 'Provides updates on order status and shipping information',
    type: 'Customer Support',
    status: 'Inactive',
    interactions: 320,
    accuracy: 91,
    lastUpdated: '12 hours ago'
  }];
  const knowledgeBases = [{
    id: 1,
    name: 'Product Catalog',
    description: 'Detailed product specifications and catalog',
    documents: 156,
    size: '24.6 MB',
    lastUpdated: '3 days ago',
    type: 'Catalog'
  }, {
    id: 2,
    name: 'Customer FAQs',
    description: 'Frequently asked questions and their answers',
    documents: 78,
    size: '3.2 MB',
    lastUpdated: '1 week ago',
    type: 'FAQ'
  }];
  const teamMembers = [{
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Owner',
    avatar: 'JD',
    lastActive: '2 hours ago'
  }, {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    role: 'Admin',
    avatar: 'SJ',
    lastActive: '1 day ago'
  }, {
    id: 3,
    name: 'Michael Brown',
    email: 'm.brown@example.com',
    role: 'Editor',
    avatar: 'MB',
    lastActive: '3 days ago'
  }, {
    id: 4,
    name: 'Emily Davis',
    email: 'emily.d@example.com',
    role: 'Viewer',
    avatar: 'ED',
    lastActive: 'Just now'
  }, {
    id: 5,
    name: 'Robert Wilson',
    email: 'r.wilson@example.com',
    role: 'Editor',
    avatar: 'RW',
    lastActive: '1 week ago'
  }];
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Active':
        return 'success';
      case 'Inactive':
        return 'warning';
      default:
        return 'default';
    }
  };
  const getRoleVariant = (role: string) => {
    switch (role) {
      case 'Owner':
        return 'danger';
      case 'Admin':
        return 'info';
      case 'Editor':
        return 'success';
      case 'Viewer':
        return 'default';
      default:
        return 'default';
    }
  };
  return <div className="space-y-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
        <div className="flex items-center">
          <div className="h-12 w-12 rounded-md bg-blue-100 flex items-center justify-center">
            <FoldersIcon className="h-6 w-6 text-blue-600" />
          </div>
          <div className="ml-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                {project.name}
              </h1>
              <Badge variant="success" className="ml-3">
                {project.status}
              </Badge>
            </div>
            <p className="mt-1 text-sm text-gray-500">{project.organization}</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" icon={<MessageSquareIcon className="h-5 w-5" />}>
            New Chatbot
          </Button>
          <Button variant="primary" icon={<SettingsIcon className="h-5 w-5" />}>
            Project Settings
          </Button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
        {/* Tabs */}
        <div className="w-full md:w-64 flex-shrink-0">
          <Card>
            <CardContent className="p-0">
              <nav className="flex flex-col">
                {tabs.map(tab => <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center px-4 py-3 text-sm font-medium ${activeTab === tab.id ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}>
                    <tab.icon className="h-5 w-5 mr-3" />
                    {tab.name}
                  </button>)}
              </nav>
            </CardContent>
          </Card>
        </div>
        {/* Content */}
        <div className="flex-1">
          {activeTab === 'overview' && <div className="space-y-6">
              <Card>
                <CardHeader>
                  <h2 className="text-lg font-medium text-gray-900">
                    Project Information
                  </h2>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">
                        Description
                      </h3>
                      <p className="mt-1 text-sm text-gray-900">
                        {project.description}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">
                        Created
                      </h3>
                      <p className="mt-1 text-sm text-gray-900">
                        {project.createdAt} by {project.createdBy}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">
                        Organization
                      </h3>
                      <p className="mt-1 text-sm text-gray-900">
                        {project.organization}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">
                        Last Updated
                      </h3>
                      <p className="mt-1 text-sm text-gray-900">
                        {project.lastUpdated}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className="p-2 rounded-md bg-blue-100">
                        <MessageSquareIcon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-500">
                          Chatbots
                        </div>
                        <div className="mt-1 text-2xl font-semibold text-gray-900">
                          {project.chatbots}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className="p-2 rounded-md bg-green-100">
                        <DatabaseIcon className="h-6 w-6 text-green-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-500">
                          Knowledge Bases
                        </div>
                        <div className="mt-1 text-2xl font-semibold text-gray-900">
                          {project.knowledgeBases}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className="p-2 rounded-md bg-purple-100">
                        <UsersIcon className="h-6 w-6 text-purple-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-500">
                          Team Members
                        </div>
                        <div className="mt-1 text-2xl font-semibold text-gray-900">
                          {project.members}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-medium text-gray-900">
                        Chatbots
                      </h2>
                      <Button variant="outline" size="sm" icon={<PlusIcon className="h-4 w-4" />}>
                        Add
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y divide-gray-200">
                      {chatbots.map(chatbot => <Link key={chatbot.id} to={`/chatbots/${chatbot.id}`} className="block px-6 py-4 hover:bg-gray-50">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="h-10 w-10 rounded-md bg-blue-100 flex items-center justify-center">
                                <MessageSquareTextIcon className="h-6 w-6 text-blue-600" />
                              </div>
                              <div className="ml-3">
                                <div className="text-sm font-medium text-gray-900">
                                  {chatbot.name}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {chatbot.type}
                                </div>
                              </div>
                            </div>
                            <Badge variant={getStatusVariant(chatbot.status)}>
                              {chatbot.status}
                            </Badge>
                          </div>
                          <div className="mt-2 text-xs text-gray-500 flex items-center">
                            <ClockIcon className="h-3 w-3 mr-1" />
                            Updated {chatbot.lastUpdated}
                          </div>
                        </Link>)}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-medium text-gray-900">
                        Team Members
                      </h2>
                      <Button variant="outline" size="sm" icon={<PlusIcon className="h-4 w-4" />}>
                        Add
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y divide-gray-200">
                      {teamMembers.slice(0, 4).map(member => <div key={member.id} className="px-6 py-4 hover:bg-gray-50">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-medium">
                                {member.avatar}
                              </div>
                              <div className="ml-3">
                                <div className="text-sm font-medium text-gray-900">
                                  {member.name}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {member.email}
                                </div>
                              </div>
                            </div>
                            <Badge variant={getRoleVariant(member.role)}>
                              {member.role}
                            </Badge>
                          </div>
                        </div>)}
                    </div>
                  </CardContent>
                </Card>
              </div>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-medium text-gray-900">
                      Recent Activity
                    </h2>
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-gray-200">
                    {[{
                  action: 'created a new chatbot',
                  user: 'John Doe',
                  target: 'Product Recommendations',
                  time: '2 days ago'
                }, {
                  action: 'updated knowledge base',
                  user: 'Sarah Johnson',
                  target: 'Product Catalog',
                  time: '3 days ago'
                }, {
                  action: 'added team member',
                  user: 'John Doe',
                  target: 'Emily Davis',
                  time: '5 days ago'
                }, {
                  action: 'modified chatbot settings',
                  user: 'Michael Brown',
                  target: 'Customer Support Assistant',
                  time: '1 week ago'
                }, {
                  action: 'uploaded new documents',
                  user: 'Sarah Johnson',
                  target: 'Customer FAQs',
                  time: '1 week ago'
                }].map((activity, index) => <div key={index} className="px-6 py-4 hover:bg-gray-50">
                        <div className="flex items-start">
                          <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-medium text-sm">
                            {activity.user.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className="ml-3">
                            <div className="text-sm">
                              <span className="font-medium text-gray-900">
                                {activity.user}
                              </span>
                              <span className="text-gray-500">
                                {' '}
                                {activity.action}{' '}
                              </span>
                              <span className="font-medium text-gray-900">
                                {activity.target}
                              </span>
                            </div>
                            <div className="mt-1 text-xs text-gray-500 flex items-center">
                              <CalendarIcon className="h-3 w-3 mr-1" />
                              {activity.time}
                            </div>
                          </div>
                        </div>
                      </div>)}
                  </div>
                </CardContent>
              </Card>
            </div>}
          {activeTab === 'chatbots' && <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-900">
                    Project Chatbots
                  </h2>
                  <Button variant="primary" size="sm" icon={<PlusIcon className="h-4 w-4" />}>
                    New Chatbot
                  </Button>
                </div>
              </CardHeader>
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
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {chatbots.map(chatbot => <tr key={chatbot.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-8 w-8 rounded-md bg-blue-100 flex items-center justify-center">
                                <MessageSquareTextIcon className="h-5 w-5 text-blue-600" />
                              </div>
                              <div className="ml-3">
                                <div className="text-sm font-medium text-gray-900">
                                  {chatbot.name}
                                </div>
                                <div className="text-xs text-gray-500 max-w-xs truncate">
                                  {chatbot.description}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {chatbot.type}
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
                            {chatbot.accuracy}%
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {chatbot.lastUpdated}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-2">
                              <Button size="sm" variant="outline" as={Link} to={`/chatbots/${chatbot.id}`}>
                                View
                              </Button>
                              <Button size="sm" variant="outline">
                                Edit
                              </Button>
                            </div>
                          </td>
                        </tr>)}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>}
          {activeTab === 'knowledge' && <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-medium text-gray-900">
                      Project Knowledge Bases
                    </h2>
                    <Button variant="primary" size="sm" icon={<PlusIcon className="h-4 w-4" />}>
                      New Knowledge Base
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {knowledgeBases.map(kb => <div key={kb.id} className="border border-gray-200 rounded-md p-4 hover:bg-gray-50">
                          <div className="flex justify-between items-start">
                            <div className="flex items-center">
                              <div className="h-10 w-10 rounded-md bg-blue-100 flex items-center justify-center">
                                {kb.type === 'Catalog' ? <DatabaseIcon className="h-6 w-6 text-blue-600" /> : <FileTextIcon className="h-6 w-6 text-green-600" />}
                              </div>
                              <div className="ml-3">
                                <h3 className="text-sm font-medium text-gray-900">
                                  {kb.name}
                                </h3>
                                <p className="text-xs text-gray-500">
                                  {kb.type}
                                </p>
                              </div>
                            </div>
                            <Badge variant="info">{kb.documents} docs</Badge>
                          </div>
                          <p className="mt-3 text-sm text-gray-600">
                            {kb.description}
                          </p>
                          <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                            <div>Updated {kb.lastUpdated}</div>
                            <div>{kb.size}</div>
                          </div>
                          <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between">
                            <Link to={`/knowledge-base/${kb.id}`}>
                              <Button variant="outline" size="sm">
                                View Details
                              </Button>
                            </Link>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                Edit
                              </Button>
                              <Button variant="danger" size="sm">
                                Delete
                              </Button>
                            </div>
                          </div>
                        </div>)}
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <h2 className="text-lg font-medium text-gray-900">
                    Create New Knowledge Base
                  </h2>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="kbName" className="block text-sm font-medium text-gray-700">
                        Name
                      </label>
                      <input type="text" id="kbName" placeholder="E.g., Product Documentation" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </div>
                    <div>
                      <label htmlFor="kbType" className="block text-sm font-medium text-gray-700">
                        Type
                      </label>
                      <select id="kbType" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                        <option>Documentation</option>
                        <option>FAQ</option>
                        <option>Catalog</option>
                        <option>Sales</option>
                        <option>Policies</option>
                        <option>Training</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="kbDescription" className="block text-sm font-medium text-gray-700">
                        Description
                      </label>
                      <textarea id="kbDescription" rows={3} placeholder="A brief description of this knowledge base" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </div>
                    <div className="pt-4">
                      <Button variant="primary">Create Knowledge Base</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <h2 className="text-lg font-medium text-gray-900">
                    Knowledge Base Analytics
                  </h2>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <div className="text-sm font-medium text-gray-500">
                          Total Documents
                        </div>
                        <div className="mt-1 flex items-baseline">
                          <div className="text-2xl font-semibold text-gray-900">
                            234
                          </div>
                          <div className="ml-2 flex items-baseline text-sm text-green-600">
                            +12
                            <TrendingUpIcon className="h-4 w-4 ml-1" />
                          </div>
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <div className="text-sm font-medium text-gray-500">
                          Total Size
                        </div>
                        <div className="mt-1 flex items-baseline">
                          <div className="text-2xl font-semibold text-gray-900">
                            27.8 MB
                          </div>
                          <div className="ml-2 flex items-baseline text-sm text-green-600">
                            +3.2 MB
                            <TrendingUpIcon className="h-4 w-4 ml-1" />
                          </div>
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <div className="text-sm font-medium text-gray-500">
                          Query Coverage
                        </div>
                        <div className="mt-1 flex items-baseline">
                          <div className="text-2xl font-semibold text-gray-900">
                            94%
                          </div>
                          <div className="ml-2 flex items-baseline text-sm text-green-600">
                            +2%
                            <TrendingUpIcon className="h-4 w-4 ml-1" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 mb-3">
                        Knowledge Base Usage by Chatbot
                      </h3>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Chatbot
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Knowledge Base
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Queries
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Coverage
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            <tr>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="h-8 w-8 rounded-md bg-blue-100 flex items-center justify-center">
                                    <MessageSquareIcon className="h-4 w-4 text-blue-600" />
                                  </div>
                                  <div className="ml-3 text-sm font-medium text-gray-900">
                                    Customer Support Assistant
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                Customer FAQs
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                845
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="mr-2 text-sm text-gray-900">
                                    96%
                                  </div>
                                  <div className="w-16 bg-gray-200 rounded-full h-2">
                                    <div className="bg-green-500 h-2 rounded-full" style={{
                                  width: '96%'
                                }}></div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="h-8 w-8 rounded-md bg-blue-100 flex items-center justify-center">
                                    <MessageSquareIcon className="h-4 w-4 text-blue-600" />
                                  </div>
                                  <div className="ml-3 text-sm font-medium text-gray-900">
                                    Product Recommendations
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                Product Catalog
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                612
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="mr-2 text-sm text-gray-900">
                                    92%
                                  </div>
                                  <div className="w-16 bg-gray-200 rounded-full h-2">
                                    <div className="bg-green-500 h-2 rounded-full" style={{
                                  width: '92%'
                                }}></div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="h-8 w-8 rounded-md bg-blue-100 flex items-center justify-center">
                                    <MessageSquareIcon className="h-4 w-4 text-blue-600" />
                                  </div>
                                  <div className="ml-3 text-sm font-medium text-gray-900">
                                    Order Status Bot
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                Customer FAQs
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                243
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="mr-2 text-sm text-gray-900">
                                    88%
                                  </div>
                                  <div className="w-16 bg-gray-200 rounded-full h-2">
                                    <div className="bg-yellow-500 h-2 rounded-full" style={{
                                  width: '88%'
                                }}></div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>}
          {activeTab === 'team' && <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-medium text-gray-900">
                      Team Members
                    </h2>
                    <Button variant="primary" size="sm" icon={<PlusIcon className="h-4 w-4" />}>
                      Add Member
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Member
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Role
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Last Active
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Joined
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {teamMembers.map(member => <tr key={member.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-medium">
                                  {member.avatar}
                                </div>
                                <div className="ml-3">
                                  <div className="text-sm font-medium text-gray-900">
                                    {member.name}
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    {member.email}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Badge variant={getRoleVariant(member.role)}>
                                {member.role}
                              </Badge>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {member.lastActive}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {member.id === 1 ? 'June 10, 2023' : member.id === 2 ? 'June 12, 2023' : member.id === 3 ? 'June 15, 2023' : member.id === 4 ? 'June 20, 2023' : 'June 25, 2023'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex justify-end space-x-2">
                                <Button size="sm" variant="outline">
                                  Edit
                                </Button>
                                <Button size="sm" variant="danger">
                                  Remove
                                </Button>
                              </div>
                            </td>
                          </tr>)}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <h2 className="text-lg font-medium text-gray-900">
                    Invite New Member
                  </h2>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email Address
                      </label>
                      <input type="email" id="email" placeholder="colleague@example.com" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </div>
                    <div>
                      <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                        Role
                      </label>
                      <select id="role" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                        <option>Admin</option>
                        <option>Editor</option>
                        <option>Viewer</option>
                      </select>
                      <p className="mt-1 text-xs text-gray-500">
                        Admins can manage all aspects of the project. Editors
                        can create and modify chatbots and knowledge bases.
                        Viewers can only view data.
                      </p>
                    </div>
                    <div className="pt-4">
                      <Button variant="primary">Send Invitation</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <h2 className="text-lg font-medium text-gray-900">
                    Pending Invitations
                  </h2>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-gray-200">
                    <div className="px-6 py-4 flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          alex.martinez@example.com
                        </div>
                        <div className="text-xs text-gray-500">
                          Invited as Editor • 2 days ago
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          Resend
                        </Button>
                        <Button variant="danger" size="sm">
                          Cancel
                        </Button>
                      </div>
                    </div>
                    <div className="px-6 py-4 flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          taylor.wong@example.com
                        </div>
                        <div className="text-xs text-gray-500">
                          Invited as Viewer • 5 days ago
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          Resend
                        </Button>
                        <Button variant="danger" size="sm">
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <h2 className="text-lg font-medium text-gray-900">
                    Team Activity
                  </h2>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-gray-200">
                    {[{
                  user: 'John Doe',
                  avatar: 'JD',
                  action: 'updated chatbot settings',
                  target: 'Customer Support Assistant',
                  time: '2 hours ago'
                }, {
                  user: 'Sarah Johnson',
                  avatar: 'SJ',
                  action: 'uploaded new documents to',
                  target: 'Product Catalog',
                  time: '5 hours ago'
                }, {
                  user: 'Michael Brown',
                  avatar: 'MB',
                  action: 'created new chatbot',
                  target: 'Order Status Bot',
                  time: '1 day ago'
                }, {
                  user: 'Emily Davis',
                  avatar: 'ED',
                  action: 'joined the project as',
                  target: 'Viewer',
                  time: '3 days ago'
                }, {
                  user: 'John Doe',
                  avatar: 'JD',
                  action: 'linked knowledge base',
                  target: 'Customer FAQs',
                  time: '5 days ago'
                }].map((activity, index) => <div key={index} className="px-6 py-4 hover:bg-gray-50">
                        <div className="flex items-start">
                          <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-medium text-sm">
                            {activity.avatar}
                          </div>
                          <div className="ml-3">
                            <div className="text-sm">
                              <span className="font-medium text-gray-900">
                                {activity.user}
                              </span>
                              <span className="text-gray-500">
                                {' '}
                                {activity.action}{' '}
                              </span>
                              <span className="font-medium text-gray-900">
                                {activity.target}
                              </span>
                            </div>
                            <div className="mt-1 text-xs text-gray-500 flex items-center">
                              <CalendarIcon className="h-3 w-3 mr-1" />
                              {activity.time}
                            </div>
                          </div>
                        </div>
                      </div>)}
                  </div>
                </CardContent>
              </Card>
            </div>}
          {activeTab === 'settings' && <div className="space-y-6">
              <Card>
                <CardHeader>
                  <h2 className="text-lg font-medium text-gray-900">
                    Project Settings
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Manage general project settings and configuration
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 mb-3">
                        Basic Information
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="projectName" className="block text-sm font-medium text-gray-700">
                            Project Name
                          </label>
                          <input type="text" id="projectName" defaultValue={project.name} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                        </div>
                        <div>
                          <label htmlFor="projectDescription" className="block text-sm font-medium text-gray-700">
                            Description
                          </label>
                          <textarea id="projectDescription" rows={3} defaultValue={project.description} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                        </div>
                        <div>
                          <label htmlFor="projectOrganization" className="block text-sm font-medium text-gray-700">
                            Organization
                          </label>
                          <select id="projectOrganization" defaultValue={project.organization} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                            <option>Acme Inc.</option>
                            <option>Tech Solutions</option>
                            <option>Sales Pro</option>
                            <option>HR Solutions</option>
                            <option>Tech Support Inc.</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="pt-6 border-t border-gray-200">
                      <h3 className="text-sm font-medium text-gray-900 mb-3">
                        Project Status
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="projectStatus" className="block text-sm font-medium text-gray-700">
                            Status
                          </label>
                          <select id="projectStatus" defaultValue={project.status} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                            <option>Active</option>
                            <option>In Progress</option>
                            <option>On Hold</option>
                            <option>Completed</option>
                            <option>Archived</option>
                          </select>
                        </div>
                        <div>
                          <label className="flex items-center">
                            <input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                            <span className="ml-2 text-sm text-gray-700">
                              Show in dashboard
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="pt-6 border-t border-gray-200">
                      <h3 className="text-sm font-medium text-gray-900 mb-3">
                        Default AI Settings
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="defaultModel" className="block text-sm font-medium text-gray-700">
                            Default AI Model
                          </label>
                          <select id="defaultModel" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                            <option>GPT-4</option>
                            <option>GPT-3.5</option>
                            <option>Claude</option>
                            <option>Custom Model</option>
                          </select>
                          <p className="mt-1 text-xs text-gray-500">
                            New chatbots will use this model by default
                          </p>
                        </div>
                        <div>
                          <label htmlFor="defaultTemperature" className="block text-sm font-medium text-gray-700">
                            Default Temperature: 0.7
                          </label>
                          <input type="range" id="defaultTemperature" min="0" max="1" step="0.1" defaultValue="0.7" className="mt-1 block w-full" />
                          <div className="mt-1 flex justify-between text-xs text-gray-500">
                            <span>Precise (0)</span>
                            <span>Balanced (0.5)</span>
                            <span>Creative (1)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="pt-6 border-t border-gray-200">
                      <h3 className="text-sm font-medium text-gray-900 mb-3">
                        Danger Zone
                      </h3>
                      <div className="space-y-4">
                        <div className="bg-red-50 border border-red-100 rounded-md p-4">
                          <div className="flex">
                            <div className="flex-shrink-0">
                              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <div className="ml-3">
                              <h3 className="text-sm font-medium text-red-800">
                                Warning
                              </h3>
                              <div className="mt-2 text-sm text-red-700">
                                <p>
                                  The following actions are destructive and
                                  cannot be undone. Please proceed with caution.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <Button variant="outline" className="text-red-600 border-red-300 hover:bg-red-50">
                            Archive Project
                          </Button>
                          <Button variant="danger" className="ml-3">
                            Delete Project
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end space-x-3 pt-6">
                      <Button variant="secondary">Cancel</Button>
                      <Button variant="primary">Save Changes</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>}
        </div>
      </div>
    </div>;
}