
# Analytics System Documentation

This document provides an overview of the analytics system used in AdvisorWiz.

## Architecture

Our analytics system follows a modular design with these key components:

1. **Core Definitions** (`types/analytics.d.ts`): Centralized type definitions for analytics integrations
2. **Trackers** (`utils/analytics/trackers/`): Implementation of specific analytics providers
3. **Utility Functions** (`utils/analytics/`): Specialized tracking helpers for different features
4. **Service Providers** (`services/analytics/providers/`): Provider implementations for core analytics service
5. **React Hooks** (`hooks/useAnalytics.ts`, etc.): Component-level integration points

## Privacy Compliance

All tracking functions respect user consent settings. Analytics events will only be sent if:

- The user has accepted analytics cookies
- The specific tracking type is allowed in user preferences

Cookie settings are managed through the `cookieBanner.ts` module.

## Available Tracking Methods

### Page Tracking
```typescript
// Track a page view
trackPageView(pageTitle, pagePath, properties);

// React hook for automatic page tracking
useTrackPageView(pageName);
```

### User Behavior
```typescript
// Track general user behavior
trackUserBehavior(UserBehaviorEvent.FEATURE_USED, properties);

// Track feature usage
trackFeatureUsage('feature_name', properties);
```

### Specialized Tracking
```typescript
// Track match engagement
trackMatchEngagement('view_profile', matchId, score, advisorId, properties);

// Track appointments
trackAppointmentEvent('scheduled', appointmentId, properties);

// Track leads
trackLeadEvent('created', leadId, properties);
```

## Adding a New Tracking Provider

1. Create a new tracker in `utils/analytics/trackers/`
2. Export the tracker from `trackers/index.ts`
3. Update the `TrackingConfig` interface if needed
4. Create a provider implementation in `services/analytics/providers/`

## Best Practices

1. **Respect User Privacy**: Always check for user consent before tracking
2. **Minimize Data Collection**: Only track what's necessary
3. **Batch Events**: Use batching for high-frequency events
4. **Error Handling**: Implement proper error handling to prevent affecting the user experience
5. **Documentation**: Document new tracking events and their parameters

## Testing

Test analytics implementations by:

1. Using mock implementations during testing
2. Verifying tracking calls with spy functions
3. Testing both the success and failure paths
4. Checking that consent settings are respected

