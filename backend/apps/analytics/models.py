"""
Analytics Event Model
"""
from django.db import models
import uuid


class AnalyticsEvent(models.Model):
    """Analytics Event Model for tracking chatbot usage and events"""
    
    EVENT_TYPE_CHOICES = [
        ('message_sent', 'Message Sent'),
        ('message_received', 'Message Received'),
        ('feedback_given', 'Feedback Given'),
        ('error_occurred', 'Error Occurred'),
        ('conversation_started', 'Conversation Started'),
        ('conversation_ended', 'Conversation Ended'),
        ('document_uploaded', 'Document Uploaded'),
        ('document_processed', 'Document Processed'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    chatbot = models.ForeignKey(
        'chatbots.Chatbot',
        on_delete=models.CASCADE,
        related_name='analytics_events',
        null=True,
        blank=True
    )
    conversation = models.ForeignKey(
        'conversations.Conversation',
        on_delete=models.CASCADE,
        related_name='analytics_events',
        null=True,
        blank=True
    )
    
    # Event Data
    event_type = models.CharField(max_length=100, choices=EVENT_TYPE_CHOICES)
    event_data = models.JSONField(
        default=dict,
        blank=True,
        help_text="Additional event data"
    )
    
    # Timestamp
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'analytics_events'
        verbose_name = 'Analytics Event'
        verbose_name_plural = 'Analytics Events'
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['chatbot', '-created_at']),
            models.Index(fields=['event_type', '-created_at']),
        ]
    
    def __str__(self):
        return f"{self.event_type} - {self.created_at}"