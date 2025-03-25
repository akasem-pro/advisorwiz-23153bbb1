
import React, { useState, useEffect } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { CheckCircle2, AlertTriangle, AlertCircle, XCircle, X } from 'lucide-react';

const feedbackVariants = cva(
  "flex items-center p-4 rounded-md shadow-sm border transition-all duration-300",
  {
    variants: {
      variant: {
        success: "bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-300",
        warning: "bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-300",
        error: "bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300",
        info: "bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-300",
        loading: "bg-purple-50 border-purple-200 text-purple-800 dark:bg-purple-900/20 dark:border-purple-800 dark:text-purple-300",
      },
      size: {
        default: "text-sm",
        sm: "text-xs",
        lg: "text-base",
      },
    },
    defaultVariants: {
      variant: "info",
      size: "default",
    },
  }
);

type IconType = typeof CheckCircle2 | typeof AlertTriangle | typeof AlertCircle | typeof XCircle;

export interface FeedbackMessageProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof feedbackVariants> {
  message: string;
  icon?: IconType;
  autoClose?: boolean;
  duration?: number;
  onClose?: () => void;
}

const FeedbackMessage = React.forwardRef<HTMLDivElement, FeedbackMessageProps>(
  ({ 
    className, 
    variant = "info", 
    size, 
    message, 
    icon,
    autoClose = false,
    duration = 5000,
    onClose,
    ...props 
  }, ref) => {
    const [visible, setVisible] = useState(true);
    
    useEffect(() => {
      if (autoClose) {
        const timer = setTimeout(() => {
          setVisible(false);
          if (onClose) onClose();
        }, duration);
        
        return () => clearTimeout(timer);
      }
    }, [autoClose, duration, onClose]);
    
    // Default icons based on variant
    const getIcon = () => {
      if (icon) {
        const Icon = icon;
        return <Icon className="h-5 w-5 mr-3 flex-shrink-0" />;
      }
      
      switch (variant) {
        case "success":
          return <CheckCircle2 className="h-5 w-5 mr-3 flex-shrink-0" />;
        case "warning":
          return <AlertTriangle className="h-5 w-5 mr-3 flex-shrink-0" />;
        case "error":
          return <XCircle className="h-5 w-5 mr-3 flex-shrink-0" />;
        case "info":
        case "loading":
        default:
          return <AlertCircle className="h-5 w-5 mr-3 flex-shrink-0" />;
      }
    };
    
    if (!visible) return null;
    
    return (
      <div
        className={cn(feedbackVariants({ variant, size, className }), "animate-fade-in")}
        ref={ref}
        role={variant === "error" ? "alert" : "status"}
        aria-live={variant === "error" ? "assertive" : "polite"}
        {...props}
      >
        {getIcon()}
        <div className="flex-1">{message}</div>
        {onClose && (
          <button 
            onClick={() => {
              setVisible(false);
              onClose();
            }}
            className="ml-3 opacity-70 hover:opacity-100 focus:outline-none"
            aria-label="Close feedback message"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    );
  }
);

FeedbackMessage.displayName = "FeedbackMessage";

export { FeedbackMessage };
