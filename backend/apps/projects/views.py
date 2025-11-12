"""
Project Views
"""
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Project, ProjectMember
from .serializers import (
    ProjectSerializer, ProjectDetailSerializer, ProjectMemberSerializer
)


class ProjectViewSet(viewsets.ModelViewSet):
    """Project ViewSet"""
    
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]
    
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return ProjectDetailSerializer
        return ProjectSerializer
    
    def get_queryset(self):
        """Filter projects by user's organizations"""
        user = self.request.user
        return Project.objects.filter(
            organization__members__user=user
        ).distinct()
    
    def perform_create(self, serializer):
        """Set created_by to current user"""
        serializer.save(created_by=self.request.user)
    
    @action(detail=True, methods=['get'])
    def members(self, request, pk=None):
        """Get project members"""
        project = self.get_object()
        members = project.members.all()
        serializer = ProjectMemberSerializer(members, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def add_member(self, request, pk=None):
        """Add member to project"""
        project = self.get_object()
        data = request.data.copy()
        data['project'] = project.id
        serializer = ProjectMemberSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=True, methods=['delete'], url_path='members/(?P<user_id>[^/.]+)')
    def remove_member(self, request, pk=None, user_id=None):
        """Remove member from project"""
        project = self.get_object()
        try:
            member = ProjectMember.objects.get(project=project, user_id=user_id)
            member.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except ProjectMember.DoesNotExist:
            return Response(
                {'error': 'Member not found'}, 
                status=status.HTTP_404_NOT_FOUND
            )
    
    @action(detail=True, methods=['get'])
    def chatbots(self, request, pk=None):
        """Get project chatbots"""
        project = self.get_object()
        from apps.chatbots.serializers import ChatbotSerializer
        chatbots = project.chatbots.all()
        serializer = ChatbotSerializer(chatbots, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['get'])
    def knowledge_bases(self, request, pk=None):
        """Get project knowledge bases"""
        project = self.get_object()
        from apps.knowledge_base.serializers import KnowledgeBaseSerializer
        knowledge_bases = project.knowledge_bases.all()
        serializer = KnowledgeBaseSerializer(knowledge_bases, many=True)
        return Response(serializer.data)