
import { supabase } from '../../integrations/supabase/client';
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
    await storeAnalyticsMetric(
      'user_behavior',
      event,
      1,
      'user_id',
      userId
    );
    
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
