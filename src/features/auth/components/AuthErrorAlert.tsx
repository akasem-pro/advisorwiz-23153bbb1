
import React from 'react';
import { Alert, AlertDescription } from '../../../components/ui/alert';
import { AlertCircle, WifiOff, RefreshCw, Clock } from 'lucide-react';
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
    error.toLowerCase().includes('failed to fetch') ||
    error.toLowerCase().includes('offline') ||
    error.toLowerCase().includes('timeout')
  );
  
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
      
      {/* Show network status alerts */}
      {!error && networkStatus === 'offline' && (
        <div className="px-4 pt-4">
          <Alert className="border-amber-500 bg-amber-50 text-amber-700">
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-2">
                <WifiOff className="h-4 w-4" />
                <AlertDescription>
                  You are currently offline. Please check your internet connection to sign in or sign up.
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
      
      {!error && networkStatus === 'checking' && (
        <div className="px-4 pt-4">
          <Alert className="border-blue-500 bg-blue-50 text-blue-700">
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4 animate-spin" />
                <AlertDescription>
                  Checking connection to authentication service...
                </AlertDescription>
              </div>
            </div>
          </Alert>
        </div>
      )}
    </>
  );
};

export default AuthErrorAlert;
