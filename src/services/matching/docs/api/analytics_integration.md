
# Analytics Integration

This document describes the analytics integration features for the matching system.

## `trackVariantImpression`

Track when a matching variant is shown to a user.

```typescript
function trackVariantImpression(
  experimentId: ExperimentId,
  variantId: VariantId,
  userId?: string
): void
```

## `trackVariantConversion`

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

## `usePerformanceTracking`

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

For more details on performance monitoring, see [PERFORMANCE_MONITORING.md](../../../../docs/PERFORMANCE_MONITORING.md).
