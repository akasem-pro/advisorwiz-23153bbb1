
import React from 'react';
import { Section } from '../../types/advisorTypes';
import { BasicInfoSection } from './BasicInfoSection';
import { ProfessionalCredentialsSection } from './ProfessionalCredentialsSection';
import { ExpertiseSection } from './ExpertiseSection';
import { FeeStructureSection } from './FeeStructureSection';
import { MarketingSection } from './MarketingSection';
import { VerificationSection } from './VerificationSection';
import { SubscriptionSection } from './SubscriptionSection';
import { ConsentSection } from './ConsentSection';
import { ProfileSection } from './ProfileSection';
import { ServiceCategory } from '../../context/UserContext';

// Types for licenses, experiences, etc.
interface ProfileSectionManagerProps {
  sections: Section[];
  formData: any; // Using any here to avoid circular imports, should be typed properly
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  toggleSection: (id: string) => void;
  handleVerifyEmail: () => void;
  handleVerifyPhone: () => void;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  handleExpertiseChange: (expertise: ServiceCategory) => void;
  isExpertiseSelected: (expertise: ServiceCategory) => boolean;
  handleMultiSelectChange: (fieldName: string, selectedValue: string) => void;
  handlePictureChange: (url: string) => void;
  handleSubscriptionSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  
  // Data arrays
  provincesOptions: Array<{ value: string; label: string }>;
  licensingBodies: Array<{ value: string; label: string }>;
  experienceOptions: Array<{ value: string; label: string }>;
  serviceCategories: Array<{ value: ServiceCategory; label: string; description: string }>;
  feeStructureOptions: Array<{ value: string; label: string; fieldType: string; placeholder: string }>;
  minimumInvestmentOptions: Array<{ value: string; label: string; range: string }>;
  clientTypeOptions: Array<{ value: string; label: string }>;
  meetingMethodOptions: Array<{ value: string; label: string }>;
  subscriptionPlans: Array<{ id: string; name: string; price: number; features: string[] }>;
}

export const ProfileSectionManager: React.FC<ProfileSectionManagerProps> = ({
  sections,
  formData,
  handleChange,
  toggleSection,
  handleVerifyEmail,
  handleVerifyPhone,
  isEmailVerified,
  isPhoneVerified,
  handleExpertiseChange,
  isExpertiseSelected,
  handleMultiSelectChange,
  handlePictureChange,
  handleSubscriptionSelect,
  
  // Data arrays
  provincesOptions,
  licensingBodies,
  experienceOptions,
  serviceCategories,
  feeStructureOptions,
  minimumInvestmentOptions,
  clientTypeOptions,
  meetingMethodOptions,
  subscriptionPlans,
}) => {
  return (
    <>
      {sections.map((section) => {
        switch(section.id) {
          case 'basic-info':
            return (
              <BasicInfoSection 
                key={section.id}
                section={section}
                formData={formData}
                handleChange={handleChange}
                toggleSection={toggleSection}
                handleVerifyEmail={handleVerifyEmail}
                handleVerifyPhone={handleVerifyPhone}
                isEmailVerified={isEmailVerified}
                isPhoneVerified={isPhoneVerified}
                provincesOptions={provincesOptions}
              />
            );
          case 'professional-credentials':
            return (
              <ProfessionalCredentialsSection
                key={section.id}
                section={section}
                formData={formData}
                handleChange={handleChange}
                toggleSection={toggleSection}
                licensingBodies={licensingBodies}
                experienceOptions={experienceOptions}
              />
            );
          case 'expertise':
            return (
              <ExpertiseSection
                key={section.id}
                section={section}
                formData={formData}
                handleChange={handleChange}
                toggleSection={toggleSection}
                handleExpertiseChange={handleExpertiseChange}
                isExpertiseSelected={isExpertiseSelected}
                serviceCategories={serviceCategories}
              />
            );
          case 'fee-client':
            return (
              <FeeStructureSection
                key={section.id}
                section={section}
                formData={formData}
                handleChange={handleChange}
                toggleSection={toggleSection}
                feeStructureOptions={feeStructureOptions}
                minimumInvestmentOptions={minimumInvestmentOptions}
                clientTypeOptions={clientTypeOptions}
                meetingMethodOptions={meetingMethodOptions}
                handleMultiSelectChange={handleMultiSelectChange}
              />
            );
          case 'marketing':
            return (
              <MarketingSection
                key={section.id}
                section={section}
                formData={formData}
                handleChange={handleChange}
                toggleSection={toggleSection}
                handlePictureChange={handlePictureChange}
              />
            );
          case 'verification':
            return (
              <VerificationSection
                key={section.id}
                section={section}
                formData={formData}
                handleChange={handleChange}
                toggleSection={toggleSection}
              />
            );
          case 'subscription':
            return (
              <SubscriptionSection
                key={section.id}
                section={section}
                formData={formData}
                handleChange={handleChange}
                toggleSection={toggleSection}
                handleSubscriptionSelect={handleSubscriptionSelect}
                subscriptionPlans={subscriptionPlans}
              />
            );
          case 'consent':
            return (
              <ConsentSection
                key={section.id}
                section={section}
                formData={formData}
                handleChange={handleChange}
                toggleSection={toggleSection}
              />
            );
          default:
            return (
              <ProfileSection
                key={section.id}
                section={section}
                toggleSection={toggleSection}
              >
                <div className="p-4 border-t border-slate-200">
                  <p>Section content not implemented.</p>
                </div>
              </ProfileSection>
            );
        }
      })}
    </>
  );
};
