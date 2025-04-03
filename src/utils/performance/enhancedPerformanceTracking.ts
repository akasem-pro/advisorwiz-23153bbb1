
/**
 * This file is maintained for backward compatibility
 * New code should import from the enhanced/ directory
 */

import { 
  trackEnhancedPerformance,
  flushMetricsBuffer,
  initEnhancedPerformanceTracking
} from './enhanced';

// Re-export for backward compatibility
export {
  trackEnhancedPerformance,
  flushMetricsBuffer,
  initEnhancedPerformanceTracking
};
