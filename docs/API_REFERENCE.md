
# API Reference

This document provides an overview of the core APIs used in the AdvisorWiz application.

## Authentication API

### User Registration

```typescript
signUp(email: string, password: string, metadata?: { userType?: 'advisor' | 'consumer' | 'firm' }): Promise<AuthResponse>
```

Registers a new user with email and password.

### User Login

```typescript
signIn(email: string, password: string): Promise<AuthResponse>
```

Authenticates an existing user.

### Password Reset

```typescript
resetPassword(email: string): Promise<{ success: boolean }>
```

Initiates the password reset flow for the specified email.

### Session Management

```typescript
getSession(): Promise<Session | null>
refreshSession(): Promise<Session | null>
signOut(): Promise<void>
```

Methods for managing user sessions.

## Matching System API

### Core Matching Functions

```typescript
calculateCompatibility(
  advisorId: string, 
  consumerId: string, 
  options?: MatchingOptions
): Promise<CompatibilityResult>
```

Calculates compatibility between an advisor and consumer.

```typescript
findTopMatches(
  consumerId: string, 
  count: number = 5, 
  filters?: MatchFilters
): Promise<CompatibilityResult[]>
```

Finds top advisor matches for a consumer.

### Matching Filters

```typescript
interface MatchFilters {
  expertise?: string[];
  languages?: string[];
  availability?: {
    daysOfWeek?: number[];
    timeRanges?: Array<{start: string, end: string}>;
  };
  location?: {
    radius?: number;
    coordinates?: {lat: number, lng: number};
  };
  riskTolerance?: 'low' | 'moderate' | 'high';
  fees?: {
    structureTypes?: string[];
    maxHourlyRate?: number;
    maxFlatFee?: number;
  };
}
```

Filter structure for refining match results.

### Compatibility Result

```typescript
interface CompatibilityResult {
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
}
```

Structure of compatibility calculation results.

## Profile API

### Profile Management

```typescript
getAdvisorProfile(advisorId: string): Promise<AdvisorProfile>
getConsumerProfile(consumerId: string): Promise<ConsumerProfile>
updateAdvisorProfile(advisorId: string, data: Partial<AdvisorProfile>): Promise<AdvisorProfile>
updateConsumerProfile(consumerId: string, data: Partial<ConsumerProfile>): Promise<ConsumerProfile>
```

Methods for retrieving and updating user profiles.

### Profile Search

```typescript
searchAdvisors(query: string, filters?: SearchFilters): Promise<AdvisorProfile[]>
```

Search for advisors based on query string and filters.

## Appointment API

### Appointment Management

```typescript
createAppointment(appointmentData: AppointmentCreationData): Promise<Appointment>
updateAppointment(appointmentId: string, updates: Partial<Appointment>): Promise<Appointment>
cancelAppointment(appointmentId: string, reason?: string): Promise<Appointment>
getAppointmentsForAdvisor(advisorId: string, timeRange?: TimeRange): Promise<Appointment[]>
getAppointmentsForConsumer(consumerId: string, timeRange?: TimeRange): Promise<Appointment[]>
```

Methods for managing appointments.

## Chat API

### Messaging

```typescript
sendMessage(chatData: {
  senderId: string;
  recipientId: string;
  message: string;
  attachments?: Attachment[];
}): Promise<ChatMessage>

getConversation(participantIds: string[]): Promise<ChatMessage[]>

markAsRead(messageIds: string[]): Promise<void>
```

Methods for chat functionality.

## Notification API

```typescript
getNotifications(userId: string): Promise<Notification[]>
markNotificationAsRead(notificationId: string): Promise<void>
subscribeToNotifications(userId: string, callback: (notification: Notification) => void): Unsubscribe
```

Methods for handling user notifications.

## Analytics API

```typescript
trackEvent(eventName: string, properties?: Record<string, any>): void
trackPageView(path: string, title?: string): void
identifyUser(userId: string, traits?: Record<string, any>): void
```

Methods for tracking user behavior and application events.

## Error Handling

Most API methods return promises that can reject with structured error objects:

```typescript
interface ApiError {
  code: string;
  message: string;
  details?: unknown;
}
```

Common error codes:
- `authentication/not-authenticated`: User is not authenticated
- `authorization/insufficient-permissions`: User lacks required permissions
- `validation/invalid-input`: Request contains invalid data
- `not-found`: Requested resource does not exist
- `rate-limit-exceeded`: Too many requests
- `server-error`: Unexpected server error

For detailed API implementation, refer to the service files in the `src/services/` directory.
