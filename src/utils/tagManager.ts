
// Type definition for window with dataLayer
interface WindowWithDataLayer extends Window {
  dataLayer: any[];
  gtag?: (...args: any[]) => void;
}

// Access window with dataLayer type
declare const window: WindowWithDataLayer;

// Define the event parameter structure
export interface TrackEventParams {
  category: string;
  action: string;
  label?: string;
  value?: number;
  properties?: Record<string, any>;
}

/**
 * Initialize Google Tag Manager
 */
export const initializeTagManager = () => {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
  }
};

/**
 * Track a custom event in Google Tag Manager
 * @param eventNameOrParams The name of the event to track or an object containing event parameters
 * @param eventParams Additional parameters for the event (when eventName is a string)
 */
export const trackEvent = (
  eventNameOrParams: string | TrackEventParams,
  eventParams?: Record<string, any>
): void => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    // Handle both string and object parameters
    if (typeof eventNameOrParams === 'string') {
      // Original signature: trackEvent(eventName: string, eventParams?: Record<string, any>)
      window.dataLayer.push({
        event: eventNameOrParams,
        ...(eventParams || {})
      });
      
      // Also track with gtag if available (for GA4 compatibility)
      if (window.gtag) {
        window.gtag('event', eventNameOrParams, eventParams || {});
      }
      
      console.log(`[GTM] Tracked event: ${eventNameOrParams}`, eventParams);
    } else {
      // New signature: trackEvent(params: TrackEventParams)
      const { category, action, label, value, properties } = eventNameOrParams;
      const eventName = `${category}_${action}`;
      
      window.dataLayer.push({
        event: eventName,
        event_category: category,
        event_action: action,
        event_label: label,
        event_value: value,
        ...(properties || {})
      });
      
      // Also track with gtag if available (for GA4 compatibility)
      if (window.gtag) {
        window.gtag('event', eventName, {
          event_category: category,
          event_action: action,
          event_label: label,
          value: value,
          ...(properties || {})
        });
      }
      
      console.log(`[GTM] Tracked event: ${eventName}`, { category, action, label, value, properties });
    }
  }
};

/**
 * Track page view in Google Tag Manager
 * @param pageTitle Page title
 * @param pagePath Page path (defaults to current path)
 */
export const trackPageView = (pageTitle: string, pagePath?: string) => {
  const path = pagePath || (typeof window !== 'undefined' ? window.location.pathname : '');
  
  trackEvent('page_view', {
    page_title: pageTitle,
    page_location: typeof window !== 'undefined' ? window.location.href : '',
    page_path: path
  });
};

/**
 * Track user interaction events
 * @param action Action performed (e.g., 'click', 'submit')
 * @param category Category of the action (e.g., 'button', 'form')
 * @param label Label for the action (e.g., 'submit_form', 'contact_button')
 * @param additionalParams Additional parameters to track
 */
export const trackUserInteraction = (
  action: string,
  category: string,
  label: string,
  additionalParams?: Record<string, any>
) => {
  trackEvent('user_interaction', {
    action,
    category,
    label,
    ...additionalParams
  });
};

/**
 * Track authentication events with more detailed information
 * @param action Authentication action (e.g., 'attempt', 'success', 'failure')
 * @param method Authentication method (e.g., 'email', 'google', 'facebook')
 * @param additionalInfo Additional details like error messages
 */
export const trackAuthEvent = (
  action: 'attempt' | 'success' | 'failure' | 'signup_attempt' | 'signup_success' | 'signup_failure' | 'logout',
  method: 'email' | 'google' | 'facebook' | 'apple' | 'twitter' | 'other',
  additionalInfo?: Record<string, any>
) => {
  trackEvent('auth_event', {
    auth_action: action,
    auth_method: method,
    timestamp: new Date().toISOString(),
    ...additionalInfo
  });
};

/**
 * Track appointment-related events
 * @param action Action related to appointment (e.g., 'scheduled', 'cancelled')
 * @param appointmentId Unique identifier of the appointment
 * @param additionalParams Additional parameters to track
 */
export const trackAppointmentEvent = (
  action: 'scheduled' | 'confirmed' | 'canceled' | 'completed' | 'rescheduled' | 'reminder_sent',
  appointmentId: string,
  additionalParams?: Record<string, any>
) => {
  trackEvent('appointment_event', {
    appointment_action: action,
    appointment_id: appointmentId,
    ...additionalParams
  });
};

/**
 * Track lead-related events
 * @param action Action related to lead (e.g., 'created', 'converted')
 * @param leadId Unique identifier of the lead
 * @param additionalParams Additional parameters to track
 */
export const trackLeadEvent = (
  action: 'created' | 'updated' | 'converted' | 'lost' | 'contacted' | 'generated' | 'status_change',
  leadId: string,
  additionalParams?: Record<string, any>
) => {
  trackEvent('lead_event', {
    lead_action: action,
    lead_id: leadId,
    ...additionalParams
  });
};

/**
 * Track API or network connection issues
 * @param endpoint The API endpoint or service name
 * @param status Success or failure
 * @param errorInfo Additional error information
 */
export const trackConnectionEvent = (
  endpoint: string, 
  status: 'success' | 'failure',
  errorInfo?: Record<string, any>
) => {
  trackEvent('connection_event', {
    endpoint,
    status,
    timestamp: new Date().toISOString(),
    ...errorInfo
  });
};
