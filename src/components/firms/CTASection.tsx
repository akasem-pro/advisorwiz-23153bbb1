
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CTASection: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <section className="py-12 bg-navy-800 dark:bg-navy-950 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-serif font-bold mb-4 text-white">
          Ready to Elevate Your Advisory Firm?
        </h2>
        <p className="text-lg text-slate-200 mb-8 max-w-2xl mx-auto">
          Join AdvisorWiz today and transform how you manage your firm, advisors, and client relationships.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button 
            onClick={() => navigate('/onboarding')}
            className="btn-accent inline-flex items-center text-lg dark:bg-teal-600 dark:hover:bg-teal-700 dark:text-white"
          >
            Create Your Firm Account
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
          <button 
            onClick={() => navigate('/pricing')}
            className="btn-outline border-white text-white hover:bg-navy-700 dark:hover:bg-navy-800 inline-flex items-center text-lg"
          >
            View Enterprise Pricing
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
