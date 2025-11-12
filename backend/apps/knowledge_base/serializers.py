"""
Knowledge Base Serializers
"""
from rest_framework import serializers
from .models import KnowledgeBase, Document, DocumentChunk


class KnowledgeBaseSerializer(serializers.ModelSerializer):
    """Knowledge Base Serializer"""
    
    project_name = serializers.CharField(source='project.name', read_only=True)
    created_by_email = serializers.EmailField(source='created_by.email', read_only=True)
    documents_count = serializers.SerializerMethodField()
    
    class Meta:
        model = KnowledgeBase
        fields = [
            'id', 'project', 'project_name', 'name', 'description', 'type',
            'chunk_size', 'enable_ocr', 'auto_process',
            'access_level', 'enable_versioning',
            'created_by', 'created_by_email', 'documents_count',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_by', 'created_at', 'updated_at']
    
    def get_documents_count(self, obj):
        return obj.documents.count()


class DocumentSerializer(serializers.ModelSerializer):
    """Document Serializer"""
    
    knowledge_base_name = serializers.CharField(source='knowledge_base.name', read_only=True)
    uploaded_by_email = serializers.EmailField(source='uploaded_by.email', read_only=True)
    chunks_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Document
        fields = [
            'id', 'knowledge_base', 'knowledge_base_name', 'name', 'file_type', 'file_size', 'file_url',
            'processing_status', 'processed_at', 'error_message',
            'uploaded_by', 'uploaded_by_email', 'chunks_count',
            'uploaded_at', 'updated_at'
        ]
        read_only_fields = ['id', 'uploaded_by', 'processing_status', 'processed_at', 'uploaded_at', 'updated_at']
    
    def get_chunks_count(self, obj):
        return obj.chunks.count()


class DocumentChunkSerializer(serializers.ModelSerializer):
    """Document Chunk Serializer"""
    
    document_name = serializers.CharField(source='document.name', read_only=True)
    
    class Meta:
        model = DocumentChunk
        fields = [
            'id', 'document', 'document_name', 'chunk_index', 'content', 'metadata', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']


class KnowledgeBaseDetailSerializer(KnowledgeBaseSerializer):
    """Knowledge Base Detail Serializer with documents"""
    
    documents = DocumentSerializer(many=True, read_only=True)
    
    class Meta(KnowledgeBaseSerializer.Meta):
        fields = KnowledgeBaseSerializer.Meta.fields + ['documents']