
# Code Standards

This document outlines the coding standards and conventions used in the AdvisorWiz project.

## General Guidelines

- Follow the principle of single responsibility
- Keep components small and focused
- Write self-documenting code with meaningful names
- Prioritize readability over cleverness

## Naming Conventions

### Files and Directories

- **Component Files**: PascalCase (e.g., `Button.tsx`, `UserProfile.tsx`)
- **Hook Files**: camelCase with `use` prefix (e.g., `useAuth.tsx`, `useMatchingAlgorithm.tsx`)
- **Utility Files**: camelCase (e.g., `formatters.ts`, `validators.ts`)
- **Test Files**: Same name as the file they test with `.test.tsx` or `.spec.tsx` suffix

### Variables and Functions

- **Variables**: camelCase, descriptive names
- **Functions**: camelCase, verb-first for actions (e.g., `fetchUser`, `calculateScore`)
- **Boolean Variables**: Prefix with `is`, `has`, `should` (e.g., `isLoading`, `hasError`)
- **Constants**: UPPER_SNAKE_CASE for truly constant values

## Component Structure

```typescript
// Imports organized by external, internal, then relative
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '../ui/button';
import { formatDate } from '../../utils/formatters';

// Props interface
interface ComponentNameProps {
  id: string;
  title: string;
  onAction: () => void;
}

// Component declaration
const ComponentName: React.FC<ComponentNameProps> = ({ id, title, onAction }) => {
  // State declarations
  const [isOpen, setIsOpen] = useState(false);
  
  // Hooks
  const { data, isLoading } = useQuery({...});
  
  // Side effects
  useEffect(() => {
    // Effect logic
    return () => {
      // Cleanup logic
    };
  }, [dependency]);
  
  // Event handlers
  const handleClick = () => {
    setIsOpen(true);
    onAction();
  };
  
  // Conditional rendering
  if (isLoading) return <LoadingState />;
  
  // JSX
  return (
    <div className="...">
      {/* Components and markup */}
    </div>
  );
};

export default ComponentName;
```

## Styling

- Use Tailwind CSS for styling components
- Follow utility-first CSS approach
- For complex styles, use composition with `cn` utility
- Keep styling close to the component

## TypeScript

- Prefer explicit typing over inferred types for props and function returns
- Use interfaces for object shapes that represent entities
- Use type aliases for unions, intersections, and simple object types
- Avoid `any` - use `unknown` when type is truly unknown
- Leverage TypeScript's structural typing

## Testing

- Write tests for critical business logic
- Test components for correct rendering and behavior
- Use React Testing Library for component tests
- Mock external dependencies
- Focus on testing behavior, not implementation details

## State Management

- Use local state for simple, component-specific state
- Use context for state that needs to be accessed by multiple components
- Consider using useReducer for complex state logic
- Use React Query for server state

## Performance

- Memoize expensive calculations with useMemo
- Prevent unnecessary re-renders with React.memo and useCallback
- Split code into smaller chunks for lazy loading
- Monitor and optimize rendering performance

## Accessibility

- All interactive elements must be keyboard accessible
- Use semantic HTML elements
- Include appropriate ARIA attributes where necessary
- Ensure sufficient color contrast
- Test with screen readers

## Error Handling

- Use try/catch for async operations
- Implement error boundaries for component errors
- Provide useful error messages for users
- Log errors for debugging
