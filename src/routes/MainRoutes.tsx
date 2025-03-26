
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

/**
 * Main routes definition - this component returns Route elements
 * to be used within a parent Route component.
 * 
 * Note: This component is kept for reference but is not directly used in AppRoutes.
 * The routes are defined inline in AppRoutes.tsx.
 */
const MainRoutes = () => {
  return (
    <>
      <Route index element={
        <Suspense fallback={<PageLoadingFallback />}>
          <Home />
        </Suspense>
      } />
      <Route path="about" element={
        <Suspense fallback={<PageLoadingFallback />}>
          <AboutUs />
        </Suspense>
      } />
      <Route path="for-consumers" element={
        <Suspense fallback={<PageLoadingFallback />}>
          <ForConsumers />
        </Suspense>
      } />
      <Route path="for-advisors" element={
        <Suspense fallback={<PageLoadingFallback />}>
          <ForAdvisors />
        </Suspense>
      } />
      <Route path="for-firms" element={
        <Suspense fallback={<PageLoadingFallback />}>
          <ForFirms />
        </Suspense>
      } />
      <Route path="blog" element={
        <Suspense fallback={<PageLoadingFallback />}>
          <Blog />
        </Suspense>
      } />
      <Route path="contact" element={
        <Suspense fallback={<PageLoadingFallback />}>
          <ContactUs />
        </Suspense>
      } />
      <Route path="pricing" element={
        <Suspense fallback={<PageLoadingFallback />}>
          <Pricing />
        </Suspense>
      } />
      <Route path="terms" element={
        <Suspense fallback={<PageLoadingFallback />}>
          <Terms />
        </Suspense>
      } />
      <Route path="privacy" element={
        <Suspense fallback={<PageLoadingFallback />}>
          <Privacy />
        </Suspense>
      } />
      <Route path="advisor/:id" element={
        <Suspense fallback={<PageLoadingFallback />}>
          <AdvisorProfile />
        </Suspense>
      } />
      <Route path="match" element={
        <Suspense fallback={<PageLoadingFallback />}>
          <MatchingInterface />
        </Suspense>
      } />
      <Route path="onboarding" element={
        <Suspense fallback={<PageLoadingFallback />}>
          <Onboarding />
        </Suspense>
      } />
      <Route path="resources" element={
        <Suspense fallback={<PageLoadingFallback />}>
          <Resources />
        </Suspense>
      } />
      <Route path="sitemap" element={
        <Suspense fallback={<PageLoadingFallback />}>
          <Sitemap />
        </Suspense>
      } />
      <Route path="careers" element={
        <Suspense fallback={<PageLoadingFallback />}>
          <Careers />
        </Suspense>
      } />
    </>
  );
};

export default MainRoutes;
