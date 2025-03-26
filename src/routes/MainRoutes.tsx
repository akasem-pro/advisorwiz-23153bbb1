
import { lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';
import { PageLoadingFallback } from '../components/LazyComponents';

// Lazy loaded pages
const Home = lazy(() => import('../pages/Home'));
const AboutUs = lazy(() => import('../pages/AboutUs'));
const ForConsumers = lazy(() => import('../pages/ForConsumers'));
const ForAdvisors = lazy(() => import('../pages/ForAdvisors'));
const ForFirms = lazy(() => import('../pages/ForFirms'));
const Blog = lazy(() => import('../pages/Blog'));
const ContactUs = lazy(() => import('../pages/ContactUs'));
const Pricing = lazy(() => import('../pages/Pricing'));
const Terms = lazy(() => import('../pages/Terms'));
const Privacy = lazy(() => import('../pages/Privacy'));
const AdvisorProfile = lazy(() => import('../pages/AdvisorProfile'));
const MatchingInterface = lazy(() => import('../pages/MatchingInterface'));
const Onboarding = lazy(() => import('../pages/Onboarding'));
const Resources = lazy(() => import('../pages/Resources'));
const Sitemap = lazy(() => import('../pages/Sitemap'));
const Careers = lazy(() => import('../pages/Careers'));
const DownloadApp = lazy(() => import('../pages/DownloadApp'));
const Disclaimer = lazy(() => import('../pages/Disclaimer'));
const Cookies = lazy(() => import('../pages/Cookies'));

// Export main routes as an array of Route components
const MainRoutes = [
  <Route key="home" index element={
    <Suspense fallback={<PageLoadingFallback />}>
      <Home />
    </Suspense>
  } />,
  <Route key="about" path="about" element={
    <Suspense fallback={<PageLoadingFallback />}>
      <AboutUs />
    </Suspense>
  } />,
  <Route key="for-consumers" path="for-consumers" element={
    <Suspense fallback={<PageLoadingFallback />}>
      <ForConsumers />
    </Suspense>
  } />,
  <Route key="for-advisors" path="for-advisors" element={
    <Suspense fallback={<PageLoadingFallback />}>
      <ForAdvisors />
    </Suspense>
  } />,
  <Route key="for-firms" path="for-firms" element={
    <Suspense fallback={<PageLoadingFallback />}>
      <ForFirms />
    </Suspense>
  } />,
  <Route key="blog" path="blog" element={
    <Suspense fallback={<PageLoadingFallback />}>
      <Blog />
    </Suspense>
  } />,
  <Route key="contact" path="contact" element={
    <Suspense fallback={<PageLoadingFallback />}>
      <ContactUs />
    </Suspense>
  } />,
  <Route key="pricing" path="pricing" element={
    <Suspense fallback={<PageLoadingFallback />}>
      <Pricing />
    </Suspense>
  } />,
  <Route key="terms" path="terms" element={
    <Suspense fallback={<PageLoadingFallback />}>
      <Terms />
    </Suspense>
  } />,
  <Route key="privacy" path="privacy" element={
    <Suspense fallback={<PageLoadingFallback />}>
      <Privacy />
    </Suspense>
  } />,
  <Route key="disclaimer" path="disclaimer" element={
    <Suspense fallback={<PageLoadingFallback />}>
      <Disclaimer />
    </Suspense>
  } />,
  <Route key="cookies" path="cookies" element={
    <Suspense fallback={<PageLoadingFallback />}>
      <Cookies />
    </Suspense>
  } />,
  <Route key="advisor-profile" path="advisor/:id" element={
    <Suspense fallback={<PageLoadingFallback />}>
      <AdvisorProfile />
    </Suspense>
  } />,
  <Route key="matching" path="match" element={
    <Suspense fallback={<PageLoadingFallback />}>
      <MatchingInterface />
    </Suspense>
  } />,
  <Route key="matches" path="matches" element={
    <Suspense fallback={<PageLoadingFallback />}>
      <MatchingInterface />
    </Suspense>
  } />,
  <Route key="onboarding" path="onboarding" element={
    <Suspense fallback={<PageLoadingFallback />}>
      <Onboarding />
    </Suspense>
  } />,
  <Route key="resources" path="resources" element={
    <Suspense fallback={<PageLoadingFallback />}>
      <Resources />
    </Suspense>
  } />,
  <Route key="sitemap" path="sitemap" element={
    <Suspense fallback={<PageLoadingFallback />}>
      <Sitemap />
    </Suspense>
  } />,
  <Route key="careers" path="careers" element={
    <Suspense fallback={<PageLoadingFallback />}>
      <Careers />
    </Suspense>
  } />,
  <Route key="download" path="download" element={
    <Suspense fallback={<PageLoadingFallback />}>
      <DownloadApp />
    </Suspense>
  } />
];

export default MainRoutes;
