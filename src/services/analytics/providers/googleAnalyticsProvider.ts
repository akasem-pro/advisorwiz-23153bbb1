
import { AnalyticsProvider, AnalyticsEvent } from '../core';

// Define Google Analytics specific event parameters
interface GA4EventParameters {
  [key: string]: any;
}

// Using interface merging instead of redeclaring Window to avoid conflicts
interface Window {
  gtag?: (...args: any[]) => void;
  dataLayer?: any[];
}

/**
 * Google Analytics 4 Provider
 */
export class GoogleAnalyticsProvider implements AnalyticsProvider {
  name = 'GoogleAnalytics';
  measurementId: string;
  debug: boolean;
  
  constructor(measurementId: string, debug: boolean = false) {
    this.measurementId = measurementId;
    this.debug = debug;
  }
  
  isEnabled(): boolean {
    // Check for cookie consent for analytics
    try {
      const settings = localStorage.getItem('cookie-settings');
      if (settings) {
        const parsedSettings = JSON.parse(settings);
        return parsedSettings.analytics === true;
      }
    } catch (error) {
      console.error('Error checking GA consent:', error);
    }
    return false;
  }
  
  async initialize(): Promise<boolean> {
    if (!this.isEnabled()) return false;
    
    try {
      // Skip if already initialized
      if (window.gtag) {
        return true;
      }
      
      // Create script elements
      const script1 = document.createElement('script');
      script1.async = true;
      script1.src = `https://www.googletagmanager.com/gtag/js?id=${this.measurementId}`;
      
      const script2 = document.createElement('script');
      script2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${this.measurementId}', {
          send_page_view: false,
          cookie_flags: 'samesite=none;secure',
          debug_mode: ${this.debug}
        });
      `;
      
      // Add to document
      document.head.appendChild(script1);
      document.head.appendChild(script2);
      
      return new Promise((resolve) => {
        script1.onload = () => resolve(true);
        script1.onerror = () => {
          console.error('Failed to load Google Analytics');
          resolve(false);
        };
      });
    } catch (error) {
      console.error('Error initializing Google Analytics:', error);
      return false;
    }
  }
  
  async trackEvent(event: AnalyticsEvent): Promise<boolean> {
    if (!this.isEnabled() || !window.gtag) {
      return false;
    }
    
    try {
      // Convert our generic event to GA4 format
      const gaEvent = this.convertToGA4Event(event);
      
      // Send to GA4
      window.gtag('event', gaEvent.name, gaEvent.params);
      
      return true;
    } catch (error) {
      console.error('Error tracking GA event:', error);
      return false;
    }
  }
  
  private convertToGA4Event(event: AnalyticsEvent): {
    name: string;
    params: GA4EventParameters;
  } {
    // Special handling for page_view events
    if (event.type === 'page_view') {
      return {
        name: 'page_view',
        params: {
          page_title: event.name,
          page_location: window.location.href,
          page_path: event.properties?.path || window.location.pathname,
          ...event.properties
        }
      };
    }
    
    // Convert standard event properties
    const params: GA4EventParameters = {
      event_category: event.type,
      event_label: event.name,
      value: event.value,
      ...event.properties
    };
    
    return {
      name: event.name,
      params
    };
  }
}

/**
 * Create a Google Analytics provider
 */
export const createGoogleAnalyticsProvider = (
  measurementId: string,
  debug: boolean = false
): AnalyticsProvider => {
  return new GoogleAnalyticsProvider(measurementId, debug);
};
