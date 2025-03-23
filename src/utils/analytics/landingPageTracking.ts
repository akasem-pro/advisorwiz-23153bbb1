
import { trackUserBehavior } from './eventTracker';
import { UserBehaviorEvent } from './types';

/**
 * Track feature clicks and interactions on the landing page
 */
export const trackLandingPageInteraction = async (
  feature: string,
  action: string,
  userId?: string,
  properties?: Record<string, any>
): Promise<void> => {
  await trackUserBehavior(
    UserBehaviorEvent.FEATURE_INTERACTION,
    userId,
    {
      feature,
      action,
      page: 'landing',
      ...properties
    }
  );
};

/**
 * Track CTA clicks on the landing page
 */
export const trackLandingPageCTA = async (
  ctaLocation: string,
  ctaText: string,
  userId?: string
): Promise<void> => {
  await trackUserBehavior(
    UserBehaviorEvent.CTA_CLICK,
    userId,
    {
      location: ctaLocation,
      text: ctaText,
      page: 'landing'
    }
  );
};

/**
 * Track section views on the landing page using Intersection Observer
 */
export const createSectionViewTracker = (
  sectionId: string,
  sectionName: string
): IntersectionObserverCallback => {
  return (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        trackUserBehavior(
          UserBehaviorEvent.SECTION_VIEW,
          undefined,
          {
            section_id: sectionId,
            section_name: sectionName,
            page: 'landing',
            visible_percentage: Math.round(entry.intersectionRatio * 100)
          }
        );
        // Optionally unobserve after first view
        // observer.unobserve(entry.target);
      }
    });
  };
};
