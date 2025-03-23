
import { storeAnalyticsMetric } from '../performance/core';
import { trackUserBehavior } from './eventTracker';

/**
 * Track user engagement events with detailed metrics
 */
export const trackUserEngagement = async (
  eventType: string,
  userId?: string,
  details?: Record<string, any>
): Promise<void> => {
  try {
    await storeAnalyticsMetric(
      'user_engagement',
      eventType,
      1,
      'user_id',
      userId
    );
    
    if (details) {
      // Store additional details as separate metrics
      for (const [key, value] of Object.entries(details)) {
        if (typeof value === 'number') {
          await storeAnalyticsMetric(
            'user_engagement_detail',
            `${eventType}_${key}`,
            value,
            'user_id',
            userId
          );
        } else if (typeof value === 'string') {
          await storeAnalyticsMetric(
            'user_engagement_detail',
            `${eventType}_${key}`,
            1,
            key,
            value
          );
        }
      }
    }
    
    // Also track as general user behavior
    await trackUserBehavior(eventType, userId, details);
    
    console.log(`User engagement tracked: ${eventType}`, details);
  } catch (error) {
    console.error('Failed to track user engagement:', error);
  }
};
