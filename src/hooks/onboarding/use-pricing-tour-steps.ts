
import { useCallback } from 'react';
import { Step, Placement } from 'react-joyride';
import { PricingUserType } from './types';

/**
 * Custom hook that returns pricing page tour steps specific to each user type
 */
export const usePricingTourSteps = (userType: PricingUserType = 'consumer'): Step[] => {
  return useCallback(() => {
    // Common steps that apply to all user types
    const commonSteps: Step[] = [
      {
        target: 'body',
        content: 'Welcome to our pricing page! Let us guide you through our different plans and features.',
        placement: 'center' as const,
        disableBeacon: true,
      },
      {
        target: '.TabsList',
        content: 'You can switch between different user types to see the plans that are relevant to you.',
        placement: 'bottom' as Placement,
      }
    ];

    // Consumer-specific steps
    if (userType === 'consumer') {
      return [
        ...commonSteps,
        {
          target: '.consumer-plan',
          content: 'Our consumer plan is completely free! You can find your perfect financial advisor without any cost.',
          placement: 'bottom' as Placement,
        },
        {
          target: '.consumer-plan .flex.items-start:first-child',
          content: 'We match you with qualified advisors based on your specific financial needs and goals.',
          placement: 'left' as Placement,
        },
        {
          target: '.consumer-plan button',
          content: 'Get started for free and begin your journey to financial wellness today!',
          placement: 'top' as Placement,
        }
      ];
    }

    // Advisor-specific steps
    if (userType === 'advisor') {
      return [
        ...commonSteps,
        {
          target: '.grid.md\\:grid-cols-3',
          content: 'Choose from our range of advisor plans designed to help you grow your business.',
          placement: 'top' as Placement,
        },
        {
          target: '[data-tier="Basic"]',
          content: 'Our Basic plan provides essential tools for independent advisors at an affordable price point.',
          placement: 'left' as Placement,
        },
        {
          target: '[data-tier="Professional"]',
          content: 'Our most popular Professional plan offers enhanced visibility and client insights to grow your practice.',
          placement: 'bottom' as Placement,
        },
        {
          target: '[data-tier="Premium"]',
          content: 'The Premium plan provides comprehensive tools for serious advisors looking to maximize their client acquisition.',
          placement: 'right' as Placement,
        },
        {
          target: '.pricing-toggle-active',
          content: 'Save money by choosing annual billing instead of monthly.',
          placement: 'top' as Placement,
        }
      ];
    }

    // Enterprise-specific steps
    if (userType === 'enterprise') {
      return [
        ...commonSteps,
        {
          target: '.grid.md\\:grid-cols-3',
          content: 'Our enterprise solutions are designed for advisory firms of all sizes.',
          placement: 'top' as Placement,
        },
        {
          target: '[data-tier="Small Firm"]',
          content: 'The Small Firm plan is perfect for growing advisory firms with up to 5 advisors.',
          placement: 'left' as Placement,
        },
        {
          target: '[data-tier="Growth"]',
          content: 'Our recommended Growth plan supports established firms looking to scale with up to 15 advisors.',
          placement: 'bottom' as Placement,
        },
        {
          target: '[data-tier="Enterprise"]',
          content: 'The Enterprise plan provides unlimited advisor accounts and advanced tools for large organizations.',
          placement: 'right' as Placement,
        },
        {
          target: '.pricing-trust-signals',
          content: 'Thousands of financial professionals trust our platform for their business needs.',
          placement: 'top' as Placement,
        }
      ];
    }

    // Default to consumer steps if something goes wrong
    return commonSteps;
  }, [userType])();
};
