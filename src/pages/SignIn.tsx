import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedRoute from '../components/ui/AnimatedRoute';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import PageSEO from '../components/seo/PageSEO';
import { useSignInForm } from '../features/auth/hooks/useSignInForm';
import { useAuthFormSubmit } from '../features/auth/hooks/useAuthFormSubmit';
import AuthFormContainer from '../features/auth/components/AuthFormContainer';
import { useAuth } from '../features/auth/context/AuthProvider';

const SignIn: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if user is already authenticated
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);
  
  const {
    signInEmail,
    setSignInEmail,
    signInPassword,
    setSignInPassword,
    signUpEmail,
    setSignUpEmail,
    signUpPassword,
    setSignUpPassword,
    confirmPassword,
    setConfirmPassword,
    activeTab,
    setActiveTab,
    formError,
    setFormError,
    isLoading,
    setIsLoading,
    errors,
    validateSignInForm,
    validateSignUpForm,
    handleTabChange,
  } = useSignInForm();
  
  const {
    networkStatus,
    handleSignIn,
    handleSignUp,
    handleRetry
  } = useAuthFormSubmit();
  
  const handleSignInSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    await handleSignIn(
      e, 
      signInEmail, 
      signInPassword, 
      validateSignInForm, 
      setFormError, 
      setIsLoading
    );
  };
  
  const handleSignUpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    await handleSignUp(
      e, 
      signUpEmail, 
      signUpPassword, 
      validateSignUpForm, 
      setFormError, 
      setIsLoading, 
      setActiveTab, 
      setSignInEmail, 
      () => {
        setSignUpEmail('');
        setSignUpPassword('');
        setConfirmPassword('');
      }
    );
  };
  
  const handleRetrySubmit = async () => {
    await handleRetry(
      activeTab,
      signInEmail,
      signInPassword,
      signUpEmail,
      signUpPassword,
      confirmPassword,
      handleSignInSubmit,
      handleSignUpSubmit,
      setFormError
    );
  };
  
  // Only disable buttons when actually loading
  const isSignInDisabled = isLoading;
  const isSignUpDisabled = isLoading;
  
  return (
    <AnimatedRoute animation="fade">
      <PageSEO
        title="Sign In | AdvisorWiz"
        description="Sign in to your AdvisorWiz account to manage your profile, connect with financial advisors, or manage your client relationships."
        noIndex={true}
      />
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow flex items-center justify-center py-12 px-4 sm:py-16 auth-main-container">
          <div className="w-full max-w-md auth-form-container">
            <AuthFormContainer
              title="Welcome to AdvisorWiz"
              description="Sign in to your account or create a new one"
              activeTab={activeTab}
              onTabChange={handleTabChange}
              formError={formError}
              networkStatus={networkStatus}
              onRetry={handleRetrySubmit}
              onSignIn={handleSignInSubmit}
              onSignUp={handleSignUpSubmit}
              signInProps={{
                email: signInEmail,
                setEmail: setSignInEmail,
                password: signInPassword,
                setPassword: setSignInPassword,
                errors: {
                  signInEmail: errors.signInEmail,
                  signInPassword: errors.signInPassword
                },
                isLoading,
                isDisabled: isSignInDisabled
              }}
              signUpProps={{
                email: signUpEmail,
                setEmail: setSignUpEmail,
                password: signUpPassword,
                setPassword: setSignUpPassword,
                confirmPassword,
                setConfirmPassword,
                errors: {
                  signUpEmail: errors.signUpEmail,
                  signUpPassword: errors.signUpPassword,
                  confirmPassword: errors.confirmPassword
                },
                isLoading,
                isDisabled: isSignUpDisabled
              }}
            />
          </div>
        </main>
        
        <Footer />
      </div>
    </AnimatedRoute>
  );
};

export default SignIn;
