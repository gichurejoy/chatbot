import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { Link } from 'react-router-dom'
import {
  PlusIcon,
  SearchIcon,
  FilterIcon,
  DatabaseIcon,
  FolderIcon,
  FileTextIcon,
  CalendarIcon,
} from 'lucide-react'
import { KnowledgeBasesAPI } from '../services/api'

interface KnowledgeBase {
  id: string;
  name: string;
  description: string;
  type: string;
  access_level: string;
  project: string;
  project_name: string;
  document_count: number;
  total_size: string;
  created_at: string;
  updated_at: string;
}

export function KnowledgeBase() {
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [showNewKBModal, setShowNewKBModal] = useState(false)
  const [knowledgeBases, setKnowledgeBases] = useState<KnowledgeBase[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')

  useEffect(() => {
    fetchKnowledgeBases()
  }, [])

  const fetchKnowledgeBases = async () => {
    try {
      setLoading(true)
      const data = await KnowledgeBasesAPI.list()

      console.log('RAW KNOWLEDGE BASES API RESPONSE:', data)

      // ✅ Normalize API response (array OR { results: [] })
      if (Array.isArray(data)) {
        setKnowledgeBases(data)
      } else if (Array.isArray((data as any)?.results)) {
        setKnowledgeBases((data as any).results)
      } else {
        console.error('Unexpected knowledge bases API format:', data)
        setKnowledgeBases([])
      }

      setError('')
    } catch (err: any) {
      setError(err.message || 'Failed to fetch knowledge bases')
      console.error('Error fetching knowledge bases:', err)
      setKnowledgeBases([])
    } finally {
      setLoading(false)
    }
  }

  // ✅ ABSOLUTE SAFETY BEFORE FILTERING
  const safeKnowledgeBases = Array.isArray(knowledgeBases) ? knowledgeBases : []

  const filteredKnowledgeBases = safeKnowledgeBases.filter(kb => {
    const matchesSearch = kb.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         kb.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         kb.project_name?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = typeFilter === 'all' || kb.type === typeFilter
    return matchesSearch && matchesFilter
  })

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'catalog':
        return <DatabaseIcon className="h-6 w-6 text-blue-600" />
      case 'faq':
        return <FileTextIcon className="h-6 w-6 text-green-600" />
      case 'documentation':
        return <FileTextIcon className="h-6 w-6 text-purple-600" />
      case 'sales':
        return <DatabaseIcon className="h-6 w-6 text-orange-600" />
      case 'policies':
        return <FolderIcon className="h-6 w-6 text-red-600" />
      case 'training':
        return <FolderIcon className="h-6 w-6 text-indigo-600" />
      default:
        return <DatabaseIcon className="h-6 w-6 text-gray-600" />
    }
  }

  const getTypeLabel = (type: string) => {
    const labels: { [key: string]: string } = {
      'catalog': 'Catalog',
      'faq': 'FAQ',
      'documentation': 'Documentation',
      'sales': 'Sales',
      'policies': 'Policies',
      'training': 'Training'
    }
    return labels[type] || type
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return '1 day ago'
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`
    return date.toLocaleDateString()
  }

  // ✅ LOADING STATE
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  // ✅ ERROR STATE
  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Knowledge Base</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your knowledge sources for chatbot training
          </p>
        </div>
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
          <button
            onClick={fetchKnowledgeBases}
            className="ml-4 text-red-600 hover:text-red-800 font-medium"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Knowledge Base</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your knowledge sources for chatbot training
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Button
            variant="primary"
            icon={<PlusIcon className="h-5 w-5" />}
            onClick={() => setShowNewKBModal(true)}
          >
            New Knowledge Base
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search knowledge bases..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        <div className="flex space-x-2">
          <select 
            className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="catalog">Catalog</option>
            <option value="faq">FAQ</option>
            <option value="documentation">Documentation</option>
            <option value="sales">Sales</option>
            <option value="policies">Policies</option>
            <option value="training">Training</option>
          </select>
          <Button variant="outline" icon={<FilterIcon className="h-5 w-5" />}>
            Filter
          </Button>
          <div className="flex border border-gray-300 rounded-md">
            <button
              className={`px-3 py-2 ${view === 'grid' ? 'bg-gray-100 text-gray-900' : 'text-gray-500'}`}
              onClick={() => setView('grid')}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
              </svg>
            </button>
            <button
              className={`px-3 py-2 ${view === 'list' ? 'bg-gray-100 text-gray-900' : 'text-gray-500'}`}
              onClick={() => setView('list')}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="8" y1="6" x2="21" y2="6"></line>
                <line x1="8" y1="12" x2="21" y2="12"></line>
                <line x1="8" y1="18" x2="21" y2="18"></line>
                <line x1="3" y1="6" x2="3.01" y2="6"></line>
                <line x1="3" y1="12" x2="3.01" y2="12"></line>
                <line x1="3" y1="18" x2="3.01" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* EMPTY STATE */}
      {filteredKnowledgeBases.length === 0 && (
        <div className="text-center py-12">
          <DatabaseIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {searchQuery || typeFilter !== 'all' 
              ? 'No knowledge bases found' 
              : 'No knowledge bases yet'}
          </h3>
          <p className="text-gray-600 mb-4">
            {searchQuery || typeFilter !== 'all'
              ? 'Try adjusting your search or filters'
              : 'Create your first knowledge base to train your chatbots'}
          </p>
          {!searchQuery && typeFilter === 'all' && (
            <Button
              variant="primary"
              icon={<PlusIcon className="h-5 w-5" />}
              onClick={() => setShowNewKBModal(true)}
            >
              Create Knowledge Base
            </Button>
          )}
        </div>
      )}

      {/* Knowledge Bases Grid/List View */}
      {filteredKnowledgeBases.length > 0 && (
        <>
          {view === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredKnowledgeBases.map((kb) => (
                <Link key={kb.id} to={`/knowledge-base/${kb.id}`} className="block">
                  <Card className="h-full hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-md bg-blue-100 flex items-center justify-center">
                            {getTypeIcon(kb.type)}
                          </div>
                          <div className="ml-3">
                            <h3 className="text-lg font-medium text-gray-900">
                              {kb.name}
                            </h3>
                            <p className="text-xs text-gray-500">{getTypeLabel(kb.type)}</p>
                          </div>
                        </div>
                        <Badge variant="info">{kb.document_count || 0} docs</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {kb.description || 'No description provided'}
                      </p>
                      <div className="flex items-center justify-between text-sm">
                        <div className="text-gray-500">
                          Project:{' '}
                          <span className="text-gray-700">{kb.project_name || 'N/A'}</span>
                        </div>
                        <div className="text-gray-500">{kb.total_size || '0 MB'}</div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center text-xs text-gray-400">
                          <CalendarIcon className="h-3 w-3 mr-1" />
                          Updated {formatDate(kb.updated_at)}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <Card>
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
                          Project
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Documents
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Size
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Last Updated
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredKnowledgeBases.map((kb) => (
                        <tr key={kb.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-8 w-8 rounded-md bg-blue-100 flex items-center justify-center">
                                {getTypeIcon(kb.type)}
                              </div>
                              <div className="ml-3">
                                <div className="text-sm font-medium text-gray-900">
                                  {kb.name}
                                </div>
                                <div className="text-xs text-gray-500 max-w-xs truncate">
                                  {kb.description || 'No description'}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {getTypeLabel(kb.type)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {kb.project_name || 'N/A'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {kb.document_count || 0}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {kb.total_size || '0 MB'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(kb.updated_at)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                as={Link}
                                to={`/knowledge-base/${kb.id}`}
                              >
                                View
                              </Button>
                              <Button size="sm" variant="outline">
                                Edit
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}

      {/* Simple Modal for demonstration */}
      {showNewKBModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <h2 className="text-lg font-medium text-gray-900">
                Create New Knowledge Base
              </h2>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Creating knowledge bases through the UI will be implemented in the next phase. 
                For now, you can create them through the Django admin panel.
              </p>
              <div className="flex justify-end space-x-3">
                <Button
                  variant="secondary"
                  onClick={() => setShowNewKBModal(false)}
                >
                  Close
                </Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    window.open('http://127.0.0.1:8000/admin/knowledge_base/knowledgebase/add/', '_blank')
                    setShowNewKBModal(false)
                  }}
                >
                  Open Admin Panel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}


