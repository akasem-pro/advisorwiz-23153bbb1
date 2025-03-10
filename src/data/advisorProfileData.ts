
import { AppointmentCategory, ServiceCategory } from '../context/UserContext';

// Define licensing bodies options
export const licensingBodies = [
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
export const experienceOptions = [
  { value: 'less_than_1', label: 'Less than 1 year' },
  { value: '1_to_5', label: '1-5 years' },
  { value: '5_to_10', label: '5-10 years' },
  { value: '10_plus', label: '10+ years' }
];

// Define service categories with expanded options
export const serviceCategories = [
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
export const feeStructureOptions = [
  { value: 'flat_fee', label: 'Flat Fee', fieldType: 'currency', placeholder: 'e.g., $1,000' },
  { value: 'percent_assets', label: 'Percentage of Assets', fieldType: 'percentage', placeholder: 'e.g., 1.5%' },
  { value: 'hourly', label: 'Hourly Rate', fieldType: 'currency', placeholder: 'e.g., $250/hour' },
  { value: 'subscription', label: 'Subscription-based', fieldType: 'currency', placeholder: 'e.g., $99/month' },
  { value: 'commission', label: 'Commission-based', fieldType: 'percentage', placeholder: 'e.g., 3%' },
  { value: 'hybrid', label: 'Hybrid Model', fieldType: 'text', placeholder: 'Describe your fee structure' }
];

// Define minimum investment options
export const minimumInvestmentOptions = [
  { value: 'entry_level', label: 'Entry-Level Investors', range: '$0 to $50,000' },
  { value: 'mass_affluent', label: 'Mass Affluent Investors', range: '$50,000 to $500,000' },
  { value: 'hnwi', label: 'High-Net-Worth Individuals (HNWIs)', range: '$500,000 to $5 million' },
  { value: 'uhnwi', label: 'Ultra-High-Net-Worth Individuals (UHNWIs)', range: '$5 million and above' }
];

// Define client type preferences
export const clientTypeOptions = [
  { value: 'young_professionals', label: 'Young Professionals' },
  { value: 'business_owners', label: 'Business Owners' },
  { value: 'retirees', label: 'Retirees' },
  { value: 'high_net_worth', label: 'High-Net-Worth Individuals' },
  { value: 'families', label: 'Families' },
  { value: 'pre_retirees', label: 'Pre-Retirees' },
  { value: 'all', label: 'All Types of Clients' }
];

// Define meeting preferences
export const meetingMethodOptions = [
  { value: 'phone', label: 'Phone' },
  { value: 'video', label: 'Video Call' },
  { value: 'in_person', label: 'In-Person' },
  { value: 'hybrid', label: 'Hybrid (Mix of virtual and in-person)' }
];

// Define provinces/territories
export const provincesOptions = [
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
export const employmentStatusOptions = [
  { value: 'employed', label: 'Employed' },
  { value: 'self_employed', label: 'Self-Employed' },
  { value: 'business_owner', label: 'Business Owner' },
  { value: 'retired', label: 'Retired' },
  { value: 'unemployed', label: 'Unemployed' },
  { value: 'student', label: 'Student' }
];

// Define subscription plan options
export const subscriptionPlans = [
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
export const DEFAULT_CATEGORIES: AppointmentCategory[] = [
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

export const languageOptions = [
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
