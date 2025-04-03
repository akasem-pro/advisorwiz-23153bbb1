
# Quick Start Guide

This guide will help you quickly get started with AdvisorWiz development.

## Development Environment Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-organization/advisorwiz.git
   cd advisorwiz
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## Key Development Flows

### Authentication Flow

1. User registration and login are handled through `AuthRoutes.tsx`
2. Authentication state is managed by `AuthProvider` in `src/components/auth/AuthContext.tsx`
3. Protected routes use `AuthGuard` for access control

### Matching System

The matching system is the core of AdvisorWiz. It:

1. Evaluates compatibility between advisors and consumers
2. Uses multiple scoring algorithms (expertise, availability, language matching)
3. Provides explanations for match scores
4. Implements caching for performance optimization

To work with the matching system, refer to:
- `src/services/matching/docs/MATCHING_SYSTEM.md`
- `src/services/matching/README.md`

### Adding a New Feature

1. **Plan your feature**:
   - Determine which components, services, and hooks you'll need
   - Consider performance implications
   - Design with accessibility in mind

2. **Implement components**:
   - Create new components in appropriate feature directories
   - Follow the component structure outlined in CODE_STANDARDS.md
   - Use Tailwind CSS for styling

3. **Create or update routes**:
   - Add routes in the appropriate route file (MainRoutes.tsx, AuthRoutes.tsx, etc.)
   - Use lazy loading for performance optimization

4. **Add tests**:
   - Write unit tests for components
   - Write integration tests for key flows

5. **Document your feature**:
   - Update relevant documentation files
   - Add JSDoc comments to functions and components

## Common Development Tasks

### Adding a New Page

1. Create a new component in `src/pages/`
2. Add the route in the appropriate route file (usually `MainRoutes.tsx`)
3. Add navigation links in relevant components

### Working with the API

The application uses Supabase for backend functionality:

1. API client is configured in `src/integrations/supabase/client.ts`
2. Operations are organized in `src/lib/supabase/operations/`
3. Type definitions are in `src/lib/supabase/types/`

### Performance Considerations

1. Use React.memo for expensive components
2. Implement virtualization for long lists
3. Use the performance monitoring utilities in `src/utils/performance/`
4. Optimize images and assets

## Troubleshooting

### Common Issues

1. **Build errors**:
   - Check for missing dependencies
   - Verify TypeScript types
   - Look for circular dependencies

2. **Routing issues**:
   - Ensure routes are properly configured
   - Check for conflicting route patterns

3. **State management problems**:
   - Verify context providers are properly nested
   - Check for unhandled promises in effects

For more detailed guidance, refer to the full documentation in the `docs/` directory.
