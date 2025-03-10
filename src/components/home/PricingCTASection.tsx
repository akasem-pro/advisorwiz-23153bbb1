
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const PricingCTASection: React.FC = () => {
  return (
    <section className="py-12 bg-slate-50" aria-labelledby="pricing-heading">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 id="pricing-heading" className="text-3xl font-serif font-bold text-navy-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-slate-600 mb-6">
            Choose the plan that's right for your needs. Free for consumers, flexible options for advisors and firms.
          </p>
          <Link 
            to="/pricing" 
            className="inline-flex items-center bg-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors"
          >
            View Pricing Plans
            <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PricingCTASection;
