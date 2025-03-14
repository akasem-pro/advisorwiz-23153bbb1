
import { useState, useEffect } from 'react';
import { Section, ExtendedAdvisorProfileForm } from '../types/advisorTypes';
import {
  UserCircle,
  BadgeCheck,
  BriefcaseBusiness,
  CreditCard,
  BookText,
  Shield,
  Scroll,
  CheckCircle
} from 'lucide-react';
import { 
  isBasicInfoComplete,
  isProfessionalInfoComplete,
  isExpertiseComplete,
  isFeeStructureComplete,
  isMarketingComplete,
  isComplianceComplete,
  isSubscriptionComplete,
  isConsentComplete,
  calculateProfileCompletion
} from '../utils/advisorFormValidation';

export const useProfileSections = (formData: ExtendedAdvisorProfileForm) => {
  const [sections, setSections] = useState<Section[]>([
    { 
      id: 'basic-info', 
      title: 'Basic Information', 
      icon: <UserCircle className="h-5 w-5" />, 
      isOpen: true, 
      isCompleted: false 
    },
    { 
      id: 'professional-credentials', 
      title: 'Professional Credentials', 
      icon: <BadgeCheck className="h-5 w-5" />, 
      isOpen: false, 
      isCompleted: false 
    },
    { 
      id: 'expertise', 
      title: 'Your Expertise & Services', 
      icon: <BriefcaseBusiness className="h-5 w-5" />, 
      isOpen: false, 
      isCompleted: false 
    },
    { 
      id: 'fee-client', 
      title: 'Fee Structure & Client Preferences', 
      icon: <CreditCard className="h-5 w-5" />, 
      isOpen: false, 
      isCompleted: false 
    },
    { 
      id: 'marketing', 
      title: 'Marketing & Visibility', 
      icon: <BookText className="h-5 w-5" />, 
      isOpen: false, 
      isCompleted: false 
    },
    { 
      id: 'verification', 
      title: 'Identity Verification & Compliance', 
      icon: <Shield className="h-5 w-5" />, 
      isOpen: false, 
      isCompleted: false 
    },
    { 
      id: 'subscription', 
      title: 'Choose Your Subscription', 
      icon: <Scroll className="h-5 w-5" />, 
      isOpen: false, 
      isCompleted: false 
    },
    { 
      id: 'consent', 
      title: 'Consent & Communication', 
      icon: <CheckCircle className="h-5 w-5" />, 
      isOpen: false, 
      isCompleted: false 
    },
  ]);

  const [progress, setProgress] = useState(0);

  // Calculate progress based on filled fields
  useEffect(() => {
    // Update section completion status
    setSections(prev => prev.map(section => {
      if (section.id === 'basic-info') {
        return { ...section, isCompleted: isBasicInfoComplete(formData) };
      } else if (section.id === 'professional-credentials') {
        return { ...section, isCompleted: isProfessionalInfoComplete(formData) };
      } else if (section.id === 'expertise') {
        return { ...section, isCompleted: isExpertiseComplete(formData) };
      } else if (section.id === 'fee-client') {
        return { ...section, isCompleted: isFeeStructureComplete(formData) };
      } else if (section.id === 'marketing') {
        return { ...section, isCompleted: isMarketingComplete(formData) };
      } else if (section.id === 'verification') {
        return { ...section, isCompleted: isComplianceComplete(formData) };
      } else if (section.id === 'subscription') {
        return { ...section, isCompleted: isSubscriptionComplete(formData) };
      } else if (section.id === 'consent') {
        return { ...section, isCompleted: isConsentComplete(formData) };
      }
      return section;
    }));
    
    // Calculate overall progress
    setProgress(calculateProfileCompletion(formData));
  }, [formData]);

  const toggleSection = (sectionId: string) => {
    setSections(prev => 
      prev.map(section => 
        section.id === sectionId 
          ? { ...section, isOpen: !section.isOpen } 
          : section
      )
    );
  };

  return { sections, progress, toggleSection };
};
