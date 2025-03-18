
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Users, Briefcase, User } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden" aria-labelledby="hero-heading">
      <div className="absolute inset-0 bg-gradient-to-br from-navy-50 to-teal-50 dark:from-navy-900 dark:to-navy-800 z-0"></div>
      <div className="container mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 md:space-y-8">
            <span className="inline-block px-4 py-2 bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300 rounded-full text-sm font-medium animate-pulse-scale">
              The Smart Way to Find Your Financial Advisor
            </span>
            <h1 id="hero-heading" className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-navy-900 dark:text-white leading-tight">
              Match with the Perfect Financial Advisor
            </h1>
            <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 max-w-xl">
              AdvisorWiz connects you with experienced financial advisors who match your specific needs and preferences.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              <Link to="/for-consumers" className="bg-white dark:bg-navy-800 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow flex flex-col items-center text-center">
                <User className="w-10 h-10 text-teal-600 dark:text-teal-400 mb-2" />
                <h3 className="font-medium text-navy-800 dark:text-slate-200">Consumers</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Find your perfect financial match</p>
              </Link>
              
              <Link to="/for-advisors" className="bg-white dark:bg-navy-800 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow flex flex-col items-center text-center">
                <Briefcase className="w-10 h-10 text-teal-600 dark:text-teal-400 mb-2" />
                <h3 className="font-medium text-navy-800 dark:text-slate-200">Advisors</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Grow your client base</p>
              </Link>
              
              <Link to="/for-firms" className="bg-white dark:bg-navy-800 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow flex flex-col items-center text-center">
                <Users className="w-10 h-10 text-teal-600 dark:text-teal-400 mb-2" />
                <h3 className="font-medium text-navy-800 dark:text-slate-200">Firms</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Scale your practice</p>
              </Link>
            </div>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <Link to="/onboarding" className="btn-primary inline-flex items-center" aria-label="Start finding your financial advisor">
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
              </Link>
              <a href="#how-it-works" className="btn-outline inline-flex items-center" aria-label="Learn more about our process">
                Learn More
              </a>
            </div>
            <div className="flex flex-wrap gap-4 pt-2">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-teal-600 dark:text-teal-400 mr-2" aria-hidden="true" />
                <span className="text-sm text-slate-700 dark:text-slate-300">Free for consumers</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-teal-600 dark:text-teal-400 mr-2" aria-hidden="true" />
                <span className="text-sm text-slate-700 dark:text-slate-300">Verified advisors</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-teal-600 dark:text-teal-400 mr-2" aria-hidden="true" />
                <span className="text-sm text-slate-700 dark:text-slate-300">Perfect match guarantee</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1551836022-d5d88e9218df" 
              alt="Financial advisor working with client" 
              className="rounded-2xl shadow-2xl transform rotate-3 animate-slide-up"
              width="600"
              height="400"
              loading="eager"
              fetchPriority="high"
            />
            <div className="absolute top-1/2 -left-8 transform -translate-y-1/2 bg-white dark:bg-navy-800 shadow-lg rounded-xl p-4 -rotate-6 animate-pulse-scale">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-teal-100 dark:bg-teal-900/50 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-teal-600 dark:text-teal-400" aria-hidden="true" />
                </div>
                <span className="font-medium text-navy-800 dark:text-slate-200">Perfect Match!</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
