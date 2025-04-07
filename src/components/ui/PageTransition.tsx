
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface PageTransitionProps {
  children: React.ReactNode;
  animation?: 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'scale' | 'none';
  duration?: number;
  className?: string;
}

/**
 * Animated page transition component for smoother navigation experiences
 */
const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  animation = 'fade',
  duration = 0.3,
  className,
}) => {
  const location = useLocation();
  
  // Don't animate if animation is set to none
  if (animation === 'none') {
    return <div className={className}>{children}</div>;
  }
  
  // Configure animation variants based on the specified animation type
  const variants = {
    initial: getInitialState(animation),
    animate: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
    },
    exit: getExitState(animation),
  };
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variants}
        transition={{ duration, ease: 'easeInOut' }}
        className={cn("w-full", className)}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

// Helper functions to determine animation states
function getInitialState(animation: string) {
  switch (animation) {
    case 'fade':
      return { opacity: 0 };
    case 'slide-up':
      return { opacity: 0, y: 20 };
    case 'slide-down':
      return { opacity: 0, y: -20 };
    case 'slide-left':
      return { opacity: 0, x: 20 };
    case 'slide-right':
      return { opacity: 0, x: -20 };
    case 'scale':
      return { opacity: 0, scale: 0.95 };
    default:
      return { opacity: 0 };
  }
}

function getExitState(animation: string) {
  switch (animation) {
    case 'fade':
      return { opacity: 0 };
    case 'slide-up':
      return { opacity: 0, y: -20 };
    case 'slide-down':
      return { opacity: 0, y: 20 };
    case 'slide-left':
      return { opacity: 0, x: -20 };
    case 'slide-right':
      return { opacity: 0, x: 20 };
    case 'scale':
      return { opacity: 0, scale: 0.95 };
    default:
      return { opacity: 0 };
  }
}

export default PageTransition;
