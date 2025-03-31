
/**
 * Handles preloading routes based on priority and user behavior
 */

// Routes that should be preloaded after initial page load
const HIGH_PRIORITY_ROUTES = ['/signin', '/signup', '/'];
const MEDIUM_PRIORITY_ROUTES = ['/for-advisors', '/for-consumers', '/pricing'];

/**
 * Preload components for high priority routes
 */
export const preloadHighPriorityRoutes = () => {
  // Use the built-in requestIdleCallback without redefining it
  const scheduleIdleTask = (callback: () => void) => {
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      window.requestIdleCallback(callback, { timeout: 2000 });
    } else {
      // Fallback to setTimeout
      setTimeout(callback, 100);
    }
  };

  scheduleIdleTask(() => {
    HIGH_PRIORITY_ROUTES.forEach(route => {
      import(/* @vite-ignore */ `../pages/${routeToComponentName(route)}.tsx`)
        .catch(err => console.debug('Preloading failed for', route));
    });
  });
};

/**
 * Preload medium priority routes after high priority ones
 */
export const preloadMediumPriorityRoutes = () => {
  // Use the built-in requestIdleCallback without redefining it
  const scheduleIdleTask = (callback: () => void) => {
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      window.requestIdleCallback(callback, { timeout: 4000 });
    } else {
      // Fallback to setTimeout
      setTimeout(callback, 300);
    }
  };

  // Delayed preloading for medium priority routes
  setTimeout(() => {
    scheduleIdleTask(() => {
      MEDIUM_PRIORITY_ROUTES.forEach(route => {
        import(/* @vite-ignore */ `../pages/${routeToComponentName(route)}.tsx`)
          .catch(err => console.debug('Preloading failed for', route));
      });
    });
  }, 3000);
};

/**
 * Helper to convert route path to component name
 */
const routeToComponentName = (route: string): string => {
  // Convert routes like '/for-advisors' to 'ForAdvisors'
  return route
    .replace(/^\//, '') // Remove leading slash
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
};

/**
 * Initialize preloading strategy
 */
export const initPreloadStrategy = () => {
  // Only preload in production to avoid affecting dev experience
  if (process.env.NODE_ENV === 'production') {
    // Start with high priority routes
    preloadHighPriorityRoutes();
    
    // Then load medium priority routes
    preloadMediumPriorityRoutes();
  }
};
