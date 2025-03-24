
import React from 'react';
import { Alert, AlertDescription } from '../../../components/ui/alert';
import { AlertCircle, WifiOff } from 'lucide-react';
import NetworkRetryButton from './NetworkRetryButton';

interface AuthErrorAlertProps {
  error: string;
  networkStatus: 'online' | 'offline' | 'checking';
  onRetry?: () => void;
  isRetrying?: boolean;
}

/**
 * A reusable alert component for displaying auth errors with network status awareness
 */
const AuthErrorAlert: React.FC<AuthErrorAlertProps> = ({ 
  error, 
  networkStatus, 
  onRetry,
  isRetrying = false
}) => {
  // Check if the error is related to network connectivity
  const isNetworkError = error && (
    error.toLowerCase().includes('network') || 
    error.toLowerCase().includes('connection') || 
    error.toLowerCase().includes('unable to connect') ||
    error.toLowerCase().includes('failed to fetch') ||
    error.toLowerCase().includes('offline') ||
    error.toLowerCase().includes('timeout')
  );
  
  // Only show network error if we're really offline or if the error mentions connectivity
  const showNetworkAlert = networkStatus === 'offline' || isNetworkError;
  
  if (!error && !showNetworkAlert) {
    return null;
  }
  
  return (
    <div className="px-4 pt-4">
      <Alert 
        variant="destructive" 
        className={isNetworkError ? 
          "border-amber-500 bg-amber-50 text-amber-600" : 
          "border-red-500 bg-red-50 text-red-600"
        }
      >
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            {isNetworkError ? (
              <WifiOff className="h-4 w-4" />
            ) : (
              <AlertCircle className="h-4 w-4" />
            )}
            <AlertDescription>
              {error || "You appear to be offline. Please check your internet connection to sign in or sign up."}
            </AlertDescription>
          </div>
          
          {onRetry && (
            <NetworkRetryButton 
              onRetry={onRetry}
              isConnecting={isRetrying}
              colorScheme={isNetworkError ? "warning" : "error"}
            />
          )}
        </div>
      </Alert>
    </div>
  );
};

export default AuthErrorAlert;
