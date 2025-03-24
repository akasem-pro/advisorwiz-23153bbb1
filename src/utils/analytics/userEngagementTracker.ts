
import { supabase } from '../../integrations/supabase/client';
import { trackEvent } from '../tagManager';
import { ErrorCategory, handleError } from '../errorHandling/errorHandler';

/**
 * Track user engagement with a custom event
 */
export const trackUserEngagement = (event: string, properties?: Record<string, any>): void => {
  try {
    // Track via tag manager
    trackEvent('user_engagement', {
      action: event,
      ...properties
    });
  } catch (error) {
    handleError('Failed to track user engagement', true);
  }
};

/**
 * Track user session duration
 */
export const trackSessionDuration = (durationMs: number, properties?: Record<string, any>): void => {
  try {
    // Track via tag manager
    trackEvent('session_duration', {
      duration: durationMs,
      ...properties
    });
  } catch (error) {
    handleError('Failed to track session duration', true);
  }
};

/**
 * Track feature engagement metrics
 */
export const trackFeatureEngagement = (
  feature: string,
  action: 'view' | 'interact' | 'complete',
  properties?: Record<string, any>
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
      ...properties
    });
  } catch (error) {
    handleError('Failed to track feature engagement', true);
  }
};

/**
 * Track page view duration
 */
export const trackPageViewDuration = (
  pagePath: string,
  durationMs: number,
  properties?: Record<string, any>
): void => {
  try {
    // Track via tag manager
    trackEvent('page_view_duration', {
      page_path: pagePath,
      duration: durationMs,
      ...properties
    });
  } catch (error) {
    handleError('Failed to track page view duration', true);
  }
};

/**
 * Track user onboarding completion
 */
export const trackOnboardingCompletion = (properties?: Record<string, any>): void => {
  try {
    // Track via tag manager
    trackEvent('onboarding_completed', properties || {});
  } catch (error) {
    handleError('Failed to track onboarding completion', true);
  }
};
