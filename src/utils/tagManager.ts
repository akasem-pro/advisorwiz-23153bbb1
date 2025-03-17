
/**
 * Tag Manager utility functions for tracking events and page views
 */

// Initialize data layer array if it doesn't exist
export const initializeTagManager = (): void => {
  window.dataLayer = window.dataLayer || [];
};

// Push event to data layer
export const pushEvent = (eventName: string, eventParams: Record<string, any> = {}): void => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...eventParams,
    });
  }
};

// Track page view
export const trackPageView = (pageTitle: string, pagePath: string = window.location.pathname): void => {
  pushEvent('page_view', {
    page_title: pageTitle,
    page_location: window.location.href,
    page_path: pagePath,
  });
};

// Track user interaction events
export const trackEvent = (
  category: string, 
  action: string, 
  label?: string, 
  value?: number,
  nonInteraction: boolean = false
): void => {
  pushEvent('custom_event', {
    event_category: category,
    event_action: action,
    event_label: label,
    event_value: value,
    non_interaction: nonInteraction,
  });
};

// Track lead events
export const trackLeadEvent = (
  action: 'generated' | 'status_change' | 'converted', 
  leadId: string,
  additionalData: Record<string, any> = {}
): void => {
  pushEvent('lead_event', {
    lead_action: action,
    lead_id: leadId,
    ...additionalData,
  });
};

// Track appointment events
export const trackAppointmentEvent = (
  action: 'scheduled' | 'confirmed' | 'cancelled' | 'completed', 
  appointmentId: string,
  additionalData: Record<string, any> = {}
): void => {
  pushEvent('appointment_event', {
    appointment_action: action,
    appointment_id: appointmentId,
    ...additionalData,
  });
};

// Add type definitions for the dataLayer
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}
