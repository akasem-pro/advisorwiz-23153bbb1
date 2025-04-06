
/**
 * Analytics Privacy Controls
 * Handles consent checking and privacy-related functionality
 */
import { AnalyticsEventType } from './types';
import { ConsentType, isConsentGiven } from '../consent';

/**
 * Check if tracking is allowed for a given event type
 * Uses centralized consent management
 */
export const isTrackingAllowed = (eventType: string): boolean => {
  // Always allow essential events
  if (eventType === AnalyticsEventType.ERROR || 
      eventType === AnalyticsEventType.CONSENT) {
    return true;
  }
  
  // Check for specific permission based on event type
  switch (eventType) {
    case AnalyticsEventType.PAGE_VIEW:
    case AnalyticsEventType.PERFORMANCE:
      return isConsentGiven(ConsentType.ANALYTICS);
    case AnalyticsEventType.CONVERSION:
    case AnalyticsEventType.USER_INTERACTION:
      return isConsentGiven(ConsentType.MARKETING);
    case AnalyticsEventType.FEATURE_USAGE:
      return isConsentGiven(ConsentType.PERSONALIZATION) || isConsentGiven(ConsentType.ANALYTICS);
    default:
      return isConsentGiven(ConsentType.ANALYTICS);
  }
};

/**
 * Check if an event should be sampled based on sampling rate
 * @param eventType The type of event
 * @param samplingRate Regular sampling rate (0-1)
 * @param errorSamplingRate Error sampling rate (0-1)
 */
export const shouldSampleEvent = (
  eventType: string, 
  samplingRate: number, 
  errorSamplingRate: number
): boolean => {
  // Use appropriate sampling rate based on event type
  const rate = eventType === AnalyticsEventType.ERROR 
    ? errorSamplingRate 
    : samplingRate;
  
  // Skip event based on sampling rate
  return Math.random() <= rate;
};
