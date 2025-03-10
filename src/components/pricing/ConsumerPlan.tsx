
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import FeatureItem from './FeatureItem';
import PriceDisplay from './PriceDisplay';

const ConsumerPlan: React.FC = () => {
  return (
    <div className="max-w-md mx-auto">
      <div className="rounded-xl p-6 border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md">
        <h3 className="text-xl font-bold">For Consumers</h3>
        <p className="text-slate-500 mt-2 h-12">Find your perfect financial advisor, completely free.</p>
        
        <PriceDisplay price={0} period="monthly" />
        
        <div className="border-t border-slate-200 my-6 pt-6">
          <p className="font-medium mb-4">Included Features</p>
          <div className="space-y-2">
            <FeatureItem included={true} text="Advisor matching" />
            <FeatureItem included={true} text="Secure communication" />
            <FeatureItem included={true} text="Appointment scheduling" />
            <FeatureItem included={true} text="Financial profile creation" />
            <FeatureItem included={true} text="Advisor reviews" />
          </div>
        </div>
        
        <Button 
          className="w-full bg-navy-800 hover:bg-navy-900"
          onClick={() => window.location.href = '/onboarding'}
        >
          Get Started <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ConsumerPlan;
