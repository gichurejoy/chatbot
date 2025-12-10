from django.db import models
from rest_framework import serializers
from .models import KnowledgeBase, Document, DocumentChunk


class KnowledgeBaseSerializer(serializers.ModelSerializer):
    """Knowledge Base Serializer"""
    
    project_name = serializers.CharField(source='project.name', read_only=True)
    created_by_email = serializers.EmailField(source='created_by.email', read_only=True, allow_null=True)
    document_count = serializers.SerializerMethodField()
    total_size = serializers.SerializerMethodField()
    
    class Meta:
        model = KnowledgeBase
        fields = [
            'id', 'project', 'project_name', 'name', 'description', 'type',
            'chunk_size', 'enable_ocr', 'auto_process',
            'access_level', 'enable_versioning',
            'created_by', 'created_by_email', 'document_count', 'total_size',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_by', 'created_at', 'updated_at']
    
    def get_document_count(self, obj):
        """Get total number of documents"""
        return obj.documents.count()
    
    def get_total_size(self, obj):
        """Get total size of all documents in MB"""
        total_bytes = obj.documents.aggregate(
            total=models.Sum('file_size')
        )['total'] or 0
        total_mb = total_bytes / (1024 * 1024)
        return f"{total_mb:.2f} MB"


class DocumentSerializer(serializers.ModelSerializer):
    """Document Serializer"""
    
    knowledge_base_name = serializers.CharField(source='knowledge_base.name', read_only=True)
    uploaded_by_email = serializers.EmailField(source='uploaded_by.email', read_only=True, allow_null=True)
    chunk_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Document
        fields = [
            'id', 'knowledge_base', 'knowledge_base_name', 'name', 'file_type', 
            'file_size', 'file_url', 'processing_status', 'processed_at', 'error_message',
            'uploaded_by', 'uploaded_by_email', 'chunk_count',
            'uploaded_at', 'updated_at'
        ]
        read_only_fields = ['id', 'uploaded_by', 'processing_status', 'processed_at', 'uploaded_at', 'updated_at']
    
    def get_chunk_count(self, obj):
        """Get number of chunks for this document"""
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