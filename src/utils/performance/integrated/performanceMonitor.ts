/**
 * Integrated Performance Monitor
 * 
 * Combines animation metrics, matching algorithm performance,
 * and general app performance into a unified monitoring system.
 */

import { trackPerformanceMetric } from '../../../services/performance';
import { getCompatibilityCacheStats } from '../../../services/matching';
import { trackAnimationStart, trackAnimationEnd } from '../../performance/animationMetrics';

// Define metric categories for better organization
export enum MetricCategory {
  ANIMATION = 'animation',
  MATCHING = 'matching',
  RENDERING = 'rendering',
  NETWORK = 'network',
  USER_INTERACTION = 'interaction'
}

// Store for performance metrics sampled at intervals
let performanceSamples: Array<{
  timestamp: number;
  metrics: Record<string, number>;
}> = [];

// Maximum number of samples to keep
const MAX_SAMPLES = 100;

/**
 * Track a performance metric with category classification
 */
export const trackMetric = (
  category: MetricCategory,
  name: string,
  value: number,
  options?: {
    tags?: Record<string, string>;
    persist?: boolean;
  }
): void => {
  // Track in main performance system
  trackPerformanceMetric(`${category}_${name}`, value, options);
  
  // Store in local samples for trend analysis
  addPerformanceSample(name, value);
};

/**
 * Add a performance sample to the local store
 */
const addPerformanceSample = (metricName: string, value: number): void => {
  const now = Date.now();
  
  // Add to samples
  performanceSamples.push({
    timestamp: now,
    metrics: { [metricName]: value }
  });
  
  // Limit samples array size
  if (performanceSamples.length > MAX_SAMPLES) {
    performanceSamples.shift();
  }
};

/**
 * Get performance samples for analysis
 */
export const getPerformanceSamples = (): typeof performanceSamples => {
  return [...performanceSamples];
};

/**
 * Clear performance samples
 */
export const clearPerformanceSamples = (): void => {
  performanceSamples = [];
};

/**
 * Track animation with integrated monitoring
 */
export const trackAnimation = (
  animationName: string,
  durationMs: number,
  frameCount: number,
  droppedFrames: number
): void => {
  // Track overall animation duration
  trackMetric(
    MetricCategory.ANIMATION,
    `duration_${animationName}`,
    durationMs,
    { tags: { animation_name: animationName } }
  );
  
  // Track frame metrics
  const fps = (frameCount / durationMs) * 1000;
  trackMetric(
    MetricCategory.ANIMATION,
    `fps_${animationName}`,
    fps,
    { tags: { animation_name: animationName } }
  );
  
  // Track dropped frames ratio
  const droppedFrameRatio = droppedFrames / frameCount;
  trackMetric(
    MetricCategory.ANIMATION,
    `dropped_frames_ratio_${animationName}`,
    droppedFrameRatio,
    { tags: { animation_name: animationName } }
  );
};

/**
 * Monitor long tasks for potential UI blocking
 */
export const initLongTaskMonitoring = (): void => {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
    return;
  }
  
  try {
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        // Track long task duration
        trackMetric(
          MetricCategory.RENDERING,
          'long_task_duration',
          entry.duration
        );
      });
    });
    
    observer.observe({ type: 'longtask', buffered: true });
  } catch (e) {
    console.warn('PerformanceObserver for longtask not supported');
  }
};

/**
 * Get a performance report with metrics from different systems
 */
export const getPerformanceReport = () => {
  // Get cache metrics from the matching system
  const cacheStats = getCompatibilityCacheStats();
  
  // Calculate animation metrics
  const animationMetrics = calculateAggregatedAnimationMetrics();
  
  return {
    timestamp: new Date(),
    cachePerformance: {
      size: cacheStats.totalEntries,
      activeEntries: cacheStats.activeEntries,
      hitRate: cacheStats.hitRate.toFixed(2) + '%'
    },
    animationPerformance: animationMetrics,
    performanceSamples: getPerformanceSamples().slice(-20) // Last 20 samples
  };
};

/**
 * Calculate aggregated animation metrics from samples
 */
const calculateAggregatedAnimationMetrics = () => {
  const animationSamples = performanceSamples.filter(
    sample => Object.keys(sample.metrics).some(key => key.startsWith('fps_'))
  );
  
  if (animationSamples.length === 0) {
    return {
      averageFps: 0,
      averageDroppedFrameRatio: 0,
      smoothAnimationRatio: 0
    };
  }
  
  // Calculate average FPS
  let fpsSum = 0;
  let fpsCount = 0;
  
  // Calculate average dropped frame ratio
  let droppedFrameSum = 0;
  let droppedFrameCount = 0;
  
  // Count smooth animations (fps > 55)
  let smoothAnimations = 0;
  let totalAnimations = 0;
  
  animationSamples.forEach(sample => {
    Object.entries(sample.metrics).forEach(([key, value]) => {
      if (key.startsWith('fps_')) {
        fpsSum += value;
        fpsCount++;
        
        if (value > 55) {
          smoothAnimations++;
        }
        totalAnimations++;
      } else if (key.startsWith('dropped_frames_ratio_')) {
        droppedFrameSum += value;
        droppedFrameCount++;
      }
    });
  });
  
  return {
    averageFps: fpsCount > 0 ? fpsSum / fpsCount : 0,
    averageDroppedFrameRatio: droppedFrameCount > 0 ? droppedFrameSum / droppedFrameCount : 0,
    smoothAnimationRatio: totalAnimations > 0 ? smoothAnimations / totalAnimations : 0
  };
};

/**
 * Initialize the integrated performance monitor
 */
export const initIntegratedPerformanceMonitor = (): void => {
  // Initialize long task monitoring
  initLongTaskMonitoring();
  
  // Log initialization
  console.log('[Performance] Integrated performance monitor initialized');
};
