
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Resources from '../pages/Resources';
import AboutUs from '../pages/AboutUs';
import ForAdvisors from '../pages/ForAdvisors';
import ForConsumers from '../pages/ForConsumers';
import ForFirms from '../pages/ForFirms';
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

const MainRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/resources" element={<Resources />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/for-advisors" element={<ForAdvisors />} />
      <Route path="/for-consumers" element={<ForConsumers />} />
      <Route path="/for-firms" element={<ForFirms />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/download" element={<DownloadApp />} />
      <Route path="/team" element={<Team />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/careers" element={<Careers />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/disclaimer" element={<Disclaimer />} />
      <Route path="/cookies" element={<Cookies />} />
      <Route path="/sitemap" element={<Sitemap />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default MainRoutes;
