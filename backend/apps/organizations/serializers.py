"""
Organization Serializers
"""
from rest_framework import serializers
from .models import Organization, OrganizationMember
from apps.authentication.serializers import UserSerializer


class OrganizationSerializer(serializers.ModelSerializer):
    """Organization Serializer"""
    
    members_count = serializers.SerializerMethodField()
    projects_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Organization
        fields = [
            'id', 'name', 'slug', 'logo_url', 'plan',
            'members_count', 'projects_count',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']
    
    def get_members_count(self, obj):
        return obj.members.count()
    
    def get_projects_count(self, obj):
        return obj.projects.count()


class OrganizationMemberSerializer(serializers.ModelSerializer):
    """Organization Member Serializer"""
    
    user = UserSerializer(read_only=True)
    user_id = serializers.UUIDField(write_only=True)
    organization_name = serializers.CharField(source='organization.name', read_only=True)
    
    class Meta:
        model = OrganizationMember
        fields = [
            'id', 'organization', 'organization_name', 
            'user', 'user_id', 'role', 'joined_at'
        ]
        read_only_fields = ['id', 'joined_at']


class OrganizationDetailSerializer(OrganizationSerializer):
    """Organization Detail Serializer with members"""
    
    members = OrganizationMemberSerializer(many=True, read_only=True)
    
    class Meta(OrganizationSerializer.Meta):
        fields = OrganizationSerializer.Meta.fields + ['members']