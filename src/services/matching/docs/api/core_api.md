
# Core Matching APIs

This document describes the core APIs for the matching system.

## `getWeightedCompatibilityScore`

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

## `setMatchingStrategy`

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

## `calculateCompatibilityBetweenProfiles`

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
