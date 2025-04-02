
# Matching System API Reference

## Core APIs

### `getWeightedCompatibilityScore`

Calculate compatibility score between advisor and consumer.

```typescript
function getWeightedCompatibilityScore(
  advisorId: string,
  consumerId: string,
  preferences: MatchPreferences,
  callMetrics?: CallMetrics[],
  trackAnalytics?: boolean
): { score: number; matchExplanation: string[] }
```

**Parameters:**
- `advisorId`: Unique identifier for the advisor
- `consumerId`: Unique identifier for the consumer
- `preferences`: Matching preferences that influence the calculation
- `callMetrics` (optional): Historical call data for enhanced matching
- `trackAnalytics` (optional): Whether to track this calculation in analytics

**Returns:**
Object containing the score (0-100) and an array of explanations.

**Example:**
```typescript
const result = getWeightedCompatibilityScore(
  'advisor-123', 
  'consumer-456', 
  { 
    prioritizeLanguage: true,
    prioritizeExpertise: true,
    prioritizeAvailability: true,
    prioritizeLocation: false
  }
);

console.log(`Match score: ${result.score}`);
console.log('Explanations:', result.matchExplanation);
```

### `setMatchingStrategy`

Change the active matching strategy used for calculations.

```typescript
function setMatchingStrategy(strategyType: MatchingStrategyType): void
```

**Parameters:**
- `strategyType`: Type of strategy to use ('default', 'premium', 'risk-focused')

**Example:**
```typescript
// For a premium user
setMatchingStrategy('premium');

// For risk-focused matching
setMatchingStrategy('risk-focused');
```

### `calculateCompatibilityBetweenProfiles`

Calculate compatibility directly between advisor and consumer profiles.

```typescript
function calculateCompatibilityBetweenProfiles(
  advisor: AdvisorProfile,
  consumer: ConsumerProfile,
  preferences?: MatchPreferences
): { score: number; matchExplanation: string[] }
```

**Parameters:**
- `advisor`: Complete advisor profile
- `consumer`: Complete consumer profile  
- `preferences` (optional): Matching preferences

**Returns:**
Object containing the score and explanations.

## Performance Monitoring APIs

### `recordPerformanceMark`

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

### `trackEnhancedPerformance`

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

### `measureComponentRender`

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

## Cache Management APIs

### `clearCompatibilityCache`

Clear the entire compatibility score cache.

```typescript
function clearCompatibilityCache(): void
```

### `getCompatibilityCacheStats`

Get statistics about the cache performance.

```typescript
function getCompatibilityCacheStats(): {
  size: number;
  hits: number;
  misses: number;
  hitRate: number;
  lastCleanup: string;
}
```

**Returns:**
Object with cache statistics.

### `checkCacheMaintenance`

Check if cache maintenance is needed and perform it if required.

```typescript
function checkCacheMaintenance(): void
```

## React Hooks

### `useMatchingOptimization`

Hook for optimizing matching algorithm performance.

```typescript
function useMatchingOptimization(
  userType: 'consumer' | 'advisor' | null,
  consumerProfile: ConsumerProfile | null,
  advisorProfile: AdvisorProfile | null,
  matchPreferences: MatchPreferences,
  callMetrics?: CallMetrics[]
): {
  calculateCompatibilityScore: (advisorId: string, consumerId: string) => number;
  getMatchExplanations: (advisorId: string, consumerId: string) => string[];
  eligibleProfiles: Array<AdvisorProfile | ConsumerProfile>;
}
```

### `useOptimizedMatching`

Hook providing optimized matching functionality with web workers.

```typescript
function useOptimizedMatching(
  matchPreferences: MatchPreferences
): {
  calculateCompatibilityScore: (advisorId: string, consumerId: string) => Promise<number>;
  getCompatibilityExplanations: (advisorId: string, consumerId: string) => Promise<string[]>;
  getTopMatches: (
    userType: 'consumer' | 'advisor',
    profiles: Array<AdvisorProfile | ConsumerProfile>,
    selfId: string,
    limit?: number
  ) => Promise<Array<{ profile: AdvisorProfile | ConsumerProfile; score: number }>>;
  clearCache: () => void;
  getCacheStats: () => { size: number; keys: string[] };
  isWorkerSupported: boolean;
}
```

### `useMatchPersistence`

Hook for persisting match data to the database.

```typescript
function useMatchPersistence(): {
  persistCompatibilityScore: (
    advisorId: string,
    consumerId: string,
    score: number,
    explanations: string[]
  ) => Promise<boolean>;
  getStoredCompatibilityScore: (
    advisorId: string,
    consumerId: string
  ) => Promise<{ score: number; explanations: string[] } | null>;
  getTopMatches: (
    limit?: number
  ) => Promise<Array<{ id: string; score: number; explanations: string[] }>>;
  invalidateCache: (pattern?: string) => void;
  isLoading: boolean;
  error: string | null;
}
```

## Algorithm Components

### `calculateLanguageMatchScore`

Calculate match score based on shared languages.

```typescript
function calculateLanguageMatchScore(
  advisor: AdvisorProfile,
  consumer: ConsumerProfile
): { score: number; explanation: string | null }
```

### `calculateExpertiseMatchScore`

Calculate match score based on expertise alignment.

```typescript
function calculateExpertiseMatchScore(
  advisor: AdvisorProfile,
  consumer: ConsumerProfile
): { score: number; explanation: string | null }
```

## Performance Monitoring Integration

### `withPerformanceTracking`

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

### `usePerformanceTracking`

React hook for tracking component rendering performance.

```typescript
function usePerformanceTracking(
  componentName: string,
  options?: {
    trackMount?: boolean;
    trackUpdate?: boolean;
    trackUnmount?: boolean;
    reportToAnalytics?: boolean;
  }
): void
```

**Example:**
```typescript
function ExpensiveComponent() {
  usePerformanceTracking('ExpensiveComponent', {
    trackMount: true,
    trackUpdate: true
  });
  
  // Component implementation
}
```

## Analytics Integration

### `trackVariantImpression`

Track when a matching variant is shown to a user.

```typescript
function trackVariantImpression(
  experimentId: ExperimentId,
  variantId: VariantId,
  userId?: string
): void
```

### `trackVariantConversion`

Track a conversion event for a matching variant.

```typescript
function trackVariantConversion(
  experimentId: ExperimentId,
  variantId: VariantId,
  conversionType: string,
  userId?: string,
  additionalData?: Record<string, any>
): void
```

## Web Vitals Integration

The matching system automatically integrates with Core Web Vitals measurements, tracking how matching operations affect:

- Loading performance (LCP)
- Interactivity (FID, INP)
- Visual stability (CLS)

These metrics are collected and correlated with matching operations to optimize the user experience.

```typescript
// Example of auto-tracked data for a matching operation
{
  operation: "match_calculation",
  duration_ms: 245,
  affected_vitals: ["INP", "FID"],
  impact_score: 0.12  // Estimated impact on vitals
}
```

For more details on performance monitoring, see [PERFORMANCE_MONITORING.md](/docs/PERFORMANCE_MONITORING.md).
