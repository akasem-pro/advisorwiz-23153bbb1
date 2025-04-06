
# AdvisorWiz Architecture

This document outlines the architectural decisions and patterns used in the AdvisorWiz application.

## Overview

AdvisorWiz is built using a component-based architecture with React, TypeScript, and Tailwind CSS. The application is designed to connect consumers with financial advisors through an intelligent matching system.

## Key Architectural Patterns

### Component Organization

Components are organized by feature and function:
- **Layout Components**: Handle the overall structure of the application (`/src/components/layout`)
- **UI Components**: Reusable UI elements (`/src/components/ui`)
- **Feature Components**: Feature-specific components organized by domain
- **Page Components**: Top-level components that represent routes (`/src/pages`)

#### Component Hierarchy

```
Component
├── Layout (app structure)
├── Pages (routes)
├── Features (domain-specific)
│   ├── Auth
│   ├── Matching
│   ├── Client
│   ├── Advisor
│   └── Scheduling
└── UI (reusable elements)
```

### State Management

The application uses several state management approaches:
1. **React Context API**: For global state through providers:
   - `AuthProvider`: Authentication state
   - `ThemeProvider`: Theme preferences
   - `UserProvider`: User profile data
   - `FeedbackContext`: User feedback mechanisms

2. **React Query**: Used for server state management and data fetching
   - Handles caching, background updates, and optimistic UI updates

3. **Local Component State**: Via React's `useState` and `useReducer` for component-specific state

### Data Flow

Data flows through the application in the following pattern:
1. User interactions trigger events
2. Events are handled by hooks or context methods
3. Data fetching/mutations occur via service layers
4. UI updates based on new state

### Error Handling

The application implements a comprehensive error handling system:
1. **Asynchronous Error Logging**: Non-blocking error logging
2. **Error Categories**: Errors are categorized by type and severity
3. **User Feedback**: Error messages are shown to users when appropriate
4. **Global Error Handling**: Catches unhandled exceptions and promise rejections

### API Integration

The backend is integrated through:
- **Supabase Client**: Direct database access with RLS policies
- **Service Layer**: Abstracts database operations in service files
- **Hooks**: Wrap services with React-friendly interfaces

## Performance Optimizations

- **Memoization**: Used for expensive calculations and renders
- **Code Splitting**: Implemented with React.lazy and Suspense
- **Web Vitals Monitoring**: Tracks important performance metrics
- **Image Optimization**: Implements lazy loading and responsive images
- **Metrics Tracking**: Collects and analyzes performance data

## Security Model

- **Authentication**: Handled by Supabase Auth
- **Authorization**: Implemented through Supabase Row-Level Security (RLS)
- **Data Validation**: Client and server-side validation via schemas
- **HTTPS Only**: All API requests use secure connections
- **Content Security Policy**: Implemented to prevent XSS attacks

## Analytics System

The application includes a comprehensive analytics system:
- **User Behavior Tracking**: Monitors user interactions
- **Performance Metrics**: Tracks application performance
- **Conversion Tracking**: Measures key conversion events
- **Error Reporting**: Logs and analyzes application errors
- **Data Privacy**: Respects user privacy preferences

## Directory Structure

```
src/
├── components/         # UI components organized by feature
├── context/            # React context providers
├── features/           # Feature-specific code
├── hooks/              # Custom React hooks
├── integrations/       # External service integrations
├── lib/                # Utility libraries
├── pages/              # Page components
├── services/           # API and service layers
├── styles/             # Global styles and theme
├── tests/              # Test files
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
    ├── analytics/      # Analytics utilities
    ├── errorHandling/  # Error management system
    └── performance/    # Performance tracking
```

## Design System

AdvisorWiz uses a consistent design system based on:
- **Tailwind CSS**: For utility-first styling
- **Shadcn UI**: Component library based on Radix UI
- **Custom Components**: Domain-specific UI elements
- **Responsive Design**: Mobile-first approach
- **Accessibility**: WCAG 2.1 AA compliance

## Testing Strategy

The testing approach follows multiple layers:
- **Unit Tests**: Test individual functions and components
- **Integration Tests**: Test interactions between components
- **E2E Tests**: Test complete user flows
- **Performance Tests**: Ensure application meets performance goals
- **Accessibility Tests**: Verify compliance with accessibility standards

## Future Architecture Plans

- **Microservices**: Split monolithic backend into microservices
- **GraphQL**: Replace REST API with GraphQL for more flexible data fetching
- **Server Components**: Implement React Server Components for improved performance
- **Web Workers**: Offload heavy computations to separate threads
