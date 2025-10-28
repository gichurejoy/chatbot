import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { MessageSquareIcon, MailIcon, PhoneIcon, ClockIcon, PlusIcon, SearchIcon, CheckCircleIcon, AlertCircleIcon, HelpCircleIcon } from 'lucide-react';
export function SupportCenter() {
  const [activeTab, setActiveTab] = useState('tickets');
  const [showNewTicket, setShowNewTicket] = useState(false);
  const tickets = [{
    id: 'TICK-1234',
    subject: 'Chatbot not responding to queries',
    status: 'open',
    priority: 'high',
    created: '2 hours ago',
    lastUpdate: '30 minutes ago'
  }, {
    id: 'TICK-1233',
    subject: 'API rate limit questions',
    status: 'in-progress',
    priority: 'medium',
    created: '1 day ago',
    lastUpdate: '3 hours ago'
  }, {
    id: 'TICK-1232',
    subject: 'Billing inquiry',
    status: 'resolved',
    priority: 'low',
    created: '3 days ago',
    lastUpdate: '2 days ago'
  }];
  const faqs = [{
    question: 'How do I reset my password?',
    answer: 'You can reset your password by clicking on the "Forgot Password" link on the login page.',
    category: 'Account'
  }, {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, PayPal, and bank transfers for enterprise plans.',
    category: 'Billing'
  }, {
    question: 'How do I upgrade my plan?',
    answer: 'Go to Settings > Billing and click on "Change Plan" to view available upgrade options.',
    category: 'Billing'
  }, {
    question: 'Can I export my conversation data?',
    answer: 'Yes, you can export conversation data from the Analytics page or via our API.',
    category: 'Features'
  }, {
    question: 'How do I train my chatbot?',
    answer: 'Upload documents to your Knowledge Base and the chatbot will automatically learn from them.',
    category: 'Chatbots'
  }, {
    question: 'What are the API rate limits?',
    answer: 'Rate limits vary by plan. Professional plans have 100 requests/minute, Enterprise plans have custom limits.',
    category: 'API'
  }];
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'info';
      case 'in-progress':
        return 'default';
      case 'resolved':
        return 'success';
      default:
        return 'default';
    }
  };
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'danger';
      case 'medium':
        return 'default';
      case 'low':
        return 'success';
      default:
        return 'default';
    }
  };
  return <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Support Center</h1>
          <p className="mt-1 text-sm text-gray-500">
            Get help and support for your account
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Button variant="primary" icon={<PlusIcon className="h-5 w-5" />} onClick={() => setShowNewTicket(true)}>
            New Ticket
          </Button>
        </div>
      </div>
      {/* Contact Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100">
                <MessageSquareIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <div className="text-sm font-medium text-gray-500">
                  Live Chat
                </div>
                <div className="mt-1 text-lg font-semibold text-gray-900">
                  Chat Now
                </div>
                <div className="text-xs text-gray-500">Available 24/7</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100">
                <MailIcon className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <div className="text-sm font-medium text-gray-500">Email</div>
                <div className="mt-1 text-lg font-semibold text-gray-900">
                  Send Email
                </div>
                <div className="text-xs text-gray-500">
                  Response in 24 hours
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100">
                <PhoneIcon className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <div className="text-sm font-medium text-gray-500">Phone</div>
                <div className="mt-1 text-lg font-semibold text-gray-900">
                  Call Us
                </div>
                <div className="text-xs text-gray-500">Mon-Fri, 9am-6pm</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button onClick={() => setActiveTab('tickets')} className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'tickets' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
            My Tickets
          </button>
          <button onClick={() => setActiveTab('faq')} className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'faq' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
            FAQs
          </button>
          <button onClick={() => setActiveTab('status')} className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'status' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
            System Status
          </button>
        </nav>
      </div>
      {/* Tickets Tab */}
      {activeTab === 'tickets' && <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">
                Support Tickets
              </h2>
              <div className="relative">
                <input type="text" placeholder="Search tickets..." className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ticket ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Subject
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Priority
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Update
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {tickets.map(ticket => <tr key={ticket.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {ticket.id}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {ticket.subject}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant={getStatusColor(ticket.status)}>
                          {ticket.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant={getPriorityColor(ticket.priority)}>
                          {ticket.priority}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {ticket.created}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {ticket.lastUpdate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </td>
                    </tr>)}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>}
      {/* FAQ Tab */}
      {activeTab === 'faq' && <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900">
                  Frequently Asked Questions
                </h2>
                <div className="relative">
                  <input type="text" placeholder="Search FAQs..." className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {faqs.map((faq, index) => <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start">
                      <HelpCircleIcon className="h-5 w-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-base font-medium text-gray-900">
                            {faq.question}
                          </h3>
                          <Badge variant="default">{faq.category}</Badge>
                        </div>
                        <p className="mt-2 text-sm text-gray-600">
                          {faq.answer}
                        </p>
                        <div className="mt-3 flex items-center text-sm text-gray-500">
                          <button className="text-blue-600 hover:text-blue-700">
                            Was this helpful?
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>)}
              </div>
            </CardContent>
          </Card>
        </div>}
      {/* System Status Tab */}
      {activeTab === 'status' && <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900">
                  System Status
                </h2>
                <Badge variant="success">All Systems Operational</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center">
                    <CheckCircleIcon className="h-6 w-6 text-green-500 mr-3" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        API Services
                      </div>
                      <div className="text-xs text-gray-500">
                        Response time: 45ms
                      </div>
                    </div>
                  </div>
                  <Badge variant="success">Operational</Badge>
                </div>
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center">
                    <CheckCircleIcon className="h-6 w-6 text-green-500 mr-3" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        Chatbot Engine
                      </div>
                      <div className="text-xs text-gray-500">
                        Processing: Normal
                      </div>
                    </div>
                  </div>
                  <Badge variant="success">Operational</Badge>
                </div>
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center">
                    <CheckCircleIcon className="h-6 w-6 text-green-500 mr-3" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        Knowledge Base
                      </div>
                      <div className="text-xs text-gray-500">
                        Upload speed: Fast
                      </div>
                    </div>
                  </div>
                  <Badge variant="success">Operational</Badge>
                </div>
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center">
                    <CheckCircleIcon className="h-6 w-6 text-green-500 mr-3" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        Dashboard
                      </div>
                      <div className="text-xs text-gray-500">
                        Load time: Optimal
                      </div>
                    </div>
                  </div>
                  <Badge variant="success">Operational</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <h2 className="text-lg font-medium text-gray-900">
                Recent Incidents
              </h2>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <CheckCircleIcon className="h-12 w-12 text-green-500 mx-auto mb-3" />
                <p className="text-sm text-gray-500">
                  No incidents reported in the last 30 days
                </p>
              </div>
            </CardContent>
          </Card>
        </div>}
      {/* New Ticket Modal */}
      {showNewTicket && <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl">
            <CardHeader>
              <h2 className="text-lg font-medium text-gray-900">
                Create New Ticket
              </h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <input type="text" placeholder="Brief description of your issue" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Technical Issue</option>
                    <option>Billing Question</option>
                    <option>Feature Request</option>
                    <option>Account Help</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Priority
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                    <option>Critical</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea rows={6} placeholder="Provide detailed information about your issue..." className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Attachments
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                    <p className="text-sm text-gray-500">
                      Drag and drop files here, or click to select
                    </p>
                  </div>
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <Button variant="secondary" onClick={() => setShowNewTicket(false)}>
                    Cancel
                  </Button>
                  <Button variant="primary" onClick={() => setShowNewTicket(false)}>
                    Submit Ticket
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>}
    </div>;
}