
import React from 'react';
import { Shield, Star, Clock, CreditCard, Lock } from 'lucide-react';

const PricingTrustSignals: React.FC = () => {
  const trustSignals = [
    {
      icon: <Shield className="h-6 w-6 text-teal-500" />,
      title: 'Secure Platform',
      description: 'Enterprise-grade security to protect your data.'
    },
    {
      icon: <Star className="h-6 w-6 text-teal-500" />,
      title: '4.9/5 Rating',
      description: 'From over 2,000 satisfied users.'
    },
    {
      icon: <Clock className="h-6 w-6 text-teal-500" />,
      title: '24/7 Support',
      description: 'Our team is always available to help.'
    },
    {
      icon: <CreditCard className="h-6 w-6 text-teal-500" />,
      title: 'Easy Billing',
      description: 'Transparent pricing with no hidden fees.'
    },
    {
      icon: <Lock className="h-6 w-6 text-teal-500" />,
      title: 'Privacy First',
      description: 'We never sell your personal information.'
    }
  ];

  return (
    <div className="mt-16 py-8 px-4 rounded-xl bg-slate-50 dark:bg-navy-700">
      <h3 className="text-xl font-bold text-center text-navy-900 dark:text-white mb-8">
        Trusted by Thousands of Financial Professionals
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
        {trustSignals.map((signal, index) => (
          <div key={index} className="text-center px-2">
            <div className="flex justify-center mb-2">
              {signal.icon}
            </div>
            <h4 className="font-medium mb-1 text-navy-900 dark:text-white">{signal.title}</h4>
            <p className="text-sm text-slate-500 dark:text-slate-300">{signal.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingTrustSignals;
