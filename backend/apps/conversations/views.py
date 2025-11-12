"""
Conversation Views
"""
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Conversation, Message, Feedback
from .serializers import (
    ConversationSerializer, ConversationDetailSerializer,
    MessageSerializer, FeedbackSerializer
)


class ConversationViewSet(viewsets.ModelViewSet):
    """Conversation ViewSet"""
    
    queryset = Conversation.objects.all()
    serializer_class = ConversationSerializer
    permission_classes = [IsAuthenticated]
    
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return ConversationDetailSerializer
        return ConversationSerializer
    
    def get_queryset(self):
        """Filter conversations by user's chatbots"""
        user = self.request.user
        return Conversation.objects.filter(
            chatbot__project__organization__members__user=user
        ).distinct()


class MessageViewSet(viewsets.ReadOnlyModelViewSet):
    """Message ViewSet (Read-only)"""
    
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        """Filter messages by user's chatbots"""
        user = self.request.user
        return Message.objects.filter(
            conversation__chatbot__project__organization__members__user=user
        ).distinct()


class FeedbackViewSet(viewsets.ModelViewSet):
    """Feedback ViewSet"""
    
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        """Filter feedback by user's chatbots"""
        user = self.request.user
        return Feedback.objects.filter(
            conversation__chatbot__project__organization__members__user=user
        ).distinct()