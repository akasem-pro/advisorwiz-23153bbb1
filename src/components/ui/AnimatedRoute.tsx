
import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface AnimatedRouteProps {
  children: ReactNode;
  animation?: 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'scale';
  className?: string;
}

export const AnimatedRoute: React.FC<AnimatedRouteProps> = ({ 
  children, 
  animation = 'fade',
  className = ''
}) => {
  const animations = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    'slide-up': {
      initial: { y: 20, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      exit: { y: -20, opacity: 0 },
    },
    'slide-down': {
      initial: { y: -20, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      exit: { y: 20, opacity: 0 },
    },
    'slide-left': {
      initial: { x: -20, opacity: 0 },
      animate: { x: 0, opacity: 1 },
      exit: { x: 20, opacity: 0 },
    },
    'slide-right': {
      initial: { x: 20, opacity: 0 },
      animate: { x: 0, opacity: 1 },
      exit: { x: -20, opacity: 0 },
    },
    'scale': {
      initial: { scale: 0.95, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      exit: { scale: 0.95, opacity: 0 },
    },
  };

  return (
    <motion.div
      initial={animations[animation].initial}
      animate={animations[animation].animate}
      exit={animations[animation].exit}
      transition={{ duration: 0.3 }}
      className={cn("w-full", className)}
    >
      {children}
    </motion.div>
  );
};

// Add cn utility if not imported
const cn = (...classes: any[]) => {
  return classes.filter(Boolean).join(' ');
};

export default AnimatedRoute;
