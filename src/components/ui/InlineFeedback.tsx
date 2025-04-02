
import React, { useEffect, useState } from 'react';
import { AlertCircle, CheckCircle2, XCircle, AlertTriangle, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './button';

interface InlineFeedbackProps {
  title?: string;
  message: string;
  variant?: 'success' | 'error' | 'warning' | 'info';
  dismissable?: boolean;
  icon?: React.ReactNode;
  className?: string;
  onDismiss?: () => void;
  autoDisappear?: boolean;
  duration?: number;
}

const InlineFeedback: React.FC<InlineFeedbackProps> = ({
  title,
  message,
  variant = 'info',
  dismissable = true,
  icon,
  className,
  onDismiss,
  autoDisappear = false,
  duration = 5000
}) => {
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    if (autoDisappear) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onDismiss) onDismiss();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [autoDisappear, duration, onDismiss]);
  
  if (!isVisible) return null;
  
  const variantStyles = {
    success: "bg-green-50 border-green-200 text-green-800 dark:bg-green-900/30 dark:border-green-800/50 dark:text-green-200",
    error: "bg-red-50 border-red-200 text-red-800 dark:bg-red-900/30 dark:border-red-800/50 dark:text-red-200",
    warning: "bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-900/30 dark:border-amber-800/50 dark:text-amber-200",
    info: "bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/30 dark:border-blue-800/50 dark:text-blue-200"
  };
  
  const getIcon = () => {
    if (icon) return icon;
    
    switch (variant) {
      case 'success':
        return <CheckCircle2 className="h-5 w-5" />;
      case 'error':
        return <XCircle className="h-5 w-5" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5" />;
      case 'info':
      default:
        return <AlertCircle className="h-5 w-5" />;
    }
  };
  
  return (
    <div 
      className={cn(
        "border rounded-md p-4 animate-fade-in flex items-start",
        variantStyles[variant],
        className
      )}
      role={variant === 'error' ? 'alert' : 'status'}
      aria-live={variant === 'error' ? 'assertive' : 'polite'}
    >
      <div className="flex-shrink-0 mr-3">
        {getIcon()}
      </div>
      <div className="flex-grow">
        {title && (
          <h4 className="font-medium mb-1">{title}</h4>
        )}
        <p className="text-sm">{message}</p>
      </div>
      {dismissable && (
        <Button
          variant="ghost"
          size="sm"
          className="flex-shrink-0 h-8 w-8 p-0 rounded-full -mr-1 -mt-1"
          onClick={() => {
            setIsVisible(false);
            if (onDismiss) onDismiss();
          }}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Dismiss</span>
        </Button>
      )}
    </div>
  );
};

export { InlineFeedback };
