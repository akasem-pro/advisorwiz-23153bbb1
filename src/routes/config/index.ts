
import { RouteConfig } from '../types/RouteConfig';
import { createLazyRoute } from '../../utils/routing/lazyRoutes';
import DashboardLayout from '../../components/dashboard/DashboardLayout';

// Import route definitions
const publicRoutes: RouteConfig[] = [
  createLazyRoute('/', () => import('../../pages/Home')),
  createLazyRoute('/contact', () => import('../../pages/ContactUs')),
  createLazyRoute('/about', () => import('../../pages/AboutUs')),
  createLazyRoute('/sign-in', () => import('../../pages/SignIn')),
  createLazyRoute('/sign-up', () => import('../../pages/SignIn'), { meta: { title: 'Sign Up' } }),
];

// Dashboard routes with layout
const dashboardRoutes: RouteConfig[] = [
  createLazyRoute('/advisor-dashboard', () => import('../../pages/AdvisorDashboard'), {
    withLayout: (component) => <DashboardLayout>{component}</DashboardLayout>,
    meta: { requiresAuth: true, title: 'Advisor Dashboard' }
  }),
  createLazyRoute('/analytics', () => import('../../pages/Analytics'), {
    withLayout: (component) => <DashboardLayout>{component}</DashboardLayout>,
    meta: { requiresAuth: true, title: 'Analytics Dashboard' }
  }),
  createLazyRoute('/admin-analytics', () => import('../../pages/AdminAnalytics'), {
    withLayout: (component) => <DashboardLayout>{component}</DashboardLayout>,
    meta: { requiresAuth: true, title: 'Admin Analytics Dashboard' }
  }),
];

// Combine all routes
export const getAllRoutes = (): RouteConfig[] => {
  return [
    ...publicRoutes,
    ...dashboardRoutes,
  ];
};

// Get a specific route by path
export const getRouteByPath = (path: string): RouteConfig | undefined => {
  return getAllRoutes().find(route => route.path === path);
};

export default getAllRoutes;
