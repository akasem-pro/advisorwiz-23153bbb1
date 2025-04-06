
/**
 * Analytics Core Types
 * Defines type definitions for the analytics system
 */

// Analytics event types
export enum AnalyticsEventType {
  PAGE_VIEW = 'page_view',
  USER_INTERACTION = 'user_interaction',
  FEATURE_USAGE = 'feature_usage',
  PERFORMANCE = 'performance',
  ERROR = 'error',
  CONVERSION = 'conversion',
  CONSENT = 'consent'
}

// Analytics event structure
export interface AnalyticsEvent {
  type: string;
  name: string;
  value?: number;
  timestamp: number;
  properties?: Record<string, any>;
}

// Analytics provider interface
export interface AnalyticsProvider {
  name: string;
  initialize: () => Promise<void>;
  trackEvent: (event: AnalyticsEvent) => Promise<void>;
  isEnabled: () => boolean;
}

// Analytics configuration 
export interface AnalyticsConfig {
  debug: boolean;
  samplingRate: number;
  errorSamplingRate: number;
  batchSize: number;
  batchIntervalMs: number;
  providersEnabled: string[];
}
