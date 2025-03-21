import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import { useAuth } from '../auth/AuthProvider';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <section className="relative pt-20 pb-16 overflow-hidden bg-gradient-to-b from-white to-slate-50 dark:from-navy-900 dark:to-navy-950">
      <div className="container mx-auto px-4 z-20 relative">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-navy-900 dark:text-white leading-tight mb-6">
            Find the Perfect Financial Advisor for Your Needs
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl">
            Connect with qualified financial advisors who understand your unique financial situation and goals.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
            {user ? (
              <Button 
                className="w-full sm:w-auto text-lg bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-lg flex items-center justify-center"
                onClick={() => navigate('/matches')}
              >
                <Search className="mr-2 h-5 w-5" />
                Find Your Match
              </Button>
            ) : (
              <>
                <Button 
                  className="w-full sm:w-auto text-lg bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-lg flex items-center justify-center"
                  onClick={() => navigate('/sign-in')}
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full sm:w-auto text-lg border-slate-300 dark:border-navy-600 px-8 py-3 rounded-lg"
                  onClick={() => navigate('/for-advisors')}
                >
                  For Advisors
                </Button>
              </>
            )}
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 mt-8">
            <div className="text-center">
              <p className="text-3xl font-bold text-teal-600 dark:text-teal-400">500+</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Qualified Advisors</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-teal-600 dark:text-teal-400">98%</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Match Satisfaction</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-teal-600 dark:text-teal-400">$10B+</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Assets Managed</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-teal-600 dark:text-teal-400">5,000+</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Successful Matches</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-10 pointer-events-none">
        <div className="absolute top-1/4 left-5 w-64 h-64 bg-teal-300 dark:bg-teal-900 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute top-1/3 right-5 w-72 h-72 bg-indigo-300 dark:bg-indigo-900 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute top-2/3 left-1/3 w-80 h-80 bg-blue-300 dark:bg-blue-900 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>
    </section>
  );
};

export default HeroSection;
