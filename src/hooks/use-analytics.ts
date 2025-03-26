
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '../utils/analytics/pageTracker';

/**
 * Custom hook to track page views
 * @param pageName Optional custom page name
 */
export const useTrackPageView = (pageName?: string) => {
  const location = useLocation();
  
  useEffect(() => {
    const pageTitle = pageName || document.title || 'AdvisorWiz';
    trackPageView(pageTitle, location.pathname);
  }, [location.pathname, pageName]);
  
  return null;
};
