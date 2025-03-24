
import React from 'react';
import { Alert, AlertDescription } from '../../../components/ui/alert';
import { AlertCircle, WifiOff, RefreshCw } from 'lucide-react';
import { Button } from '../../../components/ui/button';

interface AuthErrorAlertProps {
  error: string;
  networkStatus: 'online' | 'offline' | 'checking';
  onRetry?: () => void;
}

const AuthErrorAlert: React.FC<AuthErrorAlertProps> = ({ error, networkStatus, onRetry }) => {
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
  
  return (
    <>
      {/* Show error message */}
      {error && (
        <div className="px-4 pt-4">
          <Alert 
            variant="destructive" 
            className={isNetworkError ? "border-amber-500 bg-amber-50 text-amber-600" : "border-red-500 bg-red-50 text-red-600"}
          >
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-2">
                {isNetworkError ? (
                  <WifiOff className="h-4 w-4" />
                ) : (
                  <AlertCircle className="h-4 w-4" />
                )}
                <AlertDescription>
                  {error}
                </AlertDescription>
              </div>
              
              {onRetry && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={onRetry} 
                  className={isNetworkError ? "ml-2 border-amber-500 text-amber-600 hover:bg-amber-100" : "ml-2 border-red-500 text-red-600 hover:bg-red-100"}
                >
                  <RefreshCw className="mr-2 h-3 w-3" />
                  Retry
                </Button>
              )}
            </div>
          </Alert>
        </div>
      )}
      
      {/* Show network status alerts only if no other error is showing */}
      {!error && showNetworkAlert && (
        <div className="px-4 pt-4">
          <Alert 
            variant="destructive"
            className="border-amber-500 bg-amber-50 text-amber-700"
          >
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-2">
                <WifiOff className="h-4 w-4" />
                <AlertDescription>
                  You appear to be offline. Please check your internet connection to sign in or sign up.
                </AlertDescription>
              </div>
              
              {onRetry && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={onRetry} 
                  className="ml-2 border-amber-500 text-amber-700 hover:bg-amber-100"
                >
                  <RefreshCw className="mr-2 h-3 w-3" />
                  Check Connection
                </Button>
              )}
            </div>
          </Alert>
        </div>
      )}
    </>
  );
};

export default AuthErrorAlert;
