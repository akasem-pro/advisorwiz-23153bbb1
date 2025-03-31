import React, { ReactNode, useEffect, useState, useTransition, memo } from 'react';
import { cn } from '@/lib/utils';

type AnimationType = 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'scale' | 'none';

interface AnimatedRouteProps {
  children: ReactNode;
  animation?: AnimationType;
  className?: string;
  delay?: number;
}

const AnimatedRoute: React.FC<AnimatedRouteProps> = ({
  children,
  animation = 'fade',
  className = '',
  delay = 0
}) => {
  // Start with content visible by default
  const [isVisible, setIsVisible] = useState(true);
  const [isPending, startTransition] = useTransition();
  
  useEffect(() => {
    // For no animation, we keep content visible
    if (animation === 'none') {
      return;
    }
    
    // Otherwise handle animation transition
    let isMounted = true;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    
    // Start invisible for a brief moment then animate in
    setIsVisible(false);
    
    timeoutId = setTimeout(() => {
      if (isMounted) {
        startTransition(() => {
          setIsVisible(true);
        });
      }
    }, delay);
    
    // Proper cleanup function
    return () => {
      isMounted = false;
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [delay, animation]);
  
  // Don't apply animations if animation is set to none
  if (animation === 'none') {
    return <div className={className}>{children}</div>;
  }
  
  // Use a stable animation class to minimize style recalculation
  const animationClass = isVisible
    ? 'opacity-100 transform-none transition-all duration-300 ease-out'
    : cn('opacity-0', getInitialPosition(animation));
  
  return (
    <div className={cn(animationClass, className)}>
      {children}
    </div>
  );
};

// Extract position calculation for better performance
function getInitialPosition(animation: AnimationType): string {
  switch (animation) {
    case 'slide-up':
      return 'translate-y-4';
    case 'slide-down':
      return '-translate-y-4';
    case 'slide-left':
      return 'translate-x-4';
    case 'slide-right':
      return '-translate-x-4';
    case 'scale':
      return 'scale-95';
    default:
      return '';
  }
}

// Memoize the component to prevent unnecessary re-renders
export default memo(AnimatedRoute);
