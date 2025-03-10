import React from 'react';
import AnimatedRoute from '../components/ui/AnimatedRoute';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { useNavigate } from 'react-router-dom';
import { Building, Users, ArrowRight } from 'lucide-react';

const ForFirms: React.FC = () => {
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
                  Empower Your Financial Advisory Firm
                </h1>
                <p className="text-xl text-slate-600 mb-10 max-w-3xl mx-auto">
                  Create and manage multiple advisor profiles, streamline client matching, and grow your firm with our comprehensive platform.
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
          
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-serif font-bold text-navy-900 mb-12 text-center">
                Why Financial Firms Choose AdvisorWiz
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-slate-100">
                  <div className="w-14 h-14 rounded-lg bg-teal-50 flex items-center justify-center mb-4">
                    <Building className="h-7 w-7 text-teal-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-navy-900 mb-3">Centralized Management</h3>
                  <p className="text-slate-600">
                    Manage multiple advisor profiles from a single dashboard, streamlining your firm's operations.
                  </p>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-slate-100">
                  <div className="w-14 h-14 rounded-lg bg-indigo-50 flex items-center justify-center mb-4">
                    <Users className="h-7 w-7 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-navy-900 mb-3">Team Collaboration</h3>
                  <p className="text-slate-600">
                    Seamlessly onboard new advisors and assign clients based on expertise and capacity.
                  </p>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-slate-100">
                  <div className="w-14 h-14 rounded-lg bg-purple-50 flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-purple-600" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-navy-900 mb-3">Client Allocation</h3>
                  <p className="text-slate-600">
                    Efficiently match clients with the right advisors in your firm based on needs and expertise.
                  </p>
                </div>
              </div>
              
              <div className="mt-16 text-center">
                <h3 className="text-2xl font-serif font-bold text-navy-900 mb-6">
                  Ready to elevate your firm's client acquisition strategy?
                </h3>
                <button 
                  onClick={() => navigate('/firm-profile')}
                  className="btn-secondary inline-flex items-center"
                >
                  Create Your Firm Profile
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>
            </div>
          </section>
          
          <section className="py-16 bg-slate-50">
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 className="text-3xl font-serif font-bold text-navy-900 mb-8 text-center">
                How It Works
              </h2>
              
              <div className="space-y-8">
                <div className="bg-white rounded-xl shadow-sm p-6 flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center text-xl font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-navy-900 mb-2">Create Your Firm Profile</h3>
                    <p className="text-slate-600">
                      Set up your firm's profile with details about your organization, services, and specialties.
                    </p>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm p-6 flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center text-xl font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-navy-900 mb-2">Add Advisor Profiles</h3>
                    <p className="text-slate-600">
                      Create profiles for each advisor in your firm, highlighting their unique expertise and experience.
                    </p>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm p-6 flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center text-xl font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-navy-900 mb-2">Manage Client Matches</h3>
                    <p className="text-slate-600">
                      Connect with potential clients and assign them to the most suitable advisors within your firm.
                    </p>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm p-6 flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center text-xl font-bold">
                    4
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-navy-900 mb-2">Grow Your Business</h3>
                    <p className="text-slate-600">
                      Leverage analytics and client feedback to continuously improve your firm's service offerings.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-12 text-center">
                <button 
                  onClick={() => navigate('/firm-profile')}
                  className="btn-primary inline-flex items-center"
                >
                  Start Now
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

export default ForFirms;
