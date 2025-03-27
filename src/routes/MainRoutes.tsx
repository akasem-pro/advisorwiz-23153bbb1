
import { Route } from 'react-router-dom';
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
  <Route path="about" element={<AboutUs />} key="about" />,
  <Route path="for-advisors" element={<ForAdvisors />} key="for-advisors" />,
  <Route path="for-consumers" element={<ForConsumers />} key="for-consumers" />,
  <Route path="for-firms" element={<ForFirms />} key="for-firms" />,
  <Route path="blog/*" element={<Blog />} key="blog" />,
  <Route path="pricing" element={<Pricing />} key="pricing" />,
  <Route path="team" element={<Team />} key="team" />,
  <Route path="careers" element={<Careers />} key="careers" />,
  <Route path="contact" element={<ContactUs />} key="contact" />,
  <Route path="privacy" element={<Privacy />} key="privacy" />,
  <Route path="terms" element={<Terms />} key="terms" />,
  <Route path="disclaimer" element={<Disclaimer />} key="disclaimer" />,
  <Route path="cookies" element={<Cookies />} key="cookies" />,
  <Route path="sitemap" element={<Sitemap />} key="sitemap" />,
  <Route path="download" element={<DownloadApp />} key="download" />,
  <Route path="resources" element={<Resources />} key="resources" />,
];

export default MainRoutes;
