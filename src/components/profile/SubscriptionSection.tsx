
import React from 'react';
import { Check } from 'lucide-react';
import { ProfileSection } from './ProfileSection';
import { ExtendedAdvisorProfileForm, Section } from '../../types/advisorTypes';

interface SubscriptionSectionProps {
  section: Section;
  formData: ExtendedAdvisorProfileForm;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  toggleSection: (id: string) => void;
  handleSubscriptionSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  subscriptionPlans: Array<{
    id: string;
    name: string;
    price: number;
    features: string[];
  }>;
}

export const SubscriptionSection: React.FC<SubscriptionSectionProps> = ({
  section,
  formData,
  handleChange,
  toggleSection,
  handleSubscriptionSelect,
  subscriptionPlans
}) => {
  return (
    <ProfileSection section={section} toggleSection={toggleSection}>
      <div className="p-4 border-t border-slate-200 space-y-4">
        <div>
          <label htmlFor="subscriptionPlan" className="block text-sm font-medium text-navy-800 mb-3">
            Select Your Subscription Plan
          </label>
          
          <div className="grid md:grid-cols-3 gap-4">
            {subscriptionPlans.map(plan => (
              <div 
                key={plan.id}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  formData.subscriptionPlan === plan.id 
                    ? 'border-teal-500 bg-teal-50' 
                    : 'border-slate-200 hover:border-slate-300'
                }`}
                onClick={() => {
                  const e = {
                    target: {
                      name: "subscriptionPlan",
                      value: plan.id
                    }
                  } as React.ChangeEvent<HTMLSelectElement>;
                  handleSubscriptionSelect(e);
                }}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-navy-800">{plan.name}</h4>
                  {formData.subscriptionPlan === plan.id && (
                    <div className="bg-teal-500 text-white rounded-full p-1">
                      <Check className="h-4 w-4" />
                    </div>
                  )}
                </div>
                <div className="text-2xl font-bold mb-3">${plan.price}<span className="text-sm font-normal text-slate-500">/mo</span></div>
                <ul className="space-y-1 text-sm">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <Check className="h-4 w-4 text-teal-500 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ProfileSection>
  );
};
