
# React Hooks for Matching

This document describes React hooks for optimized matching operations.

## `useMatchingOptimization`

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

## `useOptimizedMatching`

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

## `useMatchPersistence`

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

## `useMatchingCache`

Hook for monitoring and managing the matching algorithm cache.

```typescript
function useMatchingCache(): {
  clearAllCaches: () => void;
  invalidateUserCache: (userId: string) => boolean;
  optimizeCache: () => void;
  cacheStats: {
    size: number;
    hits: number;
    misses: number;
    hitRate: number;
  };
  lastSyncTime: Date | null;
}
```
