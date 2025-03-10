
import React from 'react';
import { Checkbox } from '../ui/checkbox';
import { ProfileSection } from './ProfileSection';
import { ExtendedAdvisorProfileForm, Section } from '../../types/advisorTypes';

interface VerificationSectionProps {
  section: Section;
  formData: ExtendedAdvisorProfileForm;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  toggleSection: (id: string) => void;
}

export const VerificationSection: React.FC<VerificationSectionProps> = ({
  section,
  formData,
  handleChange,
  toggleSection
}) => {
  return (
    <ProfileSection section={section} toggleSection={toggleSection}>
      <div className="p-4 border-t border-slate-200 space-y-4">
        <div className="flex items-start space-x-2">
          <div className="mt-1">
            <Checkbox
              id="consentToBackgroundCheck"
              name="consentToBackgroundCheck"
              checked={formData.consentToBackgroundCheck}
              onCheckedChange={(checked) => {
                const e = {
                  target: {
                    name: "consentToBackgroundCheck",
                    type: "checkbox",
                    checked: !!checked
                  }
                } as React.ChangeEvent<HTMLInputElement>;
                handleChange(e);
              }}
            />
          </div>
          <div>
            <label htmlFor="consentToBackgroundCheck" className="block text-sm font-medium text-navy-800 mb-1">
              Consent to Background Check
            </label>
            <p className="text-sm text-slate-500">
              I consent to a professional background check to verify my credentials and regulatory standing.
            </p>
          </div>
        </div>
      </div>
    </ProfileSection>
  );
};
