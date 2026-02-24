# AI Shayak - WhatsApp-First Compliance Assistant

AI Sahayak is a full-stack, AI-powered compliance management platform designed specifically for Indian SMEs and MSMEs.

It delivers real-time regulatory alerts, AI-based document analysis, multilingual assistance, and smart deadline tracking — directly through WhatsApp.

The platform simplifies compliance for GST, PF, ESI, and Labor Law regulations using automation, OCR, and AI-driven insights.

## 🚀 Features

### 📱Core Features
- **WhatsApp-First Interface**: Native WhatsApp integration for alerts and communication
- **AI-Powered Document Scanning**: OCR + LegalBERT for document analysis
- **Multilingual Support**: Hindi, Telugu, English, Tamil, Kannada
- **Real-time Compliance Alerts**: GST, PF, ESI, Labor Law notifications
- **Smart Deadline Tracking**: Automated penalty calculations and reminders
- **Mobile-First Design**: Optimized for Indian SME users

### ⚙️Technical Features
- **Full-Stack TypeScript**: Type-safe development across frontend and backend
- **Real-time Communication**: WebSocket support for instant notifications
- **Secure Authentication**: JWT-based auth with OTP verification
- **Scalable Architecture**: Microservices-ready design
- **Production Ready**: Comprehensive logging, monitoring, and error handling

<img width="546" height="827" alt="image" src="https://github.com/user-attachments/assets/b8f57be3-0a52-4f83-9087-a8081c858147" />


## 🏗️ Architecture

