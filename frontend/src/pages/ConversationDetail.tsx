import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ArrowLeftIcon, DownloadIcon, ShareIcon, FlagIcon, BotIcon, UserIcon, ThumbsUpIcon, ThumbsDownIcon } from 'lucide-react';
export function ConversationDetail() {
  const {
    id
  } = useParams<{
    id: string;
  }>();
  const conversation = {
    id: Number(id),
    user: 'John Smith',
    userEmail: 'john.smith@example.com',
    chatbot: 'Customer Support Assistant',
    started: 'June 15, 2023 at 2:30 PM',
    ended: 'June 15, 2023 at 2:38 PM',
    duration: '8 minutes',
    messages: 12,
    satisfaction: 'positive',
    rating: 5,
    feedback: 'Very helpful and quick response!',
    messages_list: [{
      role: 'bot',
      content: "Hi there! I'm your Customer Support Assistant. How can I help you today?",
      timestamp: '2:30 PM'
    }, {
      role: 'user',
      content: 'I need help with my order #12345',
      timestamp: '2:31 PM'
    }, {
      role: 'bot',
      content: 'I can help you with that! Let me look up your order details.',
      timestamp: '2:31 PM'
    }, {
      role: 'bot',
      content: 'I found your order. It was shipped on June 10th and should arrive by June 20th. Would you like tracking information?',
      timestamp: '2:32 PM'
    }, {
      role: 'user',
      content: 'Yes please, I would like the tracking number',
      timestamp: '2:33 PM'
    }, {
      role: 'bot',
      content: 'Your tracking number is: 1Z999AA10123456784. You can track it on the carrier website.',
      timestamp: '2:33 PM'
    }, {
      role: 'user',
      content: 'Thank you! One more question - can I change the delivery address?',
      timestamp: '2:34 PM'
    }, {
      role: 'bot',
      content: 'Since your package is already in transit, I cannot change the delivery address directly. However, you can contact the carrier using the tracking number to request a delivery redirect.',
      timestamp: '2:35 PM'
    }, {
      role: 'user',
      content: 'Okay, I understand. How do I contact the carrier?',
      timestamp: '2:36 PM'
    }, {
      role: 'bot',
      content: 'You can call them at 1-800-CARRIER or use their website at www.carrier.com/redirect. You will need your tracking number.',
      timestamp: '2:36 PM'
    }, {
      role: 'user',
      content: 'Perfect! Thank you so much for your help!',
      timestamp: '2:37 PM'
    }, {
      role: 'bot',
      content: "You're welcome! Is there anything else I can help you with today?",
      timestamp: '2:37 PM'
    }, {
      role: 'user',
      content: 'No, that is all. Thanks again!',
      timestamp: '2:38 PM'
    }]
  };
  return <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/conversations">
            <Button variant="ghost" icon={<ArrowLeftIcon className="h-5 w-5" />}>
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Conversation Details
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Conversation #{conversation.id}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" icon={<DownloadIcon className="h-5 w-5" />}>
            Export
          </Button>
          <Button variant="outline" icon={<ShareIcon className="h-5 w-5" />}>
            Share
          </Button>
          <Button variant="outline" icon={<FlagIcon className="h-5 w-5" />}>
            Report
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-medium text-gray-900">
                Conversation Transcript
              </h2>
            </CardHeader>
            <CardContent className="p-4 space-y-4 max-h-[600px] overflow-y-auto">
              {conversation.messages_list.map((message, index) => <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex items-start space-x-2 max-w-[80%]`}>
                    {message.role === 'bot' && <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <BotIcon className="h-5 w-5 text-blue-600" />
                      </div>}
                    <div className={`rounded-lg px-4 py-2 ${message.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'}`}>
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${message.role === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                        {message.timestamp}
                      </p>
                    </div>
                    {message.role === 'user' && <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                        <UserIcon className="h-5 w-5 text-gray-600" />
                      </div>}
                  </div>
                </div>)}
            </CardContent>
          </Card>
          {conversation.feedback && <Card>
              <CardHeader>
                <h2 className="text-lg font-medium text-gray-900">
                  User Feedback
                </h2>
              </CardHeader>
              <CardContent>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    {conversation.satisfaction === 'positive' ? <ThumbsUpIcon className="h-8 w-8 text-green-500" /> : <ThumbsDownIcon className="h-8 w-8 text-red-500" />}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-sm font-medium text-gray-900">
                        Rating:
                      </span>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map(star => <svg key={star} className={`h-5 w-5 ${star <= conversation.rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>)}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      {conversation.feedback}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>}
        </div>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-medium text-gray-900">
                Conversation Info
              </h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-gray-500">User</div>
                  <div className="mt-1 text-sm text-gray-900">
                    {conversation.user}
                  </div>
                  <div className="text-xs text-gray-500">
                    {conversation.userEmail}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">
                    Chatbot
                  </div>
                  <div className="mt-1 text-sm text-gray-900">
                    {conversation.chatbot}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">
                    Started
                  </div>
                  <div className="mt-1 text-sm text-gray-900">
                    {conversation.started}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">Ended</div>
                  <div className="mt-1 text-sm text-gray-900">
                    {conversation.ended}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">
                    Duration
                  </div>
                  <div className="mt-1 text-sm text-gray-900">
                    {conversation.duration}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">
                    Total Messages
                  </div>
                  <div className="mt-1 text-sm text-gray-900">
                    {conversation.messages}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">
                    Satisfaction
                  </div>
                  <div className="mt-1">
                    <Badge variant={conversation.satisfaction === 'positive' ? 'success' : conversation.satisfaction === 'neutral' ? 'warning' : 'danger'}>
                      {conversation.satisfaction}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <h2 className="text-lg font-medium text-gray-900">
                Quick Actions
              </h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  View Similar Conversations
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Add to Training Data
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Contact User
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Flag for Review
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>;
}