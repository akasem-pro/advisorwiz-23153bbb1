
# Performance Monitoring APIs

This document describes APIs for monitoring performance of matching operations.

## `recordPerformanceMark`

Record a performance mark and optionally create a measure.

```typescript
function recordPerformanceMark(
  markName: string,
  measureName?: string,
  startMark?: string
): void
```

**Parameters:**
- `markName`: Name of the mark to record
- `measureName` (optional): Name of the measure to create
- `startMark` (optional): Name of the starting mark for the measure

**Example:**
```typescript
// Record start of matching calculation
recordPerformanceMark('matching-calculation-start');

// Perform calculation
const result = calculateMatch();

// Record end and create a duration measure
recordPerformanceMark(
  'matching-calculation-end', 
  'matching-calculation-duration', 
  'matching-calculation-start'
);
```

## `trackEnhancedPerformance`

Track a performance metric with advanced options.

```typescript
function trackEnhancedPerformance(
  metricName: string,
  metricValue: number,
  options?: {
    tags?: Record<string, string>;
    persist?: boolean;
    sendImmediately?: boolean;
  }
): void
```

**Parameters:**
- `metricName`: Name of the metric to track
- `metricValue`: Numeric value for the metric
- `options` (optional): Configuration options for tracking

**Example:**
```typescript
// Track match calculation time with tags
trackEnhancedPerformance('match-calculation-time', 250, {
  tags: {
    strategy: 'premium',
    userType: 'advisor'
  },
  persist: true
});
```

## `measureComponentRender`

Track rendering performance of a React component.

```typescript
function measureComponentRender(
  componentName: string, 
  phase: 'mount' | 'update' | 'unmount'
): void
```

**Parameters:**
- `componentName`: Name of the component being measured
- `phase`: Which lifecycle phase is being measured

**Example:**
```typescript
// In a React component
useEffect(() => {
  measureComponentRender('MatchingInterface', 'mount');
  return () => {
    measureComponentRender('MatchingInterface', 'unmount');
  };
}, []);

// For updates
useEffect(() => {
  measureComponentRender('MatchingInterface', 'update');
}, [dependencies]);
```

## `withPerformanceTracking`

Higher-order function for tracking execution time.

```typescript
function withPerformanceTracking<T extends (...args: any[]) => any>(
  fn: T,
  operationName: string,
  options?: {
    reportToAnalytics?: boolean;
    threshold?: number; // Only report if execution time exceeds threshold (ms)
  }
): (...args: Parameters<T>) => ReturnType<T>
```

**Example:**
```typescript
// Wrap a function with performance tracking
const optimizedCalculation = withPerformanceTracking(
  expensiveCalculation,
  'advisor-matching-calculation',
  { 
    reportToAnalytics: true,
    threshold: 50 // Only report if it takes > 50ms
  }
);

// Use the wrapped function
const result = optimizedCalculation(data);
```
