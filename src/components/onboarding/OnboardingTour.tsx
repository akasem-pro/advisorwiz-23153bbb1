
import React, { useState, useEffect } from 'react';
import Joyride, { CallBackProps, STATUS, Step } from 'react-joyride';
import { useLocation } from 'react-router-dom';
import { useToast } from '../../hooks/use-toast';
import { UserType } from '../../types/profileTypes';

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
  const [run, setRun] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const location = useLocation();
  const { toast } = useToast();
  
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
    // Reset tour when route changes
    setStepIndex(0);
    
    // Show onboarding tour for new users on supported pages
    const hasSeenTour = localStorage.getItem('hasSeenOnboardingTour');
    const isAppropriateRoute = location.pathname === '/' || 
                               location.pathname === '' || 
                               location.pathname.includes('dashboard') || 
                               location.pathname.includes('match');
    
    if (!hasSeenTour && isAppropriateRoute) {
      // Delay to ensure the UI is fully loaded
      const timer = setTimeout(() => {
        setRun(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

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

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, index, type, step } = data;
    
    // Update step index for tracking
    if (type === 'step:after') {
      setStepIndex(index + 1);
      
      // Get the next step and scroll to it
      const steps = getSteps();
      if (index + 1 < steps.length) {
        const nextTarget = steps[index + 1].target;
        if (typeof nextTarget === 'string') {
          // Add a short delay to ensure UI updates before scrolling
          setTimeout(() => scrollToElement(nextTarget), 300);
        }
      }
    }
    
    // Scroll to the current step's target when it becomes active
    if (type === 'step:before') {
      const currentTarget = step.target;
      if (typeof currentTarget === 'string') {
        setTimeout(() => scrollToElement(currentTarget), 300);
      }
    }
    
    // Tour is finished or skipped
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

  // Only render if there are steps
  const steps = getSteps();
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
      styles={{
        options: {
          zIndex: 10000,
          primaryColor: '#0091EA',
          backgroundColor: '#ffffff',
          arrowColor: '#ffffff',
          overlayColor: 'rgba(0, 0, 0, 0.5)',
        },
        tooltip: {
          backgroundColor: '#ffffff',
          borderRadius: '0.5rem',
          padding: '1rem',
          fontSize: '0.9rem',
          color: '#333',
        },
        tooltipContainer: {
          textAlign: 'left',
        },
        buttonNext: {
          backgroundColor: '#0091EA',
          color: '#ffffff',
          fontSize: '0.9rem',
        },
        buttonBack: {
          marginRight: 10,
          color: '#666',
        },
        buttonSkip: {
          color: '#666',
        },
      }}
    />
  );
};

export default OnboardingTour;
