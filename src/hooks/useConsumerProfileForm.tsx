
import { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { useToast } from '../components/ui/use-toast';
import { ServiceCategory } from '../types/userTypes';

export interface ProfileFormValues {
  name: string;
  email: string;
  phone: string;
  profileImage?: string;
  bio?: string;
  location?: string;
  timezone?: string;
  languages?: string[];
  investmentExperience?: string;
  investmentGoals?: string[];
  riskTolerance?: string;
  preferredCommunication?: string[];
  budget?: string;
  startTimeline?: string;
  age?: number;
  [key: string]: any;
}

const useConsumerProfileForm = () => {
  const { consumerProfile, setConsumerProfile } = useUser();
  const { toast } = useToast();

  const initialFormValues: ProfileFormValues = {
    name: consumerProfile?.name || '',
    email: consumerProfile?.email || '',
    phone: consumerProfile?.phone || '',
    profileImage: consumerProfile?.profileImage || '',
    bio: consumerProfile?.bio || '',
    location: consumerProfile?.location || '',
    timezone: consumerProfile?.timezone || 'America/New_York',
    languages: consumerProfile?.languages || ['English'],
    investmentExperience: consumerProfile?.investmentExperience || 'beginner',
    investmentGoals: consumerProfile?.investmentGoals || ['Retirement'],
    riskTolerance: consumerProfile?.riskTolerance || 'moderate',
    preferredCommunication: consumerProfile?.preferredCommunication || ['Email'],
    budget: consumerProfile?.budget || '$1,000 - $10,000',
    startTimeline: consumerProfile?.startTimeline || '1-3 months',
    age: consumerProfile?.age || 30,
  };

  const [formData, setFormData] = useState<ProfileFormValues>(initialFormValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profileImage, setProfileImage] = useState<string>(initialFormValues.profileImage || '');
  const [onlineStatus, setOnlineStatus] = useState<'online' | 'offline' | 'away'>(
    consumerProfile?.onlineStatus || 'online'
  );
  const [selectedCommunication, setSelectedCommunication] = useState<string[]>(
    initialFormValues.preferredCommunication || []
  );
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(
    initialFormValues.languages || []
  );
  const [selectedServices, setSelectedServices] = useState<ServiceCategory[]>(
    consumerProfile?.serviceNeeds || []
  );

  // Update form when consumer profile changes
  useEffect(() => {
    if (consumerProfile) {
      setFormData({
        name: consumerProfile.name || '',
        email: consumerProfile.email || '',
        phone: consumerProfile.phone || '',
        profileImage: consumerProfile.profileImage || '',
        bio: consumerProfile.bio || '',
        location: consumerProfile.location || '',
        timezone: consumerProfile.timezone || 'America/New_York',
        languages: consumerProfile.languages || ['English'],
        investmentExperience: consumerProfile.investmentExperience || 'beginner',
        investmentGoals: consumerProfile.investmentGoals || ['Retirement'],
        riskTolerance: consumerProfile.riskTolerance || 'moderate',
        preferredCommunication: consumerProfile.preferredCommunication || ['Email'],
        budget: consumerProfile.budget || '$1,000 - $10,000',
        startTimeline: consumerProfile.startTimeline || '1-3 months',
        age: consumerProfile.age || 30,
      });
      
      setProfileImage(consumerProfile.profileImage || '');
      setOnlineStatus(consumerProfile.onlineStatus || 'online');
      setSelectedCommunication(consumerProfile.preferredCommunication || []);
      setSelectedLanguages(consumerProfile.languages || []);
      setSelectedServices(consumerProfile.serviceNeeds || []);
    }
  }, [consumerProfile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (option: string, isChecked: boolean, fieldName: 'preferredCommunication' | 'preferredLanguage' | 'serviceNeeds') => {
    let currentValues: string[] = [];
    let setter: React.Dispatch<React.SetStateAction<any>> = () => {};
    
    if (fieldName === 'preferredCommunication') {
      currentValues = [...selectedCommunication];
      setter = setSelectedCommunication;
    } else if (fieldName === 'preferredLanguage') {
      currentValues = [...selectedLanguages];
      setter = setSelectedLanguages;
    } else if (fieldName === 'serviceNeeds') {
      currentValues = [...selectedServices] as string[];
      setter = setSelectedServices;
    }
    
    if (isChecked) {
      if (!currentValues.includes(option)) {
        const newValues = [...currentValues, option];
        setter(newValues);
        
        setFormData(prev => ({
          ...prev,
          [fieldName === 'preferredLanguage' ? 'languages' : fieldName]: newValues
        }));
      }
    } else {
      const newValues = currentValues.filter(item => item !== option);
      setter(newValues);
      
      setFormData(prev => ({
        ...prev,
        [fieldName === 'preferredLanguage' ? 'languages' : fieldName]: newValues
      }));
    }
  };

  const handleMultiSelectChange = (name: string, value: string[]) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        setProfileImage(imageUrl);
        setFormData(prev => ({
          ...prev,
          profileImage: imageUrl
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOnlineStatusChange = (status: 'online' | 'offline' | 'away') => {
    setOnlineStatus(status);
  };

  const saveProfile = async () => {
    setIsSubmitting(true);
    
    try {
      // Convert riskTolerance to proper type
      const riskToleranceValue = formData.riskTolerance as 'low' | 'medium' | 'high';
      
      // In a real app, you would send this to the server
      // For now, we'll just update the local state
      setConsumerProfile({
        ...consumerProfile,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        profileImage: formData.profileImage,
        bio: formData.bio,
        location: formData.location,
        timezone: formData.timezone,
        languages: formData.languages,
        investmentExperience: formData.investmentExperience,
        investmentGoals: formData.investmentGoals,
        riskTolerance: riskToleranceValue,
        preferredCommunication: selectedCommunication,
        budget: formData.budget,
        startTimeline: formData.startTimeline,
        age: formData.age,
        onlineStatus: onlineStatus,
        serviceNeeds: selectedServices,
        id: consumerProfile?.id || `consumer-${Date.now()}`,
      });
      
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
        variant: "default",
      });
    } catch (error) {
      console.error("Error saving profile:", error);
      toast({
        title: "Error",
        description: "There was an error updating your profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    setFormData,
    isSubmitting,
    handleInputChange,
    handleCheckboxChange,
    handleMultiSelectChange,
    saveProfile,
    profileImage,
    onlineStatus,
    selectedCommunication,
    selectedLanguages,
    selectedServices,
    handleImageUpload,
    handleOnlineStatusChange
  };
};

export { useConsumerProfileForm };
