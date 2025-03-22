import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AnimatedRoute from '../components/ui/AnimatedRoute';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import PageSEO from '../components/seo/PageSEO';
import { useAuth } from '../components/auth/AuthProvider';
import { toast } from 'sonner';
import SignInForm from '../components/auth/SignInForm';
import SignUpForm from '../components/auth/SignUpForm';
import AuthErrorAlert from '../components/auth/AuthErrorAlert';

const SignIn: React.FC = () => {
  const { signIn, signUp, loading: authLoading, networkStatus } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [activeTab, setActiveTab] = useState('signin');
  const [formError, setFormError] = useState('');
  
  useEffect(() => {
    if (networkStatus === 'offline') {
      setFormError('You appear to be offline. Please check your internet connection.');
    } else if (formError === 'You appear to be offline. Please check your internet connection.') {
      setFormError('');
    }
  }, [networkStatus, formError]);
  
  const [errors, setErrors] = useState({
    signInEmail: '',
    signInPassword: '',
    signUpEmail: '',
    signUpPassword: '',
    confirmPassword: '',
  });
  
  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };
  
  const handleRetry = () => {
    setFormError('');
    
    if (activeTab === 'signin' && signInEmail && signInPassword) {
      handleSignIn(new CustomEvent('retry') as unknown as React.FormEvent<HTMLFormElement>);
    } else if (activeTab === 'signup' && signUpEmail && signUpPassword && confirmPassword) {
      handleSignUp(new CustomEvent('retry') as unknown as React.FormEvent<HTMLFormElement>);
    }
  };
  
  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    if (e.preventDefault) {
      e.preventDefault();
    }
    
    setErrors({
      signInEmail: '',
      signInPassword: '',
      signUpEmail: '',
      signUpPassword: '',
      confirmPassword: '',
    });
    setFormError('');
    
    let hasErrors = false;
    
    if (!signInEmail) {
      setErrors(prev => ({ ...prev, signInEmail: 'Email is required' }));
      hasErrors = true;
    } else if (!validateEmail(signInEmail)) {
      setErrors(prev => ({ ...prev, signInEmail: 'Please enter a valid email' }));
      hasErrors = true;
    }
    
    if (!signInPassword) {
      setErrors(prev => ({ ...prev, signInPassword: 'Password is required' }));
      hasErrors = true;
    }
    
    if (hasErrors) return;
    
    if (networkStatus === 'offline') {
      setFormError('Network error. Please check your connection and try again.');
      return;
    }
    
    setIsLoading(true);
    
    try {
      await signIn(signInEmail, signInPassword);
      // Navigation will be handled in AuthProvider after successful login
    } catch (error: any) {
      console.error('Failed to sign in:', error);
      setFormError(error.message || 'Failed to sign in');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    if (e.preventDefault) {
      e.preventDefault();
    }
    
    setErrors({
      signInEmail: '',
      signInPassword: '',
      signUpEmail: '',
      signUpPassword: '',
      confirmPassword: '',
    });
    setFormError('');
    
    let hasErrors = false;
    
    if (!signUpEmail) {
      setErrors(prev => ({ ...prev, signUpEmail: 'Email is required' }));
      hasErrors = true;
    } else if (!validateEmail(signUpEmail)) {
      setErrors(prev => ({ ...prev, signUpEmail: 'Please enter a valid email' }));
      hasErrors = true;
    }
    
    if (!signUpPassword) {
      setErrors(prev => ({ ...prev, signUpPassword: 'Password is required' }));
      hasErrors = true;
    } else if (signUpPassword.length < 6) {
      setErrors(prev => ({ ...prev, signUpPassword: 'Password must be at least 6 characters' }));
      hasErrors = true;
    }
    
    if (signUpPassword !== confirmPassword) {
      setErrors(prev => ({ ...prev, confirmPassword: "Passwords don't match" }));
      hasErrors = true;
    }
    
    if (hasErrors) return;
    
    if (networkStatus === 'offline') {
      setFormError('Network error. Please check your connection and try again.');
      return;
    }
    
    setIsLoading(true);
    setFormError('');
    
    try {
      console.log('Attempting signup with:', { email: signUpEmail, passwordLength: signUpPassword.length });
      await signUp(signUpEmail, signUpPassword);
      
      setActiveTab('signin');
      setSignUpEmail('');
      setSignUpPassword('');
      setConfirmPassword('');
      
      toast.success("Registration successful! Please check your email to verify your account.");
    } catch (error: any) {
      console.error('Failed to sign up:', error);
      
      if (error.message?.includes('already registered')) {
        setFormError('This email is already registered. Please sign in instead.');
        setActiveTab('signin');
        setSignInEmail(signUpEmail);
      } else {
        setFormError(error.message || 'Failed to sign up');
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setErrors({
      signInEmail: '',
      signInPassword: '',
      signUpEmail: '',
      signUpPassword: '',
      confirmPassword: '',
    });
    setFormError('');
  };
  
  const isSignInDisabled = isLoading || authLoading || networkStatus === 'offline';
  const isSignUpDisabled = isLoading || authLoading || networkStatus === 'offline';
  
  return (
    <AnimatedRoute animation="fade">
      <PageSEO
        title="Sign In | AdvisorWiz"
        description="Sign in to your AdvisorWiz account to manage your profile, connect with financial advisors, or manage your client relationships."
        noIndex={true}
      />
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-2xl">Welcome to AdvisorWiz</CardTitle>
              <CardDescription>
                Sign in to your account or create a new one
              </CardDescription>
            </CardHeader>
            
            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              
              <AuthErrorAlert 
                error={formError} 
                networkStatus={networkStatus} 
                onRetry={handleRetry}
              />
              
              <TabsContent value="signin">
                <SignInForm
                  onSubmit={handleSignIn}
                  email={signInEmail}
                  setEmail={setSignInEmail}
                  password={signInPassword}
                  setPassword={setSignInPassword}
                  errors={{
                    signInEmail: errors.signInEmail,
                    signInPassword: errors.signInPassword
                  }}
                  isLoading={isLoading}
                  isDisabled={isSignInDisabled}
                />
              </TabsContent>
              
              <TabsContent value="signup">
                <SignUpForm
                  onSubmit={handleSignUp}
                  email={signUpEmail}
                  setEmail={setSignUpEmail}
                  password={signUpPassword}
                  setPassword={setSignUpPassword}
                  confirmPassword={confirmPassword}
                  setConfirmPassword={setConfirmPassword}
                  errors={{
                    signUpEmail: errors.signUpEmail,
                    signUpPassword: errors.signUpPassword,
                    confirmPassword: errors.confirmPassword
                  }}
                  isLoading={isLoading}
                  isDisabled={isSignUpDisabled}
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
        </main>
        
        <Footer />
      </div>
    </AnimatedRoute>
  );
};

export default SignIn;
