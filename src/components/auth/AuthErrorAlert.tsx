
import React from 'react';
import { Alert, AlertDescription } from '../ui/alert';
import { AlertCircle, WifiOff, RefreshCw } from 'lucide-react';
import { Button } from '../ui/button';

interface AuthErrorAlertProps {
  error: string;
  networkStatus: 'online' | 'offline' | 'checking';
  onRetry?: () => void;
}

const AuthErrorAlert: React.FC<AuthErrorAlertProps> = ({ error, networkStatus, onRetry }) => {
  // Determine if the error is related to network connectivity
  const isNetworkError = error.toLowerCase().includes('network') || error.toLowerCase().includes('connection') || error.toLowerCase().includes('failed to fetch');
  
  return (
    <>
      {error && (
        <div className="px-4 pt-4">
          <Alert 
            variant={isNetworkError ? "destructive" : "destructive"} 
            className={isNetworkError ? "border-red-500 bg-red-50 text-red-600" : "border-red-500 bg-red-50 text-red-600"}
          >
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-2">
                {isNetworkError ? <WifiOff className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                <AlertDescription>{error}</AlertDescription>
              </div>
              
              {isNetworkError && onRetry && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={onRetry} 
                  className="ml-2 border-red-500 text-red-600 hover:bg-red-100"
                >
                  <RefreshCw className="mr-2 h-3 w-3" />
                  Retry
                </Button>
              )}
            </div>
          </Alert>
        </div>
      )}
      
      {networkStatus === 'offline' && (
        <div className="px-4 pt-4">
          <Alert className="border-amber-500 bg-amber-50 text-amber-700">
            <WifiOff className="h-4 w-4" />
            <AlertDescription>
              You are currently offline. Please check your internet connection to sign in or sign up.
            </AlertDescription>
          </Alert>
        </div>
      )}
    </>
  );
};

export default AuthErrorAlert;
