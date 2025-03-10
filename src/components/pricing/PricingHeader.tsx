
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';

interface PricingHeaderProps {
  userType: 'consumer' | 'advisor' | 'enterprise';
  setUserType: (value: 'consumer' | 'advisor' | 'enterprise') => void;
}

const PricingHeader: React.FC<PricingHeaderProps> = ({ userType, setUserType }) => {
  return (
    <div className="text-center max-w-3xl mx-auto mb-8">
      <h1 className="text-4xl md:text-5xl font-serif font-bold text-navy-900 mb-6">
        Simple, Transparent Pricing
      </h1>
      <p className="text-xl text-slate-600 mb-8">
        Choose the plan that's right for your needs.
      </p>
      
      <Tabs 
        defaultValue="consumer" 
        value={userType} 
        onValueChange={(value) => setUserType(value as 'consumer' | 'advisor' | 'enterprise')} 
        className="w-full max-w-md mx-auto"
      >
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="consumer">Consumer</TabsTrigger>
          <TabsTrigger value="advisor">Advisor</TabsTrigger>
          <TabsTrigger value="enterprise">Enterprise</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default PricingHeader;
