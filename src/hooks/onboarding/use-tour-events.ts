
import { useCallback } from 'react';
import { CallBackProps, Step, STATUS } from 'react-joyride';
import { useToast } from '../use-toast';
import { useTourScroll } from './use-tour-scroll';

interface TourEventProps {
  steps: Step[];  // Changed from CallBackProps['steps'] to Step[]
  setStepIndex: React.Dispatch<React.SetStateAction<number>>;  // Changed to React.Dispatch type
  setRun: React.Dispatch<React.SetStateAction<boolean>>;  // Changed to React.Dispatch type
  onComplete?: () => void;
  onSkip?: () => void;
}

/**
 * Custom hook for handling tour events like navigation, completion, and skip
 */
export const useTourEvents = ({
  steps,
  setStepIndex,
  setRun,
  onComplete,
  onSkip
}: TourEventProps) => {
  const { toast } = useToast();
  const scrollToElement = useTourScroll();

  const handleJoyrideCallback = useCallback((data: CallBackProps) => {
    const { action, index, status, type } = data;
    
    // Log tour events for debugging
    console.log('Tour event:', { action, index, status, type });
    
    // Handle step changes
    if (type === 'step:after') {
      if (action === 'next') {
        // Update step index when user clicks next
        setStepIndex(prevIndex => prevIndex + 1);
        
        // Pre-scroll to the next target if it exists
        if (index + 1 < steps.length) {
          const nextTarget = steps[index + 1]?.target;
          if (typeof nextTarget === 'string' && nextTarget !== 'body') {
            setTimeout(() => scrollToElement(nextTarget), 300);
          }
        }
      } else if (action === 'prev') {
        // Handle click on "back" button
        setStepIndex(prevIndex => Math.max(0, prevIndex - 1));
        
        // Pre-scroll to the previous target
        if (index - 1 >= 0) {
          const prevTarget = steps[index - 1]?.target;
          if (typeof prevTarget === 'string' && prevTarget !== 'body') {
            setTimeout(() => scrollToElement(prevTarget), 300);
          }
        }
      }
    }
    
    // Ensure proper scrolling when a new step becomes active
    if (type === 'step:before') {
      const currentStep = steps[index];
      const currentTarget = currentStep?.target;
      if (typeof currentTarget === 'string' && currentTarget !== 'body') {
        // Add a small delay to ensure DOM is ready
        setTimeout(() => scrollToElement(currentTarget), 300);
      }
    }
    
    // Handle tour completion
    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      setRun(false);
      
      // Mark the tour as completed
      localStorage.setItem('hasSeenOnboardingTour', 'true');
      
      // Show completion toast
      if (status === STATUS.FINISHED) {
        toast("Tour Complete!", {
          description: "You're all set to start using AdvisorWiz. Enjoy the platform!",
          duration: 5000,
        });
        
        if (onComplete) onComplete();
      } else if (status === STATUS.SKIPPED) {
        toast("Tour Skipped", {
          description: "You can always access the tour later from the help menu.",
          duration: 3000,
        });
        
        if (onSkip) onSkip();
      }
    }
  }, [steps, setStepIndex, setRun, scrollToElement, toast, onComplete, onSkip]);

  return handleJoyrideCallback;
};
