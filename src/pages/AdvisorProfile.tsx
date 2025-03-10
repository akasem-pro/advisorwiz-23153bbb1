import React, { useState, useEffect, ChangeEvent, MouseEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedRoute from '../components/ui/AnimatedRoute';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { useUser, AdvisorProfile as AdvisorProfileType, TimeSlot, AppointmentCategory, ServiceCategory } from '../context/UserContext';
import { 
  ArrowRight, 
  Save, 
  CheckCircle, 
  Plus, 
  Trash2, 
  Clock, 
  MessageCircle, 
  BookText, 
  Activity,
  BadgeCheck,
  BriefcaseBusiness,
  Scroll,
  CreditCard,
  UserCircle,
  ChevronDown,
  ChevronUp,
  Shield,
  Check,
  Link,
  Linkedin
} from 'lucide-react';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Checkbox } from '../components/ui/checkbox';
import { ProfileSection } from '../components/profile/ProfileSection';
import { BasicInfoSection } from '../components/profile/BasicInfoSection';
import { ProfessionalCredentialsSection } from '../components/profile/ProfessionalCredentialsSection';
import { ExpertiseSection } from '../components/profile/ExpertiseSection';
import { FeeStructureSection } from '../components/profile/FeeStructureSection';
import { MarketingSection } from '../components/profile/MarketingSection';
import { VerificationSection } from '../components/profile/VerificationSection';
import { SubscriptionSection } from '../components/profile/SubscriptionSection';
import { ConsentSection } from '../components/profile/ConsentSection';

// Import data and types from separate files
import { 
  licensingBodies,
  experienceOptions,
  serviceCategories,
  feeStructureOptions,
  minimumInvestmentOptions,
  clientTypeOptions,
  meetingMethodOptions,
  provincesOptions, 
  employmentStatusOptions,
  subscriptionPlans,
  DEFAULT_CATEGORIES,
  languageOptions
} from '../data/advisorProfileData';
import { ExtendedAdvisorProfileForm, Section } from '../types/advisorTypes';

