
import React, { Suspense, lazy } from 'react';
import { Route } from 'react-router-dom';
import { PageLoadingFallback } from '../components/LazyComponents';

// Lazy load pages
const Home = lazy(() => import('../pages/Home'));
const AboutUs = lazy(() => import('../pages/AboutUs'));
const ForAdvisors = lazy(() => import('../pages/ForAdvisors'));
const ForConsumers = lazy(() => import('../pages/ForConsumers'));
const ForFirms = lazy(() => import('../pages/ForFirms'));
const Pricing = lazy(() => import('../pages/Pricing'));
const Resources = lazy(() => import('../pages/Resources'));
const ContactUs = lazy(() => import('../pages/ContactUs'));
const Team = lazy(() => import('../pages/Team'));
const Blog = lazy(() => import('../pages/Blog'));
const Careers = lazy(() => import('../pages/Careers'));
const DownloadApp = lazy(() => import('../pages/DownloadApp'));
const Sitemap = lazy(() => import('../pages/Sitemap'));
const Schedule = lazy(() => import('../pages/Schedule'));
const Chat = lazy(() => import('../pages/Chat'));
const ConsumerProfile = lazy(() => import('../pages/ConsumerProfile'));
const AdvisorProfile = lazy(() => import('../pages/AdvisorProfile'));
const FirmProfile = lazy(() => import('../pages/FirmProfile'));
const LeadManagementPage = lazy(() => import('../pages/LeadManagementPage'));
const MatchingInterface = lazy(() => import('../pages/MatchingInterface'));
const Settings = lazy(() => import('../pages/Settings'));

// Wrap lazy-loaded components with suspense and fallback
const LazyLoadRoute = ({ element: Component, ...rest }: { element: React.ComponentType<any>, path: string }) => (
  <Route
    {...rest}
    element={
      <Suspense fallback={<PageLoadingFallback />}>
        <Component />
      </Suspense>
    }
  />
);

// Main content routes that benefit from lazy loading
export const OptimizedMainRoutes = [
  <LazyLoadRoute key="home" path="/" element={Home} />,
  <LazyLoadRoute key="about" path="about" element={AboutUs} />,
  <LazyLoadRoute key="for-advisors" path="for-advisors" element={ForAdvisors} />,
  <LazyLoadRoute key="for-consumers" path="for-consumers" element={ForConsumers} />,
  <LazyLoadRoute key="for-firms" path="for-firms" element={ForFirms} />,
  <LazyLoadRoute key="pricing" path="pricing" element={Pricing} />,
  <LazyLoadRoute key="resources" path="resources" element={Resources} />,
  <LazyLoadRoute key="contact" path="contact" element={ContactUs} />,
  <LazyLoadRoute key="team" path="team" element={Team} />,
  <LazyLoadRoute key="blog" path="blog/*" element={Blog} />,
  <LazyLoadRoute key="careers" path="careers" element={Careers} />,
  <LazyLoadRoute key="download" path="download" element={DownloadApp} />,
  <LazyLoadRoute key="sitemap" path="sitemap" element={Sitemap} />,
  <LazyLoadRoute key="schedule" path="schedule" element={Schedule} />,
  <LazyLoadRoute key="chat" path="chat" element={Chat} />,
  <LazyLoadRoute key="consumer-profile" path="consumer-profile" element={ConsumerProfile} />,
  <LazyLoadRoute key="advisor-profile" path="advisor-profile" element={AdvisorProfile} />,
  <LazyLoadRoute key="firm-profile" path="firm-profile" element={FirmProfile} />,
  <LazyLoadRoute key="lead-management" path="lead-management" element={LeadManagementPage} />,
  <LazyLoadRoute key="matching" path="matching" element={MatchingInterface} />,
  <LazyLoadRoute key="settings" path="settings" element={Settings} />
];
