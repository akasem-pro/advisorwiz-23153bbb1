
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { trackPageView } from '../utils/analytics/pageTracker';

export const useNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const navigateTo = (path: string) => {
    if (path !== location.pathname) {
      console.log(`Navigating to: ${path}`);
      navigate(path);
    }
  };
  
  useEffect(() => {
    const pageTitle = document.title || 'AdvisorWiz';
    trackPageView(pageTitle, location.pathname);
  }, [location.pathname]);
  
  return { navigateTo, currentPath: location.pathname };
};
