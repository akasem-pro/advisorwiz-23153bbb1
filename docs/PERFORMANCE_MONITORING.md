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
└─────────────────────┘     └────────────────���───────┘
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

### 1. Core Module (`/utils/performance/core.ts`)

Provides fundamental performance tracking capabilities:

- **Performance Marking**: Create timestamps for key events
- **Performance Measuring**: Calculate durations between marks
- **Entry Management**: Create, retrieve, and clear performance entries
- **Initialization**: Set up the performance monitoring system

```typescript
// Core functionality
recordPerformanceMark('feature-started');
recordPerformanceMark('feature-completed', 'feature-duration', 'feature-started');
```

### 2. Web Vitals Module (`/utils/performance/webVitals.ts`)

Monitors the essential metrics defined by Google's Core Web Vitals initiative:

- **LCP (Largest Contentful Paint)**: Measures loading performance
- **FID (First Input Delay)**: Measures interactivity
- **CLS (Cumulative Layout Shift)**: Measures visual stability
- **INP (Interaction to Next Paint)**: Measures responsiveness
- **TTFB (Time to First Byte)**: Measures server response time
- **FCP (First Contentful Paint)**: Measures initial render time

These metrics are automatically tracked and reported to analytics systems.

### 3. Enhanced Performance Tracking (`/utils/performance/enhancedPerformanceTracking.ts`)

Provides advanced capabilities:

- **Metrics Batching**: Groups metrics for efficient reporting
- **Persistence**: Stores metrics across page reloads
- **Deduplicated Events**: Prevents redundant metric tracking
- **Priority-based Tracking**: Focuses on critical user paths
- **Tagging System**: Adds metadata to metrics for better analysis

```typescript
trackEnhancedPerformance('critical-operation', durationMs, {
  tags: { feature: 'matching', userId: '123' },
  persist: true,
  sendImmediately: true
});
```

### 4. Function Tracking Module (`/utils/performance/functionTracking.ts`)

Enables granular performance measurements:

- **HOC Wrapper**: `withPerformanceTracking` for function-level tracking
- **Hooks**: Custom hooks for component-level measurement

```typescript
const optimizedFunction = withPerformanceTracking(
  expensiveFunction, 
  'expensive-function'
);
```

### 5. Analytics Integration

Connects performance data with business metrics:

- **GA4 Reporting**: Sends metrics to Google Analytics
- **A/B Test Correlation**: Ties performance to specific test variants
- **User Behavior Correlation**: Links performance to user actions

## Initialization

The performance monitoring system is initialized in two places:

1. **Early Initialization**: In `main.tsx` to capture early metrics like TTFB
2. **Full Initialization**: In `App.tsx` to set up all monitoring components

```typescript
// In main.tsx
import { initPerformanceMonitoring } from './utils/performance';
initPerformanceMonitoring();

// In App.tsx
useEffect(() => {
  initPerformanceMonitoring();
  // Other initializations...
}, []);
```

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
import { trackEnhancedPerformance } from './utils/performance';

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

The performance monitoring system automatically correlates metrics with active A/B tests when using the provided tracking utilities:

```typescript
// In A/B test variant
import { trackVariantImpression, trackVariantConversion } from '../utils/abTesting';

// Track impression
trackVariantImpression('pricing-test', 'variant-a');

// Track conversion
trackVariantConversion('pricing-test', 'variant-a', 'signup');
```

## Performance Impact Analysis

The system provides tools to analyze how code changes impact performance:

1. **Before/After Comparison**: Track metrics before and after changes
2. **A/B Test Integration**: Compare metrics between variants
3. **User Segment Analysis**: Break down metrics by user type, device, etc.
4. **Real User Monitoring**: Track metrics from actual users

Example of impact analysis workflow:

```typescript
// Before change
trackEnhancedPerformance('feature-old', oldDurationMs);

// After change
trackEnhancedPerformance('feature-new', newDurationMs);

// Later, analyze the difference through the analytics dashboard
```

## Best Practices

1. **Measure Meaningful Events**: Focus on metrics that impact user experience
2. **Avoid Overdoing It**: Too many marks can impact performance
3. **Track Long Operations**: Any operation taking >100ms should be measured
4. **Label Clearly**: Use consistent, descriptive names
5. **Monitor Trends**: Look for patterns and regressions over time
6. **Correlate With Business Metrics**: Connect performance to user outcomes
7. **Test Across Devices**: Monitor both high and low-end devices

## Debugging

To view collected metrics during development:

1. Open browser DevTools
2. Navigate to the Performance or Network tab
3. Check for console logs tagged with `[Performance]`
4. Use the Performance API: `performance.getEntriesByType('measure')`

## Common Issues and Solutions

| Issue | Possible Solution |
|-------|------------------|
| Missing metrics | Check initialization in main.tsx and App.tsx |
| Duplicate metrics | Ensure metrics aren't recorded in loops or frequently re-rendering components |
| High memory usage | Reduce metric persistence or implementation batching |
| Performance impact | Ensure tracking code itself isn't causing performance issues |

## Extending The System

To add new metric types:

1. Define the metric in the appropriate module
2. Create collection and reporting functions
3. Update analytics integrations if needed
4. Document the new metric

## Related Resources

- [Web Vitals Documentation](https://web.dev/vitals/)
- [User-centric Performance Metrics](https://web.dev/user-centric-performance-metrics/)
- [GA4 Metrics Collection](https://developers.google.com/analytics/devguides/collection/ga4/set-up-performance)
- [Performance API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Performance_API)
