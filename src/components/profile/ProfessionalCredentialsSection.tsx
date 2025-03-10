
import React from 'react';
import { Input } from '../ui/input';
import { Checkbox } from '../ui/checkbox';
import { ProfileSection } from './ProfileSection';
import { ExtendedAdvisorProfileForm, Section } from '../../types/advisorTypes';

interface ProfessionalCredentialsSectionProps {
  section: Section;
  formData: ExtendedAdvisorProfileForm;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  toggleSection: (id: string) => void;
  licensingBodies: Array<{ value: string; label: string }>;
  experienceOptions: Array<{ value: string; label: string }>;
}

export const ProfessionalCredentialsSection: React.FC<ProfessionalCredentialsSectionProps> = ({
  section,
  formData,
  handleChange,
  toggleSection,
  licensingBodies,
  experienceOptions
}) => {
  return (
    <ProfileSection section={section} toggleSection={toggleSection}>
      <div className="p-4 border-t border-slate-200 space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="licensingBody" className="block text-sm font-medium text-navy-800 mb-1">
              Licensing Body
            </label>
            <select
              id="licensingBody"
              name="licensingBody"
              value={formData.licensingBody}
              onChange={handleChange}
              className="input-field"
            >
              <option value="">Select licensing body</option>
              {licensingBodies.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="registrationNumber" className="block text-sm font-medium text-navy-800 mb-1">
              Registration Number
            </label>
            <Input
              type="text"
              id="registrationNumber"
              name="registrationNumber"
              value={formData.registrationNumber}
              onChange={handleChange}
              placeholder="Your registration number"
            />
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="yearsOfExperience" className="block text-sm font-medium text-navy-800 mb-1">
              Years of Experience
            </label>
            <select
              id="yearsOfExperience"
              name="yearsOfExperience"
              value={formData.yearsOfExperience}
              onChange={handleChange}
              className="input-field"
            >
              <option value="">Select years of experience</option>
              {experienceOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <label htmlFor="hasViolations" className="text-sm font-medium text-navy-800">
              Has Violations
            </label>
            <Checkbox
              id="hasViolations"
              name="hasViolations"
              checked={formData.hasViolations}
              onCheckedChange={(checked) => {
                const e = {
                  target: {
                    name: "hasViolations",
                    type: "checkbox",
                    checked: !!checked
                  }
                } as React.ChangeEvent<HTMLInputElement>;
                handleChange(e);
              }}
            />
          </div>
        </div>
      </div>
    </ProfileSection>
  );
};
