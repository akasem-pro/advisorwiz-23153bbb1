
import React from 'react';
import BaseTourComponent from './BaseTourComponent';
import { useFirmTourSteps } from '../../hooks/onboarding/use-firm-tour-steps';
import { TOUR_NAMES } from '../../hooks/onboarding/types';

interface FirmOnboardingTourProps {
  autoStart?: boolean;
  onComplete?: () => void;
}

const FirmOnboardingTour: React.FC<FirmOnboardingTourProps> = ({ 
  autoStart = true,
  onComplete
}) => {
  const steps = useFirmTourSteps();
  
  return (
    <BaseTourComponent
      tourName="FIRM_ONBOARDING"
      tourSteps={steps}
      userType="firm_admin"
      autoStart={autoStart}
      onComplete={onComplete}
      completionMessage={{
        title: "Firm Profile Setup Tour Complete!",
        description: "You're now ready to manage your firm and connect your advisors with potential clients."
      }}
    />
  );
};

export default FirmOnboardingTour;
