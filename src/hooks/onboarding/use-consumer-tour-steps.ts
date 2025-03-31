
import { useCallback } from 'react';
import { Step, Placement } from 'react-joyride';

/**
 * Custom hook that returns consumer-specific onboarding tour steps
 * focused on finding and connecting with advisors
 */
export const useConsumerTourSteps = (): Step[] => {
  return useCallback(() => {
    const steps: Step[] = [
      {
        target: '.profile-completion',
        content: 'Complete your financial profile to get better advisor matches.',
        placement: 'bottom' as Placement,
      },
      {
        target: '.match-section',
        content: 'Here you\'ll see advisors matched to your specific financial needs and goals.',
        placement: 'top' as Placement,
      },
      {
        target: '.filter-panel',
        content: 'Filter advisors based on expertise, location, and other criteria to find your perfect match.',
        placement: 'right' as Placement,
      },
      {
        target: '.appointment-scheduler',
        content: 'Schedule appointments with advisors you\'re interested in connecting with.',
        placement: 'left' as Placement,
      },
      {
        target: '.messaging-section',
        content: 'Securely communicate with your advisor before and after meetings.',
        placement: 'top' as Placement,
      },
      {
        target: '.financial-goals',
        content: 'Track your financial goals and progress with the help of your advisor.',
        placement: 'right' as Placement,
      },
      {
        target: '.notifications',
        content: 'Stay updated on advisor responses, appointment reminders, and important financial alerts.',
        placement: 'bottom' as Placement,
      }
    ];
    
    return steps;
  }, [])();
};
