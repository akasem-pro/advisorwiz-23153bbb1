
import React from 'react';
import { AnimatedRoute } from '../components/ui/AnimatedRoute';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const ForAdvisors: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <AnimatedRoute animation="fade">
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow pt-20">
          <section className="py-16 md:py-24 bg-gradient-to-b from-white to-slate-50">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-navy-900 mb-6">
                  Grow Your Advisory Practice
                </h1>
                <p className="text-xl text-slate-600 mb-10 max-w-3xl mx-auto">
                  Connect with qualified clients and streamline your practice with our advanced platform.
                </p>
                
                <button 
                  onClick={() => navigate('/onboarding')}
                  className="btn-primary inline-flex items-center text-lg"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </AnimatedRoute>
  );
};

export default ForAdvisors;
