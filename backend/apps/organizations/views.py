"""
Organization Views
"""
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Organization, OrganizationMember
from .serializers import (
    OrganizationSerializer, OrganizationDetailSerializer, 
    OrganizationMemberSerializer
)


class OrganizationViewSet(viewsets.ModelViewSet):
    """Organization ViewSet"""
    
    queryset = Organization.objects.all()
    serializer_class = OrganizationSerializer
    permission_classes = [IsAuthenticated]
    
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return OrganizationDetailSerializer
        return OrganizationSerializer
    
    def get_queryset(self):
        """Filter organizations by user membership"""
        user = self.request.user
        return Organization.objects.filter(members__user=user).distinct()
    
    @action(detail=True, methods=['get'])
    def members(self, request, pk=None):
        """Get organization members"""
        organization = self.get_object()
        members = organization.members.all()
        serializer = OrganizationMemberSerializer(members, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def add_member(self, request, pk=None):
        """Add member to organization"""
        organization = self.get_object()
        data = request.data.copy()
        data['organization'] = organization.id
        serializer = OrganizationMemberSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=True, methods=['delete'], url_path='members/(?P<user_id>[^/.]+)')
    def remove_member(self, request, pk=None, user_id=None):
        """Remove member from organization"""
        organization = self.get_object()
        try:
            member = OrganizationMember.objects.get(organization=organization, user_id=user_id)
            member.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except OrganizationMember.DoesNotExist:
            return Response(
                {'error': 'Member not found'}, 
                status=status.HTTP_404_NOT_FOUND
            )


class OrganizationMemberViewSet(viewsets.ModelViewSet):
    """Organization Member ViewSet"""
    
    queryset = OrganizationMember.objects.all()
    serializer_class = OrganizationMemberSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        """Filter members by user's organizations"""
        user = self.request.user
        return OrganizationMember.objects.filter(
            organization__members__user=user
        ).distinct()