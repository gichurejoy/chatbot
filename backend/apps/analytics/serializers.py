"""
Analytics Serializers
"""
from rest_framework import serializers
from .models import AnalyticsEvent


class AnalyticsEventSerializer(serializers.ModelSerializer):
    """Analytics Event Serializer"""
    
    chatbot_name = serializers.CharField(source='chatbot.name', read_only=True)
    
    class Meta:
        model = AnalyticsEvent
        fields = [
            'id', 'chatbot', 'chatbot_name', 'conversation',
            'event_type', 'event_data', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']


class AnalyticsOverviewSerializer(serializers.Serializer):
    """Analytics Overview Serializer"""
    
    total_conversations = serializers.IntegerField()
    total_messages = serializers.IntegerField()
    average_response_time = serializers.FloatField()
    average_rating = serializers.FloatField()
    active_chatbots = serializers.IntegerField()