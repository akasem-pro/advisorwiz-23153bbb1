
import { storeAnalyticsMetric } from '../performance/core';
import { trackMatchingInteraction } from './matchTracker';
import { MatchAction } from './types';
import { trackUserEngagement } from './userEngagementTracker';

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
    await storeAnalyticsMetric(
      'match_engagement',
      action,
      score,
      'match_id',
      matchId
    );
    
    // Also track as general user engagement
    await trackUserEngagement(`match_${action}`, userId, {
      match_id: matchId,
      score,
      ...details
    });
    
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
