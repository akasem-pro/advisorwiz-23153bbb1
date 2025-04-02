# Performance Monitoring System

This document explains the performance monitoring system implemented in AdvisorWiz, including its architecture, usage guidelines, and best practices.

## Overview

AdvisorWiz includes a comprehensive performance monitoring system that tracks:

1. **Core Web Vitals**: LCP, FID, CLS, INP
2. **Custom Metrics**: Component render times, algorithm execution times
3. **User Experience Metrics**: Interaction delays, response times
4. **Business Metrics**: Match quality correlation, conversion impacts

The system is designed to:
- Identify performance bottlenecks
- Track performance trends over time
- Correlate performance with business outcomes
- Support A/B testing experiments
- Alert on performance regressions

## Architecture

The performance monitoring system consists of several interconnected components:

```
┌─────────────────────┐     ┌─────────────────────┐     ┌─────────────────────┐
│                     │     │                     │     │                     │
│  Core Monitoring    │────▶│  Enhanced Tracking  │────▶│  Analytics          │
│  (Web Vitals)       │     │  (Custom Metrics)   │     │  Integration        │
│                     │     │                     │     │                     │
└─────────────────────┘     └─────────────────────┘     └─────────────────────┘
          │                           │                           │
          │                           │                           │
          ▼                           ▼                           ▼
┌─────────────────────┐     ┌─────────────────────┐     ┌─────────────────────┐
│                     │     │                     │     │                     │
│  Performance        │     │  Metric             │     │  Reporting &        │
│  Optimization       │◀────│  Processing         │◀────│  Visualization      │
│                     │     │                     │     │                     │
└─────────────────────┘     └─────────────────────┘     └─────────────────────┘
```

## Core Components

### 1. Web Vitals Tracking

The system captures all Core Web Vitals using the `web-vitals` library:

```typescript
// From src/utils/performance/webVitals.ts
export const trackWebVitals = (): void => {
  if (typeof window !== 'undefined') {
    import('web-vitals').then(({ onCLS, onFID, onFCP, onLCP, onTTFB, onINP }) => {
      onCLS(metric => {
        const rating = getRating('CLS', metric.value);
        storeAnalyticsMetric('vitals_cls', metric.value);
        processMetric(metric, rating);
      });
      
      // ... other metrics similarly tracked
    });
  }
};
```

### 2. Enhanced Performance Tracking

For custom metrics, we use an enhanced tracking system that supports:
- Batching of metrics
- Persistence across page loads
- Tagging with metadata
- Priority-based processing

```typescript
// From src/utils/performance/enhancedPerformanceTracking.ts
export const trackEnhancedPerformance = (
  metricName: string,
  metricValue: number,
  options?: {
    tags?: Record<string, string>;
    persist?: boolean;
    sendImmediately?: boolean;
  }
) => {
  // Metric tracking with batching and persistence logic
  // ...
};
```

### 3. Performance Marks and Measures

For timing specific operations, we use the browser's Performance API:

```typescript
// From src/utils/performance/webVitals.ts
export const recordPerformanceMark = (
  markName: string,
  measureName?: string,
  startMark?: string
): void => {
  if (typeof window === 'undefined' || !window.performance) return;
  
  try {
    // Record the mark
    performance.mark(markName);
    
    // Create a measure if requested
    if (measureName && startMark) {
      performance.measure(measureName, startMark, markName);
      
      // Get the measure and report it
      const measures = performance.getEntriesByName(measureName, 'measure');
      if (measures.length > 0) {
        const duration = measures[0].duration;
        storeAnalyticsMetric(measureName, duration);
      }
    }
  } catch (error) {
    console.error('Error recording performance mark:', error);
  }
};
```

### 4. Analytics Integration

Performance metrics are integrated with the analytics system for correlation with business metrics:

```typescript
// Integration with Google Analytics 4
sendGA4Event(`web_vital_${metric.name.toLowerCase()}`, {
  value: Math.round(metric.value * 100) / 100,
  rating,
  metric_id: metric.id,
  page_path: window.location.pathname
});
```

### 5. A/B Test Correlation

Performance metrics are automatically correlated with active A/B tests:

```typescript
const checkABTestingIntegration = (metricName: WebVitalName, value: number): void => {
  try {
    // Check if we have stored experiment data
    const experimentData = sessionStorage.getItem('current_ab_test');
    if (experimentData) {
      const { experimentId, variantId } = JSON.parse(experimentData);
      
      // Track this metric as part of the A/B test
      if (experimentId && variantId) {
        // Get user ID if available
        const userId = localStorage.getItem('userId');
        
        if (userId) {
          // Send the web vital as conversion data for this experiment
          trackVariantConversion(
            experimentId, 
            variantId, 
            `web_vital_${metricName.toLowerCase()}`,
            userId,
            { 
              metricName, 
              value, 
              page: window.location.pathname 
            }
          );
        }
      }
    }
  } catch (error) {
    console.error('Error integrating web vitals with A/B testing:', error);
  }
};
```

## Usage Guidelines

### Basic Performance Monitoring

To track when a component loads:

```typescript
import { recordPerformanceMark } from '../utils/performance';

const MyComponent = () => {
  useEffect(() => {
    recordPerformanceMark('mycomponent-loaded');
    
    return () => {
      recordPerformanceMark('mycomponent-unloaded');
    };
  }, []);
  
  // Component code...
};
```

