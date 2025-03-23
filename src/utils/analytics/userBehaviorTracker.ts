
import { supabase } from '../../integrations/supabase/client';
import { storeAnalyticsMetric } from '../performance/core';

// Define common user behavior events for consistent tracking
export enum UserBehaviorEvent {
  PAGE_VIEW = 'page_view',
  SIGN_UP = 'sign_up',
  LOGIN = 'login',
  PROFILE_VIEW = 'profile_view',
  PROFILE_EDIT = 'profile_edit',
  MATCH_VIEW = 'match_view',
  MATCH_CLICK = 'match_click',
  ADVISOR_CONTACT = 'advisor_contact',
  APPOINTMENT_SCHEDULED = 'appointment_scheduled',
  APPOINTMENT_COMPLETED = 'appointment_completed',
  APPOINTMENT_CANCELED = 'appointment_canceled',
  FEEDBACK_SUBMITTED = 'feedback_submitted',
  FEATURE_USED = 'feature_used',
  SEARCH_PERFORMED = 'search_performed',
  FILTER_APPLIED = 'filter_applied',
  SORT_APPLIED = 'sort_applied'
}

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
      const interactionData: Record<string, any> = {
        interaction_type: event,
        notes: properties ? JSON.stringify(properties) : null
      };
      
      // Handle advisor/consumer specific interactions if those IDs are provided
      if (properties?.advisor_id) {
        interactionData.advisor_id = properties.advisor_id;
      }
      
      if (properties?.consumer_id) {
        interactionData.consumer_id = properties.consumer_id;
      }
      
      // Add duration if provided
      if (properties?.duration) {
        interactionData.duration = properties.duration;
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
 * Track detailed information about a matching interaction
 */
export const trackMatchingInteraction = async (
  matchAction: 'view' | 'click' | 'contact' | 'schedule' | 'feedback',
  advisorId: string,
  consumerId: string,
  matchScore: number,
  matchId?: string,
  additionalDetails?: Record<string, any>
): Promise<void> => {
  try {
    // Determine the event type based on the match action
    const eventType = `match_${matchAction}`;
    
    // Track the basic user behavior
    await trackUserBehavior(eventType, consumerId, {
      advisor_id: advisorId,
      match_score: matchScore,
      match_id: matchId,
      ...additionalDetails
    });
    
    // Store detailed match interaction in match_history table if appropriate
    if (['click', 'contact', 'schedule'].includes(matchAction)) {
      await supabase.from('match_history').insert({
        advisor_id: advisorId,
        consumer_id: consumerId,
        score: matchScore,
        compatibility_score_id: matchId,
        algorithm_version: '1.0', // Update as your algorithm evolves
        factors: additionalDetails || null
      });
    }
    
    // Log the match interaction for analytics
    await storeAnalyticsMetric(
      'matching',
      matchAction,
      matchScore,
      'match_id',
      matchId || `${advisorId}_${consumerId}`
    );
  } catch (error) {
    console.error('Failed to track matching interaction:', error);
  }
};

/**
 * Track page view events with additional context
 */
export const trackPageView = async (
  pageTitle: string,
  pagePath: string,
  userId?: string,
  properties?: Record<string, any>
): Promise<void> => {
  await trackUserBehavior(
    UserBehaviorEvent.PAGE_VIEW, 
    userId,
    {
      page_title: pageTitle,
      page_path: pagePath,
      ...properties
    }
  );
};
