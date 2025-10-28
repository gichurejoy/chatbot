import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { SearchIcon, FilterIcon, DownloadIcon, UserIcon, FileTextIcon, SettingsIcon, TrashIcon, PlusIcon, EditIcon } from 'lucide-react';
export function AuditLogs() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAction, setSelectedAction] = useState('all');
  const [selectedUser, setSelectedUser] = useState('all');
  const logs = [{
    id: 1,
    user: 'John Doe',
    action: 'created',
    resource: 'Chatbot',
    resourceName: 'Customer Support Assistant',
    timestamp: '2024-01-15 14:30:25',
    ipAddress: '192.168.1.100',
    details: 'Created new chatbot with GPT-4 model'
  }, {
    id: 2,
    user: 'Sarah Johnson',
    action: 'updated',
    resource: 'Knowledge Base',
    resourceName: 'Product Catalog',
    timestamp: '2024-01-15 13:45:10',
    ipAddress: '192.168.1.101',
    details: 'Added 25 new documents'
  }, {
    id: 3,
    user: 'Michael Brown',
    action: 'deleted',
    resource: 'Chatbot',
    resourceName: 'Test Bot',
    timestamp: '2024-01-15 12:20:45',
    ipAddress: '192.168.1.102',
    details: 'Permanently deleted chatbot'
  }, {
    id: 4,
    user: 'John Doe',
    action: 'updated',
    resource: 'Project Settings',
    resourceName: 'E-commerce Assistant',
    timestamp: '2024-01-15 11:15:30',
    ipAddress: '192.168.1.100',
    details: 'Changed default AI model to GPT-4'
  }, {
    id: 5,
    user: 'Emily Davis',
    action: 'created',
    resource: 'Team Member',
    resourceName: 'Robert Wilson',
    timestamp: '2024-01-15 10:05:15',
    ipAddress: '192.168.1.103',
    details: 'Added new team member with Editor role'
  }, {
    id: 6,
    user: 'Sarah Johnson',
    action: 'updated',
    resource: 'Chatbot',
    resourceName: 'Product Recommendations',
    timestamp: '2024-01-14 16:40:20',
    ipAddress: '192.168.1.101',
    details: 'Modified temperature setting to 0.8'
  }, {
    id: 7,
    user: 'John Doe',
    action: 'created',
    resource: 'Knowledge Base',
    resourceName: 'Technical Documentation',
    timestamp: '2024-01-14 15:25:35',
    ipAddress: '192.168.1.100',
    details: 'Created new knowledge base with 50 documents'
  }, {
    id: 8,
    user: 'Michael Brown',
    action: 'updated',
    resource: 'User Permissions',
    resourceName: 'Emily Davis',
    timestamp: '2024-01-14 14:10:50',
    ipAddress: '192.168.1.102',
    details: 'Changed role from Viewer to Editor'
  }];
  const getActionIcon = (action: string) => {
    switch (action) {
      case 'created':
        return <PlusIcon className="h-4 w-4" />;
      case 'updated':
        return <EditIcon className="h-4 w-4" />;
      case 'deleted':
        return <TrashIcon className="h-4 w-4" />;
      default:
        return <FileTextIcon className="h-4 w-4" />;
    }
  };
  const getActionVariant = (action: string) => {
    switch (action) {
      case 'created':
        return 'success';
      case 'updated':
        return 'info';
      case 'deleted':
        return 'danger';
      default:
        return 'default';
    }
  };
  return <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Audit Logs</h1>
          <p className="mt-1 text-sm text-gray-500">
            Track all actions and changes in your workspace
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <Button variant="outline" icon={<FilterIcon className="h-5 w-5" />}>
            Advanced Filters
          </Button>
          <Button variant="outline" icon={<DownloadIcon className="h-5 w-5" />}>
            Export Logs
          </Button>
        </div>
      </div>
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search logs..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <select value={selectedAction} onChange={e => setSelectedAction(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="all">All Actions</option>
              <option value="created">Created</option>
              <option value="updated">Updated</option>
              <option value="deleted">Deleted</option>
            </select>
            <select value={selectedUser} onChange={e => setSelectedUser(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="all">All Users</option>
              <option value="john">John Doe</option>
              <option value="sarah">Sarah Johnson</option>
              <option value="michael">Michael Brown</option>
              <option value="emily">Emily Davis</option>
            </select>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Resource
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Timestamp
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    IP Address
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {logs.map(log => <tr key={log.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-medium text-sm">
                          {log.user.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">
                            {log.user}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={getActionVariant(log.action)} icon={getActionIcon(log.action)}>
                        {log.action}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {log.resource}
                      </div>
                      <div className="text-xs text-gray-500">
                        {log.resourceName}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600 max-w-xs truncate">
                        {log.details}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {log.timestamp}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {log.ipAddress}
                    </td>
                  </tr>)}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
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