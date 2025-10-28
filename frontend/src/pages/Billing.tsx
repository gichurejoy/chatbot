import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { CreditCardIcon, DownloadIcon, CheckIcon, XIcon, TrendingUpIcon, CalendarIcon } from 'lucide-react';
export function Billing() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const plans = [{
    name: 'Starter',
    price: {
      monthly: 29,
      annual: 290
    },
    description: 'Perfect for small teams and startups',
    features: ['2 Chatbots', '1,000 conversations/month', '100 MB knowledge base', 'Email support', 'Basic analytics'],
    notIncluded: ['Advanced AI models', 'Custom integrations', 'Priority support'],
    current: false
  }, {
    name: 'Professional',
    price: {
      monthly: 99,
      annual: 990
    },
    description: 'For growing businesses with more needs',
    features: ['10 Chatbots', '10,000 conversations/month', '1 GB knowledge base', 'Priority email support', 'Advanced analytics', 'Custom branding', 'API access'],
    notIncluded: ['Dedicated account manager', 'Custom AI training'],
    current: true,
    popular: true
  }, {
    name: 'Enterprise',
    price: {
      monthly: 299,
      annual: 2990
    },
    description: 'For large organizations with custom needs',
    features: ['Unlimited chatbots', 'Unlimited conversations', 'Unlimited knowledge base', '24/7 phone & email support', 'Advanced analytics & reporting', 'Custom branding', 'API access', 'Dedicated account manager', 'Custom AI training', 'SLA guarantee'],
    notIncluded: [],
    current: false
  }];
  const invoices = [{
    id: 'INV-2024-001',
    date: 'Jan 15, 2024',
    amount: 99.0,
    status: 'Paid',
    plan: 'Professional'
  }, {
    id: 'INV-2023-012',
    date: 'Dec 15, 2023',
    amount: 99.0,
    status: 'Paid',
    plan: 'Professional'
  }, {
    id: 'INV-2023-011',
    date: 'Nov 15, 2023',
    amount: 99.0,
    status: 'Paid',
    plan: 'Professional'
  }, {
    id: 'INV-2023-010',
    date: 'Oct 15, 2023',
    amount: 99.0,
    status: 'Paid',
    plan: 'Professional'
  }];
  const usage = {
    chatbots: {
      current: 4,
      limit: 10
    },
    conversations: {
      current: 3245,
      limit: 10000
    },
    knowledgeBase: {
      current: 456,
      limit: 1024
    }
  };
  return <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Billing & Subscription
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your subscription and billing information
          </p>
        </div>
      </div>
      {/* Current Plan */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">Current Plan</h2>
            <Badge variant="success">Active</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3">
                <h3 className="text-2xl font-bold text-gray-900">
                  Professional Plan
                </h3>
                <Badge variant="info">Popular</Badge>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Billed monthly • Next billing date: February 15, 2024
              </p>
              <div className="mt-4 flex items-baseline">
                <span className="text-4xl font-bold text-gray-900">$99</span>
                <span className="ml-1 text-lg text-gray-500">/month</span>
              </div>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-3">
              <Button variant="outline">Change Plan</Button>
              <Button variant="danger">Cancel Subscription</Button>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Usage Statistics */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-medium text-gray-900">
            Usage This Month
          </h2>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Chatbots
                </span>
                <span className="text-sm text-gray-500">
                  {usage.chatbots.current} / {usage.chatbots.limit}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{
                width: `${usage.chatbots.current / usage.chatbots.limit * 100}%`
              }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Conversations
                </span>
                <span className="text-sm text-gray-500">
                  {usage.conversations.current.toLocaleString()} /{' '}
                  {usage.conversations.limit.toLocaleString()}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{
                width: `${usage.conversations.current / usage.conversations.limit * 100}%`
              }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Knowledge Base Storage
                </span>
                <span className="text-sm text-gray-500">
                  {usage.knowledgeBase.current} MB / {usage.knowledgeBase.limit}{' '}
                  MB
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{
                width: `${usage.knowledgeBase.current / usage.knowledgeBase.limit * 100}%`
              }}></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Available Plans */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-medium text-gray-900">Available Plans</h2>
          <div className="flex items-center space-x-2 bg-gray-100 rounded-md p-1">
            <button onClick={() => setBillingCycle('monthly')} className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${billingCycle === 'monthly' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'}`}>
              Monthly
            </button>
            <button onClick={() => setBillingCycle('annual')} className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${billingCycle === 'annual' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'}`}>
              Annual
              <span className="ml-2 text-xs text-green-600 font-semibold">
                Save 17%
              </span>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map(plan => <Card key={plan.name} className={plan.current ? 'border-2 border-blue-600' : ''}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900">
                    {plan.name}
                  </h3>
                  {plan.popular && <Badge variant="info">Popular</Badge>}
                  {plan.current && <Badge variant="success">Current</Badge>}
                </div>
                <p className="mt-1 text-sm text-gray-500">{plan.description}</p>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-bold text-gray-900">
                    ${plan.price[billingCycle]}
                  </span>
                  <span className="ml-1 text-lg text-gray-500">
                    /{billingCycle === 'monthly' ? 'mo' : 'yr'}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => <li key={index} className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>)}
                  {plan.notIncluded.map((feature, index) => <li key={index} className="flex items-start">
                      <XIcon className="h-5 w-5 text-gray-300 mr-2 flex-shrink-0" />
                      <span className="text-sm text-gray-400">{feature}</span>
                    </li>)}
                </ul>
                {plan.current ? <Button variant="outline" className="w-full" disabled>
                    Current Plan
                  </Button> : <Button variant="primary" className="w-full">
                    {plan.name === 'Enterprise' ? 'Contact Sales' : 'Upgrade'}
                  </Button>}
              </CardContent>
            </Card>)}
        </div>
      </div>
      {/* Payment Method */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">
              Payment Method
            </h2>
            <Button variant="outline" size="sm">
              Update
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="h-12 w-16 bg-gray-100 rounded flex items-center justify-center">
              <CreditCardIcon className="h-6 w-6 text-gray-400" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900">
                Visa ending in 4242
              </div>
              <div className="text-xs text-gray-500">Expires 12/2025</div>
            </div>
            <Badge variant="success">Default</Badge>
          </div>
        </CardContent>
      </Card>
      {/* Billing History */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">
              Billing History
            </h2>
            <Button variant="outline" size="sm" icon={<DownloadIcon className="h-4 w-4" />}>
              Download All
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Invoice
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Plan
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {invoices.map(invoice => <tr key={invoice.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {invoice.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {invoice.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {invoice.plan}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${invoice.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant="success">{invoice.status}</Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button variant="outline" size="sm" icon={<DownloadIcon className="h-4 w-4" />}>
                        Download
                      </Button>
                    </td>
                  </tr>)}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>;
}