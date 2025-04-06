
/**
 * Analytics Core Types
 * Common type definitions for the analytics system
 */

// Define standard event types
export enum AnalyticsEventType {
  PAGE_VIEW = 'page_view',
  USER_INTERACTION = 'user_interaction',
  FEATURE_USAGE = 'feature_usage',
  CONVERSION = 'conversion',
  ERROR = 'error',
  PERFORMANCE = 'performance',
  CONSENT = 'consent'
}

// Interfaces for analytics data
export interface AnalyticsEvent {
  type: string;
  name: string;
  value?: number;
  timestamp: number;
  properties?: Record<string, any>;
}

export interface AnalyticsProvider {
  name: string;
  isEnabled: () => boolean;
  initialize: () => Promise<boolean>;
  trackEvent: (event: AnalyticsEvent) => Promise<boolean>;
}

// Configuration for tracking behavior
export interface AnalyticsConfig {
  batchSize: number;
  batchIntervalMs: number;
  samplingRate: number; // 0-1, 1 = track everything
  errorSamplingRate: number; // 0-1, higher rate for errors
  debug: boolean;
}
