
import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface UnifiedCardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  shadow?: 'none' | 'sm' | 'md' | 'lg';
  border?: boolean;
  hover?: boolean;
  interactive?: boolean;
  onClick?: () => void;
  variant?: 'default' | 'filled' | 'outline' | 'glass' | 'accent';
  animation?: 'none' | 'fade' | 'scale' | 'slide';
  role?: string;
  ariaLabel?: string;
  tabIndex?: number;
  elevation?: 'flat' | 'raised' | 'floating';
  withHoverEffect?: boolean;
}

const UnifiedCard = forwardRef<HTMLDivElement, UnifiedCardProps>(({
  children,
  className = '',
  padding = 'md',
  shadow = 'sm',
  border = true,
  hover = false,
  interactive = false,
  onClick,
  variant = 'default',
  animation = 'none',
  role,
  ariaLabel,
  tabIndex,
  elevation = 'flat',
  withHoverEffect = true
}, ref) => {
  const paddingStyles = {
    'none': '',
    'sm': 'p-3',
    'md': 'p-4 md:p-5',
    'lg': 'p-5 md:p-6'
  };
  
  const shadowStyles = {
    'none': '',
    'sm': 'shadow-sm',
    'md': 'shadow',
    'lg': 'shadow-md'
  };
  
  const variantStyles = {
    'default': 'bg-white dark:bg-navy-800',
    'filled': 'bg-slate-50 dark:bg-navy-900',
    'outline': 'bg-transparent',
    'glass': 'bg-white/80 dark:bg-navy-800/80 backdrop-blur-sm',
    'accent': 'bg-teal-50 dark:bg-teal-900/20'
  };
  
  const elevationStyles = {
    'flat': '',
    'raised': 'shadow-md',
    'floating': 'shadow-lg transform -translate-y-1'
  };
  
  const animationStyles = {
    'none': '',
    'fade': 'animate-fade-in',
    'scale': 'animate-scale-in',
    'slide': 'animate-slide-in-left'
  };
  
  const interactiveStyles = interactive 
    ? 'cursor-pointer transition-all duration-200'
    : '';
  
  const hoverStyles = hover || (interactive && withHoverEffect)
    ? 'hover:shadow-md transition-all duration-200 hover:-translate-y-1'
    : '';
    
  const borderStyles = border
    ? 'border border-slate-200 dark:border-navy-700'
    : '';
  
  // Handle keyboard interaction for accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (interactive && onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick();
    }
  };
  
  return (
    <div 
      ref={ref}
      className={cn(
        'rounded-lg',
        paddingStyles[padding],
        shadowStyles[shadow],
        variantStyles[variant],
        elevationStyles[elevation],
        borderStyles,
        interactiveStyles,
        hoverStyles,
        animationStyles[animation],
        className
      )}
      onClick={interactive ? onClick : undefined}
      onKeyDown={interactive ? handleKeyDown : undefined}
      role={interactive ? role || 'button' : role}
      aria-label={ariaLabel}
      tabIndex={interactive ? tabIndex || 0 : tabIndex}
      aria-disabled={!interactive}
    >
      {children}
    </div>
  );
});

UnifiedCard.displayName = "UnifiedCard";

export default UnifiedCard;
