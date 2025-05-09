
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import { useUser, AdvisorProfile as AdvisorProfileType } from '../context/UserContext';
import { 
  licensingBodies,
  experienceOptions,
  serviceCategories,
  feeStructureOptions,
  minimumInvestmentOptions,
  clientTypeOptions,
  meetingMethodOptions,
  provincesOptions,
  subscriptionPlans
} from '../data/advisorProfileData';

// Import refactored components
import { ProfileHeader } from '../components/profile/ProfileHeader';
import { ProfileSectionManager } from '../components/profile/ProfileSectionManager';
import { ProfileFormActions } from '../components/profile/ProfileFormActions';
import { useProfileSections } from '../hooks/useProfileSections';
import { useAdvisorProfileForm } from '../hooks/useAdvisorProfileForm';
import AdvisorOnboardingTour from '../components/onboarding/AdvisorOnboardingTour';

const AdvisorProfile: React.FC = () => {
  const { advisorProfile, handleProfileUpdate, updateOnlineStatus } = useUser();
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);

  // Use our custom hooks
  const {
    formData,
    isEmailVerified,
    isPhoneVerified,
    handleChange,
    handleMultiSelectChange,
    handleExpertiseChange,
    isExpertiseSelected,
    handlePictureChange,
    handleVerifyEmail,
    handleVerifyPhone,
    handleSubscriptionSelect
  } = useAdvisorProfileForm(advisorProfile);

  const { sections, progress, toggleSection } = useProfileSections(formData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedProfile: AdvisorProfileType = {
      id: formData.id || 'advisor-' + Date.now(),
      name: formData.name || '',
      organization: formData.organization || '',
      isAccredited: formData.isAccredited || false,
      website: formData.websiteUrl || '',
      testimonials: formData.testimonials || [],
      languages: formData.languages || [],
      pricing: {
        hourlyRate: formData.pricing?.hourlyRate,
        portfolioFee: formData.pricing?.portfolioFee
      },
      assetsUnderManagement: formData.assetsUnderManagement || 0,
      expertise: formData.expertise || [],
      specializations: formData.specializations || [],
      profilePicture: formData.profilePicture || '',
      matches: formData.matches || [],
      // Don't include compatibilityScores in the AdvisorProfileType
      chats: formData.chats || [],
      availability: formData.availability || [],
      chatEnabled: formData.chatEnabled || false,
      appointmentCategories: formData.appointmentCategories || [],
      appointments: formData.appointments || [],
      onlineStatus: formData.onlineStatus || 'online',
      lastOnline: new Date().toISOString(),
      showOnlineStatus: formData.showOnlineStatus || false
    };
    
    // Use our new handleProfileUpdate method to update and sync with the database
    handleProfileUpdate(updatedProfile);
    updateOnlineStatus(updatedProfile.onlineStatus);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  const handleContinue = () => {
    // Changed from /matches to /advisor-dashboard as a more appropriate destination
    // since /matches route doesn't exist
    navigate('/advisor-dashboard');
  };

  return (
    <AppLayout>
      <div className="pt-6">
        <div className="container mx-auto px-4 py-6 md:py-12 max-w-4xl">
          <div className="glass-card rounded-2xl overflow-hidden shadow-lg">
            <div className="p-6 md:p-8">
              <ProfileHeader progress={progress} />

              <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto">
                {/* Profile Sections */}
                <ProfileSectionManager 
                  sections={sections}
                  formData={formData}
                  handleChange={handleChange}
                  toggleSection={toggleSection}
                  handleVerifyEmail={handleVerifyEmail}
                  handleVerifyPhone={handleVerifyPhone}
                  isEmailVerified={isEmailVerified}
                  isPhoneVerified={isPhoneVerified}
                  handleExpertiseChange={handleExpertiseChange}
                  isExpertiseSelected={isExpertiseSelected}
                  handleMultiSelectChange={handleMultiSelectChange}
                  handlePictureChange={handlePictureChange}
                  handleSubscriptionSelect={handleSubscriptionSelect}
                  
                  // Data arrays
                  provincesOptions={provincesOptions}
                  licensingBodies={licensingBodies}
                  experienceOptions={experienceOptions}
                  serviceCategories={serviceCategories}
                  feeStructureOptions={feeStructureOptions}
                  minimumInvestmentOptions={minimumInvestmentOptions}
                  clientTypeOptions={clientTypeOptions}
                  meetingMethodOptions={meetingMethodOptions}
                  subscriptionPlans={subscriptionPlans}
                />

                {/* Form Actions */}
                <ProfileFormActions 
                  handleSubmit={handleSubmit}
                  handleContinue={handleContinue}
                />
              </form>
              
              {saved && (
                <div className="mt-4 p-3 bg-green-100 border border-green-300 text-green-700 rounded text-center">
                  Profile saved successfully!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add the advisor onboarding tour */}
      <AdvisorOnboardingTour />
    </AppLayout>
  );
};

export default AdvisorProfile;
