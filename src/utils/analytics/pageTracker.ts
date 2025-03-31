
import { UserBehaviorEvent } from './types';
import { trackUserBehavior } from './eventTracker';
import { trackGA4PageView } from './ga4Integration';

// Helper to check if analytics tracking is permitted
const isAnalyticsTrackingAllowed = (): boolean => {
  // Check for consent
  const consent = localStorage.getItem('cookie-consent');
  if (!consent) return false;
  
  // Check for specific analytics permission
  const settings = localStorage.getItem('cookie-settings');
  if (settings) {
    try {
      const parsedSettings = JSON.parse(settings);
      return parsedSettings.analytics === true;
    } catch (error) {
      console.error('Failed to parse cookie settings:', error);
    }
  }
  
  // Default to true if consent given but no specific settings saved
  return true;
};

/**
 * Track page view events with additional context
 */
export const trackPageView = async (
  pageTitle: string,
  pagePath: string,
  properties?: Record<string, any>
): Promise<void> => {
  // Only track if analytics tracking is allowed
  if (!isAnalyticsTrackingAllowed()) {
    return;
  }
  
  // Track using the existing behavior tracking system
  trackUserBehavior(
    UserBehaviorEvent.PAGE_VIEW, 
    {
      page_title: pageTitle,
      page_path: pagePath,
      ...properties
    }
  );
  
  // Track specifically in GA4
  trackGA4PageView(pageTitle, pagePath, properties);
};
