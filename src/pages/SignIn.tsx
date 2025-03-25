
import React from 'react';
import AnimatedRoute from '../components/ui/AnimatedRoute';
import PageSEO from '../components/seo/PageSEO';
import { useSignInPage } from '../features/auth/hooks/useSignInPage';
import SignInLayout from '../features/auth/components/SignInLayout';

/**
 * Sign In page component
 */
const SignIn: React.FC = () => {
  const {
    formState,
    networkStatus,
    handleSignInSubmit,
    handleSignUpSubmit,
    handleConnectionRetry,
    isSignInDisabled,
    isSignUpDisabled
  } = useSignInPage();
  
  return (
    <AnimatedRoute animation="fade">
      <PageSEO
        title="Sign In | AdvisorWiz"
        description="Sign in to your AdvisorWiz account to manage your profile, connect with financial advisors, or manage your client relationships."
        noIndex={true}
      />
      
      <SignInLayout
        title="Welcome to AdvisorWiz"
        description="Sign in to your account or create a new one"
        activeTab={formState.activeTab}
        onTabChange={formState.handleTabChange}
        formError={formState.formError}
        networkStatus={networkStatus}
        onRetry={handleConnectionRetry}
        onSignIn={handleSignInSubmit}
        onSignUp={handleSignUpSubmit}
        signInProps={{
          email: formState.signInEmail,
          setEmail: formState.setSignInEmail,
          password: formState.signInPassword,
          setPassword: formState.setSignInPassword,
          errors: {
            signInEmail: formState.errors.signInEmail,
            signInPassword: formState.errors.signInPassword
          },
          isLoading: formState.isLoading,
          isDisabled: isSignInDisabled
        }}
        signUpProps={{
          email: formState.signUpEmail,
          setEmail: formState.setSignUpEmail,
          password: formState.signUpPassword,
          setPassword: formState.setSignUpPassword,
          confirmPassword: formState.confirmPassword,
          setConfirmPassword: formState.setConfirmPassword,
          errors: {
            signUpEmail: formState.errors.signUpEmail,
            signUpPassword: formState.errors.signUpPassword,
            confirmPassword: formState.errors.confirmPassword
          },
          isLoading: formState.isLoading,
          isDisabled: isSignUpDisabled
        }}
      />
    </AnimatedRoute>
  );
};

export default SignIn;
