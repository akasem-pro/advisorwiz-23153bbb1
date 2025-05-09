
import { trackEvent as dataLayerTrackEvent } from '../tagManager';
import { handleSupabaseError, ErrorSeverity } from '../errorHandling/supabaseErrorHandler';
import { storeAnalyticsMetric } from '../performance/core';
import { sendGA4Event, trackGA4UserInteraction } from './ga4Integration';

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
  PREFERENCE_UPDATED = 'preference_updated',
  
  // Cookie events
  COOKIE_CONSENT_ACCEPTED = 'cookie_consent_accepted',
  COOKIE_SETTINGS_UPDATED = 'cookie_settings_updated'
}

// Helper to check if analytics tracking is permitted based on cookie settings
const isAnalyticsTrackingAllowed = (): boolean => {
  // Essential cookies are always allowed
  
  // Check for consent
  const consent = localStorage.getItem('cookie-consent');
  if (!consent) return false;
  
  // Check for specific analytics permission
  const settings = localStorage.getItem('cookie-settings');
  if (settings) {
    try {
      const parsedSettings = JSON.parse(settings);
      return parsedSettings.analytics === true;
    } catch (error) {
      console.error('Failed to parse cookie settings:', error);
    }
  }
  
  // Default to true if consent given but no specific settings saved
  return true;
};

/**
 * Track user behavior events
 * @param event The event to track
 * @param properties Optional properties to include with the event
 */
export const trackUserBehavior = (
  event: UserBehaviorEvent | string,
  properties?: Record<string, any>
): void => {
  try {
    // Always track cookie consent events regardless of settings
    const isCookieEvent = event === UserBehaviorEvent.COOKIE_CONSENT_ACCEPTED || 
                          event === UserBehaviorEvent.COOKIE_SETTINGS_UPDATED;
                          
    // For other events, check if analytics is allowed
    if (!isCookieEvent && !isAnalyticsTrackingAllowed()) {
      return;
    }
    
    // Store event in analytics
    if (typeof event === 'string') {
      storeAnalyticsMetric('user_behavior', event);
    }
    
    // Track the event via tag manager
    dataLayerTrackEvent(event.toString(), properties || {});
    
    // Track the event in GA4
    sendGA4Event(event.toString(), properties || {});
    
  } catch (error) {
    handleSupabaseError(
      'Failed to track user behavior', 
      true, 
      ErrorSeverity.ERROR, 
      error
    );
  }
};

/**
 * Track feature usage
 * @param featureName The name of the feature being used
 * @param properties Optional additional properties
 */
export const trackFeatureUsage = (
  featureName: string,
  properties?: Record<string, any>
): void => {
  try {
    // Build properties object
    const trackingProperties = {
      feature_name: featureName,
      ...properties
    };
    
    // Track via tag manager
    dataLayerTrackEvent('feature_usage', trackingProperties);
    
    // Track via GA4
    trackGA4UserInteraction(
      'feature_usage',
      featureName,
      featureName,
      undefined,
      trackingProperties
    );
    
  } catch (error) {
    handleSupabaseError(
      'Failed to track feature usage', 
      true, 
      ErrorSeverity.ERROR, 
      error
    );
  }
};
