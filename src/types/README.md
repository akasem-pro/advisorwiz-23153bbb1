
# Types Organization

This directory contains TypeScript type definitions organized by domain to improve maintainability and readability.

## Structure

The types are organized into domain-specific files:

- **userTypes.ts**: Re-exports all types from the domain-specific files. Use this file when you need to import multiple types across domains.
- **profileTypes.ts**: Contains user profile related types for both consumers and advisors (`ConsumerProfile`, `AdvisorProfile`, `UserType`).
- **timeTypes.ts**: Time-related types (`TimeSlot`, `Appointment`, `AppointmentStatus`, `AppointmentCategory`).
- **locationTypes.ts**: Geographic location types (`Location`, `Coordinates`, `Address`).
- **serviceTypes.ts**: Service categories and offerings (`ServiceCategory`, `ServiceOffering`).
- **chatTypes.ts**: Chat and messaging types (`ChatMessage`, `Chat`, `MessageStatus`).
- **notificationTypes.ts**: Notification system types (`Notification`, `NotificationType`).
- **reviewTypes.ts**: User review types (`Review`, `Rating`).
- **firmTypes.ts**: Financial firm types (`FinancialFirm`, `FirmMember`).
- **compatibilityTypes.ts**: Matching and compatibility types (`CompatibilityScore`, `MatchExplanation`).
- **callTypes.ts**: Call/video session types (`CallSession`, `CallStatus`, `CallType`, `CallMetrics`).
- **leadTypes.ts**: Lead tracking types (`Lead`, `LeadStatus`, `LeadSource`, `LeadStats`).
- **blogTypes.ts**: Blog content types (`BlogPost`, `BlogAuthor`, `BlogCategory`).
- **advisorTypes.ts**: Extended advisor types for forms and UI components.

## Core Type Structures

### User and Profile Types

```typescript
// Basic user types
export type UserType = 'advisor' | 'consumer' | 'firm' | 'admin';

// Profile interfaces
export interface BaseProfile {
  id: string;
  userId: string;
  name: string;
  email: string;
  profilePicture?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdvisorProfile extends BaseProfile {
  // Advisor-specific fields
}

export interface ConsumerProfile extends BaseProfile {
  // Consumer-specific fields
}
```

### Matching and Compatibility Types

```typescript
export interface CompatibilityScore {
  advisorId: string;
  consumerId: string;
  overallScore: number;
  categoryScores: {
    expertise: number;
    availability: number;
    language: number;
    location: number;
    riskAlignment: number;
  };
  explanation: MatchExplanation[];
  calculatedAt: string;
}

export type MatchExplanation = {
  category: CompatibilityCategory;
  score: number;
  reason: string;
  details?: Record<string, any>;
};
```

## Guidelines for Adding New Types

1. **Domain-First**: Add new types to the most relevant domain-specific file.
2. **Avoid Circular Dependencies**: Be careful about creating circular imports between type files.
3. **Re-export from userTypes.ts**: After adding a new type to a domain file, make sure it's re-exported from userTypes.ts if it's commonly used.
4. **Create New Files When Needed**: If you're adding types for an entirely new domain that doesn't fit into existing files, create a new file named `[domain]Types.ts`.
5. **Maintain Cross-References**: Update imports in components and hooks that use these types.
6. **Document Complex Types**: Add JSDoc comments to complex types explaining their purpose and usage.

## Code Example

```typescript
// Example: Adding a new type to the timeTypes.ts file

// In src/types/timeTypes.ts
/**
 * Defines a user's schedule preferences for recurring appointments
 */
export type SchedulePreference = {
  preferredDays: Array<'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday'>;
  preferredTimeOfDay: Array<'morning' | 'afternoon' | 'evening'>;
  frequency: 'weekly' | 'biweekly' | 'monthly';
};

// In src/types/userTypes.ts
// Make sure to re-export any new type files
export * from './timeTypes';
```

## Best Practices

- Use interfaces for objects that will be extended
- Use type aliases for unions, intersections, and tuple types
- Prefer readonly properties for immutable values
- Leverage TypeScript's utility types like Partial<T>, Required<T>, etc.
- Keep type definitions focused and single-purpose
- Use comments to explain complex or non-obvious types

## Type Validation

For runtime type validation, the application uses Zod schemas defined in various service files. These schemas should match the TypeScript types defined here.
