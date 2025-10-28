import React, { useState } from 'react';
import { Card, CardContent } from './ui/Card';
import { Button } from './ui/Button';
import { CheckIcon, RocketIcon, MessageSquareIcon, DatabaseIcon, SettingsIcon } from 'lucide-react';
interface OnboardingProps {
  onComplete: () => void;
}
export function Onboarding({
  onComplete
}: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = [{
    title: 'Welcome to ChatBot Hub!',
    description: "Let's get you started with creating your first AI-powered chatbot. This quick tour will help you understand the basics.",
    icon: RocketIcon,
    content: <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-6">
            <h3 className="text-lg font-medium text-blue-900 mb-2">
              What you'll learn:
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckIcon className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                <span className="text-sm text-blue-800">
                  How to create your first chatbot
                </span>
              </li>
              <li className="flex items-start">
                <CheckIcon className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                <span className="text-sm text-blue-800">
                  Adding knowledge to your chatbot
                </span>
              </li>
              <li className="flex items-start">
                <CheckIcon className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                <span className="text-sm text-blue-800">
                  Testing and deploying your chatbot
                </span>
              </li>
              <li className="flex items-start">
                <CheckIcon className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                <span className="text-sm text-blue-800">
                  Monitoring performance and analytics
                </span>
              </li>
            </ul>
          </div>
        </div>
  }, {
    title: 'Create Your First Chatbot',
    description: 'Chatbots are AI-powered assistants that can handle customer inquiries, provide support, and automate conversations.',
    icon: MessageSquareIcon,
    content: <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-base font-medium text-gray-900 mb-3">
              Quick Setup
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Chatbot Name
                </label>
                <input type="text" placeholder="e.g., Customer Support Bot" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Customer Support</option>
                  <option>Sales Assistant</option>
                  <option>FAQ Bot</option>
                  <option>General Purpose</option>
                </select>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="text-sm text-gray-600">
              💡 <strong>Tip:</strong> Choose a descriptive name that reflects
              your chatbot's purpose. You can always change this later in
              settings.
            </p>
          </div>
        </div>
  }, {
    title: 'Add Knowledge Base',
    description: 'Upload documents, FAQs, or website content to train your chatbot. The more information you provide, the better it can assist users.',
    icon: DatabaseIcon,
    content: <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <DatabaseIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <p className="text-sm text-gray-600 mb-2">
              Drag and drop files here, or click to browse
            </p>
            <p className="text-xs text-gray-500">
              Supported formats: PDF, DOCX, TXT, CSV
            </p>
            <Button variant="outline" className="mt-4">
              Choose Files
            </Button>
          </div>
          <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4">
            <p className="text-sm text-yellow-800">
              <strong>Pro tip:</strong> Start with your most common FAQs or
              product documentation. You can add more content anytime.
            </p>
          </div>
        </div>
  }, {
    title: 'Configure & Test',
    description: "Customize your chatbot's appearance and behavior, then test it to ensure it's working as expected.",
    icon: SettingsIcon,
    content: <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-900 mb-3">
                Appearance
              </h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Primary Color</span>
                  <div className="h-6 w-6 rounded-full bg-blue-600 border border-gray-300"></div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Position</span>
                  <span className="text-sm font-medium">Bottom Right</span>
                </div>
              </div>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-900 mb-3">
                Behavior
              </h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Auto-greet</span>
                  <input type="checkbox" defaultChecked className="h-4 w-4" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Sound</span>
                  <input type="checkbox" className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-green-50 border border-green-100 rounded-lg p-4">
            <p className="text-sm text-green-800">
              ✓ Once configured, use the "Test Chat" button to interact with
              your chatbot before deploying it.
            </p>
          </div>
        </div>
  }, {
    title: "You're All Set!",
    description: "Congratulations! You've completed the setup. Your chatbot is ready to start helping your customers.",
    icon: CheckIcon,
    content: <div className="space-y-4">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Next Steps
            </h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-medium mr-3">
                  1
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    Deploy Your Chatbot
                  </div>
                  <div className="text-xs text-gray-600">
                    Add the embed code to your website
                  </div>
                </div>
              </div>
              <div className="flex items-start">
                <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-medium mr-3">
                  2
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    Monitor Performance
                  </div>
                  <div className="text-xs text-gray-600">
                    Check analytics to see how users interact
                  </div>
                </div>
              </div>
              <div className="flex items-start">
                <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-medium mr-3">
                  3
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    Refine & Improve
                  </div>
                  <div className="text-xs text-gray-600">
                    Use insights to train your chatbot better
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-2">
              Need Help?
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              Check out our documentation or contact support if you have any
              questions.
            </p>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                View Docs
              </Button>
              <Button variant="outline" size="sm">
                Contact Support
              </Button>
            </div>
          </div>
        </div>
  }];
  const currentStepData = steps[currentStep];
  const StepIcon = currentStepData.icon;
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  return <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-3xl">
        <CardContent className="p-8">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              {steps.map((step, index) => <div key={index} className={`flex-1 ${index !== steps.length - 1 ? 'mr-2' : ''}`}>
                  <div className={`h-2 rounded-full ${index <= currentStep ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                </div>)}
            </div>
            <div className="text-sm text-gray-500 text-right">
              Step {currentStep + 1} of {steps.length}
            </div>
          </div>
          {/* Step Content */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                <StepIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {currentStepData.title}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {currentStepData.description}
                </p>
              </div>
            </div>
            <div className="mt-6">{currentStepData.content}</div>
          </div>
          {/* Navigation Buttons */}
          <div className="flex justify-between items-center">
            <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 0}>
              Previous
            </Button>
            <button onClick={onComplete} className="text-sm text-gray-500 hover:text-gray-700">
              Skip Tour
            </button>
            <Button variant="primary" onClick={handleNext}>
              {currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>;
}