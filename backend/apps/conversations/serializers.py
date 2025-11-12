"""
Conversation Serializers
"""
from rest_framework import serializers
from .models import Conversation, Message, Feedback


class MessageSerializer(serializers.ModelSerializer):
    """Message Serializer"""
    
    class Meta:
        model = Message
        fields = [
            'id', 'conversation', 'role', 'content',
            'tokens_used', 'response_time_ms', 'knowledge_sources',
            'created_at'
        ]
        read_only_fields = ['id', 'created_at']


class ConversationSerializer(serializers.ModelSerializer):
    """Conversation Serializer"""
    
    chatbot_name = serializers.CharField(source='chatbot.name', read_only=True)
    messages_count = serializers.SerializerMethodField()
    last_message = serializers.SerializerMethodField()
    
    class Meta:
        model = Conversation
        fields = [
            'id', 'chatbot', 'chatbot_name', 'user_identifier', 'session_id',
            'started_at', 'ended_at', 'user_agent', 'ip_address', 'metadata',
            'messages_count', 'last_message'
        ]
        read_only_fields = ['id', 'started_at']
    
    def get_messages_count(self, obj):
        return obj.messages.count()
    
    def get_last_message(self, obj):
        last_msg = obj.messages.order_by('-created_at').first()
        if last_msg:
            return {
                'role': last_msg.role,
                'content': last_msg.content[:100],
                'created_at': last_msg.created_at
            }
        return None


class ConversationDetailSerializer(ConversationSerializer):
    """Conversation Detail Serializer with all messages"""
    
    messages = MessageSerializer(many=True, read_only=True)
    
    class Meta(ConversationSerializer.Meta):
        fields = ConversationSerializer.Meta.fields + ['messages']


class FeedbackSerializer(serializers.ModelSerializer):
    """Feedback Serializer"""
    
    message_content = serializers.CharField(source='message.content', read_only=True)
    
    class Meta:
        model = Feedback
        fields = [
            'id', 'message', 'message_content', 'conversation', 'rating', 'comment', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']
        