# Cloud Infrastructure Manager

A premium, enterprise-grade, full-stack Cloud Infrastructure Manager SaaS web application that enables multi-cloud resource provisioning, deployment, monitoring, optimization, and cost management across major cloud providers.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Next.js](https://img.shields.io/badge/Next.js-14-black.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)
![Prisma](https://img.shields.io/badge/Prisma-5.0-2D3748.svg)

## Features

### Core Features
- **Multi-Cloud Management**: Unified dashboard for AWS, Azure, and GCP
- **Resource Provisioning**: Deploy VMs, containers, databases, storage, and more
- **Real-time Monitoring**: CPU, memory, storage, network metrics with live updates
- **Cost Analytics**: Track spending, forecasts, and optimization recommendations
- **Deployment Pipelines**: CI/CD integration with automated deployments
- **Alerting System**: Custom alerts based on metrics and thresholds
- **Team Management**: Role-based access control (RBAC)
- **Audit Logging**: Complete activity tracking

### Premium UI/UX
- Dark/Light mode support
- Glassmorphism design with soft shadows
- Collapsible sidebar navigation
- Responsive layouts for all devices
- Smooth Framer Motion animations
- Interactive charts and data visualization

## Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Icons**: Lucide React
- **State Management**: Zustand

### Backend
- **API**: Next.js API Routes
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT with refresh tokens
- **Caching**: Redis
- **Validation**: Zod

### Cloud Integrations (Mocked)
- AWS (EC2, S3, RDS, Lambda)
- Azure (VMs, Storage, SQL Database)
- GCP (Compute Engine, Cloud Storage, Cloud SQL)

## Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- Redis 6+

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/cloud-infrastructure-manager.git
cd cloud-infrastructure-manager
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/cloud_manager"

# Redis
REDIS_URL="redis://localhost:6379"

# JWT
JWT_SECRET="your-super-secret-jwt-key"
NEXTAUTH_SECRET="your-nextauth-secret"

# App
NEXTAUTH_URL="http://localhost:3000"
```

4. **Set up the database**
```bash
# Generate Prisma client
npm run db:generate

# Run migrations
npm run db:migrate

# Seed the database (optional)
npm run db:seed
```

5. **Start the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
cloud-infrastructure-manager/
├── prisma/
│   └── schema.prisma         # Database schema
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── (dashboard)/      # Dashboard layout group
│   │   │   ├── dashboard/    # Dashboard page
│   │   │   ├── resources/    # Resource management
│   │   │   ├── costs/        # Cost analytics
│   │   │   └── ...           # Other pages
│   │   ├── api/              # API routes
│   │   │   ├── auth/         # Authentication endpoints
│   │   │   ├── resources/    # Resource endpoints
│   │   │   └── ...           # Other endpoints
│   │   ├── login/            # Login page
│   │   ├── signup/           # Signup page
│   │   └── page.tsx          # Landing page
│   ├── components/
│   │   ├── ui/               # UI components
│   │   └── providers.tsx     # Context providers
│   ├── hooks/                # Custom React hooks
│   ├── lib/                   # Utility functions
│   ├── styles/               # Global styles
│   └── types/                # TypeScript types
├── public/                    # Static assets
├── .env.example              # Environment variables template
├── next.config.js            # Next.js configuration
├── tailwind.config.js        # Tailwind configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Dependencies
```

## Database Schema

### Core Tables
- **users**: User accounts and authentication
- **organizations**: Companies/teams
- **organization_members**: Team memberships
- **cloud_providers**: Connected cloud accounts
- **resources**: Cloud resources (VMs, databases, etc.)
- **projects**: Resource groupings
- **environments**: Dev, staging, production
- **deployments**: Deployment records
- **alerts**: Alert configurations and history
- **cost_reports**: Monthly cost breakdowns
- **audit_logs**: Activity tracking

See `prisma/schema.prisma` for complete schema definition.

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Create new account |
| POST | `/api/auth/login` | User login |
| GET | `/api/auth/me` | Get current user |
| POST | `/api/auth/logout` | User logout |
| POST | `/api/auth/refresh` | Refresh access token |
| POST | `/api/auth/forgot-password` | Request password reset |
| POST | `/api/auth/reset-password` | Reset password |

### Resources
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/resources` | List all resources |
| POST | `/api/resources` | Create resource |
| GET | `/api/resources/:id` | Get resource details |
| PATCH | `/api/resources/:id` | Update resource |
| DELETE | `/api/resources/:id` | Delete resource |
| POST | `/api/resources/:id/start` | Start resource |
| POST | `/api/resources/:id/stop` | Stop resource |
| POST | `/api/resources/:id/restart` | Restart resource |

### Cloud Providers
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cloud-providers` | List connected providers |
| POST | `/api/cloud-providers` | Connect provider |
| GET | `/api/cloud-providers/:id` | Provider details |
| DELETE | `/api/cloud-providers/:id` | Disconnect provider |
| POST | `/api/cloud-providers/:id/sync` | Sync resources |

### Monitoring & Metrics
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/resources/:id/metrics` | Get resource metrics |
| GET | `/api/resources/:id/logs` | Get resource logs |
| GET | `/api/alerts` | List alerts |
| POST | `/api/alerts` | Create alert rule |
| GET | `/api/costs` | Get cost reports |
| GET | `/api/costs/breakdown` | Cost breakdown by category |

### Team Management
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/organizations` | List organizations |
| GET | `/api/organizations/:id/members` | List members |
| POST | `/api/organizations/:id/invite` | Invite member |
| PATCH | `/api/organizations/:id/members/:userId` | Update member role |
| DELETE | `/api/organizations/:id/members/:userId` | Remove member |

## Monetization Plans

### Free Tier
- 3 Projects
- 2 Cloud Providers
- 5 Team Members
- 10 Resources
- Basic Monitoring
- Community Support

### Pro Tier - $49/month
- Unlimited Projects
- All Cloud Providers
- 25 Team Members
- Unlimited Resources
- Advanced Monitoring
- Cost Analytics
- Custom Alerts
- Priority Support
- API Access

### Enterprise Tier - Custom Pricing
- Everything in Pro
- Unlimited Team Members
- Dedicated Support
- SSO & SAML
- Custom Integrations
- SLA Guarantee
- On-Premise Option
- Audit Logging
- Compliance Reports

## UI Wireframes

### Landing Page
- Hero section with CTA
- Features grid
- Pricing cards
- Testimonials
- FAQ section

### Authentication
- Login form (email/password)
- Signup wizard (2-step)
- Forgot password flow
- Email verification

### Dashboard
- Stats cards (resources, costs, uptime)
- Cost overview chart
- Resource distribution pie chart
- Recent activity list
- Active alerts panel

### Resource Management
- Resource list with filters
- Resource detail view
- Create resource wizard
- Resource metrics graphs
- Action buttons (start/stop/restart)

### Cost Analytics
- Monthly cost trends
- Cost breakdown by provider
- Cost breakdown by resource type
- Optimization recommendations
- Budget alerts configuration

### Settings
- Profile settings
- Organization settings
- Team management
- Billing & subscription
- API keys
- Notification preferences

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| DATABASE_URL | PostgreSQL connection string | Yes |
| REDIS_URL | Redis connection string | Yes |
| JWT_SECRET | Secret for JWT signing | Yes |
| NEXTAUTH_SECRET | NextAuth.js secret | Yes |
| NEXTAUTH_URL | App URL for redirects | Yes |
| STRIPE_SECRET_KEY | Stripe for payments | No |
| AWS_ACCESS_KEY_ID | AWS integration | No |
| AZURE_CLIENT_ID | Azure integration | No |
| GCP_PROJECT_ID | GCP integration | No |

## Scripts

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server

# Database
npm run db:generate      # Generate Prisma client
npm run db:migrate       # Run migrations
npm run db:seed          # Seed database
npm run db:studio        # Open Prisma Studio

# Code Quality
npm run lint             # Run ESLint
npm run type-check       # Run TypeScript check
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Security

- JWT-based authentication with refresh tokens
- Role-based access control (RBAC)
- Password hashing with bcrypt
- Input validation with Zod
- SQL injection protection via Prisma
- XSS protection
- CSRF protection
- Rate limiting (recommended for production)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@cloudmanager.com or join our Slack community.

## Roadmap

- [ ] Kubernetes cluster management
- [ ] Terraform integration
- [ ] Multi-region deployment
- [ ] Advanced AI-powered cost optimization
- [ ] Mobile app (React Native)
- [ ] Third-party integrations (Slack, PagerDuty)

---

Built with by the CloudManager Team
