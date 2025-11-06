"""
Admin configuration for Knowledge Base models
"""
from django.contrib import admin
from .models import KnowledgeBase, Document, DocumentChunk


@admin.register(KnowledgeBase)
class KnowledgeBaseAdmin(admin.ModelAdmin):
    list_display = ['name', 'project', 'type', 'access_level', 'created_at']
    list_filter = ['type', 'access_level', 'created_at']
    search_fields = ['name', 'project__name']


@admin.register(Document)
class DocumentAdmin(admin.ModelAdmin):
    list_display = ['name', 'knowledge_base', 'file_type', 'file_size', 'processing_status', 'uploaded_at']
    list_filter = ['processing_status', 'file_type', 'uploaded_at']
    search_fields = ['name', 'knowledge_base__name']


@admin.register(DocumentChunk)
class DocumentChunkAdmin(admin.ModelAdmin):
    list_display = ['document', 'chunk_index', 'created_at']
    list_filter = ['created_at']
    search_fields = ['document__name', 'content']