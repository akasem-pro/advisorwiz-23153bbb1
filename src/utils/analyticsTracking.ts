
import { supabase } from '../integrations/supabase/client';

interface AnalyticsEvent {
  category: string;
  action: string;
  label?: string;
  value?: number;
  properties?: Record<string, any>;
}

// Track an analytics event
export const trackEvent = async ({
  category,
  action,
  label,
  value,
  properties
}: AnalyticsEvent): Promise<void> => {
  try {
    // Send to Google Analytics if available
    if (typeof window !== 'undefined' && 'gtag' in window) {
      // @ts-ignore
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value,
        ...properties
      });
    }
    
    // Store in Supabase analytics
    await supabase.rpc('record_metric', {
      p_metric_type: category,
      p_metric_name: action,
      p_metric_value: value || 1,
      p_dimension_name: 'label',
      p_dimension_value: label
    });
    
    // If there are additional properties, store them as separate dimensions
    if (properties) {
      for (const [key, value] of Object.entries(properties)) {
        if (typeof value === 'string' || typeof value === 'number') {
          await supabase.rpc('record_metric', {
            p_metric_type: category,
            p_metric_name: `${action}_${key}`,
            p_metric_value: typeof value === 'number' ? value : 1,
            p_dimension_name: key,
            p_dimension_value: String(value)
          });
        }
      }
    }
  } catch (error) {
    console.error('Failed to track event:', error);
  }
};

// Track a conversion event
export const trackConversion = async (
  conversionType: string,
  userId?: string,
  visitorId?: string,
  value?: number,
  properties?: Record<string, any>
): Promise<void> => {
  try {
    // Get visitor ID from localStorage if not provided
    if (!visitorId && typeof window !== 'undefined') {
      visitorId = localStorage.getItem('visitor_id') || undefined;
    }
    
    // Send to Google Analytics
    if (typeof window !== 'undefined' && 'gtag' in window) {
      // @ts-ignore
      window.gtag('event', 'conversion', {
        send_to: 'AW-CONVERSION_ID/CONVERSION_LABEL', // Replace with actual values
        value: value || 0,
        currency: 'USD',
        transaction_id: `${conversionType}_${Date.now()}`,
        ...properties
      });
    }
    
    // Store conversion in analytics metrics
    await supabase.rpc('record_metric', {
      p_metric_type: 'conversion',
      p_metric_name: conversionType,
      p_metric_value: value || 1,
      p_dimension_name: 'user_id',
      p_dimension_value: userId
    });
    
    // Update visitor analytics if we have a visitor ID
    if (visitorId) {
      await supabase
        .from('visitor_analytics')
        .update({
          conversion_date: new Date().toISOString(),
          conversion_page: window.location.pathname
        })
        .eq('visitor_id', visitorId);
    }
  } catch (error) {
    console.error('Failed to track conversion:', error);
  }
};

// Track page view
export const trackPageView = async (
  pageTitle: string,
  pageUrl: string,
  properties?: Record<string, any>
): Promise<void> => {
  try {
    // Send to Google Analytics
    if (typeof window !== 'undefined' && 'gtag' in window) {
      // @ts-ignore
      window.gtag('event', 'page_view', {
        page_title: pageTitle,
        page_location: pageUrl,
        page_path: new URL(pageUrl).pathname,
        ...properties
      });
    }
    
    // Track in our analytics system
    await trackEvent({
      category: 'page_view',
      action: pageTitle,
      label: pageUrl,
      properties
    });
  } catch (error) {
    console.error('Failed to track page view:', error);
  }
};

// Initialize analytics
export const initAnalytics = (): void => {
  if (typeof window !== 'undefined') {
    // Track initial page view
    const pageUrl = window.location.href;
    const pageTitle = document.title;
    trackPageView(pageTitle, pageUrl);
    
    // Set up navigation tracking for single page apps
    if ('addEventListener' in window) {
      const originalPushState = history.pushState;
      history.pushState = function(...args) {
        originalPushState.apply(this, args);
        trackPageView(document.title, window.location.href);
      };
      
      window.addEventListener('popstate', () => {
        trackPageView(document.title, window.location.href);
      });
    }
  }
};
