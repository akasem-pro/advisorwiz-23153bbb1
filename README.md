
# AdvisorWiz - Financial Advisory Matching Platform

**URL**: https://lovable.dev/projects/334c9e1d-ba1e-49f0-af2e-dc72ededf4c4

## About AdvisorWiz

AdvisorWiz is a comprehensive platform designed to connect consumers with financial advisors through intelligent matching algorithms. The platform serves three main user types:

- **Consumers** seeking financial advice tailored to their unique needs
- **Advisors** looking to connect with ideal clients
- **Financial Firms** managing advisors and scaling their business

## Key Features

- **Smart Matching**: Proprietary algorithm to connect clients with the right advisors
- **Profile Management**: Comprehensive profiles for advisors and consumers
- **Appointment Scheduling**: Built-in scheduling system
- **Secure Messaging**: In-app communication
- **Dashboard Analytics**: Performance tracking and insights
- **Accessibility**: WCAG compliant design
- **Performance Monitoring**: Real-time tracking of web vitals metrics and user experience

## Technology Stack

- **Frontend**: React, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Supabase (PostgreSQL, Authentication, Storage)
- **State Management**: React Context API, Tanstack Query
- **Testing**: Jest, React Testing Library
- **Accessibility**: Custom audit tools, WCAG compliance
- **Performance Optimization**: Code splitting, lazy loading, Web Vitals monitoring
- **Analytics Integration**: GA4 integration with A/B testing capability

## Getting Started

### Prerequisites

- Node.js & npm - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

### Installation

```sh
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory
cd advisorwiz

# Step 3: Install dependencies
npm i

# Step 4: Start the development server
npm run dev
```

### Testing

```sh
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage
```

## Development Guidelines

For detailed development guidelines, please refer to the documentation in the `docs` directory:

- [Architecture Documentation](./docs/ARCHITECTURE.md) - System design and architectural decisions
- [Code Standards](./docs/CODE_STANDARDS.md) - Coding conventions and standards
- [Contributing Guide](./docs/CONTRIBUTING.md) - How to contribute to the project
- [Performance Monitoring](./docs/PERFORMANCE_MONITORING.md) - Performance tracking and optimization guide

## Project Structure

```
advisorwiz/
├── docs/                # Project documentation
├── public/              # Static assets
├── src/
│   ├── components/      # UI components organized by feature
│   ├── context/         # React context providers
│   ├── features/        # Feature-specific code
│   ├── hooks/           # Custom React hooks
│   ├── integrations/    # External service integrations
│   ├── pages/           # Page components
│   ├── services/        # API and service layers
│   ├── styles/          # CSS and styling
│   ├── tests/           # Test files
│   ├── types/           # TypeScript definitions
│   └── utils/           # Utility functions and performance monitoring
├── .gitignore           # Git ignore file
├── package.json         # NPM package configuration
├── README.md            # Project documentation
├── tailwind.config.ts   # Tailwind CSS configuration
└── tsconfig.json        # TypeScript configuration
```

## Performance Optimizations

This project implements several performance optimizations:

- **Code Splitting**: React.lazy and Suspense for component-level code splitting
- **Lazy Loading**: Components are loaded only when needed
- **Web Vitals Monitoring**: Real-time performance metrics tracking with Google Core Web Vitals integration
- **Image Optimization**: Responsive images and lazy loading
- **Bundle Size Management**: Careful dependency management
- **Resource Hints**: Uses preconnect and preload for critical resources
- **Enhanced Performance Tracking**: Metrics batching and persistence across page loads

### Performance Monitoring System

AdvisorWiz includes a comprehensive performance monitoring system that:

- **Tracks Core Web Vitals**: Monitors LCP, FID, CLS, and INP metrics
- **Measures Component Performance**: Tracks render times and interaction latency
- **Records User Journey Metrics**: Captures key user flows and experiences
- **Integrates with Analytics**: Correlates performance with business metrics
- **Supports A/B Testing**: Measures performance impact of different implementations

For details, see the [Performance Monitoring Documentation](./docs/PERFORMANCE_MONITORING.md).

## A/B Testing Integration

The platform includes integrated A/B testing capabilities:

- **Performance Impact Tracking**: Web vitals metrics are correlated with A/B test variants
- **Variant Tracking**: Impression and conversion tracking for variants
- **Analytics Integration**: Test results feed directly into analytics systems

## Deployment

Open [Lovable](https://lovable.dev/projects/334c9e1d-ba1e-49f0-af2e-dc72ededf4c4) and click on Share -> Publish.

## Custom Domain Setup

For custom domain deployment, we recommend using Netlify:
1. Export your build from Lovable
2. Create a Netlify account and new site
3. Upload your build or connect to your GitHub repository
4. Configure your custom domain in Netlify settings

## Contributing

See [CONTRIBUTING.md](./docs/CONTRIBUTING.md) for detailed information on contributing to this project.

## License

This project is proprietary and confidential. All rights reserved.
