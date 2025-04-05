
import React from 'react';
import { RouteItem } from './AppRoutes';
import MobileLayout from '../components/layout/MobileLayout';

// Define mobile-specific routes
const MobileRoutes: RouteItem[] = [
  {
    path: "/mobile",
    element: <MobileLayout><div>Mobile Home</div></MobileLayout>
  },
  {
    path: "/mobile/dashboard",
    element: <MobileLayout><div>Mobile Dashboard</div></MobileLayout>
  },
  {
    path: "/mobile/profile",
    element: <MobileLayout><div>Mobile Profile</div></MobileLayout>
  }
];

export default MobileRoutes;