const AdvisorProfile: React.FC = () => {
  const { advisorProfile, setAdvisorProfile, updateOnlineStatus } = useUser();
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);
  const [newTestimonial, setNewTestimonial] = useState({ client: '', text: '' });
  const [showCategoryManager, setShowCategoryManager] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [progress, setProgress] = useState(0);
  const totalSteps = 5;

  // State for accordion sections
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
  
  const [formData, setFormData] = useState<ExtendedAdvisorProfileForm>({
    id: advisorProfile?.id || 'advisor-' + Date.now(),
    name: advisorProfile?.name || '',
    organization: advisorProfile?.organization || '',
    email: '',
    phone: '',
    street: '',
    city: '',
    province: '',
    postalCode: '',
    isAccredited: advisorProfile?.isAccredited || false,
    licensingBody: '',
    registrationNumber: '',
    yearsOfExperience: '',
    hasViolations: false,
    consentToBackgroundCheck: false,
    websiteUrl: '',
    linkedinUrl: '',
    bio: '',
    testimonials: advisorProfile?.testimonials || [],
    languages: advisorProfile?.languages || [],
    feeStructure: '',
    feeAmount: '',
    minimumInvestmentCategory: '',
    minimumInvestment: null,
    pricing: {
      hourlyRate: advisorProfile?.pricing?.hourlyRate || undefined,
      portfolioFee: advisorProfile?.pricing?.portfolioFee || undefined
    },
    preferredClientTypes: [],
    preferredMeetingMethods: [],
    assetsUnderManagement: advisorProfile?.assetsUnderManagement || 0,
    expertise: advisorProfile?.expertise || [],
    profilePicture: advisorProfile?.profilePicture || '',
    matches: advisorProfile?.matches || [],
    chats: advisorProfile?.chats || [],
    availability: advisorProfile?.availability || [],
    chatEnabled: advisorProfile?.chatEnabled !== undefined ? advisorProfile.chatEnabled : true,
    appointmentCategories: advisorProfile?.appointmentCategories || DEFAULT_CATEGORIES,
    appointments: advisorProfile?.appointments || [],
    onlineStatus: advisorProfile?.onlineStatus || 'online',
    lastOnline: advisorProfile?.lastOnline || new Date().toISOString(),
    showOnlineStatus: advisorProfile?.showOnlineStatus !== undefined ? advisorProfile.showOnlineStatus : true,
    subscriptionPlan: 'basic',
    consentToTerms: false,
    consentToMarketing: false,
    consentToContact: false,
    consentToDataProcessing: false
  });

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else if (name === 'hourlyRate' || name === 'portfolioFee') {
      setFormData(prev => ({
        ...prev,
        pricing: {
          ...prev.pricing,
          [name]: value ? Number(value) : undefined
        }
      }));
    } else if (name === 'minimumInvestment') {
      setFormData(prev => ({
        ...prev,
        minimumInvestment: value ? Number(value) : null
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: name === 'assetsUnderManagement' ? Number(value) : value
      }));
    }
  };

  // This function handles button clicks that need to change form data
  const handleButtonClick = (name: string, value: any) => (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMultiSelectChange = (fieldName: string, selectedValue: string) => {
    setFormData(prev => {
      const currentValues = prev[fieldName as keyof ExtendedAdvisorProfileForm] as string[] || [];
      
      if (currentValues.includes(selectedValue)) {
        return {
          ...prev,
          [fieldName]: currentValues.filter(v => v !== selectedValue)
        };
      } else {
        return {
          ...prev,
          [fieldName]: [...currentValues, selectedValue]
        };
      }
    });
  };

  const handleExpertiseChange = (expertise: ServiceCategory) => {
    setFormData(prev => {
      const currentExpertise = prev.expertise || [];
      if (currentExpertise.includes(expertise)) {
        return {
          ...prev,
          expertise: currentExpertise.filter(e => e !== expertise)
        };
      } else {
        return {
          ...prev,
          expertise: [...currentExpertise, expertise]
        };
      }
    });
  };

  const isExpertiseSelected = (expertise: ServiceCategory) => {
    return formData.expertise?.includes(expertise) || false;
  };

  const handleLanguageChange = (language: string) => {
    setFormData(prev => {
      const currentLanguages = prev.languages || [];
      if (currentLanguages.includes(language)) {
        return {
          ...prev,
          languages: currentLanguages.filter(l => l !== language)
        };
      } else {
        return {
          ...prev,
          languages: [...currentLanguages, language]
        };
      }
    });
  };

  const handleTestimonialChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewTestimonial(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addTestimonial = () => {
    if (newTestimonial.client && newTestimonial.text) {
      setFormData(prev => ({
        ...prev,
        testimonials: [...(prev.testimonials || []), newTestimonial]
      }));
      setNewTestimonial({ client: '', text: '' });
    }
  };

  const removeTestimonial = (index: number) => {
    setFormData(prev => ({
      ...prev,
      testimonials: (prev.testimonials || []).filter((_, i) => i !== index)
    }));
  };

  const handlePictureChange = (url: string) => {
    setFormData(prev => ({
      ...prev,
      profilePicture: url
    }));
  };

  const handleAvailabilityChange = (newAvailability: TimeSlot[]) => {
    setFormData(prev => ({
      ...prev,
      availability: newAvailability
    }));
  };

  const handleToggleChat = () => {
    setFormData(prev => ({
      ...prev,
      chatEnabled: !prev.chatEnabled
    }));
  };

  const handleToggleOnlineStatus = () => {
    setFormData(prev => ({
      ...prev,
      showOnlineStatus: !prev.showOnlineStatus
    }));
  };

  const handleStatusChange = (status: 'online' | 'offline' | 'away') => {
    setFormData(prev => ({
      ...prev,
      onlineStatus: status
    }));
  };

  const handleVerifyEmail = () => {
    setIsEmailVerified(true);
  };

  const handleVerifyPhone = () => {
    setIsPhoneVerified(true);
  };

  const handleSubscriptionSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const planId = e.target.value;
    setFormData(prev => ({
      ...prev,
      subscriptionPlan: planId
    }));
  };

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
      profilePicture: formData.profilePicture || '',
      matches: formData.matches || [],
      chats: formData.chats || [],
      availability: formData.availability || [],
      chatEnabled: formData.chatEnabled || false,
      appointmentCategories: formData.appointmentCategories || [],
      appointments: formData.appointments || [],
      onlineStatus: formData.onlineStatus || 'online',
      lastOnline: new Date().toISOString(),
      showOnlineStatus: formData.showOnlineStatus || false
    };
    
    setAdvisorProfile(updatedProfile);
    updateOnlineStatus(updatedProfile.onlineStatus);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  const handleContinue = () => {
    navigate('/matches');
  };

  return (
    <AnimatedRoute animation="fade">
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow pt-20">
          <div className="container mx-auto px-4 py-6 md:py-12 max-w-4xl">
            <div className="glass-card rounded-2xl overflow-hidden shadow-lg">
              <div className="p-6 md:p-8">
                <div className="text-center mb-8">
                  <h1 className="text-3xl md:text-4xl font-serif font-bold text-navy-900 mb-4">
                    Create Your Advisor Profile
                  </h1>
                  <p className="text-slate-600 max-w-2xl mx-auto">
                    Tell us about yourself and your services to get matched with the right clients.
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-100 rounded-full h-2.5 mb-8">
                  <div 
                    className="bg-teal-600 h-2.5 rounded-full transition-all duration-500 ease-out" 
                    style={{ width: `${progress}%` }}
                  ></div>
                  <p className="text-xs text-slate-500 text-right mt-1">Profile completion: {Math.round(progress)}%</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto">
                  {/* Profile Sections */}
                  {sections.map((section, index) => {
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

                  {/* Form Actions */}
                  <div className="flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
                    <button
                      type="submit"
                      className="btn-primary flex items-center justify-center"
                    >
                      <Save className="h-5 w-5 mr-2" />
                      Save Profile
                    </button>
                    <button
                      type="button"
                      onClick={handleContinue}
                      className="btn-secondary flex items-center justify-center"
                    >
                      Continue
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </AnimatedRoute>
  );
};

export default AdvisorProfile;
