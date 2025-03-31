
import { useCallback } from 'react';
import { Step } from 'react-joyride';

/**
 * Custom hook that returns general onboarding tour steps
 * that are shown to all user types
 */
export const useGeneralTourSteps = (): Step[] => {
  return useCallback(() => {
    const steps: Step[] = [
      {
        target: 'body',
        content: 'Welcome to AdvisorWiz! Let us show you around the platform to help you get started.',
        placement: 'center' as const,
        disableBeacon: true,
      },
      {
        target: '.navigation-menu',
        content: 'Navigate through different sections of the platform using this menu.',
        placement: 'bottom' as const,
      },
      {
        target: '.user-menu',
        content: 'Access your profile, settings, and notifications from this menu.',
        placement: 'bottom-end' as const,
      },
      {
        target: '.search-bar',
        content: 'Search for advisors, content, or features you need.',
        placement: 'bottom' as const,
      },
      {
        target: '.home-page-content',
        content: 'Explore featured content and recommended actions based on your profile.',
        placement: 'bottom' as const,
      }
    ];
    
    return steps;
  }, [])();
};
