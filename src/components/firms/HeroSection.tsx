
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-slate-50 dark:from-navy-900 dark:to-navy-950">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-navy-900 dark:text-white mb-6">
            Empower Your Financial Advisory Firm
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-10 max-w-3xl mx-auto">
            Create and manage multiple advisor profiles, streamline client matching, and grow your firm with our comprehensive platform.
          </p>
          
          <button 
            onClick={() => navigate('/onboarding')}
            className="btn-primary inline-flex items-center text-lg dark:bg-teal-600 dark:hover:bg-teal-700"
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
          
          <div className="mt-8 text-sm text-slate-500 dark:text-slate-400">
            <p>
              Already have an account? <Link to="/firm-profile" className="text-teal-600 dark:text-teal-400 hover:underline">Sign in to your firm dashboard</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
