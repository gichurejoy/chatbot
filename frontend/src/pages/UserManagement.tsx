import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { PlusIcon, SearchIcon, FilterIcon, UserIcon, UsersIcon, MailIcon, CalendarIcon, CheckIcon, XIcon, ShieldIcon } from 'lucide-react';
export function UserManagement() {
  const [view, setView] = useState<'active' | 'pending' | 'inactive'>('active');
  const users = [{
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Owner',
    status: 'active',
    teams: ['Product', 'Management'],
    lastActive: '2 hours ago',
    avatar: 'JD'
  }, {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    role: 'Admin',
    status: 'active',
    teams: ['Marketing', 'Support'],
    lastActive: '1 day ago',
    avatar: 'SJ'
  }, {
    id: 3,
    name: 'Michael Brown',
    email: 'm.brown@example.com',
    role: 'Editor',
    status: 'active',
    teams: ['Engineering'],
    lastActive: '3 days ago',
    avatar: 'MB'
  }, {
    id: 4,
    name: 'Emily Davis',
    email: 'emily.d@example.com',
    role: 'Viewer',
    status: 'active',
    teams: ['Support'],
    lastActive: 'Just now',
    avatar: 'ED'
  }, {
    id: 5,
    name: 'Robert Wilson',
    email: 'r.wilson@example.com',
    role: 'Editor',
    status: 'inactive',
    teams: ['Sales'],
    lastActive: '1 month ago',
    avatar: 'RW'
  }, {
    id: 6,
    name: 'Jennifer Lee',
    email: 'j.lee@example.com',
    role: 'Viewer',
    status: 'pending',
    teams: ['Marketing'],
    lastActive: 'Never',
    avatar: 'JL'
  }];
  const filteredUsers = users.filter(user => {
    if (view === 'active') return user.status === 'active';
    if (view === 'pending') return user.status === 'pending';
    if (view === 'inactive') return user.status === 'inactive';
    return true;
  });
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
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckIcon className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <CalendarIcon className="h-5 w-5 text-yellow-500" />;
      case 'inactive':
        return <XIcon className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };
  return <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage users and their access levels
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Button variant="primary" icon={<PlusIcon className="h-5 w-5" />}>
            Invite User
          </Button>
        </div>
      </div>
      {/* Filters */}
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="relative flex-1">
          <input type="text" placeholder="Search users..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        <div className="flex space-x-2">
          <select className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white">
            <option>All Roles</option>
            <option>Owner</option>
            <option>Admin</option>
            <option>Editor</option>
            <option>Viewer</option>
          </select>
          <Button variant="outline" icon={<FilterIcon className="h-5 w-5" />}>
            Filter
          </Button>
        </div>
      </div>
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button onClick={() => setView('active')} className={`py-4 px-1 border-b-2 font-medium text-sm ${view === 'active' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
            Active Users
          </button>
          <button onClick={() => setView('pending')} className={`py-4 px-1 border-b-2 font-medium text-sm ${view === 'pending' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
            Pending Invitations
          </button>
          <button onClick={() => setView('inactive')} className={`py-4 px-1 border-b-2 font-medium text-sm ${view === 'inactive' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
            Inactive Users
          </button>
        </nav>
      </div>
      {/* Users List */}
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
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Teams
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Active
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map(user => <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-medium">
                          {user.avatar}
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">
                            {user.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={getRoleVariant(user.role)}>
                        {user.role}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-wrap gap-1">
                        {user.teams.map((team, i) => <Badge key={i} variant="default">
                            {team}
                          </Badge>)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getStatusIcon(user.status)}
                        <span className="ml-2 text-sm text-gray-500 capitalize">
                          {user.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.lastActive}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Button size="sm" variant="outline">
                          Edit
                        </Button>
                        {user.status === 'active' && <Button size="sm" variant="danger">
                            Deactivate
                          </Button>}
                        {user.status === 'pending' && <Button size="sm" variant="danger">
                            Cancel
                          </Button>}
                        {user.status === 'inactive' && <Button size="sm" variant="success">
                            Activate
                          </Button>}
                      </div>
                    </td>
                  </tr>)}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      {view === 'active' && <Card>
          <CardHeader>
            <h2 className="text-lg font-medium text-gray-900">
              Role Permissions
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Understanding the different access levels in the system
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                  <ShieldIcon className="h-6 w-6 text-red-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-900">Owner</h3>
                  <p className="text-sm text-gray-500">
                    Full access to all features and settings. Can manage billing
                    and organization settings.
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <ShieldIcon className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-900">Admin</h3>
                  <p className="text-sm text-gray-500">
                    Can manage users, projects, and most settings. Cannot access
                    billing information.
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                  <ShieldIcon className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-900">Editor</h3>
                  <p className="text-sm text-gray-500">
                    Can create and edit chatbots, knowledge bases, and content.
                    Cannot manage users or settings.
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <ShieldIcon className="h-6 w-6 text-gray-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-900">Viewer</h3>
                  <p className="text-sm text-gray-500">
                    Read-only access to projects and chatbots. Cannot make any
                    changes to the system.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>}
    </div>;
}