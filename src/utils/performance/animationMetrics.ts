
/**
 * Animation Performance Metrics
 * Track and analyze animation performance metrics
 */

import { trackPerformanceMetric } from '../../services/performance';
import { trackMetric, MetricCategory } from './integrated/performanceMonitor';
import { prefersReducedMotion } from '../animations/optimizedAnimations';

// Store metrics about active animations
const activeAnimations: Record<string, {
  id: string;
  start: number;
  frames: number;
  lastTimestamp: number;
  dropped: number;
}> = {};

// Counter for generating animation IDs
let animationCounter = 0;

/**
 * Track the start of an animation
 * @returns Animation ID for later reference
 */
export const trackAnimationStart = (animationName: string): string => {
  const id = `${animationName}-${++animationCounter}`;
  activeAnimations[id] = {
    id,
    start: performance.now(),
    frames: 0,
    lastTimestamp: performance.now(),
    dropped: 0
  };
  
  return id;
};

/**
 * Track a frame of an animation
 */
export const trackAnimationFrame = (id: string): void => {
  if (!activeAnimations[id]) return;
  
  const animation = activeAnimations[id];
  const now = performance.now();
  
  // Calculate time since last frame
  const timeSinceLastFrame = now - animation.lastTimestamp;
  
  // Ideal frame time (16.67ms for 60fps)
  const idealFrameTime = 1000 / 60;
  
  // Count dropped frames (anything taking more than 150% of ideal frame time)
  if (timeSinceLastFrame > idealFrameTime * 1.5) {
    // Calculate approximately how many frames were dropped
    const droppedFrames = Math.floor(timeSinceLastFrame / idealFrameTime) - 1;
    animation.dropped += droppedFrames;
  }
  
  animation.frames++;
  animation.lastTimestamp = now;
};

/**
 * Track the end of an animation and report metrics
 */
export const trackAnimationEnd = (id: string): void => {
  if (!activeAnimations[id]) return;
  
  const animation = activeAnimations[id];
  const duration = performance.now() - animation.start;
  
  // Calculate metrics
  const fps = (animation.frames / duration) * 1000;
  const percentDropped = animation.frames > 0 
    ? (animation.dropped / animation.frames) * 100 
    : 0;
  
  // Track metrics using both systems for backwards compatibility
  trackPerformanceMetric('animation_duration', duration, {
    tags: { animation_id: id }
  });
  
  // Use the new integrated monitoring system
  trackMetric(
    MetricCategory.ANIMATION,
    'duration',
    duration,
    { tags: { animation_id: id } }
  );
  
  trackMetric(
    MetricCategory.ANIMATION,
    'fps',
    Math.round(fps),
    { tags: { animation_id: id } }
  );
  
  trackMetric(
    MetricCategory.ANIMATION,
    'dropped_frames',
    animation.dropped,
    { tags: { animation_id: id } }
  );
  
  // Log for development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Animation Metrics] ${id}: ${duration.toFixed(1)}ms, ${fps.toFixed(1)} FPS, ${animation.dropped} dropped frames (${percentDropped.toFixed(1)}%)`);
  }
  
  // Clean up
  delete activeAnimations[id];
};

/**
 * Create an animation frame wrapper that tracks performance
 */
export const withAnimationTracking = (
  animationFn: (timestamp: number) => boolean | void,
  animationName: string
): (timestamp: number) => void => {
  // Don't track if user prefers reduced motion
  if (prefersReducedMotion()) {
    return animationFn as (timestamp: number) => void;
  }
  
  const animationId = trackAnimationStart(animationName);
  let lastFrameTime = 0;
  
  return (timestamp: number) => {
    // Track this frame
    trackAnimationFrame(animationId);
    
    // Calculate delta time
    const delta = lastFrameTime ? timestamp - lastFrameTime : 0;
    lastFrameTime = timestamp;
    
    // Call the original animation function
    const result = animationFn(timestamp);
    
    // If the animation returns false or is done, end tracking
    if (result === false) {
      trackAnimationEnd(animationId);
    } else {
      // Continue the animation
      requestAnimationFrame(withAnimationTracking(animationFn, animationName));
    }
  };
};

/**
 * Initialize animation performance monitoring
 */
export const initAnimationMetrics = (): void => {
  // Only initialize if we're not in reduced motion mode
  if (prefersReducedMotion()) {
    console.log('[Performance] Animation metrics tracking disabled due to reduced motion preference');
    return;
  }
  
  // Override requestAnimationFrame to track all animations
  const originalRAF = window.requestAnimationFrame;
  
  window.requestAnimationFrame = function(callback) {
    // Wrap the callback to track metrics
    const wrappedCallback = (timestamp: number) => {
      const start = performance.now();
      callback(timestamp);
      const duration = performance.now() - start;
      
      // Track long-running frame callbacks
      if (duration > 16) {
        trackMetric(
          MetricCategory.RENDERING,
          'long_frame_callback',
          duration
        );
      }
    };
    
    return originalRAF.call(window, wrappedCallback);
  };
  
  console.log('[Performance] Animation metrics tracking initialized');
};
