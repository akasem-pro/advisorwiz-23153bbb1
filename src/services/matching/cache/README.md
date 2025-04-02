
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

## Performance Monitoring

The cache system integrates with the application's performance monitoring infrastructure to:

1. **Track Cache Performance**:
   - Hit/miss rates
   - Retrieval times
   - Cache size metrics
   
2. **Optimize Cache Operations**:
   - Auto-tuning cache size based on memory pressure
   - Prioritizing frequently accessed entries
   - Background maintenance during idle periods

3. **Report Key Metrics**:
   - Cache efficiency statistics
   - Memory usage patterns
   - Access pattern insights

Example integration with performance monitoring:

```typescript
import { recordPerformanceMark, trackEnhancedPerformance } from '../../../utils/performance';

// Basic performance tracking
recordPerformanceMark('cache-lookup-start');
const result = cacheStore.get(key);
recordPerformanceMark('cache-lookup-end', 'cache-lookup-duration', 'cache-lookup-start');

// Enhanced performance tracking
trackEnhancedPerformance(`cache_${result ? 'hit' : 'miss'}`, lookupTimeMs, {
  tags: {
    cacheType: 'compatibility',
    keyPattern: keyPattern,
    cacheSize: cacheStore.size
  }
});
```

For a comprehensive overview of performance monitoring, see [PERFORMANCE_MONITORING.md](/docs/PERFORMANCE_MONITORING.md).

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
* **Performance Metrics**: Integrated with Web Vitals monitoring

## A/B Testing Integration

The cache system can be used in A/B testing scenarios:

1. **Cache Strategies**: Test different caching algorithms
2. **TTL Settings**: Experiment with various expiration times
3. **Preloading**: Test impact of preloading common matches
4. **Performance Impact**: Measure effects on Core Web Vitals

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

## Advanced Uses

### Debugging Cache Performance

```typescript
// Get detailed cache statistics
const stats = getCompatibilityCacheStats();
console.log(`Cache hit rate: ${stats.hitRate}%`);
console.log(`Cache size: ${stats.size} entries`);
console.log(`Last cleanup: ${stats.lastCleanup}`);
```

### Optimizing for Mobile Devices

On mobile devices, the cache system automatically:
- Reduces the maximum cache size
- Increases garbage collection frequency
- Prioritizes memory efficiency over lookup speed
