
# Types Organization

This directory contains TypeScript type definitions organized by domain to improve maintainability and readability.

## Structure

The types are organized into domain-specific files:

- **userTypes.ts**: Re-exports all types from the domain-specific files. Use this file when you need to import multiple types across domains.
- **profileTypes.ts**: Contains user profile related types for both consumers and advisors (`ConsumerProfile`, `AdvisorProfile`, `UserType`).
- **timeTypes.ts**: Time-related types (`TimeSlot`, `Appointment`, `AppointmentStatus`, `AppointmentCategory`).
- **locationTypes.ts**: Geographic location types (`Location`).
- **serviceTypes.ts**: Service categories and offerings (`ServiceCategory`).
- **chatTypes.ts**: Chat and messaging types (`ChatMessage`, `Chat`).
- **notificationTypes.ts**: Notification system types (`Notification`).
- **reviewTypes.ts**: User review types (`Review`).
- **firmTypes.ts**: Financial firm types (`FinancialFirm`).
- **compatibilityTypes.ts**: Matching and compatibility types (`CompatibilityScore`).
- **callTypes.ts**: Call/video session types (`CallSession`, `CallStatus`, `CallType`, `CallMetrics`).
- **leadTypes.ts**: Lead tracking types (`Lead`, `LeadStatus`, `LeadSource`, `LeadStats`).
- **blogTypes.ts**: Blog content types (`BlogPost`, `BlogAuthor`).
- **advisorTypes.ts**: Extended advisor types for forms and UI components.

## Guidelines for Adding New Types

1. **Domain-First**: Add new types to the most relevant domain-specific file.
2. **Avoid Circular Dependencies**: Be careful about creating circular imports between type files.
3. **Re-export from userTypes.ts**: After adding a new type to a domain file, make sure it's re-exported from userTypes.ts if it's commonly used.
4. **Create New Files When Needed**: If you're adding types for an entirely new domain that doesn't fit into existing files, create a new file named `[domain]Types.ts`.
5. **Maintain Cross-References**: Update imports in components and hooks that use these types.

## Code Example

```typescript
// Example: Adding a new type to the timeTypes.ts file

// In src/types/timeTypes.ts
export type SchedulePreference = {
  preferredDays: Array<'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday'>;
  preferredTimeOfDay: Array<'morning' | 'afternoon' | 'evening'>;
  frequency: 'weekly' | 'biweekly' | 'monthly';
};

// In src/types/userTypes.ts
// Make sure to re-export any new type files
export * from './timeTypes';
```
