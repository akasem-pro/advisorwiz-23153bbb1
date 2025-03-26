
import { Route } from 'react-router-dom';
import SignIn from '../pages/SignIn';

// Export auth routes as an array of Route components
const AuthRoutes = [
  <Route key="login" path="/login" element={<SignIn />} />,
  <Route key="signin" path="/sign-in" element={<SignIn />} />,
  <Route key="signin-alt" path="/signin" element={<SignIn />} />
];

export default AuthRoutes;
