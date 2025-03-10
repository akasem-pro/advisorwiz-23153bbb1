
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-slate-50" aria-labelledby="advisor-heading">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="max-w-xl">
            <h1 id="advisor-heading" className="text-4xl md:text-5xl font-serif font-bold text-navy-900 mb-6">
              Grow Your Advisory Practice
            </h1>
            <p className="text-xl text-slate-600 mb-10">
              Connect with qualified clients and streamline your practice with our advanced platform. Join thousands of successful advisors already using AdvisorWiz.
            </p>
            
            <button 
              onClick={() => navigate('/onboarding')}
              className="btn-primary inline-flex items-center text-lg"
              aria-label="Start advisor registration process"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          
          <div className="rounded-xl overflow-hidden shadow-xl">
            <img 
              src="https://images.unsplash.com/photo-1604594849809-dfedbc827105" 
              alt="Financial advisor discussing investment strategy with clients" 
              className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500"
              width="600"
              height="400"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
