
import { useCallback } from 'react';
import { Step, Placement } from 'react-joyride';

/**
 * Custom hook that returns advisor-specific onboarding tour steps
 * focused on profile setup and client connection
 */
export const useAdvisorTourSteps = (): Step[] => {
  return useCallback(() => {
    const steps: Step[] = [
      {
        target: 'body',
        content: 'Welcome to AdvisorWiz! This tour will guide you through setting up your profile and connecting with potential clients.',
        placement: 'center' as const,
        disableBeacon: true,
      },
      {
        target: '.ProfileHeader',
        content: 'Your profile completion status is shown here. A complete profile increases your visibility to potential clients.',
        placement: 'bottom' as Placement,
      },
      {
        target: '[id="basic-info"]',
        content: 'Start by filling out your basic information. This is what clients will see first about you.',
        placement: 'bottom' as Placement,
      },
      {
        target: '[id="professional-credentials"]',
        content: 'Add your professional credentials to build trust with potential clients. This is crucial for establishing credibility.',
        placement: 'right' as Placement,
      },
      {
        target: '[id="expertise"]',
        content: 'Select your areas of expertise. This helps our matching algorithm connect you with relevant clients.',
        placement: 'right' as Placement,
      },
      {
        target: '[id="fee-client"]',
        content: 'Set your fee structure and client preferences. Being clear about costs helps set proper expectations.',
        placement: 'left' as Placement,
      },
      {
        target: '[id="marketing"]',
        content: 'Upload a professional photo and write a compelling bio. Profiles with photos receive 30% more client inquiries.',
        placement: 'left' as Placement,
      },
      {
        target: '[id="verification"]',
        content: 'Complete the verification process to earn a verified badge, which significantly increases client trust.',
        placement: 'right' as Placement,
      },
      {
        target: '[id="subscription"]',
        content: 'Choose a subscription plan that fits your practice. Higher tier plans offer more visibility to potential clients.',
        placement: 'right' as Placement,
      },
      {
        target: '.navigation-menu',
        content: 'Once your profile is complete, use the "Matches" section to connect with potential clients who match your expertise.',
        placement: 'bottom' as Placement,
      },
      {
        target: '.user-menu',
        content: 'Access your settings, messages, and notifications from this menu. Be sure to check for new client inquiries regularly.',
        placement: 'bottom-end' as Placement,
      }
    ];
    
    return steps;
  }, [])();
};
