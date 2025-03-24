
import { trackEvent as dataLayerTrackEvent } from '../tagManager';
import { ErrorCategory, handleError } from '../errorHandling/errorHandler';
import { storeAnalyticsMetric } from '../performance/core';

// Define common user behavior events
export enum UserBehaviorEvent {
  // Page interaction events
  PAGE_VIEW = 'page_view',
  
  // Authentication events
  SIGN_UP = 'sign_up',
  LOGIN = 'login',
  
  // Profile events
  PROFILE_VIEW = 'profile_view',
  PROFILE_EDIT = 'profile_edit',
  
  // Matching events
  MATCH_VIEW = 'match_view',
  MATCH_CLICK = 'match_click',
  MATCH_FEEDBACK = 'match_feedback',
  
  // Advisor interaction events
  ADVISOR_CONTACT = 'advisor_contact',
  
  // Appointment events
  APPOINTMENT_SCHEDULED = 'appointment_scheduled',
  APPOINTMENT_COMPLETED = 'appointment_completed',
  APPOINTMENT_CANCELED = 'appointment_canceled',
  
  // Feedback events
  FEEDBACK_SUBMITTED = 'feedback_submitted',
  
  // Feature usage events
  FEATURE_USED = 'feature_used',
  
  // Search events
  SEARCH_PERFORMED = 'search_performed',
  FILTER_APPLIED = 'filter_applied',
  SORT_APPLIED = 'sort_applied',
  
  // Preference events
  PREFERENCE_UPDATED = 'preference_updated'
}

/**
 * Track user behavior events
 */
export const trackUserBehavior = (
  event: UserBehaviorEvent | string,
  properties?: Record<string, any>
): void => {
  try {
    // Store event in analytics
    if (typeof event === 'string') {
      storeAnalyticsMetric('user_behavior', event);
    }
    
    // Track the event via tag manager
    dataLayerTrackEvent(event.toString(), properties || {});
    
  } catch (error) {
    handleError('Failed to track user behavior', ErrorCategory.UNKNOWN, true);
  }
};

/**
 * Track feature usage
 */
export const trackFeatureUsage = (
  featureName: string,
  userId?: string
): void => {
  try {
    // Track via tag manager
    dataLayerTrackEvent('feature_usage', {
      feature_name: featureName,
      user_id: userId
    });
    
  } catch (error) {
    handleError('Failed to track feature usage', ErrorCategory.UNKNOWN, true);
  }
};
