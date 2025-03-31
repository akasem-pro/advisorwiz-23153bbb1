
import React from 'react';
import { useConsumerTour } from '../../hooks/onboarding/useConsumerTour';

const ConsumerOnboardingTour: React.FC = () => {
  const { isTourActive, tourStep, startTour, endTour, nextStep } = useConsumerTour();

  // Don't render anything if tour is not active - improves performance
  if (!isTourActive) return null;

  // Tour steps content with improved accessibility
  const tourSteps = [
    {
      id: 'consumer-profile-intro',
      title: 'Welcome to Your Profile',
      content: 'Welcome to your profile! Here you can update your personal information.',
      target: '[data-tour="profile-section"]'
    },
    {
      id: 'consumer-investment-profile',
      title: 'Investment Preferences',
      content: 'Set your investment preferences to help us match you with suitable advisors.',
      target: '[data-tour="investment-section"]'
    },
    {
      id: 'consumer-communication-prefs',
      title: 'Communication Settings',
      content: 'Configure how advisors can communicate with you.',
      target: '[data-tour="communication-section"]'
    }
  ];

  // Only render current step for better performance
  const currentStep = tourSteps[tourStep];
  if (!currentStep) {
    endTour();
    return null;
  }

  return (
    <div 
      className="tour-overlay fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby={`tour-title-${currentStep.id}`}
    >
      <div 
        className="tour-step bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md shadow-xl"
        id={currentStep.id} 
        data-tour-step={tourStep + 1}
      >
        <h3 id={`tour-title-${currentStep.id}`} className="text-lg font-bold mb-2">
          {currentStep.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {currentStep.content}
        </p>
        <div className="flex justify-between">
          <button 
            onClick={endTour}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Skip Tour
          </button>
          <button 
            onClick={nextStep}
            className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
          >
            {tourStep < tourSteps.length - 1 ? 'Next' : 'Finish'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConsumerOnboardingTour;
