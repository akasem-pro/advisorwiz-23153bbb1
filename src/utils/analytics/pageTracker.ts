
import { UserBehaviorEvent } from './types';
import { trackUserBehavior } from './eventTracker';
import { trackGA4PageView } from './ga4Integration';

/**
 * Track page view events with additional context
 */
export const trackPageView = async (
  pageTitle: string,
  pagePath: string,
  properties?: Record<string, any>
): Promise<void> => {
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
