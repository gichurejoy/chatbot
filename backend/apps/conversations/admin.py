"""
Admin configuration for Conversation models
"""
from django.contrib import admin
from .models import Conversation, Message, Feedback


@admin.register(Conversation)
class ConversationAdmin(admin.ModelAdmin):
    list_display = ['session_id', 'chatbot', 'user_identifier', 'started_at', 'ended_at']
    list_filter = ['started_at', 'ended_at']
    search_fields = ['session_id', 'user_identifier', 'chatbot__name']


@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ['conversation', 'role', 'content_preview', 'tokens_used', 'created_at']
    list_filter = ['role', 'created_at']
    search_fields = ['content', 'conversation__session_id']
    
    def content_preview(self, obj):
        return obj.content[:100] + '...' if len(obj.content) > 100 else obj.content
    content_preview.short_description = 'Content'


@admin.register(Feedback)
class FeedbackAdmin(admin.ModelAdmin):
    list_display = ['message', 'rating', 'created_at']
    list_filter = ['rating', 'created_at']
    search_fields = ['comment', 'message__content']