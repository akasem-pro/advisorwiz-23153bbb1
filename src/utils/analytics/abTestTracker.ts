import { supabase } from '../../integrations/supabase/client';
import { trackEvent } from '../tagManager';
import { handleError } from '../errorHandling/errorHandler';

interface ABTestResult {
  testId: string;
  variantId: string;
  userId?: string;
  converted: boolean;
  exposureTimestamp: string;
  conversionTimestamp?: string;
}

interface ABTestDefinition {
  id: string;
  name: string;
  description: string;
  variants: { id: string; name: string }[];
  startDate: string;
  endDate: string;
  status: 'active' | 'paused' | 'completed';
}

/**
 * Record when a user is exposed to an A/B test variant
 */
export const trackABTestExposure = async (
  testId: string,
  variantId: string,
  userId?: string
): Promise<void> => {
  try {
    // Record in analytics system
    trackEvent('ab_test_exposure', {
      test_id: testId,
      variant_id: variantId,
      user_id: userId
    });
    
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.info(`A/B Test Exposure: ${testId} / ${variantId}`);
    }
  } catch (error) {
    console.error('Failed to track A/B test exposure:', error);
  }
};

/**
 * Record when a user converts on an A/B test variant
 */
export const trackABTestConversion = async (
  testId: string,
  variantId: string,
  userId?: string,
  additionalData?: Record<string, any>
): Promise<void> => {
  try {
    // Record in analytics system
    trackEvent('ab_test_conversion', {
      test_id: testId,
      variant_id: variantId,
      user_id: userId,
      ...additionalData
    });
    
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.info(`A/B Test Conversion: ${testId} / ${variantId}`);
    }
  } catch (error) {
    console.error('Failed to track A/B test conversion:', error);
  }
};

/**
 * Get the user's assigned variant for an A/B test
 */
export const getABTestVariant = async (
  testId: string,
  userId?: string
): Promise<string | null> => {
  try {
    // In a real implementation, this would check a user's persistent assignment
    // For simplicity in this example, we'll use a random assignment
    
    // Get test definition to know available variants
    const { data: testData, error } = await supabase
      .from('ab_tests')
      .select('variants')
      .eq('id', testId)
      .single();
    
    if (error) {
      throw new Error(error.message);
    }
    
    const variants = testData?.variants || [];
    
    if (variants.length === 0) {
      return null;
    }
    
    // Get a random variant
    const randomIndex = Math.floor(Math.random() * variants.length);
    return variants[randomIndex].id;
  } catch (error) {
    console.error('Failed to get A/B test variant:', error);
    return null;
  }
};
