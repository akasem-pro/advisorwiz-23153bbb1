
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CTASection: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <section className="py-12 bg-navy-800 dark:bg-[#1A1F2C] text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-serif font-bold mb-6 text-white">
          Ready to Transform Your Advisory Firm?
        </h2>
        <p className="text-lg text-slate-200 mb-8 max-w-2xl mx-auto">
          Join leading financial advisory firms already using AdvisorWiz to streamline operations and grow their business.
        </p>
        <div className="space-x-4">
          <button 
            onClick={() => navigate('/onboarding')}
            className="btn-accent inline-flex items-center"
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
          <Link 
            to="/for-advisors" 
            className="btn-outline-white inline-flex items-center border border-white text-white hover:bg-white/10 py-3 px-6 rounded-lg transition-all"
          >
            For Individual Advisors
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
