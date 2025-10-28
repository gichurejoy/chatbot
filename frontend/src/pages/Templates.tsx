import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { SearchIcon, FilterIcon, StarIcon, DownloadIcon, MessageSquareIcon, ShoppingCartIcon, HeadphonesIcon, BriefcaseIcon, GraduationCapIcon, HeartPulseIcon } from 'lucide-react';
export function Templates() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const categories = [{
    id: 'all',
    name: 'All Templates',
    count: 24
  }, {
    id: 'customer-support',
    name: 'Customer Support',
    count: 8
  }, {
    id: 'sales',
    name: 'Sales',
    count: 6
  }, {
    id: 'hr',
    name: 'Human Resources',
    count: 4
  }, {
    id: 'education',
    name: 'Education',
    count: 3
  }, {
    id: 'healthcare',
    name: 'Healthcare',
    count: 3
  }];
  const templates = [{
    id: 1,
    name: 'Customer Support Assistant',
    description: 'Handle common customer inquiries, FAQs, and support tickets with AI-powered responses',
    category: 'customer-support',
    icon: HeadphonesIcon,
    color: 'blue',
    rating: 4.8,
    uses: 1234,
    features: ['24/7 Availability', 'Multi-language', 'Ticket Creation', 'Knowledge Base Integration']
  }, {
    id: 2,
    name: 'E-commerce Sales Bot',
    description: 'Boost sales with product recommendations, order tracking, and personalized shopping assistance',
    category: 'sales',
    icon: ShoppingCartIcon,
    color: 'green',
    rating: 4.9,
    uses: 856,
    features: ['Product Recommendations', 'Cart Management', 'Order Status', 'Upselling']
  }, {
    id: 3,
    name: 'Lead Qualification Bot',
    description: 'Qualify leads, schedule meetings, and nurture prospects through the sales funnel',
    category: 'sales',
    icon: BriefcaseIcon,
    color: 'purple',
    rating: 4.7,
    uses: 645,
    features: ['Lead Scoring', 'Meeting Scheduler', 'CRM Integration', 'Follow-up Automation']
  }, {
    id: 4,
    name: 'HR Onboarding Assistant',
    description: 'Guide new employees through onboarding, answer policy questions, and manage documents',
    category: 'hr',
    icon: GraduationCapIcon,
    color: 'orange',
    rating: 4.6,
    uses: 432,
    features: ['Document Management', 'Policy Q&A', 'Task Tracking', 'Welcome Messages']
  }, {
    id: 5,
    name: 'Technical Support Bot',
    description: 'Provide technical troubleshooting, system diagnostics, and IT support',
    category: 'customer-support',
    icon: MessageSquareIcon,
    color: 'red',
    rating: 4.8,
    uses: 789,
    features: ['Troubleshooting', 'System Diagnostics', 'Ticket Escalation', 'Knowledge Articles']
  }, {
    id: 6,
    name: 'Patient Appointment Scheduler',
    description: 'Schedule appointments, send reminders, and manage patient inquiries',
    category: 'healthcare',
    icon: HeartPulseIcon,
    color: 'pink',
    rating: 4.9,
    uses: 567,
    features: ['Appointment Booking', 'Reminders', 'Patient Records', 'HIPAA Compliant']
  }];
  const filteredTemplates = templates.filter(template => {
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) || template.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  const getIconColor = (color: string) => {
    const colors: {
      [key: string]: string;
    } = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600',
      orange: 'bg-orange-100 text-orange-600',
      red: 'bg-red-100 text-red-600',
      pink: 'bg-pink-100 text-pink-600'
    };
    return colors[color] || 'bg-gray-100 text-gray-600';
  };
  return <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Chatbot Templates
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Start quickly with pre-built chatbot templates
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-medium text-gray-900">Categories</h2>
            </CardHeader>
            <CardContent className="p-0">
              <nav className="flex flex-col">
                {categories.map(category => <button key={category.id} onClick={() => setSelectedCategory(category.id)} className={`flex items-center justify-between px-4 py-3 text-sm font-medium ${selectedCategory === category.id ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}>
                    <span>{category.name}</span>
                    <Badge variant="default">{category.count}</Badge>
                  </button>)}
              </nav>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-3 space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search templates..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
                <Button variant="outline" icon={<FilterIcon className="h-5 w-5" />}>
                  Filters
                </Button>
              </div>
            </CardContent>
          </Card>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredTemplates.map(template => <Card key={template.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${getIconColor(template.color)}`}>
                        <template.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {template.name}
                        </h3>
                        <div className="flex items-center mt-1 space-x-2">
                          <div className="flex items-center">
                            <StarIcon className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="ml-1 text-sm text-gray-600">
                              {template.rating}
                            </span>
                          </div>
                          <span className="text-sm text-gray-400">•</span>
                          <span className="text-sm text-gray-600">
                            {template.uses} uses
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    {template.description}
                  </p>
                  <div className="space-y-2 mb-4">
                    <div className="text-xs font-medium text-gray-500 uppercase">
                      Key Features
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {template.features.map((feature, index) => <Badge key={index} variant="info">
                          {feature}
                        </Badge>)}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="primary" className="flex-1">
                      Use Template
                    </Button>
                    <Button variant="outline" icon={<DownloadIcon className="h-4 w-4" />}>
                      Preview
                    </Button>
                  </div>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </div>
    </div>;
}