
import React from 'react';
import Joyride, { ACTIONS, EVENTS, STATUS } from 'react-joyride';
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

export default OnboardingTour;
