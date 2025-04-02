
# Performance Monitoring System

## Overview

AdvisorWiz implements a comprehensive performance monitoring system that tracks application performance metrics, Core Web Vitals, and user experience. This document describes the architecture, integration points, and usage guidelines.

## Architecture

The performance monitoring system is organized into several specialized modules:

```
┌─────────────────────┐     ┌────────────────────────┐
│                     │     │                        │
│  Core               │◄────│  Web Vitals            │
│  (Basic Metrics)    │     │  (Core Web Vitals)     │
└─────────┬───────────┘     └────────────────────────┘
          │                             ▲
          │                             │
          ▼                             │
┌─────────────────────┐     ┌────────────────────────┐
│                     │     │                        │
│  Enhanced Tracking  │     │  Function Tracking     │
│  (Batching/Storage) │     │  (Component/Function)  │
└─────────────────────┘     └────────────────────────┘
          ▲                             ▲
          │                             │
          └─────────────────────────────┘
                  Integration
                       │
                       ▼
┌─────────────────────────────────────────┐
│                                         │
│  Analytics Integration                  │
│  (GA4, A/B Testing, User Behavior)      │
└─────────────────────────────────────────┘
```

## Key Components

### 1. Core Web Vitals Tracking

Monitors the essential metrics defined by Google's Core Web Vitals initiative:

- **LCP (Largest Contentful Paint)**: Measures loading performance
- **FID (First Input Delay)**: Measures interactivity
- **CLS (Cumulative Layout Shift)**: Measures visual stability
- **INP (Interaction to Next Paint)**: Measures responsiveness
- **TTFB (Time to First Byte)**: Measures server response time
- **FCP (First Contentful Paint)**: Measures initial render time

These metrics are automatically tracked and reported to analytics systems.

### 2. Enhanced Performance Tracking

Provides advanced capabilities:

- **Metrics Batching**: Groups metrics for efficient reporting
- **Persistence**: Stores metrics across page reloads
- **Deduplicated Events**: Prevents redundant metric tracking
- **Priority-based Tracking**: Focuses on critical user paths

### 3. Function and Component Tracking

Enables granular performance measurements:

- **HOC Wrapper**: `withPerformanceTracking` for function-level tracking
- **Hooks**: Custom hooks for component-level measurement
- **Marks and Measures**: API for creating custom performance spans

### 4. Analytics Integration

Connects performance data with business metrics:

- **GA4 Reporting**: Sends metrics to Google Analytics
- **A/B Test Correlation**: Ties performance to specific test variants
- **User Behavior Correlation**: Links performance to user actions

## Usage Guidelines

### Basic Performance Marking

```typescript
import { recordPerformanceMark } from './utils/performance';

// Record a simple timestamp
recordPerformanceMark('feature-loaded');

// Create a duration measurement
recordPerformanceMark('operation-start');
// ...expensive operation...
recordPerformanceMark('operation-end', 'operation-duration', 'operation-start');
```

### Enhanced Tracking

```typescript
import { trackEnhancedPerformance } from './utils/performance/enhancedPerformanceTracking';

// Track with tags and persistence
trackEnhancedPerformance('critical-operation', durationMs, {
  tags: { feature: 'matching', userId: '123' },
  persist: true, // Survive page reloads
  sendImmediately: true // Don't batch
});
```

### Component Tracking

```typescript
import { withPerformanceTracking } from './utils/performance';

// Track function execution time
const optimizedFunction = withPerformanceTracking(
  expensiveFunction, 
  'expensive-function'
);

// Use it in a component
function MyComponent() {
  useEffect(() => {
    recordPerformanceMark('component-mounted');
    return () => recordPerformanceMark('component-unmounted');
  }, []);
  
  // ...
}
```

### A/B Testing Integration

```typescript
// Performance metrics will automatically be correlated with active A/B tests
// when using the provided tracking utilities
```

## Best Practices

1. **Measure Meaningful Events**: Focus on metrics that impact user experience
2. **Avoid Overdoing It**: Too many marks can impact performance
3. **Track Long Operations**: Any operation taking >100ms should be measured
4. **Label Clearly**: Use consistent, descriptive names
5. **Monitor Trends**: Look for patterns and regressions over time
6. **Correlate With Business Metrics**: Connect performance to user outcomes
7. **Test Across Devices**: Monitor both high and low-end devices

## Initialization

The performance monitoring system is automatically initialized in `main.tsx` and `App.tsx`. No manual initialization is typically needed.

## Debugging

To view collected metrics during development:

1. Open browser DevTools
2. Navigate to the Performance or Network tab
3. Check for console logs tagged with `[Performance]`
4. Use the Performance API: `performance.getEntriesByType('measure')`

## Extending The System

To add new metric types:

1. Define the metric in the appropriate module
2. Create collection and reporting functions
3. Update analytics integrations if needed
4. Document the new metric

## Resources

- [Web Vitals Documentation](https://web.dev/vitals/)
- [User-centric Performance Metrics](https://web.dev/user-centric-performance-metrics/)
- [GA4 Metrics Collection](https://developers.google.com/analytics/devguides/collection/ga4/set-up-performance)

