import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { SendIcon, ArrowLeftIcon, SettingsIcon, RefreshCwIcon, DownloadIcon, ThumbsUpIcon, ThumbsDownIcon } from 'lucide-react';
export function ChatbotTester() {
  const {
    id
  } = useParams<{
    id: string;
  }>();
  const [messages, setMessages] = useState([{
    id: 1,
    type: 'bot',
    content: "Hi there! I'm your Customer Support Assistant. How can I help you today?",
    timestamp: new Date()
  }]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };
    setMessages([...messages, userMessage]);
    setInputMessage('');
    setIsTyping(true);
    setTimeout(() => {
      const botMessage = {
        id: messages.length + 2,
        type: 'bot',
        content: 'I understand your question. Let me help you with that. This is a simulated response for testing purposes.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  const handleReset = () => {
    setMessages([{
      id: 1,
      type: 'bot',
      content: "Hi there! I'm your Customer Support Assistant. How can I help you today?",
      timestamp: new Date()
    }]);
  };
  return <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to={`/chatbots/${id}`}>
            <Button variant="outline" icon={<ArrowLeftIcon className="h-5 w-5" />}>
              Back to Chatbot
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Test Chatbot</h1>
            <p className="mt-1 text-sm text-gray-500">
              Test your chatbot in a live environment
            </p>
          </div>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" icon={<RefreshCwIcon className="h-5 w-5" />} onClick={handleReset}>
            Reset
          </Button>
          <Button variant="outline" icon={<DownloadIcon className="h-5 w-5" />}>
            Export Chat
          </Button>
          <Button variant="outline" icon={<SettingsIcon className="h-5 w-5" />}>
            Settings
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="h-[600px] flex flex-col">
            <CardHeader className="border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
                    CB
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      Customer Support Assistant
                    </h3>
                    <p className="text-xs text-gray-500">Online</p>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map(message => <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${message.type === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'}`}>
                    <p className="text-sm">{message.content}</p>
                    <p className={`text-xs mt-1 ${message.type === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                      {message.timestamp.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                    </p>
                  </div>
                </div>)}
              {isTyping && <div className="flex justify-start">
                  <div className="max-w-xs lg:max-w-md px-4 py-2 rounded-lg bg-gray-100">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>}
            </CardContent>
            <div className="border-t border-gray-200 p-4">
              <div className="flex space-x-2">
                <textarea value={inputMessage} onChange={e => setInputMessage(e.target.value)} onKeyPress={handleKeyPress} placeholder="Type your message..." rows={1} className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
                <Button variant="primary" icon={<SendIcon className="h-5 w-5" />} onClick={handleSendMessage}>
                  Send
                </Button>
              </div>
            </div>
          </Card>
        </div>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-medium text-gray-900">
                Test Statistics
              </h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-500">Messages Sent</div>
                  <div className="text-2xl font-semibold text-gray-900">
                    {messages.filter(m => m.type === 'user').length}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Bot Responses</div>
                  <div className="text-2xl font-semibold text-gray-900">
                    {messages.filter(m => m.type === 'bot').length}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Avg Response Time</div>
                  <div className="text-2xl font-semibold text-gray-900">
                    1.2s
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <h3 className="text-lg font-medium text-gray-900">
                Quick Actions
              </h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start" onClick={() => setInputMessage('How do I reset my password?')}>
                  Test Password Reset
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => setInputMessage('What are your business hours?')}>
                  Test Business Hours
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => setInputMessage('How do I track my order?')}>
                  Test Order Tracking
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => setInputMessage('I need to speak with a human')}>
                  Test Human Handoff
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <h3 className="text-lg font-medium text-gray-900">
                Rate Response
              </h3>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-2">
                <Button variant="outline" className="flex-1" icon={<ThumbsUpIcon className="h-5 w-5" />}>
                  Helpful
                </Button>
                <Button variant="outline" className="flex-1" icon={<ThumbsDownIcon className="h-5 w-5" />}>
                  Not Helpful
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>;
}