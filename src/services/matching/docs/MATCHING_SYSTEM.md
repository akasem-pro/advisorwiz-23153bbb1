
# Matching System Documentation

## Overview

The matching system uses a strategy pattern to calculate compatibility scores between advisors and consumers. 
Different strategies can be employed based on user preferences, subscription tiers, or specific use cases.

## Architecture

```
┌─────────────────────┐     ┌─────────────────────┐
│                     │     │                     │
│  MatchingStrategy   │◄────│StrategyFactory      │
│  (Interface)        │     │                     │
└─────────┬───────────┘     └─────────────────────┘
          │
          │implements
          │
┌─────────▼───────────┐     ┌─────────────────────┐
│                     │     │                     │
│DefaultStrategy      │     │PremiumStrategy      │
│                     │     │                     │
└─────────────────────┘     └─────────────────────┘
          
┌─────────────────────┐     ┌─────────────────────┐
│                     │     │                     │
│RiskFocusedStrategy  │     │MatchingContext      │
│                     │     │                     │
└─────────────────────┘     └─────────────────────┘
```

## Strategy Selection

Strategies are selected based on:
- User subscription tier (Premium vs Standard)
- Specific optimization goals (e.g., risk tolerance matching)
- User preferences

## Scoring Components

Each matching strategy calculates scores based on multiple factors:

1. **Language Matching**: Evaluates shared languages between advisor and consumer
2. **Expertise Matching**: Measures how well advisor expertise meets consumer needs
3. **Availability Matching**: Considers advisor scheduling flexibility 
4. **Risk Tolerance Alignment**: Aligns consumer risk profile with advisor expertise
5. **Interaction History**: Utilizes previous call and chat data (if available)

## Data Flow

1. User interface or API requests a compatibility calculation
2. MatchingStrategyContext selects appropriate strategy
3. Strategy fetches necessary profile data 
4. Algorithm components calculate individual factor scores
5. Weighted scores are combined into a final compatibility score
6. Explanations are generated for UI presentation
7. Results may be cached and/or persisted to database

## Caching System

The matching system employs a multi-level caching strategy:

1. **In-Memory Cache**: Primary cache for frequent calculations
   - Time-based expiration
   - LRU eviction policy
   - Size-based maintenance

2. **Persistence Layer**: Secondary cache for longer-term storage
   - Database-backed persistence
   - Background synchronization
   - Offline support

3. **Cache Invalidation Triggers**:
   - Profile updates
   - Preference changes
   - Time expiration
   - Manual invalidation

## Performance Optimizations

The system includes several performance optimizations:

1. **Batch Processing**: Multiple matches calculated together
2. **Web Workers**: Offloads calculations to background threads
3. **Progressive Loading**: Calculates matches in priority order
4. **Memoization**: Avoids redundant calculations
5. **Pre-filtering**: Eliminates obvious non-matches early

## Configuration

Matching weights and thresholds are defined in `matchingConfig.ts` and can be adjusted without modifying algorithm code.

## Extension

To add a new matching strategy:
1. Create a new class implementing the MatchingStrategy interface
2. Add the strategy type to MatchingStrategyType
3. Register the new strategy in MatchingStrategyFactory
4. Update documentation with strategy's purpose and characteristics

## Monitoring

The matching system includes tools for monitoring performance:

1. **Cache Statistics**: Hit rates, size, eviction counts
2. **Execution Time Tracking**: Performance monitoring
3. **Match Quality Metrics**: User feedback integration
4. **Error Logging**: Failure detection and diagnosis
