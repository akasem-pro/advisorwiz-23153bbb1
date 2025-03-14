
import React from 'react';
import { Shield, Users, Award, Clock } from 'lucide-react';

const PricingTrustSignals: React.FC = () => {
  return (
    <div className="py-8 border-y border-slate-200 my-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center">
            <Shield className="h-10 w-10 text-teal-600 mb-3" />
            <h3 className="text-lg font-medium text-navy-900 mb-1">Trusted Platform</h3>
            <p className="text-sm text-slate-600">Secure and reliable service</p>
          </div>
          
          <div className="flex flex-col items-center">
            <Users className="h-10 w-10 text-teal-600 mb-3" />
            <h3 className="text-lg font-medium text-navy-900 mb-1">10,000+ Users</h3>
            <p className="text-sm text-slate-600">Growing community</p>
          </div>
          
          <div className="flex flex-col items-center">
            <Award className="h-10 w-10 text-teal-600 mb-3" />
            <h3 className="text-lg font-medium text-navy-900 mb-1">Vetted Advisors</h3>
            <p className="text-sm text-slate-600">Qualified professionals</p>
          </div>
          
          <div className="flex flex-col items-center">
            <Clock className="h-10 w-10 text-teal-600 mb-3" />
            <h3 className="text-lg font-medium text-navy-900 mb-1">Quick Setup</h3>
            <p className="text-sm text-slate-600">Get started in minutes</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingTrustSignals;
