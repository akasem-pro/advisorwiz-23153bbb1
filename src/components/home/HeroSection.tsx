
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden" aria-labelledby="hero-heading">
      <div className="absolute inset-0 bg-gradient-to-br from-navy-50 to-teal-50 z-0"></div>
      <div className="container mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 md:space-y-8">
            <span className="inline-block px-4 py-2 bg-teal-100 text-teal-700 rounded-full text-sm font-medium animate-pulse-scale">
              The Smart Way to Find Your Financial Advisor
            </span>
            <h1 id="hero-heading" className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-navy-900 leading-tight">
              Match with the Perfect Financial Advisor
            </h1>
            <p className="text-lg md:text-xl text-slate-700 max-w-xl">
              AdvisorWiz connects you with experienced financial advisors who match your specific needs and preferences.
            </p>
            <div className="flex flex-wrap gap-4">
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
                <CheckCircle className="w-5 h-5 text-teal-600 mr-2" aria-hidden="true" />
                <span className="text-sm text-slate-700">Free for consumers</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-teal-600 mr-2" aria-hidden="true" />
                <span className="text-sm text-slate-700">Verified advisors</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-teal-600 mr-2" aria-hidden="true" />
                <span className="text-sm text-slate-700">Perfect match guarantee</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f" 
              alt="Financial growth chart with upward trend" 
              className="rounded-2xl shadow-2xl transform rotate-3 animate-slide-up"
              width="600"
              height="400"
              loading="eager"
              fetchpriority="high"
            />
            <div className="absolute top-1/2 -left-8 transform -translate-y-1/2 bg-white shadow-lg rounded-xl p-4 -rotate-6 animate-pulse-scale">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-teal-600" aria-hidden="true" />
                </div>
                <span className="font-medium text-navy-800">Perfect Match!</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
