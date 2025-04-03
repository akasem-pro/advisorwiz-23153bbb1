
# Cache Management APIs

This document describes APIs for managing the compatibility score cache.

## `clearCompatibilityCache`

Clear the entire compatibility score cache.

```typescript
function clearCompatibilityCache(): void
```

## `getCompatibilityCacheStats`

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

## `checkCacheMaintenance`

Check if cache maintenance is needed and perform it if required.

```typescript
function checkCacheMaintenance(): void
```

## Cache Optimization

For optimal performance, the cache system automatically:

- Cleans up stale entries periodically
- Prioritizes frequently accessed entries
- Balances memory usage and performance

For more details on cache implementation, see the [Cache README](../cache/README.md).
