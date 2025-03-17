
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser, ConsumerProfile, ServiceCategory } from '../context/UserContext';
import { toast } from "@/hooks/use-toast";

// Define the form values type
export interface ProfileFormValues {
  name: string;
  email: string;
  age: string;
  employmentStatus: string;
  investableAssets: string;
  riskTolerance: string;
  preferredCommunication: string[];
  preferredLanguage: string[];
  startTimeline: string;
  serviceNeeds: string[];
  profilePicture: string;
  onlineStatus: string;
  phone: string;
}

export const useConsumerProfileForm = () => {
  const { consumerProfile, setConsumerProfile, updateOnlineStatus } = useUser();
  const navigate = useNavigate();
  
  // Initialize form data from consumer profile
  const [formData, setFormData] = useState<ProfileFormValues>({
    name: consumerProfile?.name || '',
    email: consumerProfile?.email || '',
    age: consumerProfile?.age?.toString() || '',
    employmentStatus: consumerProfile?.status || '',
    investableAssets: consumerProfile?.investableAssets?.toString() || '',
    riskTolerance: consumerProfile?.riskTolerance || '',
    preferredCommunication: consumerProfile?.preferredCommunication || [],
    preferredLanguage: consumerProfile?.preferredLanguage || [],
    startTimeline: consumerProfile?.startTimeline || '',
    serviceNeeds: consumerProfile?.serviceNeeds || [],
    profilePicture: consumerProfile?.profilePicture || '',
    onlineStatus: consumerProfile?.onlineStatus || 'online',
    phone: consumerProfile?.phone || '',
  });
  
  const [selectedCommunication, setSelectedCommunication] = useState<string[]>(
    consumerProfile?.preferredCommunication || []
  );
  
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(
    consumerProfile?.preferredLanguage || []
  );
  
  const [selectedServices, setSelectedServices] = useState<ServiceCategory[]>(
    consumerProfile?.serviceNeeds || []
  );
  
  const [profileImage, setProfileImage] = useState<string | null>(
    consumerProfile?.profilePicture || null
  );
  
  const [onlineStatus, setOnlineStatus] = useState<'online' | 'offline' | 'away'>(
    (consumerProfile?.onlineStatus as 'online' | 'offline' | 'away') || 'online'
  );

  // Update form data when consumer profile changes
  useEffect(() => {
    if (consumerProfile) {
      setFormData({
        name: consumerProfile.name || '',
        email: consumerProfile.email || '',
        age: consumerProfile.age?.toString() || '',
        employmentStatus: consumerProfile.status || '',
        investableAssets: consumerProfile.investableAssets?.toString() || '',
        riskTolerance: consumerProfile.riskTolerance || '',
        preferredCommunication: consumerProfile.preferredCommunication || [],
        preferredLanguage: consumerProfile.preferredLanguage || [],
        startTimeline: consumerProfile.startTimeline || '',
        serviceNeeds: consumerProfile.serviceNeeds || [],
        profilePicture: consumerProfile.profilePicture || '',
        onlineStatus: consumerProfile.onlineStatus || 'online',
        phone: consumerProfile.phone || '',
      });
      setSelectedCommunication(consumerProfile.preferredCommunication || []);
      setSelectedLanguages(consumerProfile.preferredLanguage || []);
      setSelectedServices(consumerProfile.serviceNeeds || []);
      setProfileImage(consumerProfile.profilePicture || null);
      setOnlineStatus((consumerProfile.onlineStatus as 'online' | 'offline' | 'away') || 'online');
    }
  }, [consumerProfile]);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle checkbox changes
  const handleCheckboxChange = (option: string, isChecked: boolean, fieldName: 'preferredCommunication' | 'preferredLanguage' | 'serviceNeeds') => {
    let updatedValues: string[] | ServiceCategory[];

    if (isChecked) {
      updatedValues = [...(formData[fieldName] || []), option];
    } else {
      updatedValues = (formData[fieldName] || []).filter(item => item !== option);
    }

    setFormData(prev => ({ ...prev, [fieldName]: updatedValues }));

    if (fieldName === 'preferredCommunication') {
      setSelectedCommunication(updatedValues as string[]);
    } else if (fieldName === 'preferredLanguage') {
      setSelectedLanguages(updatedValues as string[]);
    } else if (fieldName === 'serviceNeeds') {
      setSelectedServices(updatedValues as ServiceCategory[]);
    }
  };

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle online status change
  const handleOnlineStatusChange = (status: 'online' | 'offline' | 'away') => {
    setOnlineStatus(status);
    updateOnlineStatus(status);
  };

  // Save profile changes
  const saveProfile = () => {
    const updatedProfile: ConsumerProfile = {
      ...consumerProfile,
      name: formData.name,
      email: formData.email,
      age: parseInt(formData.age || '0'),
      status: formData.employmentStatus,
      investableAssets: parseInt(formData.investableAssets.replace(/,/g, '') || '0'),
      riskTolerance: formData.riskTolerance as 'low' | 'medium' | 'high',
      preferredCommunication: selectedCommunication,
      preferredLanguage: selectedLanguages,
      startTimeline: formData.startTimeline,
      serviceNeeds: selectedServices,
      profilePicture: profileImage || '',
      onlineStatus: onlineStatus,
      phone: formData.phone || '',
    };

    setConsumerProfile(updatedProfile);
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
    navigate('/');
  };

  return {
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
  };
};
