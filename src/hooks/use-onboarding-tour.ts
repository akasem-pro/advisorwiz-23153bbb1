
import { useState, useEffect } from 'react';
import { CallBackProps, STATUS, Step } from 'react-joyride';
import { useLocation } from 'react-router-dom';
import { useToast } from './use-toast';
import { UserType } from '../types/profileTypes';

export const useOnboardingTour = (
  userType?: UserType,
  onComplete?: () => void,
  onSkip?: () => void
) => {
  const [run, setRun] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [steps, setSteps] = useState<Step[]>([]);
  const location = useLocation();
  const { toast } = useToast();
  
  // Helper function to scroll to element
  const scrollToElement = (selector: string) => {
    try {
      const element = document.querySelector(selector);
      if (element && selector !== 'body') {
        // Scroll the element into view with smooth behavior
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    } catch (err) {
      console.error('Error scrolling to element:', err);
    }
  };

  // Define steps based on user type and current route
  const getSteps = (): Step[] => {
    const pathname = location.pathname;
    
    // Common steps that appear on most pages
    const commonSteps: Step[] = [
      {
        target: 'body',
        content: 'Welcome to AdvisorWiz! Let us show you around the platform.',
        placement: 'center',
        disableBeacon: true,
      },
      {
        target: '.navigation-menu',
        content: 'Navigate through different sections of the platform here.',
        placement: 'bottom',
      },
      {
        target: '.user-menu',
        content: 'Access your profile and account settings from here.',
        placement: 'bottom-end',
      },
    ];

    // Home page specific steps
    if (pathname === '/' || pathname === '') {
      return [
        ...commonSteps,
        {
          target: '#hero-section',
          content: 'Learn about our platform and how we can help connect you with financial advisors.',
          placement: 'bottom',
        },
        {
          target: '#benefits-section',
          content: 'Discover the benefits of using AdvisorWiz for your financial planning needs.',
          placement: 'bottom',
        },
        {
          target: '#how-it-works-section',
          content: 'See how easy it is to get started with AdvisorWiz.',
          placement: 'top',
        },
      ];
    }

    // User type specific steps for dashboard
    if (pathname.includes('dashboard')) {
      if (userType === 'consumer') {
        return [
          ...commonSteps,
          {
            target: '.match-section',
            content: 'Find financial advisors that match your needs and preferences.',
            placement: 'bottom',
          },
          {
            target: '.appointment-section',
            content: 'Schedule appointments with advisors you connect with.',
            placement: 'bottom',
          },
        ];
      } else if (userType === 'advisor') {
        return [
          ...commonSteps,
          {
            target: '.profile-section',
            content: 'Complete your profile to attract clients that match your expertise.',
            placement: 'bottom',
          },
          {
            target: '.calendar-section',
            content: 'Set your availability and manage appointments with clients.',
            placement: 'bottom',
          },
        ];
      } else if (userType === 'firm_admin') {
        return [
          ...commonSteps,
          {
            target: '.advisors-section',
            content: "Manage your firm's advisors and their profiles.",
            placement: 'bottom',
          },
          {
            target: '.analytics-section',
            content: "View analytics about your firm's performance and client engagement.",
            placement: 'bottom',
          },
        ];
      }
    }

    // Contact page specific steps
    if (pathname.includes('contact')) {
      return [
        ...commonSteps,
        {
          target: '.bg-teal-50',
          content: 'Here you can find our contact information.',
          placement: 'bottom',
        },
        {
          target: 'form',
          content: 'Fill out this form to send us a message directly.',
          placement: 'top',
        },
      ];
    }

    // Matching interface specific steps
    if (pathname.includes('match')) {
      return [
        ...commonSteps,
        {
          target: '.match-filter-section',
          content: 'Filter advisors based on your specific requirements.',
          placement: 'bottom',
        },
        {
          target: '.match-results-section',
          content: 'Browse through advisors that match your criteria.',
          placement: 'top',
        },
      ];
    }

    return commonSteps;
  };

  useEffect(() => {
    // Get and set steps based on current location
    const currentSteps = getSteps();
    setSteps(currentSteps);
    
    // Reset step index but don't stop tour when route changes
    if (run) {
      setStepIndex(0);
    }
  }, [location.pathname, userType]);

  useEffect(() => {
    // Show onboarding tour for new users
    const hasSeenTour = localStorage.getItem('hasSeenOnboardingTour');
    
    if (!hasSeenTour) {
      // Delay to ensure the UI is fully loaded
      const timer = setTimeout(() => {
        setRun(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { action, index, status, type } = data;
    
    // Log tour events for debugging
    console.log('Tour event:', { action, index, status, type });
    
    if (type === 'step:after' && action === 'next') {
      // Update step index when user clicks next
      setStepIndex(index + 1);
    }
    
    // Handle click on "back" button
    if (type === 'step:after' && action === 'prev') {
      setStepIndex(index - 1);
    }
    
    // Scroll to the current step's target when it becomes active
    if (type === 'step:before') {
      const currentStep = steps[index];
      const currentTarget = currentStep?.target;
      if (typeof currentTarget === 'string' && currentTarget !== 'body') {
        setTimeout(() => scrollToElement(currentTarget), 300);
      }
    }
    
    // Fix: Use string literals instead of enum values for comparison to fix type error
    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      setRun(false);
      
      // Mark the tour as completed
      localStorage.setItem('hasSeenOnboardingTour', 'true');
      
      // Show completion toast
      if (status === STATUS.FINISHED) {
        toast({
          title: "Tour Complete!",
          description: "You're all set to start using AdvisorWiz. Enjoy the platform!",
          duration: 5000,
        });
        
        if (onComplete) onComplete();
      } else if (status === STATUS.SKIPPED) {
        toast({
          title: "Tour Skipped",
          description: "You can always access the tour later from the help menu.",
          duration: 3000,
        });
        
        if (onSkip) onSkip();
      }
    }
  };

  return {
    run,
    stepIndex,
    steps,
    handleJoyrideCallback,
    setRun, // Export setRun to allow manual control of the tour
  };
};
