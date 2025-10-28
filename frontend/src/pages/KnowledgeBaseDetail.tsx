import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { DatabaseIcon, FileTextIcon, UploadIcon, LinkIcon, SearchIcon, FolderIcon, FileIcon, TrashIcon, DownloadIcon, PlusIcon, CalendarIcon, MessageSquareIcon } from 'lucide-react';
export function KnowledgeBaseDetail() {
  const {
    id
  } = useParams<{
    id: string;
  }>();
  const [activeTab, setActiveTab] = useState('documents');
  const knowledgeBase = {
    id: Number(id),
    name: 'Product Catalog',
    description: 'Detailed product specifications and catalog',
    documents: 156,
    size: '24.6 MB',
    project: 'E-commerce Assistant',
    lastUpdated: '3 days ago',
    type: 'Catalog',
    createdAt: 'May 15, 2023',
    createdBy: 'Sarah Johnson',
    linkedChatbots: ['Customer Support Assistant', 'Product Recommendations']
  };
  const tabs = [{
    id: 'documents',
    name: 'Documents',
    icon: FileTextIcon
  }, {
    id: 'settings',
    name: 'Settings',
    icon: FolderIcon
  }, {
    id: 'chatbots',
    name: 'Linked Chatbots',
    icon: LinkIcon
  }];
  const documents = [{
    id: 1,
    name: 'Product Catalog - Summer 2023.pdf',
    type: 'PDF',
    size: '8.2 MB',
    uploadedAt: 'June 12, 2023',
    uploadedBy: 'Sarah Johnson'
  }, {
    id: 2,
    name: 'Technical Specifications.docx',
    type: 'DOCX',
    size: '2.4 MB',
    uploadedAt: 'June 10, 2023',
    uploadedBy: 'John Doe'
  }, {
    id: 3,
    name: 'Product Images Collection',
    type: 'Folder',
    size: '12.8 MB',
    uploadedAt: 'June 5, 2023',
    uploadedBy: 'Sarah Johnson'
  }, {
    id: 4,
    name: 'Pricing Information.xlsx',
    type: 'XLSX',
    size: '1.2 MB',
    uploadedAt: 'June 1, 2023',
    uploadedBy: 'Michael Brown'
  }, {
    id: 5,
    name: 'Customer Reviews.csv',
    type: 'CSV',
    size: '0.8 MB',
    uploadedAt: 'May 28, 2023',
    uploadedBy: 'Emily Davis'
  }];
  const getDocumentIcon = (type: string) => {
    switch (type) {
      case 'PDF':
        return <FileTextIcon className="h-5 w-5 text-red-500" />;
      case 'DOCX':
        return <FileTextIcon className="h-5 w-5 text-blue-500" />;
      case 'XLSX':
        return <FileTextIcon className="h-5 w-5 text-green-500" />;
      case 'CSV':
        return <FileTextIcon className="h-5 w-5 text-orange-500" />;
      case 'Folder':
        return <FolderIcon className="h-5 w-5 text-yellow-500" />;
      default:
        return <FileIcon className="h-5 w-5 text-gray-500" />;
    }
  };
  return <div className="space-y-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
        <div className="flex items-center">
          <div className="h-12 w-12 rounded-md bg-blue-100 flex items-center justify-center">
            <DatabaseIcon className="h-6 w-6 text-blue-600" />
          </div>
          <div className="ml-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                {knowledgeBase.name}
              </h1>
              <Badge variant="info" className="ml-3">
                {knowledgeBase.type}
              </Badge>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Project: {knowledgeBase.project}
            </p>
          </div>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" icon={<UploadIcon className="h-5 w-5" />}>
            Upload Documents
          </Button>
          <Button variant="primary" icon={<LinkIcon className="h-5 w-5" />}>
            Link to Chatbot
          </Button>
        </div>
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
          {activeTab === 'documents' && <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-medium text-gray-900">
                      Documents
                    </h2>
                    <div className="flex space-x-2">
                      <div className="relative">
                        <input type="text" placeholder="Search documents..." className="pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm" />
                        <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                      </div>
                      <select className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white">
                        <option>All Types</option>
                        <option>PDF</option>
                        <option>DOCX</option>
                        <option>XLSX</option>
                        <option>CSV</option>
                        <option>Folders</option>
                      </select>
                    </div>
                  </div>
                </CardHeader>
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
                            Size
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Uploaded
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            By
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {documents.map(doc => <tr key={doc.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                {getDocumentIcon(doc.type)}
                                <div className="ml-3 text-sm font-medium text-gray-900">
                                  {doc.name}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {doc.type}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {doc.size}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {doc.uploadedAt}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {doc.uploadedBy}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex justify-end space-x-2">
                                <Button size="sm" variant="outline" icon={<DownloadIcon className="h-4 w-4" />}>
                                  Download
                                </Button>
                                <Button size="sm" variant="danger" icon={<TrashIcon className="h-4 w-4" />}>
                                  Delete
                                </Button>
                              </div>
                            </td>
                          </tr>)}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <h2 className="text-lg font-medium text-gray-900">
                    Upload Documents
                  </h2>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center">
                    <UploadIcon className="h-10 w-10 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500">
                      Drag and drop files here, or click to select files
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                      Supports PDF, DOCX, XLSX, CSV, TXT, and other text formats
                    </p>
                    <Button variant="outline" className="mt-4" icon={<UploadIcon className="h-4 w-4" />}>
                      Select Files
                    </Button>
                  </div>
                  <div className="mt-4 text-xs text-gray-500">
                    Maximum file size: 50MB. For larger files or bulk uploads,
                    please contact support.
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-medium text-gray-900">
                      Recent Activity
                    </h2>
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-gray-200">
                    {[{
                  action: 'uploaded',
                  user: 'Sarah Johnson',
                  target: 'Product Catalog - Summer 2023.pdf',
                  time: '2 days ago'
                }, {
                  action: 'updated',
                  user: 'John Doe',
                  target: 'Technical Specifications.docx',
                  time: '3 days ago'
                }, {
                  action: 'deleted',
                  user: 'Michael Brown',
                  target: 'Old Pricing Sheet.xlsx',
                  time: '5 days ago'
                }, {
                  action: 'uploaded',
                  user: 'Emily Davis',
                  target: 'Customer Reviews.csv',
                  time: '1 week ago'
                }, {
                  action: 'created folder',
                  user: 'Sarah Johnson',
                  target: 'Product Images Collection',
                  time: '1 week ago'
                }].map((activity, index) => <div key={index} className="px-6 py-4 hover:bg-gray-50">
                        <div className="flex items-start">
                          <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-medium text-sm">
                            {activity.user.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className="ml-3">
                            <div className="text-sm">
                              <span className="font-medium text-gray-900">
                                {activity.user}
                              </span>
                              <span className="text-gray-500">
                                {' '}
                                {activity.action}{' '}
                              </span>
                              <span className="font-medium text-gray-900">
                                {activity.target}
                              </span>
                            </div>
                            <div className="mt-1 text-xs text-gray-500 flex items-center">
                              <CalendarIcon className="h-3 w-3 mr-1" />
                              {activity.time}
                            </div>
                          </div>
                        </div>
                      </div>)}
                  </div>
                </CardContent>
              </Card>
            </div>}
          {activeTab === 'settings' && <Card>
              <CardHeader>
                <h2 className="text-lg font-medium text-gray-900">
                  Knowledge Base Settings
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Configure your knowledge base settings and properties
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-3">
                      Basic Information
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="kbName" className="block text-sm font-medium text-gray-700">
                          Name
                        </label>
                        <input type="text" id="kbName" defaultValue={knowledgeBase.name} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                      </div>
                      <div>
                        <label htmlFor="kbDescription" className="block text-sm font-medium text-gray-700">
                          Description
                        </label>
                        <textarea id="kbDescription" rows={3} defaultValue={knowledgeBase.description} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                      </div>
                      <div>
                        <label htmlFor="kbType" className="block text-sm font-medium text-gray-700">
                          Type
                        </label>
                        <select id="kbType" defaultValue={knowledgeBase.type} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                          <option>Documentation</option>
                          <option>FAQ</option>
                          <option>Sales</option>
                          <option>Policies</option>
                          <option>Catalog</option>
                          <option>Training</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="kbProject" className="block text-sm font-medium text-gray-700">
                          Project
                        </label>
                        <select id="kbProject" defaultValue={knowledgeBase.project} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                          <option>E-commerce Assistant</option>
                          <option>Customer Support</option>
                          <option>Internal Knowledge Base</option>
                          <option>Sales Automation</option>
                          <option>HR Assistant</option>
                          <option>Technical Support</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-sm font-medium text-gray-900 mb-3">
                      Processing Settings
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <input id="enableAutoUpdate" type="checkbox" defaultChecked className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                        <label htmlFor="enableAutoUpdate" className="ml-2 block text-sm text-gray-700">
                          Automatically process new documents
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input id="enableOCR" type="checkbox" defaultChecked className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                        <label htmlFor="enableOCR" className="ml-2 block text-sm text-gray-700">
                          Enable OCR for scanned documents and images
                        </label>
                      </div>
                      <div>
                        <label htmlFor="chunkSize" className="block text-sm font-medium text-gray-700">
                          Chunk Size
                        </label>
                        <select id="chunkSize" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                          <option>Small (256 tokens)</option>
                          <option selected>Medium (512 tokens)</option>
                          <option>Large (1024 tokens)</option>
                          <option>Extra Large (2048 tokens)</option>
                        </select>
                        <p className="mt-1 text-xs text-gray-500">
                          Determines how documents are split for processing
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-sm font-medium text-gray-900 mb-3">
                      Access Control
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="accessLevel" className="block text-sm font-medium text-gray-700">
                          Access Level
                        </label>
                        <select id="accessLevel" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                          <option>Public (All organization members)</option>
                          <option selected>
                            Project (Only project members)
                          </option>
                          <option>Private (Only specified users)</option>
                        </select>
                      </div>
                      <div className="flex items-center">
                        <input id="enableVersioning" type="checkbox" defaultChecked className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                        <label htmlFor="enableVersioning" className="ml-2 block text-sm text-gray-700">
                          Enable document versioning
                        </label>
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
          {activeTab === 'chatbots' && <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-900">
                    Linked Chatbots
                  </h2>
                  <Button variant="primary" size="sm" icon={<PlusIcon className="h-4 w-4" />}>
                    Link New Chatbot
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <p className="text-sm text-gray-500">
                    These chatbots are currently using this knowledge base for
                    their responses.
                  </p>
                  <div className="divide-y divide-gray-200 border border-gray-200 rounded-md">
                    {knowledgeBase.linkedChatbots.map((chatbot, index) => <div key={index} className="flex items-center justify-between p-4 hover:bg-gray-50">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-md bg-blue-100 flex items-center justify-center">
                            <MessageSquareIcon className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {chatbot}
                            </div>
                            <div className="text-xs text-gray-500">
                              Project: {knowledgeBase.project}
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Configure
                        </Button>
                      </div>)}
                  </div>
                  <div className="pt-6">
                    <h3 className="text-sm font-medium text-gray-900 mb-3">
                      Link a New Chatbot
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="chatbotSelect" className="block text-sm font-medium text-gray-700">
                          Select Chatbot
                        </label>
                        <select id="chatbotSelect" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                          <option>Order Status Bot</option>
                          <option>Sales Assistant</option>
                          <option>Technical Support</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="priorityLevel" className="block text-sm font-medium text-gray-700">
                          Priority Level
                        </label>
                        <select id="priorityLevel" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                          <option>High - Primary knowledge source</option>
                          <option>Medium - Supplementary knowledge</option>
                          <option>Low - Fallback knowledge</option>
                        </select>
                        <p className="mt-1 text-xs text-gray-500">
                          Determines how this knowledge base is prioritized in
                          the chatbot's responses
                        </p>
                      </div>
                      <Button variant="primary">Link Chatbot</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>}
        </div>
      </div>
    </div>;
}