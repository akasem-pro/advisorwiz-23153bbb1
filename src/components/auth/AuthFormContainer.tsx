
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import AuthErrorAlert from './AuthErrorAlert';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

interface AuthFormContainerProps {
  title: string;
  description: string;
  activeTab: string;
  onTabChange: (value: string) => void;
  formError: string;
  networkStatus: 'online' | 'offline' | 'checking';
  onRetry: () => void;
  onSignIn: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  onSignUp: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  signInProps: {
    email: string;
    setEmail: (email: string) => void;
    password: string;
    setPassword: (password: string) => void;
    errors: {
      signInEmail: string;
      signInPassword: string;
    };
    isLoading: boolean;
    isDisabled: boolean;
  };
  signUpProps: {
    email: string;
    setEmail: (email: string) => void;
    password: string;
    setPassword: (password: string) => void;
    confirmPassword: string;
    setConfirmPassword: (password: string) => void;
    errors: {
      signUpEmail: string;
      signUpPassword: string;
      confirmPassword: string;
    };
    isLoading: boolean;
    isDisabled: boolean;
  };
}

const AuthFormContainer: React.FC<AuthFormContainerProps> = ({
  title,
  description,
  activeTab,
  onTabChange,
  formError,
  networkStatus,
  onRetry,
  onSignIn,
  onSignUp,
  signInProps,
  signUpProps
}) => {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      
      <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signin">Sign In</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        
        <AuthErrorAlert 
          error={formError} 
          networkStatus={networkStatus} 
          onRetry={onRetry}
        />
        
        <TabsContent value="signin">
          <SignInForm
            onSubmit={onSignIn}
            email={signInProps.email}
            setEmail={signInProps.setEmail}
            password={signInProps.password}
            setPassword={signInProps.setPassword}
            errors={{
              signInEmail: signInProps.errors.signInEmail,
              signInPassword: signInProps.errors.signInPassword
            }}
            isLoading={signInProps.isLoading}
            isDisabled={signInProps.isDisabled}
          />
        </TabsContent>
        
        <TabsContent value="signup">
          <SignUpForm
            onSubmit={onSignUp}
            email={signUpProps.email}
            setEmail={signUpProps.setEmail}
            password={signUpProps.password}
            setPassword={signUpProps.setPassword}
            confirmPassword={signUpProps.confirmPassword}
            setConfirmPassword={signUpProps.setConfirmPassword}
            errors={{
              signUpEmail: signUpProps.errors.signUpEmail,
              signUpPassword: signUpProps.errors.signUpPassword,
              confirmPassword: signUpProps.errors.confirmPassword
            }}
            isLoading={signUpProps.isLoading}
            isDisabled={signUpProps.isDisabled}
          />
        </TabsContent>
      </Tabs>
      
      <CardFooter className="flex flex-col space-y-4 pt-2">
        <div className="text-center text-sm">
          By continuing, you agree to our{' '}
          <Link to="/terms" className="text-teal-600 hover:text-teal-500 font-medium">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link to="/privacy" className="text-teal-600 hover:text-teal-500 font-medium">
            Privacy Policy
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default AuthFormContainer;
