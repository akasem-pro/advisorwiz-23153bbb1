
import { type ToastActionElement } from '@/components/ui/toast';
import { ErrorSeverity, ErrorCategory } from '../../utils/errorHandling/errorHandler';

export type FeedbackVariant = 'success' | 'error' | 'warning' | 'info' | 'loading';

export interface FeedbackItem {
  id: string;
  title?: string;
  description: string;
  variant: FeedbackVariant;
  timestamp: number;
  dismissable?: boolean;
  autoExpire?: boolean;
  expiryMs?: number;
  source?: string;
  errorDetails?: any;
  icon?: React.ReactNode;
}

export interface EnhancedFeedbackOptions {
  title?: string;
  description?: string;
  variant?: FeedbackVariant;
  duration?: number;
  dismissable?: boolean;
  autoExpire?: boolean;
  icon?: React.ReactNode;
  errorDetails?: any;
  errorCategory?: ErrorCategory;
  errorSeverity?: ErrorSeverity;
  source?: string;
  persist?: boolean;
  groupSimilar?: boolean;
  action?: ToastActionElement;
  position?: 'top' | 'bottom' | 'inline';
}

// Re-export error types for convenience
export { ErrorSeverity, ErrorCategory };
