
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '../features/auth/context/AuthProvider';
import { useUser } from '../context/UserContext';
import AppLayout from '../components/layout/AppLayout';
import { Button } from '../components/ui/button';
import { ArrowRight } from 'lucide-react';
import PageSEO from '../components/seo/PageSEO';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signIn, user } = useAuth();
  const { setIsAuthenticated, userType, setUserType } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      redirectBasedOnUserType();
    }
  }, [user]);

  const redirectBasedOnUserType = () => {
    setIsAuthenticated(true);
    
    if (userType === 'consumer') {
      navigate('/consumer-dashboard');
    } else if (userType === 'advisor') {
      navigate('/advisor-dashboard');
    } else if (userType === 'firm_admin') {
      navigate('/firm-dashboard');
    } else {
      navigate('/onboarding');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const success = await signIn(email, password);
      
      if (success) {
        redirectBasedOnUserType();
      } else {
        toast.error('Invalid email or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegister = () => {
    navigate('/onboarding');
  };

  return (
    <AppLayout>
      <PageSEO 
        title="Sign In | AdvisorWiz"
        description="Sign in to your AdvisorWiz account to connect with financial advisors or manage your client relationships."
        canonicalUrl="https://advisorwiz.com/login"
      />
      
      <div className="container mx-auto px-4 py-12 max-w-md">
        <div className="glass-card rounded-2xl overflow-hidden shadow-lg">
          <div className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-serif font-bold text-navy-900 mb-2">
                Welcome Back
              </h1>
              <p className="text-slate-600">
                Sign in to your AdvisorWiz account
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-navy-800 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="input-field"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-navy-800 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="input-field"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Your password"
                  required
                />
              </div>
              
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-gray-600">
                    Remember me
                  </label>
                </div>
                <div>
                  <a href="/forgot-password" className="text-teal-600 hover:text-teal-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              
              <div>
                <Button 
                  type="submit" 
                  className="w-full bg-teal-600 hover:bg-teal-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing in...
                    </span>
                  ) : (
                    'Sign In'
                  )}
                </Button>
              </div>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-slate-600">
                Don't have an account yet?{' '}
                <button
                  onClick={handleRegister}
                  className="text-teal-600 hover:text-teal-700 font-medium"
                >
                  Create Account
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Login;
