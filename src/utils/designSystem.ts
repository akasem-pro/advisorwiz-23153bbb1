
import { ClassValue } from 'clsx';
import { cn } from '@/lib/utils';

type SpacingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type BreakpointSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
type AnimationSpeed = 'fast' | 'normal' | 'slow';

// Consistent spacing values
export const getSpacing = (size: SpacingSize): string => {
  const spacingMap: Record<SpacingSize, string> = {
    'xs': 'space-y-1 md:space-y-2',
    'sm': 'space-y-2 md:space-y-3',
    'md': 'space-y-4 md:space-y-6',
    'lg': 'space-y-6 md:space-y-8',
    'xl': 'space-y-8 md:space-y-12',
    '2xl': 'space-y-12 md:space-y-16',
    '3xl': 'space-y-16 md:space-y-24',
  };
  
  return spacingMap[size];
};

// Padding values
export const getPadding = (size: SpacingSize): string => {
  const paddingMap: Record<SpacingSize, string> = {
    'xs': 'p-1 md:p-2',
    'sm': 'p-2 md:p-3',
    'md': 'p-4 md:p-6',
    'lg': 'p-6 md:p-8',
    'xl': 'p-8 md:p-12',
    '2xl': 'p-12 md:p-16',
    '3xl': 'p-16 md:p-24',
  };
  
  return paddingMap[size];
};

// Consistent component sizes
export const getComponentSize = (size: ComponentSize, component: 'button' | 'input' | 'card'): string => {
  if (component === 'button') {
    const buttonSizeMap: Record<ComponentSize, string> = {
      'xs': 'text-xs py-1 px-2',
      'sm': 'text-sm py-1.5 px-3',
      'md': 'text-base py-2 px-4',
      'lg': 'text-lg py-2.5 px-5',
      'xl': 'text-xl py-3 px-6',
    };
    return buttonSizeMap[size];
  }
  
  if (component === 'input') {
    const inputSizeMap: Record<ComponentSize, string> = {
      'xs': 'text-xs py-1 px-2',
      'sm': 'text-sm py-1.5 px-3',
      'md': 'text-base py-2 px-4',
      'lg': 'text-lg py-2.5 px-5',
      'xl': 'text-xl py-3 px-6',
    };
    return inputSizeMap[size];
  }
  
  if (component === 'card') {
    const cardSizeMap: Record<ComponentSize, string> = {
      'xs': 'p-2',
      'sm': 'p-3',
      'md': 'p-4 md:p-6',
      'lg': 'p-6 md:p-8',
      'xl': 'p-8 md:p-12',
    };
    return cardSizeMap[size];
  }
  
  return '';
};

// Animation duration utility
export const getAnimationDuration = (speed: AnimationSpeed): string => {
  const durationMap: Record<AnimationSpeed, string> = {
    'fast': 'duration-200',
    'normal': 'duration-300',
    'slow': 'duration-500',
  };
  
  return durationMap[speed];
};

// Responsive container classes
export const getContainer = (constrained: boolean = true, className?: ClassValue): string => {
  return cn(
    constrained ? 'container mx-auto px-4 sm:px-6 lg:px-8' : 'w-full px-4 sm:px-6 lg:px-8',
    className
  );
};

// Section spacing utility
export const getSectionSpacing = (size: SpacingSize = 'lg'): string => {
  const sectionSpacingMap: Record<SpacingSize, string> = {
    'xs': 'py-2 md:py-3',
    'sm': 'py-4 md:py-6',
    'md': 'py-8 md:py-12',
    'lg': 'py-12 md:py-16',
    'xl': 'py-16 md:py-24',
    '2xl': 'py-24 md:py-32',
    '3xl': 'py-32 md:py-40',
  };
  
  return sectionSpacingMap[size];
};

// Responsive typography utility
export const getResponsiveText = (type: 'heading' | 'subheading' | 'paragraph' | 'caption', level?: 1 | 2 | 3 | 4 | 5 | 6): string => {
  if (type === 'heading') {
    const headingMap: Record<number, string> = {
      1: 'text-3xl md:text-4xl lg:text-5xl font-serif font-bold leading-tight',
      2: 'text-2xl md:text-3xl lg:text-4xl font-serif font-bold leading-tight',
      3: 'text-xl md:text-2xl lg:text-3xl font-serif font-bold leading-tight',
      4: 'text-lg md:text-xl lg:text-2xl font-serif font-bold leading-tight',
      5: 'text-base md:text-lg lg:text-xl font-serif font-bold leading-tight',
      6: 'text-sm md:text-base lg:text-lg font-serif font-bold leading-tight',
    };
    return headingMap[level || 1];
  }
  
  if (type === 'subheading') {
    return 'text-lg md:text-xl text-slate-700 dark:text-slate-300 leading-relaxed';
  }
  
  if (type === 'paragraph') {
    return 'text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed';
  }
  
  if (type === 'caption') {
    return 'text-sm text-slate-500 dark:text-slate-500 leading-normal';
  }
  
  return '';
};

// Export a11y helpers
export const a11y = {
  srOnly: 'sr-only',
  focusVisible: 'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-navy-500 dark:focus:ring-teal-500',
  keyboardFocusable: 'focus:outline-none focus:ring-2 focus:ring-navy-500 dark:focus:ring-teal-500 focus:ring-offset-2',
  skipLink: 'sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:p-4 focus:bg-white focus:text-navy-900 focus:border focus:border-navy-600'
};

// Helper for consistent shadows
export const getShadow = (size: 'sm' | 'md' | 'lg' | 'xl' | 'none' = 'md'): string => {
  const shadowMap: Record<string, string> = {
    'none': 'shadow-none',
    'sm': 'shadow-sm',
    'md': 'shadow',
    'lg': 'shadow-lg',
    'xl': 'shadow-xl',
  };
  
  return shadowMap[size];
};
