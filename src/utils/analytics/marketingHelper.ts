
import { trackUserBehavior } from './eventTracker';
import { UserBehaviorEvent } from './types';

/**
 * Track app store related events
 */
export const trackAppStoreEvent = async (
  action: 'view' | 'click' | 'install',
  store: 'app_store' | 'play_store' | 'web',
  properties?: Record<string, any>
): Promise<void> => {
  trackUserBehavior(UserBehaviorEvent.FEATURE_USED, {
    feature: 'app_store',
    action,
    store,
    ...properties
  });
};

/**
 * Track review and rating events
 */
export const trackReviewEvent = async (
  action: 'request_shown' | 'rating_given' | 'review_submitted' | 'store_redirect',
  rating?: number,
  properties?: Record<string, any>
): Promise<void> => {
  trackUserBehavior(UserBehaviorEvent.FEEDBACK_SUBMITTED, {
    action,
    rating,
    ...properties
  });
};

/**
 * Track social sharing events
 */
export const trackSocialShareEvent = async (
  channel: string,
  content_type: string,
  item_id?: string,
  properties?: Record<string, any>
): Promise<void> => {
  trackUserBehavior('social_share', {
    channel,
    content_type,
    item_id,
    ...properties
  });
};

/**
 * Track marketing campaign events
 */
export const trackMarketingCampaign = async (
  campaign_id: string,
  campaign_name: string,
  action: 'view' | 'click' | 'conversion',
  source?: string,
  properties?: Record<string, any>
): Promise<void> => {
  trackUserBehavior('campaign_interaction', {
    campaign_id,
    campaign_name,
    action,
    source,
    ...properties
  });
};

/**
 * Track promotion banner events
 */
export const trackPromotionBanner = async (
  banner_id: string,
  action: 'view' | 'click' | 'dismiss',
  properties?: Record<string, any>
): Promise<void> => {
  trackUserBehavior('promotion_interaction', {
    banner_id,
    action,
    ...properties
  });
};

/**
 * Create UTM tracking URL
 */
export const createUtmUrl = (
  baseUrl: string,
  source: string,
  medium: string,
  campaign: string,
  content?: string,
  term?: string
): string => {
  const url = new URL(baseUrl);
  
  url.searchParams.append('utm_source', source);
  url.searchParams.append('utm_medium', medium);
  url.searchParams.append('utm_campaign', campaign);
  
  if (content) url.searchParams.append('utm_content', content);
  if (term) url.searchParams.append('utm_term', term);
  
  return url.toString();
};

/**
 * Track app installs from QR codes
 */
export const generateAppInstallQRCode = (
  campaign?: string,
  medium?: string
): string => {
  const baseUrl = 'https://advisorwiz.com/app';
  const utmSource = 'qr_code';
  const utmMedium = medium || 'print';
  const utmCampaign = campaign || 'general';
  
  return createUtmUrl(baseUrl, utmSource, utmMedium, utmCampaign);
};
