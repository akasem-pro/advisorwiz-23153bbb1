
import { useState, useEffect, useCallback } from 'react';
import { Step } from 'react-joyride';
import { UserType } from '../../types/profileTypes';
import { useTourSteps } from './use-tour-steps';
import { useTourEvents } from './use-tour-events';
import { OnboardingTourOptions, OnboardingTourHook } from './types';

/**
 * Main hook for managing the onboarding tour
 */
export const useOnboardingTour = (
  userType?: UserType,
  onComplete?: () => void,
  onSkip?: () => void
): OnboardingTourHook => {
  const [run, setRun] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  
  // Get steps based on user type and current route
  const getSteps = useTourSteps(userType);
  const steps = getSteps();
  
  // Handle Joyride callbacks
  const handleJoyrideCallback = useTourEvents({
    steps,
    setStepIndex,
    setRun,
    onComplete,
    onSkip
  });

  // Only run on mount, not on re-renders
  useEffect(() => {
    // Show onboarding tour for new users
    const hasSeenTour = localStorage.getItem('hasSeenOnboardingTour');
    
    if (!hasSeenTour) {
      // Delay to ensure the UI is fully loaded
      const timer = setTimeout(() => {
        setRun(true);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, []);

  // Function to manually start the tour
  const startTour = useCallback(() => {
    setStepIndex(0);
    setRun(true);
  }, []);

  // Function to reset the tour (so it can be shown again)
  const resetTour = useCallback(() => {
    localStorage.removeItem('hasSeenOnboardingTour');
  }, []);

  return {
    run,
    stepIndex,
    steps,
    handleJoyrideCallback,
    setRun,
    startTour,
    resetTour
  };
};
