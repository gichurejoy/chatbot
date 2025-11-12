"""
Analytics Views
"""
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.models import Avg, Count
from .models import AnalyticsEvent
from .serializers import AnalyticsEventSerializer, AnalyticsOverviewSerializer
from apps.conversations.models import Conversation, Message
from apps.conversations.models import Feedback
from apps.chatbots.models import Chatbot


class AnalyticsViewSet(viewsets.ReadOnlyModelViewSet):
    """Analytics ViewSet"""
    
    queryset = AnalyticsEvent.objects.all()
    serializer_class = AnalyticsEventSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        """Filter events by user's chatbots"""
        user = self.request.user
        return AnalyticsEvent.objects.filter(
            chatbot__project__organization__members__user=user
        ).distinct()
    
    @action(detail=False, methods=['get'])
    def overview(self, request):
        """Get analytics overview"""
        user = request.user
        
        # Get conversations count
        total_conversations = Conversation.objects.filter(
            chatbot__project__organization__members__user=user
        ).count()
        
        # Get messages count
        total_messages = Message.objects.filter(
            conversation__chatbot__project__organization__members__user=user
        ).count()
        
        # Get average response time
        avg_response_time = Message.objects.filter(
            conversation__chatbot__project__organization__members__user=user,
            role='assistant'
        ).aggregate(avg=Avg('response_time_ms'))['avg'] or 0
        
        # Get average rating
        avg_rating = Feedback.objects.filter(
            conversation__chatbot__project__organization__members__user=user
        ).aggregate(avg=Avg('rating'))['avg'] or 0
        
        # Get active chatbots count
        active_chatbots = Chatbot.objects.filter(
            project__organization__members__user=user,
            status='active'
        ).count()
        
        data = {
            'total_conversations': total_conversations,
            'total_messages': total_messages,
            'average_response_time': round(avg_response_time, 2),
            'average_rating': round(avg_rating, 2),
            'active_chatbots': active_chatbots,
        }
        
        serializer = AnalyticsOverviewSerializer(data)
        return Response(serializer.data)