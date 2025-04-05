
import { routes, getRouteByPath, getAllRoutes } from './config';
import { RouteConfig, RouteConfigWithProps, RouteItem, isDirectRoute, isPropsRoute } from './AppRoutes';

// Re-export routes and helpers
export { routes, getRouteByPath, getAllRoutes };

// Re-export route types and helpers using 'export type' syntax
export type { RouteConfig, RouteConfigWithProps, RouteItem };
export { isDirectRoute, isPropsRoute };
