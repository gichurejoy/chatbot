import React, { useState, createElement } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { MessageSquareIcon, Settings2Icon, DatabaseIcon, BarChart3Icon, PlayIcon, PauseIcon, RefreshCwIcon, MessageCircleIcon, ClockIcon, CheckCircleIcon, XCircleIcon, PlusIcon, DownloadIcon, TrendingUpIcon, CodeIcon, CopyIcon, ExternalLinkIcon, CheckIcon } from 'lucide-react';
export function ChatbotDetail() {
  const {
    id
  } = useParams<{
    id: string;
  }>();
  const [activeTab, setActiveTab] = useState('overview');
  const [copiedEmbed, setCopiedEmbed] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [widgetPosition, setWidgetPosition] = useState<'bottom-right' | 'bottom-left'>('bottom-right');
  const [widgetColor, setWidgetColor] = useState('#3B82F6');
  const chatbot = {
    id: Number(id),
    name: 'Customer Support Assistant',
    description: 'Handles common customer inquiries and support tickets',
    type: 'Customer Support',
    status: 'Active',
    project: 'E-commerce Assistant',
    interactions: 1245,
    accuracy: 92,
    lastUpdated: '2 days ago',
    welcomeMessage: "Hi there! I'm your Customer Support Assistant. How can I help you today?",
    model: 'GPT-4',
    temperature: 0.7,
    maxTokens: 2048,
    knowledge: ['Product Documentation', 'Customer FAQs'],
    createdAt: 'June 15, 2023',
    createdBy: 'John Doe'
  };
  const tabs = [{
    id: 'overview',
    name: 'Overview',
    icon: MessageSquareIcon
  }, {
    id: 'settings',
    name: 'Settings',
    icon: Settings2Icon
  }, {
    id: 'knowledge',
    name: 'Knowledge Base',
    icon: DatabaseIcon
  }, {
    id: 'integration',
    name: 'Integration',
    icon: CodeIcon
  }, {
    id: 'analytics',
    name: 'Analytics',
    icon: BarChart3Icon
  }];
  const embedCode = `<!-- Add this script before closing </body> tag -->
<script>
  (function(w,d,s,o,f,js,fjs){
    w['ChatbotWidget']=o;w[o] = w[o] || function () { (w[o].q = w[o].q || []).push(arguments) };
    js = d.createElement(s), fjs = d.getElementsByTagName(s)[0];
    js.id = o; js.src = f; js.async = 1; fjs.parentNode.insertBefore(js, fjs);
  }(window, document, 'script', 'cbw', 'https://cdn.chatbot-stack.com/widget.js'));
  cbw('init', { 
    chatbotId: '${chatbot.id}',
    position: '${widgetPosition}',
    primaryColor: '${widgetColor}'
  });
</script>`;
  const directLink = `https://chat.chatbot-stack.com/bot/${chatbot.id}`;
  const handleCopyEmbed = () => {
    navigator.clipboard.writeText(embedCode);
    setCopiedEmbed(true);
    setTimeout(() => setCopiedEmbed(false), 2000);
  };
  const handleCopyLink = () => {
    navigator.clipboard.writeText(directLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };
  const recentChats = [{
    id: 1,
    user: 'Sarah Johnson',
    time: '10 minutes ago',
    messages: 12,
    satisfaction: 'positive',
    resolved: true
  }, {
    id: 2,
    user: 'Michael Brown',
    time: '1 hour ago',
    messages: 8,
    satisfaction: 'neutral',
    resolved: true
  }, {
    id: 3,
    user: 'Emily Davis',
    time: '3 hours ago',
    messages: 15,
    satisfaction: 'negative',
    resolved: false
  }, {
    id: 4,
    user: 'Robert Wilson',
    time: 'Yesterday',
    messages: 6,
    satisfaction: 'positive',
    resolved: true
  }, {
    id: 5,
    user: 'Jennifer Lee',
    time: 'Yesterday',
    messages: 20,
    satisfaction: 'positive',
    resolved: true
  }];
  const getSatisfactionIcon = (satisfaction: string) => {
    switch (satisfaction) {
      case 'positive':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'neutral':
        return <ClockIcon className="h-5 w-5 text-blue-500" />;
      case 'negative':
        return <XCircleIcon className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };
  return <div className="space-y-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
        <div className="flex items-center">
          <div className="h-12 w-12 rounded-md bg-blue-100 flex items-center justify-center">
            <MessageSquareIcon className="h-6 w-6 text-blue-600" />
          </div>
          <div className="ml-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                {chatbot.name}
              </h1>
              <Badge variant="success" className="ml-3">
                {chatbot.status}
              </Badge>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              {chatbot.type} • Project: {chatbot.project}
            </p>
          </div>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" icon={<RefreshCwIcon className="h-5 w-5" />}>
            Retrain
          </Button>
          {chatbot.status === 'Active' ? <Button variant="outline" icon={<PauseIcon className="h-5 w-5" />}>
              Pause
            </Button> : <Button variant="primary" icon={<PlayIcon className="h-5 w-5" />}>
              Activate
            </Button>}
          <Button variant="primary" icon={<MessageCircleIcon className="h-5 w-5" />} as={Link} to={`/chatbots/${id}/test`}>
            Test Chat
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
          {activeTab === 'overview' && <div className="space-y-6">
              <Card>
                <CardHeader>
                  <h2 className="text-lg font-medium text-gray-900">
                    Chatbot Information
                  </h2>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">
                        Description
                      </h3>
                      <p className="mt-1 text-sm text-gray-900">
                        {chatbot.description}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">
                        Welcome Message
                      </h3>
                      <p className="mt-1 text-sm text-gray-900">
                        {chatbot.welcomeMessage}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">
                        Model
                      </h3>
                      <p className="mt-1 text-sm text-gray-900">
                        {chatbot.model}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">
                        Created
                      </h3>
                      <p className="mt-1 text-sm text-gray-900">
                        {chatbot.createdAt} by {chatbot.createdBy}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">
                        Knowledge Bases
                      </h3>
                      <div className="mt-1 flex flex-wrap gap-2">
                        {chatbot.knowledge.map((kb, index) => <Badge key={index} variant="info">
                            {kb}
                          </Badge>)}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">
                        Last Updated
                      </h3>
                      <p className="mt-1 text-sm text-gray-900">
                        {chatbot.lastUpdated}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className="p-2 rounded-md bg-blue-100">
                        <MessageSquareIcon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-500">
                          Total Interactions
                        </div>
                        <div className="mt-1 text-2xl font-semibold text-gray-900">
                          {chatbot.interactions.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className="p-2 rounded-md bg-green-100">
                        <CheckCircleIcon className="h-6 w-6 text-green-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-500">
                          Accuracy
                        </div>
                        <div className="mt-1 text-2xl font-semibold text-gray-900">
                          {chatbot.accuracy}%
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className="p-2 rounded-md bg-purple-100">
                        <DatabaseIcon className="h-6 w-6 text-purple-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-500">
                          Knowledge Bases
                        </div>
                        <div className="mt-1 text-2xl font-semibold text-gray-900">
                          {chatbot.knowledge.length}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-medium text-gray-900">
                      Recent Conversations
                    </h2>
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-gray-200">
                    {recentChats.map(chat => <div key={chat.id} className="px-6 py-4 hover:bg-gray-50">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center font-medium text-gray-600">
                              {chat.user.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {chat.user}
                              </div>
                              <div className="text-xs text-gray-500">
                                {chat.time} • {chat.messages} messages
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            {getSatisfactionIcon(chat.satisfaction)}
                            <Badge variant={chat.resolved ? 'success' : 'warning'}>
                              {chat.resolved ? 'Resolved' : 'Open'}
                            </Badge>
                            <Button variant="outline" size="sm">
                              View
                            </Button>
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
                  Chatbot Settings
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Configure your chatbot's behavior and appearance
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
                        <label htmlFor="chatbotName" className="block text-sm font-medium text-gray-700">
                          Name
                        </label>
                        <input type="text" id="chatbotName" defaultValue={chatbot.name} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                      </div>
                      <div>
                        <label htmlFor="chatbotDescription" className="block text-sm font-medium text-gray-700">
                          Description
                        </label>
                        <textarea id="chatbotDescription" rows={3} defaultValue={chatbot.description} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                      </div>
                      <div>
                        <label htmlFor="chatbotType" className="block text-sm font-medium text-gray-700">
                          Type
                        </label>
                        <select id="chatbotType" defaultValue={chatbot.type} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                          <option>Customer Support</option>
                          <option>Sales</option>
                          <option>Technical Support</option>
                          <option>General Purpose</option>
                          <option>HR</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-sm font-medium text-gray-900 mb-3">
                      AI Configuration
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="model" className="block text-sm font-medium text-gray-700">
                          Model
                        </label>
                        <select id="model" defaultValue={chatbot.model} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                          <option>GPT-4</option>
                          <option>GPT-3.5</option>
                          <option>Claude</option>
                          <option>Custom Model</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="temperature" className="block text-sm font-medium text-gray-700">
                          Temperature: {chatbot.temperature}
                        </label>
                        <input type="range" id="temperature" min="0" max="1" step="0.1" defaultValue={chatbot.temperature} className="mt-1 block w-full" />
                        <div className="mt-1 flex justify-between text-xs text-gray-500">
                          <span>Precise (0)</span>
                          <span>Balanced (0.5)</span>
                          <span>Creative (1)</span>
                        </div>
                      </div>
                      <div>
                        <label htmlFor="maxTokens" className="block text-sm font-medium text-gray-700">
                          Max Tokens
                        </label>
                        <input type="number" id="maxTokens" defaultValue={chatbot.maxTokens} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                        <p className="mt-1 text-xs text-gray-500">
                          Maximum number of tokens for each response
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-sm font-medium text-gray-900 mb-3">
                      Chat Interface
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="welcomeMessage" className="block text-sm font-medium text-gray-700">
                          Welcome Message
                        </label>
                        <textarea id="welcomeMessage" rows={3} defaultValue={chatbot.welcomeMessage} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                      </div>
                      <div className="flex items-center">
                        <input id="enableHistory" type="checkbox" defaultChecked className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                        <label htmlFor="enableHistory" className="ml-2 block text-sm text-gray-700">
                          Enable conversation history
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input id="enableFeedback" type="checkbox" defaultChecked className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                        <label htmlFor="enableFeedback" className="ml-2 block text-sm text-gray-700">
                          Allow users to provide feedback
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-sm font-medium text-gray-900 mb-3">
                      Advanced
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <input id="enableHumanHandoff" type="checkbox" defaultChecked className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                        <label htmlFor="enableHumanHandoff" className="ml-2 block text-sm text-gray-700">
                          Enable human handoff for complex queries
                        </label>
                      </div>
                      <div>
                        <label htmlFor="handoffThreshold" className="block text-sm font-medium text-gray-700">
                          Confidence Threshold for Handoff: 0.4
                        </label>
                        <input type="range" id="handoffThreshold" min="0" max="1" step="0.1" defaultValue="0.4" className="mt-1 block w-full" />
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
          {activeTab === 'knowledge' && <div className="space-y-6">
              <Card>
                <CardHeader>
                  <h2 className="text-lg font-medium text-gray-900">
                    Knowledge Base Configuration
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Connect and manage knowledge sources for this chatbot
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 mb-3">
                        Linked Knowledge Bases
                      </h3>
                      <div className="border border-gray-200 rounded-md divide-y divide-gray-200">
                        {chatbot.knowledge.map((kb, index) => <div key={index} className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <div className="h-10 w-10 rounded-md bg-purple-100 flex items-center justify-center">
                                  <DatabaseIcon className="h-6 w-6 text-purple-600" />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    {kb}
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    {index === 0 ? '156 documents • 24.6 MB' : '78 documents • 3.2 MB'}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <select className="text-sm border border-gray-300 rounded-md shadow-sm py-1 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                                  <option>High Priority</option>
                                  <option>Medium Priority</option>
                                  <option>Low Priority</option>
                                </select>
                                <Button variant="outline" size="sm">
                                  Configure
                                </Button>
                                <Button variant="danger" size="sm">
                                  Unlink
                                </Button>
                              </div>
                            </div>
                          </div>)}
                      </div>
                      <div className="mt-4">
                        <Button variant="outline" icon={<PlusIcon className="h-5 w-5" />}>
                          Link Knowledge Base
                        </Button>
                      </div>
                    </div>
                    <div className="pt-6 border-t border-gray-200">
                      <h3 className="text-sm font-medium text-gray-900 mb-3">
                        Knowledge Processing Settings
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="flex items-center">
                            <input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                            <span className="ml-2 text-sm text-gray-700">
                              Automatically process new documents
                            </span>
                          </label>
                        </div>
                        <div>
                          <label className="flex items-center">
                            <input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                            <span className="ml-2 text-sm text-gray-700">
                              Use semantic search for improved accuracy
                            </span>
                          </label>
                        </div>
                        <div>
                          <label htmlFor="embeddingModel" className="block text-sm font-medium text-gray-700 mb-1">
                            Embedding Model
                          </label>
                          <select id="embeddingModel" className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                            <option>Default (text-embedding-ada-002)</option>
                            <option>text-embedding-3-small</option>
                            <option>text-embedding-3-large</option>
                            <option>Custom Model</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor="chunkSize" className="block text-sm font-medium text-gray-700 mb-1">
                            Chunk Size
                          </label>
                          <select id="chunkSize" className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
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
                        Retrieval Settings
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="retrievalMethod" className="block text-sm font-medium text-gray-700 mb-1">
                            Retrieval Method
                          </label>
                          <select id="retrievalMethod" className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                            <option>Semantic Search</option>
                            <option>Hybrid Search</option>
                            <option>Keyword Search</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor="topK" className="block text-sm font-medium text-gray-700 mb-1">
                            Top-K Retrieval: 5
                          </label>
                          <input type="range" id="topK" min="1" max="20" defaultValue="5" className="w-full" />
                          <p className="mt-1 text-xs text-gray-500">
                            Number of most relevant chunks to retrieve
                          </p>
                        </div>
                        <div>
                          <label htmlFor="similarityThreshold" className="block text-sm font-medium text-gray-700 mb-1">
                            Similarity Threshold: 0.7
                          </label>
                          <input type="range" id="similarityThreshold" min="0" max="1" step="0.05" defaultValue="0.7" className="w-full" />
                          <p className="mt-1 text-xs text-gray-500">
                            Minimum relevance score for retrieved documents
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="pt-6 border-t border-gray-200">
                      <h3 className="text-sm font-medium text-gray-900 mb-3">
                        Citation Settings
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="flex items-center">
                            <input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                            <span className="ml-2 text-sm text-gray-700">
                              Include citations in responses
                            </span>
                          </label>
                        </div>
                        <div>
                          <label className="flex items-center">
                            <input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                            <span className="ml-2 text-sm text-gray-700">
                              Allow users to view source documents
                            </span>
                          </label>
                        </div>
                        <div>
                          <label htmlFor="citationFormat" className="block text-sm font-medium text-gray-700 mb-1">
                            Citation Format
                          </label>
                          <select id="citationFormat" className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                            <option>Inline (Source: Document Name)</option>
                            <option>Numbered ([1], [2], [3])</option>
                            <option>End of Message</option>
                            <option>Hidden (Available on Request)</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end space-x-3 pt-6">
                      <Button variant="secondary">Cancel</Button>
                      <Button variant="primary">Save Changes</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>}
          {activeTab === 'integration' && <div className="space-y-6">
              {/* Embed Code Section */}
              <Card>
                <CardHeader>
                  <h2 className="text-lg font-medium text-gray-900">
                    Embed on Your Website
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Copy and paste this code into your website to add the
                    chatbot widget
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="relative">
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                        <code>{embedCode}</code>
                      </pre>
                      <Button variant="outline" size="sm" className="absolute top-2 right-2 bg-gray-800 border-gray-700 text-gray-100 hover:bg-gray-700" icon={copiedEmbed ? <CheckIcon className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />} onClick={handleCopyEmbed}>
                        {copiedEmbed ? 'Copied!' : 'Copy'}
                      </Button>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                      <h4 className="text-sm font-medium text-blue-900 mb-2">
                        Installation Instructions
                      </h4>
                      <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                        <li>Copy the embed code above</li>
                        <li>
                          Paste it into your website's HTML, just before the
                          closing {`</body>`} tag
                        </li>
                        <li>Save and publish your changes</li>
                        <li>The chatbot widget will appear on your website</li>
                      </ol>
                    </div>
                  </div>
                </CardContent>
              </Card>
              {/* Direct Link Section */}
              <Card>
                <CardHeader>
                  <h2 className="text-lg font-medium text-gray-900">
                    Direct Link
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Share this link to open the chatbot in a standalone page
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <input type="text" value={directLink} readOnly className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm" />
                    <Button variant="outline" size="sm" icon={copiedLink ? <CheckIcon className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />} onClick={handleCopyLink}>
                      {copiedLink ? 'Copied!' : 'Copy'}
                    </Button>
                    <Button variant="outline" size="sm" icon={<ExternalLinkIcon className="h-4 w-4" />} onClick={() => window.open(directLink, '_blank')}>
                      Open
                    </Button>
                  </div>
                </CardContent>
              </Card>
              {/* Widget Customization */}
              <Card>
                <CardHeader>
                  <h2 className="text-lg font-medium text-gray-900">
                    Widget Customization
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Customize how the chatbot widget appears on your website
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Widget Position
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        <button onClick={() => setWidgetPosition('bottom-right')} className={`p-4 border-2 rounded-md text-sm font-medium transition-colors ${widgetPosition === 'bottom-right' ? 'border-blue-600 bg-blue-50 text-blue-900' : 'border-gray-300 text-gray-700 hover:border-gray-400'}`}>
                          <div className="flex items-center justify-center mb-2">
                            <div className="w-16 h-16 border-2 border-gray-300 rounded relative">
                              <div className="absolute bottom-1 right-1 w-4 h-4 bg-blue-600 rounded"></div>
                            </div>
                          </div>
                          Bottom Right
                        </button>
                        <button onClick={() => setWidgetPosition('bottom-left')} className={`p-4 border-2 rounded-md text-sm font-medium transition-colors ${widgetPosition === 'bottom-left' ? 'border-blue-600 bg-blue-50 text-blue-900' : 'border-gray-300 text-gray-700 hover:border-gray-400'}`}>
                          <div className="flex items-center justify-center mb-2">
                            <div className="w-16 h-16 border-2 border-gray-300 rounded relative">
                              <div className="absolute bottom-1 left-1 w-4 h-4 bg-blue-600 rounded"></div>
                            </div>
                          </div>
                          Bottom Left
                        </button>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="widgetColor" className="block text-sm font-medium text-gray-700 mb-2">
                        Primary Color
                      </label>
                      <div className="flex items-center space-x-4">
                        <input type="color" id="widgetColor" value={widgetColor} onChange={e => setWidgetColor(e.target.value)} className="h-10 w-20 rounded border border-gray-300 cursor-pointer" />
                        <input type="text" value={widgetColor} onChange={e => setWidgetColor(e.target.value)} className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm" />
                      </div>
                      <p className="mt-1 text-xs text-gray-500">
                        This color will be used for the chat bubble, header, and
                        buttons
                      </p>
                    </div>
                    <div className="pt-4 border-t border-gray-200">
                      <h4 className="text-sm font-medium text-gray-900 mb-3">
                        Preview
                      </h4>
                      <div className="bg-gray-100 rounded-md p-8 relative h-64">
                        <div className={`absolute ${widgetPosition === 'bottom-right' ? 'bottom-4 right-4' : 'bottom-4 left-4'}`}>
                          <div className="w-14 h-14 rounded-full shadow-lg flex items-center justify-center cursor-pointer transition-transform hover:scale-110" style={{
                        backgroundColor: widgetColor
                      }}>
                            <MessageCircleIcon className="h-7 w-7 text-white" />
                          </div>
                        </div>
                        <div className="text-center text-sm text-gray-500 mt-20">
                          Widget preview
                        </div>
                      </div>
                    </div>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                      <p className="text-sm text-yellow-800">
                        <strong>Note:</strong> After changing customization
                        settings, make sure to update the embed code on your
                        website with the new configuration.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              {/* API Integration */}
              <Card>
                <CardHeader>
                  <h2 className="text-lg font-medium text-gray-900">
                    API Integration
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    For custom integrations, use our REST API
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        API Endpoint
                      </label>
                      <div className="flex items-center space-x-2">
                        <input type="text" value={`https://api.yourapp.com/v1/chat/${chatbot.id}/message`} readOnly className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm font-mono" />
                        <Button variant="outline" size="sm" icon={<CopyIcon className="h-4 w-4" />}>
                          Copy
                        </Button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Example Request
                      </label>
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto text-xs">
                        <code>{`POST /v1/chat/${chatbot.id}/message
Content-Type: application/json
Authorization: Bearer YOUR_API_KEY
{
  "message": "Hello, I need help with my order",
  "sessionId": "user-session-123",
  "userId": "user-456"
}`}</code>
                      </pre>
                    </div>
                    <div>
                      <Button variant="outline" icon={<ExternalLinkIcon className="h-4 w-4" />}>
                        View API Documentation
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              {/* Additional Options */}
              <Card>
                <CardHeader>
                  <h2 className="text-lg font-medium text-gray-900">
                    Advanced Options
                  </h2>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          Enable on Mobile
                        </div>
                        <div className="text-xs text-gray-500">
                          Show chatbot widget on mobile devices
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          Auto-open Widget
                        </div>
                        <div className="text-xs text-gray-500">
                          Automatically open chat after page load
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          Show Branding
                        </div>
                        <div className="text-xs text-gray-500">
                          Display "Powered by ChatBot-Stack" badge
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>}
          {activeTab === 'analytics' && <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-medium text-gray-900">
                        Chatbot Performance Analytics
                      </h2>
                      <p className="mt-1 text-sm text-gray-500">
                        Insights and statistics about your chatbot's performance
                      </p>
                    </div>
                    <select className="border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-white text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                      <option>Last 7 days</option>
                      <option>Last 30 days</option>
                      <option>Last 3 months</option>
                      <option>Last 6 months</option>
                      <option>Last year</option>
                      <option>All time</option>
                    </select>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <div className="text-sm font-medium text-gray-500">
                        Total Conversations
                      </div>
                      <div className="mt-1 flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          1,245
                        </div>
                        <div className="ml-2 flex items-baseline text-sm text-green-600">
                          +12.5%
                          <TrendingUpIcon className="h-4 w-4 ml-1" />
                        </div>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <div className="text-sm font-medium text-gray-500">
                        Avg. Conversation Length
                      </div>
                      <div className="mt-1 flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          4.8 messages
                        </div>
                        <div className="ml-2 flex items-baseline text-sm text-green-600">
                          +3.2%
                          <TrendingUpIcon className="h-4 w-4 ml-1" />
                        </div>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <div className="text-sm font-medium text-gray-500">
                        Satisfaction Rate
                      </div>
                      <div className="mt-1 flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          92%
                        </div>
                        <div className="ml-2 flex items-baseline text-sm text-green-600">
                          +5.4%
                          <TrendingUpIcon className="h-4 w-4 ml-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-8">
                    <h3 className="text-base font-medium text-gray-900 mb-4">
                      Conversations Over Time
                    </h3>
                    <div className="h-64 bg-white p-4 rounded-lg border border-gray-200">
                      <div className="h-full w-full flex items-end justify-between space-x-2">
                        {Array.from({
                      length: 30
                    }).map((_, i) => {
                      const height = 30 + Math.random() * 70;
                      return <div key={i} className="h-full flex items-end">
                              <div className={`w-2 rounded-t-sm ${i === 20 ? 'bg-blue-600' : 'bg-blue-200'}`} style={{
                          height: `${height}%`
                        }}></div>
                            </div>;
                    })}
                      </div>
                      <div className="mt-2 flex justify-between text-xs text-gray-500">
                        <span>Jun 1</span>
                        <span>Jun 15</span>
                        <span>Jun 30</span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                      <h3 className="text-base font-medium text-gray-900 mb-4">
                        User Satisfaction
                      </h3>
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <div className="flex justify-between mb-6">
                          <div className="text-center">
                            <div className="text-3xl font-bold text-green-500">
                              76%
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              Positive
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-3xl font-bold text-blue-500">
                              16%
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              Neutral
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-3xl font-bold text-red-500">
                              8%
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              Negative
                            </div>
                          </div>
                        </div>
                        <div className="h-4 w-full bg-gray-200 rounded-full overflow-hidden">
                          <div className="flex h-full">
                            <div className="bg-green-500 h-full" style={{
                          width: '76%'
                        }}></div>
                            <div className="bg-blue-500 h-full" style={{
                          width: '16%'
                        }}></div>
                            <div className="bg-red-500 h-full" style={{
                          width: '8%'
                        }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-base font-medium text-gray-900 mb-4">
                        Resolution Rate
                      </h3>
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <div className="flex items-center justify-center mb-4">
                          <div className="relative h-32 w-32">
                            <svg className="h-full w-full" viewBox="0 0 36 36">
                              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#E5E7EB" strokeWidth="3" />
                              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#3B82F6" strokeWidth="3" strokeDasharray="85, 100" />
                            </svg>
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                              <div className="text-3xl font-bold text-gray-900">
                                85%
                              </div>
                              <div className="text-xs text-gray-500">
                                Resolved
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-center text-sm text-gray-600">
                          <div>1,058 conversations resolved</div>
                          <div>187 escalated to human support</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-8">
                    <h3 className="text-base font-medium text-gray-900 mb-4">
                      Top User Queries
                    </h3>
                    <div className="bg-white rounded-lg border border-gray-200">
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Query
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Frequency
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Avg. Resolution Time
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Success Rate
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            <tr>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                "How do I reset my password?"
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                142
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                15 seconds
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="mr-2 text-sm text-gray-900">
                                    98%
                                  </div>
                                  <div className="w-16 bg-gray-200 rounded-full h-2">
                                    <div className="bg-green-500 h-2 rounded-full" style={{
                                  width: '98%'
                                }}></div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                "What are your business hours?"
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                98
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                8 seconds
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="mr-2 text-sm text-gray-900">
                                    100%
                                  </div>
                                  <div className="w-16 bg-gray-200 rounded-full h-2">
                                    <div className="bg-green-500 h-2 rounded-full" style={{
                                  width: '100%'
                                }}></div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                "How do I track my order?"
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                87
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                22 seconds
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="mr-2 text-sm text-gray-900">
                                    92%
                                  </div>
                                  <div className="w-16 bg-gray-200 rounded-full h-2">
                                    <div className="bg-green-500 h-2 rounded-full" style={{
                                  width: '92%'
                                }}></div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                "What is your return policy?"
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                76
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                18 seconds
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="mr-2 text-sm text-gray-900">
                                    95%
                                  </div>
                                  <div className="w-16 bg-gray-200 rounded-full h-2">
                                    <div className="bg-green-500 h-2 rounded-full" style={{
                                  width: '95%'
                                }}></div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                "Do you offer international shipping?"
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                65
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                12 seconds
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="mr-2 text-sm text-gray-900">
                                    97%
                                  </div>
                                  <div className="w-16 bg-gray-200 rounded-full h-2">
                                    <div className="bg-green-500 h-2 rounded-full" style={{
                                  width: '97%'
                                }}></div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div className="mb-8">
                    <h3 className="text-base font-medium text-gray-900 mb-4">
                      Knowledge Base Utilization
                    </h3>
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <div className="space-y-4">
                        {chatbot.knowledge.map((kb, index) => <div key={index}>
                            <div className="flex justify-between items-center mb-1">
                              <div className="text-sm font-medium text-gray-700">
                                {kb}
                              </div>
                              <div className="text-sm font-medium text-gray-900">
                                {index === 0 ? '68%' : '32%'}
                              </div>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-blue-600 h-2 rounded-full" style={{
                          width: index === 0 ? '68%' : '32%'
                        }}></div>
                            </div>
                            <div className="mt-1 text-xs text-gray-500">
                              {index === 0 ? '846 queries answered' : '399 queries answered'}
                            </div>
                          </div>)}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-3 pt-6">
                    <Button variant="outline" icon={<DownloadIcon className="h-5 w-5" />}>
                      Export Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>}
          {activeTab !== 'overview' && activeTab !== 'settings' && activeTab !== 'knowledge' && activeTab !== 'analytics' && <Card>
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
                    {(() => {
                const Icon = tabs.find(t => t.id === activeTab)?.icon;
                return Icon ? <Icon className="h-8 w-8" /> : null;
              })()}
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