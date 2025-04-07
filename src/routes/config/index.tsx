
import React from 'react';
import { RouteConfig } from '../types/RouteConfig';
import { createLazyRoute } from '../../utils/routing/lazyRoutes';

// Import direct component for home route to avoid lazy loading issues
import LandingPage from '../../pages/LandingPage';

// Import route definitions
const publicRoutes: RouteConfig[] = [
  // Use direct component reference for the home route to avoid lazy loading issues
  { path: '/', element: <LandingPage />, key: 'home' },
  createLazyRoute('/contact', () => import('../../pages/ContactUs')),
  createLazyRoute('/about', () => import('../../pages/AboutUs')),
  createLazyRoute('/sign-in', () => import('../../pages/SignIn')),
  createLazyRoute('/sign-up', () => import('../../pages/SignIn'), { meta: { title: 'Sign Up' } }),
];

// Dashboard routes
const dashboardRoutes: RouteConfig[] = [
  createLazyRoute('/advisor-dashboard', () => import('../../pages/AdvisorDashboard')),
  createLazyRoute('/analytics', () => import('../../pages/Analytics')),
  createLazyRoute('/admin-analytics', () => import('../../pages/AdminAnalytics')),
  createLazyRoute('/schedule', () => import('../../pages/Schedule')),
  createLazyRoute('/chat', () => import('../../pages/Chat')),
  createLazyRoute('/leads', () => import('../../pages/LeadManagementPage')),
  createLazyRoute('/team', () => import('../../pages/Team')),
  createLazyRoute('/settings', () => import('../../pages/Settings')),
];

// Combine all routes and export them
export const getAllRoutes = (): RouteConfig[] => {
  const allRoutes = [...publicRoutes, ...dashboardRoutes];
  console.log("Getting all routes", { 
    publicRoutes: publicRoutes.map(r => r.path), 
    dashboardRoutes: dashboardRoutes.map(r => r.path),
    allRoutes: allRoutes.map(r => r.path)
  });
  return allRoutes;
};

// Get a specific route by path
export const getRouteByPath = (path: string): RouteConfig | undefined => {
  return getAllRoutes().find(route => route.path === path);
};

export default getAllRoutes;
