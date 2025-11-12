"""
Chatbot Views
"""
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Chatbot, ChatbotKnowledgeBase
from .serializers import (
    ChatbotSerializer, ChatbotDetailSerializer,
    ChatbotKnowledgeBaseSerializer, ChatMessageSerializer
)


class ChatbotViewSet(viewsets.ModelViewSet):
    """Chatbot ViewSet"""
    
    queryset = Chatbot.objects.all()
    serializer_class = ChatbotSerializer
    permission_classes = [IsAuthenticated]
    
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return ChatbotDetailSerializer
        return ChatbotSerializer
    
    def get_queryset(self):
        """Filter chatbots by user's projects"""
        user = self.request.user
        return Chatbot.objects.filter(
            project__organization__members__user=user
        ).distinct()
    
    def perform_create(self, serializer):
        """Set created_by to current user"""
        serializer.save(created_by=self.request.user)
    
    @action(detail=True, methods=['post'], permission_classes=[AllowAny])
    def chat(self, request, pk=None):
        """Send message to chatbot (for testing - AI integration comes later)"""
        chatbot = self.get_object()
        serializer = ChatMessageSerializer(data=request.data)
        
        if serializer.is_valid():
            message = serializer.validated_data['message']
            
            # For now, return a simple response
            # We'll integrate OpenAI/Anthropic later
            response = {
                'chatbot_id': str(chatbot.id),
                'chatbot_name': chatbot.name,
                'message': message,
                'response': f"Hello! I'm {chatbot.name}. AI integration coming soon. You said: {message}",
                'status': 'success'
            }
            return Response(response)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=True, methods=['get'])
    def conversations(self, request, pk=None):
        """Get chatbot conversations"""
        chatbot = self.get_object()
        from apps.conversations.serializers import ConversationSerializer
        conversations = chatbot.conversations.all()[:20]
        serializer = ConversationSerializer(conversations, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['get'])
    def knowledge_bases(self, request, pk=None):
        """Get linked knowledge bases"""
        chatbot = self.get_object()
        links = chatbot.knowledge_base_links.all()
        serializer = ChatbotKnowledgeBaseSerializer(links, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def link_knowledge_base(self, request, pk=None):
        """Link knowledge base to chatbot"""
        chatbot = self.get_object()
        data = request.data.copy()
        data['chatbot'] = chatbot.id
        serializer = ChatbotKnowledgeBaseSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=True, methods=['delete'], url_path='knowledge-bases/(?P<kb_id>[^/.]+)')
    def unlink_knowledge_base(self, request, pk=None, kb_id=None):
        """Unlink knowledge base from chatbot"""
        chatbot = self.get_object()
        try:
            link = ChatbotKnowledgeBase.objects.get(chatbot=chatbot, knowledge_base_id=kb_id)
            link.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except ChatbotKnowledgeBase.DoesNotExist:
            return Response(
                {'error': 'Link not found'}, 
                status=status.HTTP_404_NOT_FOUND
            )