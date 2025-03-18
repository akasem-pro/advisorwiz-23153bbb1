
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';

interface PricingHeaderProps {
  userType: 'consumer' | 'advisor' | 'enterprise';
  setUserType: (value: 'consumer' | 'advisor' | 'enterprise') => void;
}

const PricingHeader: React.FC<PricingHeaderProps> = ({ userType, setUserType }) => {
  return (
    <div className="text-center max-w-3xl mx-auto mb-8">
      <h1 className="text-4xl md:text-5xl font-serif font-bold text-navy-900 dark:text-white mb-6">
        Simple, Transparent Pricing
      </h1>
      <p className="text-xl text-slate-600 dark:text-slate-300 mb-8">
        Choose the plan that's right for your needs.
      </p>
      
      <Tabs 
        defaultValue="consumer" 
        value={userType} 
        onValueChange={(value) => setUserType(value as 'consumer' | 'advisor' | 'enterprise')} 
        className="w-full max-w-md mx-auto"
      >
        <TabsList className="grid w-full grid-cols-3 mb-8 bg-slate-100 dark:bg-navy-700">
          <TabsTrigger 
            value="consumer" 
            className="data-[state=active]:bg-white dark:data-[state=active]:bg-navy-600 data-[state=active]:text-navy-900 dark:data-[state=active]:text-white"
          >
            Consumer
          </TabsTrigger>
          <TabsTrigger 
            value="advisor"
            className="data-[state=active]:bg-white dark:data-[state=active]:bg-navy-600 data-[state=active]:text-navy-900 dark:data-[state=active]:text-white"
          >
            Advisor
          </TabsTrigger>
          <TabsTrigger 
            value="enterprise"
            className="data-[state=active]:bg-white dark:data-[state=active]:bg-navy-600 data-[state=active]:text-navy-900 dark:data-[state=active]:text-white"
          >
            Enterprise
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default PricingHeader;
