
/**
 * Animation optimization utilities
 * Enhances animation performance by optimizing rendering and reducing layout thrashing
 */

// Types for animation options
interface AnimationOptions {
  duration?: number;      // Duration in ms
  easing?: string;        // CSS easing function
  delay?: number;         // Delay in ms
  useHardwareAcceleration?: boolean; // Whether to use will-change
  onComplete?: () => void; // Callback when animation completes
}

/**
 * Apply optimized animation to an element
 * Uses requestAnimationFrame and transform/opacity for better performance
 */
export const animateElement = (
  element: HTMLElement, 
  properties: Record<string, any>,
  options: AnimationOptions = {}
): Promise<void> => {
  return new Promise((resolve) => {
    if (!element) {
      console.warn('Animation target element not found');
      resolve();
      return;
    }
    
    // Default options
    const {
      duration = 300,
      easing = 'ease-out',
      delay = 0,
      useHardwareAcceleration = true,
      onComplete
    } = options;
    
    // Apply hardware acceleration if requested
    if (useHardwareAcceleration) {
      const acceleratedProps = [];
      
      if ('transform' in properties) acceleratedProps.push('transform');
      if ('opacity' in properties) acceleratedProps.push('opacity');
      
      // Only add will-change if we're animating properties that benefit from it
      if (acceleratedProps.length > 0) {
        element.style.willChange = acceleratedProps.join(', ');
      }
    }
    
    // Use setTimeout for delay if needed
    const startAnimation = () => {
      // Save start timestamp for animation
      let startTime: number | null = null;
      
      // Store initial values
      const initialValues: Record<string, any> = {};
      
      // Get computed style for initial values
      const computedStyle = window.getComputedStyle(element);
      
      // Extract initial values for all properties we're animating
      Object.keys(properties).forEach(prop => {
        initialValues[prop] = computedStyle.getPropertyValue(prop) || getDefaultValue(prop);
      });
      
      // Animation frame function
      const animate = (timestamp: number) => {
        // Initialize start time
        if (!startTime) startTime = timestamp;
        
        // Calculate progress (0 to 1)
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Apply easing function
        const easedProgress = applyEasing(progress, easing);
        
        // Update each property based on progress
        Object.keys(properties).forEach(prop => {
          const start = parseValue(initialValues[prop]);
          const end = parseValue(properties[prop]);
          
          if (start.unit !== end.unit) {
            console.warn(`Unit mismatch for ${prop}: ${start.unit} vs ${end.unit}`);
            return;
          }
          
          // Interpolate value and apply
          const currentValue = start.value + (end.value - start.value) * easedProgress;
          element.style[prop as any] = `${currentValue}${start.unit}`;
        });
        
        // Continue animation if not complete
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          // Cleanup will-change to free resources
          if (useHardwareAcceleration) {
            // Use setTimeout to avoid immediate removal, which can cause visual artifacts
            setTimeout(() => {
              element.style.willChange = '';
            }, 100);
          }
          
          // Call onComplete callback
          if (onComplete) onComplete();
          
          // Resolve promise
          resolve();
        }
      };
      
      // Start animation loop
      requestAnimationFrame(animate);
    };
    
    // Handle delay
    if (delay > 0) {
      setTimeout(startAnimation, delay);
    } else {
      startAnimation();
    }
  });
};

/**
 * Apply CSS easing function to progress value
 */
const applyEasing = (progress: number, easing: string): number => {
  switch (easing) {
    case 'linear':
      return progress;
    case 'ease-in':
      return progress * progress;
    case 'ease-out':
      return 1 - (1 - progress) * (1 - progress);
    case 'ease-in-out':
      return progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;
    default:
      return progress; // Default to linear
  }
};

/**
 * Parse CSS value into number and unit
 */
const parseValue = (value: string): { value: number; unit: string } => {
  // Default result
  const result = { value: 0, unit: 'px' };
  
  if (!value) return result;
  
  // Match number and unit
  const match = value.match(/^([-\d.]+)([a-z%]*)$/i);
  
  if (match) {
    result.value = parseFloat(match[1]);
    result.unit = match[2] || 'px';
  }
  
  return result;
};

