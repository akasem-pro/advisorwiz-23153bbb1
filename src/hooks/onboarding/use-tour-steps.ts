
import { useCallback } from 'react';
import { Step } from 'react-joyride';
import { useLocation } from 'react-router-dom';
import { UserType } from '../../types/profileTypes';

/**
 * Custom hook to generate steps for the onboarding tour based on user type and current route
 */
export const useTourSteps = (userType?: UserType) => {
  const location = useLocation();
  
  // Define steps based on user type and current route
  const getSteps = useCallback((): Step[] => {
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
  }, [location.pathname, userType]);

  return getSteps;
};
