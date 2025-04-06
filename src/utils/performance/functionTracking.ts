
import { trackEnhancedPerformance } from './enhanced';

/**
 * Wraps a function with performance tracking
 * 
 * @param fn The function to wrap
 * @param name The name of the function for tracking
 * @returns A wrapped function that tracks performance
 */
export function trackFunctionPerformance<T extends (...args: any[]) => any>(
  fn: T,
  name: string
): T {
  return ((...args: Parameters<T>): ReturnType<T> => {
    const startTime = performance.now();
    try {
      const result = fn(...args);
      
      // For promises, track when they resolve
      if (result instanceof Promise) {
        return result.finally(() => {
          const endTime = performance.now();
          const duration = endTime - startTime;
          
          trackEnhancedPerformance(`function_${name}`, duration, {
            tags: { 
              async: 'true',
              succeeded: 'true'
            }
          });
        }) as ReturnType<T>;
      } else {
        // For synchronous functions, track immediately
        const endTime = performance.now();
        const duration = endTime - startTime;
        
        trackEnhancedPerformance(`function_${name}`, duration, {
          tags: { 
            async: 'false',
            succeeded: 'true'
          }
        });
        
        return result;
      }
    } catch (error) {
      // Track errors
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      trackEnhancedPerformance(`function_${name}`, duration, {
        tags: { 
          async: 'false',
          succeeded: 'false',
          error: error instanceof Error ? error.name : 'unknown'
        }
      });
      
      throw error;
    }
  }) as T;
}

/**
 * HOC that wraps a React component with performance tracking
 */
export function withPerformanceTracking<P extends object>(
  Component: React.ComponentType<P>,
  componentName: string
): React.FC<P> {
  const WrappedComponent: React.FC<P> = (props) => {
    const startTime = performance.now();
    
    // Use useEffect to measure when component completes initial render
    React.useEffect(() => {
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      trackEnhancedPerformance(`component_render_${componentName}`, duration, {
        tags: { initial: 'true' }
      });
      
      // Also measure subsequent renders
      const originalRender = Component.prototype?.render;
      if (originalRender && typeof originalRender === 'function') {
        Component.prototype.render = function(...args: any[]) {
          const renderStartTime = performance.now();
          const result = originalRender.apply(this, args);
          const renderEndTime = performance.now();
          
          trackEnhancedPerformance(`component_render_${componentName}`, renderEndTime - renderStartTime, {
            tags: { initial: 'false' }
          });
          
          return result;
        };
      }
      
      // Clean up on unmount
      return () => {
        if (originalRender) {
          Component.prototype.render = originalRender;
        }
      };
    }, []);
    
    return <Component {...props} />;
  };
  
  // Set display name for debugging
  WrappedComponent.displayName = `WithPerformanceTracking(${componentName})`;
  
  return WrappedComponent;
}
