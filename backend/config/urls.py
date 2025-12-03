"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
"""
URL Configuration
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter, SimpleRouter
from apps.authentication.views import AuthViewSet
from apps.organizations.views import OrganizationViewSet, OrganizationMemberViewSet
from apps.projects.views import ProjectViewSet
from apps.chatbots.views import ChatbotViewSet
from apps.knowledge_base.views import KnowledgeBaseViewSet, DocumentViewSet
from apps.conversations.views import ConversationViewSet, MessageViewSet, FeedbackViewSet
from apps.analytics.views import AnalyticsViewSet

# Create router
router = DefaultRouter()

# Register viewsets
router.register(r'auth', AuthViewSet, basename='auth')   
router.register(r'organizations', OrganizationViewSet, basename='organization')
router.register(r'organization-members', OrganizationMemberViewSet, basename='organization-member')
router.register(r'projects', ProjectViewSet, basename='project')
router.register(r'chatbots', ChatbotViewSet, basename='chatbot')
router.register(r'knowledge-bases', KnowledgeBaseViewSet, basename='knowledge-base')
router.register(r'documents', DocumentViewSet, basename='document')
router.register(r'conversations', ConversationViewSet, basename='conversation')
router.register(r'messages', MessageViewSet, basename='message')
router.register(r'feedback', FeedbackViewSet, basename='feedback')
router.register(r'analytics', AnalyticsViewSet, basename='analytics')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include(router.urls)),
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)