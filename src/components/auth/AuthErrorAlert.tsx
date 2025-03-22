
import React from 'react';
import { Alert, AlertDescription } from '../ui/alert';
import { AlertCircle, WifiOff } from 'lucide-react';

interface AuthErrorAlertProps {
  error: string;
  networkStatus: 'online' | 'offline' | 'checking';
}

const AuthErrorAlert: React.FC<AuthErrorAlertProps> = ({ error, networkStatus }) => {
  return (
    <>
      {error && (
        <div className="px-4 pt-4">
          <Alert variant="destructive" className="border-red-500 bg-red-50 text-red-600">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
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
