
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedRoute from '../components/ui/AnimatedRoute';
import Header from '../components/layout/Header';
import { useUser, ConsumerProfile as ConsumerProfileType } from '../context/UserContext';
import { 
  ArrowRight, 
  Save, 
  CheckCircle, 
  MessageCircle, 
  Clock, 
  Activity, 
  ChevronRight,
  User,
  DollarSign,
  LineChart,
  MessageSquare,
  ShieldCheck,
  Percent,
  Wifi,
  WifiOff,
  Coffee
} from 'lucide-react';
import ProfilePictureUpload from '../components/profile/ProfilePictureUpload';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';
import { useTooltipContent } from '../hooks/useTooltipContent';
import ConsumerProfileTooltip from '../components/consumer/ConsumerProfileTooltip';
import { supabase } from '../integrations/supabase/client';

const riskToleranceOptions = [
  { value: 'conservative', label: 'Conservative – I prefer safe, low-risk investments' },
  { value: 'moderate', label: 'Moderate – A balance between risk & return' },
  { value: 'aggressive', label: 'Aggressive – High-growth, high-risk investing' }
];

const communicationOptions = [
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Phone' },
  { value: 'video', label: 'Video Call' },
  { value: 'inPerson', label: 'In-Person Meeting' }
];

const meetingTimeOptions = [
  { value: 'weekday_morning', label: 'Weekday Mornings' },
  { value: 'weekday_afternoon', label: 'Weekday Afternoons' },
  { value: 'weekday_evening', label: 'Weekday Evenings' },
  { value: 'weekend', label: 'Weekends' }
];

const languageOptions = [
  { value: 'english', label: 'English' },
  { value: 'french', label: 'French' },
  { value: 'spanish', label: 'Spanish' },
  { value: 'mandarin', label: 'Mandarin' },
  { value: 'cantonese', label: 'Cantonese' },
  { value: 'punjabi', label: 'Punjabi' },
  { value: 'hindi', label: 'Hindi' },
  { value: 'arabic', label: 'Arabic' }
];

const employmentStatusOptions = [
  { value: 'employed', label: 'Employed' },
  { value: 'self_employed', label: 'Self-Employed' },
  { value: 'retired', label: 'Retired' },
  { value: 'unemployed', label: 'Unemployed' },
  { value: 'student', label: 'Student' }
];

const provinceOptions = [
  { value: 'ab', label: 'Alberta' },
  { value: 'bc', label: 'British Columbia' },
  { value: 'mb', label: 'Manitoba' },
  { value: 'nb', label: 'New Brunswick' },
  { value: 'nl', label: 'Newfoundland and Labrador' },
  { value: 'ns', label: 'Nova Scotia' },
  { value: 'on', label: 'Ontario' },
  { value: 'pe', label: 'Prince Edward Island' },
  { value: 'qc', label: 'Quebec' },
  { value: 'sk', label: 'Saskatchewan' },
  { value: 'nt', label: 'Northwest Territories' },
  { value: 'nu', label: 'Nunavut' },
  { value: 'yt', label: 'Yukon' }
];

const advisorInvolvementOptions = [
  { value: 'hands_off', label: 'Hands-off guidance' },
  { value: 'regular', label: 'Regular check-ins' },
  { value: 'full_service', label: 'Full-service planning' }
];

const financialGoalsOptions = [
  { value: 'investment', label: 'Investment Planning & Wealth Growth' },
  { value: 'retirement', label: 'Retirement Planning' },
  { value: 'debt', label: 'Debt Management & Budgeting' },
  { value: 'tax', label: 'Tax & Estate Planning' },
  { value: 'credit', label: 'Credit & Loan Management' },
  { value: 'business', label: 'Entrepreneurship & Business Finance' },
  { value: 'insurance', label: 'Insurance & Risk Management' },
  { value: 'general', label: 'Not Sure – I Need General Guidance' }
];

const incomeRangeOptions = [
  { value: 'under_50k', label: 'Less than $50,000' },
  { value: '50k_100k', label: 'Between $50,000 - $100,000' },
  { value: '100k_250k', label: 'Between $100,000 - $250,000' },
  { value: '250k_500k', label: 'Between $250,000 - $500,000' },
  { value: 'over_500k', label: 'Over $500,000' }
];

