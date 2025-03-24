
import { supabase } from '../../integrations/supabase/client';
import { trackEvent } from '../tagManager';
import { ErrorCategory, handleError } from '../errorHandling/errorHandler';
import { MatchAction } from './types';
import { storeAnalyticsMetric } from '../performance/core';

/**
 * Track matching interactions between users
 */
export const trackMatchingInteraction = async (
  action: MatchAction,
  advisorId: string,
  consumerId: string,
  score: number,
  matchId: string,
  details?: Record<string, any>
): Promise<void> => {
  try {
    // Create the event object for tag manager
    trackEvent('match_action', {
      action,
      advisor_id: advisorId,
      consumer_id: consumerId,
      score,
      match_id: matchId,
      ...details
    });
    
    // Record interaction metrics
    storeAnalyticsMetric('match_action', action);
    
    console.log(`Matching interaction tracked: ${action}`, { 
      advisorId, 
      consumerId, 
      score, 
      matchId, 
      details 
    });
  } catch (error) {
    handleError(`Failed to track matching interaction: ${action}`, ErrorCategory.UNKNOWN, true);
  }
};

/**
 * Record match history in the database
 */
export const recordMatchHistory = async (
  advisorId: string,
  consumerId: string, 
  notes: string
): Promise<void> => {
  try {
    // Create the event object for tag manager
    trackEvent('match_record', {
      advisor_id: advisorId,
      consumer_id: consumerId,
      notes
    });
    
    // Logging for development
    console.log('Match history recorded', { advisorId, consumerId, notes });
  } catch (error) {
    handleError('Failed to record match history', ErrorCategory.UNKNOWN, true);
  }
};

/**
 * Track user viewing a match explanation
 */
export const trackMatchExplanationView = async (
  matchId: string, 
  userId: string,
  explanationId: string
): Promise<void> => {
  try {
    // This would record when a user views the detailed explanation of why
    // they were matched with a specific advisor
    console.log(`User ${userId} viewed explanation ${explanationId} for match ${matchId}`);
    
    // Create the event object for tag manager
    trackEvent('match_explanation_view', {
      user_id: userId
    });
  } catch (error) {
    console.error('Failed to track match explanation view:', error);
  }
};

// Export the trackPageView for performanceTracking.ts
export const trackPageView = (path: string): void => {
  try {
    console.log(`Page view tracked: ${path}`);
  } catch (error) {
    console.error('Failed to track page view:', error);
  }
};

// Export the trackPreferenceUpdate for performanceTracking.ts
export const trackPreferenceUpdate = (preference: string, value: any): void => {
  try {
    console.log(`Preference updated: ${preference} = ${value}`);
  } catch (error) {
    console.error('Failed to track preference update:', error);
  }
};
