
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';

const PricingCTASection: React.FC = () => {
  return (
    <section className="py-16 bg-slate-100 dark:bg-navy-900" aria-labelledby="pricing-cta-heading">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 id="pricing-cta-heading" className="text-3xl md:text-4xl font-serif font-bold text-navy-900 dark:text-white mb-5 leading-tight">
            Ready to Learn More About Our Pricing?
          </h2>
          <p className="text-lg text-slate-700 dark:text-slate-300 mb-8 leading-relaxed">
            Explore our detailed pricing plans and find the option that best fits your needs, whether you're a consumer, advisor, or firm.
          </p>
          <Button asChild className="bg-teal-600 hover:bg-teal-700 dark:bg-teal-600 dark:hover:bg-teal-700 text-white px-8 py-3 h-auto text-lg shadow-md font-medium">
            <Link to="/pricing" className="inline-flex items-center">
              View Detailed Pricing
              <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PricingCTASection;
