import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import {
  DatabaseIcon,
  FileTextIcon,
  UploadIcon,
  LinkIcon,
  SearchIcon,
  FolderIcon,
  FileIcon,
  TrashIcon,
  DownloadIcon,
  PlusIcon,
  CalendarIcon,
  MessageSquareIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
} from 'lucide-react'
import { KnowledgeBasesAPI, DocumentsAPI } from '../services/api'

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
  chunk_size: number;
  enable_ocr: boolean;
  auto_process: boolean;
  enable_versioning: boolean;
  created_at: string;
  updated_at: string;
  documents?: Document[];
}

interface Document {
  id: string;
  name: string;
  file_type: string;
  file_size: number;
  file_url: string;
  processing_status: string;
  error_message: string | null;
  uploaded_at: string;
  processed_at: string | null;
  chunk_count: number;
  uploaded_by_email?: string;
}

export function KnowledgeBaseDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('documents')
  const [knowledgeBase, setKnowledgeBase] = useState<KnowledgeBase | null>(null)
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')

  useEffect(() => {
    if (id) {
      fetchKnowledgeBaseData()
    }
  }, [id])

  const fetchKnowledgeBaseData = async () => {
    try {
      setLoading(true)
      const kbData = await KnowledgeBasesAPI.get(id!)
      setKnowledgeBase(kbData)
      
      // Fetch documents
      const docsData = await KnowledgeBasesAPI.getDocuments(id!)
      
      console.log('RAW DOCUMENTS API RESPONSE:', docsData)
      
      // ✅ Normalize API response (array OR { results: [] })
      if (Array.isArray(docsData)) {
        setDocuments(docsData)
      } else if (Array.isArray((docsData as any)?.results)) {
        setDocuments((docsData as any).results)
      } else {
        console.error('Unexpected documents API format:', docsData)
        setDocuments([])
      }
      
      setError('')
    } catch (err: any) {
      setError(err.message || 'Failed to fetch knowledge base data')
      console.error('Error fetching knowledge base:', err)
      setDocuments([])
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteDocument = async (docId: string, event: React.MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()
    
    if (!window.confirm('Are you sure you want to delete this document?')) {
      return
    }

    try {
      await DocumentsAPI.delete(docId)
      setDocuments(safeDocuments.filter(doc => doc.id !== docId))
    } catch (err: any) {
      alert(err.message || 'Failed to delete document')
    }
  }

  // ✅ ABSOLUTE SAFETY BEFORE FILTERING
  const safeDocuments = Array.isArray(documents) ? documents : []

  const filteredDocuments = safeDocuments.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = typeFilter === 'all' || doc.file_type === typeFilter
    return matchesSearch && matchesType
  })

  const getStatusBadge = (status: string) => {
    const badges: { [key: string]: { color: string; icon: any; text: string } } = {
      'completed': { color: 'bg-green-100 text-green-700', icon: CheckCircleIcon, text: 'Completed' },
      'processing': { color: 'bg-blue-100 text-blue-700', icon: ClockIcon, text: 'Processing' },
      'failed': { color: 'bg-red-100 text-red-700', icon: XCircleIcon, text: 'Failed' },
      'pending': { color: 'bg-yellow-100 text-yellow-700', icon: ClockIcon, text: 'Pending' }
    }
    const badge = badges[status] || badges['pending']
    const Icon = badge.icon

    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${badge.color}`}>
        <Icon className="h-3 w-3" />
        {badge.text}
      </span>
    )
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getDocumentIcon = (type: string) => {
    switch (type?.toLowerCase()) {
      case 'pdf':
        return <FileTextIcon className="h-5 w-5 text-red-500" />
      case 'docx':
        return <FileTextIcon className="h-5 w-5 text-blue-500" />
      case 'xlsx':
        return <FileTextIcon className="h-5 w-5 text-green-500" />
      case 'csv':
        return <FileTextIcon className="h-5 w-5 text-orange-500" />
      default:
        return <FileIcon className="h-5 w-5 text-gray-500" />
    }
  }

  const tabs = [
    { id: 'documents', name: 'Documents', icon: FileTextIcon },
    { id: 'settings', name: 'Settings', icon: FolderIcon },
    { id: 'chatbots', name: 'Linked Chatbots', icon: LinkIcon },
  ]

  // ✅ LOADING STATE
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  // ✅ ERROR STATE
  if (error || !knowledgeBase) {
    return (
      <div className="space-y-6">
        <button
          onClick={() => navigate('/knowledge-base')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Back to Knowledge Bases
        </button>
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <p className="font-medium">Error loading knowledge base</p>
          <p className="text-sm mt-1">{error || 'Knowledge base not found'}</p>
          <button
            onClick={() => navigate('/knowledge-base')}
            className="mt-3 text-sm underline hover:no-underline"
          >
            Back to Knowledge Bases
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Back button */}
      <button
        onClick={() => navigate('/knowledge-base')}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        Back to Knowledge Bases
      </button>

      {/* Header */}
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
              Project: {knowledgeBase.project_name || 'N/A'}
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
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center px-4 py-3 text-sm font-medium ${
                      activeTab === tab.id
                        ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <tab.icon className="h-5 w-5 mr-3" />
                    {tab.name}
                  </button>
                ))}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Content */}
        <div className="flex-1">
          {activeTab === 'documents' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-medium text-gray-900">Documents</h2>
                    <div className="flex space-x-2">
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Search documents..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                        />
                        <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                      </div>
                      <select 
                        className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white"
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                      >
                        <option value="all">All Types</option>
                        <option value="pdf">PDF</option>
                        <option value="docx">DOCX</option>
                        <option value="xlsx">XLSX</option>
                        <option value="csv">CSV</option>
                      </select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  {filteredDocuments.length === 0 ? (
                    <div className="p-12 text-center">
                      <FileTextIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {searchQuery || typeFilter !== 'all' 
                          ? 'No documents found' 
                          : 'No documents yet'}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {searchQuery || typeFilter !== 'all'
                          ? 'Try adjusting your search or filters'
                          : 'Upload documents to build your knowledge base'}
                      </p>
                    </div>
                  ) : (
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
                              Status
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
                          {filteredDocuments.map((doc) => (
                            <tr key={doc.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  {getDocumentIcon(doc.file_type)}
                                  <div className="ml-3 text-sm font-medium text-gray-900">
                                    {doc.name}
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 uppercase">
                                {doc.file_type}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {formatFileSize(doc.file_size)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {getStatusBadge(doc.processing_status)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {formatDate(doc.uploaded_at)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {doc.uploaded_by_email || 'Unknown'}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <div className="flex justify-end space-x-2">
                                  {doc.file_url && (
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={(e) => {
                                        e.preventDefault()
                                        window.open(doc.file_url, '_blank')
                                      }}
                                      icon={<DownloadIcon className="h-4 w-4" />}
                                    >
                                      Download
                                    </Button>
                                  )}
                                  <Button
                                    size="sm"
                                    variant="danger"
                                    onClick={(e) => handleDeleteDocument(doc.id, e)}
                                    icon={<TrashIcon className="h-4 w-4" />}
                                  >
                                    Delete
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
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
                    <Button
                      variant="outline"
                      className="mt-4"
                      icon={<UploadIcon className="h-4 w-4" />}
                      onClick={() => window.open(`http://127.0.0.1:8000/admin/knowledge_base/document/add/?knowledge_base=${id}`, '_blank')}
                    >
                      Upload via Admin Panel
                    </Button>
                  </div>
                  <div className="mt-4 text-xs text-gray-500">
                    Maximum file size: 50MB. Document upload UI will be implemented in the next phase.
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'settings' && (
            <Card>
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
                        <label className="block text-sm font-medium text-gray-700">
                          Name
                        </label>
                        <input
                          type="text"
                          value={knowledgeBase.name}
                          readOnly
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Description
                        </label>
                        <textarea
                          rows={3}
                          value={knowledgeBase.description || 'No description'}
                          readOnly
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Type
                        </label>
                        <input
                          type="text"
                          value={knowledgeBase.type}
                          readOnly
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-50 capitalize"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-sm font-medium text-gray-900 mb-3">
                      Processing Settings
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={knowledgeBase.auto_process}
                          disabled
                          className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                        <label className="ml-2 block text-sm text-gray-700">
                          Automatically process new documents
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={knowledgeBase.enable_ocr}
                          disabled
                          className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                        <label className="ml-2 block text-sm text-gray-700">
                          Enable OCR for scanned documents and images
                        </label>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Chunk Size: {knowledgeBase.chunk_size} tokens
                        </label>
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
                        <label className="block text-sm font-medium text-gray-700">
                          Access Level: <span className="capitalize">{knowledgeBase.access_level}</span>
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={knowledgeBase.enable_versioning}
                          disabled
                          className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                        <label className="ml-2 block text-sm text-gray-700">
                          Enable document versioning
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3 pt-6">
                    <Button variant="secondary" onClick={() => navigate('/knowledge-base')}>
                      Back
                    </Button>
                    <Button 
                      variant="primary"
                      onClick={() => window.open(`http://127.0.0.1:8000/admin/knowledge_base/knowledgebase/${id}/change/`, '_blank')}
                    >
                      Edit in Admin Panel
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'chatbots' && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-900">
                    Linked Chatbots
                  </h2>
                  <Button
                    variant="primary"
                    size="sm"
                    icon={<PlusIcon className="h-4 w-4" />}
                  >
                    Link New Chatbot
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <p className="text-sm text-gray-500">
                    This feature will be implemented in the next phase. You'll be able to link chatbots to this knowledge base.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}