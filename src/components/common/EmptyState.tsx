
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Button } from '../ui/button';

interface EmptyStateProps {
  /**
   * Icon to display
   */
  icon?: LucideIcon;
  
  /**
   * Main title text
   */
  title: string;
  
  /**
   * Optional description text
   */
  description?: string;
  
  /**
   * Action button label
   */
  actionLabel?: string;
  
  /**
   * Action button click handler
   */
  onAction?: () => void;
  
  /**
   * Secondary action button label
   */
  secondaryActionLabel?: string;
  
  /**
   * Secondary action button click handler
   */
  onSecondaryAction?: () => void;
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Visual size variant
   */
  size?: 'default' | 'sm' | 'lg';
  
  /**
   * Whether to show a loading state
   */
  isLoading?: boolean;
  
  /**
   * Error message to display
   */
  errorMessage?: string;
}

/**
 * A reusable empty state component for lists, search results, etc.
 */
const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  secondaryActionLabel,
  onSecondaryAction,
  className = '',
  size = 'default',
  isLoading = false,
  errorMessage
}) => {
  // Size classes
  const sizeClasses = {
    sm: 'py-4 px-6',
    default: 'py-8 px-6',
    lg: 'py-12 px-8'
  };
  
  // Icon size by variant
  const iconSize = {
    sm: 24,
    default: 36,
    lg: 48
  };
  
  return (
    <div className={`flex flex-col items-center justify-center text-center ${sizeClasses[size]} ${className}`}>
      {Icon && (
        <div className="rounded-full bg-muted p-3 mb-4">
          <Icon size={iconSize[size]} className="text-muted-foreground" />
        </div>
      )}
      
      <h3 className={`font-medium ${size === 'lg' ? 'text-xl' : size === 'sm' ? 'text-sm' : 'text-base'}`}>
        {isLoading ? 'Loading...' : errorMessage || title}
      </h3>
      
      {description && !isLoading && !errorMessage && (
        <p className={`text-muted-foreground mt-1 ${size === 'sm' ? 'text-xs' : 'text-sm'}`}>
          {description}
        </p>
      )}
      
      {!isLoading && errorMessage && (
        <p className="text-destructive text-sm mt-1">
          {errorMessage}
        </p>
      )}
      
      {actionLabel && onAction && !isLoading && (
        <Button
          variant="default"
          size={size === 'sm' ? 'sm' : 'default'}
          onClick={onAction}
          className="mt-4"
        >
          {actionLabel}
        </Button>
      )}
      
      {secondaryActionLabel && onSecondaryAction && !isLoading && (
        <Button
          variant="outline"
          size={size === 'sm' ? 'sm' : 'default'}
          onClick={onSecondaryAction}
          className="mt-2"
        >
          {secondaryActionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
