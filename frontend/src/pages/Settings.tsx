import React, { useState, createElement } from 'react';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { UserIcon, BuildingIcon, CreditCardIcon, BellIcon, ShieldIcon, GlobeIcon, LayoutIcon, TagIcon, PlusIcon } from 'lucide-react';
export function Settings() {
  const [activeTab, setActiveTab] = useState('profile');
  const tabs = [{
    id: 'profile',
    name: 'Profile',
    icon: UserIcon
  }, {
    id: 'organization',
    name: 'Organization',
    icon: BuildingIcon
  }, {
    id: 'billing',
    name: 'Billing',
    icon: CreditCardIcon
  }, {
    id: 'notifications',
    name: 'Notifications',
    icon: BellIcon
  }, {
    id: 'security',
    name: 'Security',
    icon: ShieldIcon
  }, {
    id: 'integrations',
    name: 'Integrations',
    icon: GlobeIcon
  }, {
    id: 'appearance',
    name: 'Appearance',
    icon: LayoutIcon
  }, {
    id: 'api',
    name: 'API Keys',
    icon: TagIcon
  }];
  return <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your account settings and preferences
        </p>
      </div>
      <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
        {/* Tabs */}
        <div className="w-full md:w-64 flex-shrink-0">
          <Card>
            <CardContent className="p-0">
              <nav className="flex flex-col">
                {tabs.map(tab => <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center px-4 py-3 text-sm font-medium ${activeTab === tab.id ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}>
                    <tab.icon className="h-5 w-5 mr-3" />
                    {tab.name}
                  </button>)}
              </nav>
            </CardContent>
          </Card>
        </div>
        {/* Content */}
        <div className="flex-1">
          {activeTab === 'profile' && <Card>
              <CardHeader>
                <h2 className="text-lg font-medium text-gray-900">
                  Profile Settings
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Update your personal information
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center">
                    <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-2xl font-bold text-blue-600">
                        JD
                      </span>
                    </div>
                    <div className="ml-5">
                      <Button variant="outline">Change Avatar</Button>
                      <Button variant="ghost" className="ml-2">
                        Remove
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                        First Name
                      </label>
                      <input type="text" id="firstName" defaultValue="John" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                        Last Name
                      </label>
                      <input type="text" id="lastName" defaultValue="Doe" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email Address
                      </label>
                      <input type="email" id="email" defaultValue="john.doe@example.com" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Phone Number
                      </label>
                      <input type="tel" id="phone" defaultValue="+1 (555) 123-4567" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                        Bio
                      </label>
                      <textarea id="bio" rows={3} defaultValue="Product Manager with 5+ years of experience in AI and chatbot development." className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                      <p className="mt-1 text-xs text-gray-500">
                        Brief description about yourself. Maximum 200
                        characters.
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-3 pt-6">
                    <Button variant="secondary">Cancel</Button>
                    <Button variant="primary">Save Changes</Button>
                  </div>
                </div>
              </CardContent>
            </Card>}
          {activeTab === 'organization' && <Card>
              <CardHeader>
                <h2 className="text-lg font-medium text-gray-900">
                  Organization Settings
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Manage your organization details
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center">
                    <div className="h-20 w-20 rounded-md bg-blue-100 flex items-center justify-center">
                      <span className="text-2xl font-bold text-blue-600">
                        AI
                      </span>
                    </div>
                    <div className="ml-5">
                      <Button variant="outline">Change Logo</Button>
                      <Button variant="ghost" className="ml-2">
                        Remove
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="orgName" className="block text-sm font-medium text-gray-700">
                        Organization Name
                      </label>
                      <input type="text" id="orgName" defaultValue="Acme Inc." className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </div>
                    <div>
                      <label htmlFor="industry" className="block text-sm font-medium text-gray-700">
                        Industry
                      </label>
                      <select id="industry" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                        <option>Technology</option>
                        <option>E-commerce</option>
                        <option>Finance</option>
                        <option>Healthcare</option>
                        <option>Education</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                        Website
                      </label>
                      <input type="url" id="website" defaultValue="https://acme.example.com" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </div>
                    <div>
                      <label htmlFor="size" className="block text-sm font-medium text-gray-700">
                        Organization Size
                      </label>
                      <select id="size" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                        <option>1-10 employees</option>
                        <option>11-50 employees</option>
                        <option>51-200 employees</option>
                        <option>201-500 employees</option>
                        <option>501+ employees</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                        Address
                      </label>
                      <textarea id="address" rows={3} defaultValue="123 Main St, Suite 200, San Francisco, CA 94105" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </div>
                  </div>
                  <div className="flex justify-end space-x-3 pt-6">
                    <Button variant="secondary">Cancel</Button>
                    <Button variant="primary">Save Changes</Button>
                  </div>
                </div>
              </CardContent>
            </Card>}
          {activeTab === 'billing' && <Card>
              <CardHeader>
                <h2 className="text-lg font-medium text-gray-900">
                  Billing and Subscription
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Manage your subscription plan and payment methods
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-3">
                      Current Plan
                    </h3>
                    <div className="bg-blue-50 border border-blue-100 rounded-md p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-lg font-medium text-blue-600">
                            Professional Plan
                          </div>
                          <div className="text-sm text-gray-600 mt-1">
                            $99 per month, billed monthly
                          </div>
                        </div>
                        <Badge variant="info">Active</Badge>
                      </div>
                      <div className="mt-3 text-sm text-gray-500">
                        Your next billing date is July 15, 2023
                      </div>
                    </div>
                  </div>
                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-sm font-medium text-gray-900 mb-3">
                      Plan Features
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 text-green-500">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-2 text-sm text-gray-700">
                          Up to 10 projects
                        </p>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 text-green-500">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-2 text-sm text-gray-700">
                          25 chatbots
                        </p>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 text-green-500">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-2 text-sm text-gray-700">
                          10 knowledge bases
                        </p>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 text-green-500">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-2 text-sm text-gray-700">
                          Unlimited team members
                        </p>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 text-green-500">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-2 text-sm text-gray-700">
                          Priority support
                        </p>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 text-green-500">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-2 text-sm text-gray-700">
                          Advanced analytics
                        </p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Button variant="outline">Compare Plans</Button>
                    </div>
                  </div>
                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-sm font-medium text-gray-900 mb-3">
                      Payment Methods
                    </h3>
                    <div className="space-y-4">
                      <div className="border border-gray-200 rounded-md p-4">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="h-8 w-12 bg-gray-100 flex items-center justify-center rounded">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-gray-600">
                                <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                                <line x1="1" y1="10" x2="23" y2="10"></line>
                              </svg>
                            </div>
                            <div className="ml-3">
                              <div className="text-sm font-medium text-gray-900">
                                Visa ending in 4242
                              </div>
                              <div className="text-xs text-gray-500">
                                Expires 12/2024
                              </div>
                            </div>
                          </div>
                          <Badge variant="success">Default</Badge>
                        </div>
                      </div>
                      <Button variant="outline" icon={<PlusIcon className="h-5 w-5" />}>
                        Add Payment Method
                      </Button>
                    </div>
                  </div>
                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-sm font-medium text-gray-900 mb-3">
                      Billing History
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Date
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Description
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Amount
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Status
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Receipt
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              Jun 15, 2023
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              Professional Plan - Monthly
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              $99.00
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Badge variant="success">Paid</Badge>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <a href="#" className="text-blue-600 hover:text-blue-900">
                                Download
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              May 15, 2023
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              Professional Plan - Monthly
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              $99.00
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Badge variant="success">Paid</Badge>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <a href="#" className="text-blue-600 hover:text-blue-900">
                                Download
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              Apr 15, 2023
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              Professional Plan - Monthly
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              $99.00
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Badge variant="success">Paid</Badge>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <a href="#" className="text-blue-600 hover:text-blue-900">
                                Download
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>}
          {activeTab === 'notifications' && <Card>
              <CardHeader>
                <h2 className="text-lg font-medium text-gray-900">
                  Notification Settings
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Manage how and when you receive notifications
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-3">
                      Email Notifications
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium text-gray-700">
                            Chatbot activity summaries
                          </div>
                          <div className="text-xs text-gray-500">
                            Get daily or weekly summaries of chatbot performance
                          </div>
                        </div>
                        <div className="flex items-center">
                          <select className="mr-2 border border-gray-300 rounded-md shadow-sm py-1 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                            <option>Daily</option>
                            <option>Weekly</option>
                            <option>Never</option>
                          </select>
                          <div className="relative inline-block w-10 mr-2 align-middle select-none">
                            <input type="checkbox" name="chatbot-activity" id="chatbot-activity" defaultChecked className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" />
                            <label htmlFor="chatbot-activity" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium text-gray-700">
                            Project updates
                          </div>
                          <div className="text-xs text-gray-500">
                            Notifications about changes to your projects
                          </div>
                        </div>
                        <div className="relative inline-block w-10 mr-2 align-middle select-none">
                          <input type="checkbox" name="project-updates" id="project-updates" defaultChecked className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" />
                          <label htmlFor="project-updates" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium text-gray-700">
                            Team activity
                          </div>
                          <div className="text-xs text-gray-500">
                            When team members make changes
                          </div>
                        </div>
                        <div className="relative inline-block w-10 mr-2 align-middle select-none">
                          <input type="checkbox" name="team-activity" id="team-activity" defaultChecked className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" />
                          <label htmlFor="team-activity" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium text-gray-700">
                            Billing alerts
                          </div>
                          <div className="text-xs text-gray-500">
                            Updates about your subscription and billing
                          </div>
                        </div>
                        <div className="relative inline-block w-10 mr-2 align-middle select-none">
                          <input type="checkbox" name="billing-alerts" id="billing-alerts" defaultChecked className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" />
                          <label htmlFor="billing-alerts" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium text-gray-700">
                            Product updates
                          </div>
                          <div className="text-xs text-gray-500">
                            News about product features and improvements
                          </div>
                        </div>
                        <div className="relative inline-block w-10 mr-2 align-middle select-none">
                          <input type="checkbox" name="product-updates" id="product-updates" defaultChecked className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" />
                          <label htmlFor="product-updates" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-sm font-medium text-gray-900 mb-3">
                      In-App Notifications
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium text-gray-700">
                            Chatbot alerts
                          </div>
                          <div className="text-xs text-gray-500">
                            Critical issues with your chatbots
                          </div>
                        </div>
                        <div className="relative inline-block w-10 mr-2 align-middle select-none">
                          <input type="checkbox" name="chatbot-alerts" id="chatbot-alerts" defaultChecked className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" />
                          <label htmlFor="chatbot-alerts" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium text-gray-700">
                            Knowledge base updates
                          </div>
                          <div className="text-xs text-gray-500">
                            When knowledge bases are modified
                          </div>
                        </div>
                        <div className="relative inline-block w-10 mr-2 align-middle select-none">
                          <input type="checkbox" name="kb-updates" id="kb-updates" defaultChecked className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" />
                          <label htmlFor="kb-updates" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium text-gray-700">
                            Team mentions
                          </div>
                          <div className="text-xs text-gray-500">
                            When someone @mentions you
                          </div>
                        </div>
                        <div className="relative inline-block w-10 mr-2 align-middle select-none">
                          <input type="checkbox" name="team-mentions" id="team-mentions" defaultChecked className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" />
                          <label htmlFor="team-mentions" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-sm font-medium text-gray-900 mb-3">
                      Notification Schedule
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700">
                          Quiet Hours
                        </label>
                        <div className="mt-2 flex space-x-4">
                          <div className="w-1/2">
                            <label className="block text-xs text-gray-500 mb-1">
                              From
                            </label>
                            <select className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                              {Array.from({
                            length: 24
                          }).map((_, i) => <option key={i} value={i}>
                                  {i === 0 ? '12 AM' : i < 12 ? `${i} AM` : i === 12 ? '12 PM' : `${i - 12} PM`}
                                </option>)}
                            </select>
                          </div>
                          <div className="w-1/2">
                            <label className="block text-xs text-gray-500 mb-1">
                              To
                            </label>
                            <select className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                              {Array.from({
                            length: 24
                          }).map((_, i) => <option key={i} value={i}>
                                  {i === 0 ? '12 AM' : i < 12 ? `${i} AM` : i === 12 ? '12 PM' : `${i - 12} PM`}
                                </option>)}
                            </select>
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">
                          Days of Week
                        </label>
                        <div className="mt-2 flex space-x-2">
                          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => <button key={day} className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 text-xs font-medium flex items-center justify-center">
                              {day.charAt(0)}
                            </button>)}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-3 pt-6">
                    <Button variant="secondary">Cancel</Button>
                    <Button variant="primary">Save Changes</Button>
                  </div>
                </div>
              </CardContent>
            </Card>}
          {activeTab === 'security' && <Card>
              <CardHeader>
                <h2 className="text-lg font-medium text-gray-900">
                  Security Settings
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Manage your account security and authentication methods
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-3">
                      Password
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="current-password" className="block text-sm font-medium text-gray-700">
                          Current Password
                        </label>
                        <input type="password" id="current-password" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                      </div>
                      <div>
                        <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
                          New Password
                        </label>
                        <input type="password" id="new-password" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                      </div>
                      <div>
                        <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                          Confirm New Password
                        </label>
                        <input type="password" id="confirm-password" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                      </div>
                      <div>
                        <Button variant="primary">Update Password</Button>
                      </div>
                    </div>
                  </div>
                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-sm font-medium text-gray-900 mb-3">
                      Two-Factor Authentication
                    </h3>
                    <div className="bg-green-50 border border-green-100 rounded-md p-4 mb-4">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-green-800">
                            Two-factor authentication is enabled
                          </h3>
                          <div className="mt-2 text-sm text-green-700">
                            Your account is protected with authenticator app.
                            You'll be asked for an authentication code when you
                            sign in.
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <Button variant="outline">Reconfigure 2FA</Button>
                        <Button variant="danger" className="ml-3">
                          Disable 2FA
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-sm font-medium text-gray-900 mb-3">
                      Active Sessions
                    </h3>
                    <div className="space-y-4">
                      <div className="border border-gray-200 rounded-md divide-y divide-gray-200">
                        <div className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                Current Session
                              </div>
                              <div className="text-xs text-gray-500">
                                San Francisco, CA • Chrome on MacOS
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                Started: Today at 10:43 AM
                              </div>
                            </div>
                            <Badge variant="success">Active</Badge>
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                Mobile App
                              </div>
                              <div className="text-xs text-gray-500">
                                iPhone 13 • iOS 16.2
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                Last active: Yesterday at 3:15 PM
                              </div>
                            </div>
                            <Button variant="outline" size="sm">
                              Revoke
                            </Button>
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                Office Laptop
                              </div>
                              <div className="text-xs text-gray-500">
                                New York, NY • Firefox on Windows
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                Last active: 3 days ago
                              </div>
                            </div>
                            <Button variant="outline" size="sm">
                              Revoke
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div>
                        <Button variant="danger">
                          Sign Out All Other Sessions
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-sm font-medium text-gray-900 mb-3">
                      Login History
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Date & Time
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              IP Address
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Location
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Device
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              Today at 10:43 AM
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              192.168.1.1
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              San Francisco, CA
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              Chrome on MacOS
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Badge variant="success">Success</Badge>
                            </td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              Yesterday at 3:15 PM
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              192.168.1.2
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              San Francisco, CA
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              iOS App
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Badge variant="success">Success</Badge>
                            </td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              Jun 15, 2023 at 9:32 AM
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              192.168.1.3
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              New York, NY
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              Firefox on Windows
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Badge variant="success">Success</Badge>
                            </td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              Jun 14, 2023 at 2:15 PM
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              192.168.1.4
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              Chicago, IL
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              Chrome on Windows
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Badge variant="danger">Failed</Badge>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>}
          {activeTab === 'integrations' && <Card>
              <CardHeader>
                <h2 className="text-lg font-medium text-gray-900">
                  Integrations
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Connect your account with third-party services
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-4">
                    {/* Slack Integration */}
                    <div className="border border-gray-200 rounded-md p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-10 w-10 bg-[#4A154B] flex items-center justify-center rounded">
                            <svg width="24" height="24" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg">
                              <path d="M19.712.133a5.381 5.381 0 0 0-5.376 5.387 5.381 5.381 0 0 0 5.376 5.386h5.376V5.52A5.381 5.381 0 0 0 19.712.133m0 14.365H5.376A5.381 5.381 0 0 0 0 19.884a5.381 5.381 0 0 0 5.376 5.387h14.336a5.381 5.381 0 0 0 5.376-5.387 5.381 5.381 0 0 0-5.376-5.386" fill="#36C5F0"></path>
                              <path d="M53.76 19.884a5.381 5.381 0 0 0-5.376-5.386 5.381 5.381 0 0 0-5.376 5.386v5.387h5.376A5.381 5.381 0 0 0 53.76 19.884m-14.336 0V5.52A5.381 5.381 0 0 0 34.048.133a5.381 5.381 0 0 0-5.376 5.387v14.364a5.381 5.381 0 0 0 5.376 5.387 5.381 5.381 0 0 0 5.376-5.387" fill="#2EB67D"></path>
                              <path d="M53.76 19.884a5.381 5.381 0 0 0-5.376-5.386 5.381 5.381 0 0 0-5.376 5.386v5.387h5.376A5.381 5.381 0 0 0 53.76 19.884m-14.336 0V5.52A5.381 5.381 0 0 0 34.048.133a5.381 5.381 0 0 0-5.376 5.387v14.364a5.381 5.381 0 0 0 5.376 5.387 5.381 5.381 0 0 0 5.376-5.387" fill="#ECB22E"></path>
                              <path d="M0 34.249a5.381 5.381 0 0 0 5.376 5.386 5.381 5.381 0 0 0 5.376-5.386v-5.387H5.376A5.381 5.381 0 0 0 0 34.25m14.336-.001v14.364A5.381 5.381 0 0 0 19.712 54a5.381 5.381 0 0 0 5.376-5.387V34.25a5.381 5.381 0 0 0-5.376-5.387 5.381 5.381 0 0 0-5.376 5.387" fill="#E01E5A"></path>
                            </svg>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              Slack
                            </div>
                            <div className="text-xs text-gray-500">
                              Connected to Acme Inc. workspace
                            </div>
                          </div>
                        </div>
                        <div>
                          <Badge variant="success">Connected</Badge>
                          <Button variant="outline" size="sm" className="ml-3">
                            Configure
                          </Button>
                        </div>
                      </div>
                    </div>
                    {/* Google Calendar Integration */}
                    <div className="border border-gray-200 rounded-md p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-10 w-10 bg-white border border-gray-200 flex items-center justify-center rounded">
                            <svg width="24" height="24" viewBox="0 0 24 24">
                              <path d="M19.5 16V9c0-1.1-.9-2-2-2h-2V5.5C15.5 4.12 14.38 3 13 3s-2.5 1.12-2.5 2.5V7h-2c-1.1 0-2 .9-2 2v7c0 1.1.9 2 2 2h9c1.1 0 2-.9 2-2m-9-10.5c-1.56 0-2.82 1.26-2.82 2.82s1.26 2.82 2.82 2.82 2.82-1.26 2.82-2.82-1.26-2.82-2.82-2.82z" fill="#4285F4" />
                              <path d="M5 16V9h14v7z" fill="#FBBC04" />
                              <path d="M5 16V9h14v7z" fill="#34A853" />
                              <path d="M5 16V9h14v7z" fill="#EA4335" />
                            </svg>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              Google Calendar
                            </div>
                            <div className="text-xs text-gray-500">
                              Sync meetings and events
                            </div>
                          </div>
                        </div>
                        <Button variant="primary" size="sm">
                          Connect
                        </Button>
                      </div>
                    </div>
                    {/* GitHub Integration */}
                    <div className="border border-gray-200 rounded-md p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-10 w-10 bg-black flex items-center justify-center rounded">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 3.6c-4.637 0-8.4-3.764-8.4-8.4 0-4.637 3.763-8.4 8.4-8.4 4.636 0 8.4 3.763 8.4 8.4s-3.764 8.4-8.4 8.4zm0 14.9c-1.56 0-2.82 1.26-2.82 2.82s1.26 2.82 2.82 2.82 2.82-1.26 2.82-2.82-1.26-2.82-2.82-2.82z" />
                            </svg>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              GitHub
                            </div>
                            <div className="text-xs text-gray-500">
                              Connect to your repositories
                            </div>
                          </div>
                        </div>
                        <Button variant="primary" size="sm">
                          Connect
                        </Button>
                      </div>
                    </div>
                    {/* Zendesk Integration */}
                    <div className="border border-gray-200 rounded-md p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-10 w-10 bg-[#03363D] flex items-center justify-center rounded">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 3.6c-4.637 0-8.4-3.764-8.4-8.4 0-4.637 3.763-8.4 8.4-8.4 4.636 0 8.4 3.763 8.4 8.4s-3.764 8.4-8.4 8.4zm0 14.9c-1.56 0-2.82 1.26-2.82 2.82s1.26 2.82 2.82 2.82 2.82-1.26 2.82-2.82-1.26-2.82-2.82-2.82z" />
                            </svg>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              Zendesk
                            </div>
                            <div className="text-xs text-gray-500">
                              Connect your support tickets
                            </div>
                          </div>
                        </div>
                        <Button variant="primary" size="sm">
                          Connect
                        </Button>
                      </div>
                    </div>
                    {/* Salesforce Integration */}
                    <div className="border border-gray-200 rounded-md p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-10 w-10 bg-[#00A1E0] flex items-center justify-center rounded">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                              <path d="M15.13 10.62c-.94 0-1.72.77-1.72 1.72s.77 1.72 1.72 1.72 1.72-.77 1.72-1.72zm-6.26 0c-.94 0-1.72 1.615-1.72 3.67s1.615 3.67 3.67 3.67 3.67-1.615 3.67-3.67-1.615-3.67-3.67-3.67zm0 3.6c-1.56 0-2.82 1.26-2.82 2.82s1.26 2.82 2.82 2.82 2.82-1.26 2.82-2.82-1.26-2.82-2.82-2.82z" />
                            </svg>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              Salesforce
                            </div>
                            <div className="text-xs text-gray-500">
                              Sync customer and lead data
                            </div>
                          </div>
                        </div>
                        <Button variant="primary" size="sm">
                          Connect
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-sm font-medium text-gray-900 mb-3">
                      API Integrations
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Use our API to build custom integrations with your
                      existing tools and workflows.
                    </p>
                    <Button variant="outline" icon={<TagIcon className="h-5 w-5" />}>
                      View API Documentation
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>}
          {activeTab === 'appearance' && <Card>
              <CardHeader>
                <h2 className="text-lg font-medium text-gray-900">
                  Appearance Settings
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Customize the look and feel of your dashboard and chatbots
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-3">
                      Theme
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="border border-blue-500 rounded-md p-4 bg-white relative">
                        <div className="flex justify-between items-center mb-3">
                          <div className="h-3 w-3 bg-red-500 rounded-full"></div>
                          <div className="h-2 w-12 bg-gray-200 rounded-full"></div>
                        </div>
                        <div className="h-2 w-16 bg-gray-900 rounded-md mb-2"></div>
                        <div className="h-2 w-24 bg-gray-200 rounded-md mb-4"></div>
                        <div className="h-8 w-full bg-blue-100 rounded-md mb-2"></div>
                        <div className="h-8 w-full bg-gray-100 rounded-md"></div>
                        <div className="absolute top-2 right-2 h-4 w-4 bg-blue-500 rounded-full flex items-center justify-center">
                          <svg className="h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="mt-2 text-center text-sm font-medium text-gray-900">
                          Light
                        </div>
                      </div>
                      <div className="border border-gray-200 rounded-md p-4 bg-gray-900 relative">
                        <div className="flex justify-between items-center mb-3">
                          <div className="h-3 w-3 bg-red-500 rounded-full"></div>
                          <div className="h-2 w-12 bg-gray-700 rounded-full"></div>
                        </div>
                        <div className="h-2 w-16 bg-white rounded-md mb-2"></div>
                        <div className="h-2 w-24 bg-gray-600 rounded-md mb-4"></div>
                        <div className="h-8 w-full bg-blue-900 rounded-md mb-2"></div>
                        <div className="h-8 w-full bg-gray-800 rounded-md"></div>
                        <div className="mt-2 text-center text-sm font-medium text-white">
                          Dark
                        </div>
                      </div>
                      <div className="border border-gray-200 rounded-md p-4 bg-gradient-to-r from-white to-gray-100 relative">
                        <div className="flex justify-between items-center mb-3">
                          <div className="h-3 w-3 bg-red-500 rounded-full"></div>
                          <div className="h-2 w-12 bg-gray-200 rounded-full"></div>
                        </div>
                        <div className="h-2 w-16 bg-gray-900 rounded-md mb-2"></div>
                        <div className="h-2 w-24 bg-gray-200 rounded-md mb-4"></div>
                        <div className="h-8 w-full bg-blue-100 rounded-md mb-2"></div>
                        <div className="h-8 w-full bg-gray-100 rounded-md"></div>
                        <div className="mt-2 text-center text-sm font-medium text-gray-900">
                          System
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-sm font-medium text-gray-900 mb-3">
                      Chatbot Appearance
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Primary Color
                        </label>
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-blue-600 mr-2 border border-gray-300"></div>
                          <input type="text" value="#2563EB" className="border border-gray-300 rounded-md py-1 px-3 text-sm w-24" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Secondary Color
                        </label>
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-gray-100 mr-2 border border-gray-300"></div>
                          <input type="text" value="#F3F4F6" className="border border-gray-300 rounded-md py-1 px-3 text-sm w-24" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Chat Bubble Style
                        </label>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="border border-blue-500 rounded-md p-3 flex flex-col items-center">
                            <div className="w-full mb-2">
                              <div className="bg-blue-100 text-blue-800 rounded-lg p-2 text-xs mb-1 ml-auto w-3/4">
                                Hello!
                              </div>
                              <div className="bg-gray-100 rounded-lg p-2 text-xs mr-auto w-3/4">
                                Hi there!
                              </div>
                            </div>
                            <div className="text-xs font-medium">Rounded</div>
                          </div>
                          <div className="border border-gray-200 rounded-md p-3 flex flex-col items-center">
                            <div className="w-full mb-2">
                              <div className="bg-blue-100 text-blue-800 rounded-sm p-2 text-xs mb-1 ml-auto w-3/4">
                                Hello!
                              </div>
                              <div className="bg-gray-100 rounded-sm p-2 text-xs mr-auto w-3/4">
                                Hi there!
                              </div>
                            </div>
                            <div className="text-xs font-medium">Square</div>
                          </div>
                          <div className="border border-gray-200 rounded-md p-3 flex flex-col items-center">
                            <div className="w-full mb-2">
                              <div className="bg-blue-100 text-blue-800 rounded-tl-lg rounded-tr-lg rounded-bl-none rounded-br-lg p-2 text-xs mb-1 ml-auto w-3/4">
                                Hello!
                              </div>
                              <div className="bg-gray-100 rounded-tl-lg rounded-tr-lg rounded-bl-lg rounded-br-none p-2 text-xs mr-auto w-3/4">
                                Hi there!
                              </div>
                            </div>
                            <div className="text-xs font-medium">Modern</div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Font Family
                        </label>
                        <select className="border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-white w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                          <option>System Default</option>
                          <option>Inter</option>
                          <option>Roboto</option>
                          <option>Open Sans</option>
                          <option>Lato</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-sm font-medium text-gray-900 mb-3">
                      Chat Widget Position
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="border border-blue-500 rounded-md p-3 relative bg-white">
                        <div className="h-20 w-full border border-dashed border-gray-300 rounded-md flex items-end justify-end">
                          <div className="h-6 w-6 bg-blue-500 rounded-full mb-2 mr-2"></div>
                        </div>
                        <div className="absolute top-2 right-2 h-4 w-4 bg-blue-500 rounded-full flex items-center justify-center">
                          <svg className="h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="mt-2 text-center text-xs font-medium">
                          Bottom Right
                        </div>
                      </div>
                      <div className="border border-gray-200 rounded-md p-3 relative bg-white">
                        <div className="h-20 w-full border border-dashed border-gray-300 rounded-md flex items-end justify-start">
                          <div className="h-6 w-6 bg-gray-400 rounded-full mb-2 ml-2"></div>
                        </div>
                        <div className="mt-2 text-center text-xs font-medium">
                          Bottom Left
                        </div>
                      </div>
                      <div className="border border-gray-200 rounded-md p-3 relative bg-white">
                        <div className="h-20 w-full border border-dashed border-gray-300 rounded-md flex items-start justify-end">
                          <div className="h-6 w-6 bg-gray-400 rounded-full mt-2 mr-2"></div>
                        </div>
                        <div className="mt-2 text-center text-xs font-medium">
                          Top Right
                        </div>
                      </div>
                      <div className="border border-gray-200 rounded-md p-3 relative bg-white">
                        <div className="h-20 w-full border border-dashed border-gray-300 rounded-md flex items-start justify-start">
                          <div className="h-6 w-6 bg-gray-400 rounded-full mt-2 ml-2"></div>
                        </div>
                        <div className="mt-2 text-center text-xs font-medium">
                          Top Left
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-3 pt-6">
                    <Button variant="secondary">Cancel</Button>
                    <Button variant="primary">Save Changes</Button>
                  </div>
                </div>
              </CardContent>
            </Card>}
          {activeTab === 'api' && <Card>
              <CardHeader>
                <h2 className="text-lg font-medium text-gray-900">API Keys</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Manage your API keys for integrating with our services
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="bg-yellow-50 border border-yellow-100 rounded-md p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-yellow-800">
                          Important Security Notice
                        </h3>
                        <div className="mt-2 text-sm text-yellow-700">
                          <p>
                            API keys provide full access to your account. Keep
                            them secure and never share them in client-side code
                            or public repositories.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-3">
                      Your API Keys
                    </h3>
                    <div className="space-y-4">
                      <div className="border border-gray-200 rounded-md p-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                          <div className="mb-3 sm:mb-0">
                            <div className="text-sm font-medium text-gray-900">
                              Production API Key
                            </div>
                            <div className="text-xs text-gray-500">
                              Created on June 10, 2023
                            </div>
                          </div>
                          <div className="flex items-center">
                            <div className="relative flex items-center max-w-xs">
                              <input type="password" value="••••••••••••••••••••••••" readOnly className="pr-10 border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-50 text-sm w-full" />
                              <button className="absolute right-2 text-gray-500 hover:text-gray-700">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                </svg>
                              </button>
                            </div>
                            <Button variant="outline" size="sm" className="ml-3">
                              Copy
                            </Button>
                          </div>
                        </div>
                        <div className="mt-4 text-xs text-gray-500 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1v-3a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          Last used 2 hours ago from 192.168.1.1
                        </div>
                      </div>
                      <div className="border border-gray-200 rounded-md p-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                          <div className="mb-3 sm:mb-0">
                            <div className="text-sm font-medium text-gray-900">
                              Development API Key
                            </div>
                            <div className="text-xs text-gray-500">
                              Created on May 15, 2023
                            </div>
                          </div>
                          <div className="flex items-center">
                            <div className="relative flex items-center max-w-xs">
                              <input type="password" value="••••••••••••••••••••••••" readOnly className="pr-10 border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-50 text-sm w-full" />
                              <button className="absolute right-2 text-gray-500 hover:text-gray-700">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                </svg>
                              </button>
                            </div>
                            <Button variant="outline" size="sm" className="ml-3">
                              Copy
                            </Button>
                          </div>
                        </div>
                        <div className="mt-4 text-xs text-gray-500 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1v-3a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          Last used 3 days ago from 192.168.1.2
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Button variant="outline" icon={<PlusIcon className="h-5 w-5" />}>
                        Generate New API Key
                      </Button>
                    </div>
                  </div>
                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-sm font-medium text-gray-900 mb-3">
                      API Usage
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <div className="text-sm font-medium text-gray-700">
                            API Requests (This Month)
                          </div>
                          <div className="text-sm font-medium text-gray-900">
                            245,788 / 500,000
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-blue-600 h-2.5 rounded-full" style={{
                        width: '49%'
                      }}></div>
                        </div>
                        <div className="mt-1 text-xs text-gray-500">
                          Resets on July 1, 2023
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <div className="text-sm font-medium text-gray-700">
                            Rate Limit
                          </div>
                          <div className="text-sm font-medium text-gray-900">
                            100 requests/minute
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-green-500 h-2.5 rounded-full" style={{
                        width: '15%'
                      }}></div>
                        </div>
                        <div className="mt-1 text-xs text-gray-500">
                          Current usage: 15 requests/minute
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-sm font-medium text-gray-900 mb-3">
                      API Documentation
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Refer to our comprehensive documentation to learn how to
                      use our API effectively.
                    </p>
                    <div className="flex space-x-3">
                      <Button variant="outline">View Documentation</Button>
                      <Button variant="outline">API Reference</Button>
                      <Button variant="outline">Code Examples</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>}
          {activeTab !== 'profile' && activeTab !== 'organization' && <Card>
              <CardHeader>
                <h2 className="text-lg font-medium text-gray-900">
                  {tabs.find(t => t.id === activeTab)?.name}
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  This section is under construction
                </p>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="h-16 w-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                  {createElement(tabs.find(t => t.id === activeTab)?.icon || 'div', {
                className: 'h-8 w-8'
              })}
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  Coming Soon
                </h3>
                <p className="mt-2 text-sm text-gray-500 text-center max-w-md">
                  We're currently working on the{' '}
                  {tabs.find(t => t.id === activeTab)?.name.toLowerCase()}{' '}
                  section. This feature will be available in a future update.
                </p>
              </CardContent>
            </Card>}
        </div>
      </div>
    </div>;
}