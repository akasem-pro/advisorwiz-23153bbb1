
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const useMatchingNavigation = (
  setViewingMatches: (value: boolean) => void,
  loadMatchedProfiles: () => void
) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes('/matches')) {
      setViewingMatches(true);
      loadMatchedProfiles();
    } else {
      setViewingMatches(false);
    }
  }, [location, setViewingMatches, loadMatchedProfiles]);

  const handleSchedule = (profileId: string) => {
    navigate('/schedule', { state: { selectedProfileId: profileId } });
  };

  const goBackToMatching = () => {
    setViewingMatches(false);
    navigate('/');
  };

  return {
    navigate,
    handleSchedule,
    goBackToMatching
  };
};
