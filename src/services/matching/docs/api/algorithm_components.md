
# Algorithm Components

This document describes the individual components used in matching algorithms.

## `calculateLanguageMatchScore`

Calculate match score based on shared languages.

```typescript
function calculateLanguageMatchScore(
  advisor: AdvisorProfile,
  consumer: ConsumerProfile
): { score: number; explanation: string | null }
```

## `calculateExpertiseMatchScore`

Calculate match score based on expertise alignment.

```typescript
function calculateExpertiseMatchScore(
  advisor: AdvisorProfile,
  consumer: ConsumerProfile
): { score: number; explanation: string | null }
```

## Common Pattern Utilities

The matching system includes several utility functions for common matching patterns:

- `calculateOverlapScore`: Calculate similarity between two arrays
- `calculateLanguageScore`: Focused language compatibility scoring
- `calculateExpertiseScore`: Expertise and needs alignment scoring
- `applyWeightFactor`: Apply importance weightings to scores
- `getMatchExplanation`: Generate human-readable explanations

These utilities are designed to be reusable across different matching contexts and strategies.
