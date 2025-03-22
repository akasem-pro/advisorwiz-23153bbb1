
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AnimatedRoute from '../components/ui/AnimatedRoute';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Button } from '../components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import PageSEO from '../components/seo/PageSEO';
import { useAuth } from '../components/auth/AuthProvider';
import { toast } from 'sonner';

const SignIn: React.FC = () => {
  const { signIn, signUp } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [activeTab, setActiveTab] = useState('signin');
  const navigate = useNavigate();
  
  // Validation state
  const [errors, setErrors] = useState({
    signInEmail: '',
    signInPassword: '',
    signUpEmail: '',
    signUpPassword: '',
    confirmPassword: '',
    general: ''
  });
  
  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };
  
  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Reset errors
    setErrors({
      signInEmail: '',
      signInPassword: '',
      signUpEmail: '',
      signUpPassword: '',
      confirmPassword: '',
      general: ''
    });
    
    // Validate inputs
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
    
    setIsLoading(true);
    
    try {
      // Check network connectivity first
      if (!navigator.onLine) {
        throw new Error('Network error. Please check your connection and try again.');
      }
      
      await signIn(signInEmail, signInPassword);
      // Navigation will be handled in AuthProvider after successful login
    } catch (error: any) {
      console.error('Failed to sign in:', error);
      toast.error(error.message || 'Failed to sign in');
      setErrors(prev => ({ ...prev, general: error.message }));
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Reset errors
    setErrors({
      signInEmail: '',
      signInPassword: '',
      signUpEmail: '',
      signUpPassword: '',
      confirmPassword: '',
      general: ''
    });
    
    // Validate inputs
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
    
    setIsLoading(true);
    
    try {
      // Check network connectivity first
      if (!navigator.onLine) {
        throw new Error('Network error. Please check your connection and try again.');
      }
      
      await signUp(signUpEmail, signUpPassword);
      
      // After successful signup, switch to signin tab
      setActiveTab('signin');
      // Clear signup form
      setSignUpEmail('');
      setSignUpPassword('');
      setConfirmPassword('');
      
      toast.success("Registration successful! Please check your email to verify your account.");
    } catch (error: any) {
      console.error('Failed to sign up:', error);
      
      if (error.message?.includes('already registered')) {
        toast.error('This email is already registered. Please sign in instead.');
        setActiveTab('signin');
        setSignInEmail(signUpEmail);
      } else {
        toast.error(error.message || 'Failed to sign up');
        setErrors(prev => ({ ...prev, general: error.message }));
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    // Reset errors when switching tabs
    setErrors({
      signInEmail: '',
      signInPassword: '',
      signUpEmail: '',
      signUpPassword: '',
      confirmPassword: '',
      general: ''
    });
  };
  
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
              
              {errors.general && (
                <div className="px-4 py-2 mt-4 text-sm text-red-600 bg-red-50 rounded-md">
                  {errors.general}
                </div>
              )}
              
              <TabsContent value="signin">
                <CardContent className="pt-4">
                  <form onSubmit={handleSignIn} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        name="email" 
                        type="email" 
                        placeholder="name@example.com" 
                        value={signInEmail} 
                        onChange={(e) => setSignInEmail(e.target.value)} 
                        disabled={isLoading}
                        className={errors.signInEmail ? "border-red-500" : ""}
                      />
                      {errors.signInEmail && (
                        <p className="text-sm text-red-500">{errors.signInEmail}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <Link to="/reset-password" className="text-sm text-teal-600 hover:text-teal-500">
                          Forgot password?
                        </Link>
                      </div>
                      <Input 
                        id="password" 
                        name="password" 
                        type="password" 
                        value={signInPassword} 
                        onChange={(e) => setSignInPassword(e.target.value)} 
                        disabled={isLoading}
                        className={errors.signInPassword ? "border-red-500" : ""}
                      />
                      {errors.signInPassword && (
                        <p className="text-sm text-red-500">{errors.signInPassword}</p>
                      )}
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Signing in..." : "Sign In"}
                    </Button>
                  </form>
                </CardContent>
              </TabsContent>
              
              <TabsContent value="signup">
                <CardContent className="pt-4">
                  <form onSubmit={handleSignUp} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="registerEmail">Email</Label>
                      <Input 
                        id="registerEmail" 
                        name="registerEmail" 
                        type="email" 
                        placeholder="name@example.com" 
                        value={signUpEmail} 
                        onChange={(e) => setSignUpEmail(e.target.value)} 
                        disabled={isLoading}
                        className={errors.signUpEmail ? "border-red-500" : ""}
                      />
                      {errors.signUpEmail && (
                        <p className="text-sm text-red-500">{errors.signUpEmail}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="registerPassword">Password</Label>
                      <Input 
                        id="registerPassword" 
                        name="registerPassword" 
                        type="password" 
                        value={signUpPassword} 
                        onChange={(e) => setSignUpPassword(e.target.value)} 
                        disabled={isLoading}
                        className={errors.signUpPassword ? "border-red-500" : ""}
                      />
                      {errors.signUpPassword && (
                        <p className="text-sm text-red-500">{errors.signUpPassword}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input 
                        id="confirmPassword" 
                        name="confirmPassword" 
                        type="password" 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        disabled={isLoading}
                        className={errors.confirmPassword ? "border-red-500" : ""}
                      />
                      {errors.confirmPassword && (
                        <p className="text-sm text-red-500">{errors.confirmPassword}</p>
                      )}
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Creating Account..." : "Sign Up"}
                    </Button>
                  </form>
                </CardContent>
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
