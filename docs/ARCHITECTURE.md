
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

## Security Model

- **Authentication**: Handled by Supabase Auth
- **Authorization**: Implemented through Supabase Row-Level Security (RLS)
- **Data Validation**: Client and server-side validation via schemas

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
```
