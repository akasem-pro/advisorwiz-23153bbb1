
/**
 * Types for the Analytics Service
 */

// We're currently importing this from an external module, but for more control
// we could define it here if needed
export { UserBehaviorEvent } from '../../../utils/analytics/eventTracker';

// Analytics tracking options
export interface TrackingOptions {
  sendImmediately?: boolean;
  trackingType?: 'analytics' | 'marketing' | 'personalization';
}

// Analytics configuration options
export interface AnalyticsConfig {
  batchSize?: number;
  batchIntervalMs?: number;
  samplingRate?: number;
}

// Event structure
export interface AnalyticsEvent {
  name: string;
  properties?: Record<string, any>;
  timestamp: number;
}
