
import { supabase } from '../../integrations/supabase/client';
import { trackEvent as trackGTMEvent } from '../tagManager';
import { ErrorCategory, handleError } from '../errorHandling/errorHandler';
import { storeAnalyticsMetric } from '../performance/core';
import { UserBehaviorEvent } from './types';

/**
 * Track a user behavior event with detailed analytics
 */
export const trackUserBehavior = async (
  event: UserBehaviorEvent | string,
  userId?: string,
  properties?: Record<string, any>
): Promise<void> => {
  try {
    // Store the main event metric
    storeAnalyticsMetric('user_behavior', event);
    
    // Store in the user_interactions table for more detailed analysis
    if (userId) {
      // Create an interaction data object with the required interaction_type
      const interactionData = {
        interaction_type: event,
        notes: properties ? JSON.stringify(properties) : null
      };
      
      // Handle advisor/consumer specific interactions if those IDs are provided
      if (properties?.advisor_id) {
        interactionData['advisor_id'] = properties.advisor_id;
      }
      
      if (properties?.consumer_id) {
        interactionData['consumer_id'] = properties.consumer_id;
      }
      
      // Add duration if provided
      if (properties?.duration) {
        interactionData['duration'] = properties.duration;
      }
      
      await supabase
        .from('user_interactions')
        .insert(interactionData);
    }
    
    // Log detailed information in development for debugging
    if (process.env.NODE_ENV === 'development') {
      console.log(`[User Behavior] Event: ${event}`, {
        userId,
        properties
      });
    }
  } catch (error) {
    console.error('Failed to track user behavior:', error);
  }
};

/**
 * Track a custom feature usage event
 */
export const trackFeatureUsage = async (
  featureName: string,
  userId?: string
): Promise<void> => {
  try {
    // Track in GTM
    trackGTMEvent('feature_used', {
      feature_name: featureName,
      user_id: userId
    });
    
    // Record the metric directly with a simplified approach
    try {
      await supabase.rpc('record_metric', {
        p_metric_type: 'feature_usage',
        p_metric_name: featureName,
        p_metric_value: 1,
        p_dimension_name: 'user_id',
        p_dimension_value: userId || 'anonymous'
      });
    } catch (error) {
      console.error('Failed to record feature usage in database:', error);
    }
  } catch (error) {
    handleError('Failed to track feature usage', ErrorCategory.UNKNOWN);
  }
};
