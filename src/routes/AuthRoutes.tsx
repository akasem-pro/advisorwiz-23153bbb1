
import { Route } from 'react-router-dom';
import SignIn from '../pages/SignIn';

const AuthRoutes = () => {
  return (
    <>
      <Route path="/login" element={<SignIn />} />
      <Route path="/signin" element={<SignIn />} />
    </>
  );
};

export default AuthRoutes;
