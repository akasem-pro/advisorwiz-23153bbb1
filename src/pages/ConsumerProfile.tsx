
import React from 'react';
import { Card } from "@/components/ui/card";
import ProfileHeader from '@/components/profile/consumer/ProfileHeader';
import ProfileImageSection from '@/components/profile/consumer/ProfileImageSection';
import OnlineStatusSection from '@/components/profile/consumer/OnlineStatusSection';
import BasicInfoSection from '@/components/profile/consumer/BasicInfoSection';
import ContactInfoSection from '@/components/profile/consumer/ContactInfoSection';
import EmploymentSection from '@/components/profile/consumer/EmploymentSection';
import RiskToleranceSection from '@/components/profile/consumer/RiskToleranceSection';
import CommunicationSection from '@/components/profile/consumer/CommunicationSection';
import LanguageSection from '@/components/profile/consumer/LanguageSection';
import TimelineSection from '@/components/profile/consumer/TimelineSection';
import ServiceNeedsSection from '@/components/profile/consumer/ServiceNeedsSection';
import ProfileActions from '@/components/profile/consumer/ProfileActions';
import { useConsumerProfileForm } from '@/hooks/useConsumerProfileForm';

const ConsumerProfilePage: React.FC = () => {
  const {
    formData,
    selectedCommunication,
    selectedLanguages,
    selectedServices,
    profileImage,
    onlineStatus,
    handleInputChange,
    handleCheckboxChange,
    handleImageUpload,
    handleOnlineStatusChange,
    saveProfile
  } = useConsumerProfileForm();

  return (
    <div className="container py-12">
      <Card>
        <ProfileHeader />
        
        <div className="grid gap-6 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ProfileImageSection 
              profileImage={profileImage} 
              formData={formData} 
              handleImageUpload={handleImageUpload} 
            />
            <OnlineStatusSection 
              onlineStatus={onlineStatus}
              handleOnlineStatusChange={handleOnlineStatusChange} 
            />
          </div>

          <BasicInfoSection 
            formData={formData} 
            handleInputChange={handleInputChange} 
          />

          <ContactInfoSection 
            formData={formData} 
            handleInputChange={handleInputChange} 
          />

          <EmploymentSection 
            formData={formData} 
            handleInputChange={handleInputChange} 
          />

          <RiskToleranceSection 
            formData={formData} 
          />

          <CommunicationSection 
            selectedCommunication={selectedCommunication}
            handleCheckboxChange={handleCheckboxChange} 
          />

          <LanguageSection 
            selectedLanguages={selectedLanguages}
            handleCheckboxChange={handleCheckboxChange} 
          />

          <TimelineSection 
            formData={formData} 
          />

          <ServiceNeedsSection 
            selectedServices={selectedServices}
            handleCheckboxChange={handleCheckboxChange} 
          />
        </div>

        <ProfileActions saveProfile={saveProfile} />
      </Card>
    </div>
  );
};

export default ConsumerProfilePage;
