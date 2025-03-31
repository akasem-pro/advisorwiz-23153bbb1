
import { createRoutes } from './routeHelpers';
import AppLayout from '../components/layout/AppLayout';
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

// Create route configs with consistent layout pattern
const routeConfigs = [
  { 
    path: '/', 
    element: <Home />, 
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
    element: <ForAdvisors />, 
    key: 'for-advisors'
  },
  { 
    path: 'for-consumers', 
    element: <ForConsumers />, 
    key: 'for-consumers'
  },
  { 
    path: 'for-firms', 
    element: <ForFirms />, 
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
];

// Apply consistent AppLayout to non-index routes
const MainRoutes = routeConfigs.map(config => {
  if (config.index) {
    // Use createRoutes for single route as well
    return createRoutes([config])[0];
  }
  
  return createRoutes([{
    ...config,
    element: (
      <AppLayout hideFooter={true}>
        {config.element}
      </AppLayout>
    )
  }])[0];
});

export default MainRoutes;