### Measuring Operation Duration

To measure how long an operation takes:

```typescript
import { recordPerformanceMark } from '../utils/performance';

const handleExpensiveOperation = () => {
  recordPerformanceMark('operation-start');
  
  // Expensive operation
  const result = performExpensiveCalculation();
  
  recordPerformanceMark('operation-end', 'operation-duration', 'operation-start');
  
  return result;
};
```

### Enhanced Metric Tracking

For more detailed metric tracking with metadata:

```typescript
import { trackEnhancedPerformance } from '../utils/performance';

const calculateMatches = (advisorId, consumerId, preferences) => {
  const startTime = performance.now();
  
  // Matching calculation
  const results = performMatching(advisorId, consumerId, preferences);
  
  const endTime = performance.now();
  const duration = endTime - startTime;
  
  // Track with metadata
  trackEnhancedPerformance('matching-calculation', duration, {
    tags: {
      advisorId,
      consumerId,
      preferenceCount: Object.keys(preferences).length,
      resultCount: results.length
    },
    persist: true // Persist across page loads for reporting
  });
  
  return results;
};
```

### Component Performance Wrapper

For tracking component render performance:

```typescript
import { withPerformanceTracking } from '../utils/performance/functionTracking';

// Original component
const ExpensiveComponent = ({ data }) => {
  // Component logic...
  return <div>{/* Render content */}</div>;
};

// Wrapped with performance tracking
export default withPerformanceTracking(ExpensiveComponent, 'ExpensiveComponent');
```

## Performance Budgets

We maintain the following performance budgets:

| Metric | Budget | Critical Threshold |
|--------|--------|-------------------|
| First Contentful Paint | 1.8s | 3.0s |
| Largest Contentful Paint | 2.5s | 4.0s |
| Time to Interactive | 3.5s | 7.5s |
| Total Bundle Size | 250KB | 400KB |
| Total Image Size | 500KB | 1MB |
| API Response Time | 300ms | 1s |
| Matching Algorithm | 50ms | 200ms |

## Optimization Techniques

The system implements several optimization techniques:

### Resource Hints

```typescript
// From utils/performance/resourceHints.ts
export const implementResourceHints = () => {
  // Preconnect to important domains
  createLink('preconnect', 'https://api.advisorwiz.com');
  createLink('preconnect', 'https://cdn.advisorwiz.com');
  
  // Preload critical resources
  createLink('preload', '/fonts/main-font.woff2', 'font');
  createLink('preload', '/images/hero-bg.jpg', 'image');
};
```

### Image Optimization

```typescript
// From utils/performance/imageOptimization.ts
export const optimizeImagesForCWV = () => {
  const images = document.querySelectorAll('img');
  
  images.forEach(img => {
    // Add loading="lazy" to images below the fold
    if (!isInViewport(img)) {
      img.setAttribute('loading', 'lazy');
    }
    
    // Add explicit width/height to prevent layout shifts
    if (!img.getAttribute('width') && !img.getAttribute('height')) {
      img.style.aspectRatio = '16/9';
    }
  });
};
```

### Code Splitting

```typescript
// Example from routes/AppRoutes.tsx
const LazyContactUs = lazy(() => import('../pages/ContactUs'));
const LazyTeam = lazy(() => import('../pages/Team'));
```

## Monitoring and Alerting

The system provides real-time monitoring and alerting:

- **Dashboard**: Performance metrics are visualized in the admin dashboard
- **Alerts**: Configurable alerts for performance regressions
- **Reports**: Automated weekly and monthly performance reports
- **CI/CD Integration**: Performance tests run in the CI pipeline

## A/B Testing Integration

Performance metrics are automatically tracked for A/B test variants:

1. When a user enters an A/B test, the test ID and variant ID are stored
2. Performance metrics collected during the session are tagged with the test information
3. Reports show performance differences between variants
4. Statistical significance is calculated for performance metrics

## Best Practices

When working with the performance monitoring system:

1. **Be Specific**: Use descriptive names for performance marks
2. **Be Consistent**: Use consistent naming conventions
3. **Minimize Overhead**: The monitoring itself should have minimal impact
4. **Focus on Critical Paths**: Monitor the most important user journeys
5. **Correlate with Business Metrics**: Connect performance to business outcomes
6. **Test on Real Devices**: Performance varies across devices and networks

## Troubleshooting

Common issues and solutions:

### High Memory Usage

If the monitoring system is using excessive memory:
- Reduce the number of metrics being tracked
- Increase the batch size for sending metrics
- Disable persistence for non-critical metrics

### Metrics Not Appearing

If metrics aren't showing up in reports:
- Check that the metric name is correctly formatted
- Verify that the analytics integration is working
- Check for errors in the console
- Ensure the metrics are being sent with proper batching

### Performance Degradation from Monitoring

If the monitoring itself is causing performance issues:
- Reduce the frequency of metric collection
- Use sampling for high-volume metrics
- Optimize the batch processing logic
- Disable monitoring in performance-critical paths

## Further Resources

- [Web Vitals Documentation](https://web.dev/vitals/)
- [Performance API](https://developer.mozilla.org/en-US/docs/Web/API/Performance)
- [Measuring Performance](https://web.dev/metrics/)
- [Chrome DevTools Performance Tab](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance)
