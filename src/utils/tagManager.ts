
/**
 * Tag Manager Utilities
 * 
 * This file contains utilities for initializing and interacting with 
 * Google Tag Manager and other analytics platforms.
 */

// Initialize the data layer if it doesn't exist
declare global {
  interface Window {
    dataLayer: any[];
  }
}

/**
 * Initialize Google Tag Manager
 */
export const initializeTagManager = (): void => {
  window.dataLayer = window.dataLayer || [];
  
  // Log for debugging
  console.info('[GTM] Tag Manager initialized');
};

/**
 * Track page view in GTM
 * @param pageTitle Title of the page
 * @param pagePath Optional path override
 */
export const trackPageView = (pageTitle: string, pagePath?: string): void => {
  if (!window.dataLayer) {
    initializeTagManager();
  }
  
  const pageViewData = {
    event: 'page_view',
    page_title: pageTitle,
    page_location: window.location.href,
    page_path: pagePath || window.location.pathname
  };
  
  window.dataLayer.push(pageViewData);
  
  // Log for debugging
  console.info('[GTM] Tracked event: page_view', pageViewData);
};

/**
 * Track custom event in GTM
 * @param eventName Name of the event
 * @param eventParams Additional parameters for the event
 */
export const trackEvent = (eventName: string, eventParams: Record<string, any> = {}): void => {
  if (!window.dataLayer) {
    initializeTagManager();
  }
  
  const eventData = {
    event: eventName,
    ...eventParams
  };
  
  window.dataLayer.push(eventData);
  
  // Log for debugging
  console.info(`[GTM] Tracked event: ${eventName}`, eventParams);
};

/**
 * Track appointment-related events in GTM
 * @param eventAction Action type for the appointment
 * @param appointmentId Appointment identifier
 * @param eventParams Additional parameters for the event
 */
export const trackAppointmentEvent = (
  eventAction: 'scheduled' | 'confirmed' | 'cancelled' | 'completed',
  appointmentId: string,
  eventParams: Record<string, any> = {}
): void => {
  trackEvent(`appointment_${eventAction}`, {
    appointment_id: appointmentId,
    ...eventParams
  });
};

/**
 * Track lead-related events in GTM
 * @param eventAction Action type for the lead 
 * @param leadId Lead identifier
 * @param eventParams Additional parameters for the event
 */
export const trackLeadEvent = (
  eventAction: 'created' | 'updated' | 'converted' | 'lost',
  leadId: string,
  eventParams: Record<string, any> = {}
): void => {
  trackEvent(`lead_${eventAction}`, {
    lead_id: leadId,
    ...eventParams
  });
};

/**
 * Set user properties in GTM
 * @param userId User identifier
 * @param userProperties Additional properties for the user
 */
export const setUserProperties = (userId: string, userProperties: Record<string, any> = {}): void => {
  if (!window.dataLayer) {
    initializeTagManager();
  }
  
  const userData = {
    user_id: userId,
    user_properties: userProperties
  };
  
  window.dataLayer.push(userData);
  
  // Log for debugging
  console.info('[GTM] Set user properties', userData);
};
