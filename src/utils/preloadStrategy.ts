
/**
 * Handles preloading routes based on priority and user behavior
 */

// Routes that should be preloaded after initial page load
const HIGH_PRIORITY_ROUTES = ['/signin', '/signup', '/'];
const MEDIUM_PRIORITY_ROUTES = ['/for-advisors', '/for-consumers', '/pricing'];

// Type definition for requestIdleCallback to handle TypeScript errors
interface RequestIdleCallbackOptions {
  timeout: number;
}

// Define appropriate requestIdleCallback type
type RequestIdleCallbackHandle = any;
type RequestIdleCallbackDeadline = {
  readonly didTimeout: boolean;
  timeRemaining: () => number;
};
type RequestIdleCallbackFn = (deadline: RequestIdleCallbackDeadline) => void;

// Define requestIdleCallback for TypeScript
declare global {
  interface Window {
    requestIdleCallback: (
      callback: RequestIdleCallbackFn,
      opts?: RequestIdleCallbackOptions
    ) => RequestIdleCallbackHandle;
    cancelIdleCallback: (handle: RequestIdleCallbackHandle) => void;
  }
}

/**
 * Preload components for high priority routes
 */
export const preloadHighPriorityRoutes = () => {
  // Use requestIdleCallback for non-blocking preloading if available
  if (typeof window.requestIdleCallback === 'function') {
    window.requestIdleCallback((deadline) => {
      if (deadline.timeRemaining() > 0 || deadline.didTimeout) {
        HIGH_PRIORITY_ROUTES.forEach(route => {
          import(/* @vite-ignore */ `../pages/${routeToComponentName(route)}.tsx`)
            .catch(err => console.debug('Preloading failed for', route));
        });
      }
    }, { timeout: 2000 });
  } else {
    // Fallback to setTimeout
    setTimeout(() => {
      HIGH_PRIORITY_ROUTES.forEach(route => {
        import(/* @vite-ignore */ `../pages/${routeToComponentName(route)}.tsx`)
          .catch(err => console.debug('Preloading failed for', route));
      });
    }, 100);
  }
};

/**
 * Preload medium priority routes after high priority ones
 */
export const preloadMediumPriorityRoutes = () => {
  // Delayed preloading for medium priority routes
  setTimeout(() => {
    if (typeof window.requestIdleCallback === 'function') {
      window.requestIdleCallback((deadline) => {
        if (deadline.timeRemaining() > 0 || deadline.didTimeout) {
          MEDIUM_PRIORITY_ROUTES.forEach(route => {
            import(/* @vite-ignore */ `../pages/${routeToComponentName(route)}.tsx`)
              .catch(err => console.debug('Preloading failed for', route));
          });
        }
      }, { timeout: 4000 });
    } else {
      // Fallback to setTimeout
      setTimeout(() => {
        MEDIUM_PRIORITY_ROUTES.forEach(route => {
          import(/* @vite-ignore */ `../pages/${routeToComponentName(route)}.tsx`)
            .catch(err => console.debug('Preloading failed for', route));
        });
      }, 300);
    }
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
