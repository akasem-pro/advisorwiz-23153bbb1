
import { supabase } from '../../integrations/supabase/client';
import { trackEvent } from '../tagManager';
import { handleError, ErrorCategory } from '../errorHandling/errorHandler';
import { storeAnalyticsMetric } from '../performance/core';
import { MatchAction } from './types';

/**
 * Record a match interaction for analytics
 */
export const trackMatchingInteraction = async (
  action: MatchAction,
  advisorId: string,
  consumerId: string,
  score: number,
  matchId?: string,
  details?: Record<string, any>
): Promise<void> => {
  try {
    // Track the event in our analytics system
    trackEvent('matching_interaction', {
      action: action,
      advisor_id: advisorId,
      consumer_id: consumerId,
      score: score,
      match_id: matchId,
      ...details
    });
    
    // Store in Supabase analytics metrics
    storeAnalyticsMetric('matching_interaction', action);
    
    // Log detail in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`Match Interaction: ${action}`, {
        advisorId,
        consumerId,
        score,
        matchId,
        details
      });
    }
  } catch (error) {
    handleError(
      `Failed to track matching interaction: ${action}`,
      ErrorCategory.UNKNOWN
    );
  }
};

/**
 * Track match history for a specific match
 */
export const recordMatchHistory = async (
  advisorId: string,
  consumerId: string,
  action: string,
  notes?: string
): Promise<void> => {
  try {
    // Create record of this match history in our database
    console.log(`[Match History] Recording ${action} between advisor ${advisorId} and consumer ${consumerId}`);
    
    // Track as an event for analytics
    trackEvent('match_history', {
      action: action,
      advisor_id: advisorId,
      consumer_id: consumerId,
      notes: notes
    });
  } catch (error) {
    handleError(
      'Failed to record match history',
      ErrorCategory.UNKNOWN
    );
  }
};

/**
 * Track match interaction for a specific action
 */
export const trackMatchAction = async (
  action: MatchAction,
  matchId: string,
  userId?: string,
  details?: Record<string, any>
): Promise<void> => {
  try {
    // Extract IDs from match ID
    const parts = matchId.split('-');
    const advisorId = parts[1];
    const consumerId = parts[2];
    
    // Track as a user behavior
    trackUserBehavior(`match_${action}`, userId, {
      match_id: matchId,
      advisor_id: advisorId,
      consumer_id: consumerId,
      ...details
    });
    
    // Track a metric
    storeAnalyticsMetric(`match_${action}`, 1);
    
    console.log(`Match action tracked: ${action}`, { matchId, userId, details });
  } catch (error) {
    console.error(`Failed to track match action ${action}:`, error);
  }
};

/**
 * Helper function for trackUserBehavior since it's used in multiple places
 */
export const trackUserBehavior = async (
  event: string,
  userId?: string,
  properties?: Record<string, any>
): Promise<void> => {
  try {
    trackEvent('user_behavior', {
      action: event,
      user_id: userId,
      ...properties
    });
  } catch (error) {
    console.error('Failed to track user behavior:', error);
  }
};
