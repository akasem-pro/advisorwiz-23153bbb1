
// Type definition for window with dataLayer
interface WindowWithDataLayer extends Window {
  dataLayer: any[];
  gtag?: (...args: any[]) => void;
}

// Access window with dataLayer type
declare const window: WindowWithDataLayer;

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
 * @param eventName The name of the event to track
 * @param eventParams Additional parameters for the event
 */
export const trackEvent = (eventName: string, eventParams?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...(eventParams || {})
    });
    
    // Also track with gtag if available (for GA4 compatibility)
    if (window.gtag) {
      window.gtag('event', eventName, eventParams || {});
    }
    
    console.log(`[GTM] Tracked event: ${eventName}`, eventParams);
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
 * Track appointment-related events
 * @param action Action related to appointment (e.g., 'scheduled', 'cancelled')
 * @param appointmentId Unique identifier of the appointment
 * @param additionalParams Additional parameters to track
 */
export const trackAppointmentEvent = (
  action: 'scheduled' | 'confirmed' | 'cancelled' | 'completed' | 'rescheduled' | 'reminder_sent',
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
  action: 'created' | 'updated' | 'converted' | 'lost' | 'contacted',
  leadId: string,
  additionalParams?: Record<string, any>
) => {
  trackEvent('lead_event', {
    lead_action: action,
    lead_id: leadId,
    ...additionalParams
  });
};
