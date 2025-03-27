
import React from 'react';
import AppLayout from '../../../components/layout/AppLayout';
import AuthFormContainer from './AuthFormContainer';

interface SignInLayoutProps {
  title: string;
  description: string;
  activeTab: string;
  onTabChange: (value: string) => void;
  formError: string;
  networkStatus: 'online' | 'offline' | 'checking';
  onRetry: () => void;
  onSignIn: (e: React.FormEvent<HTMLFormElement>) => Promise<boolean | void>;
  onSignUp: (e: React.FormEvent<HTMLFormElement>) => Promise<boolean | void>;
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

/**
 * Layout component for the Sign In page
 */
const SignInLayout: React.FC<SignInLayoutProps> = ({
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
    <AppLayout fullWidth={true} contentClassName="auth-main-container">
      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:py-16">
        <div className="w-full max-w-md auth-form-container">
          <AuthFormContainer
            title={title}
            description={description}
            activeTab={activeTab}
            onTabChange={onTabChange}
            formError={formError}
            networkStatus={networkStatus}
            onRetry={onRetry}
            onSignIn={onSignIn}
            onSignUp={onSignUp}
            signInProps={signInProps}
            signUpProps={signUpProps}
          />
        </div>
      </div>
    </AppLayout>
  );
};

export default SignInLayout;
