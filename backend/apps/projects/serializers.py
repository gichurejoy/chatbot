"""
Project Serializers
"""
from rest_framework import serializers
from .models import Project, ProjectMember
from apps.authentication.serializers import UserSerializer


class ProjectSerializer(serializers.ModelSerializer):
    """Project Serializer"""
    
    organization_name = serializers.CharField(source='organization.name', read_only=True)
    created_by_email = serializers.EmailField(source='created_by.email', read_only=True)
    members_count = serializers.SerializerMethodField()
    chatbots_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Project
        fields = [
            'id', 'organization', 'organization_name', 'name', 'description', 'status',
            'created_by', 'created_by_email', 'members_count', 'chatbots_count',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_by', 'created_at', 'updated_at']
    
    def get_members_count(self, obj):
        return obj.members.count()
    
    def get_chatbots_count(self, obj):
        return obj.chatbots.count()


class ProjectMemberSerializer(serializers.ModelSerializer):
    """Project Member Serializer"""
    
    user = UserSerializer(read_only=True)
    user_id = serializers.UUIDField(write_only=True)
    project_name = serializers.CharField(source='project.name', read_only=True)
    
    class Meta:
        model = ProjectMember
        fields = [
            'id', 'project', 'project_name',
            'user', 'user_id', 'role', 'joined_at'
        ]
        read_only_fields = ['id', 'joined_at']


class ProjectDetailSerializer(ProjectSerializer):
    """Project Detail Serializer with members"""
    
    members = ProjectMemberSerializer(many=True, read_only=True)
    
    class Meta(ProjectSerializer.Meta):
        fields = ProjectSerializer.Meta.fields + ['members']