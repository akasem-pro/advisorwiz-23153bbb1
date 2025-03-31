/**
 * Google Analytics 4 (GA4) Integration
 * Provides utilities for tracking events in GA4 format
 */

// Define the gtag function as it's provided by the GA4 script
// Note: We are removing the Window interface declaration here
// since it's already declared in trackers/index.ts

/**
 * Initialize Google Analytics 4
 * @param measurementId GA4 measurement ID (G-XXXXXXXX)
 */
export const initGA4 = (measurementId: string): void => {
  if (typeof window !== 'undefined') {
    // Create script element for GA4
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    
    // Add the script to the document
    document.head.appendChild(script);
    
    // Initialize the dataLayer and gtag function
    window.dataLayer = window.dataLayer || [];
    
    // Define the gtag function
    function gtag(...args: any[]) {
      window.dataLayer!.push(arguments);
    }
    
    // Initialize gtag with the measurement ID
    window.gtag = gtag;
    window.gtag('js', new Date());
    window.gtag('config', measurementId, {
      send_page_view: false, // We'll handle page views separately
      anonymize_ip: true,
      cookie_flags: 'SameSite=None;Secure'
    });
    
    console.log('GA4 initialized with measurement ID:', measurementId);
  }
};

/**
 * Send event to Google Analytics 4
 * @param eventName Name of the event
 * @param eventParams Event parameters
 */
export const sendGA4Event = (
  eventName: string,
  eventParams?: Record<string, any>
): void => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams);
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`GA4 event sent: ${eventName}`, eventParams);
    }
  }
};

/**
 * Track page view in GA4
 * @param pageTitle Page title
 * @param pagePath Page path
 * @param additionalParams Additional parameters
 */
export const trackGA4PageView = (
  pageTitle: string,
  pagePath: string,
  additionalParams?: Record<string, any>
): void => {
  sendGA4Event('page_view', {
    page_title: pageTitle,
    page_location: typeof window !== 'undefined' ? window.location.href : '',
    page_path: pagePath,
    ...additionalParams
  });
};

/**
 * Set user properties in GA4
 * @param userProperties User properties
 */
export const setGA4UserProperties = (
  userProperties: Record<string, any>
): void => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('set', 'user_properties', userProperties);
  }
};

/**
 * Track user interaction in GA4
 * @param category Category of the interaction
 * @param action Action taken
 * @param label Label for the action
 * @param value Numeric value (optional)
 * @param additionalParams Additional parameters
 */
export const trackGA4UserInteraction = (
  category: string,
  action: string,
  label?: string,
  value?: number,
  additionalParams?: Record<string, any>
): void => {
  sendGA4Event(action, {
    event_category: category,
    event_label: label,
    value: value,
    ...additionalParams
  });
};

/**
 * Track ecommerce events in GA4
 * @param actionType Type of ecommerce action
 * @param items Items involved in the action
 * @param additionalParams Additional parameters
 */
export const trackGA4EcommerceEvent = (
  actionType: 'view_item' | 'add_to_cart' | 'purchase' | 'begin_checkout' | 'view_item_list',
  items: any[],
  additionalParams?: Record<string, any>
): void => {
  sendGA4Event(actionType, {
    items,
    ...additionalParams
  });
};

/**
 * Track conversion events in GA4
 * @param conversionId Conversion ID
 * @param label Conversion label
 * @param value Conversion value
 * @param transactionId Transaction ID
 * @param additionalParams Additional parameters
 */
export const trackGA4Conversion = (
  conversionId: string,
  label: string,
  value?: number,
  transactionId?: string,
  additionalParams?: Record<string, any>
): void => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: `AW-${conversionId}/${label}`,
      value,
      transaction_id: transactionId,
      ...additionalParams
    });
  }
};
