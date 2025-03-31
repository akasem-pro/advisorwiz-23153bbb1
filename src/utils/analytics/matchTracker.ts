
import { sendGA4Event } from './ga4Integration';

/**
 * Track matching interactions with GA4
 */
export const trackMatchingInteraction = async (
  action: 'view' | 'click' | 'contact' | 'save' | 'dismiss',
  advisorId: string,
  consumerId: string,
  matchScore: number,
  matchId: string,
  additionalData?: Record<string, any>
): Promise<void> => {
  try {
    // Track in GA4
    sendGA4Event('matching_interaction', {
      action,
      advisor_id: advisorId,
      consumer_id: consumerId,
      match_score: matchScore,
      match_id: matchId,
      ...additionalData
    });
    
    // Continue with any existing functionality
    console.log(`Match interaction: ${action}`, { 
      advisorId, 
      consumerId, 
      matchScore, 
      matchId, 
      additionalData 
    });
    
    // Return a resolved promise to ensure interface compatibility
    return Promise.resolve();
  } catch (error) {
    console.error('Error tracking match interaction:', error);
    return Promise.reject(error);
  }
};
