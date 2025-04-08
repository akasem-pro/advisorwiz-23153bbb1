import React from 'react';
import { RouteConfig } from '../types/RouteConfig';
import { createLazyRoute } from '../../utils/routing/lazyRoutes';

// Import direct component for home and signup routes to avoid lazy loading issues
import LandingPage from '../../pages/LandingPage';
import Onboarding from '../../pages/Onboarding';
import SignIn from '../../pages/SignIn';
import AboutUs from '../../pages/AboutUs';
import ContactUs from '../../pages/ContactUs';
import AdvisorProfile from '../../pages/AdvisorProfile';
import ConsumerProfile from '../../pages/ConsumerProfile';
import FirmProfile from '../../pages/FirmProfile';

// Import route definitions
const publicRoutes: RouteConfig[] = [
  // Use direct component reference for key routes
  { path: '/', element: <LandingPage /> },
  { path: '/sign-up', element: <Onboarding /> },
  { path: '/signup', element: <Onboarding /> },
  { path: '/sign-in', element: <SignIn /> },
  { path: '/signin', element: <SignIn /> },
  { path: '/about', element: <AboutUs /> },
  { path: '/contact', element: <ContactUs /> },
  
  // Profile routes
  { path: '/profile', element: <AdvisorProfile /> },
  { path: '/advisor-profile', element: <AdvisorProfile /> },
  { path: '/consumer-profile', element: <ConsumerProfile /> },
  { path: '/firm-profile', element: <FirmProfile /> },
  
  // Other public routes with lazy loading
  createLazyRoute('/for-advisors', () => import('../../pages/ForAdvisors')),
  createLazyRoute('/for-firms', () => import('../../pages/ForFirms')),
  createLazyRoute('/for-consumers', () => import('../../pages/ForConsumers')),
  createLazyRoute('/pricing', () => import('../../pages/Pricing')),
  createLazyRoute('/blog/*', () => import('../../pages/Blog')),
  createLazyRoute('/resources', () => import('../../pages/Resources')),
];

// User and utility routes
const userRoutes: RouteConfig[] = [
  createLazyRoute('/messages', () => import('../../pages/Messages')),
  createLazyRoute('/appointments', () => import('../../pages/Appointments')),
  createLazyRoute('/billing', () => import('../../pages/Billing')),
  createLazyRoute('/settings', () => import('../../pages/Settings')),
  createLazyRoute('/matches', () => import('../../pages/Matches')),
  createLazyRoute('/notifications', () => import('../../pages/Notifications')),
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
];

// Combine all routes and export them
export const getAllRoutes = (): RouteConfig[] => {
  const allRoutes = [...publicRoutes, ...userRoutes, ...dashboardRoutes];
  console.log("Getting all routes", { 
    publicRoutes: publicRoutes.map(r => r.path), 
    userRoutes: userRoutes.map(r => r.path),
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
