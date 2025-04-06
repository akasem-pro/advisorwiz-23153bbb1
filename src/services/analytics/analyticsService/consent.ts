
import { getCookieSettings } from '../../../utils/analytics/trackers/cookieBanner';

/**
 * Check if analytics tracking is allowed based on user consent
 */
export const isAnalyticsAllowed = (trackingType: 'analytics' | 'marketing' | 'personalization' = 'analytics'): boolean => {
  try {
    // Check for consent
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) return false;
    
    // Check for specific permission
    const settings = getCookieSettings();
    
    // Essential cookies are always allowed
    if (trackingType === 'analytics') {
      return settings.analytics === true;
    } else if (trackingType === 'marketing') {
      return settings.marketing === true;
    } else if (trackingType === 'personalization') {
      return settings.personalization === true;
    }
    
    return false;
  } catch (error) {
    console.error('Failed to check analytics permissions:', error);
    return false;
  }
};
