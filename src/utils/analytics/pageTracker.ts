
import { UserBehaviorEvent } from './types';
import { trackUserBehavior } from './eventTracker';

/**
 * Track page view events with additional context
 */
export const trackPageView = async (
  pageTitle: string,
  pagePath: string,
  userId?: string,
  properties?: Record<string, any>
): Promise<void> => {
  await trackUserBehavior(
    UserBehaviorEvent.PAGE_VIEW, 
    userId,
    {
      page_title: pageTitle,
      page_path: pagePath,
      ...properties
    }
  );
};
