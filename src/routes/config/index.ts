
import { publicRoutes } from './publicRoutes';
import { profileRoutes } from './profileRoutes';
import { authRoutes } from './authRoutes';
import { protectedRoutes } from './protectedRoutes';
import { utilityRoutes } from './utilityRoutes';
import { RouteConfig } from './types';

// Combine all route configurations
const allRouteConfigs = {
  ...publicRoutes,
  ...profileRoutes,
  ...authRoutes,
  ...protectedRoutes,
  ...utilityRoutes,
};

/**
 * Helper function to get route by path
 */
export const getRouteByPath = (path: string): RouteConfig | undefined => {
  return Object.values(allRouteConfigs).find(route => route.path === path);
};

/**
 * Helper function to get all routes as an array
 */
export const getAllRoutes = (): RouteConfig[] => {
  console.log("Getting all routes");
  return Object.values(allRouteConfigs);
};

export { RouteConfig };
export { publicRoutes };
export { profileRoutes };
export { authRoutes };
export { protectedRoutes };
export { utilityRoutes };
