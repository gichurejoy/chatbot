import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { PlusIcon, SearchIcon, FilterIcon, DatabaseIcon, FolderIcon, FileTextIcon, CalendarIcon } from 'lucide-react';
export function KnowledgeBase() {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [showNewKBModal, setShowNewKBModal] = useState(false);
  const knowledgeBases = [{
    id: 1,
    name: 'Product Catalog',
    description: 'Detailed product specifications and catalog',
    documents: 156,
    size: '24.6 MB',
    lastUpdated: '3 days ago',
    project: 'E-commerce Assistant',
    type: 'Catalog'
  }, {
    id: 2,
    name: 'Customer FAQs',
    description: 'Frequently asked questions and their answers',
    documents: 78,
    size: '3.2 MB',
    lastUpdated: '1 week ago',
    project: 'Customer Support',
    type: 'FAQ'
  }, {
    id: 3,
    name: 'Technical Documentation',
    description: 'Technical guides and troubleshooting information',
    documents: 124,
    size: '15.8 MB',
    lastUpdated: '2 days ago',
    project: 'Technical Support',
    type: 'Documentation'
  }, {
    id: 4,
    name: 'Sales Resources',
    description: 'Product pricing, promotions, and sales scripts',
    documents: 42,
    size: '8.4 MB',
    lastUpdated: '5 days ago',
    project: 'Sales Automation',
    type: 'Sales'
  }, {
    id: 5,
    name: 'Company Policies',
    description: 'Internal company policies and procedures',
    documents: 35,
    size: '2.1 MB',
    lastUpdated: '2 weeks ago',
    project: 'HR Assistant',
    type: 'Policies'
  }, {
    id: 6,
    name: 'Training Materials',
    description: 'Employee onboarding and training resources',
    documents: 67,
    size: '12.3 MB',
    lastUpdated: '1 month ago',
    project: 'HR Assistant',
    type: 'Training'
  }];
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Catalog':
        return <DatabaseIcon className="h-6 w-6 text-blue-600" />;
      case 'FAQ':
        return <FileTextIcon className="h-6 w-6 text-green-600" />;
      case 'Documentation':
        return <FileTextIcon className="h-6 w-6 text-purple-600" />;
      case 'Sales':
        return <DatabaseIcon className="h-6 w-6 text-orange-600" />;
      case 'Policies':
        return <FolderIcon className="h-6 w-6 text-red-600" />;
      case 'Training':
        return <FolderIcon className="h-6 w-6 text-indigo-600" />;
      default:
        return <DatabaseIcon className="h-6 w-6 text-gray-600" />;
    }
  };
  return <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Knowledge Base</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your knowledge sources for chatbot training
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Button variant="primary" icon={<PlusIcon className="h-5 w-5" />} onClick={() => setShowNewKBModal(true)}>
            New Knowledge Base
          </Button>
        </div>
      </div>
      {/* Filters */}
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="relative flex-1">
          <input type="text" placeholder="Search knowledge bases..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        <div className="flex space-x-2">
          <select className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white">
            <option>All Types</option>
            <option>Catalog</option>
            <option>FAQ</option>
            <option>Documentation</option>
            <option>Sales</option>
            <option>Policies</option>
            <option>Training</option>
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
      {/* Knowledge Bases Grid/List View */}
      {view === 'grid' ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {knowledgeBases.map(kb => <Link key={kb.id} to={`/knowledge-base/${kb.id}`} className="block">
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-md bg-blue-100 flex items-center justify-center">
                        {getTypeIcon(kb.type)}
                      </div>
                      <div className="ml-3">
                        <h3 className="text-lg font-medium text-gray-900">
                          {kb.name}
                        </h3>
                        <p className="text-xs text-gray-500">{kb.type}</p>
                      </div>
                    </div>
                    <Badge variant="info">{kb.documents} docs</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">{kb.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <div className="text-gray-500">
                      Project:{' '}
                      <span className="text-gray-700">{kb.project}</span>
                    </div>
                    <div className="text-gray-500">{kb.size}</div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center text-xs text-gray-400">
                      <CalendarIcon className="h-3 w-3 mr-1" />
                      Updated {kb.lastUpdated}
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
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Project
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Documents
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Size
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
                  {knowledgeBases.map(kb => <tr key={kb.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-md bg-blue-100 flex items-center justify-center">
                            {getTypeIcon(kb.type)}
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">
                              {kb.name}
                            </div>
                            <div className="text-xs text-gray-500 max-w-xs truncate">
                              {kb.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {kb.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {kb.project}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {kb.documents}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {kb.size}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {kb.lastUpdated}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <Button size="sm" variant="outline" as={Link} to={`/knowledge-base/${kb.id}`}>
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
      {/* Simple Modal for demonstration */}
      {showNewKBModal && <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <h2 className="text-lg font-medium text-gray-900">
                Create New Knowledge Base
              </h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input type="text" placeholder="Enter knowledge base name" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Catalog</option>
                    <option>FAQ</option>
                    <option>Documentation</option>
                    <option>Sales</option>
                    <option>Policies</option>
                    <option>Training</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea rows={3} placeholder="Enter description" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <Button variant="secondary" onClick={() => setShowNewKBModal(false)}>
                    Cancel
                  </Button>
                  <Button variant="primary" onClick={() => setShowNewKBModal(false)}>
                    Create
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>}
    </div>;
}