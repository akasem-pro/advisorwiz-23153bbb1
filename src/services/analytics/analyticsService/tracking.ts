
import { queueEvent } from './eventQueue';
import { trackGA4PageView } from '../../../utils/analytics/ga4Integration';
import { isAnalyticsAllowed } from './consent';

/**
 * Track a custom event
 */
export const trackEvent = (
  eventName: string, 
  properties?: Record<string, any>, 
  options?: {
    sendImmediately?: boolean;
    trackingType?: 'analytics' | 'marketing' | 'personalization';
  }
): void => {
  queueEvent(eventName, properties, options);
};

/**
 * Track page views
 */
export const trackPageView = (
  pageTitle: string,
  pagePath: string = window.location.pathname,
  properties?: Record<string, any>
): void => {
  if (!isAnalyticsAllowed('analytics')) return;
  
  const fullProperties = {
    page_title: pageTitle,
    page_location: window.location.href,
    page_path: pagePath,
    ...properties
  };
  
  // Track in GA4
  trackGA4PageView(pageTitle, pagePath, fullProperties);
  
  // Track as generic event for other systems
  trackEvent('page_view', fullProperties);
};
