
import React from 'react';
import { Checkbox } from '../ui/checkbox';
import { ProfileSection } from './ProfileSection';
import { ExtendedAdvisorProfileForm, Section } from '../../types/advisorTypes';

interface ConsentSectionProps {
  section: Section;
  formData: ExtendedAdvisorProfileForm;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  toggleSection: (id: string) => void;
}

export const ConsentSection: React.FC<ConsentSectionProps> = ({
  section,
  formData,
  handleChange,
  toggleSection
}) => {
  // Helper function to create a checkbox change event
  const createCheckboxEvent = (name: string, checked: boolean) => {
    return {
      target: {
        name,
        type: "checkbox",
        checked
      }
    } as React.ChangeEvent<HTMLInputElement>;
  };

  return (
    <ProfileSection section={section} toggleSection={toggleSection}>
      <div className="p-4 border-t border-slate-200 space-y-4">
        <div className="flex items-start space-x-2">
          <div className="mt-1">
            <Checkbox
              id="consentToTerms"
              name="consentToTerms"
              checked={formData.consentToTerms}
              onCheckedChange={(checked) => {
                handleChange(createCheckboxEvent("consentToTerms", !!checked));
              }}
            />
          </div>
          <div>
            <label htmlFor="consentToTerms" className="block text-sm font-medium text-navy-800 mb-1">
              Terms of Service
            </label>
            <p className="text-sm text-slate-500">
              I agree to the Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
        
        <div className="flex items-start space-x-2">
          <div className="mt-1">
            <Checkbox
              id="consentToMarketing"
              name="consentToMarketing"
              checked={formData.consentToMarketing}
              onCheckedChange={(checked) => {
                handleChange(createCheckboxEvent("consentToMarketing", !!checked));
              }}
            />
          </div>
          <div>
            <label htmlFor="consentToMarketing" className="block text-sm font-medium text-navy-800 mb-1">
              Marketing Communications
            </label>
            <p className="text-sm text-slate-500">
              I agree to receive marketing communications about products, services, and events.
            </p>
          </div>
        </div>
        
        <div className="flex items-start space-x-2">
          <div className="mt-1">
            <Checkbox
              id="consentToContact"
              name="consentToContact"
              checked={formData.consentToContact}
              onCheckedChange={(checked) => {
                handleChange(createCheckboxEvent("consentToContact", !!checked));
              }}
            />
          </div>
          <div>
            <label htmlFor="consentToContact" className="block text-sm font-medium text-navy-800 mb-1">
              Contact Consent
            </label>
            <p className="text-sm text-slate-500">
              I consent to being contacted by potential clients through the platform.
            </p>
          </div>
        </div>
        
        <div className="flex items-start space-x-2">
          <div className="mt-1">
            <Checkbox
              id="consentToDataProcessing"
              name="consentToDataProcessing"
              checked={formData.consentToDataProcessing}
              onCheckedChange={(checked) => {
                handleChange(createCheckboxEvent("consentToDataProcessing", !!checked));
              }}
            />
          </div>
          <div>
            <label htmlFor="consentToDataProcessing" className="block text-sm font-medium text-navy-800 mb-1">
              Data Processing
            </label>
            <p className="text-sm text-slate-500">
              I consent to my personal and professional data being processed according to the Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </ProfileSection>
  );
};
