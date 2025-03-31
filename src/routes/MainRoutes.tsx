
import { Route } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import Home from '../pages/Home';
import AboutUs from '../pages/AboutUs';
import ForAdvisors from '../pages/ForAdvisors';
import ForConsumers from '../pages/ForConsumers';
import ForFirms from '../pages/ForFirms';
import Pricing from '../pages/Pricing';
import Privacy from '../pages/Privacy';
import Terms from '../pages/Terms';
import Disclaimer from '../pages/Disclaimer';
import Cookies from '../pages/Cookies';

// Always provide a unique key for each route for proper rendering
const MainRoutes = [
  <Route index element={<Home />} key="home" />,
  <Route path="about" element={
    <AppLayout hideFooter={true}>
      <AboutUs />
    </AppLayout>
  } key="about" />,
  <Route path="for-advisors" element={
    <AppLayout hideFooter={true}>
      <ForAdvisors />
    </AppLayout>
  } key="for-advisors" />,
  <Route path="for-consumers" element={
    <AppLayout hideFooter={true}>
      <ForConsumers />
    </AppLayout>
  } key="for-consumers" />,
  <Route path="for-firms" element={
    <AppLayout hideFooter={true}>
      <ForFirms />
    </AppLayout>
  } key="for-firms" />,
  <Route path="pricing" element={
    <AppLayout hideFooter={true}>
      <Pricing />
    </AppLayout>
  } key="pricing" />,
  <Route path="privacy" element={
    <AppLayout hideFooter={true}>
      <Privacy />
    </AppLayout>
  } key="privacy" />,
  <Route path="terms" element={
    <AppLayout hideFooter={true}>
      <Terms />
    </AppLayout>
  } key="terms" />,
  <Route path="disclaimer" element={
    <AppLayout hideFooter={true}>
      <Disclaimer />
    </AppLayout>
  } key="disclaimer" />,
  <Route path="cookies" element={
    <AppLayout hideFooter={true}>
      <Cookies />
    </AppLayout>
  } key="cookies" />,
];

export default MainRoutes;
