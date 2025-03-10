
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatedRoute } from '../components/ui/AnimatedRoute';
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
  Shield
} from 'lucide-react';
import ProfilePictureUpload from '../components/profile/ProfilePictureUpload';
import AvailabilityScheduler from '../components/advisor/AvailabilityScheduler';
import AppointmentCategoryManager from '../components/scheduler/AppointmentCategoryManager';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';

// Define licensing bodies options
const licensingBodies = [
  { value: 'mfda', label: 'MFDA (Mutual Fund Dealers Association)' },
  { value: 'iiroc', label: 'IIROC (Investment Industry Regulatory Organization of Canada)' },
  { value: 'cfp', label: 'CFP (Certified Financial Planner)' },
  { value: 'cfa', label: 'CFA (Chartered Financial Analyst)' },
  { value: 'cim', label: 'CIM (Chartered Investment Manager)' },
  { value: 'cpa', label: 'CPA (Chartered Professional Accountant)' },
  { value: 'pfa', label: 'PFA (Professional Financial Advisor)' },
  { value: 'chfc', label: 'ChFC (Chartered Financial Consultant)' },
  { value: 'other', label: 'Other' }
];

// Define years of experience options
const experienceOptions = [
  { value: 'less_than_1', label: 'Less than 1 year' },
  { value: '1_to_5', label: '1-5 years' },
  { value: '5_to_10', label: '5-10 years' },
  { value: '10_plus', label: '10+ years' }
];

// Define service categories with expanded options
const serviceCategories = [
  { value: 'investment' as ServiceCategory, label: 'Investment Planning & Portfolio Management' },
  { value: 'retirement' as ServiceCategory, label: 'Retirement Planning & Pension Strategies' },
  { value: 'tax' as ServiceCategory, label: 'Tax Optimization & Estate Planning' },
  { value: 'business' as ServiceCategory, label: 'Financial Planning for Business Owners & Entrepreneurs' },
  { value: 'insurance' as ServiceCategory, label: 'Insurance & Risk Management' },
  { value: 'philanthropic' as ServiceCategory, label: 'Philanthropic & Charitable Giving' },
  { value: 'education' as ServiceCategory, label: 'Education Planning' },
  { value: 'estate' as ServiceCategory, label: 'Estate Planning & Wealth Transfer' }
];

// Define fee structure options
const feeStructureOptions = [
  { value: 'flat_fee', label: 'Flat Fee' },
  { value: 'percent_assets', label: 'Percentage of Assets' },
  { value: 'hourly', label: 'Hourly Rate' },
  { value: 'subscription', label: 'Subscription-based' },
  { value: 'commission', label: 'Commission-based' },
  { value: 'hybrid', label: 'Hybrid Model' }
];

// Define client type preferences
const clientTypeOptions = [
  { value: 'young_professionals', label: 'Young Professionals' },
  { value: 'business_owners', label: 'Business Owners' },
  { value: 'retirees', label: 'Retirees' },
  { value: 'high_net_worth', label: 'High-Net-Worth Individuals' },
  { value: 'families', label: 'Families' },
  { value: 'pre_retirees', label: 'Pre-Retirees' },
  { value: 'all', label: 'All Types of Clients' }
];

// Define meeting preferences
const meetingMethodOptions = [
  { value: 'phone', label: 'Phone' },
  { value: 'video', label: 'Video Call' },
  { value: 'in_person', label: 'In-Person' },
  { value: 'hybrid', label: 'Hybrid (Mix of virtual and in-person)' }
];

// Define provinces/territories
const provincesOptions = [
  { value: 'ab', label: 'Alberta' },
  { value: 'bc', label: 'British Columbia' },
  { value: 'mb', label: 'Manitoba' },
  { value: 'nb', label: 'New Brunswick' },
  { value: 'nl', label: 'Newfoundland and Labrador' },
  { value: 'ns', label: 'Nova Scotia' },
  { value: 'nt', label: 'Northwest Territories' },
  { value: 'nu', label: 'Nunavut' },
  { value: 'on', label: 'Ontario' },
  { value: 'pe', label: 'Prince Edward Island' },
  { value: 'qc', label: 'Quebec' },
  { value: 'sk', label: 'Saskatchewan' },
  { value: 'yt', label: 'Yukon' }
];

// Define employment status options
const employmentStatusOptions = [
  { value: 'employed', label: 'Employed' },
  { value: 'self_employed', label: 'Self-Employed' },
  { value: 'business_owner', label: 'Business Owner' },
  { value: 'retired', label: 'Retired' },
  { value: 'unemployed', label: 'Unemployed' },
  { value: 'student', label: 'Student' }
];

