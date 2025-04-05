
import React from 'react';
import { lazy } from 'react';
import AppLayout from '../../components/layout/AppLayout';
import { PageLoadingFallback } from '../../components/LazyComponents';

// Main pages
import Home from '../../pages/Home';
import AboutUs from '../../pages/AboutUs';
import ForAdvisors from '../../pages/ForAdvisors';
import ForFirms from '../../pages/ForFirms';
import ForConsumers from '../../pages/ForConsumers';
import Pricing from '../../pages/Pricing';
import Sitemap from '../../pages/Sitemap';
import ContactUs from '../../pages/ContactUs';
import Blog from '../../pages/Blog';

// Lazy loaded components
const LazySecurityAndAccessibilityPage = lazy(() => import('../../pages/SecurityAndAccessibilityPage'));

// Public route definitions
export const publicRoutes = {
  // Public routes
  home: {
    path: '/',
    element: <AppLayout><Home /></AppLayout>
  },
  about: {
    path: '/about',
    element: <AppLayout><AboutUs /></AppLayout>
  },
  forAdvisors: {
    path: '/for-advisors',
    element: <AppLayout><ForAdvisors /></AppLayout>
  },
  forFirms: {
    path: '/for-firms',
    element: <AppLayout><ForFirms /></AppLayout>
  },
  forConsumers: {
    path: '/for-consumers',
    element: <AppLayout><ForConsumers /></AppLayout>
  },
  pricing: {
    path: '/pricing',
    element: <AppLayout><Pricing /></AppLayout>
  },
  sitemap: {
    path: '/sitemap',
    element: <AppLayout><Sitemap /></AppLayout>
  },
  contact: {
    path: '/contact',
    element: <AppLayout><ContactUs /></AppLayout>
  },
  blog: {
    path: '/blog/*',
    element: <AppLayout><Blog /></AppLayout>
  },
  securityAccessibility: {
    path: '/security-accessibility',
    element: (
      <AppLayout>
        <React.Suspense fallback={<PageLoadingFallback />}>
          <LazySecurityAndAccessibilityPage />
        </React.Suspense>
      </AppLayout>
    )
  },
};
