"""
Chatbot Models
"""
from django.db import models
from django.conf import settings
import uuid


class Chatbot(models.Model):
    """Chatbot Model"""
    
    STATUS_CHOICES = [
        ('active', 'Active'),
        ('inactive', 'Inactive'),
        ('training', 'Training'),
    ]
    
    TYPE_CHOICES = [
        ('customer_support', 'Customer Support'),
        ('sales', 'Sales'),
        ('technical', 'Technical Support'),
        ('hr', 'HR'),
        ('general', 'General Purpose'),
    ]
    
    AI_MODEL_CHOICES = [
        ('gpt-4', 'GPT-4'),
        ('gpt-3.5-turbo', 'GPT-3.5 Turbo'),
        ('claude-3-opus', 'Claude 3 Opus'),
        ('claude-3-sonnet', 'Claude 3 Sonnet'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    project = models.ForeignKey(
        'projects.Project',
        on_delete=models.CASCADE,
        related_name='chatbots'
    )
    
    # Basic Info
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    type = models.CharField(max_length=100, choices=TYPE_CHOICES, default='general')
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='active')
    
    # AI Configuration
    ai_model = models.CharField(max_length=100, choices=AI_MODEL_CHOICES, default='gpt-3.5-turbo')
    temperature = models.DecimalField(max_digits=3, decimal_places=2, default=0.7)
    max_tokens = models.IntegerField(default=1000)
    system_prompt = models.TextField(
        blank=True,
        help_text="System prompt to guide the chatbot's behavior"
    )
    
    # Appearance
    avatar_url = models.URLField(blank=True, null=True)
    primary_color = models.CharField(max_length=7, default='#3B82F6')
    
    # Metadata
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        related_name='created_chatbots'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'chatbots'
        verbose_name = 'Chatbot'
        verbose_name_plural = 'Chatbots'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.name} ({self.project.name})"


class ChatbotKnowledgeBase(models.Model):
    """Link between Chatbot and Knowledge Base"""
    
    PRIORITY_CHOICES = [
        (1, 'High'),
        (2, 'Medium'),
        (3, 'Low'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    chatbot = models.ForeignKey(
        Chatbot,
        on_delete=models.CASCADE,
        related_name='knowledge_base_links'
    )
    knowledge_base = models.ForeignKey(
        'knowledge_base.KnowledgeBase',
        on_delete=models.CASCADE,
        related_name='chatbot_links'
    )
    priority = models.IntegerField(choices=PRIORITY_CHOICES, default=2)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'chatbot_knowledge_bases'
        verbose_name = 'Chatbot Knowledge Base Link'
        verbose_name_plural = 'Chatbot Knowledge Base Links'
        unique_together = ['chatbot', 'knowledge_base']
    
    def __str__(self):
        return f"{self.chatbot.name} - {self.knowledge_base.name}"