// Define subscription plan options
const subscriptionPlans = [
  { 
    id: 'basic', 
    name: 'Basic Plan', 
    price: 49, 
    features: [
      'Profile listing',
      'Client inquiries',
      'Standard support',
      'Basic match algorithm'
    ] 
  },
  { 
    id: 'professional', 
    name: 'Professional Plan', 
    price: 99, 
    features: [
      'Priority listing in search results',
      'Client insights dashboard',
      'Analytics dashboard',
      'Advanced match algorithm',
      'Priority customer support'
    ] 
  },
  { 
    id: 'premium', 
    name: 'Premium Plan', 
    price: 199, 
    features: [
      'Featured advisor status',
      'Unlimited leads',
      'Marketing tools & resources',
      'VIP access to events',
      'Premium match algorithm',
      'Dedicated account manager',
      'Custom profile branding'
    ] 
  }
];

// Default appointment categories
const DEFAULT_CATEGORIES: AppointmentCategory[] = [
  {
    id: 'cat-free_consultation',
    name: 'free_consultation',
    label: 'Free Consultation',
    description: 'A short introductory call to discuss your financial needs.',
    duration: 30,
    enabled: true
  },
  {
    id: 'cat-discovery_call',
    name: 'discovery_call',
    label: 'Discovery Call',
    description: 'An in-depth discussion to understand your financial situation.',
    duration: 60,
    enabled: true
  },
  {
    id: 'cat-investment_call',
    name: 'investment_call',
    label: 'Investment Strategy',
    description: 'Review and discuss your investment portfolio and strategies.',
    duration: 60,
    enabled: true
  },
  {
    id: 'cat-tax_planning',
    name: 'tax_planning',
    label: 'Tax Planning',
    description: 'Consultation for tax optimization strategies.',
    duration: 60,
    enabled: true
  },
  {
    id: 'cat-business_entrepreneurship',
    name: 'business_entrepreneurship',
    label: 'Business & Entrepreneurship',
    description: 'Financial advice for business owners and entrepreneurs.',
    duration: 90,
    enabled: true
  }
];

const languageOptions = [
  { value: 'english', label: 'English' },
  { value: 'french', label: 'French' },
  { value: 'spanish', label: 'Spanish' },
  { value: 'mandarin', label: 'Mandarin' },
  { value: 'cantonese', label: 'Cantonese' },
  { value: 'punjabi', label: 'Punjabi' },
  { value: 'hindi', label: 'Hindi' },
  { value: 'arabic', label: 'Arabic' },
  { value: 'tagalog', label: 'Tagalog' },
  { value: 'portuguese', label: 'Portuguese' },
  { value: 'german', label: 'German' },
  { value: 'italian', label: 'Italian' }
];

type Section = {
  id: string;
  title: string;
  icon: React.ReactNode;
  isOpen: boolean;
  isCompleted: boolean;
};

