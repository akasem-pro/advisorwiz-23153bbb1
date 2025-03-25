
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

## Technology Stack

- **Frontend**: React, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Supabase (PostgreSQL, Authentication, Storage)
- **State Management**: React Context API, Tanstack Query
- **Testing**: Jest, React Testing Library
- **Accessibility**: Custom audit tools, WCAG compliance

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

### Code Structure

- **Components**: Reusable UI elements
- **Pages**: Top-level components that represent routes
- **Hooks**: Custom React hooks for business logic
- **Context**: Application state management
- **Services**: API and external service integrations
- **Utils**: Helper functions and utilities

### Accessibility

The project includes comprehensive accessibility tools:
- Runtime accessibility audit in `/admin/accessibility`
- WCAG AA compliance checks
- Screen reader compatibility
- Keyboard navigation support

### Performance Optimization

- Lazy loading of components and images
- Memoization for expensive operations
- Bundle size optimization
- Core Web Vitals monitoring

## Deployment

Open [Lovable](https://lovable.dev/projects/334c9e1d-ba1e-49f0-af2e-dc72ededf4c4) and click on Share -> Publish.

## Custom Domain Setup

For custom domain deployment, we recommend using Netlify:
1. Export your build from Lovable
2. Create a Netlify account and new site
3. Upload your build or connect to your GitHub repository
4. Configure your custom domain in Netlify settings

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed information on contributing to this project.

## License

This project is proprietary and confidential. All rights reserved.
