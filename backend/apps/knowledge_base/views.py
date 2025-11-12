"""
Knowledge Base Views
"""
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import KnowledgeBase, Document, DocumentChunk
from .serializers import (
    KnowledgeBaseSerializer, KnowledgeBaseDetailSerializer,
    DocumentSerializer, DocumentChunkSerializer
)


class KnowledgeBaseViewSet(viewsets.ModelViewSet):
    """Knowledge Base ViewSet"""
    
    queryset = KnowledgeBase.objects.all()
    serializer_class = KnowledgeBaseSerializer
    permission_classes = [IsAuthenticated]
    
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return KnowledgeBaseDetailSerializer
        return KnowledgeBaseSerializer
    
    def get_queryset(self):
        """Filter knowledge bases by user's projects"""
        user = self.request.user
        return KnowledgeBase.objects.filter(
            project__organization__members__user=user
        ).distinct()
    
    def perform_create(self, serializer):
        """Set created_by to current user"""
        serializer.save(created_by=self.request.user)
    
    @action(detail=True, methods=['get'])
    def documents(self, request, pk=None):
        """Get knowledge base documents"""
        knowledge_base = self.get_object()
        documents = knowledge_base.documents.all()
        serializer = DocumentSerializer(documents, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def upload_document(self, request, pk=None):
        """Upload document to knowledge base"""
        knowledge_base = self.get_object()
        data = request.data.copy()
        data['knowledge_base'] = knowledge_base.id
        serializer = DocumentSerializer(data=data)
        if serializer.is_valid():
            serializer.save(uploaded_by=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DocumentViewSet(viewsets.ModelViewSet):
    """Document ViewSet"""
    
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        """Filter documents by user's projects"""
        user = self.request.user
        return Document.objects.filter(
            knowledge_base__project__organization__members__user=user
        ).distinct()
    
    @action(detail=True, methods=['post'])
    def process(self, request, pk=None):
        """Process document (extract text, create chunks)"""
        document = self.get_object()
        
        # This is a placeholder - actual processing will be done with Celery
        document.processing_status = 'processing'
        document.save()
        
        # TODO: Trigger Celery task for document processing
        
        return Response({
            'message': 'Document processing started',
            'document_id': str(document.id),
            'status': document.processing_status
        })
    
    @action(detail=True, methods=['get'])
    def chunks(self, request, pk=None):
        """Get document chunks"""
        document = self.get_object()
        chunks = document.chunks.all()
        serializer = DocumentChunkSerializer(chunks, many=True)
        return Response(serializer.data)