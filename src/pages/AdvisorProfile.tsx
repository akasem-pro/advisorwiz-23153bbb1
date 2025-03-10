import React, { useState, useEffect, ChangeEvent } from 'react';
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
import ProfilePictureUpload from '../components/profile/ProfilePictureUpload';
import AvailabilityScheduler from '../components/advisor/AvailabilityScheduler';
import AppointmentCategoryManager from '../components/scheduler/AppointmentCategoryManager';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Checkbox } from '../components/ui/checkbox';

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
  { value: 'flat_fee', label: 'Flat Fee', fieldType: 'currency', placeholder: 'e.g., $1,000' },
  { value: 'percent_assets', label: 'Percentage of Assets', fieldType: 'percentage', placeholder: 'e.g., 1.5%' },
  { value: 'hourly', label: 'Hourly Rate', fieldType: 'currency', placeholder: 'e.g., $250/hour' },
  { value: 'subscription', label: 'Subscription-based', fieldType: 'currency', placeholder: 'e.g., $99/month' },
  { value: 'commission', label: 'Commission-based', fieldType: 'percentage', placeholder: 'e.g., 3%' },
  { value: 'hybrid', label: 'Hybrid Model', fieldType: 'text', placeholder: 'Describe your fee structure' }
];

// Define minimum investment options
const minimumInvestmentOptions = [
  { value: 'entry_level', label: 'Entry-Level Investors', range: '$0 to $50,000' },
  { value: 'mass_affluent', label: 'Mass Affluent Investors', range: '$50,000 to $500,000' },
  { value: 'hnwi', label: 'High-Net-Worth Individuals (HNWIs)', range: '$500,000 to $5 million' },
  { value: 'uhnwi', label: 'Ultra-High-Net-Worth Individuals (UHNWIs)', range: '$5 million and above' }
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
  feeAmount: string;
  minimumInvestmentCategory: string;
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
  consentToDataProcessing: boolean;
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
    websiteUrl: '', 
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
                              Licensing Body
                            </label>
                            <select
                              id="licensingBody"
                              name="licensingBody"
                              value={formData.licensingBody}
                              onChange={handleChange}
                              className="input-field"
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
                              Registration Number
                            </label>
                            <Input
                              type="text"
                              id="registrationNumber"
                              name="registrationNumber"
                              value={formData.registrationNumber}
                              onChange={handleChange}
                              placeholder="Your registration number"
                            />
                          </div>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="yearsOfExperience" className="block text-sm font-medium text-navy-800 mb-1">
                              Years of Experience
                            </label>
                            <select
                              id="yearsOfExperience"
                              name="yearsOfExperience"
                              value={formData.yearsOfExperience}
                              onChange={handleChange}
                              className="input-field"
                            >
                              <option value="">Select years of experience</option>
                              {experienceOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label htmlFor="hasViolations" className="block text-sm font-medium text-navy-800 mb-1">
                              Has Violations
                            </label>
                            <Checkbox
                              id="hasViolations"
                              name="hasViolations"
                              checked={formData.hasViolations}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Expertise Section */}
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
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="feeStructure" className="block text-sm font-medium text-navy-800 mb-1">
                              Fee Structure
                            </label>
                            <select
                              id="feeStructure"
                              name="feeStructure"
                              value={formData.feeStructure}
                              onChange={handleChange}
                              className="input-field"
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
                            <label htmlFor="feeAmount" className="block text-sm font-medium text-navy-800 mb-1">
                              Fee Amount
                            </label>
                            <Input
                              type="text"
                              id="feeAmount"
                              name="feeAmount"
                              value={formData.feeAmount}
                              onChange={handleChange}
                              placeholder="Enter fee amount"
                            />
                          </div>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="minimumInvestmentCategory" className="block text-sm font-medium text-navy-800 mb-1">
                              Minimum Investment Category
                            </label>
                            <select
                              id="minimumInvestmentCategory"
                              name="minimumInvestmentCategory"
                              value={formData.minimumInvestmentCategory}
                              onChange={handleChange}
                              className="input-field"
                            >
                              <option value="">Select minimum investment category</option>
                              {minimumInvestmentOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label htmlFor="minimumInvestment" className="block text-sm font-medium text-navy-800 mb-1">
                              Minimum Investment
                            </label>
                            <Input
                              type="text"
                              id="minimumInvestment"
                              name="minimumInvestment"
                              value={formData.minimumInvestment}
                              onChange={handleChange}
                              placeholder="Enter minimum investment"
                            />
                          </div>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="preferredClientTypes" className="block text-sm font-medium text-navy-800 mb-1">
                              Preferred Client Types
                            </label>
                            <select
                              id="preferredClientTypes"
                              name="preferredClientTypes"
                              multiple
                              value={formData.preferredClientTypes}
                              onChange={e => handleMultiSelectChange('preferredClientTypes', e.target.value)}
                              className="input-field"
                            >
                              {clientTypeOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label htmlFor="preferredMeetingMethods" className="block text-sm font-medium text-navy-800 mb-1">
                              Preferred Meeting Methods
                            </label>
                            <select
                              id="preferredMeetingMethods"
                              name="preferredMeetingMethods"
                              multiple
                              value={formData.preferredMeetingMethods}
                              onChange={e => handleMultiSelectChange('preferredMeetingMethods', e.target.value)}
                              className="input-field"
                            >
                              {meetingMethodOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
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
                            <label htmlFor="bio" className="block text-sm font-medium text-navy-800 mb-1">
                              Bio
                            </label>
                            <Textarea
                              id="bio"
                              name="bio"
                              value={formData.bio}
                              onChange={handleChange}
                              placeholder="Tell us about yourself"
                            />
                          </div>
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
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="profilePicture" className="block text-sm font-medium text-navy-800 mb-1">
                              Profile Picture
                            </label>
                            <ProfilePictureUpload
                              value={formData.profilePicture}
                              onChange={handlePictureChange}
                            />
                          </div>
                          <div>
                            <label htmlFor="bio" className="block text-sm font-medium text-navy-800 mb-1">
                              Bio
                            </label>
                            <Textarea
                              id="bio"
                              name="bio"
                              value={formData.bio}
                              onChange={handleChange}
                              placeholder="Tell us about yourself"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Identity Verification & Compliance Section */}
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
                      <div className="p-4 border-t border-slate-200 space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="consentToBackgroundCheck" className="block text-sm font-medium text-navy-800 mb-1">
                              Consent to Background Check
                            </label>
                            <Checkbox
                              id="consentToBackgroundCheck"
                              name="consentToBackgroundCheck"
                              checked={formData.consentToBackgroundCheck}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Choose Your Subscription Section */}
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
                      <div className="p-4 border-t border-slate-200 space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="subscriptionPlan" className="block text-sm font-medium text-navy-800 mb-1">
                              Subscription Plan
                            </label>
                            <select
                              id="subscriptionPlan"
                              name="subscriptionPlan"
                              value={formData.subscriptionPlan}
                              onChange={handleSubscriptionSelect}
                              className="input-field"
                            >
                              <option value="">Select subscription plan</option>
                              {subscriptionPlans.map(plan => (
                                <option key={plan.id} value={plan.id}>
                                  {plan.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
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
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="consentToTerms" className="block text-sm font-medium text-navy-800 mb-1">
                              Consent to Terms
                            </label>
                            <Checkbox
                              id="consentToTerms"
                              name="consentToTerms"
                              checked={formData.consentToTerms}
                              onChange={handleChange}
                            />
                          </div>
                          <div>
                            <label htmlFor="consentToMarketing" className="block text-sm font-medium text-navy-800 mb-1">
                              Consent to Marketing
                            </label>
                            <Checkbox
                              id="consentToMarketing"
                              name="consentToMarketing"
                              checked={formData.consentToMarketing}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="consentToContact" className="block text-sm font-medium text-navy-800 mb-1">
                              Consent to Contact
                            </label>
                            <Checkbox
                              id="consentToContact"
                              name="consentToContact"
                              checked={formData.consentToContact}
                              onChange={handleChange}
                            />
                          </div>
                          <div>
                            <label htmlFor="consentToDataProcessing" className="block text-sm font-medium text-navy-800 mb-1">
                              Consent to Data Processing
                            </label>
                            <Checkbox
                              id="consentToDataProcessing"
                              name="consentToDataProcessing"
                              checked={formData.consentToDataProcessing}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

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
