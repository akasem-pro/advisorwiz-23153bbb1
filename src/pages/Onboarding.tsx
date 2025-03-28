import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedRoute from '../components/ui/AnimatedRoute';
import Header from '../components/layout/Header';
import AppFooter from '../components/layout/AppFooter';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useUser } from '../context/UserContext';
import PageSEO from '../components/seo/PageSEO';
import OnboardingUserType from '../components/onboarding/OnboardingUserType';
import { useAuth } from '../features/auth/context/AuthProvider';
import { UserType } from '../types/profileTypes';

const Onboarding: React.FC = () => {
  const [step, setStep] = useState(1);
  const [selectedUserType, setSelectedUserType] = useState<UserType>(null);
  const { setUserType, setIsAuthenticated } = useUser();
  const { signUp } = useAuth();
  const navigate = useNavigate();
  
  // Form state for registration
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [formError, setFormError] = useState('');

  const handleContinue = () => {
    if (step === 1 && selectedUserType) {
      setStep(2);
    } else if (step === 2) {
      handleCreateAccount();
    }
  };

  const validateForm = () => {
    setFormError('');
    
    if (!email) {
      setFormError('Email is required');
      return false;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setFormError('Please enter a valid email address');
      return false;
    }
    
    if (!password) {
      setFormError('Password is required');
      return false;
    }
    
    if (password.length < 6) {
      setFormError('Password must be at least 6 characters');
      return false;
    }
    
    if (password !== confirmPassword) {
      setFormError('Passwords do not match');
      return false;
    }
    
    if (!termsAgreed) {
      setFormError('You must agree to the Terms of Service and Privacy Policy');
      return false;
    }
    
    return true;
  };

  const handleCreateAccount = async () => {
    if (!validateForm()) {
      return;
    }
    
    setIsRegistering(true);
    
    try {
      // Perform registration with Supabase
      const success = await signUp(email, password, selectedUserType as UserType);
      
      if (success) {
        // Set user type and authentication state
        setUserType(selectedUserType);
        setIsAuthenticated(true);
        
        // Redirect based on user type
        if (selectedUserType === 'consumer') {
          navigate('/consumer-profile');
        } else if (selectedUserType === 'advisor') {
          navigate('/advisor-profile');
        } else if (selectedUserType === 'firm_admin') {
          navigate('/firm-profile');
        }
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      setFormError(error.message || 'Failed to create account. Please try again.');
    } finally {
      setIsRegistering(false);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSignIn = () => {
    navigate('/login');
  };

  return (
    <AnimatedRoute animation="fade">
      <div className="min-h-screen flex flex-col">
        <PageSEO 
          title="Get Started with AdvisorWiz | Find Your Financial Advisor Match"
          description="Create your account and get matched with financial advisors that meet your specific needs. Sign up as a consumer, advisor, or financial firm."
          canonicalUrl="https://advisorwiz.com/onboarding"
        />
        
        <Header />
        
        <main className="flex-grow pt-20">
          <div className="container mx-auto px-4 py-12 max-w-4xl">
            <div className="glass-card rounded-2xl overflow-hidden shadow-lg">
              <div className="p-8 md:p-12">
                {step === 1 ? (
                  <div className="animate-fade-in">
                    <div className="text-center mb-10">
                      <h1 className="text-3xl md:text-4xl font-serif font-bold text-navy-900 mb-4">
                        Welcome to AdvisorWiz
                      </h1>
                      <p className="text-slate-600 max-w-2xl mx-auto">
                        Choose which type of user you are to get started with your personalized experience.
                      </p>
                    </div>

                    <OnboardingUserType
                      selectedUserType={selectedUserType}
                      onSelect={setSelectedUserType}
                    />
                  </div>
                ) : (
                  <div className="animate-fade-in">
                    <div className="text-center mb-10">
                      <h1 className="text-3xl md:text-4xl font-serif font-bold text-navy-900 mb-4">
                        Create Your Account
                      </h1>
                      <p className="text-slate-600 max-w-2xl mx-auto">
                        {selectedUserType === 'consumer'
                          ? 'Set up your account to start finding the perfect financial advisor.'
                          : selectedUserType === 'advisor'
                            ? 'Set up your advisor account to connect with potential clients.'
                            : 'Set up your firm account to manage your advisor team and client relationships.'}
                      </p>
                    </div>

                    <div className="max-w-md mx-auto">
                      {formError && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4 text-sm">
                          {formError}
                        </div>
                      )}
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-navy-800 mb-1">
                            Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            className="input-field"
                            placeholder="Your email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="confirmPassword" className="block text-sm font-medium text-navy-800 mb-1">
                            Confirm Password
                          </label>
                          <input
                            type="password"
                            id="confirmPassword"
                            className="input-field"
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                          />
                        </div>
                        <div className="pt-2">
                          <div className="flex items-center">
                            <input
                              id="terms"
                              type="checkbox"
                              className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-slate-300 rounded"
                              checked={termsAgreed}
                              onChange={(e) => setTermsAgreed(e.target.checked)}
                              required
                            />
                            <label htmlFor="terms" className="ml-2 block text-sm text-slate-600">
                              I agree to the <a href="/terms" className="text-teal-600 hover:underline">Terms of Service</a> and <a href="/privacy" className="text-teal-600 hover:underline">Privacy Policy</a>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-between mt-10">
                  {step > 1 ? (
                    <button
                      onClick={handleBack}
                      className="flex items-center text-navy-700 hover:text-navy-900 transition-colors"
                    >
                      <ArrowLeft className="mr-2 w-5 h-5" />
                      Back
                    </button>
                  ) : (
                    <div>
                      <button 
                        onClick={handleSignIn}
                        className="text-navy-700 hover:text-navy-900 transition-colors"
                      >
                        Already have an account? Sign in
                      </button>
                    </div>
                  )}

                  <button
                    onClick={handleContinue}
                    disabled={(step === 1 && !selectedUserType) || isRegistering}
                    className={`btn-primary inline-flex items-center ${
                      (step === 1 && !selectedUserType) || isRegistering ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {isRegistering ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Creating Account...
                      </>
                    ) : (
                      <>
                        {step === 2 ? 'Create Account' : 'Continue'}
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>

        <AppFooter />
      </div>
    </AnimatedRoute>
  );
};

export default Onboarding;
