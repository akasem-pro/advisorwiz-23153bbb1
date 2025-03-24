import { supabase } from '../../integrations/supabase/client';
import { trackEvent } from '../tagManager';
import { ErrorCategory, handleError } from '../errorHandling/errorHandler';

/**
 * Track user session duration
 */
export const trackSessionDuration = (durationMs: number, userId?: string): void => {
  try {
    // Track via tag manager
    trackEvent('session_duration', {
      duration_ms: durationMs,
      user_id: userId
    });
  } catch (error) {
    handleError('Failed to track session duration', ErrorCategory.ANALYTICS);
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
    handleError('Failed to track feature engagement', ErrorCategory.ANALYTICS);
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
      duration_ms: durationMs,
      user_id: userId
    });
  } catch (error) {
    handleError('Failed to track page view duration', ErrorCategory.ANALYTICS);
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
    handleError('Failed to track onboarding completion', ErrorCategory.ANALYTICS);
  }
};
