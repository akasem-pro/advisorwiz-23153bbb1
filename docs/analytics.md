
# Analytics System Documentation

## Overview

AdvisorWiz includes a comprehensive analytics system that tracks user behavior, application performance, and business metrics. The system is designed to be privacy-conscious while providing valuable insights into user engagement and application performance.

## Architecture

The analytics system consists of several layers:

1. **Event Trackers**: Capture raw user interactions and system events
2. **Data Processors**: Process and enrich raw events
3. **Storage Layer**: Persists analytics data
4. **Reporting Layer**: Visualizes and analyzes data

## Event Types

The system tracks several types of events:

### User Behavior Events

```typescript
enum UserBehaviorEvent {
  PAGE_VIEW = 'page_view',
  SIGN_UP = 'sign_up',
  LOGIN = 'login',
  PROFILE_VIEW = 'profile_view',
  // ...additional events
}
```

### Performance Metrics

- Page load time
- Time to interactive
- First contentful paint
- API response times
- Resource loading metrics
- JavaScript execution times

### Business Metrics

- Match rate
- Engagement rate
- Conversion rate
- Retention rate
- Client acquisition cost

## Tracking Implementation

### User Behavior Tracking

```typescript
import { trackUserBehavior } from '@/utils/analytics/eventTracker';

// Track a standard event
trackUserBehavior(UserBehaviorEvent.PROFILE_VIEW, {
  profile_id: '123',
  source: 'search_results'
});

// Track a custom event
trackUserBehavior('custom_event', {
  custom_property: 'value'
});
```

### Feature Usage Tracking

```typescript
import { trackFeatureUsage } from '@/utils/analytics/eventTracker';

trackFeatureUsage('match_filters', {
  filter_type: 'location',
  filter_value: 'New York'
});
```

### Page View Tracking

```typescript
import { trackPageView } from '@/utils/analytics/pageTracker';

trackPageView('Dashboard', '/dashboard', {
  referrer: document.referrer
});
```

### Performance Tracking

```typescript
import { trackPerformanceMetric } from '@/services/performance/trackingUtils';

trackPerformanceMetric('api_response_time', 350, {
  tags: { endpoint: '/api/matches', method: 'GET' },
  persist: true
});
```

## React Hooks

The system provides several React hooks for easy integration:

### useTrackPageView

```typescript
import { useTrackPageView } from '@/hooks/use-analytics';

// In your component
useTrackPageView('Dashboard');
```

### useGA4Analytics

```typescript
import { useGA4Analytics } from '@/hooks/useGA4Analytics';

// In your component
const { pageViews, eventCount, isLoading } = useGA4Analytics(
  startDate,
  endDate
);
```

## Privacy Considerations

The analytics system respects user privacy:

1. **Cookie Consent**: Tracking respects cookie consent settings
2. **Data Anonymization**: Personal identifiers are hashed or removed
3. **Data Retention**: Analytics data is retained according to policy
4. **Opt-Out Mechanism**: Users can opt out of non-essential tracking

```typescript
// Example of privacy-aware tracking
const isAnalyticsTrackingAllowed = (): boolean => {
  const consent = localStorage.getItem('cookie-consent');
  if (!consent) return false;
  
  const settings = localStorage.getItem('cookie-settings');
  if (settings) {
    const parsedSettings = JSON.parse(settings);
    return parsedSettings.analytics === true;
  }
  
  return true;
};
```

## Integration with External Analytics

The system integrates with external analytics services:

1. **Google Analytics 4**: For website analytics
2. **Meta Pixel**: For conversion tracking
3. **Custom Backend Analytics**: For business metrics

## Data Flow

1. Events are captured via tracking functions
2. Events are enriched with metadata (timestamp, user info, etc.)
3. Events are buffered in memory for batching
4. Events are persisted to storage or sent to external analytics
5. Data is processed and analyzed for reporting

## Performance Considerations

The analytics system is designed to minimize performance impact:

1. **Asynchronous Processing**: Analytics processing happens off the main thread
2. **Batching**: Events are batched to reduce network requests
3. **Throttling**: High-frequency events are throttled
4. **Lazy Loading**: Analytics libraries are loaded after critical content

## Dashboard and Reporting

Analytics data is visualized in several dashboards:

1. **Admin Dashboard**: Overall application metrics
2. **User Engagement Dashboard**: User behavior and engagement
3. **Performance Dashboard**: Application performance metrics
4. **Business Metrics Dashboard**: Conversion and retention metrics

## Extending the Analytics System

To track new events:

1. Define the event type in the appropriate enum
2. Use the tracking functions to capture the event
3. Update the data processing logic if needed
4. Add the event to the relevant dashboard

## Testing Analytics

The system includes utilities for testing analytics:

```typescript
import { MockAnalytics } from '@/utils/analytics/testing';

// In your test
const mockAnalytics = new MockAnalytics();
mockAnalytics.trackEvent('test_event');
expect(mockAnalytics.getEvents()).toContainEqual({
  name: 'test_event',
  properties: {}
});
```
