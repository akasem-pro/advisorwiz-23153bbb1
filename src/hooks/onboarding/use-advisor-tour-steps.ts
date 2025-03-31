
import { useCallback } from 'react';
import { Step, Placement } from 'react-joyride';

/**
 * Custom hook that returns advisor-specific onboarding tour steps
 * focused on client management and advisor tools
 */
export const useAdvisorTourSteps = (): Step[] => {
  return useCallback(() => {
    const steps: Step[] = [
      {
        target: '.profile-completion',
        content: 'Complete your professional profile to attract more clients. A complete profile ranks higher in searches.',
        placement: 'bottom' as Placement,
      },
      {
        target: '.client-dashboard',
        content: 'View and manage your current clients from this dashboard.',
        placement: 'top' as Placement,
      },
      {
        target: '.lead-management',
        content: 'Track and manage potential client leads. Follow up with interested consumers who match your expertise.',
        placement: 'right' as Placement,
      },
      {
        target: '.appointment-calendar',
        content: 'Manage your calendar and client appointments in one place.',
        placement: 'left' as Placement,
      },
      {
        target: '.messaging-center',
        content: 'Securely communicate with your clients and prospects.',
        placement: 'top' as Placement,
      },
      {
        target: '.analytics-panel',
        content: 'Track your performance metrics, client acquisition, and engagement statistics.',
        placement: 'right' as Placement,
      },
      {
        target: '.resource-center',
        content: 'Access training materials, compliance resources, and marketing tools.',
        placement: 'bottom' as Placement,
      }
    ];
    
    return steps;
  }, [])();
};
