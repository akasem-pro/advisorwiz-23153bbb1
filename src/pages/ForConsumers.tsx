
import React from 'react';
import { AnimatedRoute } from '../components/ui/AnimatedRoute';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle, Shield, Compass } from 'lucide-react';

const ForConsumers: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <AnimatedRoute animation="fade">
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow pt-20">
          <section className="py-16 md:py-24 bg-gradient-to-b from-white to-slate-50">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="order-2 md:order-1 rounded-xl overflow-hidden shadow-xl">
                  <img 
                    src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e" 
                    alt="Person planning financial future with charts" 
                    className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                <div className="order-1 md:order-2 max-w-xl">
                  <h1 className="text-4xl md:text-5xl font-serif font-bold text-navy-900 mb-6">
                    Find Your Perfect Financial Advisor
                  </h1>
                  <p className="text-xl text-slate-600 mb-10">
                    Connect with qualified financial advisors that match your specific needs and goals.
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
            </div>
          </section>

          <section className="py-16 bg-navy-50">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-serif font-bold text-center text-navy-900 mb-12">Your Financial Journey Made Simple</h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="w-14 h-14 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                    <Compass className="h-7 w-7 text-teal-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Personalized Matching</h3>
                  <p className="text-slate-600">Get matched with advisors based on your specific financial goals and preferences.</p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="w-14 h-14 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="h-7 w-7 text-teal-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Verified Professionals</h3>
                  <p className="text-slate-600">Connect with pre-vetted, qualified financial advisors with verified credentials.</p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="w-14 h-14 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                    <Shield className="h-7 w-7 text-teal-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Secure Communication</h3>
                  <p className="text-slate-600">Communicate safely and securely within our protected platform.</p>
                </div>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </AnimatedRoute>
  );
};

export default ForConsumers;
