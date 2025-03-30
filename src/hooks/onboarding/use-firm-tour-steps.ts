
import { useCallback } from 'react';
import { Step, Placement } from 'react-joyride';

/**
 * Custom hook that returns firm-specific onboarding tour steps
 * focused on firm profile setup and advisor management
 */
export const useFirmTourSteps = (): Step[] => {
  return useCallback(() => {
    const steps: Step[] = [
      {
        target: 'body',
        content: 'Welcome to AdvisorWiz! This tour will guide you through setting up your firm profile and managing your team of advisors.',
        placement: 'center' as const,
        disableBeacon: true,
      },
      {
        target: '.FirmProfileHeader',
        content: 'This is your firm profile dashboard. Completing your firm profile helps establish credibility and attract potential clients.',
        placement: 'bottom' as Placement,
      },
      {
        target: '[id="firm-basic-info"]',
        content: 'Start by filling out your firm\'s basic information, including name, website, and contact details.',
        placement: 'bottom' as Placement,
      },
      {
        target: '[id="firm-description"]',
        content: 'Add a compelling description of your firm. A clear value proposition helps potential clients understand what makes your firm unique.',
        placement: 'right' as Placement,
      },
      {
        target: '[id="firm-credentials"]',
        content: 'Add your firm\'s credentials and regulatory information. This builds trust with potential clients and ensures compliance.',
        placement: 'right' as Placement,
      },
      {
        target: '[id="firm-assets"]',
        content: 'Enter your firm\'s assets under management and other key metrics that demonstrate your firm\'s capabilities.',
        placement: 'left' as Placement,
      },
      {
        target: '[id="team-management"]',
        content: 'This section allows you to manage your team of advisors. You can invite new advisors and manage existing ones.',
        placement: 'right' as Placement,
      },
      {
        target: '.invite-advisor-button',
        content: 'Click here to invite advisors to join your firm. Each advisor will have their own profile to manage.',
        placement: 'left' as Placement,
      },
      {
        target: '.advisor-list',
        content: 'This is where all your advisors are listed. You can view their profiles and monitor their performance.',
        placement: 'top' as Placement,
      },
      {
        target: '[id="firm-subscription"]',
        content: 'Choose a subscription plan that fits your firm\'s size and needs. Enterprise plans offer advanced features for larger teams.',
        placement: 'right' as Placement,
      },
      {
        target: '.analytics-dashboard',
        content: 'The analytics dashboard provides insights on client acquisition, advisor performance, and other key metrics for your firm.',
        placement: 'bottom' as Placement,
      },
      {
        target: '.user-menu',
        content: 'Access firm-wide settings, notifications, and account management from this menu.',
        placement: 'bottom-end' as Placement,
      }
    ];
    
    return steps;
  }, [])();
};
