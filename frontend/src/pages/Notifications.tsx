import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { BellIcon, CheckIcon, TrashIcon, MessageSquareIcon, AlertCircleIcon, InfoIcon, CheckCircleIcon, UserPlusIcon, SettingsIcon } from 'lucide-react';
export function Notifications() {
  const [filter, setFilter] = useState('all');
  const notifications = [{
    id: 1,
    type: 'alert',
    title: 'High Error Rate Detected',
    message: 'Customer Support Assistant is experiencing a 15% error rate',
    time: '5 minutes ago',
    read: false,
    icon: AlertCircleIcon,
    color: 'red'
  }, {
    id: 2,
    type: 'info',
    title: 'New Team Member Added',
    message: 'Emily Davis has been added to E-commerce Assistant project',
    time: '1 hour ago',
    read: false,
    icon: UserPlusIcon,
    color: 'blue'
  }, {
    id: 3,
    type: 'success',
    title: 'Chatbot Training Completed',
    message: 'Product Recommendations chatbot training finished successfully',
    time: '2 hours ago',
    read: true,
    icon: CheckCircleIcon,
    color: 'green'
  }, {
    id: 4,
    type: 'message',
    title: 'New Conversation Feedback',
    message: 'User rated their conversation 5 stars with positive feedback',
    time: '3 hours ago',
    read: true,
    icon: MessageSquareIcon,
    color: 'purple'
  }, {
    id: 5,
    type: 'info',
    title: 'Knowledge Base Updated',
    message: 'Product Catalog has been updated with 25 new documents',
    time: '5 hours ago',
    read: true,
    icon: InfoIcon,
    color: 'blue'
  }, {
    id: 6,
    type: 'alert',
    title: 'API Rate Limit Warning',
    message: 'You are approaching your monthly API usage limit (85% used)',
    time: '1 day ago',
    read: true,
    icon: AlertCircleIcon,
    color: 'orange'
  }, {
    id: 7,
    type: 'success',
    title: 'Project Milestone Reached',
    message: 'E-commerce Assistant has handled 10,000 conversations',
    time: '2 days ago',
    read: true,
    icon: CheckCircleIcon,
    color: 'green'
  }, {
    id: 8,
    type: 'info',
    title: 'System Maintenance Scheduled',
    message: 'Planned maintenance on June 25th from 2:00 AM to 4:00 AM EST',
    time: '3 days ago',
    read: true,
    icon: SettingsIcon,
    color: 'blue'
  }];
  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.read;
    return notification.type === filter;
  });
  const unreadCount = notifications.filter(n => !n.read).length;
  const getIconColor = (color: string) => {
    const colors: {
      [key: string]: string;
    } = {
      red: 'bg-red-100 text-red-600',
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600',
      orange: 'bg-orange-100 text-orange-600'
    };
    return colors[color] || 'bg-gray-100 text-gray-600';
  };
  return <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <p className="mt-1 text-sm text-gray-500">
            Stay updated with your chatbot activities
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <Button variant="outline" icon={<CheckIcon className="h-5 w-5" />}>
            Mark All as Read
          </Button>
          <Button variant="outline" icon={<TrashIcon className="h-5 w-5" />}>
            Clear All
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-medium text-gray-900">Filters</h2>
            </CardHeader>
            <CardContent className="p-0">
              <nav className="flex flex-col">
                <button onClick={() => setFilter('all')} className={`flex items-center justify-between px-4 py-3 text-sm font-medium ${filter === 'all' ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}>
                  <span>All Notifications</span>
                  <Badge variant="default">{notifications.length}</Badge>
                </button>
                <button onClick={() => setFilter('unread')} className={`flex items-center justify-between px-4 py-3 text-sm font-medium ${filter === 'unread' ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}>
                  <span>Unread</span>
                  <Badge variant="danger">{unreadCount}</Badge>
                </button>
                <button onClick={() => setFilter('alert')} className={`flex items-center justify-between px-4 py-3 text-sm font-medium ${filter === 'alert' ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}>
                  <span>Alerts</span>
                </button>
                <button onClick={() => setFilter('message')} className={`flex items-center justify-between px-4 py-3 text-sm font-medium ${filter === 'message' ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}>
                  <span>Messages</span>
                </button>
                <button onClick={() => setFilter('info')} className={`flex items-center justify-between px-4 py-3 text-sm font-medium ${filter === 'info' ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}>
                  <span>Info</span>
                </button>
                <button onClick={() => setFilter('success')} className={`flex items-center justify-between px-4 py-3 text-sm font-medium ${filter === 'success' ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}>
                  <span>Success</span>
                </button>
              </nav>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-3">
          <Card>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-200">
                {filteredNotifications.map(notification => <div key={notification.id} className={`p-6 hover:bg-gray-50 transition-colors ${!notification.read ? 'bg-blue-50' : ''}`}>
                    <div className="flex items-start space-x-4">
                      <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${getIconColor(notification.color)}`}>
                        <notification.icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <h3 className="text-sm font-medium text-gray-900">
                                {notification.title}
                              </h3>
                              {!notification.read && <span className="h-2 w-2 bg-blue-600 rounded-full"></span>}
                            </div>
                            <p className="mt-1 text-sm text-gray-600">
                              {notification.message}
                            </p>
                            <p className="mt-2 text-xs text-gray-500">
                              {notification.time}
                            </p>
                          </div>
                          <div className="flex-shrink-0 ml-4 flex space-x-2">
                            {!notification.read && <button className="text-blue-600 hover:text-blue-700">
                                <CheckIcon className="h-5 w-5" />
                              </button>}
                            <button className="text-gray-400 hover:text-gray-600">
                              <TrashIcon className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>)}
              </div>
            </CardContent>
          </Card>
          {filteredNotifications.length === 0 && <Card>
              <CardContent className="p-12 text-center">
                <BellIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No notifications
                </h3>
                <p className="text-sm text-gray-500">
                  You are all caught up! Check back later for new updates.
                </p>
              </CardContent>
            </Card>}
        </div>
      </div>
    </div>;
}