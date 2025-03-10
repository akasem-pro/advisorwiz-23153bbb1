
import React from 'react';
import { ProfileSection } from './ProfileSection';
import { ExtendedAdvisorProfileForm, Section } from '../../types/advisorTypes';
import { ServiceCategory } from '../../context/UserContext';
import { Check } from 'lucide-react';

interface ExpertiseSectionProps {
  section: Section;
  formData: ExtendedAdvisorProfileForm;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  toggleSection: (id: string) => void;
  handleExpertiseChange: (expertise: ServiceCategory) => void;
  isExpertiseSelected: (expertise: ServiceCategory) => boolean;
  serviceCategories: Array<{ value: ServiceCategory; label: string }>;
}

export const ExpertiseSection: React.FC<ExpertiseSectionProps> = ({
  section,
  formData,
  handleChange,
  toggleSection,
  handleExpertiseChange,
  isExpertiseSelected,
  serviceCategories,
}) => {
  return (
    <ProfileSection section={section} toggleSection={toggleSection}>
      <div className="p-4 border-t border-slate-200 space-y-4">
        <div>
          <h4 className="font-medium text-navy-800 mb-2">Areas of Expertise</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {serviceCategories.map(category => (
              <div 
                key={category.value}
                className={`p-3 rounded border cursor-pointer flex justify-between items-center ${
                  isExpertiseSelected(category.value) 
                    ? 'bg-teal-50 border-teal-300' 
                    : 'bg-white border-slate-200 hover:bg-slate-50'
                }`}
                onClick={() => handleExpertiseChange(category.value)}
              >
                <span>{category.label}</span>
                {isExpertiseSelected(category.value) && (
                  <Check className="h-4 w-4 text-teal-500" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </ProfileSection>
  );
};
