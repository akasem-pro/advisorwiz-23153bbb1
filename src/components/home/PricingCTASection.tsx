
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';

const PricingCTASection: React.FC = () => {
  return (
    <section className="py-12 bg-slate-50 dark:bg-navy-950" aria-labelledby="pricing-cta-heading">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 id="pricing-cta-heading" className="text-3xl font-serif font-bold text-navy-900 dark:text-white mb-4">
            Ready to Learn More About Our Pricing?
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">
            Explore our detailed pricing plans and find the option that best fits your needs, whether you're a consumer, advisor, or firm.
          </p>
          <Button asChild className="bg-teal-600 hover:bg-teal-700 text-white">
            <Link to="/pricing">
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
