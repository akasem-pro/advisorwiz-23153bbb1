
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedRoute from '../components/ui/AnimatedRoute';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
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
  Percent
} from 'lucide-react';
import ProfilePictureUpload from '../components/profile/ProfilePictureUpload';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';

// Define all required options for form fields
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
  const { consumerProfile, setConsumerProfile, updateOnlineStatus } = useUser();
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;
  
  // Enhanced form data with all the new fields
  const [formData, setFormData] = useState({
    // Personal Information
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
    
    // Financial Goals
    financialGoals: [] as string[],
    
    // Financial Profile
    incomeRange: '',
    investableAssets: '',
    hasAdvisor: false,
    currentAdvisorReason: '',
    riskTolerance: 'moderate',
    
    // Service Expectations
    preferredCommunication: [] as string[],
    preferredMeetingTimes: [] as string[],
    preferredLanguage: [] as string[],
    advisorInvolvement: '',
    wantsEducation: false,
    
    // Compliance
    sharingConsent: false,
    termsConsent: false,
    advisorContactConsent: false,

    // Profile picture and status
    profilePicture: consumerProfile?.profilePicture || '',
    onlineStatus: 'online' as 'online' | 'offline' | 'away',
    lastOnline: new Date().toISOString(),
    showOnlineStatus: true,
    chatEnabled: true,
    
    // Default fields for compatibility
    matches: [] as string[],
    chats: [] as string[],
    appointments: [] as string[]
  });

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

  const handleNextStep = () => {
    // Basic validation for required fields in the current step
    if (currentStep === 1) {
      if (!formData.firstName || !formData.lastName || !formData.email) {
        toast.error("Please fill in all required fields");
        return;
      }
      
      // Email validation
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

  const handleSubmit = () => {
    // Check for required consents
    if (!formData.termsConsent) {
      toast.error("You must agree to the Terms & Conditions to continue");
      return;
    }
    
    // Build the consumer profile object from form data
    const updatedProfile: ConsumerProfileType = {
      id: formData.id,
      name: `${formData.firstName} ${formData.lastName}`,
      age: calculateAge(formData.dateOfBirth),
      status: formData.employmentStatus,
      investableAssets: getInvestableAssetValue(formData.investableAssets),
      riskTolerance: formData.riskTolerance as 'low' | 'medium' | 'high',
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
      
      // Store additional data in the profile object
      // These would typically be added to the type definition
      // @ts-ignore - We're adding custom fields not in the type
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
    toast.success("Profile successfully created!");
    
    setTimeout(() => {
      setSaved(false);
      navigate('/matches');
    }, 2000);
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
    // Return a representative value based on the selected range
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
            <label className="block text-sm font-medium text-navy-800 mb-3">
              What is your main reason for seeking a financial advisor?
              <span className="text-xs text-gray-500 ml-2">(Select all that apply)</span>
            </label>
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
            <label className="block text-sm font-medium text-navy-800 mb-3">
              What is your total investable asset value?
              <span className="text-xs text-gray-500 ml-2">(Excluding primary residence)</span>
            </label>
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
            <label className="block text-sm font-medium text-navy-800 mb-3">
              How would you describe your risk tolerance?
            </label>
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
            <label className="block text-sm font-medium text-navy-800 mb-3">
              Do you prefer a financial advisor who speaks a specific language?
              <span className="text-xs text-gray-500 ml-2">(Select all that apply)</span>
            </label>
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
              How involved do you want your advisor to be?
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
          
          <div className="flex items-center">
            <input
              id="wantsEducation"
              name="wantsEducation"
              type="checkbox"
              checked={formData.wantsEducation}
              onChange={(e) => setFormData(prev => ({ ...prev, wantsEducation: e.target.checked }))}
              className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
            />
            <label htmlFor="wantsEducation" className="ml-2 block text-sm text-gray-700">
              I would like to receive financial education & updates (newsletters, webinars, insights)
            </label>
          </div>
        </div>
      </div>
    );
  };

  const renderCompliance = () => {
    return (
      <div className="animate-fade-in">
        <div className="flex items-center mb-6">
          <ShieldCheck className="w-6 h-6 text-teal-600 mr-2" />
          <h2 className="text-2xl font-serif font-semibold text-navy-900">
            Compliance & Legal Disclosures
          </h2>
        </div>
        
        <div className="space-y-6">
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600 mb-4">
              AdvisorWiz takes your privacy and data security seriously. Please review and confirm the following to proceed:
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <input
                  id="sharingConsent"
                  name="sharingConsent"
                  type="checkbox"
                  checked={formData.sharingConsent}
                  onChange={(e) => setFormData(prev => ({ ...prev, sharingConsent: e.target.checked }))}
                  className="h-4 w-4 mt-1 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                />
                <label htmlFor="sharingConsent" className="ml-2 block text-sm text-gray-700">
                  I am comfortable sharing my financial details for advisory purposes. This information will only be shared with matched advisors and used to provide personalized financial guidance.
                </label>
              </div>
              
              <div className="flex items-start">
                <input
                  id="termsConsent"
                  name="termsConsent"
                  type="checkbox"
                  checked={formData.termsConsent}
                  onChange={(e) => setFormData(prev => ({ ...prev, termsConsent: e.target.checked }))}
                  className="h-4 w-4 mt-1 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                />
                <label htmlFor="termsConsent" className="ml-2 block text-sm text-gray-700">
                  I agree to AdvisorWiz's <a href="#" className="text-teal-600 hover:underline">Terms & Conditions</a> and <a href="#" className="text-teal-600 hover:underline">Privacy Policy</a>. <span className="text-red-500">*</span>
                </label>
              </div>
              
              <div className="flex items-start">
                <input
                  id="advisorContactConsent"
                  name="advisorContactConsent"
                  type="checkbox"
                  checked={formData.advisorContactConsent}
                  onChange={(e) => setFormData(prev => ({ ...prev, advisorContactConsent: e.target.checked }))}
                  className="h-4 w-4 mt-1 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                />
                <label htmlFor="advisorContactConsent" className="ml-2 block text-sm text-gray-700">
                  I authorize my matched financial advisor to contact me for an initial consultation.
                </label>
              </div>
            </div>
          </div>
          
          <div className="bg-teal-50 p-4 rounded-lg border border-teal-200">
            <h3 className="text-lg font-medium text-teal-800 mb-2 flex items-center">
              <Percent className="w-5 h-5 mr-1" />
              Account Verification
            </h3>
            <p className="text-sm text-teal-600">
              After submitting your profile, you'll receive a verification email. Please click the link in that email to activate your account and start matching with advisors.
            </p>
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
        return renderCompliance();
      default:
        return null;
    }
  };

  return (
    <AnimatedRoute animation="fade">
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow pt-20">
          <div className="container mx-auto px-4 py-12 max-w-4xl">
            <div className="glass-card rounded-2xl overflow-hidden shadow-lg">
              <div className="p-8 md:p-12">
                <div className="text-center mb-10">
                  <h1 className="text-3xl md:text-4xl font-serif font-bold text-navy-900 mb-4">
                    Create Your Consumer Profile
                  </h1>
                  <p className="text-slate-600 max-w-2xl mx-auto">
                    Tell us about yourself so we can match you with the perfect financial advisor.
                  </p>
                </div>

                {renderStepIndicator()}

                <form className="space-y-6 max-w-2xl mx-auto">
                  {renderCurrentStep()}

                  <div className="pt-4 flex justify-between">
                    <Button
                      type="button"
                      onClick={handlePreviousStep}
                      disabled={currentStep === 1}
                      variant="outline"
                      className={`${currentStep === 1 ? 'opacity-50' : ''}`}
                    >
                      Back
                    </Button>

                    <Button
                      type="button"
                      onClick={handleNextStep}
                      className="bg-teal-600 hover:bg-teal-700 text-white"
                    >
                      {currentStep === totalSteps ? (
                        saved ? (
                          <>
                            <CheckCircle className="mr-2 w-5 h-5" />
                            Saved!
                          </>
                        ) : (
                          <>
                            <Save className="mr-2 w-5 h-5" />
                            Create Profile
                          </>
                        )
                      ) : (
                        <>
                          Continue
                          <ChevronRight className="ml-2 w-5 h-5" />
                        </>
                      )}
                    </Button>
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

export default ConsumerProfile;
