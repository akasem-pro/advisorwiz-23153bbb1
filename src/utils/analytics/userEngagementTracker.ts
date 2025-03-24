
import { supabase } from '../../integrations/supabase/client';
import { trackEvent } from '../tagManager';
import { ErrorCategory, handleError } from '../errorHandling/errorHandler';

/**
 * Track user engagement with a custom event
 */
export const trackUserEngagement = (event: string, userId?: string, properties?: Record<string, any>): void => {
  try {
    // Track via tag manager
    trackEvent('user_engagement', {
      action: event,
      user_id: userId,
      ...properties
    });
  } catch (error) {
    handleError('Failed to track user engagement', ErrorCategory.UNKNOWN, true);
  }
};

/**
 * Track user session duration
 */
export const trackSessionDuration = (durationMs: number, userId?: string): void => {
  try {
    // Track via tag manager
    trackEvent('session_duration', {
      duration: durationMs,
      user_id: userId
    });
  } catch (error) {
    handleError('Failed to track session duration', ErrorCategory.UNKNOWN, true);
  }
};

/**
 * Track feature engagement metrics
 */
export const trackFeatureEngagement = (
  feature: string,
  action: 'view' | 'interact' | 'complete',
  userId?: string
): void => {
  try {
    // Only proceed if we have valid data
    if (!feature || !action) {
      return;
    }
    
    // Track via tag manager
    trackEvent('feature_engagement', {
      feature,
      action,
      user_id: userId
    });
  } catch (error) {
    handleError('Failed to track feature engagement', ErrorCategory.UNKNOWN, true);
  }
};

/**
 * Track page view duration
 */
export const trackPageViewDuration = (
  pagePath: string,
  durationMs: number,
  userId?: string
): void => {
  try {
    // Track via tag manager
    trackEvent('page_view_duration', {
      page_path: pagePath,
      duration: durationMs,
      user_id: userId
    });
  } catch (error) {
    handleError('Failed to track page view duration', ErrorCategory.UNKNOWN, true);
  }
};

/**
 * Track user onboarding completion
 */
export const trackOnboardingCompletion = (userId?: string): void => {
  try {
    // Track via tag manager
    trackEvent('onboarding_completed', {
      user_id: userId
    });
  } catch (error) {
    handleError('Failed to track onboarding completion', ErrorCategory.UNKNOWN, true);
  }
};
