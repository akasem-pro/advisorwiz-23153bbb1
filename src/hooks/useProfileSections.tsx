
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
    let completedSections = 0;
    
    // Basic Info section
    if (formData.name && formData.email && formData.phone && formData.province) {
      completedSections++;
      setSections(prev => prev.map(s => s.id === 'basic-info' ? {...s, isCompleted: true} : s));
    }
    
    // Professional Credentials section
    if (formData.licensingBody && formData.registrationNumber && formData.yearsOfExperience) {
      completedSections++;
      setSections(prev => prev.map(s => s.id === 'professional-credentials' ? {...s, isCompleted: true} : s));
    }
    
    // Expertise section
    if (formData.expertise && formData.expertise.length > 0) {
      completedSections++;
      setSections(prev => prev.map(s => s.id === 'expertise' ? {...s, isCompleted: true} : s));
    }
    
    // Fee Structure section
    if (formData.feeStructure) {
      completedSections++;
      setSections(prev => prev.map(s => s.id === 'fee-client' ? {...s, isCompleted: true} : s));
    }
    
    // Marketing section
    if (formData.profilePicture && formData.bio) {
      completedSections++;
      setSections(prev => prev.map(s => s.id === 'marketing' ? {...s, isCompleted: true} : s));
    }
    
    // Compliance section
    if (formData.consentToBackgroundCheck) {
      completedSections++;
      setSections(prev => prev.map(s => s.id === 'verification' ? {...s, isCompleted: true} : s));
    }
    
    // Subscription section
    if (formData.subscriptionPlan) {
      completedSections++;
      setSections(prev => prev.map(s => s.id === 'subscription' ? {...s, isCompleted: true} : s));
    }
    
    // Consent section
    if (formData.consentToTerms && formData.consentToContact) {
      completedSections++;
      setSections(prev => prev.map(s => s.id === 'consent' ? {...s, isCompleted: true} : s));
    }
    
    setProgress((completedSections / sections.length) * 100);
  }, [formData, sections.length]);

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
