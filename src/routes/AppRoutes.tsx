
import { Routes, Route, Outlet, Navigate, useLocation } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import AppLayout from '../components/layout/AppLayout';
import MobileLayout from '../components/layout/MobileLayout';
import NotFound from '../pages/NotFound';
import MainRoutes from './MainRoutes';
import DashboardRoutes from './DashboardRoutes';
import MobileRoutes from './MobileRoutes';
import AuthRoutes from './AuthRoutes';
import UtilityRoutes from './UtilityRoutes';
import OnboardingTour from '../components/onboarding/OnboardingTour';
import { Skeleton } from '../components/ui/skeleton';

// Lazy load content pages to improve initial load time
const LazyContactUs = lazy(() => import('../pages/ContactUs'));
const LazyTeam = lazy(() => import('../pages/Team'));
const LazyTeamInvite = lazy(() => import('../pages/TeamInvite'));
const LazyTeamMemberDetail = lazy(() => import('../pages/TeamMemberDetail'));
const LazyBlog = lazy(() => import('../pages/Blog'));
const LazyCareers = lazy(() => import('../pages/Careers'));
const LazyResources = lazy(() => import('../pages/Resources'));
const LazyDownloadApp = lazy(() => import('../pages/DownloadApp'));
const LazySitemap = lazy(() => import('../pages/Sitemap'));
const LazySchedule = lazy(() => import('../pages/Schedule'));
const LazyChat = lazy(() => import('../pages/Chat'));
const LazyConsumerProfile = lazy(() => import('../pages/ConsumerProfile'));

// Loading fallback component
const PageLoadingFallback = () => (
  <div className="container mx-auto px-4 py-8">
    <Skeleton className="h-12 w-3/4 mb-6" />
    <Skeleton className="h-64 w-full mb-4" />
    <Skeleton className="h-32 w-full mb-4" />
    <Skeleton className="h-32 w-full" />
  </div>
);

const contentPageRoutes = [
  { path: 'contact', element: <Suspense fallback={<PageLoadingFallback />}><LazyContactUs /></Suspense> },
  { path: 'team', element: <Suspense fallback={<PageLoadingFallback />}><LazyTeam /></Suspense> },
  { path: 'team/invite', element: <Suspense fallback={<PageLoadingFallback />}><LazyTeamInvite /></Suspense> },
  { path: 'team/member/:memberId', element: <Suspense fallback={<PageLoadingFallback />}><LazyTeamMemberDetail /></Suspense> },
  { path: 'blog/*', element: <Suspense fallback={<PageLoadingFallback />}><LazyBlog /></Suspense> },
  { path: 'careers', element: <Suspense fallback={<PageLoadingFallback />}><LazyCareers /></Suspense> },
  { path: 'resources', element: <Suspense fallback={<PageLoadingFallback />}><LazyResources /></Suspense> },
  { path: 'download', element: <Suspense fallback={<PageLoadingFallback />}><LazyDownloadApp /></Suspense> },
  { path: 'sitemap', element: <Suspense fallback={<PageLoadingFallback />}><LazySitemap /></Suspense> },
  { path: 'schedule', element: <Suspense fallback={<PageLoadingFallback />}><LazySchedule /></Suspense> },
  { path: 'chat', element: <Suspense fallback={<PageLoadingFallback />}><LazyChat /></Suspense> },
  { path: 'chat/:chatId', element: <Suspense fallback={<PageLoadingFallback />}><LazyChat /></Suspense> },
  { path: 'consumer-profile', element: <Suspense fallback={<PageLoadingFallback />}><LazyConsumerProfile /></Suspense> },
  { path: 'messages', element: <Suspense fallback={<PageLoadingFallback />}><LazyChat /></Suspense> },
  { path: 'messages/:chatId', element: <Suspense fallback={<PageLoadingFallback />}><LazyChat /></Suspense> }
];

const redirectRoutes = [
  { path: '/login', to: '/signin' },
  { path: '/sign-in', to: '/signin' },
  { path: '/sign-up', to: '/signup' },
  { path: '/onboarding', to: '/signup' },
  { path: '/menu', to: '/sitemap' }
];

const AppRoutes = () => {
  const location = useLocation();

  useEffect(() => {
    // Use requestAnimationFrame to ensure scrolling happens after render
    const frameId = requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'auto' });
    });
    
    console.log('Route changed:', location.pathname);
    
    // Update body classes efficiently
    document.body.className = document.body.className
      .split(' ')
      .filter(cls => !cls.startsWith('page-'))
      .join(' ');
    
    const pageClass = 'page-' + (location.pathname.split('/')[1] || 'home');
    document.body.classList.add(pageClass);
    
    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [location.pathname]);

  return (
    <>
      <div className="relative z-[9999]">
        <OnboardingTour />
      </div>
      
      <Routes>
        <Route path="/m" element={<MobileLayout><Outlet /></MobileLayout>}>
          {MobileRoutes}
        </Route>
        
        {AuthRoutes}
        
        {redirectRoutes.map((redirect, index) => (
          <Route 
            key={`redirect-${index}`} 
            path={redirect.path} 
            element={<Navigate to={redirect.to} replace />} 
          />
        ))}
        
        <Route path="/" element={<Outlet />}>
          {contentPageRoutes.map((routeProps, index) => (
            <Route 
              key={`content-${index}`} 
              path={routeProps.path} 
              element={
                <AppLayout hideFooter={false}>
                  {routeProps.element}
                </AppLayout>
              } 
            />
          ))}
          
          {MainRoutes}
          {DashboardRoutes}
        </Route>
        
        {UtilityRoutes}
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
