import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { XIcon } from 'lucide-react';
interface NewChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ChatbotFormData) => void;
}
export interface ChatbotFormData {
  name: string;
  description: string;
  type: string;
  project: string;
  model: string;
  temperature: number;
}
export function NewChatbotModal({
  isOpen,
  onClose,
  onSubmit
}: NewChatbotModalProps) {
  const [formData, setFormData] = useState<ChatbotFormData>({
    name: '',
    description: '',
    type: 'Customer Support',
    project: '',
    model: 'GPT-4',
    temperature: 0.7
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };
  if (!isOpen) return null;
  return <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 transition-opacity" onClick={onClose}></div>
        <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Create New Chatbot
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <XIcon className="h-6 w-6" />
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="p-6 space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Chatbot Name *
                </label>
                <input type="text" id="name" required value={formData.name} onChange={e => setFormData({
                ...formData,
                name: e.target.value
              })} placeholder="E.g., Customer Support Assistant" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description *
                </label>
                <textarea id="description" required rows={3} value={formData.description} onChange={e => setFormData({
                ...formData,
                description: e.target.value
              })} placeholder="Brief description of what this chatbot does" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                    Type *
                  </label>
                  <select id="type" required value={formData.type} onChange={e => setFormData({
                  ...formData,
                  type: e.target.value
                })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                    <option>Customer Support</option>
                    <option>Sales</option>
                    <option>Technical Support</option>
                    <option>General Purpose</option>
                    <option>HR</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="project" className="block text-sm font-medium text-gray-700">
                    Project *
                  </label>
                  <select id="project" required value={formData.project} onChange={e => setFormData({
                  ...formData,
                  project: e.target.value
                })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                    <option value="">Select a project</option>
                    <option>E-commerce Assistant</option>
                    <option>Sales Automation</option>
                    <option>Technical Support</option>
                    <option>Customer Support</option>
                    <option>HR Assistant</option>
                  </select>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-sm font-medium text-gray-900 mb-4">
                  AI Configuration
                </h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="model" className="block text-sm font-medium text-gray-700">
                      AI Model
                    </label>
                    <select id="model" value={formData.model} onChange={e => setFormData({
                    ...formData,
                    model: e.target.value
                  })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                      <option>GPT-4</option>
                      <option>GPT-3.5</option>
                      <option>Claude</option>
                      <option>Custom Model</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="temperature" className="block text-sm font-medium text-gray-700">
                      Temperature: {formData.temperature}
                    </label>
                    <input type="range" id="temperature" min="0" max="1" step="0.1" value={formData.temperature} onChange={e => setFormData({
                    ...formData,
                    temperature: parseFloat(e.target.value)
                  })} className="mt-1 block w-full" />
                    <div className="mt-1 flex justify-between text-xs text-gray-500">
                      <span>Precise (0)</span>
                      <span>Balanced (0.5)</span>
                      <span>Creative (1)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
              <Button variant="secondary" onClick={onClose} type="button">
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Create Chatbot
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>;
}