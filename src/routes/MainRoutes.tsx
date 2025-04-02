
import { createRoutes } from './routeHelpers';
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
import ContactUs from '../pages/ContactUs';
import Blog from '../pages/Blog';
import Resources from '../pages/Resources';
import EnhancedOnboardingTour from '../components/onboarding/EnhancedOnboardingTour';
import React from 'react';

// Wrap pages with the enhanced onboarding tour where appropriate
const withOnboarding = (Component: React.ComponentType, userType?: string) => {
  return (props: any) => (
    <>
      <EnhancedOnboardingTour 
        userType={userType as any} 
        tourName={Component.displayName || Component.name}
        autoStart={false} 
        buttonPosition="bottom-right"
      />
      <Component {...props} />
    </>
  );
};

// Create route configs with consistent layout pattern
const routeConfigs = [
  { 
    path: '/', 
    element: withOnboarding(Home), 
    key: 'home',
    index: true
  },
  { 
    path: 'about', 
    element: <AboutUs />, 
    key: 'about'
  },
  { 
    path: 'for-advisors', 
    element: withOnboarding(ForAdvisors, 'advisor'), 
    key: 'for-advisors'
  },
  { 
    path: 'for-consumers', 
    element: withOnboarding(ForConsumers, 'consumer'), 
    key: 'for-consumers'
  },
  { 
    path: 'for-firms', 
    element: withOnboarding(ForFirms, 'firm_admin'), 
    key: 'for-firms'
  },
  { 
    path: 'pricing', 
    element: <Pricing />, 
    key: 'pricing'
  },
  { 
    path: 'privacy', 
    element: <Privacy />, 
    key: 'privacy' 
  },
  { 
    path: 'terms', 
    element: <Terms />, 
    key: 'terms'
  },
  { 
    path: 'disclaimer', 
    element: <Disclaimer />, 
    key: 'disclaimer'
  },
  { 
    path: 'cookies', 
    element: <Cookies />, 
    key: 'cookies'
  },
  {
    path: 'contact',
    element: <ContactUs />,
    key: 'contact'
  },
  {
    path: 'blog/*',
    element: <Blog />,
    key: 'blog'
  },
  {
    path: 'resources',
    element: <Resources />,
    key: 'resources'
  }
];

// Simply use createRoutes without wrapping in additional AppLayout
const MainRoutes = createRoutes(routeConfigs);

export default MainRoutes;
