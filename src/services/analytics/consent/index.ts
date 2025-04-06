
/**
 * Centralized consent management
 * Provides a single source of truth for user consent status
 */

// Consent types
export enum ConsentType {
  ANALYTICS = 'analytics',
  MARKETING = 'marketing',
  PERSONALIZATION = 'personalization',
  ESSENTIAL = 'essential'
}

/**
 * Check if a particular type of tracking is allowed based on user consent
 */
export const isConsentGiven = (type: ConsentType = ConsentType.ANALYTICS): boolean => {
  try {
    // Essential is always allowed
    if (type === ConsentType.ESSENTIAL) return true;
    
    // Check for consent
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) return false;
    
    // Check for specific permission
    const settingsStr = localStorage.getItem('cookie-settings');
    if (!settingsStr) {
      // If consent is given but no specific settings, default to allowing analytics only
      return type === ConsentType.ANALYTICS;
    }
    
    const settings = JSON.parse(settingsStr);
    return settings[type] === true;
  } catch (error) {
    console.error('Failed to check consent status:', error);
    return false;
  }
};

/**
 * Update consent settings
 */
export const updateConsent = (
  settings: Partial<Record<ConsentType, boolean>>
): void => {
  try {
    // Get current settings
    const currentSettingsStr = localStorage.getItem('cookie-settings');
    const currentSettings = currentSettingsStr ? JSON.parse(currentSettingsStr) : {
      essential: true,
      analytics: false,
      marketing: false,
      personalization: false
    };
    
    // Update with new settings
    const newSettings = {
      ...currentSettings,
      ...settings,
      essential: true // Essential is always true
    };
    
    // Save to local storage
    localStorage.setItem('cookie-settings', JSON.stringify(newSettings));
    localStorage.setItem('cookie-consent', 'accepted');
    
    // Dispatch event for other parts of the application
    window.dispatchEvent(new CustomEvent('consent-updated', { detail: newSettings }));
  } catch (error) {
    console.error('Failed to update consent settings:', error);
  }
};

/**
 * Get all current consent settings
 */
export const getConsentSettings = (): Record<ConsentType, boolean> => {
  try {
    const settingsStr = localStorage.getItem('cookie-settings');
    const hasConsent = localStorage.getItem('cookie-consent') === 'accepted';
    
    if (!hasConsent) {
      return {
        [ConsentType.ESSENTIAL]: true,
        [ConsentType.ANALYTICS]: false,
        [ConsentType.MARKETING]: false,
        [ConsentType.PERSONALIZATION]: false
      };
    }
    
    if (settingsStr) {
      const settings = JSON.parse(settingsStr);
      return {
        [ConsentType.ESSENTIAL]: true,
        [ConsentType.ANALYTICS]: settings.analytics === true,
        [ConsentType.MARKETING]: settings.marketing === true,
        [ConsentType.PERSONALIZATION]: settings.personalization === true
      };
    }
    
    // Default if consent given but no specific settings
    return {
      [ConsentType.ESSENTIAL]: true,
      [ConsentType.ANALYTICS]: true,
      [ConsentType.MARKETING]: false,
      [ConsentType.PERSONALIZATION]: false
    };
  } catch (error) {
    console.error('Failed to get consent settings:', error);
    return {
      [ConsentType.ESSENTIAL]: true,
      [ConsentType.ANALYTICS]: false,
      [ConsentType.MARKETING]: false,
      [ConsentType.PERSONALIZATION]: false
    };
  }
};
