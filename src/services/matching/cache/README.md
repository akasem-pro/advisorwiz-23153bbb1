
# Matching Service Cache System

## Overview

The caching system optimizes performance by storing compatibility scores and match explanations, 
reducing redundant calculations and database queries.

## Architecture

```
┌─────────────────────┐     ┌────────────────────────┐
│                     │     │                        │
│  cacheOperations.ts │◄────│  compatibilityCache.ts │
│  (Core APIs)        │     │  (Public Facade)       │
└─────────┬───────────┘     └────────────────────────┘
          │                             ▲
          │                             │
          ▼                             │
┌─────────────────────┐     ┌────────────────────────┐
│                     │     │                        │
│  cacheStore.ts      │     │  cacheMaintenance.ts   │
│  (Data Storage)     │     │  (Housekeeping)        │
└─────────────────────┘     └────────────────────────┘
          ▲                             ▲
          │                             │
          └─────────────────────────────┘
                  Shared State
```

## Key Components

1. **cacheStore.ts** - Core data structure and primitive operations
2. **cacheOperations.ts** - Business logic for storing/retrieving cache entries
3. **cacheMaintenance.ts** - Cleanup and optimization routines
4. **compatibilityCache.ts** - Public API facade with high-level functions

## Cache Invalidation Strategies

The system employs multiple cache invalidation strategies:

1. **Time-based Expiration**: Entries expire after a configured TTL
2. **Memory Pressure**: Auto-cleanup when cache size exceeds thresholds
3. **LRU Eviction**: Least recently used entries are removed first
4. **Selective Invalidation**: API to invalidate specific advisor/consumer entries

## Performance Considerations

* **Hit Tracking**: Cache tracks hit counts to retain valuable entries
* **Size Monitoring**: Automatic cleanup when size exceeds thresholds
* **Background Maintenance**: Stale entry cleanup runs asynchronously
* **Progressive Caching**: Prioritizes frequently accessed matches

## Usage Example

```typescript
// Get a cached result
const result = getCachedResult('advisor-123:consumer-456');

// Store a new result with automatic TTL
cacheResult('advisor-123:consumer-456', { 
  score: 85, 
  matchExplanation: ['Language match', 'Expertise alignment'] 
});

// Manually clear cache when needed
clearCompatibilityCache();

// Run maintenance (normally auto-triggered)
cleanupStaleEntries();
```
