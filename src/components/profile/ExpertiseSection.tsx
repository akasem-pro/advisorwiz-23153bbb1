
import React from 'react';
import { ProfileSection } from './ProfileSection';
import { ExtendedAdvisorProfileForm, Section } from '../../types/advisorTypes';
import { ServiceCategory } from '../../context/UserContext';
import { Check, Info } from 'lucide-react';
import { Tooltip } from '../ui/tooltip';

interface ExpertiseSectionProps {
  section: Section;
  formData: ExtendedAdvisorProfileForm;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  toggleSection: (id: string) => void;
  handleExpertiseChange: (expertise: ServiceCategory) => void;
  isExpertiseSelected: (expertise: ServiceCategory) => boolean;
  serviceCategories: Array<{ value: ServiceCategory; label: string; description: string }>;
}

const serviceCategoryDescriptions = {
  retirement: "Retirement planning, pension optimization, and retirement income strategies",
  investment: "Portfolio management, asset allocation, and market analysis",
  tax: "Tax planning, optimization strategies, and tax implications of investments",
  estate: "Estate planning, wealth transfer, and inheritance tax minimization",
  business: "Business succession planning, business valuation, and key person insurance",
  insurance: "Life, disability, critical illness, and long-term care insurance needs",
  philanthropic: "Charitable giving strategies, donor-advised funds, and foundation setup",
  education: "Education savings, RESP optimization, and financial aid planning"
};

export const ExpertiseSection: React.FC<ExpertiseSectionProps> = ({
  section,
  formData,
  handleChange,
  toggleSection,
  handleExpertiseChange,
  isExpertiseSelected,
  serviceCategories,
}) => {
  // Calculate how many categories are selected
  const selectedCount = serviceCategories.filter(category => 
    isExpertiseSelected(category.value)
  ).length;

  return (
    <ProfileSection section={section} toggleSection={toggleSection}>
      <div className="p-4 border-t border-slate-200 space-y-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-medium text-navy-800">Areas of Expertise</h4>
            <span className="text-sm text-slate-500">
              {selectedCount} of {serviceCategories.length} selected
            </span>
          </div>
          
          <p className="text-sm text-slate-600 mb-4">
            Select the financial services you specialize in. Your expertise will help us match you with clients who need your specific skills.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {serviceCategories.map(category => (
              <div 
                key={category.value}
                className={`p-3 rounded border cursor-pointer flex justify-between items-center transition-colors ${
                  isExpertiseSelected(category.value) 
                    ? 'bg-teal-50 border-teal-300 shadow-sm' 
                    : 'bg-white border-slate-200 hover:bg-slate-50'
                }`}
                onClick={() => handleExpertiseChange(category.value)}
              >
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-navy-800">{category.label}</span>
                  <Tooltip content={serviceCategoryDescriptions[category.value]} side="top">
                    <Info className="h-3.5 w-3.5 text-slate-400" />
                  </Tooltip>
                </div>
                {isExpertiseSelected(category.value) && (
                  <Check className="h-4 w-4 text-teal-500" />
                )}
              </div>
            ))}
          </div>
          
          {selectedCount === 0 && (
            <div className="mt-3 p-2 bg-amber-50 border border-amber-200 rounded text-sm text-amber-700">
              Please select at least one area of expertise to improve your matching with potential clients.
            </div>
          )}
          
          {selectedCount > 0 && selectedCount < 3 && (
            <div className="mt-3 p-2 bg-blue-50 border border-blue-200 rounded text-sm text-blue-700">
              Tip: Adding more areas of expertise increases your chances of matching with more clients.
            </div>
          )}
        </div>
      </div>
    </ProfileSection>
  );
};
