
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import AppLayout from '../components/layout/AppLayout';
import MobileLayout from '../components/layout/MobileLayout';
import NotFound from '../pages/NotFound';
import MainRoutes from './MainRoutes';
import DashboardRoutes from './DashboardRoutes';
import MobileRoutes from './MobileRoutes';
import AuthRoutes from './AuthRoutes';
import UtilityRoutes from './UtilityRoutes';
import { useLocation } from 'react-router-dom';
import ContactUs from '../pages/ContactUs';
import Team from '../pages/Team';
import TeamInvite from '../pages/TeamInvite';
import TeamMemberDetail from '../pages/TeamMemberDetail';
import Blog from '../pages/Blog';
import Careers from '../pages/Careers';
import Resources from '../pages/Resources';
import DownloadApp from '../pages/DownloadApp';
import Sitemap from '../pages/Sitemap';
import Schedule from '../pages/Schedule';
import Chat from '../pages/Chat';
import ConsumerProfile from '../pages/ConsumerProfile';
import OnboardingTour from '../components/onboarding/OnboardingTour';

const contentPageRoutes = [
  { path: 'contact', element: <ContactUs /> },
  { path: 'team', element: <Team /> },
  { path: 'team/invite', element: <TeamInvite /> },
  { path: 'team/member/:memberId', element: <TeamMemberDetail /> },
  { path: 'blog/*', element: <Blog /> },
  { path: 'careers', element: <Careers /> },
  { path: 'resources', element: <Resources /> },
  { path: 'download', element: <DownloadApp /> },
  { path: 'sitemap', element: <Sitemap /> },
  { path: 'schedule', element: <Schedule /> },
  { path: 'chat', element: <Chat /> },
  { path: 'chat/:chatId', element: <Chat /> },
  { path: 'consumer-profile', element: <ConsumerProfile /> },
  { path: 'messages', element: <Chat /> }, // Basic chat route
  { path: 'messages/:chatId', element: <Chat /> } // Route with specific chat ID
];

const redirectRoutes = [
  { path: '/login', to: '/signin' },
  { path: '/sign-in', to: '/signin' },
  { path: '/sign-up', to: '/signup' },
  { path: '/onboarding', to: '/signup' },
  { path: '/menu', to: '/sitemap' } // Add redirect for mobile menu to sitemap
];

const AppRoutes = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    console.log('Route changed:', location.pathname);
    const pageClass = 'page-' + (location.pathname.split('/')[1] || 'home');
    document.body.classList.add(pageClass);
    return () => {
      document.body.classList.remove(pageClass);
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
