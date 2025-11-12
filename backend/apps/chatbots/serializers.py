"""
Chatbot Serializers
"""
from rest_framework import serializers
from .models import Chatbot, ChatbotKnowledgeBase


class ChatbotSerializer(serializers.ModelSerializer):
    """Chatbot Serializer"""
    
    project_name = serializers.CharField(source='project.name', read_only=True)
    created_by_email = serializers.EmailField(source='created_by.email', read_only=True)
    conversations_count = serializers.SerializerMethodField()
    knowledge_bases_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Chatbot
        fields = [
            'id', 'project', 'project_name', 'name', 'description', 'type', 'status',
            'ai_model', 'temperature', 'max_tokens', 'system_prompt',
            'avatar_url', 'primary_color',
            'created_by', 'created_by_email', 'conversations_count', 'knowledge_bases_count',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_by', 'created_at', 'updated_at']
    
    def get_conversations_count(self, obj):
        return obj.conversations.count()
    
    def get_knowledge_bases_count(self, obj):
        return obj.knowledge_base_links.count()


class ChatbotKnowledgeBaseSerializer(serializers.ModelSerializer):
    """Chatbot Knowledge Base Link Serializer"""
    
    chatbot_name = serializers.CharField(source='chatbot.name', read_only=True)
    knowledge_base_name = serializers.CharField(source='knowledge_base.name', read_only=True)
    
    class Meta:
        model = ChatbotKnowledgeBase
        fields = [
            'id', 'chatbot', 'chatbot_name',
            'knowledge_base', 'knowledge_base_name',
            'priority', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']


class ChatbotDetailSerializer(ChatbotSerializer):
    """Chatbot Detail Serializer with linked knowledge bases"""
    
    knowledge_base_links = ChatbotKnowledgeBaseSerializer(many=True, read_only=True)
    
    class Meta(ChatbotSerializer.Meta):
        fields = ChatbotSerializer.Meta.fields + ['knowledge_base_links']


class ChatMessageSerializer(serializers.Serializer):
    """Serializer for chat messages"""
    
    message = serializers.CharField(required=True)
    session_id = serializers.CharField(required=False)
    user_identifier = serializers.CharField(required=False)