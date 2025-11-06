"""
Admin configuration for Chatbot models
"""
from django.contrib import admin
from .models import Chatbot, ChatbotKnowledgeBase


@admin.register(Chatbot)
class ChatbotAdmin(admin.ModelAdmin):
    list_display = ['name', 'project', 'type', 'status', 'ai_model', 'created_at']
    list_filter = ['status', 'type', 'ai_model', 'created_at']
    search_fields = ['name', 'project__name']
    fieldsets = (
        ('Basic Information', {
            'fields': ('project', 'name', 'description', 'type', 'status')
        }),
        ('AI Configuration', {
            'fields': ('ai_model', 'temperature', 'max_tokens', 'system_prompt')
        }),
        ('Appearance', {
            'fields': ('avatar_url', 'primary_color')
        }),
        ('Metadata', {
            'fields': ('created_by',)
        }),
    )


@admin.register(ChatbotKnowledgeBase)
class ChatbotKnowledgeBaseAdmin(admin.ModelAdmin):
    list_display = ['chatbot', 'knowledge_base', 'priority', 'created_at']
    list_filter = ['priority', 'created_at']
    search_fields = ['chatbot__name', 'knowledge_base__name']