"""
Conversation and Message Models
"""
from django.db import models
import uuid


class Conversation(models.Model):
    """Conversation Model"""
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    chatbot = models.ForeignKey(
        'chatbots.Chatbot',
        on_delete=models.CASCADE,
        related_name='conversations'
    )
    
    # User Info
    user_identifier = models.CharField(
        max_length=255,
        help_text="Anonymous user ID or email"
    )
    
    # Session Info
    session_id = models.CharField(max_length=255, blank=True)
    started_at = models.DateTimeField(auto_now_add=True)
    ended_at = models.DateTimeField(null=True, blank=True)
    
    # Metadata
    user_agent = models.TextField(blank=True)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    metadata = models.JSONField(default=dict, blank=True)
    
    class Meta:
        db_table = 'conversations'
        verbose_name = 'Conversation'
        verbose_name_plural = 'Conversations'
        ordering = ['-started_at']
        indexes = [
            models.Index(fields=['chatbot', '-started_at']),
            models.Index(fields=['session_id']),
        ]
    
    def __str__(self):
        return f"Conversation {self.session_id} - {self.chatbot.name}"


class Message(models.Model):
    """Message Model"""
    
    ROLE_CHOICES = [
        ('user', 'User'),
        ('assistant', 'Assistant'),
        ('system', 'System'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    conversation = models.ForeignKey(
        Conversation,
        on_delete=models.CASCADE,
        related_name='messages'
    )
    
    # Message Data
    role = models.CharField(max_length=50, choices=ROLE_CHOICES)
    content = models.TextField()
    
    # AI Response Metadata (for assistant messages)
    tokens_used = models.IntegerField(null=True, blank=True)
    response_time_ms = models.IntegerField(
        null=True,
        blank=True,
        help_text="Response time in milliseconds"
    )
    knowledge_sources = models.JSONField(
        default=list,
        blank=True,
        help_text="Which documents/chunks were used for this response"
    )
    
    # Timestamp
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'messages'
        verbose_name = 'Message'
        verbose_name_plural = 'Messages'
        ordering = ['conversation', 'created_at']
        indexes = [
            models.Index(fields=['conversation', 'created_at']),
        ]
    
    def __str__(self):
        return f"{self.role}: {self.content[:50]}..."


class Feedback(models.Model):
    """Feedback Model for message ratings"""
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    message = models.ForeignKey(
        Message,
        on_delete=models.CASCADE,
        related_name='feedback'
    )
    conversation = models.ForeignKey(
        Conversation,
        on_delete=models.CASCADE,
        related_name='feedback'
    )
    
    # Feedback Data
    rating = models.IntegerField(
        help_text="Rating from 1-5",
        choices=[(i, str(i)) for i in range(1, 6)]
    )
    comment = models.TextField(blank=True)
    
    # Timestamp
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'feedback'
        verbose_name = 'Feedback'
        verbose_name_plural = 'Feedback'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"Feedback {self.rating}/5 for message {self.message.id}"