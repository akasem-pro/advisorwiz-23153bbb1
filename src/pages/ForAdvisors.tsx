
import React from 'react';
import AnimatedRoute from '../components/ui/AnimatedRoute';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Shield, BarChart3, Users } from 'lucide-react';

const ForAdvisors: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <AnimatedRoute animation="fade">
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow pt-20">
          <section className="py-16 md:py-24 bg-gradient-to-b from-white to-slate-50">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="max-w-xl">
                  <h1 className="text-4xl md:text-5xl font-serif font-bold text-navy-900 mb-6">
                    Grow Your Advisory Practice
                  </h1>
                  <p className="text-xl text-slate-600 mb-10">
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
                
                <div className="rounded-xl overflow-hidden shadow-xl">
                  <img 
                    src="https://images.unsplash.com/photo-1604594849809-dfedbc827105" 
                    alt="Investment growth chart with financial planning" 
                    className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="py-16 bg-navy-50">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-serif font-bold text-center text-navy-900 mb-12">Why Join AdvisorWiz?</h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="w-14 h-14 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                    <Users className="h-7 w-7 text-teal-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Qualified Leads</h3>
                  <p className="text-slate-600">Connect with pre-qualified potential clients who are actively looking for financial guidance.</p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="w-14 h-14 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                    <BarChart3 className="h-7 w-7 text-teal-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Practice Growth</h3>
                  <p className="text-slate-600">Expand your practice efficiently with powerful tools designed for modern advisors.</p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="w-14 h-14 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                    <Shield className="h-7 w-7 text-teal-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Trust & Security</h3>
                  <p className="text-slate-600">Build client trust with our secure platform designed for financial professionals.</p>
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

export default ForAdvisors;
