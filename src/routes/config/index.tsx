
import { publicRoutes } from './publicRoutes';
import { legalRoutes } from './legalRoutes';
import { profileRoutes } from './profileRoutes';
import { authRoutes } from './authRoutes';
import { dashboardRoutes } from './dashboardRoutes';
import { utilityRoutes } from './utilityRoutes';

// Combine all routes
export const routes = {
  ...publicRoutes,
  ...legalRoutes,
  ...profileRoutes,
  ...authRoutes,
  ...dashboardRoutes,
  ...utilityRoutes
};

// Helper function to get route element by path
export const getRouteByPath = (path: string) => {
  return Object.values(routes).find(route => route.path === path);
};

// Helper function to get all routes as an array
export const getAllRoutes = () => {
  return Object.values(routes);
};
