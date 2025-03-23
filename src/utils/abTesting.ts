
/**
 * Simple A/B testing utility to randomly assign users to experiment variants
 * and track the results using the existing analytics framework
 */

import { trackUserBehavior } from './analytics/eventTracker';

type VariantId = string;
type ExperimentId = string;

export interface Variant<T> {
  id: VariantId;
  value: T;
  weight?: number; // Optional weighting factor (default is equal distribution)
}

/**
 * Get a variant for a user based on the experiment ID and variants
 * 
 * @param experimentId Unique identifier for the experiment
 * @param variants Array of variant options with optional weights
 * @param userId Optional user ID for consistent assignment
 * @returns The selected variant
 */
export function getVariant<T>(
  experimentId: ExperimentId,
  variants: Variant<T>[],
  userId?: string
): Variant<T> {
  // Use consistent seeding for users if ID is provided
  let seed: number;
  
  if (userId) {
    // Simple string hash for deterministic selection
    seed = Array.from(userId + experimentId).reduce(
      (acc, char) => acc + char.charCodeAt(0), 0
    );
  } else {
    // Random for anonymous users
    seed = Math.random();
  }
  
  // Calculate total weight
  const totalWeight = variants.reduce((sum, variant) => sum + (variant.weight || 1), 0);
  
  // Get a number between 0 and totalWeight
  const selection = seed % totalWeight;
  
  // Find which variant was selected
  let cumulativeWeight = 0;
  for (const variant of variants) {
    cumulativeWeight += variant.weight || 1;
    if (selection <= cumulativeWeight) {
      // Track which variant was assigned
      trackUserBehavior('experiment_assignment', userId, {
        experiment_id: experimentId,
        variant_id: variant.id
      });
      
      return variant;
    }
  }
  
  // Fallback to first variant (should never happen)
  return variants[0];
}

/**
 * Track a conversion event for an experiment
 * 
 * @param experimentId Unique identifier for the experiment
 * @param variantId Variant identifier that was shown to the user
 * @param conversionType Type of conversion (e.g., 'click', 'signup', 'purchase')
 * @param userId Optional user ID
 * @param value Optional conversion value (e.g., purchase amount)
 */
export function trackConversion(
  experimentId: ExperimentId,
  variantId: VariantId,
  conversionType: string,
  userId?: string,
  value?: number
): void {
  trackUserBehavior('experiment_conversion', userId, {
    experiment_id: experimentId,
    variant_id: variantId,
    conversion_type: conversionType,
    value
  });
}
