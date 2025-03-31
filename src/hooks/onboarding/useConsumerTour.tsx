
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Custom hook for managing consumer onboarding tour
 * with optimized performance and reduced rerenders
 */
export const useConsumerTour = () => {
  const [isTourActive, setIsTourActive] = useState(false);
  const [tourStep, setTourStep] = useState(0);
  const [hasCompletedTour, setHasCompletedTour] = useState(false);
  const location = useLocation();

  // Load tour state from localStorage with lazy initialization
  useEffect(() => {
    const storedTourState = localStorage.getItem('consumerTourCompleted');
    if (storedTourState === 'true') {
      setHasCompletedTour(true);
    }
  }, []);

  // Auto-start tour based on path and completion status
  useEffect(() => {
    // Only show tour on consumer profile pages if not completed
    const isProfilePage = location.pathname.includes('/profile') || 
                          location.pathname.includes('/consumer');
                          
    if (isProfilePage && !hasCompletedTour) {
      // Delay tour start for better user experience
      const timer = setTimeout(() => {
        setIsTourActive(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [location.pathname, hasCompletedTour]);

  const startTour = () => {
    setIsTourActive(true);
    setTourStep(0);
  };

  const endTour = () => {
    setIsTourActive(false);
    setHasCompletedTour(true);
    localStorage.setItem('consumerTourCompleted', 'true');
  };

  const nextStep = () => {
    setTourStep(prev => prev + 1);
  };

  const prevStep = () => {
    setTourStep(prev => Math.max(0, prev - 1));
  };

  return {
    isTourActive,
    tourStep,
    hasCompletedTour,
    startTour,
    endTour,
    nextStep,
    prevStep
  };
};
