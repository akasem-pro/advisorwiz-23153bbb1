
import { trackUserBehavior } from './eventTracker';
import { UserBehaviorEvent } from './types';

/**
 * Track feature clicks and interactions on the landing page
 */
export const trackLandingPageInteraction = async (
  feature: string,
  action: string,
  properties?: Record<string, any>
): Promise<void> => {
  trackUserBehavior(UserBehaviorEvent.FEATURE_USED, { 
    feature,
    action,
    page: 'landing',
    ...properties
  });
};

/**
 * Track CTA clicks on the landing page
 */
export const trackLandingPageCTA = async (
  ctaLocation: string,
  ctaText: string,
  properties?: Record<string, any>
): Promise<void> => {
  trackUserBehavior(UserBehaviorEvent.FEATURE_USED, {
    location: ctaLocation,
    text: ctaText,
    page: 'landing',
    ...properties
  });
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
        trackUserBehavior(UserBehaviorEvent.PAGE_VIEW, {
          section_id: sectionId,
          section_name: sectionName,
          page: 'landing',
          visible_percentage: Math.round(entry.intersectionRatio * 100)
        });
        // Optionally unobserve after first view
        // observer.unobserve(entry.target);
      }
    });
  };
};
