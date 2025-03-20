
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CTASection: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <section className="py-12 bg-navy-800 dark:bg-[#1A1F2C] text-white" aria-labelledby="cta-heading">
      <div className="container mx-auto px-4 text-center">
        <h2 id="cta-heading" className="text-3xl font-serif font-bold mb-4 text-white">
          Ready to Grow Your Advisory Practice?
        </h2>
        <p className="text-lg text-slate-200 mb-8 max-w-2xl mx-auto">
          Join thousands of successful advisors who are growing their business with AdvisorWiz.
        </p>
        <button 
          onClick={() => navigate('/onboarding')}
          className="btn-accent inline-flex items-center text-lg dark:bg-teal-600 dark:hover:bg-teal-700 dark:text-white"
          aria-label="Begin advisor registration"
        >
          Get Started Today
          <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
};

export default CTASection;
