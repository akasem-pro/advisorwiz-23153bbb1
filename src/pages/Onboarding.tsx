
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatedRoute } from '../components/ui/AnimatedRoute';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { ArrowRight, ArrowLeft, User, Briefcase, Building } from 'lucide-react';
import { useUser } from '../context/UserContext';

const Onboarding: React.FC = () => {
  const [step, setStep] = useState(1);
  const [selectedUserType, setSelectedUserType] = useState<'consumer' | 'advisor' | 'firm_admin' | null>(null);
  const { setUserType, setIsAuthenticated } = useUser();
  const navigate = useNavigate();

  const handleContinue = () => {
    if (step === 1 && selectedUserType) {
      setStep(2);
    } else if (step === 2) {
      setUserType(selectedUserType);
      setIsAuthenticated(true);
      
      if (selectedUserType === 'consumer') {
        navigate('/consumer-profile');
      } else if (selectedUserType === 'advisor') {
        navigate('/advisor-profile');
      } else if (selectedUserType === 'firm_admin') {
        navigate('/firm-profile');
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <AnimatedRoute animation="fade">
      <div className="min-h-screen flex flex-col">
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

                    <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-10">
                      <button
                        className={`relative p-8 rounded-xl border-2 transition-all duration-300 text-left ${
                          selectedUserType === 'consumer'
                            ? 'border-teal-500 bg-teal-50'
                            : 'border-slate-200 hover:border-teal-200 hover:bg-slate-50'
                        }`}
                        onClick={() => setSelectedUserType('consumer')}
                      >
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-teal-600" />
                          </div>
                          <h3 className="text-xl font-serif font-semibold text-navy-900">
                            I'm a Consumer
                          </h3>
                        </div>
                        <p className="text-slate-600">
                          I'm looking for a financial advisor who can help me with my financial goals and planning.
                        </p>
                        {selectedUserType === 'consumer' && (
                          <div className="absolute top-4 right-4 w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        )}
                      </button>

                      <button
                        className={`relative p-8 rounded-xl border-2 transition-all duration-300 text-left ${
                          selectedUserType === 'advisor'
                            ? 'border-navy-500 bg-navy-50'
                            : 'border-slate-200 hover:border-navy-200 hover:bg-slate-50'
                        }`}
                        onClick={() => setSelectedUserType('advisor')}
                      >
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="w-12 h-12 bg-navy-100 rounded-full flex items-center justify-center">
                            <Briefcase className="w-6 h-6 text-navy-600" />
                          </div>
                          <h3 className="text-xl font-serif font-semibold text-navy-900">
                            I'm an Advisor
                          </h3>
                        </div>
                        <p className="text-slate-600">
                          I'm a financial professional looking to connect with potential clients who match my expertise.
                        </p>
                        {selectedUserType === 'advisor' && (
                          <div className="absolute top-4 right-4 w-5 h-5 bg-navy-500 rounded-full flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        )}
                      </button>

                      <button
                        className={`relative p-8 rounded-xl border-2 transition-all duration-300 text-left ${
                          selectedUserType === 'firm_admin'
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-slate-200 hover:border-purple-200 hover:bg-slate-50'
                        }`}
                        onClick={() => setSelectedUserType('firm_admin')}
                      >
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                            <Building className="w-6 h-6 text-purple-600" />
                          </div>
                          <h3 className="text-xl font-serif font-semibold text-navy-900">
                            I'm a Financial Firm
                          </h3>
                        </div>
                        <p className="text-slate-600">
                          I represent a financial firm and want to manage multiple advisor profiles for our organization.
                        </p>
                        {selectedUserType === 'firm_admin' && (
                          <div className="absolute top-4 right-4 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        )}
                      </button>
                    </div>
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
                          : 'Set up your advisor account to connect with potential clients.'}
                      </p>
                    </div>

                    <div className="max-w-md mx-auto">
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
                          />
                        </div>
                        <div className="pt-2">
                          <div className="flex items-center">
                            <input
                              id="terms"
                              type="checkbox"
                              className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-slate-300 rounded"
                            />
                            <label htmlFor="terms" className="ml-2 block text-sm text-slate-600">
                              I agree to the <a href="#" className="text-teal-600 hover:underline">Terms of Service</a> and <a href="#" className="text-teal-600 hover:underline">Privacy Policy</a>
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
                    <div></div>
                  )}

                  <button
                    onClick={handleContinue}
                    disabled={step === 1 && !selectedUserType}
                    className={`btn-primary inline-flex items-center ${
                      step === 1 && !selectedUserType ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {step === 2 ? 'Create Account' : 'Continue'}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </AnimatedRoute>
  );
};

export default Onboarding;
