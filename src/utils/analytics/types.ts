
// Define common user behavior events for consistent tracking
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
  PREFERENCE_UPDATED = 'preference_updated'
}

// Match action types
export type MatchAction = 
  | 'view' 
  | 'click' 
  | 'contact' 
  | 'schedule' 
  | 'feedback' 
  | 'view_explanation';

// Analytics dimensions
export interface AnalyticsDimension {
  name: string;
  value: string;
}

// Performance metric types
export interface PerformanceMetric {
  name: string;
  value: number;
  dimensions?: AnalyticsDimension[];
}

// User engagement metric types
export interface EngagementMetric {
  eventType: string;
  duration?: number;
  pageDepth?: number;
  interactions?: number;
}

// A/B testing metric types
export interface ABTestMetric {
  testId: string;
  variantId: string;
  metricName: string;
  metricValue: number;
}
