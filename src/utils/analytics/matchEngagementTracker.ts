import { supabase } from '../../integrations/supabase/client';
import { trackEvent } from '../tagManager';
import { ErrorCategory, handleError } from '../errorHandling/errorHandler';
import { storeAnalyticsMetric } from '../performance/core';
import { trackMatchingInteraction } from './matchTracker';
import { MatchAction } from './types';
import { trackFeatureEngagement } from './userEngagementTracker';

/**
 * Track specifically matching-related events
 */
export const trackMatchEngagement = async (
  action: MatchAction,
  matchId: string,
  score: number,
  userId?: string,
  details?: Record<string, any>
): Promise<void> => {
  try {
    storeAnalyticsMetric('match_engagement', action);
    
    // Also track as general feature engagement
    trackFeatureEngagement(`match_${action}`, 'interact', userId);
    
    // Extract advisor and consumer IDs from the match ID if available
    // Format is typically: "match-{advisorId}-{consumerId}"
    const parts = matchId.split('-');
    if (parts.length >= 3) {
      const advisorId = parts[1];
      const consumerId = parts[2];
      
      // Track detailed matching interaction
      await trackMatchingInteraction(
        action,
        advisorId,
        consumerId,
        score,
        matchId,
        details
      );
    }
    
    console.log(`Match engagement tracked: ${action}`, { matchId, score, details });
  } catch (error) {
    console.error('Failed to track match engagement:', error);
  }
};

/**
 * Track user interaction with matching profiles
 */
export const trackMatchCardInteraction = async (
  action: 'view' | 'click' | 'contact' | 'bookmark' | 'hide',
  profileId: string,
  userId?: string
): Promise<void> => {
  try {
    // Track in tag manager
    trackEvent('match_interaction', {
      action,
      profile_id: profileId,
      user_id: userId
    });
    
    // Mock database operation for profile interactions 
    // In a real implementation, this would be a proper database table
    console.log(`[Match Interaction] Recording ${action} for profile ${profileId} by user ${userId || 'anonymous'}`);
    
  } catch (error) {
    handleError('Failed to track match card interaction', ErrorCategory.UNKNOWN);
  }
};
