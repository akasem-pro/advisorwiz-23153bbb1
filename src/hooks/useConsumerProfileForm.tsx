
import { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { useToast } from '../components/ui/use-toast';

export interface ProfileFormValues {
  name: string;
  email: string;
  phone: string;
  profileImage: string;
  bio: string;
  location: string;
  timezone: string;
  languages: string[];
  investmentExperience: string;
  investmentGoals: string[];
  riskTolerance: string;
  preferredCommunication: string[];
  budget: string;
  startTimeline: string;
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
  };

  const [formData, setFormData] = useState<ProfileFormValues>(initialFormValues);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      });
    }
  }, [consumerProfile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    
    if (checked) {
      // If field doesn't exist yet or is not an array, initialize it
      const currentValue = Array.isArray(formData[name]) ? formData[name] : [];
      setFormData({
        ...formData,
        [name]: [...currentValue, value],
      });
    } else {
      // Remove the value from the array
      setFormData({
        ...formData,
        [name]: formData[name].filter((item: string) => item !== value),
      });
    }
  };

  const handleMultiSelectChange = (name: string, value: string[]) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const saveProfile = async () => {
    setIsSubmitting(true);
    
    try {
      // In a real app, you would send this to the server
      // For now, we'll just update the local state
      setConsumerProfile({
        ...consumerProfile,
        ...formData,
        id: consumerProfile?.id || `consumer-${Date.now()}`,
        updatedAt: new Date().toISOString(),
      });
      
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
        variant: "success",
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
  };
};

export { useConsumerProfileForm };
export type { ProfileFormValues };
