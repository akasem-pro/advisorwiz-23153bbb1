
import { useState, useCallback, useEffect, useRef } from 'react';
import { Step } from 'react-joyride';
import { useToast } from '../use-toast';
import { UserType } from '../../types/profileTypes';

// Constants for local storage keys
export const ONBOARDING_STORAGE_KEYS = {
  COMPLETED_TOURS: 'completedOnboardingTours',
  TOUR_PROGRESS: 'onboardingTourProgress',
  TOUR_PREFERENCES: 'onboardingPreferences'
};

export interface OnboardingPreferences {
  autoStart: boolean;
  showOnLogin: boolean;
  completedTours: string[];
}

export interface EnhancedOnboardingOptions {
  tourName: string;
  userType?: UserType;
  steps: Step[];
  onComplete?: () => void;
  onSkip?: () => void;
  autoStart?: boolean;
  disableOverlay?: boolean;
  showProgress?: boolean;
}

export const useEnhancedOnboarding = ({
  tourName,
  userType,
  steps,
  onComplete,
  onSkip,
  autoStart = false,
  disableOverlay = false,
  showProgress = true
}: EnhancedOnboardingOptions) => {
  const [run, setRun] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [tourProgress, setTourProgress] = useState<Record<string, number>>({});
  const [preferences, setPreferences] = useState<OnboardingPreferences>({
    autoStart: true,
    showOnLogin: true,
    completedTours: []
  });
  const isMounted = useRef(true);
  const { toast } = useToast();

  // Load saved preferences and progress
  useEffect(() => {
    try {
      const savedPreferences = localStorage.getItem(ONBOARDING_STORAGE_KEYS.TOUR_PREFERENCES);
      if (savedPreferences) {
        setPreferences(JSON.parse(savedPreferences));
      }
      
      const savedProgress = localStorage.getItem(ONBOARDING_STORAGE_KEYS.TOUR_PROGRESS);
      if (savedProgress) {
        const progressData = JSON.parse(savedProgress);
        setTourProgress(progressData);
        
        // Restore progress for current tour if it exists
        if (progressData[tourName]) {
          setStepIndex(progressData[tourName]);
        }
      }
    } catch (error) {
      console.error('Error loading onboarding preferences:', error);
    }
    
    return () => {
      isMounted.current = false;
    };
  }, [tourName]);

  // Save tour progress
  const saveTourProgress = useCallback((index: number) => {
    try {
      const updatedProgress = {
        ...tourProgress,
        [tourName]: index
      };
      localStorage.setItem(ONBOARDING_STORAGE_KEYS.TOUR_PROGRESS, JSON.stringify(updatedProgress));
      setTourProgress(updatedProgress);
    } catch (error) {
      console.error('Error saving tour progress:', error);
    }
  }, [tourName, tourProgress]);

  // Mark tour as completed
  const markTourAsCompleted = useCallback(() => {
    try {
      const updatedPreferences = {
        ...preferences,
        completedTours: [...preferences.completedTours, tourName]
      };
      localStorage.setItem(ONBOARDING_STORAGE_KEYS.TOUR_PREFERENCES, JSON.stringify(updatedPreferences));
      setPreferences(updatedPreferences);
      
      // Clear progress for completed tour
      const updatedProgress = { ...tourProgress };
      delete updatedProgress[tourName];
      localStorage.setItem(ONBOARDING_STORAGE_KEYS.TOUR_PROGRESS, JSON.stringify(updatedProgress));
      setTourProgress(updatedProgress);
    } catch (error) {
      console.error('Error marking tour as completed:', error);
    }
  }, [tourName, preferences, tourProgress]);

  // Update preferences
  const updatePreferences = useCallback((newPreferences: Partial<OnboardingPreferences>) => {
    try {
      const updatedPreferences = {
        ...preferences,
        ...newPreferences
      };
      localStorage.setItem(ONBOARDING_STORAGE_KEYS.TOUR_PREFERENCES, JSON.stringify(updatedPreferences));
      setPreferences(updatedPreferences);
    } catch (error) {
      console.error('Error updating tour preferences:', error);
    }
  }, [preferences]);

  // Check if tour is completed
  const isTourCompleted = useCallback(() => {
    return preferences.completedTours.includes(tourName);
  }, [preferences.completedTours, tourName]);

  // Reset tour progress
  const resetTour = useCallback(() => {
    setStepIndex(0);
    const updatedProgress = { ...tourProgress };
    delete updatedProgress[tourName];
    localStorage.setItem(ONBOARDING_STORAGE_KEYS.TOUR_PROGRESS, JSON.stringify(updatedProgress));
    setTourProgress(updatedProgress);
    
    // Remove from completed tours if it was completed
    if (isTourCompleted()) {
      const updatedPreferences = {
        ...preferences,
        completedTours: preferences.completedTours.filter(t => t !== tourName)
      };
      localStorage.setItem(ONBOARDING_STORAGE_KEYS.TOUR_PREFERENCES, JSON.stringify(updatedPreferences));
      setPreferences(updatedPreferences);
    }
    
    toast({
      title: "Tour Reset",
      description: "The tour progress has been reset. You can start it again.",
      duration: 3000,
    });
  }, [tourName, tourProgress, preferences, isTourCompleted, toast]);

  // Handle Joyride events
  const handleJoyrideCallback = useCallback((data: any) => {
    if (!isMounted.current) return;
    
    const { action, index, status, type } = data;
    
    if (type === 'step:after' && action === 'next') {
      const nextIndex = index + 1;
      setStepIndex(nextIndex);
      saveTourProgress(nextIndex);
    } else if (type === 'tour:end' && status === 'finished') {
      markTourAsCompleted();
      setRun(false);
      setStepIndex(0);
      
      if (onComplete) {
        onComplete();
      }
      
      toast({
        title: "Tour Completed",
        description: "You've completed this tour. You can access it again from the help menu if needed.",
        duration: 5000,
      });
    } else if (type === 'tour:end' && status === 'skipped') {
      setRun(false);
      
      if (onSkip) {
        onSkip();
      }
      
      toast({
        title: "Tour Skipped",
        description: "You can restart the tour anytime from the help menu.",
        duration: 3000,
      });
    }
  }, [onComplete, onSkip, saveTourProgress, markTourAsCompleted, toast]);
  
  // Start the tour
  const startTour = useCallback(() => {
    if (!isMounted.current) return;
    
    setRun(true);
    // If there's saved progress, use it, otherwise start from beginning
    const savedStepIndex = tourProgress[tourName] || 0;
    setStepIndex(savedStepIndex);
    
    if (savedStepIndex > 0) {
      toast({
        title: "Resuming Tour",
        description: "Continuing from where you left off.",
        duration: 2000,
      });
    }
  }, [tourName, tourProgress, toast]);
  
  // Check if tour should auto-start
  useEffect(() => {
    if (autoStart && preferences.autoStart && !isTourCompleted() && isMounted.current) {
      const timer = setTimeout(() => {
        if (isMounted.current) {
          startTour();
        }
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [autoStart, preferences.autoStart, isTourCompleted, startTour]);

  return {
    run,
    stepIndex,
    steps,
    handleJoyrideCallback,
    startTour,
    resetTour,
    setRun,
    isTourCompleted,
    tourProgress,
    preferences,
    updatePreferences,
    joyrideProps: {
      continuous: true,
      disableOverlayClose: !disableOverlay,
      showProgress,
      showSkipButton: true,
      spotlightClicks: true,
    }
  };
};
