
import { useReducer, useCallback, useEffect, useRef } from 'react';
import { Step } from 'react-joyride';
import { useEnhancedFeedback } from '../use-enhanced-feedback';
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

// Define onboarding state type
interface OnboardingState {
  run: boolean;
  stepIndex: number;
  tourProgress: Record<string, number>;
  preferences: OnboardingPreferences;
}

// Define action types
type OnboardingAction = 
  | { type: 'START_TOUR'; initialStep?: number }
  | { type: 'STOP_TOUR' }
  | { type: 'SET_STEP'; index: number }
  | { type: 'SET_TOUR_PROGRESS'; progress: Record<string, number> }
  | { type: 'SET_PREFERENCES'; preferences: Partial<OnboardingPreferences> }
  | { type: 'COMPLETE_TOUR'; tourName: string }
  | { type: 'RESET_TOUR'; tourName: string };

// Onboarding reducer for more predictable state transitions
const onboardingReducer = (state: OnboardingState, action: OnboardingAction): OnboardingState => {
  switch (action.type) {
    case 'START_TOUR':
      return {
        ...state,
        run: true,
        stepIndex: action.initialStep ?? state.stepIndex
      };
    case 'STOP_TOUR':
      return {
        ...state,
        run: false
      };
    case 'SET_STEP':
      return {
        ...state,
        stepIndex: action.index
      };
    case 'SET_TOUR_PROGRESS':
      return {
        ...state,
        tourProgress: action.progress
      };
    case 'SET_PREFERENCES':
      return {
        ...state,
        preferences: {
          ...state.preferences,
          ...action.preferences
        }
      };
    case 'COMPLETE_TOUR':
      // Remove progress for completed tour and add to completed list
      const updatedProgress = { ...state.tourProgress };
      delete updatedProgress[action.tourName];
      
      return {
        ...state,
        tourProgress: updatedProgress,
        preferences: {
          ...state.preferences,
          completedTours: [
            ...state.preferences.completedTours.filter(t => t !== action.tourName),
            action.tourName
          ]
        }
      };
    case 'RESET_TOUR':
      // Remove from completed tours and progress
      const resetProgress = { ...state.tourProgress };
      delete resetProgress[action.tourName];
      
      return {
        ...state,
        stepIndex: 0,
        tourProgress: resetProgress,
        preferences: {
          ...state.preferences,
          completedTours: state.preferences.completedTours.filter(t => t !== action.tourName)
        }
      };
    default:
      return state;
  }
};

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
  // Initialize with default state
  const initialState: OnboardingState = {
    run: false,
    stepIndex: 0,
    tourProgress: {},
    preferences: {
      autoStart: true,
      showOnLogin: true,
      completedTours: []
    }
  };
  
  const [state, dispatch] = useReducer(onboardingReducer, initialState);
  const isMounted = useRef(true);
  const { showSuccess, showError, showInfo } = useEnhancedFeedback();
  
  // Extract state values for easier access
  const { run, stepIndex, tourProgress, preferences } = state;

  // Load saved preferences and progress with error handling
  useEffect(() => {
    try {
      const savedPreferences = localStorage.getItem(ONBOARDING_STORAGE_KEYS.TOUR_PREFERENCES);
      if (savedPreferences) {
        dispatch({ 
          type: 'SET_PREFERENCES', 
          preferences: JSON.parse(savedPreferences) 
        });
      }
      
      const savedProgress = localStorage.getItem(ONBOARDING_STORAGE_KEYS.TOUR_PROGRESS);
      if (savedProgress) {
        const progressData = JSON.parse(savedProgress);
        dispatch({ 
          type: 'SET_TOUR_PROGRESS', 
          progress: progressData 
        });
        
        // Restore progress for current tour if it exists
        if (progressData[tourName]) {
          dispatch({ 
            type: 'SET_STEP', 
            index: progressData[tourName] 
          });
        }
      }
    } catch (error) {
      console.error('Error loading onboarding preferences:', error);
      showError('Failed to load your tutorial progress. Starting from the beginning.');
    }
    
    return () => {
      isMounted.current = false;
    };
  }, [tourName]); // Only run on mount and when tourName changes

  // Save tour progress with error handling
  const saveTourProgress = useCallback((index: number) => {
    try {
      const updatedProgress = {
        ...tourProgress,
        [tourName]: index
      };
      
      localStorage.setItem(
        ONBOARDING_STORAGE_KEYS.TOUR_PROGRESS, 
        JSON.stringify(updatedProgress)
      );
      
      dispatch({ 
        type: 'SET_TOUR_PROGRESS', 
        progress: updatedProgress 
      });
    } catch (error) {
      console.error('Error saving tour progress:', error);
      showError('Failed to save your progress through the tutorial.');
    }
  }, [tourName, tourProgress, showError]);

  // Mark tour as completed with error handling
  const markTourAsCompleted = useCallback(() => {
    try {
      dispatch({ type: 'COMPLETE_TOUR', tourName });
      
      // Save to local storage
      const updatedPreferences = {
        ...preferences,
        completedTours: [...preferences.completedTours.filter(t => t !== tourName), tourName]
      };
      
      localStorage.setItem(
        ONBOARDING_STORAGE_KEYS.TOUR_PREFERENCES, 
        JSON.stringify(updatedPreferences)
      );
      
      // Clear progress for completed tour
      const updatedProgress = { ...tourProgress };
      delete updatedProgress[tourName];
      
      localStorage.setItem(
        ONBOARDING_STORAGE_KEYS.TOUR_PROGRESS, 
        JSON.stringify(updatedProgress)
      );
    } catch (error) {
      console.error('Error marking tour as completed:', error);
      showError('Failed to save your completed tutorial status.');
    }
  }, [tourName, preferences, tourProgress, showError]);

  // Update preferences with error handling
  const updatePreferences = useCallback((newPreferences: Partial<OnboardingPreferences>) => {
    try {
      dispatch({ type: 'SET_PREFERENCES', preferences: newPreferences });
      
      const updatedPreferences = {
        ...preferences,
        ...newPreferences
      };
      
      localStorage.setItem(
        ONBOARDING_STORAGE_KEYS.TOUR_PREFERENCES, 
        JSON.stringify(updatedPreferences)
      );
    } catch (error) {
      console.error('Error updating tour preferences:', error);
      showError('Failed to save your tutorial preferences.');
    }
  }, [preferences, showError]);

  // Check if tour is completed
  const isTourCompleted = useCallback(() => {
    return preferences.completedTours.includes(tourName);
  }, [preferences.completedTours, tourName]);

  // Reset tour progress with error handling
  const resetTour = useCallback(() => {
    try {
      dispatch({ type: 'RESET_TOUR', tourName });
      
      // Save to local storage
      localStorage.setItem(
        ONBOARDING_STORAGE_KEYS.TOUR_PREFERENCES, 
        JSON.stringify({
          ...preferences,
          completedTours: preferences.completedTours.filter(t => t !== tourName)
        })
      );
      
      localStorage.setItem(
        ONBOARDING_STORAGE_KEYS.TOUR_PROGRESS, 
        JSON.stringify({
          ...tourProgress,
          [tourName]: undefined
        })
      );
      
      showSuccess('The tour has been reset. You can start it again.');
    } catch (error) {
      console.error('Error resetting tour:', error);
      showError('Failed to reset the tutorial.');
    }
  }, [tourName, preferences, tourProgress, showSuccess, showError]);

  // Handle Joyride events with enhanced error handling
  const handleJoyrideCallback = useCallback((data: any) => {
    if (!isMounted.current) return;
    
    try {
      const { action, index, status, type } = data;
      
      if (type === 'step:after' && action === 'next') {
        const nextIndex = index + 1;
        dispatch({ type: 'SET_STEP', index: nextIndex });
        saveTourProgress(nextIndex);
      } else if (type === 'tour:end' && status === 'finished') {
        markTourAsCompleted();
        dispatch({ type: 'STOP_TOUR' });
        dispatch({ type: 'SET_STEP', index: 0 });
        
        if (onComplete) {
          onComplete();
        }
        
        showSuccess('You\'ve completed this tour! You can access it again from the help menu if needed.');
      } else if (type === 'tour:end' && status === 'skipped') {
        dispatch({ type: 'STOP_TOUR' });
        
        if (onSkip) {
          onSkip();
        }
        
        showInfo('Tour skipped. You can restart it anytime from the help menu.');
      }
    } catch (error) {
      console.error('Error in tour callback:', error);
      showError('Something went wrong with the tutorial. Please try again.');
      dispatch({ type: 'STOP_TOUR' });
    }
  }, [onComplete, onSkip, saveTourProgress, markTourAsCompleted, showSuccess, showInfo, showError]);
  
  // Start the tour with error handling
  const startTour = useCallback(() => {
    if (!isMounted.current) return;
    
    try {
      // If there's saved progress, use it, otherwise start from beginning
      const savedStepIndex = tourProgress[tourName] || 0;
      
      dispatch({ 
        type: 'START_TOUR',
        initialStep: savedStepIndex
      });
      
      if (savedStepIndex > 0) {
        showInfo('Continuing from where you left off.');
      }
    } catch (error) {
      console.error('Error starting tour:', error);
      showError('Failed to start the tutorial. Please try again.');
    }
  }, [tourName, tourProgress, showInfo, showError]);
  
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
    setRun: (run: boolean) => dispatch({ type: run ? 'START_TOUR' : 'STOP_TOUR' }),
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
