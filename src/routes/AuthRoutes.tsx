
import React from 'react';
import { Route } from 'react-router-dom';
import SignIn from '../pages/SignIn';
import Onboarding from '../pages/Onboarding';

// Export auth routes as an array of Route components
const AuthRoutes = [
  <Route key="signin" path="signin" element={<SignIn />} />,
  <Route key="signup" path="signup" element={<Onboarding />} />
];

export default AuthRoutes;
