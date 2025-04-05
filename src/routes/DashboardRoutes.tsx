
import { ReactNode } from 'react';
import { DashboardRouteType } from './dashboard/types';
import AdvisorRoutes from './dashboard/AdvisorRoutes';
import ConsumerRoutes from './dashboard/ConsumerRoutes';
import FirmRoutes from './dashboard/FirmRoutes';
import AdminRoutes from './dashboard/AdminRoutes';
import CommonRoutes from './dashboard/CommonRoutes';

// Combine all dashboard routes
const DashboardRoutes: DashboardRouteType[] = [
  ...CommonRoutes,
  ...AdvisorRoutes,
  ...ConsumerRoutes,
  ...FirmRoutes,
  ...AdminRoutes
];

export default DashboardRoutes;
