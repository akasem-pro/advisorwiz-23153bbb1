
/**
 * A/B Testing Component Example
 * 
 * Demonstrates how to implement A/B testing for promotional content
 * with proper tracking and user segmentation.
 */

import React, { useContext, useEffect } from 'react';
import { getVariant, Variant, trackConversion } from '../../utils/abTesting';
import PromotionalBanner from './PromotionalBanner';
import UserContext from '../../context/UserContext';

/**
 * Props for the A/B test promotion component
 */
interface ABTestPromotionExampleProps {
  /** Unique identifier for the A/B test experiment */
  experimentId: string;
  /** Optional title override */
  title?: string;
  /** Optional onClose callback */
  onClose?: () => void;
}

/**
 * Type definition for promotional variants
 */
type PromotionVariant = {
  /** Main promotional message */
  message: string;
  /** Call to action text */
  ctaText: string;
  /** Visual styling variant */
  variant: 'primary' | 'secondary' | 'accent';
  /** Additional data for tracking */
  analyticsData?: Record<string, any>;
};

/**
 * A/B Test Promotion Example Component
 * 
 * Demonstrates how to implement A/B testing for promotional content
 * 
 * @param {ABTestPromotionExampleProps} props - Component props
 */
const ABTestPromotionExample: React.FC<ABTestPromotionExampleProps> = ({ 
  experimentId = 'premium_promo_test',
  title,
  onClose
}) => {
  const userContext = useContext(UserContext);
  const userId = userContext?.consumerProfile?.id || userContext?.advisorProfile?.id;
  
  // Define variants for our test
  const promoVariants: Variant<PromotionVariant>[] = [
    {
      id: 'control',
      value: {
        message: 'Upgrade to Premium for better matches',
        ctaText: 'Learn More',
        variant: 'primary',
        analyticsData: { version: 'control', emphasized: false }
      },
      weight: 50 // 50% of users see this
    },
    {
      id: 'variant_a',
      value: {
        message: 'Get 3x more matches with Premium',
        ctaText: 'Upgrade Now',
        variant: 'accent',
        analyticsData: { version: 'quantity', emphasized: true }
      },
      weight: 25 // 25% of users see this
    },
    {
      id: 'variant_b',
      value: {
        message: 'Premium users find advisors 2x faster',
        ctaText: 'Go Premium',
        variant: 'secondary',
        analyticsData: { version: 'speed', emphasized: true }
      },
      weight: 25 // 25% of users see this
    }
  ];
  
  // Get the variant for this user
  const selectedVariant = getVariant<PromotionVariant>(experimentId, promoVariants, userId);
  
  // Track impression when component mounts
  useEffect(() => {
    if (userId) {
      // Record that this variant was seen
      trackConversion(experimentId, selectedVariant.id, 'impression', userId, 
        selectedVariant.value.analyticsData
      );
    }
  }, [experimentId, selectedVariant.id, userId, selectedVariant.value.analyticsData]);
  
  // Function to handle CTA click - track as conversion
  const handleCtaClick = () => {
    trackConversion(experimentId, selectedVariant.id, 'click', userId,
      selectedVariant.value.analyticsData
    );
  };
  
  // Function to handle banner dismissal
  const handleDismiss = () => {
    trackConversion(experimentId, selectedVariant.id, 'dismiss', userId);
    
    if (onClose) {
      onClose();
    }
  };
  
  return (
    <PromotionalBanner
      id={`${experimentId}_${selectedVariant.id}`}
      message={selectedVariant.value.message}
      ctaText={selectedVariant.value.ctaText}
      ctaUrl="/pricing"
      variant={selectedVariant.value.variant}
      durationInSeconds={15}
      userId={userId}
      onCtaClick={handleCtaClick}
      onDismiss={handleDismiss}
      title={title}
    />
  );
};

export default ABTestPromotionExample;
