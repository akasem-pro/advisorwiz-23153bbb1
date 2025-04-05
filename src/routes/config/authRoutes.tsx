
import React from 'react';
import SignIn from '../../pages/SignIn';
import Onboarding from '../../pages/Onboarding';

// Auth route definitions
export const authRoutes = {
  signin: {
    path: '/signin',
    element: <SignIn />
  },
  signup: {
    path: '/signup',
    element: <Onboarding />
  },
};
