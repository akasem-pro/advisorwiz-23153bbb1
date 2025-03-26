
import { Route } from 'react-router-dom';
import SignIn from '../pages/SignIn';

/**
 * Auth routes definition - this component returns Route elements
 * to be used within a parent Route component.
 * 
 * Note: This component is kept for reference but is not directly used in AppRoutes.
 * The routes are defined inline in AppRoutes.tsx.
 */
const AuthRoutes = () => {
  return (
    <>
      <Route path="/login" element={<SignIn />} />
      <Route path="/signin" element={<SignIn />} />
    </>
  );
};

export default AuthRoutes;
