
import React from 'react';
import Joyride from 'react-joyride';
import { UserType } from '../../types/profileTypes';
import { useOnboardingTour } from '../../hooks/use-onboarding-tour';
import { tourStyles } from './OnboardingTourStyles';

interface OnboardingTourProps {
  userType?: UserType;
  onComplete?: () => void;
  onSkip?: () => void;
}

const OnboardingTour: React.FC<OnboardingTourProps> = ({ 
  userType, 
  onComplete,
  onSkip 
}) => {
  const { run, stepIndex, steps, handleJoyrideCallback } = useOnboardingTour(
    userType,
    onComplete,
    onSkip
  );

  // Only render if there are steps
  if (!steps.length) return null;

  return (
    <Joyride
      callback={handleJoyrideCallback}
      continuous
      hideCloseButton
      run={run}
      scrollToFirstStep
      scrollOffset={80} // Add offset for fixed headers
      showProgress
      showSkipButton
      stepIndex={stepIndex}
      steps={steps}
      disableScrolling={false} // Allow Joyride to handle scrolling
      styles={tourStyles}
    />
  );
};

export default OnboardingTour;
