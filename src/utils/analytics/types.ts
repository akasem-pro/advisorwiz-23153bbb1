
/**
 * Enum of standard user behavior events tracked in the application
 * These align with GA4 standard and recommended events
 */
export enum UserBehaviorEvent {
  // Page interaction events
  PAGE_VIEW = 'page_view',
  
  // Authentication events
  SIGN_UP = 'sign_up',
  LOGIN = 'login',
  
  // Profile events
  PROFILE_VIEW = 'profile_view',
  PROFILE_EDIT = 'profile_edit',
  
  // Matching events
  MATCH_VIEW = 'match_view',
  MATCH_CLICK = 'match_click',
  MATCH_FEEDBACK = 'match_feedback',
  
  // Advisor interaction events
  ADVISOR_CONTACT = 'advisor_contact',
  
  // Appointment events
  APPOINTMENT_SCHEDULED = 'appointment_scheduled',
  APPOINTMENT_COMPLETED = 'appointment_completed',
  APPOINTMENT_CANCELED = 'appointment_canceled',
  
  // Feedback events
  FEEDBACK_SUBMITTED = 'feedback_submitted',
  
  // Feature usage events
  FEATURE_USED = 'feature_used',
  
  // Search events
  SEARCH_PERFORMED = 'search_performed',
  FILTER_APPLIED = 'filter_applied',
  SORT_APPLIED = 'sort_applied',
  
  // Preference events
  PREFERENCE_UPDATED = 'preference_updated',
  
  // Ecommerce events (GA4 standard)
  ADD_TO_CART = 'add_to_cart',
  PURCHASE = 'purchase',
  BEGIN_CHECKOUT = 'begin_checkout',
  VIEW_ITEM = 'view_item',
  VIEW_ITEM_LIST = 'view_item_list',
  
  // Engagement events (GA4 standard)
  SHARE = 'share',
  EARN_VIRTUAL_CURRENCY = 'earn_virtual_currency',
  SPEND_VIRTUAL_CURRENCY = 'spend_virtual_currency',
  
  // Content engagement (GA4 recommended)
  SELECT_CONTENT = 'select_content',
  VIEW_PROMOTION = 'view_promotion',
  SELECT_PROMOTION = 'select_promotion'
}

/**
 * Interface for GA4 Event parameters
 */
export interface GA4EventParams {
  [key: string]: string | number | boolean | null | undefined;
}

/**
 * Interface for GA4 Enhanced Ecommerce item
 */
export interface GA4EcommerceItem {
  item_id: string;
  item_name: string;
  price?: number;
  quantity?: number;
  item_category?: string;
  item_variant?: string;
  item_brand?: string;
  [key: string]: any;
}
