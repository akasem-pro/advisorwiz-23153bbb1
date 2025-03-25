
import React from 'react';
import { Alert, AlertDescription } from '../../../components/ui/alert';
import { AlertCircle, WifiOff, Info } from 'lucide-react';
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
  
  // Check if the error is related to authentication
  const isAuthError = error && (
    error.toLowerCase().includes('authentication failed') ||
    error.toLowerCase().includes('invalid email') ||
    error.toLowerCase().includes('invalid login') ||
    error.toLowerCase().includes('wrong password') ||
    error.toLowerCase().includes('credentials')
  );
  
  // Only show network error if we're really offline or if the error mentions connectivity
  const showNetworkAlert = networkStatus === 'offline' || isNetworkError;
  
  // In preview environments, show a more helpful message
  const isPreviewEnv = typeof window !== 'undefined' && (
    window.location.hostname.includes('preview') ||
    window.location.hostname.includes('lovableproject') ||
    window.location.hostname.includes('localhost')
  );
  
  // Get the appropriate message based on environment and error type
  const getErrorMessage = () => {
    if (!error) {
      return "You appear to be offline. Please check your internet connection to sign in or sign up.";
    }
    
    if (isPreviewEnv) {
      if (isNetworkError) {
        return "In preview environments, network errors are expected. Click the retry button to proceed with a simulated connection. Your account will be created locally.";
      }
      
      if (isAuthError) {
        return "For testing in preview environments, you can use any email and password, then click retry to proceed.";
      }
    }
    
    return error;
  };
  
  // Get the appropriate icon based on error type
  const getIcon = () => {
    if (isNetworkError) {
      return <WifiOff className="h-4 w-4" />;
    }
    
    if (isPreviewEnv && isAuthError) {
      return <Info className="h-4 w-4" />;
    }
    
    return <AlertCircle className="h-4 w-4" />;
  };
  
  // Get the appropriate color scheme based on error type and environment
  const getColorScheme = () => {
    if (isPreviewEnv && (isNetworkError || isAuthError)) {
      return "info";
    }
    
    if (isNetworkError) {
      return "warning";
    }
    
    return "error";
  };
  
  if (!error && !showNetworkAlert) {
    return null;
  }
  
  return (
    <div className="px-4 pt-4">
      <Alert 
        variant="destructive" 
        className={
          getColorScheme() === "info" 
            ? "border-blue-500 bg-blue-50 text-blue-600" 
            : getColorScheme() === "warning" 
              ? "border-amber-500 bg-amber-50 text-amber-600" 
              : "border-red-500 bg-red-50 text-red-600"
        }
      >
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            {getIcon()}
            <AlertDescription>
              {getErrorMessage()}
            </AlertDescription>
          </div>
          
          {onRetry && (
            <NetworkRetryButton 
              onRetry={onRetry}
              isConnecting={isRetrying}
              colorScheme={getColorScheme()}
            />
          )}
        </div>
      </Alert>
    </div>
  );
};

export default AuthErrorAlert;
