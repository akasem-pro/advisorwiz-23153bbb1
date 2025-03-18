
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const MainCTASection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-navy-800 to-navy-900 dark:from-[#1A1F2C] dark:to-[#17213c] text-white" aria-labelledby="cta-heading">
      <div className="container mx-auto text-center max-w-3xl">
        <h2 id="cta-heading" className="text-3xl md:text-4xl font-serif font-bold text-white">
          Ready to Find Your Financial Advisor?
        </h2>
        <p className="mt-4 text-lg text-slate-300 mb-8">
          Join thousands of consumers who have found their perfect financial match through AdvisorWiz.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link 
            to="/onboarding"
            className="btn-accent inline-flex items-center justify-center"
          >
            Get Started Now
            <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
          </Link>
          <Link 
            to="/pricing"
            className="inline-flex items-center justify-center py-3 px-6 bg-transparent border border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors"
          >
            View Pricing
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MainCTASection;