/**
 * Get default value and unit for common CSS properties
 */
const getDefaultValue = (property: string): string => {
  switch (property) {
    case 'opacity':
      return '1';
    case 'transform':
      return 'none';
    default:
      return '0px';
  }
};

/**
 * Batch multiple animations to run in sequence or parallel
 */
export const batchAnimations = (
  animations: Array<() => Promise<void>>,
  parallel = false
): Promise<void> => {
  if (parallel) {
    // Run all animations in parallel
    return Promise.all(animations.map(anim => anim())).then(() => {});
  } else {
    // Run animations in sequence
    return animations.reduce(
      (chain, animation) => chain.then(animation),
      Promise.resolve()
    );
  }
};

/**
 * Create a staggered animation effect for a list of elements
 */
export const staggerAnimation = (
  elements: HTMLElement[],
  properties: Record<string, any>,
  options: AnimationOptions & { staggerDelay?: number } = {}
): Promise<void> => {
  const { staggerDelay = 50, ...animOptions } = options;
  
  // Create individual animations with increasing delays
  const animations = elements.map((el, index) => {
    return () => animateElement(el, properties, {
      ...animOptions,
      delay: (options.delay || 0) + (index * staggerDelay)
    });
  });
  
  // Run animations in parallel (they're already staggered by delay)
  return batchAnimations(animations, true);
};

/**
 * Apply animation classes with proper cleanup and performance optimization
 */
export const animateWithClasses = (
  element: HTMLElement,
  className: string,
  options: { 
    duration?: number;
    cleanup?: boolean; 
    onComplete?: () => void;
  } = {}
): void => {
  if (!element) return;
  
  const { 
    duration = getAnimationDuration(element),
    cleanup = true,
    onComplete 
  } = options;
  
  // Add will-change before adding animation class
  element.style.willChange = 'transform, opacity';
  
  // Add animation class after a small delay to ensure will-change is applied
  requestAnimationFrame(() => {
    element.classList.add(className);
    
    // Set timeout for animation completion
    setTimeout(() => {
      // Clean up
      if (cleanup) {
        element.classList.remove(className);
      }
      
      // Clean up will-change
      element.style.willChange = '';
      
      // Call onComplete callback
      if (onComplete) onComplete();
    }, duration);
  });
};

/**
 * Helper to get animation duration from computed style
 * Falls back to default duration if not specified
 */
const getAnimationDuration = (element: HTMLElement, defaultDuration = 300): number => {
  const computedStyle = window.getComputedStyle(element);
  const durationStr = computedStyle.getPropertyValue('animation-duration') || 
                     computedStyle.getPropertyValue('transition-duration');
  
  if (durationStr) {
    // Convert from '0.3s' to 300
    const seconds = parseFloat(durationStr);
    if (!isNaN(seconds)) {
      return seconds * 1000;
    }
  }
  
  return defaultDuration;
};

/**
 * Initialize animation optimization settings
 */
export const initAnimationOptimizations = (): void => {
  // Check if the browser supports these optimizations
  if (typeof document === 'undefined') return;
  
  // Listen for animations starting
  document.addEventListener('animationstart', (event) => {
    // Add will-change to elements starting animations
    if (event.target && event.target instanceof HTMLElement) {
      const target = event.target;
      // Only for large animations that might benefit
      const rect = target.getBoundingClientRect();
      if (rect.width > 100 || rect.height > 100) {
        target.style.willChange = 'transform, opacity';
      }
    }
  }, { passive: true });
  
  // Listen for animations ending
  document.addEventListener('animationend', (event) => {
    // Clean up will-change after animation completes
    if (event.target && event.target instanceof HTMLElement) {
      const target = event.target;
      // Use setTimeout to avoid layout thrashing
      setTimeout(() => {
        target.style.willChange = '';
      }, 100);
    }
  }, { passive: true });
  
  console.log('[Animation] Animation optimizations initialized');
};

/**
 * Detect if reduced motion is preferred
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

