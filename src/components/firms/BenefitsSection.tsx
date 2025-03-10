
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Building, Users, ArrowRight } from 'lucide-react';

const BenefitsSection: React.FC = () => {
  const navigate = useNavigate();
  
  return (
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
          <div className="space-x-4">
            <button 
              onClick={() => navigate('/firm-profile')}
              className="btn-secondary inline-flex items-center"
            >
              Create Your Firm Profile
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <Link 
              to="/pricing" 
              className="btn-outline inline-flex items-center"
            >
              View Enterprise Pricing
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