// Extended form data type
type ExtendedAdvisorProfileForm = Partial<AdvisorProfileType> & {
  email: string;
  phone: string;
  street: string;
  city: string;
  province: string;
  postalCode: string;
  licensingBody: string;
  registrationNumber: string;
  yearsOfExperience: string;
  hasViolations: boolean;
  consentToBackgroundCheck: boolean;
  feeStructure: string;
  minimumInvestment: number | null;
  preferredClientTypes: string[];
  preferredMeetingMethods: string[];
  bio: string;
  linkedinUrl: string;
  websiteUrl: string;
  subscriptionPlan: string;
  consentToTerms: boolean;
  consentToMarketing: boolean;
  consentToContact: boolean;
};

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
    website: advisorProfile?.website || '',
    linkedinUrl: '',
    bio: '',
    testimonials: advisorProfile?.testimonials || [],
    languages: advisorProfile?.languages || [],
    feeStructure: '',
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
    matches: [],
    chats: [],
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
    consentToContact: false
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

  const handlePictureChange = (imageBase64: string) => {
    setFormData(prev => ({
      ...prev,
      profilePicture: imageBase64
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
    // This would typically send a verification email
    // For this demo, we'll just set it as verified
    setIsEmailVerified(true);
  };

  const handleVerifyPhone = () => {
    // This would typically send an OTP to the phone
    // For this demo, we'll just set it as verified
    setIsPhoneVerified(true);
  };

  const handleSubscriptionSelect = (planId: string) => {
    setFormData(prev => ({
      ...prev,
      subscriptionPlan: planId
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Convert from extended form type to AdvisorProfileType
    const updatedProfile: AdvisorProfileType = {
      id: formData.id || 'advisor-' + Date.now(),
      name: formData.name || '',
      organization: formData.organization || '',
      isAccredited: formData.isAccredited || false,
      website: formData.website || '',
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
                  {/* Basic Information Section */}
                  <div className="rounded-lg border border-slate-200 overflow-hidden">
                    <div 
                      className={`flex justify-between items-center p-4 cursor-pointer ${sections[0].isCompleted ? 'bg-green-50' : 'bg-slate-50'}`}
                      onClick={() => toggleSection('basic-info')}
                    >
                      <div className="flex items-center">
                        <div className={`mr-3 ${sections[0].isCompleted ? 'text-green-600' : 'text-slate-700'}`}>
                          {sections[0].icon}
                        </div>
                        <h3 className="text-lg font-medium text-navy-800 flex items-center">
                          {sections[0].title}
                          {sections[0].isCompleted && (
                            <CheckCircle className="ml-2 h-4 w-4 text-green-600" />
                          )}
                        </h3>
                      </div>
                      <div>
                        {sections[0].isOpen ? (
                          <ChevronUp className="h-5 w-5 text-slate-500" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-slate-500" />
                        )}
                      </div>
                    </div>
                    
                    {sections[0].isOpen && (
                      <div className="p-4 border-t border-slate-200 space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="name" className="block text-sm font-medium text-navy-800 mb-1">
                              Full Name*
                            </label>
                            <Input
                              type="text"
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              placeholder="Your full name"
                              required
                            />
                          </div>
                          <div>
                            <label htmlFor="email" className="block text-sm font-medium text-navy-800 mb-1">
                              Email Address*
                            </label>
                            <div className="relative">
                              <Input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="your.email@example.com"
                                required
                                className={isEmailVerified ? "pr-10 border-green-500" : "pr-10"}
                              />
                              {isEmailVerified ? (
                                <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500" />
                              ) : (
                                <button
                                  type="button"
                                  onClick={handleVerifyEmail}
                                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs bg-teal-500 text-white px-2 py-1 rounded"
                                  disabled={!formData.email}
                                >
                                  Verify
                                </button>
                              )}
                            </div>
                            {!isEmailVerified && formData.email && (
                              <p className="text-amber-600 text-xs mt-1">
                                Email verification required
                              </p>
                            )}
                          </div>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-navy-800 mb-1">
                              Phone Number*
                            </label>
                            <div className="relative">
                              <Input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="(123) 456-7890"
                                required
                                className={isPhoneVerified ? "pr-10 border-green-500" : "pr-10"}
                              />
                              {isPhoneVerified ? (
                                <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500" />
                              ) : (
                                <button
                                  type="button"
                                  onClick={handleVerifyPhone}
                                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs bg-teal-500 text-white px-2 py-1 rounded"
                                  disabled={!formData.phone}
                                >
                                  Verify
                                </button>
                              )}
                            </div>
                            {!isPhoneVerified && formData.phone && (
                              <p className="text-amber-600 text-xs mt-1">
                                Phone verification required
                              </p>
                            )}
                          </div>
                          <div>
                            <label htmlFor="organization" className="block text-sm font-medium text-navy-800 mb-1">
                              Firm/Company Name
                            </label>
                            <Input
                              type="text"
                              id="organization"
                              name="organization"
                              value={formData.organization}
                              onChange={handleChange}
                              placeholder="Your firm or company name"
                            />
                          </div>
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-4">
                          <div className="md:col-span-2">
                            <label htmlFor="street" className="block text-sm font-medium text-navy-800 mb-1">
                              Office Address
                            </label>
                            <Input
                              type="text"
                              id="street"
                              name="street"
                              value={formData.street}
                              onChange={handleChange}
                              placeholder="Street address"
                            />
                          </div>
                          <div>
                            <label htmlFor="city" className="block text-sm font-medium text-navy-800 mb-1">
                              City
                            </label>
                            <Input
                              type="text"
                              id="city"
                              name="city"
                              value={formData.city}
                              onChange={handleChange}
                              placeholder="City"
                            />
                          </div>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="province" className="block text-sm font-medium text-navy-800 mb-1">
                              Province/Territory*
                            </label>
                            <select
                              id="province"
                              name="province"
                              value={formData.province}
                              onChange={handleChange}
                              className="input-field"
                              required
                            >
                              <option value="">Select province/territory</option>
                              {provincesOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label htmlFor="postalCode" className="block text-sm font-medium text-navy-800 mb-1">
                              Postal Code
                            </label>
                            <Input
                              type="text"
                              id="postalCode"
                              name="postalCode"
                              value={formData.postalCode}
                              onChange={handleChange}
                              placeholder="A1B 2C3"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Professional Credentials Section */}
                  <div className="rounded-lg border border-slate-200 overflow-hidden">
                    <div 
                      className={`flex justify-between items-center p-4 cursor-pointer ${sections[1].isCompleted ? 'bg-green-50' : 'bg-slate-50'}`}
                      onClick={() => toggleSection('professional-credentials')}
                    >
                      <div className="flex items-center">
                        <div className={`mr-3 ${sections[1].isCompleted ? 'text-green-600' : 'text-slate-700'}`}>
                          {sections[1].icon}
                        </div>
                        <h3 className="text-lg font-medium text-navy-800 flex items-center">
                          {sections[1].title}
                          {sections[1].isCompleted && (
                            <CheckCircle className="ml-2 h-4 w-4 text-green-600" />
                          )}
                        </h3>
                      </div>
                      <div>
                        {sections[1].isOpen ? (
                          <ChevronUp className="h-5 w-5 text-slate-500" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-slate-500" />
                        )}
                      </div>
                    </div>
                    
                    {sections[1].isOpen && (
                      <div className="p-4 border-t border-slate-200 space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="licensingBody" className="block text-sm font-medium text-navy-800 mb-1">
                              Licensing Body*
                            </label>
                            <select
                              id="licensingBody"
                              name="licensingBody"
                              value={formData.licensingBody}
                              onChange={handleChange}
                              className="input-field"
                              required
                            >
                              <option value="">Select licensing body</option>
                              {licensingBodies.map(option => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label htmlFor="registrationNumber" className="block text-sm font-medium text-navy-800 mb-1">
                              Registration Number*
                            </label>
                            <Input
                              type="text"
                              id="registrationNumber"
                              name="registrationNumber"
                              value={formData.registrationNumber}
                              onChange={handleChange}
                              placeholder="Your registration or license number"
                              required
                            />
                          </div>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="yearsOfExperience" className="block text-sm font-medium text-navy-800 mb-1">
                              Years of Experience*
                            </label>
                            <select
                              id="yearsOfExperience"
                              name="yearsOfExperience"
                              value={formData.yearsOfExperience}
                              onChange={handleChange}
                              className="input-field"
                              required
                            >
                              <option value="">Select experience level</option>
                              {experienceOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="flex items-center mt-6">
                            <input
                              type="checkbox"
                              id="isAccredited"
                              name="isAccredited"
                              checked={formData.isAccredited}
                              onChange={handleChange}
                              className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-slate-300 rounded"
                            />
                            <label htmlFor="isAccredited" className="ml-2 block text-sm text-slate-700">
                              I am an accredited/certified financial advisor
                            </label>
                          </div>
                        </div>
                        
                        <div className="grid md:grid-cols-1 gap-4">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id="hasViolations"
                              name="hasViolations"
                              checked={formData.hasViolations}
                              onChange={handleChange}
                              className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-slate-300 rounded"
                            />
                            <label htmlFor="hasViolations" className="ml-2 block text-sm text-slate-700">
                              I have regulatory violations on my record
                            </label>
                          </div>
                          
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id="consentToBackgroundCheck"
                              name="consentToBackgroundCheck"
                              checked={formData.consentToBackgroundCheck}
                              onChange={handleChange}
                              className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-slate-300 rounded"
                            />
                            <label htmlFor="consentToBackgroundCheck" className="ml-2 block text-sm text-slate-700">
                              I consent to a background verification check
                            </label>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Expertise & Services Section */}
                  <div className="rounded-lg border border-slate-200 overflow-hidden">
                    <div 
                      className={`flex justify-between items-center p-4 cursor-pointer ${sections[2].isCompleted ? 'bg-green-50' : 'bg-slate-50'}`}
                      onClick={() => toggleSection('expertise')}
                    >
                      <div className="flex items-center">
                        <div className={`mr-3 ${sections[2].isCompleted ? 'text-green-600' : 'text-slate-700'}`}>
                          {sections[2].icon}
                        </div>
                        <h3 className="text-lg font-medium text-navy-800 flex items-center">
                          {sections[2].title}
                          {sections[2].isCompleted && (
                            <CheckCircle className="ml-2 h-4 w-4 text-green-600" />
                          )}
                        </h3>
                      </div>
                      <div>
                        {sections[2].isOpen ? (
                          <ChevronUp className="h-5 w-5 text-slate-500" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-slate-500" />
                        )}
                      </div>
                    </div>
                    
                    {sections[2].isOpen && (
                      <div className="p-4 border-t border-slate-200 space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-navy-800 mb-2">
                            Areas of Expertise* (Select all that apply)
                          </label>
                          <div className="grid md:grid-cols-2 gap-3">
                            {serviceCategories.map((option) => (
                              <div key={option.value} className="flex items-center bg-slate-50 p-3 rounded-lg hover:bg-slate-100 transition-colors">
                                <input
                                  type="checkbox"
                                  id={`expertise-${option.value}`}
                                  checked={(formData.expertise || []).includes(option.value)}
                                  onChange={() => handleExpertiseChange(option.value)}
                                  className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-slate-300 rounded"
                                />
                                <label htmlFor={`expertise-${option.value}`} className="ml-2 block text-sm text-slate-700">
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                          {formData.expertise && formData.expertise.length === 0 && (
                            <p className="text-amber-600 text-xs mt-1">
                              Please select at least one area of expertise
                            </p>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-navy-800 mb-2">
                            Languages Spoken (Select all that apply)
                          </label>
                          <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                            {languageOptions.map((option) => (
                              <div key={option.value} className="flex items-center">
                                <input
                                  type="checkbox"
                                  id={`lang-${option.value}`}
                                  checked={(formData.languages || []).includes(option.value)}
                                  onChange={() => handleLanguageChange(option.value)}
                                  className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-slate-300 rounded"
                                />
                                <label htmlFor={`lang-${option.value}`} className="ml-2 block text-sm text-slate-700">
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-base font-medium text-navy-800 mb-2 flex items-center">
                            <Clock className="inline-block mr-2 h-4 w-4" />
                            Appointment Types
                          </h4>
                          <p className="text-slate-600 mb-4 text-sm">
                            Configure the types of appointments clients can book with you.
                          </p>
                          
                          <button
                            type="button"
                            onClick={() => setShowCategoryManager(true)}
                            className="btn-outline inline-flex items-center mb-4 text-sm"
                          >
                            <Plus className="mr-2 w-4 h-4" />
                            Manage Appointment Categories
                          </button>

                          <div className="bg-slate-50 p-4 rounded-lg">
                            <p className="text-sm text-slate-600">
                              You have {(formData.appointmentCategories || []).filter(cat => cat.enabled).length} active appointment categories.
                              Click the button above to manage your appointment types.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Fee Structure & Client Preferences Section */}
                  <div className="rounded-lg border border-slate-200 overflow-hidden">
                    <div 
                      className={`flex justify-between items-center p-4 cursor-pointer ${sections[3].isCompleted ? 'bg-green-50' : 'bg-slate-50'}`}
                      onClick={() => toggleSection('fee-client')}
                    >
                      <div className="flex items-center">
                        <div className={`mr-3 ${sections[3].isCompleted ? 'text-green-600' : 'text-slate-700'}`}>
                          {sections[3].icon}
                        </div>
                        <h3 className="text-lg font-medium text-navy-800 flex items-center">
                          {sections[3].title}
                          {sections[3].isCompleted && (
                            <CheckCircle className="ml-2 h-4 w-4 text-green-600" />
                          )}
                        </h3>
                      </div>
                      <div>
                        {sections[3].isOpen ? (
                          <ChevronUp className="h-5 w-5 text-slate-500" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-slate-500" />
                        )}
                      </div>
                    </div>
                    
                    {sections[3].isOpen && (
                      <div className="p-4 border-t border-slate-200 space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="feeStructure" className="block text-sm font-medium text-navy-800 mb-1">
                              Fee Structure*
                            </label>
                            <select
                              id="feeStructure"
                              name="feeStructure"
                              value={formData.feeStructure}
                              onChange={handleChange}
                              className="input-field"
                              required
                            >
                              <option value="">Select fee structure</option>
                              {feeStructureOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label htmlFor="minimumInvestment" className="block text-sm font-medium text-navy-800 mb-1">
                              Minimum Investment Required (CAD, if applicable)
                            </label>
                            <Input
                              type="number"
                              id="minimumInvestment"
                              name="minimumInvestment"
                              value={formData.minimumInvestment || ''}
                              onChange={handleChange}
                              placeholder="e.g., 25000"
                              min={0}
                            />
                          </div>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="hourlyRate" className="block text-sm font-medium text-navy-800 mb-1">
                              Hourly Rate (CAD, if applicable)
                            </label>
                            <Input
                              type="number"
                              id="hourlyRate"
                              name="hourlyRate"
                              value={formData.pricing?.hourlyRate || ''}
                              onChange={handleChange}
                              placeholder="e.g., 150"
                              min={0}
                            />
                          </div>
                          <div>
                            <label htmlFor="portfolioFee" className="block text-sm font-medium text-navy-800 mb-1">
                              Portfolio Fee (%, if applicable)
                            </label>
                            <Input
                              type="number"
                              id="portfolioFee"
                              name="portfolioFee"
                              value={formData.pricing?.portfolioFee || ''}
                              onChange={handleChange}
                              placeholder="e.g., 1.5"
                              min={0}
                              max={100}
                              step={0.1}
                            />
                          </div>
                        </div>

                        <div className="mt-4">
                          <label htmlFor="assetsUnderManagement" className="block text-sm font-medium text-navy-800 mb-1">
                            Assets Under Management (CAD)*
                          </label>
                          <Input
                            type="number"
                            id="assetsUnderManagement"
                            name="assetsUnderManagement"
                            value={formData.assetsUnderManagement || ''}
                            onChange={handleChange}
                            placeholder="Total amount in CAD"
                            required
                            min={0}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-navy-800 mb-2">
                            Preferred Client Types (Select all that apply)
                          </label>
                          <div className="grid md:grid-cols-2 gap-3">
                            {clientTypeOptions.map((option) => (
                              <div key={option.value} className="flex items-center">
                                <input
                                  type="checkbox"
                                  id={`client-${option.value}`}
                                  checked={(formData.preferredClientTypes || []).includes(option.value)}
                                  onChange={() => handleMultiSelectChange('preferredClientTypes', option.value)}
                                  className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-slate-300 rounded"
                                />
                                <label htmlFor={`client-${option.value}`} className="ml-2 block text-sm text-slate-700">
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-navy-800 mb-2">
                            Preferred Meeting Methods (Select all that apply)
                          </label>
                          <div className="grid md:grid-cols-2 gap-3">
                            {meetingMethodOptions.map((option) => (
                              <div key={option.value} className="flex items-center">
                                <input
                                  type="checkbox"
                                  id={`meeting-${option.value}`}
                                  checked={(formData.preferredMeetingMethods || []).includes(option.value)}
                                  onChange={() => handleMultiSelectChange('preferredMeetingMethods', option.value)}
                                  className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-slate-300 rounded"
                                />
                                <label htmlFor={`meeting-${option.value}`} className="ml-2 block text-sm text-slate-700">
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-base font-medium text-navy-800 mb-2 flex items-center">
                            <Clock className="inline-block mr-2 h-4 w-4" />
                            Weekly Availability
                          </h4>
                          <p className="text-slate-600 mb-4 text-sm">
                            Set your weekly availability for consultations and meetings.
                          </p>
                          
                          <AvailabilityScheduler 
                            availability={formData.availability || []}
                            onChange={handleAvailabilityChange}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Marketing & Visibility Section */}
                  <div className="rounded-lg border border-slate-200 overflow-hidden">
                    <div 
                      className={`flex justify-between items-center p-4 cursor-pointer ${sections[4].isCompleted ? 'bg-green-50' : 'bg-slate-50'}`}
                      onClick={() => toggleSection('marketing')}
                    >
                      <div className="flex items-center">
                        <div className={`mr-3 ${sections[4].isCompleted ? 'text-green-600' : 'text-slate-700'}`}>
                          {sections[4].icon}
                        </div>
                        <h3 className="text-lg font-medium text-navy-800 flex items-center">
                          {sections[4].title}
                          {sections[4].isCompleted && (
                            <CheckCircle className="ml-2 h-4 w-4 text-green-600" />
                          )}
                        </h3>
                      </div>
                      <div>
                        {sections[4].isOpen ? (
                          <ChevronUp className="h-5 w-5 text-slate-500" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-slate-500" />
                        )}
                      </div>
                    </div>
                    
                    {sections[4].isOpen && (
                      <div className="p-4 border-t border-slate-200 space-y-4">
                        <div className="flex flex-col items-center mb-6">
                          <h4 className="text-base font-medium text-navy-800 mb-2">Professional Headshot</h4>
                          <ProfilePictureUpload 
                            currentPicture={formData.profilePicture}
                            onPictureChange={handlePictureChange}
                            size="lg"
                          />
                          <p className="text-sm text-slate-500 mt-2">
                            A professional photo helps build trust with potential clients
                          </p>
                        </div>
                        
                        <div>
                          <label htmlFor="bio" className="block text-sm font-medium text-navy-800 mb-1">
                            Professional Bio* (Why should clients work with you?)
                          </label>
                          <Textarea
                            id="bio"
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            placeholder="Tell potential clients about your approach, philosophy, and what makes you unique as a financial advisor..."
                            className="min-h-[120px]"
                            required
                          />
                          <p className="text-xs text-slate-500 mt-1">
                            {formData.bio.length}/500 characters
                          </p>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="linkedinUrl" className="block text-sm font-medium text-navy-800 mb-1">
                              LinkedIn Profile (Optional)
                            </label>
                            <Input
                              type="url"
                              id="linkedinUrl"
                              name="linkedinUrl"
                              value={formData.linkedinUrl}
                              onChange={handleChange}
                              placeholder="https://linkedin.com/in/yourprofile"
                            />
                          </div>
                          <div>
                            <label htmlFor="website" className="block text-sm font-medium text-navy-800 mb-1">
                              Website (Optional)
                            </label>
                            <Input
                              type="url"
                              id="website"
                              name="website"
                              value={formData.website}
                              onChange={handleChange}
                              placeholder="https://yourwebsite.com"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-base font-medium text-navy-800 mb-2">Client Testimonials</h4>
                          
                          {(formData.testimonials || []).length > 0 && (
                            <div className="mb-6 space-y-4">
                              {formData.testimonials?.map((testimonial, index) => (
                                <div key={index} className="bg-slate-50 p-4 rounded-lg relative">
                                  <p className="text-slate-700 italic">"{testimonial.text}"</p>
                                  <p className="mt-2 text-sm font-medium text-navy-700">- {testimonial.client}</p>
                                  <button
                                    type="button"
                                    onClick={() => removeTestimonial(index)}
                                    className="absolute top-2 right-2 text-slate-400 hover:text-red-500 transition-colors"
                                    aria-label="Remove testimonial"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}

                          <div className="space-y-3">
                            <div>
                              <label htmlFor="client" className="block text-sm font-medium text-navy-800 mb-1">
                                Client Name
                              </label>
                              <Input
                                type="text"
                                id="client"
                                name="client"
                                value={newTestimonial.client}
                                onChange={handleTestimonialChange}
                                placeholder="Client's name"
                              />
                            </div>
                            <div>
                              <label htmlFor="text" className="block text-sm font-medium text-navy-800 mb-1">
                                Testimonial Text
                              </label>
                              <Textarea
                                id="text"
                                name="text"
                                value={newTestimonial.text}
                                onChange={handleTestimonialChange}
                                className="min-h-[80px]"
                                placeholder="What did the client say about your services?"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={addTestimonial}
                              disabled={!newTestimonial.client || !newTestimonial.text}
                              className={`inline-flex items-center text-teal-600 font-medium ${
                                !newTestimonial.client || !newTestimonial.text
                                  ? 'opacity-50 cursor-not-allowed'
                                  : 'hover:text-teal-700'
                              }`}
                            >
                              <Plus className="mr-1 w-4 h-4" />
                              Add Testimonial
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Verification & Compliance Section */}
                  <div className="rounded-lg border border-slate-200 overflow-hidden">
                    <div 
                      className={`flex justify-between items-center p-4 cursor-pointer ${sections[5].isCompleted ? 'bg-green-50' : 'bg-slate-50'}`}
                      onClick={() => toggleSection('verification')}
                    >
                      <div className="flex items-center">
                        <div className={`mr-3 ${sections[5].isCompleted ? 'text-green-600' : 'text-slate-700'}`}>
                          {sections[5].icon}
                        </div>
                        <h3 className="text-lg font-medium text-navy-800 flex items-center">
                          {sections[5].title}
                          {sections[5].isCompleted && (
                            <CheckCircle className="ml-2 h-4 w-4 text-green-600" />
                          )}
                        </h3>
                      </div>
                      <div>
                        {sections[5].isOpen ? (
                          <ChevronUp className="h-5 w-5 text-slate-500" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-slate-500" />
                        )}
                      </div>
                    </div>
                    
                    {sections[5].isOpen && (
                      <div className="p-4 border-t border-slate-200">
                        <div className="bg-sky-50 border border-sky-100 rounded-lg p-4 mb-4">
                          <h4 className="text-navy-800 font-medium mb-2">Identity Verification Process</h4>
                          <p className="text-slate-600 text-sm mb-2">
                            To ensure platform integrity and consumer trust, all advisors must complete these verification steps:
                          </p>
                          <ul className="text-sm text-slate-600 space-y-2">
                            <li className="flex items-start">
                              <CheckCircle className={`mr-2 h-4 w-4 mt-0.5 ${isEmailVerified ? 'text-green-500' : 'text-slate-400'}`} />
                              <span>Email Verification {isEmailVerified ? '(Completed)' : '(Pending)'}</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle className={`mr-2 h-4 w-4 mt-0.5 ${isPhoneVerified ? 'text-green-500' : 'text-slate-400'}`} />
                              <span>Phone OTP Verification {isPhoneVerified ? '(Completed)' : '(Pending)'}</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle className="mr-2 h-4 w-4 mt-0.5 text-slate-400" />
                              <span>Regulatory Licensing Check (Completed after submission)</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle className="mr-2 h-4 w-4 mt-0.5 text-slate-400" />
                              <span>Background Screening (Requires consent)</span>
                            </li>
                          </ul>
                        </div>
                        
                        <div className="mt-4">
                          <div className="flex items-center mb-4">
                            <input
                              type="checkbox"
                              id="consentToBackgroundCheck"
                              name="consentToBackgroundCheck"
                              checked={formData.consentToBackgroundCheck}
                              onChange={handleChange}
                              className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-slate-300 rounded"
                              required
                            />
                            <label htmlFor="consentToBackgroundCheck" className="ml-2 block text-sm text-slate-700">
                              I consent to a background check and regulatory verification as part of the screening process*
                            </label>
                          </div>
                          
                          <p className="text-sm text-slate-600 mb-2">
                            Why verification matters:
                          </p>
                          <ul className="text-sm text-slate-600 list-disc pl-5 space-y-1">
                            <li>Builds trust and credibility with potential clients</li>
                            <li>Ensures only legitimate financial professionals are on the platform</li>
                            <li>Makes our platform the go-to place for verified financial experts</li>
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Subscription Plan Section */}
                  <div className="rounded-lg border border-slate-200 overflow-hidden">
                    <div 
                      className={`flex justify-between items-center p-4 cursor-pointer ${sections[6].isCompleted ? 'bg-green-50' : 'bg-slate-50'}`}
                      onClick={() => toggleSection('subscription')}
                    >
                      <div className="flex items-center">
                        <div className={`mr-3 ${sections[6].isCompleted ? 'text-green-600' : 'text-slate-700'}`}>
                          {sections[6].icon}
                        </div>
                        <h3 className="text-lg font-medium text-navy-800 flex items-center">
                          {sections[6].title}
                          {sections[6].isCompleted && (
                            <CheckCircle className="ml-2 h-4 w-4 text-green-600" />
                          )}
                        </h3>
                      </div>
                      <div>
                        {sections[6].isOpen ? (
                          <ChevronUp className="h-5 w-5 text-slate-500" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-slate-500" />
                        )}
                      </div>
                    </div>
                    
                    {sections[6].isOpen && (
                      <div className="p-4 border-t border-slate-200">
                        <p className="text-slate-600 mb-6">
                          Choose a subscription plan that best fits your needs. You can upgrade or downgrade at any time.
                        </p>
                        
                        <div className="grid md:grid-cols-3 gap-4">
                          {subscriptionPlans.map((plan) => (
                            <div 
                              key={plan.id} 
                              className={`border rounded-lg p-4 ${formData.subscriptionPlan === plan.id 
                                ? 'border-teal-500 bg-teal-50 shadow-sm' 
                                : 'border-slate-200 hover:border-slate-300'}`}
                              onClick={() => handleSubscriptionSelect(plan.id)}
                            >
                              <div className="flex justify-between items-start">
                                <h4 className="text-navy-800 font-medium">{plan.name}</h4>
                                <input
                                  type="radio"
                                  checked={formData.subscriptionPlan === plan.id}
                                  onChange={() => handleSubscriptionSelect(plan.id)}
                                  className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-slate-300"
                                />
                              </div>
                              <p className="text-2xl font-bold text-navy-800 my-2">${plan.price}<span className="text-sm font-normal text-slate-500">/month</span></p>
                              <ul className="mt-4 space-y-2">
                                {plan.features.map((feature, index) => (
                                  <li key={index} className="flex items-start text-sm">
                                    <CheckCircle className="h-4 w-4 text-teal-500 mr-2 mt-0.5" />
                                    <span>{feature}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                        
                        <p className="text-sm text-slate-500 mt-4">
                          Firm pricing available! Contact us for details on onboarding multiple advisors under one plan.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Consent & Communication Section */}
                  <div className="rounded-lg border border-slate-200 overflow-hidden">
                    <div 
                      className={`flex justify-between items-center p-4 cursor-pointer ${sections[7].isCompleted ? 'bg-green-50' : 'bg-slate-50'}`}
                      onClick={() => toggleSection('consent')}
                    >
                      <div className="flex items-center">
                        <div className={`mr-3 ${sections[7].isCompleted ? 'text-green-600' : 'text-slate-700'}`}>
                          {sections[7].icon}
                        </div>
                        <h3 className="text-lg font-medium text-navy-800 flex items-center">
                          {sections[7].title}
                          {sections[7].isCompleted && (
                            <CheckCircle className="ml-2 h-4 w-4 text-green-600" />
                          )}
                        </h3>
                      </div>
                      <div>
                        {sections[7].isOpen ? (
                          <ChevronUp className="h-5 w-5 text-slate-500" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-slate-500" />
                        )}
                      </div>
                    </div>
                    
                    {sections[7].isOpen && (
                      <div className="p-4 border-t border-slate-200 space-y-4">
                        <p className="text-slate-600 mb-2">
                          Before submitting your application, please review and confirm the following:
                        </p>
                        
                        <div className="space-y-3">
                          <div className="flex items-start">
                            <input
                              type="checkbox"
                              id="consentToTerms"
                              name="consentToTerms"
                              checked={formData.consentToTerms}
                              onChange={handleChange}
                              className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-slate-300 rounded mt-1"
                              required
                            />
                            <label htmlFor="consentToTerms" className="ml-2 block text-sm text-slate-700">
                              I have read and agree to the <a href="#" className="text-teal-600 hover:underline">Terms & Conditions</a> and <a href="#" className="text-teal-600 hover:underline">Privacy Policy</a>*
                            </label>
                          </div>
                          
                          <div className="flex items-start">
                            <input
                              type="checkbox"
                              id="consentToMarketing"
                              name="consentToMarketing"
                              checked={formData.consentToMarketing}
                              onChange={handleChange}
                              className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-slate-300 rounded mt-1"
                            />
                            <label htmlFor="consentToMarketing" className="ml-2 block text-sm text-slate-700">
                              I agree to receive platform updates, marketing materials, and newsletters. (You may opt out at any time.)
                            </label>
                          </div>
                          
                          <div className="flex items-start">
                            <input
                              type="checkbox"
                              id="consentToContact"
                              name="consentToContact"
                              checked={formData.consentToContact}
                              onChange={handleChange}
                              className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-slate-300 rounded mt-1"
                              required
                            />
                            <label htmlFor="consentToContact" className="ml-2 block text-sm text-slate-700">
                              I allow the platform to contact me regarding my profile, client inquiries, and promotional opportunities*
                            </label>
                          </div>
                        </div>
                        
                        <div className="bg-slate-50 p-4 rounded-lg mt-4">
                          <h4 className="text-navy-800 font-medium mb-2">What happens next?</h4>
                          <ul className="text-sm text-slate-600 space-y-2">
                            <li className="flex items-start">
                              <CheckCircle className="mr-2 h-4 w-4 text-teal-500 mt-0.5" />
                              <span>Our team will review and verify your details within 48 hours</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle className="mr-2 h-4 w-4 text-teal-500 mt-0.5" />
                              <span>You'll receive a confirmation email once your profile is approved</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle className="mr-2 h-4 w-4 text-teal-500 mt-0.5" />
                              <span>Consumers can start searching & booking appointments with you!</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-6 flex justify-between">
                    <button
                      type="submit"
                      className="btn-primary inline-flex items-center"
                    >
                      {saved ? (
                        <>
                          <CheckCircle className="mr-2 w-5 h-5" />
                          Profile Saved!
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 w-5 h-5" />
                          Save Profile
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleContinue}
                      className="btn-secondary inline-flex items-center"
                    >
                      Find Clients
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
      
      <AppointmentCategoryManager 
        isOpen={showCategoryManager} 
        onClose={() => setShowCategoryManager(false)} 
      />
    </AnimatedRoute>
  );
};

export default AdvisorProfile;

