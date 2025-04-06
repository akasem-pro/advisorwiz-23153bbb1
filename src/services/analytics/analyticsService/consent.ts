
import { ConsentType, isConsentGiven } from '../consent';

/**
 * Check if analytics tracking is allowed based on user consent
 * Uses the centralized consent management module
 */
export const isAnalyticsAllowed = (trackingType: 'analytics' | 'marketing' | 'personalization' = 'analytics'): boolean => {
  try {
    // Map to the correct consent type
    const consentType = trackingType === 'analytics' 
      ? ConsentType.ANALYTICS 
      : trackingType === 'marketing' 
        ? ConsentType.MARKETING 
        : ConsentType.PERSONALIZATION;
    
    // Use the centralized consent checking
    return isConsentGiven(consentType);
  } catch (error) {
    console.error('Failed to check analytics permissions:', error);
    return false;
  }
};
