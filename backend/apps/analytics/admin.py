"""
Admin configuration for Analytics models
"""
from django.contrib import admin
from .models import AnalyticsEvent


@admin.register(AnalyticsEvent)
class AnalyticsEventAdmin(admin.ModelAdmin):
    list_display = ['event_type', 'chatbot', 'conversation', 'created_at']
    list_filter = ['event_type', 'created_at']
    search_fields = ['chatbot__name', 'conversation__session_id']
    readonly_fields = ['created_at']