### Frontend (Next.js 14)
\`\`\`
frontend/
├── app/                    # Next.js App Router
├── components/            # Reusable UI components
│   ├── screens/          # Page components
│   └── ui/               # shadcn/ui components
├── hooks/                # Custom React hooks
├── services/             # API communication layer
├── lib/                  # Utility functions
└── types/                # TypeScript definitions
\`\`\`

### Backend (Node.js + Express)
\`\`\`
backend/
├── src/
│   ├── controllers/      # Route handlers
│   ├── services/         # Business logic
│   ├── middleware/       # Express middleware
│   ├── routes/           # API routes
│   ├── config/           # Database & Redis config
│   ├── utils/            # Helper functions
│   └── types/            # TypeScript definitions
├── logs/                 # Application logs
└── uploads/              # File uploads
\`\`\`

<img width="950" height="814" alt="image" src="https://github.com/user-attachments/assets/e57ab236-4723-4f54-aa1f-7713c11859ec" />


## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 with App Router
- **UI Library**: shadcn/ui + Tailwind CSS
- **State Management**: React Context + Custom Hooks
- **HTTP Client**: Axios with interceptors
- **Icons**: Lucide React
- **Styling**: Tailwind CSS with custom components

### Backend
- **Runtime**: Node.js with Express.js
- **Database**: PostgreSQL with connection pooling
- **Cache**: Redis for session management
- **Authentication**: JWT with OTP verification
- **File Upload**: Multer with AWS S3 integration
- **WhatsApp**: Twilio API integration
- **Logging**: Winston with structured logging
- **Validation**: Joi schema validation

### DevOps & Deployment
- **Frontend**: Vercel deployment
- **Backend**: Railway/Heroku deployment
- **Database**: Supabase/Neon PostgreSQL
- **Cache**: Upstash Redis
- **Storage**: AWS S3 for document storage
- **Monitoring**: Winston logs + Error tracking

## 🚀 Quick Start

### ✅ Prerequisites
- Node.js 18+ and npm
- PostgreSQL database
- Redis server
- Twilio account (for WhatsApp)

### Installation

1. **Clone the repository**
\`\`\`bash
git clone https://github.com/your-org/ai-shayak.git
cd ai-shayak
\`\`\`

2. **Install dependencies**
\`\`\`bash
npm run install:all
\`\`\`

3. **Set up environment variables**
\`\`\`bash
# Backend
cp backend/.env.example backend/.env
# Edit backend/.env with your configuration

# Frontend  
cp frontend/.env.example frontend/.env.local
# Edit frontend/.env.local with your configuration
\`\`\`

4. **Set up database**
\`\`\`bash
# Create PostgreSQL database
createdb ai_shayak

# The application will auto-create tables on first run
\`\`\`

5. **Start development servers**
\`\`\`bash
npm run dev
\`\`\`

This will start:
- Frontend: http://localhost:3000
- Backend: http://localhost:8000

## 📱 Usage

### 👨‍💼 For SME Owners
1. **Onboarding**: Simple 3-step registration process
2. **WhatsApp Integration**: Receive alerts directly on WhatsApp
3. **Document Scanning**: Upload compliance documents for AI analysis
4. **Dashboard**: Track compliance status and upcoming deadlines
5. **Multilingual**: Use in Hindi, Telugu, or English

### 👩‍💻 For Developers
1. **API Documentation**: RESTful APIs with comprehensive documentation
2. **WebSocket Events**: Real-time notifications and updates
3. **Webhook Support**: Integration with external compliance systems
4. **SDK**: JavaScript SDK for third-party integrations


## 📷 Screenshots
<img width="1344" height="615" alt="image" src="https://github.com/user-attachments/assets/8ba88b39-842c-4151-9344-f5415e90bfb3" />


<img width="1306" height="561" alt="image" src="https://github.com/user-attachments/assets/e2bf0023-696c-45b0-b57b-fc868108ecc7" />

<img width="787" height="681" alt="image" src="https://github.com/user-attachments/assets/b8295a9a-874d-4536-991e-d1b063af9190" />



## 🔧 Configuration

### Environment Variables

#### Backend (.env)
\`\`\`env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=ai_shayak
DB_USER=postgres
DB_PASSWORD=your_password

# Twilio WhatsApp
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886

# JWT
JWT_SECRET=your_super_secret_key

# Redis
REDIS_URL=redis://localhost:6379
\`\`\`

#### Frontend (.env.local)
\`\`\`env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_WHATSAPP_NUMBER=+919876543210
\`\`\`

## 🧪 Testing

### Run Tests
\`\`\`bash
# Backend tests
cd backend && npm test

# Frontend tests  
cd frontend && npm test

# E2E tests
npm run test:e2e
\`\`\`

### Test Coverage
- Unit tests for all business logic
- Integration tests for API endpoints
- E2E tests for critical user flows
- WhatsApp integration testing

## 📊 Monitoring & Analytics

### Application Monitoring
- **Logs**: Structured logging with Winston
- **Metrics**: Custom metrics for compliance tracking
- **Alerts**: Real-time error notifications
- **Performance**: Response time and throughput monitoring

### Business Metrics
- **User Engagement**: Daily/Monthly active users
- **Compliance Score**: Average compliance across users
- **Alert Effectiveness**: Response rates to compliance alerts
- **Document Processing**: OCR accuracy and processing time

## 🚀 Deployment

### Production Deployment

#### Frontend (Vercel)
\`\`\`bash
# Deploy to Vercel
vercel --prod

# Or use GitHub integration for automatic deployments
\`\`\`

#### Backend (Railway)
\`\`\`bash
# Deploy to Railway
railway login
railway link
railway up
\`\`\`

#### Database Setup
1. **PostgreSQL**: Use Supabase or Neon for managed PostgreSQL
2. **Redis**: Use Upstash for managed Redis
3. **File Storage**: Configure AWS S3 for document storage

### Environment Setup
1. Set production environment variables
2. Configure domain and SSL certificates
3. Set up monitoring and logging
4. Configure backup strategies

## 🤝 Contribution & Feedback

AI Sahayak is currently developed and maintained.

Suggestions, feature requests, and collaboration opportunities are welcome.
Feel free to open an issue or connect via GitHub.

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

### Code Standards
- TypeScript for type safety
- ESLint + Prettier for code formatting
- Conventional commits for commit messages


## 👩‍💻 Author
Dhara Lakshmi Kusumanchi
B.Tech CSE
Full Stack Developer | AI Enthusiast

GitHub: https://github.com/dharalakshmi
