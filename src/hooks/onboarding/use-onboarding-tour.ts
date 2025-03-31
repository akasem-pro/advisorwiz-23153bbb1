
import { useState, useCallback, useRef } from 'react';
import { Step } from 'react-joyride';
import { UserType } from '../../types/profileTypes';
import { useGeneralTourSteps } from './use-general-tour-steps';
import { useConsumerTourSteps } from './use-consumer-tour-steps';
import { useAdvisorTourSteps } from './use-advisor-tour-steps';

export const useOnboardingTour = (
  userType: UserType | undefined, 
  onComplete?: () => void,
  onSkip?: () => void
) => {
  const [run, setRun] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const isMounted = useRef(true);

  // Get the appropriate tour steps based on user type
  const generalSteps = useGeneralTourSteps();
  const consumerSteps = useConsumerTourSteps();
  const advisorSteps = useAdvisorTourSteps();

  let steps: Step[] = [];
  
  // Determine which steps to show based on user type
  if (userType === 'consumer') {
    steps = [...generalSteps, ...consumerSteps];
  } else if (userType === 'advisor') {
    steps = [...generalSteps, ...advisorSteps];
  } else {
    steps = generalSteps;
  }
  
  // Handle Joyride events
  const handleJoyrideCallback = useCallback((data: any) => {
    if (!isMounted.current) return;
    
    const { action, index, status, type } = data;
    
    if (type === 'step:after' && action === 'next') {
      setStepIndex(index + 1);
    } else if (type === 'tour:end' && status === 'finished' && onComplete) {
      onComplete();
      setRun(false);
      setStepIndex(0);
    } else if (type === 'tour:end' && status === 'skipped' && onSkip) {
      onSkip();
      setRun(false);
      setStepIndex(0);
    }
  }, [onComplete, onSkip]);
  
  // Start the tour
  const startTour = useCallback(() => {
    if (!isMounted.current) return;
    
    setRun(true);
    setStepIndex(0);
  }, []);
  
  // Cleanup functionality
  const cleanup = useCallback(() => {
    isMounted.current = false;
  }, []);

  return {
    run,
    stepIndex,
    steps,
    handleJoyrideCallback,
    startTour,
    setRun,
    cleanup
  };
};
