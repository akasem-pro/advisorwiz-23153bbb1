
import React, { useContext } from 'react';
import { getVariant, Variant } from '../../utils/abTesting';
import PromotionalBanner from './PromotionalBanner';
import UserContext from '../../context/UserContext';

interface ABTestPromotionExampleProps {
  experimentId: string;
}

// Define the type for our promotional variants
type PromotionVariant = {
  message: string;
  ctaText: string;
  variant: 'primary' | 'secondary' | 'accent';
};

const ABTestPromotionExample: React.FC<ABTestPromotionExampleProps> = ({ 
  experimentId = 'premium_promo_test' 
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
        variant: 'primary'
      },
      weight: 50 // 50% of users see this
    },
    {
      id: 'variant_a',
      value: {
        message: 'Get 3x more matches with Premium',
        ctaText: 'Upgrade Now',
        variant: 'accent'
      },
      weight: 25 // 25% of users see this
    },
    {
      id: 'variant_b',
      value: {
        message: 'Premium users find advisors 2x faster',
        ctaText: 'Go Premium',
        variant: 'secondary'
      },
      weight: 25 // 25% of users see this
    }
  ];
  
  // Get the variant for this user
  const selectedVariant = getVariant<PromotionVariant>(experimentId, promoVariants, userId);
  
  return (
    <PromotionalBanner
      id={`${experimentId}_${selectedVariant.id}`}
      message={selectedVariant.value.message}
      ctaText={selectedVariant.value.ctaText}
      ctaUrl="/pricing"
      variant={selectedVariant.value.variant}
      durationInSeconds={15}
      userId={userId}
    />
  );
};

export default ABTestPromotionExample;
