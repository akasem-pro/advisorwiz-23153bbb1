
import React, { ReactNode, useEffect, useState } from 'react';
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
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    
    return () => clearTimeout(timeoutId);
  }, [delay]);
  
  const getAnimationClass = () => {
    if (animation === 'none') return '';
    
    if (!isVisible) {
      return 'opacity-0 ' + getInitialPosition();
    }
    
    return 'opacity-100 transform-none transition-all duration-300 ease-out';
  };
  
  const getInitialPosition = () => {
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
  };
  
  return (
    <div className={cn(getAnimationClass(), className)}>
      {children}
    </div>
  );
};

export default AnimatedRoute;
