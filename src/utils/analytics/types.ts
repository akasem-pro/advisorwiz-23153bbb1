
// Define common user behavior events for consistent tracking
export enum UserBehaviorEvent {
  PAGE_VIEW = 'page_view',
  SIGN_UP = 'sign_up',
  LOGIN = 'login',
  PROFILE_VIEW = 'profile_view',
  PROFILE_EDIT = 'profile_edit',
  MATCH_VIEW = 'match_view',
  MATCH_CLICK = 'match_click',
  ADVISOR_CONTACT = 'advisor_contact',
  APPOINTMENT_SCHEDULED = 'appointment_scheduled',
  APPOINTMENT_COMPLETED = 'appointment_completed',
  APPOINTMENT_CANCELED = 'appointment_canceled',
  FEEDBACK_SUBMITTED = 'feedback_submitted',
  FEATURE_USED = 'feature_used',
  SEARCH_PERFORMED = 'search_performed',
  FILTER_APPLIED = 'filter_applied',
  SORT_APPLIED = 'sort_applied',
  PREFERENCE_UPDATED = 'preference_updated',
  MATCH_FEEDBACK = 'match_feedback'
}

export type MatchAction = 'view' | 'click' | 'contact' | 'schedule' | 'feedback';
