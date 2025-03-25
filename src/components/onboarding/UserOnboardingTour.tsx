
import React, { useState, useEffect } from 'react';
import Joyride, { CallBackProps, STATUS, Step } from 'react-joyride';
import { useUser } from '../../context/UserContext';

interface UserOnboardingTourProps {
  userType?: 'consumer' | 'advisor' | 'firm_admin';
}

const UserOnboardingTour: React.FC<UserOnboardingTourProps> = ({ userType }) => {
  const [run, setRun] = useState(false);
  const { isAuthenticated } = useUser();
  
  // Define steps based on user type
  const getSteps = (): Step[] => {
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

    // Add user type specific steps
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

    return commonSteps;
  };

  useEffect(() => {
    // Show onboarding tour for new users
    const hasSeenTour = localStorage.getItem('hasSeenOnboardingTour');
    
    if (isAuthenticated && !hasSeenTour) {
      // Delay to ensure the UI is fully loaded
      const timer = setTimeout(() => {
        setRun(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated]);

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;
    
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      // Mark the tour as completed
      localStorage.setItem('hasSeenOnboardingTour', 'true');
      setRun(false);
    }
  };

  return (
    <Joyride
      callback={handleJoyrideCallback}
      continuous
      hideCloseButton
      run={run}
      scrollToFirstStep
      showProgress
      showSkipButton
      steps={getSteps()}
      styles={{
        options: {
          zIndex: 10000,
          primaryColor: '#0091EA',
        },
        tooltipContainer: {
          textAlign: 'left',
        },
        buttonBack: {
          marginRight: 10,
        },
      }}
    />
  );
};

export default UserOnboardingTour;
