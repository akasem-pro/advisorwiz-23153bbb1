
import React from 'react';
import { Route } from 'react-router-dom';
import Home from '../pages/Home';
import Resources from '../pages/Resources';
import AboutUs from '../pages/AboutUs';
import Consumers from '../pages/ForConsumers';
import Advisors from '../pages/ForAdvisors';
import Firms from '../pages/ForFirms';
import Pricing from '../pages/Pricing';
import ContactUs from '../pages/ContactUs';
import DownloadApp from '../pages/DownloadApp';
import Team from '../pages/Team';
import Blog from '../pages/Blog';
import Careers from '../pages/Careers';
import Terms from '../pages/Terms';
import Privacy from '../pages/Privacy';
import Disclaimer from '../pages/Disclaimer';
import Cookies from '../pages/Cookies';
import Sitemap from '../pages/Sitemap';
import NotFound from '../pages/NotFound';

// Export main routes as an array of Route components
const MainRoutes = [
  <Route key="home" path="/" element={<Home />} />,
  <Route key="resources" path="/resources" element={<Resources />} />,
  <Route key="about" path="/about" element={<AboutUs />} />,
  <Route key="consumers" path="/consumers" element={<Consumers />} />,
  <Route key="advisors" path="/advisors" element={<Advisors />} />,
  <Route key="firms" path="/firms" element={<Firms />} />,
  <Route key="pricing" path="/pricing" element={<Pricing />} />,
  <Route key="contact" path="/contact" element={<ContactUs />} />,
  <Route key="download" path="/download" element={<DownloadApp />} />,
  <Route key="team" path="/team" element={<Team />} />,
  <Route key="blog" path="/blog" element={<Blog />} />,
  <Route key="careers" path="/careers" element={<Careers />} />,
  <Route key="terms" path="/terms" element={<Terms />} />,
  <Route key="privacy" path="/privacy" element={<Privacy />} />,
  <Route key="disclaimer" path="/disclaimer" element={<Disclaimer />} />,
  <Route key="cookies" path="/cookies" element={<Cookies />} />,
  <Route key="sitemap" path="/sitemap" element={<Sitemap />} />,
  <Route key="notfound" path="*" element={<NotFound />} />
];

export default MainRoutes;
