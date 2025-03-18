
import React from 'react';

interface PricingValuePropositionProps {
  userType: 'consumer' | 'advisor' | 'enterprise';
}

const PricingValueProposition: React.FC<PricingValuePropositionProps> = ({ userType }) => {
  return (
    <div className="max-w-3xl mx-auto mb-16 text-center">
      {userType === 'consumer' && (
        <p className="text-lg text-slate-700 dark:text-slate-200">
          AdvisorWiz is completely <b>free</b> for consumers. We believe everyone deserves access to quality 
          financial guidance without barriers. Find your perfect advisor match today.
        </p>
      )}
      
      {userType === 'advisor' && (
        <p className="text-lg text-slate-700 dark:text-slate-200">
          Build your practice with our suite of advisor tools. Get matched with qualified leads, 
          streamline your workflow, and grow your business.
        </p>
      )}
      
      {userType === 'enterprise' && (
        <p className="text-lg text-slate-700 dark:text-slate-200">
          Enterprise solutions designed for advisory firms of all sizes. Manage multiple advisors, 
          access advanced analytics, and leverage our platform to scale your business.
        </p>
      )}
    </div>
  );
};

export default PricingValueProposition;
