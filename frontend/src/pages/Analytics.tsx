import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { BarChart3Icon, TrendingUpIcon, MessageSquareIcon, UsersIcon, ChevronDownIcon, DownloadIcon, CalendarIcon, PieChartIcon, ActivityIcon } from 'lucide-react';
import { AnalyticsAPI } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
export function Analytics() {
  const [dateRange, setDateRange] = useState('last30');
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const data = await AnalyticsAPI.overview();
        setAnalytics(data);
      } catch (error) {
        console.error('Failed to fetch analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  const totalInteractions = analytics?.total_conversations ?? 0;
  const avgAccuracy = analytics?.average_accuracy ?? 0;
  const userSatisfactionPct = analytics?.average_rating ? analytics.average_rating * 20 : 0;
  const escalationRate = analytics?.escalation_rate ?? 0;

  return <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="mt-1 text-sm text-gray-500">
            Monitor performance and usage statistics
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-2">
          <div className="relative">
            <select value={dateRange} onChange={e => setDateRange(e.target.value)} className="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="last7">Last 7 days</option>
              <option value="last30">Last 30 days</option>
              <option value="thisMonth">This month</option>
              <option value="lastMonth">Last month</option>
              <option value="custom">Custom range</option>
            </select>
            <ChevronDownIcon className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>
          <Button variant="outline" icon={<DownloadIcon className="h-5 w-5" />}>
            Export
          </Button>
        </div>
      </div>
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Interactions" value={totalInteractions.toLocaleString()} change="+12.5%" trend="up" icon={<MessageSquareIcon className="h-6 w-6 text-blue-600" />} />
        <StatCard title="Avg. Accuracy" value={`${avgAccuracy.toFixed(1)}%`} change="+2.3%" trend="up" icon={<BarChart3Icon className="h-6 w-6 text-green-600" />} />
        <StatCard title="User Satisfaction" value={`${userSatisfactionPct.toFixed(1)}%`} change="-0.8%" trend="down" icon={<UsersIcon className="h-6 w-6 text-purple-600" />} />
        <StatCard title="Escalation Rate" value={`${escalationRate.toFixed(1)}%`} change="-3.1%" trend="up" icon={<TrendingUpIcon className="h-6 w-6 text-orange-600" />} />
      </div>
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">
                Interactions Over Time
              </h2>
              <Badge variant="info">+24% vs previous period</Badge>
            </div>
          </CardHeader>
          <CardContent className="h-80">
            <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded-md">
              <div className="text-center">
                <BarChart3Icon className="h-12 w-12 text-gray-400 mx-auto" />
                <div className="mt-2 text-sm text-gray-500">
                  Interaction trends chart
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">
                Chatbot Performance
              </h2>
              <div className="flex space-x-2">
                <Badge variant="success">Accuracy</Badge>
                <Badge variant="info">Satisfaction</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="h-80">
            <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded-md">
              <div className="text-center">
                <TrendingUpIcon className="h-12 w-12 text-gray-400 mx-auto" />
                <div className="mt-2 text-sm text-gray-500">
                  Performance metrics chart
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <h2 className="text-lg font-medium text-gray-900">
              Interaction Distribution
            </h2>
          </CardHeader>
          <CardContent className="h-64">
            <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded-md">
              <div className="text-center">
                <PieChartIcon className="h-12 w-12 text-gray-400 mx-auto" />
                <div className="mt-2 text-sm text-gray-500">
                  Distribution by chatbot type
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">
                Top Performing Chatbots
              </h2>
              <select className="border border-gray-300 rounded-md px-3 py-1 text-sm bg-white">
                <option>By Accuracy</option>
                <option>By Volume</option>
                <option>By Satisfaction</option>
              </select>
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
                      Accuracy
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Satisfaction
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Interactions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[{
                  name: 'Customer Support Assistant',
                  type: 'Customer Support',
                  accuracy: '94%',
                  satisfaction: '92%',
                  interactions: '1,245'
                }, {
                  name: 'FAQ Bot',
                  type: 'General Purpose',
                  accuracy: '96%',
                  satisfaction: '95%',
                  interactions: '856'
                }, {
                  name: 'Product Guide',
                  type: 'Technical Support',
                  accuracy: '91%',
                  satisfaction: '89%',
                  interactions: '723'
                }, {
                  name: 'Sales Bot',
                  type: 'Sales',
                  accuracy: '88%',
                  satisfaction: '90%',
                  interactions: '512'
                }].map((bot, index) => <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {bot.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {bot.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {bot.accuracy}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {bot.satisfaction}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {bot.interactions}
                      </td>
                    </tr>)}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h2 className="text-lg font-medium text-gray-900">
              User Feedback Analysis
            </h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <div className="text-sm font-medium text-gray-700">
                    Positive Feedback
                  </div>
                  <div className="text-sm font-medium text-gray-900">72%</div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{
                  width: '72%'
                }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <div className="text-sm font-medium text-gray-700">
                    Neutral Feedback
                  </div>
                  <div className="text-sm font-medium text-gray-900">19%</div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{
                  width: '19%'
                }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <div className="text-sm font-medium text-gray-700">
                    Negative Feedback
                  </div>
                  <div className="text-sm font-medium text-gray-900">9%</div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{
                  width: '9%'
                }}></div>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-900 mb-3">
                Top Feedback Categories
              </h3>
              <div className="space-y-2">
                {[{
                category: 'Accurate Responses',
                percentage: 45
              }, {
                category: 'Fast Resolution',
                percentage: 32
              }, {
                category: 'Helpful Suggestions',
                percentage: 18
              }, {
                category: 'Unclear Answers',
                percentage: 5
              }].map((item, index) => <div key={index} className="flex items-center">
                    <div className="w-32 text-sm text-gray-500">
                      {item.category}
                    </div>
                    <div className="flex-1 ml-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className={`h-2 rounded-full ${index < 3 ? 'bg-green-500' : 'bg-red-500'}`} style={{
                      width: `${item.percentage}%`
                    }}></div>
                      </div>
                    </div>
                    <div className="ml-2 text-sm text-gray-500">
                      {item.percentage}%
                    </div>
                  </div>)}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <h2 className="text-lg font-medium text-gray-900">
              Knowledge Base Usage
            </h2>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <div className="flex items-center justify-between mb-1">
                <div className="text-sm font-medium text-gray-700">
                  Knowledge Base Coverage
                </div>
                <div className="text-sm font-medium text-gray-900">86%</div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{
                width: '86%'
              }}></div>
              </div>
              <div className="mt-1 text-xs text-gray-500">
                Percentage of queries that matched knowledge base content
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-900">
                Most Used Knowledge Bases
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Knowledge Base
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Usage
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Accuracy
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[{
                    name: 'Product Documentation',
                    usage: '42%',
                    accuracy: '94%'
                  }, {
                    name: 'Customer FAQs',
                    usage: '28%',
                    accuracy: '96%'
                  }, {
                    name: 'Sales Resources',
                    usage: '15%',
                    accuracy: '92%'
                  }, {
                    name: 'Training Materials',
                    usage: '9%',
                    accuracy: '88%'
                  }, {
                    name: 'Company Policies',
                    usage: '6%',
                    accuracy: '95%'
                  }].map((kb, index) => <tr key={index}>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                          {kb.name}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                          {kb.usage}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                          {kb.accuracy}
                        </td>
                      </tr>)}
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>;
}
interface StatCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ReactNode;
}
function StatCard({
  title,
  value,
  change,
  trend,
  icon
}: StatCardProps) {
  return <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center">
          <div className="p-2 rounded-md bg-gray-50">{icon}</div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-500">{title}</div>
            <div className="mt-1 flex items-baseline">
              <div className="text-2xl font-semibold text-gray-900">
                {value}
              </div>
              <div className={`ml-2 flex items-baseline text-sm ${trend === 'up' && !title.includes('Escalation') || trend === 'down' && title.includes('Escalation') ? 'text-green-600' : 'text-red-600'}`}>
                {change}
                {trend === 'up' ? <TrendingUpIcon className="h-4 w-4 ml-1" /> : <ActivityIcon className="h-4 w-4 ml-1" />}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>;
}