
// Re-export all the functionality from the smaller files
// This maintains backwards compatibility so existing imports continue to work

export { UserBehaviorEvent } from './types';
export { trackUserBehavior } from './eventTracker';
export { trackPreferenceUpdate } from './preferenceTracker';
export { trackMatchingInteraction } from './matchTracker';
export { trackPageView } from './pageTracker';
