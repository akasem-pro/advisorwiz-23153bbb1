
import React from 'react';
import { RouteConfig } from '../types/RouteConfig';
import { createLazyRoute } from '../../utils/routing/lazyRoutes';

// Import direct component for home and signup routes to avoid lazy loading issues
import LandingPage from '../../pages/LandingPage';
import Onboarding from '../../pages/Onboarding';

// Import route definitions
const publicRoutes: RouteConfig[] = [
  // Use direct component reference for home and signup routes to avoid lazy loading issues
  { path: '/', element: <LandingPage /> },
  { path: '/sign-up', element: <Onboarding /> },
  { path: '/signup', element: <Onboarding /> }, // Add explicit route for /signup
  createLazyRoute('/contact', () => import('../../pages/ContactUs')),
  createLazyRoute('/about', () => import('../../pages/AboutUs')),
  createLazyRoute('/sign-in', () => import('../../pages/SignIn')),
  createLazyRoute('/signin', () => import('../../pages/SignIn')), // Add explicit route for /signin
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
