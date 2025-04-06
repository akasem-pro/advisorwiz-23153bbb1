
# TypeScript Type System Documentation

## Overview

AdvisorWiz uses TypeScript to provide type safety throughout the application. This document outlines the type system organization, conventions, and best practices.

## Type Organization

Types are organized in the following way:

1. **Domain-specific types**: Located in `/src/types/` categorized by domain
2. **Component props**: Defined with interfaces in the component files
3. **API response types**: Located in `/src/services/api/types/`
4. **Utility types**: Located in `/src/types/utils.ts`

## Core Type Modules

### User Types

```typescript
// /src/types/userTypes.ts
export type UserType = 'consumer' | 'advisor' | 'firm_admin';

export interface UserProfile {
  id: string;
  email: string;
  userType: UserType;
  displayName?: string;
  profileComplete: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ConsumerProfile extends UserProfile {
  userType: 'consumer';
  financialGoals?: string[];
  investmentPreferences?: InvestmentPreferences;
  riskTolerance?: RiskToleranceLevel;
  // Additional consumer-specific fields
}

export interface AdvisorProfile extends UserProfile {
  userType: 'advisor';
  expertise: string[];
  certifications: string[];
  yearsOfExperience: number;
  firmId?: string;
  // Additional advisor-specific fields
}

export interface FirmAdminProfile extends UserProfile {
  userType: 'firm_admin';
  firmId: string;
  role: FirmRole;
  // Additional firm admin-specific fields
}
```

### Matching Types

```typescript
// /src/types/matchingTypes.ts
export interface MatchResult {
  advisorId: string;
  consumerId: string;
  score: number;
  matchDate: Date;
  matchFactors: MatchFactor[];
}

export interface MatchFactor {
  name: string;
  weight: number;
  score: number;
  description: string;
}

export type MatchSortOption = 'score' | 'experience' | 'location' | 'reviews';

export interface MatchPreferences {
  priorityFactors: string[];
  excludeFactors: string[];
  locationRadius?: number;
  feeRanges?: FeeRange[];
}
```

### API Types

```typescript
// /src/services/api/types/responses.ts
export interface ApiResponse<T> {
  data?: T;
  error?: ApiError;
  metadata?: ApiMetadata;
}

export interface ApiError {
  code: string;
  message: string;
  details?: any;
}

export interface ApiMetadata {
  timestamp: string;
  requestId: string;
  processing_time_ms: number;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  metadata: PaginationMetadata & ApiMetadata;
}

export interface PaginationMetadata {
  page: number;
  per_page: number;
  total_items: number;
  total_pages: number;
}
```

## Type Utilities

```typescript
// /src/types/utils.ts
export type Nullable<T> = T | null;

export type Optional<T> = T | undefined;

export type AsyncReturnType<T extends (...args: any) => Promise<any>> = 
  T extends (...args: any) => Promise<infer R> ? R : any;

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type ValueOf<T> = T[keyof T];
```

## Component Props Pattern

All component props are defined using TypeScript interfaces:

```typescript
interface ButtonProps {
  variant?: 'default' | 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'default',
  size = 'md',
  children,
  onClick,
  disabled,
  className,
}) => {
  // Component implementation
};
```

## Type Guards

Type guards are used to narrow types at runtime:

```typescript
// User type guards
export function isConsumer(user: UserProfile): user is ConsumerProfile {
  return user.userType === 'consumer';
}

export function isAdvisor(user: UserProfile): user is AdvisorProfile {
  return user.userType === 'advisor';
}

export function isFirmAdmin(user: UserProfile): user is FirmAdminProfile {
  return user.userType === 'firm_admin';
}
```

## Enum Pattern

Enums are used for predefined sets of values:

```typescript
export enum ErrorCategory {
  NETWORK = 'network',
  AUTH = 'authentication',
  VALIDATION = 'validation',
  DATABASE = 'database',
  UNKNOWN = 'unknown'
}

export enum ErrorSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  FATAL = 'fatal'
}
```

## Generic Components

Generic components are used for reusable patterns:

```typescript
interface DataListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  keyExtractor: (item: T) => string;
  emptyState?: React.ReactNode;
  isLoading?: boolean;
  loadingComponent?: React.ReactNode;
}

function DataList<T>({
  items,
  renderItem,
  keyExtractor,
  emptyState,
  isLoading,
  loadingComponent,
}: DataListProps<T>) {
  // Component implementation
}
```

## Type Assertion Best Practices

When type assertions are necessary, they should be used carefully:

```typescript
// Prefer type assertions with as over forcing with <T>
const user = response.data as UserProfile;

// Use unknown as an intermediate step for safer assertions
const data = JSON.parse(response) as unknown as UserData;

// Better: Use type guards instead of assertions when possible
if (isUserProfile(data)) {
  // data is now typed as UserProfile
}
```

## Extending Third-Party Types

When extending third-party types:

```typescript
// Extending React's HTMLAttributes
interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

// Extending Supabase types
export interface EnhancedSupabaseUser extends SupabaseUser {
  profile?: UserProfile;
}
```

## State Management Types

Types for state management:

```typescript
// For Context
export interface AuthContextState {
  user: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

export interface AuthContextActions {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (email: string, password: string, userType: UserType) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

export interface AuthContextValue extends AuthContextState, AuthContextActions {}
```

## Path Aliases

The project uses TypeScript path aliases for cleaner imports:

```typescript
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@hooks/*": ["src/hooks/*"],
      "@utils/*": ["src/utils/*"],
      "@types/*": ["src/types/*"]
    }
  }
}
```

## API Integration Types

Types for API integration:

```typescript
export interface UseQueryOptions<TData, TError> {
  enabled?: boolean;
  retry?: boolean | number;
  retryDelay?: number;
  staleTime?: number;
  cacheTime?: number;
  refetchOnWindowFocus?: boolean;
  onSuccess?: (data: TData) => void;
  onError?: (error: TError) => void;
}

export interface QueryResult<TData, TError = unknown> {
  data: TData | undefined;
  error: TError | null;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  refetch: () => Promise<TData>;
}
```
