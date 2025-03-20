
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, AlertCircle } from 'lucide-react';
import { useUser } from '../context/UserContext';
import AnimatedRoute from '../components/ui/AnimatedRoute';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';
import PageSEO from '../components/seo/PageSEO';
import Logo from '../components/layout/Logo';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { setUserType, setIsAuthenticated } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // Validate input
    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password');
      setIsLoading(false);
      return;
    }

    try {
      // For demo purposes, we'll simulate authentication with hardcoded values
      // In a real app, this would be a call to an authentication service
      
      setTimeout(() => {
        // Demo authentication logic - in a real app, this would be an API call
        if (email.includes('consumer')) {
          setUserType('consumer');
          setIsAuthenticated(true);
          navigate('/consumer-profile');
        } else if (email.includes('advisor')) {
          setUserType('advisor');
          setIsAuthenticated(true);
          navigate('/advisor-profile');
        } else if (email.includes('firm')) {
          setUserType('firm_admin');
          setIsAuthenticated(true);
          navigate('/firm-profile');
        } else {
          setError('Invalid credentials. Please try again.');
        }
        setIsLoading(false);
      }, 1000);

    } catch (err) {
      setError('Authentication failed. Please try again.');
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    // In a real app, this would navigate to a password reset page
    alert('Password reset functionality would be implemented here');
  };

  const handleSignUp = () => {
    navigate('/onboarding');
  };

  return (
    <AnimatedRoute animation="fade">
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100 dark:from-navy-900 dark:to-navy-950">
        <PageSEO 
          title="Sign In to AdvisorWiz | Connect with Financial Advisors"
          description="Sign in to your AdvisorWiz account. Find the perfect financial advisor that matches your needs, or manage your advisor profile."
          canonicalUrl="https://advisorwiz.com/sign-in"
        />
        
        <header className="py-4 px-6 flex justify-center">
          <Logo />
        </header>
        
        <main className="flex-grow flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            <div className="bg-white dark:bg-navy-800 rounded-xl shadow-lg overflow-hidden dark:border dark:border-navy-700">
              <div className="p-8">
                <div className="text-center mb-6">
                  <h1 className="text-2xl font-serif font-bold text-navy-900 dark:text-white">Welcome Back</h1>
                  <p className="text-slate-600 dark:text-slate-300 mt-2">Sign in to access your account</p>
                </div>
                
                {error && (
                  <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center text-red-800 dark:text-red-300">
                    <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                    <span className="text-sm">{error}</span>
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-1">
                    <Label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-200">
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500 w-5 h-5" />
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your email address"
                        className="pl-10 bg-white dark:bg-navy-700 border-slate-200 dark:border-navy-600"
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="password" className="text-sm font-medium text-slate-700 dark:text-slate-200">
                        Password
                      </Label>
                      <button
                        type="button"
                        onClick={handleForgotPassword}
                        className="text-xs font-medium text-teal-600 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-300"
                      >
                        Forgot Password?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500 w-5 h-5" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Your password"
                        className="pl-10 bg-white dark:bg-navy-700 border-slate-200 dark:border-navy-600"
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-slate-300 dark:border-navy-600 rounded dark:bg-navy-700 dark:checked:bg-teal-500"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-600 dark:text-slate-300">
                      Remember me
                    </label>
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Signing in...' : 'Sign In'}
                  </Button>
                  
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-slate-200 dark:border-navy-600"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white dark:bg-navy-800 px-2 text-slate-500 dark:text-slate-400">Or continue with</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="w-full border-slate-300 dark:border-navy-600 dark:text-slate-300 dark:hover:bg-navy-700" type="button">
                      <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                        <path
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          fill="#4285F4"
                        />
                        <path
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          fill="#34A853"
                        />
                        <path
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          fill="#EA4335"
                        />
                      </svg>
                      Google
                    </Button>
                    <Button variant="outline" className="w-full border-slate-300 dark:border-navy-600 dark:text-slate-300 dark:hover:bg-navy-700" type="button">
                      <svg className="mr-2 h-4 w-4 fill-[#0A66C2]" viewBox="0 0 24 24">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"></path>
                      </svg>
                      LinkedIn
                    </Button>
                  </div>
                </form>
                
                <div className="mt-6 text-center">
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    Don't have an account?{' '}
                    <button
                      onClick={handleSignUp}
                      className="font-medium text-teal-600 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-300"
                    >
                      Sign up
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </AnimatedRoute>
  );
};

export default SignIn;
