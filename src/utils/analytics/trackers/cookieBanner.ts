import { trackUserBehavior } from '../eventTracker';

/**
 * Cookie consent event types
 */
export enum CookieConsentEvent {
  BANNER_SHOWN = 'cookie_banner_shown',
  CONSENT_ACCEPTED = 'cookie_consent_accepted',
  CONSENT_DECLINED = 'cookie_consent_declined',
  SETTINGS_OPENED = 'cookie_settings_opened',
  SETTINGS_SAVED = 'cookie_settings_saved'
}

/**
 * Track cookie consent events
 * @param event The cookie consent event to track
 * @param properties Additional properties to track
 */
export const trackCookieConsentEvent = (
  event: CookieConsentEvent,
  properties?: Record<string, any>
) => {
  // Cookie consent events can always be tracked regardless of settings
  trackUserBehavior(event, properties);
};

/**
 * Get the current cookie settings
 */
export const getCookieSettings = (): {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  personalization: boolean;
  hasConsent: boolean;
} => {
  // Check for consent
  const consent = localStorage.getItem('cookie-consent');
  if (!consent) {
    return {
      essential: true,
      analytics: false,
      marketing: false,
      personalization: false,
      hasConsent: false
    };
  }

  // Load saved settings if they exist
  const savedSettings = localStorage.getItem('cookie-settings');
  if (savedSettings) {
    try {
      const parsedSettings = JSON.parse(savedSettings);
      return {
        ...parsedSettings,
        essential: true, // Essential is always true
        hasConsent: true
      };
    } catch (error) {
      console.error('Failed to parse cookie settings:', error);
    }
  }

  // Default to basic consent with only essential and analytics
  return {
    essential: true,
    analytics: true,
    marketing: false,
    personalization: false,
    hasConsent: true
  };
};

/**
 * Check if a specific type of tracking is allowed based on cookie settings
 * @param type The type of tracking to check
 */
export const isTrackingAllowed = (
  type: 'analytics' | 'marketing' | 'personalization' | 'essential'
): boolean => {
  const settings = getCookieSettings();
  
  // Essential cookies are always allowed
  if (type === 'essential') return true;
  
  // Other cookie types require consent and their specific setting enabled
  return settings.hasConsent && settings[type] === true;
};

/**
 * Update cookie settings in local storage
 * @param settings The new cookie settings
 */
export const updateCookieSettings = (settings: {
  essential?: boolean;
  analytics?: boolean;
  marketing?: boolean;
  personalization?: boolean;
}): void => {
  // Get existing settings
  const currentSettings = getCookieSettings();
  
  // Update with new settings
  const newSettings = {
    ...currentSettings,
    ...settings,
    essential: true, // Essential is always true
  };
  
  // Save to local storage
  localStorage.setItem('cookie-settings', JSON.stringify(newSettings));
  localStorage.setItem('cookie-consent', 'accepted');
  
  // Track the settings update
  trackCookieConsentEvent(CookieConsentEvent.SETTINGS_SAVED, newSettings);
};
