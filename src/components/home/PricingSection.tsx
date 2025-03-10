
import React from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';

type PricingTier = {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  popular?: boolean;
  audience: string;
};

const pricingTiers: PricingTier[] = [
  {
    id: 'consumers',
    name: 'For Consumers',
    price: 'Free',
    description: 'Find your perfect financial advisor match at no cost.',
    features: [
      'Access to our advisor matching algorithm',
      'Browse advisor profiles and credentials',
      'Schedule initial consultations',
      'Secure messaging with potential advisors',
      'Unlimited advisor matches',
      'No hidden fees or commitments'
    ],
    cta: 'Get Started',
    audience: 'Individual investors and consumers'
  },
  {
    id: 'advisors',
    name: 'For Advisors',
    price: '$199',
    description: 'Connect with qualified clients seeking your expertise.',
    features: [
      'Detailed professional profile',
      'Lead generation and matching',
      'Client messaging system',
      'Scheduling and appointment tools',
      'Performance analytics dashboard',
      'Marketing toolkit and resources'
    ],
    cta: 'Join as Advisor',
    popular: true,
    audience: 'Independent financial advisors'
  },
  {
    id: 'firms',
    name: 'For Firms',
    price: 'Custom',
    description: 'Enterprise solutions for advisory firms and institutions.',
    features: [
      'Multiple advisor profiles',
      'Team management dashboard',
      'Custom branding options',
      'Advanced analytics and reporting',
      'API integration capabilities',
      'Dedicated account management'
    ],
    cta: 'Contact for Pricing',
    audience: 'Advisory firms and wealth management companies'
  }
];

const PricingSection: React.FC = () => {
  return (
    <section className="py-16 bg-white" aria-labelledby="pricing-heading">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 id="pricing-heading" className="text-3xl font-serif font-bold text-navy-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Choose the plan that's right for your needs. Free for consumers, flexible options for advisors and firms.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingTiers.map((tier) => (
            <div 
              key={tier.id}
              className={`rounded-xl overflow-hidden border ${
                tier.popular 
                  ? 'border-teal-500 shadow-lg relative' 
                  : 'border-slate-200 shadow-sm'
              }`}
            >
              {tier.popular && (
                <div className="bg-teal-500 text-white text-xs font-bold px-4 py-1 absolute top-0 right-0 rounded-bl-lg">
                  MOST POPULAR
                </div>
              )}
              <div className="p-6 md:p-8">
                <h3 className="text-xl font-bold text-navy-900 mb-2">{tier.name}</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-3xl font-bold text-navy-900">{tier.price}</span>
                  {tier.price !== 'Free' && tier.price !== 'Custom' && (
                    <span className="text-slate-600 ml-1">/month</span>
                  )}
                </div>
                <p className="text-slate-600 mb-6">{tier.description}</p>
                <p className="text-sm text-slate-500 italic mb-6">For {tier.audience}</p>
                
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-5 h-5 text-teal-500 mt-0.5 mr-3 flex-shrink-0" aria-hidden="true" />
                      <span className="text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  asChild
                  className={`w-full justify-center ${
                    tier.popular 
                      ? 'bg-teal-600 hover:bg-teal-700 text-white' 
                      : 'bg-navy-700 hover:bg-navy-800'
                  }`}
                >
                  <Link to={tier.id === 'firms' ? '/contact' : '/onboarding'}>
                    {tier.cta}
                    <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
