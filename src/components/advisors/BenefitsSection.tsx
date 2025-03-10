
import React from 'react';
import { Users, BarChart3, Shield } from 'lucide-react';

const BenefitsSection: React.FC = () => {
  return (
    <section className="py-16 bg-navy-50" aria-labelledby="why-join-heading">
      <div className="container mx-auto px-4">
        <h2 id="why-join-heading" className="text-3xl font-serif font-bold text-center text-navy-900 mb-12">
          Why Join AdvisorWiz?
        </h2>
        
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
  );
};

export default BenefitsSection;
