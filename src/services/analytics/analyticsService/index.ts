
// Export tracking functions
export { 
  trackEvent, 
  trackPageView 
} from './tracking';

// Export consent checking
export { isAnalyticsAllowed } from './consent';

// Export initialization
export { initializeAnalytics } from './initialize';

// Export types
import { UserBehaviorEvent } from '../../../utils/analytics/eventTracker';
export { UserBehaviorEvent };
