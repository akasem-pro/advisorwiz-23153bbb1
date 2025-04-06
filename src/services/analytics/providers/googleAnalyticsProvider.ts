
import { AnalyticsProvider, AnalyticsEvent } from '../core';

// Define Google Analytics specific event parameters
interface GA4EventParameters {
  [key: string]: any;
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
  
  async initialize(): Promise<void> {
    if (!this.isEnabled()) return;
    
    try {
      // Skip if already initialized
      if (window.gtag) {
        return;
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
      
      // Wait for script to load
      await new Promise<void>((resolve, reject) => {
        script1.onload = () => resolve();
        script1.onerror = () => {
          console.error('Failed to load Google Analytics');
          resolve(); // Resolve anyway to prevent breaking the chain
        };
      });
    } catch (error) {
      console.error('Error initializing Google Analytics:', error);
    }
  }
  
  async trackEvent(event: AnalyticsEvent): Promise<void> {
    if (!this.isEnabled() || !window.gtag) {
      return;
    }
    
    try {
      // Convert our generic event to GA4 format
      const gaEvent = this.convertToGA4Event(event);
      
      // Send to GA4
      window.gtag('event', gaEvent.name, gaEvent.params);
    } catch (error) {
      console.error('Error tracking GA event:', error);
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
