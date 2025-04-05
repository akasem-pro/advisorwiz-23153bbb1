
import React from 'react';
import { RouteItem } from './AppRoutes';
import AppLayout from '../components/layout/MobileLayout';

// Define mobile-specific routes
const MobileRoutes: RouteItem[] = [
  {
    path: "/mobile",
    element: <AppLayout><div>Mobile Home</div></AppLayout>
  },
  {
    path: "/mobile/dashboard",
    element: <AppLayout><div>Mobile Dashboard</div></AppLayout>
  },
  {
    path: "/mobile/profile",
    element: <AppLayout><div>Mobile Profile</div></AppLayout>
  }
];

export default MobileRoutes;
