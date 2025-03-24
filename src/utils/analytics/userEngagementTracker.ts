
import { supabase } from '../../integrations/supabase/client';
import { trackEvent } from '../tagManager';
import { ErrorCategory, handleError } from '../errorHandling/errorHandler';

/**
 * Track user engagement with a custom event
 */
export const trackUserEngagement = (event: string, userId?: string, properties?: Record<string, any>): void => {
  try {
    // Track via tag manager
    trackEvent({
      category: 'engagement',
      action: event,
      properties: {
        user_id: userId,
        ...properties
      }
    });
  } catch (error) {
    handleError('Failed to track user engagement', ErrorCategory.UNKNOWN);
  }
};

/**
 * Track user session duration
 */
export const trackSessionDuration = (durationMs: number, userId?: string): void => {
  try {
    // Track via tag manager
    trackEvent({
      category: 'session',
      action: 'duration',
      value: durationMs,
      properties: {
        user_id: userId
      }
    });
  } catch (error) {
    handleError('Failed to track session duration', ErrorCategory.UNKNOWN);
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
    trackEvent({
      category: 'feature',
      action: 'engagement',
      label: `${feature}:${action}`,
      properties: {
        feature,
        action,
        user_id: userId
      }
    });
  } catch (error) {
    handleError('Failed to track feature engagement', ErrorCategory.UNKNOWN);
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
    trackEvent({
      category: 'page_view',
      action: 'duration',
      label: pagePath,
      value: durationMs,
      properties: {
        page_path: pagePath,
        user_id: userId
      }
    });
  } catch (error) {
    handleError('Failed to track page view duration', ErrorCategory.UNKNOWN);
  }
};

/**
 * Track user onboarding completion
 */
export const trackOnboardingCompletion = (userId?: string): void => {
  try {
    // Track via tag manager
    trackEvent({
      category: 'onboarding',
      action: 'completed',
      properties: {
        user_id: userId
      }
    });
  } catch (error) {
    handleError('Failed to track onboarding completion', ErrorCategory.UNKNOWN);
  }
};
