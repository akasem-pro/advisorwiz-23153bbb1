
import React from 'react';
import Joyride, { Step } from 'react-joyride';
import { useUser } from '../../context/UserContext';
import { tourStyles } from './OnboardingTourStyles';
import { useOnboardingTour } from '../../hooks/use-onboarding-tour';
import { UserType } from '../../types/profileTypes';

interface UserOnboardingTourProps {
  userType?: 'consumer' | 'advisor' | 'firm_admin';
}

const UserOnboardingTour: React.FC<UserOnboardingTourProps> = ({ userType }) => {
  const { isAuthenticated } = useUser();
  const { 
    run, 
    stepIndex, 
    steps, 
    handleJoyrideCallback, 
    startTour 
  } = useOnboardingTour(userType as UserType);
  
  React.useEffect(() => {
    // Only show user onboarding tour for authenticated users
    if (isAuthenticated) {
      // Check if they've already seen this specific tour
      const hasSeenUserTour = localStorage.getItem('hasSeenUserOnboardingTour');
      if (!hasSeenUserTour) {
        // Delay to ensure the UI is fully loaded
        const timer = setTimeout(() => {
          startTour();
          // Mark this specific tour as seen
          localStorage.setItem('hasSeenUserOnboardingTour', 'true');
        }, 1000);
        
        return () => clearTimeout(timer);
      }
    }
  }, [isAuthenticated, startTour]);

  // Only render if there are steps and the tour should run
  if (!steps.length || !run) return null;

  return (
    <Joyride
      callback={handleJoyrideCallback}
      continuous
      hideCloseButton={false}
      run={run}
      scrollToFirstStep
      scrollOffset={80} 
      showProgress
      showSkipButton
      stepIndex={stepIndex}
      steps={steps}
      disableScrolling={false}
      styles={tourStyles}
      disableOverlayClose
      spotlightClicks
    />
  );
};

export default UserOnboardingTour;
