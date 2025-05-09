
import React from 'react';
import SignIn from '../pages/SignIn';
import Onboarding from '../pages/Onboarding';

// Export auth routes matching the structure expected in AppRoutes
const AuthRoutes = [
  {
    path: "/signin",
    element: <SignIn />
  },
  {
    path: "/signup",
    element: <Onboarding />
  },
  {
    path: "/sign-in",
    element: <SignIn />
  },
  {
    path: "/sign-up",
    element: <Onboarding />
  }
];

export default AuthRoutes;
