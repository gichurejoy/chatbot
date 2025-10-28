import React, { useState, memo, Component } from 'react';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { SearchIcon, BookOpenIcon, CodeIcon, RocketIcon, SettingsIcon, MessageSquareIcon, DatabaseIcon, BarChart3Icon, ChevronRightIcon, ExternalLinkIcon, ClipboardIcon, ArrowLeftIcon, ThumbsUpIcon, ThumbsDownIcon } from 'lucide-react';
interface Article {
  title: string;
  description: string;
  badge?: string;
  content?: string;
  category: string;
}
export function Documentation() {
  const [selectedCategory, setSelectedCategory] = useState('getting-started');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [helpful, setHelpful] = useState<boolean | null>(null);
  const categories = [{
    id: 'getting-started',
    name: 'Getting Started',
    icon: RocketIcon,
    articles: [{
      title: 'Quick Start Guide',
      description: 'Get up and running in 5 minutes',
      badge: 'Popular',
      category: 'Getting Started',
      content: `
# Quick Start Guide
Welcome to ChatBot Hub! This guide will help you get started in just 5 minutes.
## Step 1: Create Your Account
If you haven't already, sign up for a ChatBot Hub account. You'll receive a confirmation email to verify your account.
## Step 2: Create Your First Project
1. Click on "Projects" in the sidebar
2. Click the "New Project" button
3. Enter a name and description for your project
4. Click "Create Project"
## Step 3: Create Your First Chatbot
1. Navigate to "Chatbots" in the sidebar
2. Click "New Chatbot"
3. Choose a template or start from scratch
4. Configure your chatbot's name and settings
5. Click "Create Chatbot"
## Step 4: Add Knowledge
1. Go to "Knowledge Base"
2. Upload documents (PDF, DOCX, TXT, CSV)
3. Wait for processing to complete
4. Your chatbot will automatically learn from the content
## Step 5: Test Your Chatbot
1. Click on your chatbot
2. Click "Test Chat"
3. Try asking questions to see how it responds
4. Refine your knowledge base as needed
## Step 6: Deploy
1. Go to your chatbot settings
2. Click "Deploy"
3. Copy the embed code
4. Add it to your website
Congratulations! You're now ready to use ChatBot Hub.
          `
    }, {
      title: 'Creating Your First Chatbot',
      description: 'Step-by-step tutorial for beginners',
      badge: 'New',
      category: 'Getting Started',
      content: `
# Creating Your First Chatbot
This comprehensive tutorial will walk you through creating your first chatbot from scratch.
## Prerequisites
- An active ChatBot Hub account
- Basic understanding of your use case
## Step-by-Step Guide
### 1. Choose Your Chatbot Type
ChatBot Hub offers several chatbot types:
- **Customer Support**: Handle customer inquiries and support tickets
- **Sales Assistant**: Help customers make purchasing decisions
- **FAQ Bot**: Answer frequently asked questions
- **General Purpose**: Flexible chatbot for various use cases
### 2. Configure Basic Settings
- **Name**: Choose a descriptive name
- **Description**: Explain what your chatbot does
- **Language**: Select primary language
- **Tone**: Professional, Friendly, or Casual
### 3. Add Initial Knowledge
Start with your most important content:
- Product documentation
- FAQs
- Company policies
- Common customer questions
### 4. Customize Appearance
- Choose colors that match your brand
- Select chat bubble style
- Configure widget position
- Add your logo
### 5. Test Thoroughly
Before deploying:
- Test with sample questions
- Check response accuracy
- Verify tone and style
- Test edge cases
### 6. Deploy and Monitor
Once satisfied:
- Generate embed code
- Add to your website
- Monitor initial conversations
- Refine based on feedback
## Best Practices
- Start simple and iterate
- Use clear, concise language
- Regularly update your knowledge base
- Monitor analytics for improvements
## Next Steps
- Learn about training your chatbot
- Explore advanced features
- Set up integrations
          `
    }, {
      title: 'Understanding Projects',
      description: 'Learn how to organize your work',
      category: 'Getting Started',
      content: `
# Understanding Projects
Projects help you organize your chatbots, knowledge bases, and team members.
## What are Projects?
Projects are containers that group related chatbots, knowledge bases, and resources together. They help you:
- Organize work by client, department, or use case
- Manage team access and permissions
- Track analytics separately
- Maintain separate billing
## Creating a Project
1. Navigate to Projects
2. Click "New Project"
3. Enter project details:
   - Name
   - Description
   - Team members
   - Settings
## Project Structure
Each project can contain:
- Multiple chatbots
- Multiple knowledge bases
- Team members with different roles
- Custom settings and configurations
## Best Practices
- Create separate projects for different clients
- Use descriptive names
- Document project purposes
- Set up proper access controls
## Managing Projects
- Add/remove team members
- Configure project settings
- Monitor project analytics
- Archive completed projects
          `
    }, {
      title: 'Basic Configuration',
      description: 'Essential settings for your chatbot',
      category: 'Getting Started',
      content: `
# Basic Configuration
Learn how to configure essential settings for your chatbot.
## General Settings
- **Name**: Display name for your chatbot
- **Description**: Internal description
- **Status**: Active, Inactive, or Testing
- **Visibility**: Public or Private
## Behavior Settings
- **Response Time**: Average delay before responding
- **Greeting Message**: First message users see
- **Fallback Response**: Message when chatbot doesn't understand
- **Context Memory**: How much conversation history to remember
## Appearance Settings
- **Primary Color**: Main brand color
- **Secondary Color**: Accent color
- **Font Family**: Typography choice
- **Chat Bubble Style**: Rounded, Square, or Modern
- **Widget Position**: Corner placement
## Advanced Settings
- **Language Detection**: Automatic language switching
- **Sentiment Analysis**: Detect user emotions
- **Escalation Rules**: When to transfer to human
- **Operating Hours**: When chatbot is active
## Security Settings
- **Access Control**: Who can use the chatbot
- **Rate Limiting**: Prevent abuse
- **Data Retention**: How long to keep conversations
- **Encryption**: Data security settings
          `
    }]
  }, {
    id: 'chatbots',
    name: 'Chatbots',
    icon: MessageSquareIcon,
    articles: [{
      title: 'Chatbot Types',
      description: 'Understanding different chatbot types',
      category: 'Chatbots',
      content: `
# Chatbot Types
ChatBot Hub supports various chatbot types, each optimized for specific use cases.
## Customer Support Chatbot
Perfect for handling customer inquiries and support tickets.
**Features:**
- Ticket creation and tracking
- FAQ handling
- Issue escalation
- Multi-language support
**Best For:**
- E-commerce businesses
- SaaS companies
- Service providers
## Sales Assistant Chatbot
Helps customers make purchasing decisions.
**Features:**
- Product recommendations
- Price comparisons
- Cart management
- Lead qualification
**Best For:**
- Online stores
- B2B sales teams
- Real estate
## FAQ Bot
Answers frequently asked questions efficiently.
**Features:**
- Quick answers
- Category-based navigation
- Search functionality
- Related questions
**Best For:**
- Documentation sites
- Corporate websites
- Educational institutions
## General Purpose Chatbot
Flexible chatbot for various use cases.
**Features:**
- Customizable responses
- Multiple intents
- Context awareness
- Integration capabilities
**Best For:**
- Custom applications
- Specific workflows
- Unique requirements
          `
    }, {
      title: 'Training Your Chatbot',
      description: 'Best practices for AI training',
      badge: 'Popular',
      category: 'Chatbots',
      content: `
# Training Your Chatbot
Effective training is key to creating a helpful, accurate chatbot.
## Understanding AI Training
Your chatbot learns from:
- Documents you upload
- Conversation history
- Manual training inputs
- User feedback
## Best Practices
### 1. Quality Over Quantity
- Focus on accurate, relevant content
- Remove outdated information
- Keep content well-organized
- Use clear, simple language
### 2. Diverse Examples
- Cover various phrasings
- Include edge cases
- Add context variations
- Test different scenarios
### 3. Regular Updates
- Add new content regularly
- Remove obsolete information
- Refine based on analytics
- Monitor performance metrics
### 4. Structured Content
- Use clear headings
- Break down complex topics
- Include examples
- Add definitions
## Training Methods
### Document Upload
Upload existing documentation:
- PDFs
- Word documents
- Text files
- CSV data
### Manual Training
Add specific Q&A pairs:
1. Go to Training section
2. Add question
3. Provide answer
4. Save and test
### Conversation Learning
Enable learning from conversations:
- Review chat logs
- Mark good responses
- Correct mistakes
- Approve new patterns
## Measuring Success
Track these metrics:
- Response accuracy
- User satisfaction
- Resolution rate
- Escalation frequency
          `
    }, {
      title: 'Customizing Responses',
      description: 'How to personalize chatbot replies',
      category: 'Chatbots',
      content: `
# Customizing Responses
Make your chatbot sound unique and on-brand.
## Response Tone
Choose the right tone for your audience:
- **Professional**: Formal, business-like
- **Friendly**: Warm, approachable
- **Casual**: Relaxed, conversational
- **Technical**: Precise, detailed
## Personalization Variables
Use variables to personalize responses:
- \`{name}\` - User's name
- \`{company}\` - Company name
- \`{time}\` - Current time
- \`{date}\` - Current date
## Response Templates
Create reusable templates:
1. Go to Response Templates
2. Click "New Template"
3. Add template content
4. Save and use in responses
## Conditional Responses
Set up different responses based on:
- User type (new vs returning)
- Time of day
- User location
- Previous interactions
## Rich Media
Enhance responses with:
- Images
- Videos
- Links
- Buttons
- Carousels
## A/B Testing
Test different response styles:
1. Create variations
2. Split traffic
3. Measure performance
4. Choose winner
          `
    }, {
      title: 'Testing and Debugging',
      description: 'Tools for testing your chatbot',
      category: 'Chatbots',
      content: `
# Testing and Debugging
Ensure your chatbot works perfectly before deployment.
## Testing Tools
### Test Chat Interface
Use the built-in test chat:
1. Click "Test Chat"
2. Try various questions
3. Check response accuracy
4. Note any issues
### Debug Console
View detailed information:
- Intent detection
- Confidence scores
- Context variables
- API calls
### Conversation Logs
Review past conversations:
- Filter by date
- Search by keyword
- Export for analysis
- Identify patterns
## Testing Checklist
### Basic Functionality
- [ ] Greeting message works
- [ ] Common questions answered
- [ ] Fallback responses appropriate
- [ ] Links work correctly
### Edge Cases
- [ ] Typos handled gracefully
- [ ] Multiple questions in one message
- [ ] Context switching
- [ ] Long conversations
### Performance
- [ ] Response time < 2 seconds
- [ ] No timeouts
- [ ] Handles concurrent users
- [ ] Scales appropriately
## Debugging Common Issues
### Low Confidence Scores
- Add more training examples
- Improve content quality
- Check for ambiguity
- Refine intents
### Incorrect Responses
- Review matched intent
- Check training data
- Verify context handling
- Update knowledge base
### Slow Responses
- Optimize queries
- Check API performance
- Review content size
- Consider caching
          `
    }]
  }, {
    id: 'knowledge-base',
    name: 'Knowledge Base',
    icon: DatabaseIcon,
    articles: [{
      title: 'Adding Documents',
      description: 'Upload and manage your content',
      category: 'Knowledge Base',
      content: `
# Adding Documents
Learn how to upload and manage documents in your knowledge base.
## Supported File Types
- PDF (.pdf)
- Word Documents (.docx, .doc)
- Text Files (.txt)
- CSV Files (.csv)
- Markdown (.md)
## Upload Methods
### Drag and Drop
1. Go to Knowledge Base
2. Drag files to upload area
3. Wait for processing
4. Review extracted content
### File Browser
1. Click "Upload Files"
2. Select files from computer
3. Click "Open"
4. Monitor upload progress
### Bulk Upload
Upload multiple files at once:
- Select multiple files
- Drag together
- Process in batch
- Review all at once
## File Processing
After upload:
1. Text extraction
2. Content indexing
3. Semantic analysis
4. Quality check
## Managing Documents
- View all documents
- Edit metadata
- Update content
- Delete outdated files
- Organize by category
## Best Practices
- Use clear file names
- Keep files under 10MB
- Update regularly
- Remove duplicates
- Organize logically
          `
    }, {
      title: 'Supported File Types',
      description: 'Compatible formats and sizes',
      category: 'Knowledge Base',
      content: `
# Supported File Types
Complete guide to file formats and requirements.
## Document Formats
### PDF Files
- Maximum size: 10MB
- Text must be selectable
- Images converted to text (OCR)
- Forms supported
### Word Documents
- .docx and .doc formats
- Maximum size: 10MB
- Formatting preserved
- Tables supported
### Text Files
- Plain text (.txt)
- Markdown (.md)
- Maximum size: 5MB
- UTF-8 encoding
### Spreadsheets
- CSV files
- Maximum size: 5MB
- First row as headers
- Multiple sheets supported
## File Size Limits
- Free Plan: 5MB per file
- Professional: 10MB per file
- Enterprise: 50MB per file
## Content Requirements
- Must be readable text
- Avoid scanned images
- Use standard fonts
- Include metadata
## Optimization Tips
- Compress large PDFs
- Remove unnecessary pages
- Use text instead of images
- Split large documents
          `
    }, {
      title: 'Data Processing',
      description: 'How we process your documents',
      category: 'Knowledge Base',
      content: `
# Data Processing
Understanding how ChatBot Hub processes your documents.
## Processing Pipeline
### 1. Upload
- File validation
- Virus scanning
- Format verification
- Size check
### 2. Text Extraction
- OCR for images
- Table parsing
- Metadata extraction
- Structure analysis
### 3. Content Analysis
- Language detection
- Topic identification
- Entity recognition
- Semantic indexing
### 4. Indexing
- Full-text search
- Vector embeddings
- Relationship mapping
- Category assignment
## Processing Time
Typical processing times:
- Small files (< 1MB): 10-30 seconds
- Medium files (1-5MB): 30-90 seconds
- Large files (5-10MB): 1-3 minutes
## Quality Assurance
We ensure:
- Accurate text extraction
- Proper formatting
- Complete content
- No data loss
## Data Security
Your data is:
- Encrypted at rest
- Encrypted in transit
- Access controlled
- Regularly backed up
## Troubleshooting
If processing fails:
- Check file format
- Verify file size
- Ensure readability
- Contact support
          `
    }, {
      title: 'Best Practices',
      description: 'Optimizing your knowledge base',
      badge: 'Popular',
      category: 'Knowledge Base',
      content: `
# Knowledge Base Best Practices
Optimize your knowledge base for best results.
## Content Organization
### Categories
Create logical categories:
- Products
- Support
- Policies
- FAQs
### Tags
Use consistent tags:
- Topic tags
- Priority tags
- Department tags
- Version tags
### Hierarchy
Structure content:
- Main topics
- Subtopics
- Related content
- Cross-references
## Content Quality
### Writing Style
- Clear and concise
- Active voice
- Simple language
- Consistent terminology
### Formatting
- Use headings
- Break into sections
- Include examples
- Add visuals
### Accuracy
- Verify information
- Update regularly
- Remove outdated content
- Review periodically
## Maintenance
### Regular Updates
- Weekly reviews
- Monthly audits
- Quarterly refreshes
- Annual overhauls
### Performance Monitoring
Track metrics:
- Search success rate
- Popular topics
- Missing content
- User feedback
### Continuous Improvement
- Analyze chat logs
- Identify gaps
- Add new content
- Refine existing content
## Common Mistakes to Avoid
- Too much information
- Outdated content
- Poor organization
- Inconsistent style
- Missing updates
          `
    }]
  }, {
    id: 'api',
    name: 'API & Integration',
    icon: CodeIcon,
    articles: [{
      title: 'API Authentication',
      description: 'Setting up API keys and tokens',
      category: 'API & Integration',
      content: `
# API Authentication
Secure your API access with proper authentication.
## API Keys
Generate and manage API keys:
1. Go to Settings > API Keys
2. Click "Generate New Key"
3. Copy and store securely
4. Use in API requests
## Authentication Methods
### Bearer Token
Include in request header:
\`\`\`
Authorization: Bearer YOUR_API_KEY
\`\`\`
### Query Parameter
Add to URL:
\`\`\`
?api_key=YOUR_API_KEY
\`\`\`
## Security Best Practices
- Never share API keys
- Rotate keys regularly
- Use environment variables
- Implement rate limiting
- Monitor usage
## Key Management
- Create separate keys for environments
- Name keys descriptively
- Track key usage
- Revoke compromised keys
- Set expiration dates
## Rate Limits
- Free: 100 requests/hour
- Professional: 1,000 requests/hour
- Enterprise: Custom limits
## Error Handling
Common authentication errors:
- 401: Invalid key
- 403: Insufficient permissions
- 429: Rate limit exceeded
          `
    }, {
      title: 'REST API Reference',
      description: 'Complete API documentation',
      badge: 'Popular',
      category: 'API & Integration',
      content: `
# REST API Reference
Complete reference for ChatBot Hub API.
## Base URL
\`\`\`
https://api.chatbothub.com/v1
\`\`\`
## Endpoints
### Chatbots
\`\`\`
GET    /chatbots           # List all chatbots
POST   /chatbots           # Create chatbot
GET    /chatbots/:id       # Get chatbot
PUT    /chatbots/:id       # Update chatbot
DELETE /chatbots/:id       # Delete chatbot
\`\`\`
### Conversations
\`\`\`
GET    /conversations      # List conversations
POST   /conversations      # Start conversation
GET    /conversations/:id  # Get conversation
POST   /conversations/:id/messages  # Send message
\`\`\`
### Knowledge Base
\`\`\`
GET    /knowledge-bases    # List knowledge bases
POST   /knowledge-bases    # Create knowledge base
POST   /knowledge-bases/:id/documents  # Upload document
\`\`\`
## Request Format
\`\`\`json
{
  "name": "My Chatbot",
  "type": "customer_support",
  "settings": {
    "language": "en",
    "tone": "professional"
  }
}
\`\`\`
## Response Format
\`\`\`json
{
  "success": true,
  "data": {
    "id": "chat_123",
    "name": "My Chatbot",
    "status": "active"
  }
}
\`\`\`
## Error Codes
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 429: Too Many Requests
- 500: Server Error
          `
    }, {
      title: 'Webhooks',
      description: 'Real-time event notifications',
      category: 'API & Integration',
      content: `
# Webhooks
Receive real-time notifications about events.
## What are Webhooks?
Webhooks send HTTP POST requests to your server when events occur.
## Setting Up Webhooks
1. Go to Settings > Webhooks
2. Click "Add Webhook"
3. Enter your endpoint URL
4. Select events to monitor
5. Save configuration
## Supported Events
- conversation.started
- conversation.ended
- message.received
- message.sent
- chatbot.updated
- knowledge_base.updated
## Webhook Payload
\`\`\`json
{
  "event": "message.received",
  "timestamp": "2023-06-15T10:30:00Z",
  "data": {
    "conversation_id": "conv_123",
    "message": "Hello",
    "user_id": "user_456"
  }
}
\`\`\`
## Security
Verify webhook signatures:
\`\`\`
X-Webhook-Signature: sha256=...
\`\`\`
## Retry Logic
- Failed webhooks retry 3 times
- Exponential backoff
- 1 minute, 5 minutes, 15 minutes
- After 3 failures, webhook disabled
## Best Practices
- Return 200 status quickly
- Process asynchronously
- Implement idempotency
- Verify signatures
- Log all events
          `
    }, {
      title: 'SDK Libraries',
      description: 'Official libraries for popular languages',
      category: 'API & Integration',
      content: `
# SDK Libraries
Official SDKs for easy integration.
## Available SDKs
### JavaScript/Node.js
\`\`\`bash
npm install @chatbothub/sdk
\`\`\`
\`\`\`javascript
const ChatBotHub = require('@chatbothub/sdk');
const client = new ChatBotHub('YOUR_API_KEY');
// Create chatbot
const chatbot = await client.chatbots.create({
  name: 'My Chatbot',
  type: 'customer_support'
});
\`\`\`
### Python
\`\`\`bash
pip install chatbothub
\`\`\`
\`\`\`python
from chatbothub import Client
client = Client('YOUR_API_KEY')
# Create chatbot
chatbot = client.chatbots.create(
    name='My Chatbot',
    type='customer_support'
)
\`\`\`
### Ruby
\`\`\`bash
gem install chatbothub
\`\`\`
\`\`\`ruby
require 'chatbothub'
client = ChatBotHub::Client.new('YOUR_API_KEY')
# Create chatbot
chatbot = client.chatbots.create(
  name: 'My Chatbot',
  type: 'customer_support'
)
\`\`\`
### PHP
\`\`\`bash
composer require chatbothub/sdk
\`\`\`
\`\`\`php
use ChatBotHub\\Client;
$client = new Client('YOUR_API_KEY');
// Create chatbot
$chatbot = $client->chatbots->create([
    'name' => 'My Chatbot',
    'type' => 'customer_support'
]);
\`\`\`
## Features
- Type-safe
- Automatic retries
- Built-in pagination
- Error handling
- Full API coverage
## Documentation
Each SDK includes:
- Installation guide
- Quick start
- API reference
- Examples
- Changelog
          `
    }]
  }, {
    id: 'technical',
    name: 'Technical Reference',
    icon: CodeIcon,
    articles: [{
      title: 'System Architecture',
      description: 'Deep dive into ChatBot Hub architecture',
      badge: 'Technical',
      category: 'Technical Reference',
      content: `
# System Architecture
## Overview
ChatBot-Stack is built on a modern, scalable microservices architecture designed for high availability and performance.
## Core Components
### Frontend Layer
- **Technology**: React 18.3.1 with TypeScript
- **State Management**: React Hooks + Context API
- **Routing**: React Router DOM v6
- **Styling**: Tailwind CSS
- **Build Tool**: Webpack 5
### API Gateway
- **Load Balancer**: Distributes traffic across service instances
- **Rate Limiting**: Per-user and per-endpoint limits
- **Authentication**: JWT-based token validation
- **Request Routing**: Routes to appropriate microservices
### Microservices
#### Chatbot Service
- Handles chatbot creation, configuration, and management
- Manages chatbot state and settings
- Processes chatbot requests and responses
#### Knowledge Base Service
- Document processing and indexing
- Text extraction and OCR
- Semantic search and retrieval
- Vector embeddings generation
#### Conversation Service
- Manages conversation sessions
- Stores conversation history
- Handles message routing
- Real-time WebSocket connections
#### Analytics Service
- Collects and aggregates metrics
- Generates reports and insights
- Processes event streams
- Provides dashboard data
#### AI/ML Service
- Natural Language Processing
- Intent classification
- Entity extraction
- Response generation
- Model training and fine-tuning
### Data Layer
#### Primary Database (PostgreSQL)
- User accounts and authentication
- Chatbot configurations
- Project and team data
- Billing information
#### Document Store (MongoDB)
- Knowledge base documents
- Conversation logs
- Unstructured data
#### Vector Database (Pinecone/Weaviate)
- Semantic embeddings
- Similarity search
- Knowledge retrieval
#### Cache Layer (Redis)
- Session management
- Frequently accessed data
- Rate limiting counters
- Real-time data
#### Message Queue (RabbitMQ/Kafka)
- Asynchronous processing
- Event streaming
- Service communication
- Webhook delivery
## Data Flow
### Chatbot Interaction Flow
1. User sends message via widget
2. API Gateway authenticates and routes request
3. Conversation Service creates/retrieves session
4. AI/ML Service processes message:
   - Intent classification
   - Entity extraction
   - Context analysis
5. Knowledge Base Service retrieves relevant information
6. AI/ML Service generates response
7. Response sent back through Conversation Service
8. Analytics Service logs interaction
### Document Processing Flow
1. User uploads document
2. File stored in object storage (S3)
3. Processing job queued
4. Knowledge Base Service:
   - Extracts text (OCR if needed)
   - Chunks content
   - Generates embeddings
   - Indexes in vector database
5. Document marked as processed
6. Notification sent to user
## Security Architecture
### Authentication & Authorization
- OAuth 2.0 / OpenID Connect
- JWT tokens with refresh mechanism
- Role-Based Access Control (RBAC)
- Multi-factor authentication support
### Data Security
- Encryption at rest (AES-256)
- Encryption in transit (TLS 1.3)
- Key management with AWS KMS
- Regular security audits
### Network Security
- VPC isolation
- Private subnets for services
- Security groups and NACLs
- DDoS protection
- Web Application Firewall (WAF)
## Scalability
### Horizontal Scaling
- Stateless microservices
- Auto-scaling based on load
- Container orchestration (Kubernetes)
- Load balancing across instances
### Vertical Scaling
- Database read replicas
- Caching strategies
- CDN for static assets
- Database connection pooling
### Performance Optimization
- Response caching
- Database query optimization
- Lazy loading
- Code splitting
- Image optimization
## Monitoring & Observability
### Metrics
- Application metrics (Prometheus)
- Infrastructure metrics (CloudWatch)
- Custom business metrics
- Real-time dashboards (Grafana)
### Logging
- Centralized logging (ELK Stack)
- Structured logging
- Log aggregation
- Search and analysis
### Tracing
- Distributed tracing (Jaeger)
- Request flow visualization
- Performance bottleneck identification
- Service dependency mapping
### Alerting
- Automated alerts
- On-call rotation
- Incident management
- Post-mortem analysis
## Deployment
### CI/CD Pipeline
1. Code commit to repository
2. Automated tests run
3. Build Docker images
4. Push to container registry
5. Deploy to staging
6. Automated integration tests
7. Manual approval
8. Deploy to production
9. Health checks
10. Rollback if needed
### Infrastructure as Code
- Terraform for infrastructure
- Kubernetes manifests
- Helm charts
- GitOps workflow
### Environments
- Development
- Staging
- Production
- Disaster Recovery
## Disaster Recovery
### Backup Strategy
- Automated daily backups
- Point-in-time recovery
- Cross-region replication
- Backup testing procedures
### High Availability
- Multi-AZ deployment
- Automatic failover
- Health checks
- Self-healing systems
### Business Continuity
- RTO: 4 hours
- RPO: 1 hour
- Disaster recovery drills
- Incident response plan
          `
    }, {
      title: 'API Authentication Deep Dive',
      description: 'Complete guide to API authentication',
      badge: 'Technical',
      category: 'Technical Reference',
      content: `
# API Authentication Deep Dive
## Authentication Methods
### 1. API Key Authentication
#### Generating API Keys
\`\`\`bash
curl -X POST https://api.chatbot-stack.com/v1/auth/api-keys \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Production API Key",
    "scopes": ["chatbots:read", "chatbots:write", "conversations:read"],
    "expires_at": "2024-12-31T23:59:59Z"
  }'
\`\`\`
#### Response
\`\`\`json
{
  "id": "key_abc123",
  "name": "Production API Key",
  "key": "cbs_live_1234567890abcdef",
  "scopes": ["chatbots:read", "chatbots:write", "conversations:read"],
  "created_at": "2023-06-15T10:00:00Z",
  "expires_at": "2024-12-31T23:59:59Z"
}
\`\`\`
#### Using API Keys
**Header Authentication (Recommended)**
\`\`\`bash
curl https://api.chatbot-stack.com/v1/chatbots \\
  -H "Authorization: Bearer cbs_live_1234567890abcdef"
\`\`\`
**Query Parameter (Not Recommended)**
\`\`\`bash
curl "https://api.chatbot-stack.com/v1/chatbots?api_key=cbs_live_1234567890abcdef"
\`\`\`
### 2. OAuth 2.0 Authentication
#### Authorization Code Flow
**Step 1: Redirect User to Authorization URL**
\`\`\`
https://chatbot-stack.com/oauth/authorize?
  client_id=YOUR_CLIENT_ID&
  redirect_uri=https://yourapp.com/callback&
  response_type=code&
  scope=chatbots:read chatbots:write&
  state=random_string_for_csrf
\`\`\`
**Step 2: Exchange Code for Token**
\`\`\`bash
curl -X POST https://api.chatbot-stack.com/v1/oauth/token \\
  -H "Content-Type: application/x-www-form-urlencoded" \\
  -d "grant_type=authorization_code" \\
  -d "code=AUTH_CODE" \\
  -d "client_id=YOUR_CLIENT_ID" \\
  -d "client_secret=YOUR_CLIENT_SECRET" \\
  -d "redirect_uri=https://yourapp.com/callback"
\`\`\`
**Step 3: Token Response**
\`\`\`json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "refresh_token": "def50200abc123...",
  "scope": "chatbots:read chatbots:write"
}
\`\`\`
#### Refreshing Access Tokens
\`\`\`bash
curl -X POST https://api.chatbot-stack.com/v1/oauth/token \\
  -H "Content-Type: application/x-www-form-urlencoded" \\
  -d "grant_type=refresh_token" \\
  -d "refresh_token=def50200abc123..." \\
  -d "client_id=YOUR_CLIENT_ID" \\
  -d "client_secret=YOUR_CLIENT_SECRET"
\`\`\`
### 3. JWT Token Structure
#### Token Anatomy
\`\`\`
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.  // Header
eyJzdWIiOiJ1c2VyXzEyMyIsImlhdCI6MTY4...  // Payload
SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_...    // Signature
\`\`\`
#### Decoded Header
\`\`\`json
{
  "alg": "RS256",
  "typ": "JWT",
  "kid": "key-id-123"
}
\`\`\`
#### Decoded Payload
\`\`\`json
{
  "sub": "user_123",
  "email": "user@example.com",
  "org_id": "org_456",
  "scopes": ["chatbots:read", "chatbots:write"],
  "iat": 1686825600,
  "exp": 1686829200,
  "iss": "https://chatbot-stack.com",
  "aud": "https://api.chatbot-stack.com"
}
\`\`\`
## Security Best Practices
### 1. Key Management
**DO:**
- Store keys in environment variables
- Use secret management services (AWS Secrets Manager, HashiCorp Vault)
- Rotate keys regularly (every 90 days)
- Use different keys for different environments
- Implement key expiration
**DON'T:**
- Commit keys to version control
- Share keys via email or chat
- Use the same key across multiple applications
- Store keys in client-side code
- Use keys without expiration
### 2. Token Security
**Access Token Best Practices:**
- Short expiration time (15-60 minutes)
- Store in memory, not localStorage
- Use httpOnly cookies when possible
- Implement token rotation
- Validate on every request
**Refresh Token Best Practices:**
- Longer expiration (days to weeks)
- Store securely (httpOnly cookie)
- One-time use (rotate on refresh)
- Revoke on logout
- Detect token reuse
### 3. Rate Limiting
**Per-User Limits:**
- Free tier: 100 requests/hour
- Professional: 1,000 requests/hour
- Enterprise: 10,000 requests/hour
**Per-Endpoint Limits:**
- Authentication: 10 requests/minute
- Chatbot creation: 5 requests/minute
- Message sending: 100 requests/minute
- Analytics: 50 requests/minute
**Rate Limit Headers:**
\`\`\`
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1686829200
\`\`\`
**Rate Limit Exceeded Response:**
\`\`\`json
{
  "error": {
    "code": "rate_limit_exceeded",
    "message": "Rate limit exceeded. Try again in 42 seconds.",
    "retry_after": 42
  }
}
\`\`\`
## Error Handling
### Authentication Errors
**401 Unauthorized - Invalid Token**
\`\`\`json
{
  "error": {
    "code": "invalid_token",
    "message": "The access token is invalid or has expired",
    "details": "Token signature verification failed"
  }
}
\`\`\`
**401 Unauthorized - Missing Token**
\`\`\`json
{
  "error": {
    "code": "missing_token",
    "message": "Authentication required. Please provide a valid access token."
  }
}
\`\`\`
**403 Forbidden - Insufficient Permissions**
\`\`\`json
{
  "error": {
    "code": "insufficient_permissions",
    "message": "You don't have permission to access this resource",
    "required_scopes": ["chatbots:write"],
    "current_scopes": ["chatbots:read"]
  }
}
\`\`\`
## Code Examples
### Node.js
\`\`\`javascript
const axios = require('axios');
const API_KEY = process.env.CHATBOT_STACK_API_KEY;
const BASE_URL = 'https://api.chatbot-stack.com/v1';
const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Authorization': \`Bearer \${API_KEY}\`,
    'Content-Type': 'application/json'
  }
});
// Add request interceptor for token refresh
client.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      // Token expired, refresh it
      const newToken = await refreshToken();
      error.config.headers['Authorization'] = \`Bearer \${newToken}\`;
      return client.request(error.config);
    }
    return Promise.reject(error);
  }
);
// Example request
async function getChatbots() {
  try {
    const response = await client.get('/chatbots');
    return response.data;
  } catch (error) {
    console.error('Error fetching chatbots:', error.response?.data);
    throw error;
  }
}
\`\`\`
### Python
\`\`\`python
import os
import requests
from requests.adapters import HTTPAdapter
from requests.packages.urllib3.util.retry import Retry
API_KEY = os.environ.get('CHATBOT_STACK_API_KEY')
BASE_URL = 'https://api.chatbot-stack.com/v1'
class ChatBotStackClient:
    def __init__(self, api_key):
        self.api_key = api_key
        self.session = self._create_session()
    def _create_session(self):
        session = requests.Session()
        retry = Retry(
            total=3,
            backoff_factor=1,
            status_forcelist=[429, 500, 502, 503, 504]
        )
        adapter = HTTPAdapter(max_retries=retry)
        session.mount('http://', adapter)
        session.mount('https://', adapter)
        session.headers.update({
            'Authorization': f'Bearer {self.api_key}',
            'Content-Type': 'application/json'
        })
        return session
    def get_chatbots(self):
        response = self.session.get(f'{BASE_URL}/chatbots')
        response.raise_for_status()
        return response.json()
    def create_chatbot(self, data):
        response = self.session.post(f'{BASE_URL}/chatbots', json=data)
        response.raise_for_status()
        return response.json()
# Usage
client = ChatBotStackClient(API_KEY)
chatbots = client.get_chatbots()
\`\`\`
### cURL Examples
**List Chatbots**
\`\`\`bash
curl -X GET https://api.chatbot-stack.com/v1/chatbots \\
  -H "Authorization: Bearer cbs_live_1234567890abcdef" \\
  -H "Content-Type: application/json"
\`\`\`
**Create Chatbot**
\`\`\`bash
curl -X POST https://api.chatbot-stack.com/v1/chatbots \\
  -H "Authorization: Bearer cbs_live_1234567890abcdef" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Customer Support Bot",
    "type": "customer_support",
    "settings": {
      "language": "en",
      "tone": "professional"
    }
  }'
\`\`\`
**Send Message**
\`\`\`bash
curl -X POST https://api.chatbot-stack.com/v1/conversations/conv_123/messages \\
  -H "Authorization: Bearer cbs_live_1234567890abcdef" \\
  -H "Content-Type: application/json" \\
  -d '{
    "message": "Hello, how can I help you?",
    "user_id": "user_456"
  }'
\`\`\`
          `
    }, {
      title: 'Complete API Reference',
      description: 'Full REST API documentation with examples',
      badge: 'Popular',
      category: 'Technical Reference',
      content: `
# Complete API Reference
## Base URL
\`\`\`
https://api.chatbot-stack.com/v1
\`\`\`
## Authentication
All API requests require authentication using Bearer token:
\`\`\`
Authorization: Bearer YOUR_API_KEY
\`\`\`
---
## Chatbots
### List Chatbots
\`\`\`
GET /chatbots
\`\`\`
**Query Parameters:**
- \`page\` (integer): Page number (default: 1)
- \`per_page\` (integer): Items per page (default: 20, max: 100)
- \`project_id\` (string): Filter by project ID
- \`type\` (string): Filter by chatbot type
- \`status\` (string): Filter by status (active, inactive, draft)
**Example Request:**
\`\`\`bash
curl -X GET "https://api.chatbot-stack.com/v1/chatbots?page=1&per_page=20" \\
  -H "Authorization: Bearer cbs_live_1234567890abcdef"
\`\`\`
**Example Response:**
\`\`\`json
{
  "data": [
    {
      "id": "chat_123",
      "name": "Customer Support Bot",
      "type": "customer_support",
      "status": "active",
      "project_id": "proj_456",
      "created_at": "2023-06-15T10:00:00Z",
      "updated_at": "2023-06-15T10:00:00Z",
      "settings": {
        "language": "en",
        "tone": "professional",
        "greeting": "Hello! How can I help you today?"
      },
      "metrics": {
        "total_conversations": 1250,
        "avg_response_time": 1.8,
        "satisfaction_score": 4.5
      }
    }
  ],
  "pagination": {
    "page": 1,
    "per_page": 20,
    "total": 45,
    "total_pages": 3
  }
}
\`\`\`
### Get Chatbot
\`\`\`
GET /chatbots/:id
\`\`\`
**Path Parameters:**
- \`id\` (required): Chatbot ID
**Example Request:**
\`\`\`bash
curl -X GET https://api.chatbot-stack.com/v1/chatbots/chat_123 \\
  -H "Authorization: Bearer cbs_live_1234567890abcdef"
\`\`\`
**Example Response:**
\`\`\`json
{
  "id": "chat_123",
  "name": "Customer Support Bot",
  "type": "customer_support",
  "status": "active",
  "project_id": "proj_456",
  "knowledge_bases": ["kb_789", "kb_012"],
  "created_at": "2023-06-15T10:00:00Z",
  "updated_at": "2023-06-15T10:00:00Z",
  "settings": {
    "language": "en",
    "tone": "professional",
    "greeting": "Hello! How can I help you today?",
    "fallback_message": "I'm sorry, I didn't understand that.",
    "max_context_length": 10,
    "temperature": 0.7,
    "confidence_threshold": 0.75
  },
  "appearance": {
    "primary_color": "#3B82F6",
    "position": "bottom-right",
    "chat_bubble_style": "rounded"
  }
}
\`\`\`
### Create Chatbot
\`\`\`
POST /chatbots
\`\`\`
**Request Body:**
\`\`\`json
{
  "name": "Customer Support Bot",
  "type": "customer_support",
  "project_id": "proj_456",
  "settings": {
    "language": "en",
    "tone": "professional",
    "greeting": "Hello! How can I help you today?"
  },
  "appearance": {
    "primary_color": "#3B82F6",
    "position": "bottom-right"
  }
}
\`\`\`
**Example Request:**
\`\`\`bash
curl -X POST https://api.chatbot-stack.com/v1/chatbots \\
  -H "Authorization: Bearer cbs_live_1234567890abcdef" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Customer Support Bot",
    "type": "customer_support",
    "project_id": "proj_456"
  }'
\`\`\`
**Example Response:**
\`\`\`json
{
  "id": "chat_123",
  "name": "Customer Support Bot",
  "type": "customer_support",
  "status": "draft",
  "project_id": "proj_456",
  "created_at": "2023-06-15T10:00:00Z",
  "updated_at": "2023-06-15T10:00:00Z"
}
\`\`\`
### Update Chatbot
\`\`\`
PUT /chatbots/:id
\`\`\`
**Path Parameters:**
- \`id\` (required): Chatbot ID
**Request Body:**
\`\`\`json
{
  "name": "Updated Bot Name",
  "status": "active",
  "settings": {
    "greeting": "Welcome! How may I assist you?"
  }
}
\`\`\`
### Delete Chatbot
\`\`\`
DELETE /chatbots/:id
\`\`\`
**Example Response:**
\`\`\`json
{
  "message": "Chatbot deleted successfully"
}
\`\`\`
---
## Conversations
### Start Conversation
\`\`\`
POST /conversations
\`\`\`
**Request Body:**
\`\`\`json
{
  "chatbot_id": "chat_123",
  "user_id": "user_456",
  "metadata": {
    "source": "website",
    "page_url": "https://example.com/support"
  }
}
\`\`\`
**Example Response:**
\`\`\`json
{
  "id": "conv_789",
  "chatbot_id": "chat_123",
  "user_id": "user_456",
  "status": "active",
  "created_at": "2023-06-15T10:30:00Z",
  "metadata": {
    "source": "website",
    "page_url": "https://example.com/support"
  }
}
\`\`\`
### Send Message
\`\`\`
POST /conversations/:id/messages
\`\`\`
**Request Body:**
\`\`\`json
{
  "message": "I need help with my order",
  "sender": "user"
}
\`\`\`
**Example Response:**
\`\`\`json
{
  "id": "msg_012",
  "conversation_id": "conv_789",
  "message": "I need help with my order",
  "sender": "user",
  "timestamp": "2023-06-15T10:31:00Z",
  "bot_response": {
    "id": "msg_013",
    "message": "I'd be happy to help you with your order. Could you please provide your order number?",
    "sender": "bot",
    "timestamp": "2023-06-15T10:31:02Z",
    "confidence": 0.95,
    "intent": "order_inquiry"
  }
}
\`\`\`
### Get Conversation
\`\`\`
GET /conversations/:id
\`\`\`
**Example Response:**
\`\`\`json
{
  "id": "conv_789",
  "chatbot_id": "chat_123",
  "user_id": "user_456",
  "status": "active",
  "created_at": "2023-06-15T10:30:00Z",
  "updated_at": "2023-06-15T10:35:00Z",
  "messages": [
    {
      "id": "msg_012",
      "message": "I need help with my order",
      "sender": "user",
      "timestamp": "2023-06-15T10:31:00Z"
    },
    {
      "id": "msg_013",
      "message": "I'd be happy to help you with your order.",
      "sender": "bot",
      "timestamp": "2023-06-15T10:31:02Z"
    }
  ],
  "metadata": {
    "total_messages": 8,
    "duration_seconds": 300,
    "satisfaction_rating": 5
  }
}
\`\`\`
### List Conversations
\`\`\`
GET /conversations
\`\`\`
**Query Parameters:**
- \`chatbot_id\` (string): Filter by chatbot
- \`user_id\` (string): Filter by user
- \`status\` (string): Filter by status
- \`from\` (datetime): Start date
- \`to\` (datetime): End date
- \`page\` (integer): Page number
- \`per_page\` (integer): Items per page
---
## Knowledge Base
### Create Knowledge Base
\`\`\`
POST /knowledge-bases
\`\`\`
**Request Body:**
\`\`\`json
{
  "name": "Product Documentation",
  "type": "documentation",
  "project_id": "proj_456",
  "description": "Complete product documentation and guides"
}
\`\`\`
### Upload Document
\`\`\`
POST /knowledge-bases/:id/documents
\`\`\`
**Request:** Multipart form data
- \`file\`: Document file (PDF, DOCX, TXT, CSV)
- \`metadata\`: JSON string with additional metadata
**Example Request:**
\`\`\`bash
curl -X POST https://api.chatbot-stack.com/v1/knowledge-bases/kb_789/documents \\
  -H "Authorization: Bearer cbs_live_1234567890abcdef" \\
  -F "file=@product-guide.pdf" \\
  -F 'metadata={"category":"guides","version":"2.0"}'
\`\`\`
**Example Response:**
\`\`\`json
{
  "id": "doc_345",
  "knowledge_base_id": "kb_789",
  "name": "product-guide.pdf",
  "type": "pdf",
  "size": 2457600,
  "status": "processing",
  "uploaded_at": "2023-06-15T11:00:00Z",
  "metadata": {
    "category": "guides",
    "version": "2.0"
  }
}
\`\`\`
### Get Document Status
\`\`\`
GET /knowledge-bases/:kb_id/documents/:doc_id
\`\`\`
**Example Response:**
\`\`\`json
{
  "id": "doc_345",
  "status": "processed",
  "processed_at": "2023-06-15T11:02:30Z",
  "chunks": 45,
  "tokens": 12500,
  "embeddings_generated": true
}
\`\`\`
---
## Analytics
### Get Metrics
\`\`\`
GET /analytics/metrics
\`\`\`
**Query Parameters:**
- \`chatbot_id\` (string): Filter by chatbot
- \`from\` (datetime): Start date
- \`to\` (datetime): End date
- \`metrics\` (array): Specific metrics to retrieve
**Example Request:**
\`\`\`bash
curl -X GET "https://api.chatbot-stack.com/v1/analytics/metrics?chatbot_id=chat_123&from=2023-06-01&to=2023-06-30" \\
  -H "Authorization: Bearer cbs_live_1234567890abcdef"
\`\`\`
**Example Response:**
\`\`\`json
{
  "chatbot_id": "chat_123",
  "period": {
    "from": "2023-06-01T00:00:00Z",
    "to": "2023-06-30T23:59:59Z"
  },
  "metrics": {
    "total_conversations": 1250,
    "total_messages": 8750,
    "avg_response_time": 1.8,
    "response_rate": 0.96,
    "satisfaction_score": 4.5,
    "resolution_rate": 0.82
  },
  "trends": {
    "conversations": [
      {"date": "2023-06-01", "count": 45},
      {"date": "2023-06-02", "count": 52}
    ]
  }
}
\`\`\`
---
## Webhooks
### Create Webhook
\`\`\`
POST /webhooks
\`\`\`
**Request Body:**
\`\`\`json
{
  "url": "https://yourapp.com/webhooks",
  "events": [
    "conversation.started",
    "conversation.ended",
    "message.received"
  ],
  "secret": "your_webhook_secret"
}
\`\`\`
### Webhook Payload Example
\`\`\`json
{
  "id": "evt_123",
  "type": "message.received",
  "timestamp": "2023-06-15T10:31:00Z",
  "data": {
    "conversation_id": "conv_789",
    "message": "I need help",
    "user_id": "user_456",
    "chatbot_id": "chat_123"
  }
}
\`\`\`
---
## Error Responses
### Standard Error Format
\`\`\`json
{
  "error": {
    "code": "invalid_request",
    "message": "The request body is invalid",
    "details": {
      "field": "name",
      "issue": "Name is required"
    }
  }
}
\`\`\`
### HTTP Status Codes
- \`200\`: Success
- \`201\`: Created
- \`204\`: No Content
- \`400\`: Bad Request
- \`401\`: Unauthorized
- \`403\`: Forbidden
- \`404\`: Not Found
- \`429\`: Too Many Requests
- \`500\`: Internal Server Error
          `
    }, {
      title: 'Webhook Integration Guide',
      description: 'Complete guide to implementing webhooks',
      badge: 'Technical',
      category: 'Technical Reference',
      content: `
# Webhook Integration Guide
## Overview
Webhooks allow your application to receive real-time notifications when events occur in ChatBot-Stack.
## How Webhooks Work
1. Event occurs in ChatBot-Stack (e.g., new message)
2. ChatBot-Stack sends HTTP POST request to your endpoint
3. Your endpoint processes the event
4. Your endpoint returns 200 status code
5. If failed, ChatBot-Stack retries with exponential backoff
## Setting Up Webhooks
### 1. Create Endpoint
Create an HTTPS endpoint that can receive POST requests:
**Node.js/Express Example:**
\`\`\`javascript
const express = require('express');
const crypto = require('crypto');
const app = express();
app.use(express.json());
app.post('/webhooks/chatbot-stack', (req, res) => {
  // Verify signature
  const signature = req.headers['x-webhook-signature'];
  const isValid = verifySignature(req.body, signature);
  if (!isValid) {
    return res.status(401).json({ error: 'Invalid signature' });
  }
  // Process event
  const event = req.body;
  console.log('Received event:', event.type);
  // Handle different event types
  switch (event.type) {
    case 'conversation.started':
      handleConversationStarted(event.data);
      break;
    case 'message.received':
      handleMessageReceived(event.data);
      break;
    case 'conversation.ended':
      handleConversationEnded(event.data);
      break;
  }
  // Respond quickly
  res.status(200).json({ received: true });
  // Process asynchronously if needed
  processEventAsync(event);
});
function verifySignature(payload, signature) {
  const secret = process.env.WEBHOOK_SECRET;
  const hash = crypto
    .createHmac('sha256', secret)
    .update(JSON.stringify(payload))
    .digest('hex');
  return \`sha256=\${hash}\` === signature;
}
app.listen(3000);
\`\`\`
**Python/Flask Example:**
\`\`\`python
from flask import Flask, request, jsonify
import hmac
import hashlib
import json
app = Flask(__name__)
@app.route('/webhooks/chatbot-stack', methods=['POST'])
def webhook():
    # Verify signature
    signature = request.headers.get('X-Webhook-Signature')
    if not verify_signature(request.data, signature):
        return jsonify({'error': 'Invalid signature'}), 401
    # Process event
    event = request.json
    print(f'Received event: {event["type"]}')
    # Handle different event types
    event_handlers = {
        'conversation.started': handle_conversation_started,
        'message.received': handle_message_received,
        'conversation.ended': handle_conversation_ended
    }
    handler = event_handlers.get(event['type'])
    if handler:
        handler(event['data'])
    # Respond quickly
    return jsonify({'received': True}), 200
def verify_signature(payload, signature):
    secret = os.environ.get('WEBHOOK_SECRET').encode()
    hash_obj = hmac.new(secret, payload, hashlib.sha256)
    expected = f"sha256={hash_obj.hexdigest()}"
    return hmac.compare_digest(expected, signature)
if __name__ == '__main__':
    app.run(port=3000)
\`\`\`
### 2. Register Webhook
Register your endpoint with ChatBot-Stack:
\`\`\`bash
curl -X POST https://api.chatbot-stack.com/v1/webhooks \\
  -H "Authorization: Bearer cbs_live_1234567890abcdef" \\
  -H "Content-Type: application/json" \\
  -d '{
    "url": "https://yourapp.com/webhooks/chatbot-stack",
    "events": [
      "conversation.started",
      "conversation.ended",
      "message.received",
      "message.sent"
    ],
    "secret": "your_webhook_secret_key",
    "description": "Production webhook endpoint"
  }'
\`\`\`
## Webhook Events
### conversation.started
Triggered when a new conversation begins.
**Payload:**
\`\`\`json
{
  "id": "evt_abc123",
  "type": "conversation.started",
  "timestamp": "2023-06-15T10:30:00Z",
  "data": {
    "conversation_id": "conv_789",
    "chatbot_id": "chat_123",
    "user_id": "user_456",
    "metadata": {
      "source": "website",
      "page_url": "https://example.com/support"
    }
  }
}
\`\`\`
### message.received
Triggered when a message is received from a user.
**Payload:**
\`\`\`json
{
  "id": "evt_def456",
  "type": "message.received",
  "timestamp": "2023-06-15T10:31:00Z",
  "data": {
    "conversation_id": "conv_789",
    "message_id": "msg_012",
    "message": "I need help with my order",
    "user_id": "user_456",
    "chatbot_id": "chat_123",
    "metadata": {
      "sentiment": "neutral",
      "language": "en"
    }
  }
}
\`\`\`
### message.sent
Triggered when the chatbot sends a message.
**Payload:**
\`\`\`json
{
  "id": "evt_ghi789",
  "type": "message.sent",
  "timestamp": "2023-06-15T10:31:02Z",
  "data": {
    "conversation_id": "conv_789",
    "message_id": "msg_013",
    "message": "I'd be happy to help you with your order.",
    "chatbot_id": "chat_123",
    "metadata": {
      "intent": "order_inquiry",
      "confidence": 0.95,
      "response_time": 1.8
    }
  }
}
\`\`\`
### conversation.ended
Triggered when a conversation is closed.
**Payload:**
\`\`\`json
{
  "id": "evt_jkl012",
  "type": "conversation.ended",
  "timestamp": "2023-06-15T10:45:00Z",
  "data": {
    "conversation_id": "conv_789",
    "chatbot_id": "chat_123",
    "user_id": "user_456",
    "summary": {
      "duration_seconds": 900,
      "total_messages": 12,
      "resolution_status": "resolved",
      "satisfaction_rating": 5
    }
  }
}
\`\`\`
### chatbot.updated
Triggered when a chatbot configuration is updated.
**Payload:**
\`\`\`json
{
  "id": "evt_mno345",
  "type": "chatbot.updated",
  "timestamp": "2023-06-15T11:00:00Z",
  "data": {
    "chatbot_id": "chat_123",
    "changes": {
      "name": {
        "old": "Support Bot",
        "new": "Customer Support Bot"
      },
      "status": {
        "old": "draft",
        "new": "active"
      }
    },
    "updated_by": "user_789"
  }
}
\`\`\`
## Security
### Signature Verification
Every webhook request includes an \`X-Webhook-Signature\` header:
\`\`\`
X-Webhook-Signature: sha256=5d41402abc4b2a76b9719d911017c592
\`\`\`
**Verification Steps:**
1. Get webhook secret from dashboard
2. Create HMAC SHA-256 hash of request body
3. Compare with signature header
**Node.js Example:**
\`\`\`javascript
function verifyWebhookSignature(payload, signature, secret) {
  const hash = crypto
    .createHmac('sha256', secret)
    .update(JSON.stringify(payload))
    .digest('hex');
  const expectedSignature = \`sha256=\${hash}\`;
  // Use timing-safe comparison
  return crypto.timingSafeEqual(
    Buffer.from(expectedSignature),
    Buffer.from(signature)
  );
}
\`\`\`
**Python Example:**
\`\`\`python
import hmac
import hashlib
import json
def verify_webhook_signature(payload, signature, secret):
    hash_obj = hmac.new(
        secret.encode(),
        json.dumps(payload).encode(),
        hashlib.sha256
    )
    expected = f"sha256={hash_obj.hexdigest()}"
    return hmac.compare_digest(expected, signature)
\`\`\`
### IP Whitelisting
Restrict webhook requests to ChatBot-Stack IPs:
**Production IPs:**
- 52.89.214.238
- 34.212.75.30
- 54.218.53.128
**Add to firewall rules:**
\`\`\`bash
# iptables example
iptables -A INPUT -p tcp --dport 443 -s 52.89.214.238 -j ACCEPT
iptables -A INPUT -p tcp --dport 443 -s 34.212.75.30 -j ACCEPT
iptables -A INPUT -p tcp --dport 443 -s 54.218.53.128 -j ACCEPT
\`\`\`
## Retry Logic
### Retry Schedule
If your endpoint doesn't respond with 2xx status:
1. **Immediate retry**: After 1 second
2. **Second retry**: After 5 seconds
3. **Third retry**: After 15 seconds
4. **Fourth retry**: After 60 seconds
5. **Fifth retry**: After 300 seconds (5 minutes)
After 5 failed attempts, the webhook is temporarily disabled.
### Handling Retries
**Implement idempotency:**
\`\`\`javascript
const processedEvents = new Set();
app.post('/webhooks/chatbot-stack', async (req, res) => {
  const event = req.body;
  // Check if already processed
  if (processedEvents.has(event.id)) {
    return res.status(200).json({ received: true });
  }
  try {
    await processEvent(event);
    processedEvents.add(event.id);
    res.status(200).json({ received: true });
  } catch (error) {
    console.error('Error processing event:', error);
    res.status(500).json({ error: 'Processing failed' });
  }
});
\`\`\`
## Best Practices
### 1. Respond Quickly
\`\`\`javascript
app.post('/webhooks/chatbot-stack', async (req, res) => {
  // Respond immediately
  res.status(200).json({ received: true });
  // Process asynchronously
  setImmediate(() => {
    processEvent(req.body).catch(console.error);
  });
});
\`\`\`
### 2. Use Queue for Processing
\`\`\`javascript
const Queue = require('bull');
const webhookQueue = new Queue('webhooks');
app.post('/webhooks/chatbot-stack', async (req, res) => {
  await webhookQueue.add(req.body);
  res.status(200).json({ received: true });
});
webhookQueue.process(async (job) => {
  await processEvent(job.data);
});
\`\`\`
### 3. Log All Events
\`\`\`javascript
app.post('/webhooks/chatbot-stack', async (req, res) => {
  const event = req.body;
  // Log to database
  await db.webhookLogs.create({
    event_id: event.id,
    event_type: event.type,
    payload: event,
    received_at: new Date(),
    processed: false
  });
  res.status(200).json({ received: true });
});
\`\`\`
### 4. Monitor Webhook Health
\`\`\`javascript
// Track webhook metrics
const webhookMetrics = {
  received: 0,
  processed: 0,
  failed: 0,
  avgProcessingTime: 0
};
app.post('/webhooks/chatbot-stack', async (req, res) => {
  const startTime = Date.now();
  webhookMetrics.received++;
  try {
    await processEvent(req.body);
    webhookMetrics.processed++;
  } catch (error) {
    webhookMetrics.failed++;
    throw error;
  } finally {
    const processingTime = Date.now() - startTime;
    webhookMetrics.avgProcessingTime = 
      (webhookMetrics.avgProcessingTime + processingTime) / 2;
  }
  res.status(200).json({ received: true });
});
\`\`\`
## Testing Webhooks
### Local Testing with ngrok
\`\`\`bash
# Install ngrok
npm install -g ngrok
# Start your local server
node server.js
# Create tunnel
ngrok http 3000
# Use the ngrok URL as your webhook endpoint
# https://abc123.ngrok.io/webhooks/chatbot-stack
\`\`\`
### Manual Testing
Send test webhook from dashboard or use cURL:
\`\`\`bash
curl -X POST https://yourapp.com/webhooks/chatbot-stack \\
  -H "Content-Type: application/json" \\
  -H "X-Webhook-Signature: sha256=test" \\
  -d '{
    "id": "evt_test",
    "type": "message.received",
    "timestamp": "2023-06-15T10:31:00Z",
    "data": {
      "conversation_id": "conv_test",
      "message": "Test message"
    }
  }'
\`\`\`
## Troubleshooting
### Webhook Not Receiving Events
1. Check webhook status in dashboard
2. Verify endpoint is publicly accessible
3. Check firewall rules
4. Verify SSL certificate is valid
5. Check webhook logs
### Signature Verification Failing
1. Verify secret matches dashboard
2. Check request body is not modified
3. Ensure JSON serialization is consistent
4. Check for whitespace differences
### High Failure Rate
1. Check response time (should be < 3s)
2. Verify endpoint stability
3. Check error logs
4. Implement retry logic
5. Use queue for processing
          `
    }, {
      title: 'Database Schema',
      description: 'Complete database schema documentation',
      badge: 'Technical',
      category: 'Technical Reference',
      content: `
# Database Schema
## Overview
ChatBot-Stack uses a combination of PostgreSQL (relational data), MongoDB (documents), and Redis (cache).
## PostgreSQL Schema
### users
Stores user account information.
\`\`\`sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  avatar_url TEXT,
  email_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login_at TIMESTAMP,
  status VARCHAR(20) DEFAULT 'active',
  CONSTRAINT email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$')
);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_status ON users(status);
\`\`\`
### organizations
Stores organization/company information.
\`\`\`sql
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  owner_id UUID REFERENCES users(id) ON DELETE CASCADE,
  plan VARCHAR(50) DEFAULT 'free',
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_organizations_owner ON organizations(owner_id);
CREATE INDEX idx_organizations_slug ON organizations(slug);
\`\`\`
### projects
Stores project information.
\`\`\`sql
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(20) DEFAULT 'active',
  settings JSONB DEFAULT '{}',
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_projects_org ON projects(organization_id);
CREATE INDEX idx_projects_status ON projects(status);
\`\`\`
### chatbots
Stores chatbot configurations.
\`\`\`sql
CREATE TABLE chatbots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL,
  status VARCHAR(20) DEFAULT 'draft',
  settings JSONB DEFAULT '{}',
  appearance JSONB DEFAULT '{}',
  training_status VARCHAR(20) DEFAULT 'untrained',
  last_trained_at TIMESTAMP,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT valid_type CHECK (type IN ('customer_support', 'sales', 'faq', 'general'))
);
CREATE INDEX idx_chatbots_project ON chatbots(project_id);
CREATE INDEX idx_chatbots_status ON chatbots(status);
CREATE INDEX idx_chatbots_type ON chatbots(type);
\`\`\`
### knowledge_bases
Stores knowledge base information.
\`\`\`sql
CREATE TABLE knowledge_bases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL,
  description TEXT,
  settings JSONB DEFAULT '{}',
  total_documents INTEGER DEFAULT 0,
  total_size_bytes BIGINT DEFAULT 0,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_kb_project ON knowledge_bases(project_id);
\`\`\`
### documents
Stores document metadata.
\`\`\`sql
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  knowledge_base_id UUID REFERENCES knowledge_bases(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  file_type VARCHAR(50) NOT NULL,
  file_size BIGINT NOT NULL,
  storage_url TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  processing_started_at TIMESTAMP,
  processing_completed_at TIMESTAMP,
  processing_error TEXT,
  metadata JSONB DEFAULT '{}',
  chunk_count INTEGER DEFAULT 0,
  uploaded_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_documents_kb ON documents(knowledge_base_id);
CREATE INDEX idx_documents_status ON documents(status);
\`\`\`
### conversations
Stores conversation metadata.
\`\`\`sql
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chatbot_id UUID REFERENCES chatbots(id) ON DELETE CASCADE,
  user_id VARCHAR(255),
  session_id VARCHAR(255),
  status VARCHAR(20) DEFAULT 'active',
  started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  ended_at TIMESTAMP,
  message_count INTEGER DEFAULT 0,
  metadata JSONB DEFAULT '{}',
  satisfaction_rating INTEGER,
  resolution_status VARCHAR(50),
  CONSTRAINT valid_rating CHECK (satisfaction_rating BETWEEN 1 AND 5)
);
CREATE INDEX idx_conversations_chatbot ON conversations(chatbot_id);
CREATE INDEX idx_conversations_user ON conversations(user_id);
CREATE INDEX idx_conversations_status ON conversations(status);
CREATE INDEX idx_conversations_started ON conversations(started_at);
\`\`\`
### api_keys
Stores API key information.
\`\`\`sql
CREATE TABLE api_keys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  key_hash VARCHAR(255) UNIQUE NOT NULL,
  key_prefix VARCHAR(20) NOT NULL,
  scopes TEXT[] DEFAULT '{}',
  last_used_at TIMESTAMP,
  expires_at TIMESTAMP,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  revoked_at TIMESTAMP
);
CREATE INDEX idx_api_keys_org ON api_keys(organization_id);
CREATE INDEX idx_api_keys_hash ON api_keys(key_hash);
\`\`\`
### webhooks
Stores webhook configurations.
\`\`\`sql
CREATE TABLE webhooks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  events TEXT[] NOT NULL,
  secret VARCHAR(255) NOT NULL,
  status VARCHAR(20) DEFAULT 'active',
  failure_count INTEGER DEFAULT 0,
  last_success_at TIMESTAMP,
  last_failure_at TIMESTAMP,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_webhooks_org ON webhooks(organization_id);
CREATE INDEX idx_webhooks_status ON webhooks(status);
\`\`\`
## MongoDB Collections
### messages
Stores conversation messages.
\`\`\`javascript
{
  _id: ObjectId,
  conversation_id: String,
  message_id: String,
  sender: String, // 'user' or 'bot'
  message: String,
  timestamp: ISODate,
  metadata: {
    intent: String,
    confidence: Number,
    entities: Array,
    response_time: Number,
    knowledge_sources: Array
  }
}
// Indexes
db.messages.createIndex({ conversation_id: 1, timestamp: 1 })
db.messages.createIndex({ message_id: 1 })
\`\`\`
### document_chunks
Stores processed document chunks.
\`\`\`javascript
{
  _id: ObjectId,
  document_id: String,
  chunk_id: String,
  content: String,
  chunk_index: Number,
  token_count: Number,
  embedding: Array, // Vector embedding
  metadata: {
    page_number: Number,
    section: String,
    heading: String
  },
  created_at: ISODate
}
// Indexes
db.document_chunks.createIndex({ document_id: 1, chunk_index: 1 })
db.document_chunks.createIndex({ chunk_id: 1 })
\`\`\`
### analytics_events
Stores raw analytics events.
\`\`\`javascript
{
  _id: ObjectId,
  event_type: String,
  chatbot_id: String,
  conversation_id: String,
  user_id: String,
  timestamp: ISODate,
  properties: Object,
  session_id: String
}
// Indexes
db.analytics_events.createIndex({ chatbot_id: 1, timestamp: -1 })
db.analytics_events.createIndex({ event_type: 1, timestamp: -1 })
db.analytics_events.createIndex({ timestamp: -1 })
\`\`\`
## Redis Data Structures
### Session Storage
\`\`\`
Key: session:{session_id}
Type: Hash
TTL: 24 hours
Fields:
  - user_id
  - chatbot_id
  - conversation_id
  - context
  - last_activity
\`\`\`
### Rate Limiting
\`\`\`
Key: ratelimit:{user_id}:{endpoint}
Type: String (counter)
TTL: 1 hour
Value: Request count
\`\`\`
### Cache
\`\`\`
Key: cache:{resource}:{id}
Type: String (JSON)
TTL: Varies (5min - 1hour)
Value: Cached data
\`\`\`
### Real-time Metrics
\`\`\`
Key: metrics:{chatbot_id}:{date}
Type: Hash
TTL: 30 days
Fields:
  - total_conversations
  - total_messages
  - avg_response_time
  - satisfaction_score
\`\`\`
## Relationships
\`\`\`
organizations
  └── projects
      ├── chatbots
      │   └── conversations
      │       └── messages (MongoDB)
      └── knowledge_bases
          └── documents
              └── document_chunks (MongoDB)
\`\`\`
## Data Retention
- **Conversations**: 90 days (configurable)
- **Messages**: 90 days (configurable)
- **Analytics Events**: 365 days
- **Audit Logs**: 365 days (2 years for Enterprise)
- **Documents**: Until manually deleted
- **Cache**: 5 minutes to 1 hour
- **Sessions**: 24 hours
## Backup Strategy
- **PostgreSQL**: Daily full backups, hourly incremental
- **MongoDB**: Daily snapshots, continuous oplog
- **Redis**: Daily RDB snapshots
- **Retention**: 30 days
- **Cross-region replication**: Enabled
          `
    }]
  }, {
    id: 'analytics',
    name: 'Analytics',
    icon: BarChart3Icon,
    articles: [{
      title: 'Understanding Metrics',
      description: 'Key performance indicators',
      category: 'Analytics',
      content: `
# Understanding Metrics
Learn about key metrics to track chatbot performance.
## Core Metrics
### Total Conversations
Number of conversations initiated.
- **Good**: Steady growth
- **Concern**: Sudden drops
- **Action**: Investigate issues
### Response Rate
Percentage of messages answered.
- **Target**: > 95%
- **Measure**: Answered / Total
- **Improve**: Add more training
### Average Response Time
Time to respond to messages.
- **Target**: < 2 seconds
- **Measure**: Total time / Messages
- **Improve**: Optimize queries
### User Satisfaction
Feedback from users.
- **Target**: > 90%
- **Measure**: Positive / Total
- **Improve**: Refine responses
## Engagement Metrics
### Messages per Conversation
Average messages exchanged.
- **Healthy**: 3-8 messages
- **Too Low**: Users leaving quickly
- **Too High**: Not finding answers
### Conversation Duration
Average time spent chatting.
- **Optimal**: 2-5 minutes
- **Too Short**: Quick exits
- **Too Long**: Struggling to help
### Return Rate
Users coming back.
- **Good**: > 30%
- **Measure**: Returning / Total
- **Improve**: Better experience
## Business Metrics
### Conversion Rate
Users completing goals.
- **Track**: Goal completions
- **Measure**: Conversions / Visitors
- **Optimize**: Improve funnel
### Cost per Conversation
Operational efficiency.
- **Calculate**: Total cost / Conversations
- **Reduce**: Automation
- **Monitor**: Monthly trends
### ROI
Return on investment.
- **Calculate**: (Benefit - Cost) / Cost
- **Track**: Over time
- **Report**: To stakeholders
          `
    }, {
      title: 'Custom Reports',
      description: 'Creating custom analytics reports',
      category: 'Analytics',
      content: `
# Custom Reports
Create custom reports for your specific needs.
## Report Builder
Use the report builder to:
1. Select metrics
2. Choose date range
3. Add filters
4. Set visualization
5. Save report
## Report Types
### Summary Reports
High-level overview:
- Total conversations
- User satisfaction
- Response rate
- Key trends
### Detailed Reports
In-depth analysis:
- Conversation logs
- User journeys
- Intent analysis
- Performance metrics
### Comparison Reports
Compare periods:
- Week over week
- Month over month
- Year over year
- Before/after changes
## Filters
Filter by:
- Date range
- Chatbot
- User segment
- Conversation type
- Outcome
## Visualizations
Choose from:
- Line charts
- Bar charts
- Pie charts
- Tables
- Heatmaps
## Scheduling
Automate reports:
- Daily summaries
- Weekly reports
- Monthly reviews
- Quarterly analysis
## Sharing
Share reports with:
- Team members
- Stakeholders
- Clients
- Executives
## Export Options
- PDF
- Excel
- CSV
- PowerPoint
          `
    }, {
      title: 'Exporting Data',
      description: 'Download and analyze your data',
      category: 'Analytics',
      content: `
# Exporting Data
Export your data for external analysis.
## Export Options
### Conversation Logs
Export all conversations:
1. Go to Analytics > Conversations
2. Select date range
3. Choose format (CSV, JSON)
4. Click "Export"
5. Download file
### User Data
Export user information:
- User IDs
- Interaction history
- Preferences
- Feedback
### Analytics Data
Export metrics:
- Daily statistics
- Aggregated data
- Custom metrics
- Trend data
## File Formats
### CSV
Best for:
- Spreadsheet analysis
- Database import
- Quick viewing
- Simple processing
### JSON
Best for:
- API integration
- Custom processing
- Complex structures
- Programmatic access
### Excel
Best for:
- Business reports
- Charts and graphs
- Pivot tables
- Presentations
## Data Fields
Exported data includes:
- Timestamps
- User information
- Messages
- Intents
- Responses
- Metadata
## Privacy Compliance
Exports respect:
- GDPR requirements
- Data retention policies
- User privacy settings
- Access controls
## Best Practices
- Export regularly
- Backup data
- Secure files
- Document exports
- Maintain history
          `
    }]
  }, {
    id: 'advanced',
    name: 'Advanced',
    icon: SettingsIcon,
    articles: [{
      title: 'Custom AI Models',
      description: 'Using your own AI models',
      badge: 'Enterprise',
      category: 'Advanced',
      content: `
# Custom AI Models
Enterprise feature: Use your own AI models.
## Overview
Bring your own AI models to ChatBot Hub for:
- Specialized knowledge
- Industry-specific language
- Custom training data
- Proprietary algorithms
## Supported Models
- OpenAI GPT
- Google PaLM
- Anthropic Claude
- Custom models
## Integration Process
1. Contact enterprise support
2. Provide model details
3. Complete security review
4. Deploy model
5. Test integration
## Requirements
- API endpoint
- Authentication method
- Input/output format
- Rate limits
- SLA requirements
## Configuration
Set up:
- Model parameters
- Temperature
- Max tokens
- Stop sequences
- Context window
## Monitoring
Track:
- Model performance
- Response quality
- Latency
- Error rates
- Cost
## Best Practices
- Test thoroughly
- Monitor closely
- Have fallback
- Document behavior
- Version control
          `
    }, {
      title: 'Multi-language Support',
      description: 'Internationalization guide',
      category: 'Advanced',
      content: `
# Multi-language Support
Support users in multiple languages.
## Supported Languages
- English
- Spanish
- French
- German
- Italian
- Portuguese
- Chinese
- Japanese
- Korean
- And 40+ more
## Setup
1. Go to Settings > Languages
2. Enable languages
3. Add translations
4. Configure detection
5. Test thoroughly
## Translation Methods
### Automatic Translation
- Real-time translation
- Powered by AI
- Maintains context
- Fast and efficient
### Manual Translation
- Professional quality
- Cultural adaptation
- Brand consistency
- Full control
### Hybrid Approach
- Auto-translate first
- Review and refine
- Best of both worlds
- Cost-effective
## Language Detection
Automatic detection based on:
- User preference
- Browser settings
- Geographic location
- Previous interactions
## Best Practices
- Test each language
- Use native speakers
- Consider cultural context
- Adapt tone appropriately
- Regular updates
## Localization
Beyond translation:
- Date formats
- Number formats
- Currency
- Time zones
- Cultural references
          `
    }, {
      title: 'Security Best Practices',
      description: 'Keeping your data secure',
      badge: 'Important',
      category: 'Advanced',
      content: `
# Security Best Practices
Protect your chatbot and user data.
## Authentication
- Strong passwords
- Two-factor authentication
- API key rotation
- Access controls
- Session management
## Data Protection
- Encryption at rest
- Encryption in transit
- Secure backups
- Data retention policies
- Privacy compliance
## Access Control
- Role-based access
- Principle of least privilege
- Regular audits
- Activity logging
- Permission reviews
## API Security
- Rate limiting
- IP whitelisting
- Request validation
- Error handling
- Secure webhooks
## Monitoring
- Security alerts
- Unusual activity
- Failed attempts
- Access logs
- Audit trails
## Compliance
- GDPR
- CCPA
- HIPAA
- SOC 2
- ISO 27001
## Incident Response
- Detection procedures
- Response plan
- Communication protocol
- Recovery steps
- Post-incident review
## Regular Updates
- Security patches
- Dependency updates
- Vulnerability scanning
- Penetration testing
- Security training
          `
    }, {
      title: 'Performance Optimization',
      description: 'Tips for better performance',
      category: 'Advanced',
      content: `
# Performance Optimization
Optimize your chatbot for speed and efficiency.
## Response Time
Improve response speed:
- Cache common queries
- Optimize database queries
- Use CDN for assets
- Minimize API calls
- Implement pagination
## Knowledge Base
Optimize content:
- Remove duplicates
- Compress documents
- Index efficiently
- Structure properly
- Regular cleanup
## Chatbot Configuration
Fine-tune settings:
- Adjust confidence threshold
- Limit context window
- Optimize prompts
- Reduce complexity
- Balance accuracy vs speed
## Infrastructure
Scale effectively:
- Load balancing
- Auto-scaling
- Database optimization
- Caching strategy
- CDN usage
## Monitoring
Track performance:
- Response times
- Error rates
- Resource usage
- User experience
- Bottlenecks
## Best Practices
- Profile regularly
- Optimize queries
- Cache aggressively
- Minimize dependencies
- Use async processing
## Common Issues
- Slow queries
- Large payloads
- Network latency
- Memory leaks
- Unoptimized code
## Solutions
- Query optimization
- Payload compression
- Edge caching
- Memory management
- Code refactoring
          `
    }]
  }];
  const allArticles = categories.flatMap(category => category.articles.map(article => ({
    ...article,
    categoryId: category.id,
    categoryName: category.name,
    categoryIcon: category.icon
  })));
  const filteredArticles = searchQuery ? allArticles.filter(article => article.title.toLowerCase().includes(searchQuery.toLowerCase()) || article.description.toLowerCase().includes(searchQuery.toLowerCase()) || article.category.toLowerCase().includes(searchQuery.toLowerCase())) : null;
  const popularArticles = [{
    title: 'Quick Start Guide',
    category: 'Getting Started',
    views: '12.5K'
  }, {
    title: 'Training Your Chatbot',
    category: 'Chatbots',
    views: '8.3K'
  }, {
    title: 'REST API Reference',
    category: 'API & Integration',
    views: '7.1K'
  }, {
    title: 'Knowledge Base Best Practices',
    category: 'Knowledge Base',
    views: '5.8K'
  }];
  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory);
  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article);
    setHelpful(null);
  };
  const handleBackToList = () => {
    setSelectedArticle(null);
  };
  const handlePopularSearchClick = (term: string) => {
    setSearchQuery(term);
    setSelectedArticle(null);
  };
  const handlePopularArticleClick = (title: string) => {
    const article = allArticles.find(a => a.title === title);
    if (article) {
      setSelectedArticle(article);
    }
  };
  const handleQuickLinkClick = (linkType: string) => {
    setSearchQuery('');
    setSelectedArticle(null);
    switch (linkType) {
      case 'api':
        setSelectedCategory('api');
        break;
      case 'tutorials':
        setSelectedCategory('getting-started');
        break;
      case 'examples':
        setSelectedCategory('api');
        break;
      case 'forum':
        // In a real app, this would open an external link
        window.open('https://community.chatbothub.com', '_blank');
        break;
    }
  };
  if (selectedArticle) {
    return <div className="space-y-6">
        <div className="flex items-center">
          <Button variant="ghost" onClick={handleBackToList} icon={<ArrowLeftIcon className="h-5 w-5" />}>
            Back to Documentation
          </Button>
        </div>
        <Card>
          <CardHeader>
            <div className="flex items-center mb-2">
              <Badge variant="default">{selectedArticle.category}</Badge>
              {selectedArticle.badge && <Badge variant={selectedArticle.badge === 'Popular' ? 'info' : selectedArticle.badge === 'New' ? 'success' : selectedArticle.badge === 'Enterprise' ? 'default' : 'danger'} className="ml-2">
                  {selectedArticle.badge}
                </Badge>}
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              {selectedArticle.title}
            </h1>
            <p className="mt-2 text-gray-600">{selectedArticle.description}</p>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none">
              <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                {selectedArticle.content}
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Was this article helpful?
              </h3>
              <div className="flex space-x-3">
                <Button variant={helpful === true ? 'primary' : 'outline'} icon={<ThumbsUpIcon className="h-5 w-5" />} onClick={() => setHelpful(true)}>
                  Yes
                </Button>
                <Button variant={helpful === false ? 'danger' : 'outline'} icon={<ThumbsDownIcon className="h-5 w-5" />} onClick={() => setHelpful(false)}>
                  No
                </Button>
              </div>
              {helpful !== null && <p className="mt-3 text-sm text-gray-600">
                  {helpful ? 'Thank you for your feedback!' : 'We appreciate your feedback. How can we improve this article?'}
                </p>}
            </div>
          </CardContent>
        </Card>
      </div>;
  }
  return <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Documentation</h1>
          <p className="mt-1 text-sm text-gray-500">
            Learn how to use ChatBot Hub effectively
          </p>
        </div>
      </div>
      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <input type="text" placeholder="Search documentation..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg" />
            <SearchIcon className="absolute left-4 top-3.5 h-6 w-6 text-gray-400" />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-sm text-gray-500">Popular searches:</span>
            {['API', 'Training', 'Webhooks', 'Analytics', 'Security'].map(term => <button key={term} onClick={() => handlePopularSearchClick(term)} className="text-sm text-blue-600 hover:text-blue-700">
                  {term}
                </button>)}
          </div>
        </CardContent>
      </Card>
      {/* Search Results */}
      {filteredArticles && <Card>
          <CardHeader>
            <h2 className="text-lg font-medium text-gray-900">
              Search Results ({filteredArticles.length})
            </h2>
          </CardHeader>
          <CardContent>
            {filteredArticles.length === 0 ? <div className="text-center py-8">
                <SearchIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500">
                  No articles found for "{searchQuery}"
                </p>
                <Button variant="outline" className="mt-4" onClick={() => setSearchQuery('')}>
                  Clear Search
                </Button>
              </div> : <div className="space-y-4">
                {filteredArticles.map((article, index) => <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer" onClick={() => handleArticleClick(article)}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <Badge variant="default" className="mr-2">
                            {article.category}
                          </Badge>
                          {article.badge && <Badge variant={article.badge === 'Popular' ? 'info' : article.badge === 'New' ? 'success' : article.badge === 'Enterprise' ? 'default' : 'danger'}>
                              {article.badge}
                            </Badge>}
                        </div>
                        <h3 className="text-base font-medium text-gray-900">
                          {article.title}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          {article.description}
                        </p>
                      </div>
                      <ChevronRightIcon className="h-5 w-5 text-gray-400 ml-2 flex-shrink-0" />
                    </div>
                  </div>)}
              </div>}
          </CardContent>
        </Card>}
      {/* Category View */}
      {!filteredArticles && <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <h2 className="text-lg font-medium text-gray-900">
                  Categories
                </h2>
              </CardHeader>
              <CardContent className="p-0">
                <nav className="flex flex-col">
                  {categories.map(category => <button key={category.id} onClick={() => setSelectedCategory(category.id)} className={`flex items-center px-4 py-3 text-sm font-medium ${selectedCategory === category.id ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}>
                      <category.icon className="h-5 w-5 mr-3" />
                      {category.name}
                      <ChevronRightIcon className="h-4 w-4 ml-auto" />
                    </button>)}
                </nav>
              </CardContent>
            </Card>
            <Card className="mt-6">
              <CardHeader>
                <h2 className="text-lg font-medium text-gray-900">
                  Popular Articles
                </h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {popularArticles.map((article, index) => <div key={index} className="flex items-start cursor-pointer hover:bg-gray-50 p-2 rounded-md" onClick={() => handlePopularArticleClick(article.title)}>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">
                          {article.title}
                        </div>
                        <div className="text-xs text-gray-500">
                          {article.category} • {article.views} views
                        </div>
                      </div>
                    </div>)}
                </div>
              </CardContent>
            </Card>
          </div>
          {/* Articles Content */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center">
                  {selectedCategoryData && <>
                      <selectedCategoryData.icon className="h-6 w-6 text-blue-600 mr-2" />
                      <h2 className="text-lg font-medium text-gray-900">
                        {selectedCategoryData.name}
                      </h2>
                    </>}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {selectedCategoryData?.articles.map((article, index) => <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer" onClick={() => handleArticleClick(article)}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center">
                            <h3 className="text-base font-medium text-gray-900">
                              {article.title}
                            </h3>
                            {article.badge && <Badge variant={article.badge === 'Popular' ? 'info' : article.badge === 'New' ? 'success' : article.badge === 'Enterprise' ? 'default' : 'danger'} className="ml-2">
                                {article.badge}
                              </Badge>}
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            {article.description}
                          </p>
                        </div>
                        <ChevronRightIcon className="h-5 w-5 text-gray-400 ml-2" />
                      </div>
                    </div>)}
                </div>
              </CardContent>
            </Card>
            {/* Quick Links */}
            <Card className="mt-6">
              <CardHeader>
                <h2 className="text-lg font-medium text-gray-900">
                  Quick Links
                </h2>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" className="justify-start" icon={<CodeIcon className="h-5 w-5" />} onClick={() => handleQuickLinkClick('api')}>
                    API Reference
                    <ExternalLinkIcon className="h-4 w-4 ml-auto" />
                  </Button>
                  <Button variant="outline" className="justify-start" icon={<BookOpenIcon className="h-5 w-5" />} onClick={() => handleQuickLinkClick('tutorials')}>
                    Tutorials
                    <ExternalLinkIcon className="h-4 w-4 ml-auto" />
                  </Button>
                  <Button variant="outline" className="justify-start" icon={<ClipboardIcon className="h-5 w-5" />} onClick={() => handleQuickLinkClick('examples')}>
                    Code Examples
                    <ExternalLinkIcon className="h-4 w-4 ml-auto" />
                  </Button>
                  <Button variant="outline" className="justify-start" icon={<MessageSquareIcon className="h-5 w-5" />} onClick={() => handleQuickLinkClick('forum')}>
                    Community Forum
                    <ExternalLinkIcon className="h-4 w-4 ml-auto" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>}
    </div>;
}