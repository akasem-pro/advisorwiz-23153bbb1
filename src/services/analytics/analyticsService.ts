
import { storeAnalyticsMetric } from '../../utils/performance/core';
import { sendGA4Event, trackGA4PageView, setGA4UserProperties } from '../../utils/analytics/ga4Integration';
import { supabase } from '../../integrations/supabase/client';
import { toast } from 'sonner';

// Check for analytics consent
export const isAnalyticsAllowed = (): boolean => {
  try {
    // Check for consent
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) return false;
    
    // Check for specific analytics permission
    const settings = localStorage.getItem('cookie-settings');
    if (settings) {
      const parsedSettings = JSON.parse(settings);
      return parsedSettings.analytics === true;
    }
    
    // Default to true if consent given but no specific settings saved
    return true;
  } catch (error) {
    console.error('Failed to check analytics permissions:', error);
    return false;
  }
};

/**
 * Track a custom event across all analytics platforms
 */
export const trackEvent = (
  eventName: string, 
  properties?: Record<string, any>, 
  options?: {
    sendToGA4?: boolean;
    storeInDatabase?: boolean;
    sendImmediately?: boolean;
  }
): void => {
  try {
    const opts = {
      sendToGA4: true,
      storeInDatabase: true,
      sendImmediately: false,
      ...options
    };
    
    // Skip if analytics not allowed (unless it's a consent-related event)
    const isCookieEvent = eventName.includes('cookie_') || eventName.includes('consent');
    if (!isCookieEvent && !isAnalyticsAllowed()) {
      return;
    }
    
    // Log event in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Analytics] Tracking event: ${eventName}`, properties);
    }
    
    // Track in Google Analytics
    if (opts.sendToGA4) {
      sendGA4Event(eventName, properties);
    }
    
    // Store in internal metrics system
    if (properties?.value && typeof properties.value === 'number') {
      storeAnalyticsMetric(eventName, properties.value);
    } else {
      storeAnalyticsMetric(eventName, 1);
    }
    
    // Store in Supabase if needed
    if (opts.storeInDatabase) {
      storeEventInDatabase(eventName, properties, opts.sendImmediately);
    }
  } catch (error) {
    console.error('Failed to track event:', error);
  }
};

/**
 * Store event in database
 */
const storeEventInDatabase = async (
  eventName: string,
  properties?: Record<string, any>,
  sendImmediately: boolean = false
): Promise<void> => {
  try {
    // Get user ID if available
    const session = await supabase.auth.getSession();
    const userId = session?.data?.session?.user?.id;
    
    // Create metric data for analytics_metrics
    const metricData = {
      metric_type: eventName.split('_')[0] || 'event',
      metric_name: eventName,
      metric_value: properties?.value || 1,
      metric_date: new Date().toISOString().split('T')[0],
      dimension_name: 'event_name',
      dimension_value: eventName
    };
    
    // Store in Supabase analytics_metrics
    const { error } = await supabase.from('analytics_metrics').insert(metricData);
    
    // If there are additional properties, store them as separate dimensions
    if (properties && !error) {
      // Store userId as a dimension if available
      if (userId) {
        await supabase.from('analytics_metrics').insert({
          metric_type: metricData.metric_type,
          metric_name: metricData.metric_name,
          metric_value: metricData.metric_value,
          metric_date: metricData.metric_date,
          dimension_name: 'user_id',
          dimension_value: userId
        });
      }
      
      // Store page path if available
      if (properties.page_path) {
        await supabase.from('analytics_metrics').insert({
          metric_type: metricData.metric_type,
          metric_name: metricData.metric_name,
          metric_value: metricData.metric_value,
          metric_date: metricData.metric_date,
          dimension_name: 'page_path',
          dimension_value: properties.page_path
        });
      }
    }
    
    if (error && process.env.NODE_ENV === 'development') {
      console.error('Failed to store event in database:', error);
    }
  } catch (error) {
    // Silent fail in production
    if (process.env.NODE_ENV === 'development') {
      console.error('Failed to store event in database:', error);
    }
  }
};

/**
 * Track page views consistently across platforms
 */
export const trackPageView = (
  pageTitle: string,
  pagePath: string = window.location.pathname,
  properties?: Record<string, any>
): void => {
  if (!isAnalyticsAllowed()) return;
  
  const fullProperties = {
    page_title: pageTitle,
    page_location: window.location.href,
    page_path: pagePath,
    ...properties
  };
  
  // Track in GA4
  trackGA4PageView(pageTitle, pagePath, fullProperties);
  
  // Track as generic event
  trackEvent('page_view', fullProperties, { storeInDatabase: true });
};

/**
 * Track user engagement with features
 */
export const trackFeatureEngagement = (
  featureName: string,
  action: 'view' | 'click' | 'use' | 'complete',
  properties?: Record<string, any>
): void => {
  const eventName = `feature_${action}`;
  
  trackEvent(eventName, {
    feature_name: featureName,
    ...properties
  });
};

/**
 * Track user conversion/success metrics
 */
export const trackConversion = (
  conversionType: string,
  value?: number,
  properties?: Record<string, any>
): void => {
  trackEvent('conversion', {
    conversion_type: conversionType,
    value,
    ...properties
  }, { sendImmediately: true });
  
  // Show success toast for certain conversions
  if (['signup_completed', 'appointment_booked', 'match_confirmed'].includes(conversionType)) {
    toast.success('Success! Your action was completed.');
  }
};

/**
 * Set user properties for better analytics segmentation
 */
export const setUserProperties = (properties: Record<string, any>): void => {
  if (!isAnalyticsAllowed()) return;
  
  // Set in GA4
  setGA4UserProperties(properties);
  
  // Store in database for future reference
  storeUserProperties(properties);
};

/**
 * Store user properties in database
 */
const storeUserProperties = async (properties: Record<string, any>): Promise<void> => {
  try {
    // Get user ID
    const session = await supabase.auth.getSession();
    const userId = session?.data?.session?.user?.id;
    
    if (!userId) return;
    
    // Store user properties as analytics metrics
    Object.entries(properties).forEach(async ([key, value]) => {
      if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
        await supabase.from('analytics_metrics').insert({
          metric_type: 'user_property',
          metric_name: key,
          metric_value: typeof value === 'number' ? value : 1,
          metric_date: new Date().toISOString().split('T')[0],
          dimension_name: 'property_name',
          dimension_value: String(value)
        });
      }
    });
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Failed to store user properties:', error);
    }
  }
};

/**
 * Initialize analytics tracking
 */
export const initAnalytics = (): void => {
  // Generate session ID if not exists
  if (!localStorage.getItem('session_id')) {
    localStorage.setItem('session_id', `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`);
  }
  
  // Track initial page view
  const pageTitle = document.title;
  const pageUrl = window.location.pathname;
  trackPageView(pageTitle, pageUrl);
  
  // Set up navigation tracking for single page apps
  if (typeof window !== 'undefined' && 'addEventListener' in window) {
    const originalPushState = history.pushState;
    history.pushState = function(...args) {
      originalPushState.apply(this, args);
      trackPageView(document.title, window.location.pathname);
    };
    
    window.addEventListener('popstate', () => {
      trackPageView(document.title, window.location.pathname);
    });
  }
  
  console.log('[Analytics] Analytics tracking initialized');
};
