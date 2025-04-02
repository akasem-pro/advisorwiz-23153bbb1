
/**
 * A/B Testing Higher Order Component
 * 
 * This HOC enables any component to be A/B tested by wrapping it
 * and providing different props based on the assigned variant.
 */

import React, { useEffect } from 'react';
import { getVariant, trackConversion } from '../abTesting';

/**
 * Configuration options for the A/B test HOC
 */
interface ABTestConfig<P> {
  /** Unique identifier for the experiment */
  experimentId: string;
  /** Array of variants to test */
  variants: Array<{
    id: string;
    props: Partial<P>;
    weight?: number;
  }>;
  /** Optional tracking options */
  tracking?: {
    /**  Whether to track impression automatically on mount */
    trackImpression?: boolean;
    /** Optional callback after tracking impression */
    onImpression?: (variantId: string) => void;
    /** Additional data to include with tracking events */
    additionalData?: Record<string, any>;
  };
}

/**
 * Props added by the HOC
 */
interface InjectedProps {
  /** The assigned variant ID */
  variantId: string;
  /** Track a conversion for the current variant */
  trackConversion: (event: string, additionalData?: Record<string, any>) => void;
}

/**
 * Higher-order component that wraps a component with A/B testing capabilities
 * 
 * @template P - Props of the wrapped component
 * @param {React.ComponentType<P>} Component - The component to wrap
 * @param {ABTestConfig<P>} config - A/B testing configuration
 * @returns {React.ComponentType<Omit<P, keyof ReturnType<typeof getVariantProps>> & { userId?: string }>}
 */
export function withABTest<P extends object>(
  Component: React.ComponentType<P>,
  config: ABTestConfig<P>
) {
  const { experimentId, variants, tracking = {} } = config;
  const { trackImpression = true, onImpression, additionalData = {} } = tracking;

  /**
   * Get props for the assigned variant
   * 
   * @param {string} variantId - Variant identifier
   * @returns {Partial<P>} Props for the variant
   */
  const getVariantProps = (variantId: string): Partial<P> => {
    const variant = variants.find(v => v.id === variantId);
    return variant ? variant.props : {};
  };

  /**
   * The wrapped component with A/B testing
   */
  return function ABTestComponent(
    props: Omit<P, keyof ReturnType<typeof getVariantProps>> & { userId?: string }
  ) {
    // Get variant for this user
    const variantMap = variants.map(v => ({
      id: v.id,
      value: v.id,
      weight: v.weight
    }));
    
    const selectedVariant = getVariant(experimentId, variantMap, props.userId);
    const variantId = selectedVariant.value;
    
    // Track impression on mount
    useEffect(() => {
      if (trackImpression && props.userId) {
        trackConversion(experimentId, variantId, 'impression', props.userId, additionalData);
        
        if (onImpression) {
          onImpression(variantId);
        }
      }
    }, [variantId, props.userId]);
    
    /**
     * Track a conversion event for this variant
     * 
     * @param {string} event - Type of conversion event
     * @param {Record<string, any>} [eventData] - Additional event data
     */
    const trackVariantConversion = (event: string, eventData?: Record<string, any>) => {
      if (props.userId) {
        trackConversion(
          experimentId, 
          variantId, 
          event, 
          props.userId, 
          { ...additionalData, ...eventData }
        );
      }
    };
    
    // Get variant-specific props
    const variantProps = getVariantProps(variantId);
    
    // Merge props, with variant props taking precedence
    const mergedProps = {
      ...props,
      ...variantProps,
      variantId,
      trackConversion: trackVariantConversion
    } as P & InjectedProps;
    
    return <Component {...mergedProps} />;
  };
}

export default withABTest;
