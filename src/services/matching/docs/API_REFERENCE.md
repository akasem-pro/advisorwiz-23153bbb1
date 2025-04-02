
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
