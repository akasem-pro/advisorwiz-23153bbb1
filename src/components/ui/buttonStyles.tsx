
import { cn } from "@/lib/utils";

/**
 * Centralized button style configurations for consistent UI across the application
 */

export const buttonBaseStyles = {
  // Common styles for all buttons
  base: "font-medium rounded-md transition-all duration-200 flex items-center justify-center gap-2",
  
  // Size variants
  sizes: {
    sm: "px-3 py-1.5 text-sm h-8",
    md: "px-4 py-2 text-base h-10",
    lg: "px-6 py-2.5 text-lg h-12",
    xl: "px-8 py-3 text-xl h-14",
  },
  
  // Common width options
  width: {
    auto: "w-auto",
    full: "w-full",
    responsive: "w-full sm:w-auto",
  }
};

export const buttonVariants = {
  // Primary button (blue)
  primary: "bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow",
  
  // Secondary button (gray)
  secondary: "bg-gray-600 hover:bg-gray-700 text-white shadow-sm hover:shadow",
  
  // Accent button (yellow) - for CTAs
  accent: "bg-yellow-500 hover:bg-yellow-600 text-gray-900 shadow-sm hover:shadow",
  
  // Outline variants
  outline: {
    default: "border border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800",
    blue: "border border-blue-600 text-blue-700 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/20",
    yellow: "border border-yellow-500 text-yellow-700 hover:bg-yellow-50 dark:border-yellow-400 dark:text-yellow-400 dark:hover:bg-yellow-900/20",
    white: "border border-white text-white hover:bg-white/20 dark:border-gray-300 dark:text-gray-300"
  },
  
  // Ghost variants
  ghost: {
    default: "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800/50",
    blue: "text-blue-700 hover:bg-blue-100 dark:text-blue-400 dark:hover:bg-blue-900/20",
    yellow: "text-yellow-700 hover:bg-yellow-100 dark:text-yellow-400 dark:hover:bg-yellow-900/20"
  },
  
  // Link variants (underlined text)
  link: {
    default: "text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline-offset-4 hover:underline p-0 h-auto",
    yellow: "text-yellow-600 hover:text-yellow-800 dark:text-yellow-400 dark:hover:text-yellow-300 underline-offset-4 hover:underline p-0 h-auto"
  }
};

/**
 * Helper function to compose button classes
 */
export const getButtonClasses = ({
  variant = 'primary',
  size = 'md',
  width = 'auto',
  className = '',
  outline = 'default',
  ghost = 'default',
  link = 'default',
}: {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  width?: 'auto' | 'full' | 'responsive';
  className?: string;
  outline?: 'default' | 'blue' | 'yellow' | 'white';
  ghost?: 'default' | 'blue' | 'yellow';
  link?: 'default' | 'yellow';
}) => {
  let variantClass = '';
  
  if (variant === 'primary') {
    variantClass = buttonVariants.primary;
  } else if (variant === 'secondary') {
    variantClass = buttonVariants.secondary;
  } else if (variant === 'accent') {
    variantClass = buttonVariants.accent;
  } else if (variant === 'outline') {
    variantClass = buttonVariants.outline[outline];
  } else if (variant === 'ghost') {
    variantClass = buttonVariants.ghost[ghost];
  } else if (variant === 'link') {
    variantClass = buttonVariants.link[link];
  }
  
  return cn(
    buttonBaseStyles.base,
    buttonBaseStyles.sizes[size],
    buttonBaseStyles.width[width],
    variantClass,
    className
  );
};
