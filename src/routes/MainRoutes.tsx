
import { Route } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import Home from '../pages/Home';
import AboutUs from '../pages/AboutUs';
import ForAdvisors from '../pages/ForAdvisors';
import ForConsumers from '../pages/ForConsumers';
import ForFirms from '../pages/ForFirms';
import Blog from '../pages/Blog';
import Pricing from '../pages/Pricing';
import Team from '../pages/Team';
import Careers from '../pages/Careers';
import ContactUs from '../pages/ContactUs';
import Privacy from '../pages/Privacy';
import Terms from '../pages/Terms';
import Disclaimer from '../pages/Disclaimer';
import Cookies from '../pages/Cookies';
import Sitemap from '../pages/Sitemap';
import DownloadApp from '../pages/DownloadApp';
import Resources from '../pages/Resources';

// Always provide a unique key for each route for proper rendering
const MainRoutes = [
  <Route index element={<Home />} key="home" />,
  <Route path="about" element={
    <AppLayout>
      <AboutUs />
    </AppLayout>
  } key="about" />,
  <Route path="for-advisors" element={
    <AppLayout>
      <ForAdvisors />
    </AppLayout>
  } key="for-advisors" />,
  <Route path="for-consumers" element={
    <AppLayout>
      <ForConsumers />
    </AppLayout>
  } key="for-consumers" />,
  <Route path="for-firms" element={
    <AppLayout>
      <ForFirms />
    </AppLayout>
  } key="for-firms" />,
  <Route path="pricing" element={
    <AppLayout>
      <Pricing />
    </AppLayout>
  } key="pricing" />,
  <Route path="privacy" element={
    <AppLayout>
      <Privacy />
    </AppLayout>
  } key="privacy" />,
  <Route path="terms" element={
    <AppLayout>
      <Terms />
    </AppLayout>
  } key="terms" />,
  <Route path="disclaimer" element={
    <AppLayout>
      <Disclaimer />
    </AppLayout>
  } key="disclaimer" />,
  <Route path="cookies" element={
    <AppLayout>
      <Cookies />
    </AppLayout>
  } key="cookies" />,
  // Note: The routes for team, blog, careers, resources, download, sitemap
  // are now directly handled in AppRoutes.tsx for better layout control
];

export default MainRoutes;
