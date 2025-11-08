"""
Script to create sample data for testing
Run with: python manage.py shell < create_sample_data.py
"""
from apps.authentication.models import User
from apps.organizations.models import Organization, OrganizationMember
from apps.projects.models import Project, ProjectMember
from apps.chatbots.models import Chatbot
from apps.knowledge_base.models import KnowledgeBase
from django.utils.text import slugify

print("Creating sample data...")

# Create or get user
user, created = User.objects.get_or_create(
    email='admin@example.com',
    defaults={
        'first_name': 'Admin',
        'last_name': 'User',
        'is_staff': True,
        'is_superuser': True,
    }
)
if created:
    user.set_password('admin123')
    user.save()
    print(f"✓ Created user: {user.email}")
else:
    print(f"✓ User already exists: {user.email}")

# Create organization
org, created = Organization.objects.get_or_create(
    slug='acme-inc',
    defaults={
        'name': 'Acme Inc.',
        'plan': 'pro',
    }
)
if created:
    print(f"✓ Created organization: {org.name}")
else:
    print(f"✓ Organization already exists: {org.name}")

# Add user as organization owner
org_member, created = OrganizationMember.objects.get_or_create(
    organization=org,
    user=user,
    defaults={'role': 'owner'}
)
if created:
    print(f"✓ Added {user.email} as organization owner")

# Create E-commerce Assistant project
ecommerce_project, created = Project.objects.get_or_create(
    organization=org,
    name='E-commerce Assistant',
    defaults={
        'description': 'AI-powered chatbot for e-commerce customer support and product recommendations',
        'status': 'active',
        'created_by': user,
    }
)
if created:
    print(f"✓ Created project: {ecommerce_project.name}")

# Add user as project member
ProjectMember.objects.get_or_create(
    project=ecommerce_project,
    user=user,
    defaults={'role': 'owner'}
)

# Create Customer Support chatbot
support_bot, created = Chatbot.objects.get_or_create(
    project=ecommerce_project,
    name='Customer Support Assistant',
    defaults={
        'description': 'Handles common customer inquiries and support tickets',
        'type': 'customer_support',
        'status': 'active',
        'ai_model': 'gpt-3.5-turbo',
        'temperature': 0.7,
        'max_tokens': 1000,
        'system_prompt': 'You are a helpful customer support assistant. Be polite, professional, and provide accurate information.',
        'primary_color': '#3B82F6',
        'created_by': user,
    }
)
if created:
    print(f"✓ Created chatbot: {support_bot.name}")

# Create Sales Bot
sales_bot, created = Chatbot.objects.get_or_create(
    project=ecommerce_project,
    name='Sales Bot',
    defaults={
        'description': 'Qualifies leads and assists with product recommendations',
        'type': 'sales',
        'status': 'active',
        'ai_model': 'gpt-4',
        'temperature': 0.8,
        'max_tokens': 1500,
        'system_prompt': 'You are a friendly sales assistant. Help customers find the right products and answer questions about features and pricing.',
        'primary_color': '#10B981',
        'created_by': user,
    }
)
if created:
    print(f"✓ Created chatbot: {sales_bot.name}")

# Create Product Catalog knowledge base
catalog_kb, created = KnowledgeBase.objects.get_or_create(
    project=ecommerce_project,
    name='Product Catalog',
    defaults={
        'description': 'Complete product catalog with specifications and pricing',
        'type': 'catalog',
        'chunk_size': 512,
        'enable_ocr': True,
        'auto_process': True,
        'access_level': 'project',
        'created_by': user,
    }
)
if created:
    print(f"✓ Created knowledge base: {catalog_kb.name}")

# Create FAQ knowledge base
faq_kb, created = KnowledgeBase.objects.get_or_create(
    project=ecommerce_project,
    name='FAQ Database',
    defaults={
        'description': 'Frequently asked questions and answers',
        'type': 'faq',
        'chunk_size': 256,
        'enable_ocr': False,
        'auto_process': True,
        'access_level': 'public',
        'created_by': user,
    }
)
if created:
    print(f"✓ Created knowledge base: {faq_kb.name}")

# Create another project - Technical Support
tech_project, created = Project.objects.get_or_create(
    organization=org,
    name='Technical Support',
    defaults={
        'description': 'Product troubleshooting and technical assistance chatbot',
        'status': 'active',
        'created_by': user,
    }
)
if created:
    print(f"✓ Created project: {tech_project.name}")

ProjectMember.objects.get_or_create(
    project=tech_project,
    user=user,
    defaults={'role': 'owner'}
)

# Create Technical Support chatbot
tech_bot, created = Chatbot.objects.get_or_create(
    project=tech_project,
    name='Product Guide',
    defaults={
        'description': 'Provides detailed product information and troubleshooting',
        'type': 'technical',
        'status': 'active',
        'ai_model': 'claude-3-sonnet',
        'temperature': 0.5,
        'max_tokens': 2000,
        'system_prompt': 'You are a technical support specialist. Provide detailed, accurate technical information and step-by-step troubleshooting guidance.',
        'primary_color': '#8B5CF6',
        'created_by': user,
    }
)
if created:
    print(f"✓ Created chatbot: {tech_bot.name}")

print("\n✅ Sample data created successfully!")
print(f"\nYou can now login with:")
print(f"Email: admin@example.com")
print(f"Password: admin123")