const investableAssetsOptions = [
  { value: 'under_10k', label: 'Less than $10,000' },
  { value: '10k_50k', label: 'Between $10,000 - $50,000' },
  { value: '50k_250k', label: 'Between $50,000 - $250,000' },
  { value: '250k_1m', label: 'Between $250,000 - $1,000,000' },
  { value: 'over_1m', label: 'Over $1,000,000' }
];

const ConsumerProfile: React.FC = () => {
  const { consumerProfile, setConsumerProfile, updateOnlineStatus, saveProfileChanges, isAuthenticated, handleProfileUpdate } = useUser();
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;
  const { tooltipContent: tooltips, isLoading: tooltipsLoading } = useTooltipContent();
  
  const [formData, setFormData] = useState({
    id: 'consumer-1',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    province: '',
    postalCode: '',
    employmentStatus: '',
    industry: '',
    jobTitle: '',
    
    financialGoals: [] as string[],
    
    incomeRange: '',
    investableAssets: '',
    hasAdvisor: false,
    currentAdvisorReason: '',
    riskTolerance: 'moderate',
    
    preferredCommunication: [] as string[],
    preferredMeetingTimes: [] as string[],
    preferredLanguage: [] as string[],
    advisorInvolvement: '',
    wantsEducation: false,
    
    sharingConsent: false,
    termsConsent: false,
    advisorContactConsent: false,

    profilePicture: consumerProfile?.profilePicture || '',
    onlineStatus: 'online' as 'online' | 'offline' | 'away',
    lastOnline: new Date().toISOString(),
    showOnlineStatus: true,
    chatEnabled: true,
    
    matches: [] as string[],
    chats: [] as string[],
    appointments: [] as string[]
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await supabase.auth.getUser();
        if (!data?.user) {
          toast.error("You must be signed in to update your profile");
          setTimeout(() => {
            navigate('/sign-in', { state: { returnUrl: '/consumer-profile' } });
          }, 1500);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        toast.error("Authentication error occurred");
      }
    };
    
    checkAuth();
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleMultiSelectChange = (field: string, value: string) => {
    setFormData(prev => {
      const currentValues = prev[field as keyof typeof prev] as string[];
      
      if (Array.isArray(currentValues)) {
        if (currentValues.includes(value)) {
          return {
            ...prev,
            [field]: currentValues.filter(v => v !== value)
          };
        } else {
          return {
            ...prev,
            [field]: [...currentValues, value]
          };
        }
      }
      
      return prev;
    });
  };

  const handlePictureChange = (imageBase64: string) => {
    setFormData(prev => ({
      ...prev,
      profilePicture: imageBase64
    }));
  };

  const handleOnlineStatusChange = (status: 'online' | 'offline' | 'away') => {
    setFormData(prev => ({
      ...prev,
      onlineStatus: status
    }));
  };

  const handleToggleOnlineStatus = () => {
    setFormData(prev => ({
      ...prev,
      showOnlineStatus: !prev.showOnlineStatus
    }));
  };

  const handleToggleChat = () => {
    setFormData(prev => ({
      ...prev,
      chatEnabled: !prev.chatEnabled
    }));
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (!formData.firstName || !formData.lastName || !formData.email) {
        toast.error("Please fill in all required fields");
        return;
      }
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        toast.error("Please enter a valid email address");
        return;
      }
    }
    
    if (currentStep === totalSteps) {
      handleSubmit();
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    if (!formData.termsConsent) {
      toast.error("You must agree to the Terms & Conditions to continue");
      return;
    }
    
    const { data } = await supabase.auth.getUser();
    if (!data?.user) {
      toast.error("You must be signed in to save your profile");
      setTimeout(() => {
        navigate('/sign-in', { state: { returnUrl: '/consumer-profile' } });
      }, 1500);
      return;
    }
    
    const updatedProfile: ConsumerProfileType = {
      id: consumerProfile?.id || 'consumer-1',
      name: `${formData.firstName} ${formData.lastName}`,
      age: calculateAge(formData.dateOfBirth),
      status: formData.employmentStatus,
      investableAssets: getInvestableAssetValue(formData.investableAssets),
      
      riskTolerance: mapRiskToleranceValue(formData.riskTolerance),
      
      preferredCommunication: formData.preferredCommunication,
      preferredLanguage: formData.preferredLanguage,
      profilePicture: formData.profilePicture,
      matches: formData.matches,
      chats: formData.chats,
      chatEnabled: formData.chatEnabled,
      appointments: formData.appointments,
      onlineStatus: formData.onlineStatus,
      lastOnline: formData.lastOnline,
      showOnlineStatus: formData.showOnlineStatus,
      startTimeline: 'not_sure',
      
      email: formData.email,
      phone: formData.phone,
      dateOfBirth: formData.dateOfBirth,
      province: formData.province,
      postalCode: formData.postalCode,
      industry: formData.industry,
      jobTitle: formData.jobTitle,
      financialGoals: formData.financialGoals,
      incomeRange: formData.incomeRange,
      hasAdvisor: formData.hasAdvisor,
      currentAdvisorReason: formData.currentAdvisorReason,
      preferredMeetingTimes: formData.preferredMeetingTimes,
      advisorInvolvement: formData.advisorInvolvement,
      wantsEducation: formData.wantsEducation,
      termsConsent: formData.termsConsent,
      advisorContactConsent: formData.advisorContactConsent
    };
    
    setConsumerProfile(updatedProfile);
    updateOnlineStatus(updatedProfile.onlineStatus);
    
    setSaved(true);
    
    try {
      console.log("[ConsumerProfile] Saving profile:", updatedProfile);
      const success = await saveProfileChanges();
      
      if (success) {
        toast.success("Profile successfully created and saved!");
        
        setTimeout(() => {
          setSaved(false);
          navigate('/matches');
        }, 2000);
      } else {
        setSaved(false);
        toast.error("Profile was created but could not be saved to the server. Please try again later.");
      }
    } catch (error) {
      console.error("[ConsumerProfile] Error saving profile:", error);
      setSaved(false);
      toast.error("An unexpected error occurred while saving your profile.");
    }
  };

  const mapRiskToleranceValue = (value: string): 'low' | 'medium' | 'high' => {
    switch (value) {
      case 'conservative': return 'low';
      case 'aggressive': return 'high';
      case 'moderate':
      default: return 'medium';
    }
  };

  const calculateAge = (dob: string): number => {
    if (!dob) return 0;
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const getInvestableAssetValue = (range: string): number => {
    switch (range) {
      case 'under_10k': return 5000;
      case '10k_50k': return 30000;
      case '50k_250k': return 150000;
      case '250k_1m': return 625000;
      case 'over_1m': return 1500000;
      default: return 0;
    }
  };

  const renderStepIndicator = () => {
    return (
      <div className="w-full mb-8">
        <div className="flex justify-between mb-2">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div 
              key={index}
              className={`flex items-center justify-center h-8 w-8 rounded-full text-sm font-medium ${
                currentStep > index 
                  ? 'bg-teal-500 text-white' 
                  : currentStep === index + 1 
                    ? 'bg-teal-100 text-teal-800 border-2 border-teal-500' 
                    : 'bg-gray-200 text-gray-500'
              }`}
            >
              {index + 1}
            </div>
          ))}
        </div>
        <div className="relative w-full h-2 bg-gray-200 rounded">
          <div 
            className="absolute top-0 left-0 h-2 bg-teal-500 rounded"
            style={{ width: `${(currentStep - 1) / (totalSteps - 1) * 100}%` }}
          ></div>
        </div>
        <div className="text-right text-sm text-gray-600 mt-1">
          {Math.round((currentStep / totalSteps) * 100)}% Complete
        </div>
      </div>
    );
  };

  const renderPersonalInformation = () => {
    return (
      <div className="animate-fade-in">
        <div className="flex items-center mb-6">
          <User className="w-6 h-6 text-teal-600 mr-2" />
          <h2 className="text-2xl font-serif font-semibold text-navy-900">
            Personal Information
          </h2>
        </div>
        
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-navy-800 mb-1">
                First Name*
              </label>
              <Input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Your first name"
                required
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-navy-800 mb-1">
                Last Name*
              </label>
              <Input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Your last name"
                required
              />
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-navy-800 mb-1">
                Email Address*
              </label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                We'll send a verification email to this address
              </p>
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-navy-800 mb-1">
                Phone Number
              </label>
              <Input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="(123) 456-7890"
              />
              <p className="text-xs text-gray-500 mt-1">
                Optional but recommended for advisor contact
              </p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="dateOfBirth" className="block text-sm font-medium text-navy-800 mb-1">
                Date of Birth*
              </label>
              <Input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="province" className="block text-sm font-medium text-navy-800 mb-1">
                Province/Territory*
              </label>
              <select
                id="province"
                name="province"
                value={formData.province}
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                required
              >
                <option value="">Select Province/Territory</option>
                {provinceOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="postalCode" className="block text-sm font-medium text-navy-800 mb-1">
                Postal Code*
              </label>
              <Input
                type="text"
                id="postalCode"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                placeholder="A1A 1A1"
                required
              />
            </div>
            <div>
              <label htmlFor="employmentStatus" className="block text-sm font-medium text-navy-800 mb-1">
                Employment Status*
              </label>
              <select
                id="employmentStatus"
                name="employmentStatus"
                value={formData.employmentStatus}
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                required
              >
                <option value="">Select Employment Status</option>
                {employmentStatusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="industry" className="block text-sm font-medium text-navy-800 mb-1">
                Industry
              </label>
              <Input
                type="text"
                id="industry"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                placeholder="e.g. Technology, Healthcare"
              />
            </div>
            <div>
              <label htmlFor="jobTitle" className="block text-sm font-medium text-navy-800 mb-1">
                Job Title
              </label>
              <Input
                type="text"
                id="jobTitle"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                placeholder="e.g. Software Developer, Nurse"
              />
            </div>
          </div>
          
          <div className="flex justify-center">
            <ProfilePictureUpload 
              currentPicture={formData.profilePicture}
              onPictureChange={handlePictureChange}
              size="lg"
            />
          </div>
        </div>
      </div>
    );
  };

  const renderFinancialGoals = () => {
    const financialGoalsTooltip = tooltips && Array.isArray(tooltips) ? 
      tooltips.find(t => t.section_key === 'financial_goals') : null;
    
    return (
      <div className="animate-fade-in">
        <div className="flex items-center mb-6">
          <LineChart className="w-6 h-6 text-teal-600 mr-2" />
          <h2 className="text-2xl font-serif font-semibold text-navy-900">
            Financial Goals & Priorities
          </h2>
        </div>
        
        <div className="space-y-6">
          <div>
            <ConsumerProfileTooltip 
              title={financialGoalsTooltip?.title || "Financial Goals"}
              description={financialGoalsTooltip?.description || "Your primary financial objectives. This information helps advisors understand what you want to achieve and recommend tailored strategies."}
            >
              <label className="block text-sm font-medium text-navy-800 mb-3">
                What is your main reason for seeking a financial advisor?
                <span className="text-xs text-gray-500 ml-2">(Select all that apply)</span>
              </label>
            </ConsumerProfileTooltip>
            <div className="grid md:grid-cols-2 gap-3">
              {financialGoalsOptions.map(option => (
                <div key={option.value} className="flex items-center p-3 border rounded-md hover:bg-gray-50">
                  <input
                    type="checkbox"
                    id={`goal-${option.value}`}
                    checked={formData.financialGoals.includes(option.value)}
                    onChange={() => handleMultiSelectChange('financialGoals', option.value)}
                    className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                  />
                  <label htmlFor={`goal-${option.value}`} className="ml-2 block text-sm text-gray-700">
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-3">
              Your selected goals help us match you with advisors who specialize in these areas.
            </p>
          </div>
        </div>
      </div>
    );
  };

  const renderFinancialProfile = () => {
    const riskToleranceTooltip = tooltips && Array.isArray(tooltips) ? 
      tooltips.find(t => t.section_key === 'risk_tolerance') : null;
    const investableAssetsTooltip = tooltips && Array.isArray(tooltips) ? 
      tooltips.find(t => t.section_key === 'investable_assets') : null;
    
    return (
      <div className="animate-fade-in">
        <div className="flex items-center mb-6">
          <DollarSign className="w-6 h-6 text-teal-600 mr-2" />
          <h2 className="text-2xl font-serif font-semibold text-navy-900">
            Financial Profile
          </h2>
        </div>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-navy-800 mb-3">
              What is your approximate annual household income?
            </label>
            <div className="space-y-2">
              {incomeRangeOptions.map(option => (
                <div key={option.value} className="flex items-center">
                  <input
                    type="radio"
                    id={`income-${option.value}`}
                    name="incomeRange"
                    value={option.value}
                    checked={formData.incomeRange === option.value}
                    onChange={handleChange}
                    className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300"
                  />
                  <label htmlFor={`income-${option.value}`} className="ml-2 block text-sm text-gray-700">
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <ConsumerProfileTooltip
              title={investableAssetsTooltip?.title || "Investable Assets"}
              description={investableAssetsTooltip?.description || "The total value of assets you have available for investment. This helps advisors understand your financial capacity and recommend appropriate strategies."}
            >
              <label className="block text-sm font-medium text-navy-800 mb-3">
                What is your total investable asset value?
                <span className="text-xs text-gray-500 ml-2">(Excluding primary residence)</span>
              </label>
            </ConsumerProfileTooltip>
            <div className="space-y-2">
              {investableAssetsOptions.map(option => (
                <div key={option.value} className="flex items-center">
                  <input
                    type="radio"
                    id={`assets-${option.value}`}
                    name="investableAssets"
                    value={option.value}
                    checked={formData.investableAssets === option.value}
                    onChange={handleChange}
                    className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300"
                  />
                  <label htmlFor={`assets-${option.value}`} className="ml-2 block text-sm text-gray-700">
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-navy-800 mb-3">
              Do you currently work with a financial advisor?
            </label>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="hasAdvisor-yes"
                  name="hasAdvisor"
                  value="true"
                  checked={formData.hasAdvisor === true}
                  onChange={() => setFormData(prev => ({ ...prev, hasAdvisor: true }))}
                  className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300"
                />
                <label htmlFor="hasAdvisor-yes" className="ml-2 block text-sm text-gray-700">Yes</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="hasAdvisor-no"
                  name="hasAdvisor"
                  value="false"
                  checked={formData.hasAdvisor === false}
                  onChange={() => setFormData(prev => ({ ...prev, hasAdvisor: false }))}
                  className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300"
                />
                <label htmlFor="hasAdvisor-no" className="ml-2 block text-sm text-gray-700">No</label>
              </div>
            </div>
            
            {formData.hasAdvisor && (
              <div className="mt-3">
                <label htmlFor="currentAdvisorReason" className="block text-sm font-medium text-navy-800 mb-1">
                  Why are you looking for a new advisor?
                </label>
                <Textarea
                  id="currentAdvisorReason"
                  name="currentAdvisorReason"
                  value={formData.currentAdvisorReason}
                  onChange={handleChange}
                  placeholder="Please explain briefly"
                  className="min-h-[80px]"
                />
              </div>
            )}
          </div>
          
          <div>
            <ConsumerProfileTooltip
              title={riskToleranceTooltip?.title || "Risk Tolerance"}
              description={riskToleranceTooltip?.description || "Your comfort level with investment volatility. Low risk means prioritizing stability over growth potential, while high risk indicates comfort with fluctuations for potentially higher returns."}
            >
              <label className="block text-sm font-medium text-navy-800 mb-3">
                How would you describe your risk tolerance?
              </label>
            </ConsumerProfileTooltip>
            <div className="space-y-2">
              {riskToleranceOptions.map(option => (
                <div key={option.value} className="flex items-center">
                  <input
                    type="radio"
                    id={`risk-${option.value}`}
                    name="riskTolerance"
                    value={option.value}
                    checked={formData.riskTolerance === option.value}
                    onChange={handleChange}
                    className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300"
                  />
                  <label htmlFor={`risk-${option.value}`} className="ml-2 block text-sm text-gray-700">
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderServiceExpectations = () => {
    const languageTooltip = tooltips && Array.isArray(tooltips) ? 
      tooltips.find(t => t.section_key === 'preferred_language') : null;
    
    return (
      <div className="animate-fade-in">
        <div className="flex items-center mb-6">
          <MessageSquare className="w-6 h-6 text-teal-600 mr-2" />
          <h2 className="text-2xl font-serif font-semibold text-navy-900">
            Service Expectations & Preferences
          </h2>
        </div>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-navy-800 mb-3">
              Preferred method of communication
              <span className="text-xs text-gray-500 ml-2">(Select all that apply)</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              {communicationOptions.map(option => (
                <div key={option.value} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`comm-${option.value}`}
                    checked={formData.preferredCommunication.includes(option.value)}
                    onChange={() => handleMultiSelectChange('preferredCommunication', option.value)}
                    className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                  />
                  <label htmlFor={`comm-${option.value}`} className="ml-2 block text-sm text-gray-700">
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-navy-800 mb-3">
              Preferred meeting times
              <span className="text-xs text-gray-500 ml-2">(Select all that apply)</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              {meetingTimeOptions.map(option => (
                <div key={option.value} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`time-${option.value}`}
                    checked={formData.preferredMeetingTimes.includes(option.value)}
                    onChange={() => handleMultiSelectChange('preferredMeetingTimes', option.value)}
                    className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                  />
                  <label htmlFor={`time-${option.value}`} className="ml-2 block text-sm text-gray-700">
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <ConsumerProfileTooltip
              title={languageTooltip?.title || "Language Preferences"}
              description={languageTooltip?.description || "These are the languages you'd prefer your advisor to speak. This helps us match you with advisors who can communicate effectively with you."}
            >
              <label className="block text-sm font-medium text-navy-800 mb-3">
                Preferred language
                <span className="text-xs text-gray-500 ml-2">(Select all that apply)</span>
              </label>
            </ConsumerProfileTooltip>
            <div className="grid grid-cols-2 gap-2">
              {languageOptions.map(option => (
                <div key={option.value} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`lang-${option.value}`}
                    checked={formData.preferredLanguage.includes(option.value)}
                    onChange={() => handleMultiSelectChange('preferredLanguage', option.value)}
                    className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                  />
                  <label htmlFor={`lang-${option.value}`} className="ml-2 block text-sm text-gray-700">
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-navy-800 mb-3">
              Preferred advisor involvement level
            </label>
            <div className="space-y-2">
              {advisorInvolvementOptions.map(option => (
                <div key={option.value} className="flex items-center">
                  <input
                    type="radio"
                    id={`involvement-${option.value}`}
                    name="advisorInvolvement"
                    value={option.value}
                    checked={formData.advisorInvolvement === option.value}
                    onChange={handleChange}
                    className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300"
                  />
                  <label htmlFor={`involvement-${option.value}`} className="ml-2 block text-sm text-gray-700">
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-navy-800 mb-3">
              Do you want your advisor to explain concepts and educate you?
            </label>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="education-yes"
                  name="wantsEducation"
                  value="true"
                  checked={formData.wantsEducation === true}
                  onChange={() => setFormData(prev => ({ ...prev, wantsEducation: true }))}
                  className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300"
                />
                <label htmlFor="education-yes" className="ml-2 block text-sm text-gray-700">Yes</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="education-no"
                  name="wantsEducation"
                  value="false"
                  checked={formData.wantsEducation === false}
                  onChange={() => setFormData(prev => ({ ...prev, wantsEducation: false }))}
                  className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300"
                />
                <label htmlFor="education-no" className="ml-2 block text-sm text-gray-700">No</label>
              </div>
            </div>
          </div>
          
          {renderChatPreferences()}
        </div>
      </div>
    );
  };

  const renderChatPreferences = () => {
    return (
      <div className="mt-6 border-t pt-6 border-gray-200">
        <div className="flex items-center mb-4">
          <MessageCircle className="w-5 h-5 text-teal-600 mr-2" />
          <h3 className="text-lg font-medium text-navy-800">Chat Preferences</h3>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-navy-800 mb-3">
              Online Status
            </label>
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => handleOnlineStatusChange('online')}
                className={`flex items-center px-3 py-2 rounded-md ${
                  formData.onlineStatus === 'online'
                    ? 'bg-teal-100 text-teal-700 border border-teal-300'
                    : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                }`}
              >
                <Wifi className="w-4 h-4 mr-2" />
                Online
              </button>
              <button
                type="button"
                onClick={() => handleOnlineStatusChange('away')}
                className={`flex items-center px-3 py-2 rounded-md ${
                  formData.onlineStatus === 'away'
                    ? 'bg-amber-100 text-amber-700 border border-amber-300'
                    : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                }`}
              >
                <Coffee className="w-4 h-4 mr-2" />
                Away
              </button>
              <button
                type="button"
                onClick={() => handleOnlineStatusChange('offline')}
                className={`flex items-center px-3 py-2 rounded-md ${
                  formData.onlineStatus === 'offline'
                    ? 'bg-gray-200 text-gray-700 border border-gray-300'
                    : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                }`}
              >
                <WifiOff className="w-4 h-4 mr-2" />
                Offline
              </button>
            </div>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="showOnlineStatus"
              checked={formData.showOnlineStatus}
              onChange={handleToggleOnlineStatus}
              className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
            />
            <label htmlFor="showOnlineStatus" className="ml-2 block text-sm text-gray-700">
              Show my online status to matched advisors
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="chatEnabled"
              checked={formData.chatEnabled}
              onChange={handleToggleChat}
              className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
            />
            <label htmlFor="chatEnabled" className="ml-2 block text-sm text-gray-700">
              Enable in-app chat messaging
            </label>
          </div>
        </div>
      </div>
    );
  };

  const renderConsent = () => {
    return (
      <div className="animate-fade-in">
        <div className="flex items-center mb-6">
          <ShieldCheck className="w-6 h-6 text-teal-600 mr-2" />
          <h2 className="text-2xl font-serif font-semibold text-navy-900">
            Consent & Preferences
          </h2>
        </div>
        
        <div className="space-y-6">
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-700 mb-4">
              To provide you with the best service and match you with the right financial advisor, we need your consent for the following:
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    name="termsConsent"
                    type="checkbox"
                    checked={formData.termsConsent}
                    onChange={(e) => setFormData(prev => ({ ...prev, termsConsent: e.target.checked }))}
                    className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="font-medium text-gray-700">
                    I agree to the Terms & Conditions*
                  </label>
                  <p className="text-gray-500">
                    By checking this box, you agree to our{" "}
                    <a href="/terms" className="text-teal-600 hover:text-teal-700" target="_blank">
                      Terms of Service
                    </a>
                    {" "}and{" "}
                    <a href="/privacy" className="text-teal-600 hover:text-teal-700" target="_blank">
                      Privacy Policy
                    </a>.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="advisorContact"
                    name="advisorContactConsent"
                    type="checkbox"
                    checked={formData.advisorContactConsent}
                    onChange={(e) => setFormData(prev => ({ ...prev, advisorContactConsent: e.target.checked }))}
                    className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="advisorContact" className="font-medium text-gray-700">
                    I consent to being contacted by advisors
                  </label>
                  <p className="text-gray-500">
                    Allow financial advisors to contact you directly via email or phone about potential services.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderPersonalInformation();
      case 2:
        return renderFinancialGoals();
      case 3:
        return renderFinancialProfile();
      case 4:
        return renderServiceExpectations();
      case 5:
        return renderConsent();
      default:
        return renderPersonalInformation();
    }
  };

  return (
    <AnimatedRoute>
      <Header />
      <div className="flex-grow pt-20">
        <main className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-3xl font-serif font-bold text-navy-900 mb-2">
            Create Your Profile
          </h1>
          <p className="text-gray-600 mb-10">
            Help us match you with the right financial advisor by telling us about yourself and your financial goals.
          </p>
          
          {renderStepIndicator()}
          
          <div className="bg-white shadow-lg rounded-xl p-6 mb-8">
            {renderCurrentStep()}
            
            <div className="mt-8 flex justify-between">
              {currentStep > 1 ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePreviousStep}
                  className="px-4 py-2"
                >
                  Back
                </Button>
              ) : (
                <div></div>
              )}
              
              <Button
                type="button"
                onClick={handleNextStep}
                className="px-6 py-2"
                disabled={saved}
              >
                {currentStep === totalSteps ? (
                  saved ? (
                    <span className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Saved!
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Save className="w-4 h-4 mr-2" />
                      Submit Profile
                    </span>
                  )
                ) : (
                  <span className="flex items-center">
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </span>
                )}
              </Button>
            </div>
          </div>
        </main>
      </div>
      {/* Removed the AppFooter component */}
    </AnimatedRoute>
  );
};

export default ConsumerProfile;
