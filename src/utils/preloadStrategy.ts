
/**
 * Handles preloading routes based on priority and user behavior
 */

// Routes that should be preloaded after initial page load
const HIGH_PRIORITY_ROUTES = ['/signin', '/signup', '/'];
const MEDIUM_PRIORITY_ROUTES = ['/for-advisors', '/for-consumers', '/pricing', '/for-firms'];

// Cache for preloaded components
const preloadedComponents = new Map<string, Promise<any>>();

/**
 * Preload components for high priority routes
 */
export const preloadHighPriorityRoutes = () => {
  // Use the built-in requestIdleCallback safely
  if (typeof window === 'undefined') return;
  
  const scheduleIdleTask = (callback: () => void) => {
    try {
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(callback, { timeout: 2000 });
      } else {
        // Fallback to setTimeout
        setTimeout(callback, 100);
      }
    } catch (error) {
      console.error('Error scheduling idle task:', error);
      setTimeout(callback, 100);
    }
  };

  scheduleIdleTask(() => {
    HIGH_PRIORITY_ROUTES.forEach(route => {
      try {
        const componentName = routeToComponentName(route);
        if (!preloadedComponents.has(componentName)) {
          const promise = import(/* @vite-ignore */ `../pages/${componentName}.tsx`)
            .catch(err => {
              console.debug('Preloading failed for', route, err);
              // Remove failed preloads from cache
              preloadedComponents.delete(componentName);
            });
          
          preloadedComponents.set(componentName, promise);
        }
      } catch (err) {
        console.debug('Error in preload setup for', route, err);
      }
    });
  });
};

/**
 * Preload medium priority routes after high priority ones
 */
export const preloadMediumPriorityRoutes = () => {
  if (typeof window === 'undefined') return;
  
  // Use the built-in requestIdleCallback without redefining it
  const scheduleIdleTask = (callback: () => void) => {
    try {
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(callback, { timeout: 4000 });
      } else {
        // Fallback to setTimeout
        setTimeout(callback, 300);
      }
    } catch (error) {
      console.error('Error scheduling idle task:', error);
      setTimeout(callback, 300);
    }
  };

  // Delayed preloading for medium priority routes
  setTimeout(() => {
    scheduleIdleTask(() => {
      MEDIUM_PRIORITY_ROUTES.forEach(route => {
        try {
          const componentName = routeToComponentName(route);
          if (!preloadedComponents.has(componentName)) {
            const promise = import(/* @vite-ignore */ `../pages/${componentName}.tsx`)
              .catch(err => {
                console.debug('Preloading failed for', route, err);
                // Remove failed preloads from cache
                preloadedComponents.delete(componentName);
              });
              
            preloadedComponents.set(componentName, promise);
          }
        } catch (err) {
          console.debug('Error in preload setup for', route, err);
        }
      });
    });
  }, 3000);
};

/**
 * Helper to convert route path to component name
 */
const routeToComponentName = (route: string): string => {
  if (!route || route === '/') return 'Home';
  
  // Convert routes like '/for-advisors' to 'ForAdvisors'
  return route
    .replace(/^\//, '') // Remove leading slash
    .split('-')
    .map(segment => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join('');
};

/**
 * Manually preload a specific route
 */
export const preloadRoute = (route: string): Promise<any> | undefined => {
  try {
    const componentName = routeToComponentName(route);
    if (!preloadedComponents.has(componentName)) {
      const promise = import(/* @vite-ignore */ `../pages/${componentName}.tsx`)
        .catch(err => {
          console.debug('On-demand preloading failed for', route);
          preloadedComponents.delete(componentName);
          throw err;
        });
        
      preloadedComponents.set(componentName, promise);
      return promise;
    }
    return preloadedComponents.get(componentName);
  } catch (err) {
    console.debug('Error in on-demand preload for', route);
    return undefined;
  }
};

/**
 * Initialize preloading strategy
 */
export const initPreloadStrategy = () => {
  if (typeof window === 'undefined') return;
  
  try {
    // Preload critical routes immediately for faster navigation
    preloadHighPriorityRoutes();
    
    // Then load medium priority routes
    preloadMediumPriorityRoutes();
    
    // Preload the current route and adjacent routes for better UX
    const preloadAdjacentRoutes = () => {
      const currentPath = window.location.pathname;
      preloadRoute(currentPath);
      
      // Find related routes to preload based on current path
      if (currentPath.includes('advisor')) {
        preloadRoute('/for-advisors');
      } else if (currentPath.includes('consumer')) {
        preloadRoute('/for-consumers');
      } else if (currentPath.includes('firm')) {
        preloadRoute('/for-firms');
      }
    };
    
    // Schedule adjacent routes preloading
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(preloadAdjacentRoutes, { timeout: 5000 });
    } else {
      setTimeout(preloadAdjacentRoutes, 1000);
    }
  } catch (error) {
    console.error("Error initializing preload strategy:", error);
  }
};
