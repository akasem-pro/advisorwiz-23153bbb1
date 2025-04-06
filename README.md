
# AdvisorWiz

AdvisorWiz is a comprehensive platform that connects consumers with financial advisors using an intelligent matching system. The application helps users find advisors based on their specific financial needs, expertise requirements, and preferences.

## Features

- **Intelligent Matching System**: Connects consumers with the most compatible financial advisors
- **Secure Communication**: Chat and call functionality for smooth advisor-client interactions
- **Appointment Scheduling**: Easily schedule and manage appointments
- **Client Management**: Keep detailed notes and track interactions with clients
- **Comprehensive Profiles**: Detailed profiles for both advisors and consumers
- **Team Management**: Tools for firms to manage their team of advisors
- **Analytics Dashboard**: Insights into performance, engagement, and conversion
- **Responsive Design**: Optimized for both desktop and mobile devices

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-organization/advisorwiz.git
cd advisorwiz
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Architecture Overview

AdvisorWiz is built using a component-based architecture with React, TypeScript, and Tailwind CSS. The application follows a feature-based organization pattern where code is organized by domain rather than by type.

### Key Technical Features

- **TypeScript**: Strong typing for improved code quality and developer experience
- **React**: Component-based UI with hooks for state management
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Shadcn UI**: High-quality UI components built on Radix UI primitives
- **Supabase**: Backend services for authentication, database, and storage
- **React Query**: Data fetching and state management
- **React Router**: Client-side routing
- **Error Handling**: Comprehensive error management with async logging
- **Performance Monitoring**: Built-in performance tracking and optimization

[Learn more about our architecture](./docs/ARCHITECTURE.md)

## Core Modules

- **Authentication**: User registration, login, and profile management
- **Matching System**: Proprietary algorithm for advisor-client compatibility
- **Scheduling**: Appointment management system
- **Client Management**: Note-taking and interaction tracking
- **Communication**: Chat and call functionality
- **Analytics**: Performance tracking and reporting

## Documentation Structure

- [Architecture Guide](./docs/ARCHITECTURE.md) - High-level architecture overview
- [Code Standards](./docs/CODE_STANDARDS.md) - Coding standards and best practices
- [Contributing Guide](./CONTRIBUTING.md) - Guidelines for contributing to the project
- [Performance Monitoring](./docs/PERFORMANCE_MONITORING.md) - Performance tracking infrastructure
- [Test Strategy](./docs/TEST_STRATEGY.md) - Testing approach and conventions

### Specialized Documentation

- [Matching System](./docs/matching-system.md) - Documentation for the matching algorithm
- [Error Handling](./docs/error-handling.md) - Guide to the error management system
- [Analytics Integration](./docs/analytics.md) - Guide to the analytics implementation
- [Type System](./docs/type-system.md) - Guide to the TypeScript type organization

## Testing

Run tests with:

```bash
npm test
```

For coverage reports:

```bash
npm test -- --coverage
```

## Deployment

The application can be deployed using:

```bash
npm run build
```

This creates a `dist` folder with optimized static assets ready for deployment.

For mobile app deployment using Capacitor:
```bash
npm run build
npx cap sync
npx cap open android  # or ios
```

## Contributing

We welcome contributions to AdvisorWiz! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
