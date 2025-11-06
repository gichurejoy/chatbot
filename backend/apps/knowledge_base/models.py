"""
Knowledge Base and Document Models
"""
from django.db import models
from django.conf import settings
import uuid


class KnowledgeBase(models.Model):
    """Knowledge Base Model"""
    
    TYPE_CHOICES = [
        ('catalog', 'Product Catalog'),
        ('faq', 'FAQ'),
        ('documentation', 'Documentation'),
        ('sales', 'Sales Materials'),
        ('policies', 'Policies'),
        ('training', 'Training Materials'),
    ]
    
    ACCESS_CHOICES = [
        ('public', 'Public'),
        ('project', 'Project Only'),
        ('private', 'Private'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    project = models.ForeignKey(
        'projects.Project',
        on_delete=models.CASCADE,
        related_name='knowledge_bases'
    )
    
    # Basic Info
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    type = models.CharField(max_length=100, choices=TYPE_CHOICES, default='documentation')
    
    # Processing Settings
    chunk_size = models.IntegerField(default=512, help_text="Size of text chunks for processing")
    enable_ocr = models.BooleanField(default=True, help_text="Enable OCR for image-based documents")
    auto_process = models.BooleanField(default=True, help_text="Automatically process uploaded documents")
    
    # Access Control
    access_level = models.CharField(max_length=50, choices=ACCESS_CHOICES, default='project')
    enable_versioning = models.BooleanField(default=True)
    
    # Metadata
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        related_name='created_knowledge_bases'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'knowledge_bases'
        verbose_name = 'Knowledge Base'
        verbose_name_plural = 'Knowledge Bases'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.name} ({self.project.name})"


class Document(models.Model):
    """Document Model"""
    
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('processing', 'Processing'),
        ('completed', 'Completed'),
        ('failed', 'Failed'),
    ]
    
    FILE_TYPE_CHOICES = [
        ('pdf', 'PDF'),
        ('docx', 'Word Document'),
        ('txt', 'Text File'),
        ('csv', 'CSV'),
        ('xlsx', 'Excel'),
        ('html', 'HTML'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    knowledge_base = models.ForeignKey(
        KnowledgeBase,
        on_delete=models.CASCADE,
        related_name='documents'
    )
    
    # File Info
    name = models.CharField(max_length=255)
    file_type = models.CharField(max_length=50, choices=FILE_TYPE_CHOICES)
    file_size = models.BigIntegerField(help_text="File size in bytes")
    file_url = models.URLField(help_text="URL to the stored file")
    
    # Processing Status
    processing_status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='pending')
    processed_at = models.DateTimeField(null=True, blank=True)
    error_message = models.TextField(blank=True)
    
    # Metadata
    uploaded_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        related_name='uploaded_documents'
    )
    uploaded_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'documents'
        verbose_name = 'Document'
        verbose_name_plural = 'Documents'
        ordering = ['-uploaded_at']
    
    def __str__(self):
        return f"{self.name} ({self.knowledge_base.name})"


class DocumentChunk(models.Model):
    """Document Chunk Model for storing processed text chunks"""
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    document = models.ForeignKey(
        Document,
        on_delete=models.CASCADE,
        related_name='chunks'
    )
    
    # Chunk Data
    chunk_index = models.IntegerField(help_text="Order of this chunk in the document")
    content = models.TextField(help_text="Text content of this chunk")
    
    # Vector embedding will be added later when we integrate pgvector
    # embedding = VectorField(dimensions=1536)  # For OpenAI embeddings
    
    # Metadata
    metadata = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'document_chunks'
        verbose_name = 'Document Chunk'
        verbose_name_plural = 'Document Chunks'
        ordering = ['document', 'chunk_index']
        indexes = [
            models.Index(fields=['document', 'chunk_index']),
        ]
    
    def __str__(self):
        return f"{self.document.name} - Chunk {self.chunk_index}"