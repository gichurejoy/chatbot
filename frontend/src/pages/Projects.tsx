import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { PlusIcon, SearchIcon, FilterIcon, FoldersIcon, UsersIcon, MessageSquareIcon } from 'lucide-react';
export function Projects() {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const projects = [{
    id: 1,
    name: 'E-commerce Assistant',
    description: 'AI-powered chatbot for e-commerce customer support and product recommendations',
    status: 'Active',
    members: 5,
    chatbots: 3,
    lastUpdated: '2 days ago',
    organization: 'Acme Inc.'
  }, {
    id: 2,
    name: 'Customer Support',
    description: '24/7 customer support chatbot with knowledge base integration',
    status: 'Active',
    members: 8,
    chatbots: 4,
    lastUpdated: '1 day ago',
    organization: 'Acme Inc.'
  }, {
    id: 3,
    name: 'Internal Knowledge Base',
    description: 'Company-wide knowledge base with AI search capabilities',
    status: 'In Progress',
    members: 12,
    chatbots: 2,
    lastUpdated: '5 hours ago',
    organization: 'Tech Solutions'
  }, {
    id: 4,
    name: 'Sales Automation',
    description: 'AI sales assistant for lead qualification and follow-ups',
    status: 'Active',
    members: 4,
    chatbots: 1,
    lastUpdated: '1 week ago',
    organization: 'Sales Pro'
  }, {
    id: 5,
    name: 'HR Assistant',
    description: 'Employee onboarding and HR policy chatbot',
    status: 'Draft',
    members: 3,
    chatbots: 1,
    lastUpdated: '3 days ago',
    organization: 'HR Solutions'
  }, {
    id: 6,
    name: 'Technical Support',
    description: 'Product troubleshooting and technical assistance chatbot',
    status: 'In Progress',
    members: 6,
    chatbots: 2,
    lastUpdated: '12 hours ago',
    organization: 'Tech Support Inc.'
  }];
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Active':
        return 'success';
      case 'In Progress':
        return 'info';
      case 'Draft':
        return 'default';
      default:
        return 'default';
    }
  };
  return <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage and organize your chatbot projects
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Button variant="primary" icon={<PlusIcon className="h-5 w-5" />}>
            New Project
          </Button>
        </div>
      </div>
      {/* Filters */}
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="relative flex-1">
          <input type="text" placeholder="Search projects..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        <div className="flex space-x-2">
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
      {/* Projects Grid/List View */}
      {view === 'grid' ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => <Link key={project.id} to={`/projects/${project.id}`} className="block">
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-md bg-blue-100 flex items-center justify-center">
                        <FoldersIcon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-lg font-medium text-gray-900">
                          {project.name}
                        </h3>
                        <p className="text-xs text-gray-500">
                          {project.organization}
                        </p>
                      </div>
                    </div>
                    <Badge variant={getStatusVariant(project.status)}>
                      {project.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    {project.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex space-x-4">
                      <div className="flex items-center">
                        <UsersIcon className="h-4 w-4 mr-1" />
                        {project.members}
                      </div>
                      <div className="flex items-center">
                        <MessageSquareIcon className="h-4 w-4 mr-1" />
                        {project.chatbots}
                      </div>
                    </div>
                    <div>Updated {project.lastUpdated}</div>
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
                      Project
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Organization
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Members
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Chatbots
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Updated
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {projects.map(project => <tr key={project.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link to={`/projects/${project.id}`} className="flex items-center">
                          <div className="h-8 w-8 rounded-md bg-blue-100 flex items-center justify-center">
                            <FoldersIcon className="h-4 w-4 text-blue-600" />
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">
                              {project.name}
                            </div>
                            <div className="text-xs text-gray-500 max-w-xs truncate">
                              {project.description}
                            </div>
                          </div>
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {project.organization}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant={getStatusVariant(project.status)}>
                          {project.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {project.members}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {project.chatbots}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {project.lastUpdated}
                      </td>
                    </tr>)}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>}
    </div>;
}