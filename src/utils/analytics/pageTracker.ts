
import { UserBehaviorEvent } from './types';
import { trackUserBehavior } from './eventTracker';

/**
 * Track page view events with additional context
 */
export const trackPageView = async (
  pageTitle: string,
  pagePath: string,
  properties?: Record<string, any>
): Promise<void> => {
  trackUserBehavior(
    UserBehaviorEvent.PAGE_VIEW, 
    {
      page_title: pageTitle,
      page_path: pagePath,
      ...properties
    }
  );
};
