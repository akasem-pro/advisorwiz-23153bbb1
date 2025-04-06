
/**
 * Analytics Tracking
 * Core functionality for tracking events
 */
import { AnalyticsEvent, AnalyticsEventType } from './types';
import { getConfig } from './config';
import { isTrackingAllowed, shouldSampleEvent } from './privacy';
import { addToBuffer } from './buffer';

/**
 * Track an analytics event with sampling and privacy checks
 */
export const trackEvent = (
  eventType: string,
  eventName: string,
  eventValue: number = 1,
  properties?: Record<string, any>
): void => {
  const config = getConfig();
  
  // Check if this is a consent-related event
  const isConsentEvent = eventType === AnalyticsEventType.CONSENT || 
                          eventName.includes('consent') || 
                          eventName.includes('cookie');
  
  // If not a consent event, verify tracking is allowed
  if (!isConsentEvent && !isTrackingAllowed(eventType)) {
    return;
  }
  
  // Apply sampling (except for consent events)
  if (!isConsentEvent && !shouldSampleEvent(
    eventType, 
    config.samplingRate, 
    config.errorSamplingRate
  )) {
    return;
  }
  
  // Create the event object
  const event: AnalyticsEvent = {
    type: eventType,
    name: eventName,
    value: eventValue,
    timestamp: Date.now(),
    properties
  };
  
  // Add to buffer
  addToBuffer(event);
};

/**
 * Simplified tracking helpers
 */
export const trackPageView = (
  pageName: string,
  path: string = window.location.pathname, 
  properties?: Record<string, any>
): void => {
  trackEvent(
    AnalyticsEventType.PAGE_VIEW, 
    pageName, 
    1, 
    { path, url: window.location.href, ...properties }
  );
};

export const trackInteraction = (
  action: string,
  target: string,
  properties?: Record<string, any>
): void => {
  trackEvent(
    AnalyticsEventType.USER_INTERACTION, 
    action, 
    1, 
    { target, ...properties }
  );
};

export const trackFeature = (
  featureName: string,
  action: string = 'used',
  properties?: Record<string, any>
): void => {
  trackEvent(
    AnalyticsEventType.FEATURE_USAGE, 
    `${featureName}_${action}`, 
    1, 
    properties
  );
};

export const trackPerformance = (
  metricName: string,
  value: number,
  properties?: Record<string, any>
): void => {
  trackEvent(
    AnalyticsEventType.PERFORMANCE, 
    metricName, 
    value, 
    properties
  );
};

export const trackError = (
  errorType: string,
  message: string,
  properties?: Record<string, any>
): void => {
  trackEvent(
    AnalyticsEventType.ERROR, 
    errorType, 
    1, 
    { message, ...properties }
  );
};
