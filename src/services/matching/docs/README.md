
# Matching System Documentation

Welcome to the Matching System documentation. This system provides tools and APIs for calculating compatibility between advisors and consumers.

## Overview

The AdvisorWiz matching system uses a sophisticated algorithm to connect financial advisors with consumers based on multiple compatibility factors. The system employs:

- Strategy pattern for different scoring algorithms
- Weighted scoring across multiple dimensions
- Performance optimization through caching
- Detailed match explanations
- Feedback integration for continuous improvement

## Documentation Sections

- [Core API Reference](./api/core_api.md) - Essential matching calculation functions
- [Cache Management](./api/cache_management.md) - Functions for managing the compatibility score cache
- [React Hooks](./api/react_hooks.md) - React hooks for optimized matching
- [Performance Monitoring](./api/performance_monitoring.md) - Tools for tracking performance
- [Algorithm Components](./api/algorithm_components.md) - Individual algorithm components
- [Analytics Integration](./api/analytics_integration.md) - Analytics tracking for matching operations
- [Architecture Overview](./MATCHING_SYSTEM.md) - Detailed system architecture

## Getting Started

For new users, we recommend starting with the [Core API Reference](./api/core_api.md) to understand the basic matching functionality.

### Basic Usage Example

```typescript
import { calculateCompatibility, findTopMatches } from '../index';

// Calculate compatibility between specific advisor and consumer
const result = await calculateCompatibility('advisor-123', 'consumer-456');
console.log(`Compatibility score: ${result.overallScore}`);

// Find top matches for a consumer
const matches = await findTopMatches('consumer-456', 5);
console.log(`Found ${matches.length} top matches`);
```

### Using React Hooks

```typescript
import { useMatchedProfiles } from '../../../hooks/matching/useMatchedProfiles';

function MatchList() {
  const { matches, isLoading, error } = useMatchedProfiles('consumer-123');
  
  if (isLoading) return <p>Loading matches...</p>;
  if (error) return <p>Error loading matches</p>;
  
  return (
    <div>
      {matches.map(match => (
        <MatchCard key={match.advisorId} match={match} />
      ))}
    </div>
  );
}
```

## Performance Considerations

For more details on performance monitoring, see the [Performance Monitoring Guide](../../../docs/PERFORMANCE_MONITORING.md).

Key performance features:
- Multi-level caching system
- Batch processing for multiple match calculations
- Background processing using Web Workers
- Detailed performance metrics tracking

## Contributing

When extending the matching system:

1. Create unit tests for any new algorithm components
2. Document new features in the appropriate markdown files
3. Update typings in `matchingTypes.ts`
4. Add performance tracking to new calculations

For more information on the overall architecture, see [MATCHING_SYSTEM.md](./MATCHING_SYSTEM.md).
