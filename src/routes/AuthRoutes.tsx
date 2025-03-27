
import { Route } from 'react-router-dom';
import SignIn from '../pages/SignIn';
import Onboarding from '../pages/Onboarding';

// Export auth routes as an array of Route components
const AuthRoutes = [
  <Route key="login" path="/login" element={<SignIn />} />,
  <Route key="signin" path="/sign-in" element={<SignIn />} />,
  <Route key="signin-alt" path="/signin" element={<SignIn />} />,
  <Route key="signup" path="/sign-up" element={<Onboarding />} />,
  <Route key="signup-alt" path="/signup" element={<Onboarding />} />,
  <Route key="onboarding" path="/onboarding" element={<Onboarding />} />
];

export default AuthRoutes;
