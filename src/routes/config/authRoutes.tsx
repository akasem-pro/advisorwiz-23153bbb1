
import React from 'react';
import SignIn from '../../pages/SignIn';
import Onboarding from '../../pages/Onboarding';
import { RouteConfig } from './types';

// Authentication routes configuration
export const authRoutes: Record<string, RouteConfig> = {
  // Auth routes
  signin: {
    path: '/signin',
    element: <SignIn />
  },
  signup: {
    path: '/signup',
    element: <Onboarding />
  },
};
