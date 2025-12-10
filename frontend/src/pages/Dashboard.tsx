  
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Onboarding } from '../components/Onboarding';
import { useEffect, useState } from 'react';
import { ProjectsAPI, ChatbotsAPI, AnalyticsAPI } from '../services/api';
import { MessageSquareIcon, TrendingUpIcon, UsersIcon, ActivityIcon, PlusIcon, ArrowUpIcon, ArrowDownIcon, DatabaseIcon, BarChart3Icon } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';
export function Dashboard() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [stats, setStats] = useState({
    totalConversations: 0,
    activeChatbots: 0,
    avgResponseTime: 0,
    userSatisfaction: 0
  });
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [chatbots, analytics] = await Promise.all([
          ChatbotsAPI.list(),
          AnalyticsAPI.overview()
        ]);
  
        setStats({
          totalConversations: analytics.total_conversations,
          activeChatbots: analytics.active_chatbots,
          avgResponseTime: analytics.average_response_time,
          userSatisfaction: analytics.average_rating * 20 // Convert 1-5 to percentage
        });
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchDashboardData();
  }, []);
  const statsData = [
    {
      name: 'Total Conversations',
      value: stats.totalConversations.toLocaleString(),
      change: '+12.5%',
      changeType: 'increase',
      icon: MessageSquareIcon
    },
    {
      name: 'Active Chatbots',
      value: stats.activeChatbots.toString(),
      change: '+2',
      changeType: 'increase',
      icon: ActivityIcon
    },
    {
      name: 'Avg Response Time',
      value: `${stats.avgResponseTime.toFixed(1)}ms`,
      change: '-0.3s',
      changeType: 'increase',
      icon: TrendingUpIcon
    },
    {
      name: 'User Satisfaction',
      value: `${stats.userSatisfaction.toFixed(0)}%`,
      change: '+3%',
      changeType: 'increase',
      icon: UsersIcon
    }
  ];
  const recentActivity = [{
    id: 1,
    type: 'chatbot',
    message: 'Customer Support Bot was updated',
    time: '2 hours ago',
    user: 'John Doe'
  }, {
    id: 2,
    type: 'conversation',
    message: 'New conversation started',
    time: '3 hours ago',
    user: 'Sarah Johnson'
  }, {
    id: 3,
    type: 'knowledge',
    message: 'Product Catalog updated',
    time: '5 hours ago',
    user: 'Michael Brown'
  }, {
    id: 4,
    type: 'user',
    message: 'New team member added',
    time: '1 day ago',
    user: 'Admin'
  }];
  if (loading) {
    return <LoadingSpinner />;
  }
  return <div className="space-y-6">
      {showOnboarding && <Onboarding onComplete={() => setShowOnboarding(false)} />}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Welcome back! Here's what's happening with your chatbots today.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <Button variant="outline" onClick={() => setShowOnboarding(true)}>
            Start Tour
          </Button>
          <Link to="/chatbots">
            <Button variant="primary" icon={<PlusIcon className="h-5 w-5" />}>
              New Chatbot
            </Button>
          </Link>
        </div>
      </div>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map(stat => <Card key={stat.name}>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 rounded-md bg-blue-100">
                  <stat.icon className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4 flex-1">
                  <div className="text-sm font-medium text-gray-500">
                    {stat.name}
                  </div>
                  <div className="mt-1 flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {stat.value}
                    </div>
                    <div className={`ml-2 flex items-center text-sm font-medium ${stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.changeType === 'increase' ? <ArrowUpIcon className="h-4 w-4 mr-1" /> : <ArrowDownIcon className="h-4 w-4 mr-1" />}
                      {stat.change}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>)}
      </div>
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link to="/chatbots">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 rounded-md bg-blue-100">
                  <PlusIcon className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <div className="text-sm font-medium text-gray-500">
                    New Chatbot
                  </div>
                  <div className="mt-1 text-lg font-semibold text-gray-900">
                    Create
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link to="/knowledge-base">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 rounded-md bg-purple-100">
                  <DatabaseIcon className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <div className="text-sm font-medium text-gray-500">
                    Knowledge Base
                  </div>
                  <div className="mt-1 text-lg font-semibold text-gray-900">
                    Upload
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link to="/conversations">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 rounded-md bg-green-100">
                  <MessageSquareIcon className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <div className="text-sm font-medium text-gray-500">
                    Conversations
                  </div>
                  <div className="mt-1 text-lg font-semibold text-gray-900">
                    View
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link to="/analytics">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 rounded-md bg-orange-100">
                  <BarChart3Icon className="h-6 w-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <div className="text-sm font-medium text-gray-500">
                    Analytics
                  </div>
                  <div className="mt-1 text-lg font-semibold text-gray-900">
                    Analyze
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map(activity => <div key={activity.id} className="flex items-start border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.message}</p>
                  <div className="mt-1 flex items-center text-xs text-gray-500">
                    <span>{activity.user}</span>
                    <span className="mx-2">•</span>
                    <span>{activity.time}</span>
                  </div>
                </div>
              </div>)}
          </div>
        </CardContent>
      </Card>
    </div>;
}