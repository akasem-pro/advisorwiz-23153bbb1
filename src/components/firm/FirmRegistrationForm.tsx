
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '../../hooks/use-toast';
import { useUser } from '@/context/UserContext';
import { Check, ChevronRight, Package, Building, Shield, Users, BadgeDollarSign, FileCheck, Send, Upload, Clock, MailCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Firm type options
const firmTypes = [
  'Wealth Management',
  'Independent Advisory',
  'Brokerage',
  'Financial Planning',
  'Other'
];

// Regulatory body options
const regulatoryBodies = [
  { id: 'mfda', label: 'MFDA (Mutual Fund Dealers Association)' },
  { id: 'iiroc', label: 'IIROC (Investment Industry Regulatory Organization of Canada)' },
  { id: 'cfp', label: 'CFP (Certified Financial Planner)' },
  { id: 'cfa', label: 'CFA (Chartered Financial Analyst)' },
  { id: 'other', label: 'Other' }
];

// Subscription plans
const subscriptionPlans = [
  {
    id: 'small',
    name: 'Small Firm Plan',
    price: '$399/month',
    description: 'Up to 5 advisors, firm branding, lead access',
    features: [
      'Up to 5 advisors',
      'Firm branding',
      'Lead access',
      'Basic analytics',
      'Email support'
    ]
  },
  {
    id: 'growth',
    name: 'Growth Plan',
    price: '$799/month',
    description: 'Up to 15 advisors, priority listing, CRM tools, analytics',
    features: [
      'Up to 15 advisors',
      'Priority listing',
      'Advanced CRM tools',
      'Comprehensive analytics',
      'Priority support'
    ]
  },
  {
    id: 'enterprise',
    name: 'Enterprise Plan',
    price: '$1,499/month',
    description: 'Unlimited advisors, featured firm, exclusive marketing tools, VIP client matching',
    features: [
      'Unlimited advisors',
      'Featured firm placement',
      'Exclusive marketing tools',
      'VIP client matching',
      'Dedicated account manager'
    ]
  }
];

// Consent items
const consentItems = [
  'I confirm that all provided information is accurate and that my firm complies with all regulatory requirements.',
  'I authorize AdvisorWiz to verify licensing and compliance details with the appropriate regulatory bodies.',
  'I consent to AdvisorWiz performing background checks on registered advisors if required.',
  'I agree to receive platform updates, marketing communications, and newsletters from AdvisorWiz. (You may opt out at any time.)',
  'I have read and agree to the Terms & Conditions and Privacy Policy of AdvisorWiz.'
];

const FirmRegistrationForm: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { advisorProfile, addFirm } = useUser();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [formComplete, setFormComplete] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [firmDetails, setFirmDetails] = useState({
    name: '',
    legalBusinessName: '',
    firmType: '',
    firmTypeOther: '',
    registrationNumber: '',
    address: {
      street: '',
      city: '',
      province: '',
      postalCode: ''
    },
    website: '',
    primaryContact: {
      name: '',
      email: '',
      phone: ''
    },
    advisorCount: 1
  });
  
  const [complianceDetails, setComplianceDetails] = useState({
    regulatoryBodies: [] as string[],
    otherRegulatoryBody: '',
    complianceOfficer: {
      name: '',
      email: '',
      phone: ''
    },
    hasViolations: false,
    violationDetails: '',
    licensingDocuments: null as File | null
  });
  
  const [advisors, setAdvisors] = useState([
    { name: '', email: '', phone: '', licensingBody: '', experience: '', specialization: '' }
  ]);
  
  const [selectedPlan, setSelectedPlan] = useState('');
  
  const [consents, setConsents] = useState({
    accurateInfo: false,
    verifyLicensing: false,
    backgroundChecks: false,
    marketing: false,
    termsAndConditions: false
  });
  
  // Methods to update state
  const updateFirmDetails = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parentField, childField] = field.split('.');
      setFirmDetails({
        ...firmDetails,
        [parentField]: {
          ...firmDetails[parentField as keyof typeof firmDetails],
          [childField]: value
        }
      });
    } else {
      setFirmDetails({
        ...firmDetails,
        [field]: value
      });
    }
  };
  
  const updateComplianceDetails = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parentField, childField] = field.split('.');
      setComplianceDetails({
        ...complianceDetails,
        [parentField]: {
          ...complianceDetails[parentField as keyof typeof complianceDetails],
          [childField]: value
        }
      });
    } else {
      setComplianceDetails({
        ...complianceDetails,
        [field]: value
      });
    }
  };
  
  const toggleRegulatoryBody = (id: string) => {
    if (complianceDetails.regulatoryBodies.includes(id)) {
      setComplianceDetails({
        ...complianceDetails,
        regulatoryBodies: complianceDetails.regulatoryBodies.filter(body => body !== id)
      });
    } else {
      setComplianceDetails({
        ...complianceDetails,
        regulatoryBodies: [...complianceDetails.regulatoryBodies, id]
      });
    }
  };
  
  const updateAdvisor = (index: number, field: string, value: string) => {
    const updatedAdvisors = [...advisors];
    updatedAdvisors[index] = {
      ...updatedAdvisors[index],
      [field]: value
    };
    setAdvisors(updatedAdvisors);
  };
  
  const addAdvisor = () => {
    setAdvisors([
      ...advisors,
      { name: '', email: '', phone: '', licensingBody: '', experience: '', specialization: '' }
    ]);
  };
  
  const removeAdvisor = (index: number) => {
    const updatedAdvisors = [...advisors];
    updatedAdvisors.splice(index, 1);
    setAdvisors(updatedAdvisors);
  };
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      updateComplianceDetails('licensingDocuments', e.target.files[0]);
    }
  };
  
  const toggleConsent = (key: keyof typeof consents) => {
    setConsents({
      ...consents,
      [key]: !consents[key]
    });
  };
  
  // Check if current step is complete
  const isStepComplete = (): boolean => {
    switch (currentStep) {
      case 1:
        return (
          firmDetails.name.trim() !== '' &&
          firmDetails.firmType !== '' &&
          (firmDetails.firmType !== 'Other' || firmDetails.firmTypeOther.trim() !== '') &&
          firmDetails.registrationNumber.trim() !== '' &&
          firmDetails.address.street.trim() !== '' &&
          firmDetails.address.city.trim() !== '' &&
          firmDetails.address.province.trim() !== '' &&
          firmDetails.address.postalCode.trim() !== '' &&
          firmDetails.primaryContact.name.trim() !== '' &&
          firmDetails.primaryContact.email.trim() !== '' &&
          firmDetails.primaryContact.phone.trim() !== ''
        );
      case 2:
        return (
          complianceDetails.regulatoryBodies.length > 0 &&
          complianceDetails.complianceOfficer.name.trim() !== '' &&
          complianceDetails.complianceOfficer.email.trim() !== '' &&
          complianceDetails.complianceOfficer.phone.trim() !== '' &&
          (!complianceDetails.hasViolations || complianceDetails.violationDetails.trim() !== '')
        );
      case 3:
        return advisors.every(advisor => 
          advisor.name.trim() !== '' && 
          advisor.email.trim() !== '' && 
          advisor.phone.trim() !== ''
        );
      case 4:
        return selectedPlan !== '';
      case 5:
        return (
          consents.accurateInfo &&
          consents.verifyLicensing &&
          consents.backgroundChecks &&
          consents.termsAndConditions
        );
      default:
        return false;
    }
  };
  
  // Go to next step
  const nextStep = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  // Go to previous step
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  // Handle form submission
  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // In a real application, you would send this data to your API
    // For now, we'll simulate a successful submission
    
    // Create firm from the data
    const adminId = advisorProfile?.id || '';
    
    const newFirm = {
      name: firmDetails.name,
      description: `${firmDetails.firmType}${firmDetails.firmType === 'Other' ? ` - ${firmDetails.firmTypeOther}` : ''}`,
      website: firmDetails.website,
      adminId,
      advisorIds: [adminId],
    };
    
    // Add the firm to context
    addFirm(newFirm);
    
    // Show success message
    setTimeout(() => {
      setIsSubmitting(false);
      setFormComplete(true);
      
      toast({
        title: "Firm registration submitted",
        description: "Your firm registration has been submitted for review. You'll be notified once it's approved.",
      });
      
      // After 3 seconds, redirect to dashboard
      setTimeout(() => {
        navigate('/firm-profile');
      }, 3000);
    }, 1500);
  };
  
  // Render steps
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="flex items-center mb-6">
              <Building className="h-6 w-6 text-teal-600 mr-2" />
              <h2 className="text-2xl font-semibold text-navy-800">Firm Information</h2>
            </div>
            
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="firmName" className="block text-sm font-medium text-navy-800 mb-1">
                  Firm Name*
                </label>
                <Input
                  id="firmName"
                  value={firmDetails.name}
                  onChange={(e) => updateFirmDetails('name', e.target.value)}
                  placeholder="Your firm's name"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="legalBusinessName" className="block text-sm font-medium text-navy-800 mb-1">
                  Legal Business Name (if different)
                </label>
                <Input
                  id="legalBusinessName"
                  value={firmDetails.legalBusinessName}
                  onChange={(e) => updateFirmDetails('legalBusinessName', e.target.value)}
                  placeholder="Legal business name"
                />
              </div>
              
              <div>
                <label htmlFor="firmType" className="block text-sm font-medium text-navy-800 mb-1">
                  Firm Type*
                </label>
                <select
                  id="firmType"
                  value={firmDetails.firmType}
                  onChange={(e) => updateFirmDetails('firmType', e.target.value)}
                  className="input-field w-full"
                  required
                >
                  <option value="" disabled>Select firm type</option>
                  {firmTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              
              {firmDetails.firmType === 'Other' && (
                <div>
                  <label htmlFor="firmTypeOther" className="block text-sm font-medium text-navy-800 mb-1">
                    Specify Other Firm Type*
                  </label>
                  <Input
                    id="firmTypeOther"
                    value={firmDetails.firmTypeOther}
                    onChange={(e) => updateFirmDetails('firmTypeOther', e.target.value)}
                    placeholder="Specify firm type"
                    required
                  />
                </div>
              )}
              
              <div>
                <label htmlFor="registrationNumber" className="block text-sm font-medium text-navy-800 mb-1">
                  Business Registration Number*
                </label>
                <Input
                  id="registrationNumber"
                  value={firmDetails.registrationNumber}
                  onChange={(e) => updateFirmDetails('registrationNumber', e.target.value)}
                  placeholder="Registration number"
                  required
                />
              </div>
              
              <div className="sm:col-span-2">
                <label htmlFor="street" className="block text-sm font-medium text-navy-800 mb-1">
                  Business Address - Street*
                </label>
                <Input
                  id="street"
                  value={firmDetails.address.street}
                  onChange={(e) => updateFirmDetails('address.street', e.target.value)}
                  placeholder="Street address"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-navy-800 mb-1">
                  City*
                </label>
                <Input
                  id="city"
                  value={firmDetails.address.city}
                  onChange={(e) => updateFirmDetails('address.city', e.target.value)}
                  placeholder="City"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="province" className="block text-sm font-medium text-navy-800 mb-1">
                  Province*
                </label>
                <Input
                  id="province"
                  value={firmDetails.address.province}
                  onChange={(e) => updateFirmDetails('address.province', e.target.value)}
                  placeholder="Province"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="postalCode" className="block text-sm font-medium text-navy-800 mb-1">
                  Postal Code*
                </label>
                <Input
                  id="postalCode"
                  value={firmDetails.address.postalCode}
                  onChange={(e) => updateFirmDetails('address.postalCode', e.target.value)}
                  placeholder="Postal code"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="website" className="block text-sm font-medium text-navy-800 mb-1">
                  Firm Website (Optional but recommended)
                </label>
                <Input
                  id="website"
                  value={firmDetails.website}
                  onChange={(e) => updateFirmDetails('website', e.target.value)}
                  placeholder="https://yourfirm.com"
                  type="url"
                />
              </div>
              
              <div>
                <label htmlFor="primaryContactName" className="block text-sm font-medium text-navy-800 mb-1">
                  Primary Contact Name (Admin User)*
                </label>
                <Input
                  id="primaryContactName"
                  value={firmDetails.primaryContact.name}
                  onChange={(e) => updateFirmDetails('primaryContact.name', e.target.value)}
                  placeholder="Contact name"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="primaryContactEmail" className="block text-sm font-medium text-navy-800 mb-1">
                  Primary Contact Email Address*
                </label>
                <Input
                  id="primaryContactEmail"
                  value={firmDetails.primaryContact.email}
                  onChange={(e) => updateFirmDetails('primaryContact.email', e.target.value)}
                  placeholder="contact@example.com"
                  type="email"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="primaryContactPhone" className="block text-sm font-medium text-navy-800 mb-1">
                  Primary Contact Phone Number*
                </label>
                <Input
                  id="primaryContactPhone"
                  value={firmDetails.primaryContact.phone}
                  onChange={(e) => updateFirmDetails('primaryContact.phone', e.target.value)}
                  placeholder="Phone number"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="advisorCount" className="block text-sm font-medium text-navy-800 mb-1">
                  Number of Advisors to be Registered*
                </label>
                <Input
                  id="advisorCount"
                  value={firmDetails.advisorCount}
                  onChange={(e) => updateFirmDetails('advisorCount', parseInt(e.target.value) || 1)}
                  type="number"
                  min="1"
                  required
                />
              </div>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <div className="flex items-center mb-6">
              <Shield className="h-6 w-6 text-teal-600 mr-2" />
              <h2 className="text-2xl font-semibold text-navy-800">Compliance & Regulatory Details</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-navy-800 mb-3">
                  Regulatory Body (Select all that apply)*
                </label>
                <div className="space-y-3">
                  {regulatoryBodies.map((body) => (
                    <div key={body.id} className="flex items-center">
                      <Checkbox
                        id={body.id}
                        checked={complianceDetails.regulatoryBodies.includes(body.id)}
                        onCheckedChange={() => toggleRegulatoryBody(body.id)}
                      />
                      <label
                        htmlFor={body.id}
                        className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {body.label}
                      </label>
                    </div>
                  ))}
                </div>
                
                {complianceDetails.regulatoryBodies.includes('other') && (
                  <div className="mt-3">
                    <label htmlFor="otherRegulatoryBody" className="block text-sm font-medium text-navy-800 mb-1">
                      Specify Other Regulatory Body*
                    </label>
                    <Input
                      id="otherRegulatoryBody"
                      value={complianceDetails.otherRegulatoryBody}
                      onChange={(e) => updateComplianceDetails('otherRegulatoryBody', e.target.value)}
                      placeholder="Specify regulatory body"
                      required
                    />
                  </div>
                )}
              </div>
              
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="complianceOfficerName" className="block text-sm font-medium text-navy-800 mb-1">
                    Firm's Compliance Officer Name*
                  </label>
                  <Input
                    id="complianceOfficerName"
                    value={complianceDetails.complianceOfficer.name}
                    onChange={(e) => updateComplianceDetails('complianceOfficer.name', e.target.value)}
                    placeholder="Compliance officer name"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="complianceOfficerEmail" className="block text-sm font-medium text-navy-800 mb-1">
                    Compliance Officer Email*
                  </label>
                  <Input
                    id="complianceOfficerEmail"
                    value={complianceDetails.complianceOfficer.email}
                    onChange={(e) => updateComplianceDetails('complianceOfficer.email', e.target.value)}
                    placeholder="compliance@example.com"
                    type="email"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="complianceOfficerPhone" className="block text-sm font-medium text-navy-800 mb-1">
                    Compliance Officer Phone*
                  </label>
                  <Input
                    id="complianceOfficerPhone"
                    value={complianceDetails.complianceOfficer.phone}
                    onChange={(e) => updateComplianceDetails('complianceOfficer.phone', e.target.value)}
                    placeholder="Phone number"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-navy-800 mb-2">
                  Has your firm been subject to any regulatory violations in the last 5 years?*
                </label>
                <div className="flex space-x-4">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="violationsYes"
                      name="hasViolations"
                      checked={complianceDetails.hasViolations}
                      onChange={() => updateComplianceDetails('hasViolations', true)}
                      className="mr-2"
                    />
                    <label htmlFor="violationsYes" className="text-sm">Yes</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="violationsNo"
                      name="hasViolations"
                      checked={!complianceDetails.hasViolations}
                      onChange={() => updateComplianceDetails('hasViolations', false)}
                      className="mr-2"
                    />
                    <label htmlFor="violationsNo" className="text-sm">No</label>
                  </div>
                </div>
              </div>
              
              {complianceDetails.hasViolations && (
                <div>
                  <label htmlFor="violationDetails" className="block text-sm font-medium text-navy-800 mb-1">
                    Please explain the regulatory violations in detail*
                  </label>
                  <textarea
                    id="violationDetails"
                    value={complianceDetails.violationDetails}
                    onChange={(e) => updateComplianceDetails('violationDetails', e.target.value)}
                    className="input-field w-full min-h-[120px]"
                    placeholder="Provide details about regulatory violations"
                    required
                  />
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-navy-800 mb-2">
                  Upload Proof of Licensing & Compliance Documentation (PDF, JPEG, PNG)
                </label>
                <div className="flex items-center space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="relative overflow-hidden"
                    onClick={() => document.getElementById('file-upload')?.click()}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Choose File
                    <input
                      id="file-upload"
                      type="file"
                      className="absolute inset-0 cursor-pointer opacity-0"
                      accept=".pdf,.jpeg,.jpg,.png"
                      onChange={handleFileUpload}
                    />
                  </Button>
                  <span className="text-sm text-slate-600">
                    {complianceDetails.licensingDocuments
                      ? complianceDetails.licensingDocuments.name
                      : 'No file chosen'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-6">
            <div className="flex items-center mb-6">
              <Users className="h-6 w-6 text-teal-600 mr-2" />
              <h2 className="text-2xl font-semibold text-navy-800">Advisor Registration Details</h2>
            </div>
            
            <div className="space-y-6">
              <p className="text-slate-600">
                For each advisor, please provide the following information. Each advisor will receive an email invitation to complete their individual profile upon approval.
              </p>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Advisor Name*</th>
                      <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Email*</th>
                      <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Phone*</th>
                      <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Licensing Body</th>
                      <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Years of Experience</th>
                      <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Primary Specialization</th>
                      <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-200">
                    {advisors.map((advisor, index) => (
                      <tr key={index}>
                        <td className="px-3 py-4 whitespace-nowrap">
                          <Input
                            value={advisor.name}
                            onChange={(e) => updateAdvisor(index, 'name', e.target.value)}
                            placeholder="Full name"
                            className="w-full"
                            required
                          />
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap">
                          <Input
                            value={advisor.email}
                            onChange={(e) => updateAdvisor(index, 'email', e.target.value)}
                            placeholder="Email"
                            type="email"
                            className="w-full"
                            required
                          />
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap">
                          <Input
                            value={advisor.phone}
                            onChange={(e) => updateAdvisor(index, 'phone', e.target.value)}
                            placeholder="Phone"
                            className="w-full"
                            required
                          />
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap">
                          <Input
                            value={advisor.licensingBody}
                            onChange={(e) => updateAdvisor(index, 'licensingBody', e.target.value)}
                            placeholder="Licensing body"
                            className="w-full"
                          />
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap">
                          <Input
                            value={advisor.experience}
                            onChange={(e) => updateAdvisor(index, 'experience', e.target.value)}
                            placeholder="Years"
                            className="w-full"
                          />
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap">
                          <Input
                            value={advisor.specialization}
                            onChange={(e) => updateAdvisor(index, 'specialization', e.target.value)}
                            placeholder="Specialization"
                            className="w-full"
                          />
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap">
                          {advisors.length > 1 && (
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => removeAdvisor(index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              Remove
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="flex justify-center">
                <Button
                  type="button"
                  variant="outline"
                  onClick={addAdvisor}
                  className="mt-2"
                >
                  <Users className="h-4 w-4 mr-2" />
                  Add Another Advisor
                </Button>
              </div>
              
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <h3 className="text-sm font-medium text-navy-800 mb-2 flex items-center">
                  <Upload className="h-4 w-4 mr-2 text-teal-600" />
                  Bulk Upload Option
                </h3>
                <p className="text-slate-600 text-sm mb-3">
                  Registering more than 5 advisors? Attach an Excel or CSV file with the advisor list.
                </p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="relative overflow-hidden"
                  onClick={() => document.getElementById('advisor-bulk-upload')?.click()}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload File
                  <input
                    id="advisor-bulk-upload"
                    type="file"
                    className="absolute inset-0 cursor-pointer opacity-0"
                    accept=".xlsx,.xls,.csv"
                  />
                </Button>
              </div>
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-6">
            <div className="flex items-center mb-6">
              <BadgeDollarSign className="h-6 w-6 text-teal-600 mr-2" />
              <h2 className="text-2xl font-semibold text-navy-800">Subscription Plan Selection</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {subscriptionPlans.map((plan) => (
                <div
                  key={plan.id}
                  className={`border rounded-lg overflow-hidden transition-all ${
                    selectedPlan === plan.id
                      ? 'border-teal-500 shadow-md bg-gradient-to-br from-white to-teal-50'
                      : 'border-slate-200 hover:border-teal-200 hover:shadow-sm'
                  }`}
                >
                  <div className="p-6">
                    <h3 className="text-xl font-medium text-navy-800 mb-2">{plan.name}</h3>
                    <p className="text-2xl font-bold text-teal-600 mb-3">{plan.price}</p>
                    <p className="text-slate-600 mb-6 text-sm">{plan.description}</p>
                    
                    <ul className="space-y-2 mb-6">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-5 w-5 text-teal-500 mr-2 shrink-0" />
                          <span className="text-slate-700 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button
                      type="button"
                      variant={selectedPlan === plan.id ? "default" : "outline"}
                      className={`w-full ${
                        selectedPlan === plan.id ? 'bg-teal-600 hover:bg-teal-700' : ''
                      }`}
                      onClick={() => setSelectedPlan(plan.id)}
                    >
                      {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mt-4">
              <p className="text-slate-600 text-sm">
                Need a custom plan? Contact us at <a href="mailto:support@advisorwiz.com" className="text-teal-600 hover:underline">support@advisorwiz.com</a> for tailored solutions.
              </p>
              <p className="text-slate-600 text-sm mt-2">
                All plans include an Admin Dashboard to manage advisors, track leads, and monitor performance. Firms can upgrade or downgrade plans at any time.
              </p>
            </div>
          </div>
        );
      
      case 5:
        return (
          <div className="space-y-6">
            <div className="flex items-center mb-6">
              <FileCheck className="h-6 w-6 text-teal-600 mr-2" />
              <h2 className="text-2xl font-semibold text-navy-800">Consent & Agreement</h2>
            </div>
            
            <div className="space-y-4 bg-white p-6 rounded-lg border border-slate-200">
              <p className="text-slate-600 mb-4">
                Before submitting, please review and accept the terms below:
              </p>
              
              <div className="space-y-3">
                {consentItems.map((item, index) => {
                  const key = Object.keys(consents)[index] as keyof typeof consents;
                  
                  return (
                    <div key={index} className="flex items-start">
                      <Checkbox
                        id={`consent-${index}`}
                        checked={consents[key]}
                        onCheckedChange={() => toggleConsent(key)}
                        className="mt-1"
                      />
                      <label
                        htmlFor={`consent-${index}`}
                        className="ml-3 text-slate-700"
                      >
                        {item}
                      </label>
                    </div>
                  );
                })}
              </div>
              
              <div className="border-t border-slate-100 pt-4 mt-4">
                <p className="text-slate-600 text-sm">
                  By checking the boxes above, you agree to the terms and conditions of AdvisorWiz.
                </p>
              </div>
            </div>
          </div>
        );
      
      case 6:
        return (
          <div className="space-y-6">
            <div className="flex items-center mb-6">
              <Send className="h-6 w-6 text-teal-600 mr-2" />
              <h2 className="text-2xl font-semibold text-navy-800">Submission & Next Steps</h2>
            </div>
            
            {formComplete ? (
              <div className="text-center py-8">
                <div className="flex items-center justify-center mb-6">
                  <div className="rounded-full bg-green-100 p-3">
                    <Check className="h-10 w-10 text-green-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-navy-800 mb-2">Application Submitted Successfully!</h3>
                <p className="text-slate-600 mb-8">
                  Thank you for registering your firm with AdvisorWiz. We've received your application and will begin the review process.
                </p>
                <div className="max-w-lg mx-auto">
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Clock className="h-5 w-5 text-teal-600 mr-3 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-navy-800">Review Process</h4>
                        <p className="text-slate-600 text-sm">Our team will review and verify your details within 3-5 business days.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <MailCheck className="h-5 w-5 text-teal-600 mr-3 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-navy-800">Confirmation Email</h4>
                        <p className="text-slate-600 text-sm">You will receive a confirmation email with next steps once your firm is approved.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Package className="h-5 w-5 text-teal-600 mr-3 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-navy-800">Admin Dashboard</h4>
                        <p className="text-slate-600 text-sm">Your Admin Dashboard will be activated to start managing advisors.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <p className="text-slate-600 mb-4">You will be redirected to your dashboard in a few seconds...</p>
                  <Button
                    className="bg-teal-600 hover:bg-teal-700"
                    onClick={() => navigate('/firm-profile')}
                  >
                    Go to Dashboard Now
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="bg-white p-6 rounded-lg border border-slate-200">
                  <h3 className="text-lg font-medium text-navy-800 mb-4">Review Your Information</h3>
                  <p className="text-slate-600 mb-4">
                    Please review your information carefully before submitting. Once submitted, our team will review your application.
                  </p>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-medium text-navy-800 flex items-center">
                        <Building className="h-4 w-4 text-teal-600 mr-2" />
                        Firm Information
                      </h4>
                      <div className="mt-2 grid sm:grid-cols-2 gap-x-6 gap-y-1 text-sm">
                        <div className="py-1">
                          <span className="font-medium text-slate-500">Firm Name:</span>
                          <span className="ml-2 text-navy-800">{firmDetails.name}</span>
                        </div>
                        <div className="py-1">
                          <span className="font-medium text-slate-500">Firm Type:</span>
                          <span className="ml-2 text-navy-800">
                            {firmDetails.firmType}
                            {firmDetails.firmType === 'Other' ? ` - ${firmDetails.firmTypeOther}` : ''}
                          </span>
                        </div>
                        <div className="py-1">
                          <span className="font-medium text-slate-500">Registration Number:</span>
                          <span className="ml-2 text-navy-800">{firmDetails.registrationNumber}</span>
                        </div>
                        <div className="py-1">
                          <span className="font-medium text-slate-500">Number of Advisors:</span>
                          <span className="ml-2 text-navy-800">{firmDetails.advisorCount}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-navy-800 flex items-center">
                        <Shield className="h-4 w-4 text-teal-600 mr-2" />
                        Compliance Information
                      </h4>
                      <div className="mt-2 grid sm:grid-cols-2 gap-x-6 gap-y-1 text-sm">
                        <div className="py-1">
                          <span className="font-medium text-slate-500">Regulatory Bodies:</span>
                          <span className="ml-2 text-navy-800">
                            {complianceDetails.regulatoryBodies.map(body => {
                              const bodyObj = regulatoryBodies.find(b => b.id === body);
                              return bodyObj ? bodyObj.label : body;
                            }).join(', ')}
                          </span>
                        </div>
                        <div className="py-1">
                          <span className="font-medium text-slate-500">Compliance Officer:</span>
                          <span className="ml-2 text-navy-800">{complianceDetails.complianceOfficer.name}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-navy-800 flex items-center">
                        <BadgeDollarSign className="h-4 w-4 text-teal-600 mr-2" />
                        Selected Plan
                      </h4>
                      <div className="mt-2 text-sm">
                        <span className="font-medium text-slate-500">Plan:</span>
                        <span className="ml-2 text-navy-800">
                          {subscriptionPlans.find(plan => plan.id === selectedPlan)?.name || 'None selected'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
                  <h3 className="text-lg font-medium text-navy-800 mb-4">What Happens Next?</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Clock className="h-5 w-5 text-teal-600 mr-3 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-navy-800">Review Process</h4>
                        <p className="text-slate-600 text-sm">Our team will review and verify your details within 3-5 business days.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <MailCheck className="h-5 w-5 text-teal-600 mr-3 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-navy-800">Confirmation Email</h4>
                        <p className="text-slate-600 text-sm">You will receive a confirmation email with next steps once your firm is approved.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Package className="h-5 w-5 text-teal-600 mr-3 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-navy-800">Admin Dashboard</h4>
                        <p className="text-slate-600 text-sm">Your Admin Dashboard will be activated to start managing advisors.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <Button
                    className="bg-teal-600 hover:bg-teal-700 w-full sm:w-auto px-6"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin inline-block h-4 w-4 border-2 border-current border-t-transparent rounded-full mr-2"></span>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Submit Firm Registration
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>
        );
      
      default:
        return null;
    }
  };
  
  // Render progress steps
  const renderSteps = () => {
    const steps = [
      { number: 1, label: 'Firm Information', icon: <Building className="h-4 w-4" /> },
      { number: 2, label: 'Compliance', icon: <Shield className="h-4 w-4" /> },
      { number: 3, label: 'Advisors', icon: <Users className="h-4 w-4" /> },
      { number: 4, label: 'Subscription', icon: <BadgeDollarSign className="h-4 w-4" /> },
      { number: 5, label: 'Consent', icon: <FileCheck className="h-4 w-4" /> },
      { number: 6, label: 'Submit', icon: <Send className="h-4 w-4" /> },
    ];
    
    return (
      <div className="hidden md:flex items-center justify-between mb-8">
        {steps.map((step) => (
          <div
            key={step.number}
            className={`flex items-center ${currentStep === step.number ? 'text-teal-600' : 'text-slate-500'}`}
          >
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full mr-2 ${
                currentStep >= step.number
                  ? 'bg-teal-100 text-teal-600'
                  : 'bg-slate-100 text-slate-500'
              }`}
            >
              {currentStep > step.number ? <Check className="h-4 w-4" /> : step.icon}
            </div>
            <span className={`text-sm ${currentStep === step.number ? 'font-medium' : ''}`}>
              {step.label}
            </span>
            {step.number < steps.length && (
              <div className="mx-4 h-0.5 w-12 bg-slate-200"></div>
            )}
          </div>
        ))}
      </div>
    );
  };
  
  // Render mobile progress
  const renderMobileProgress = () => {
    return (
      <div className="md:hidden flex items-center justify-between mb-6 bg-slate-50 p-3 rounded-md">
        <div className="text-navy-800 font-medium">
          Step {currentStep} of 6: {
            currentStep === 1 ? 'Firm Information' :
            currentStep === 2 ? 'Compliance' :
            currentStep === 3 ? 'Advisors' :
            currentStep === 4 ? 'Subscription' :
            currentStep === 5 ? 'Consent' : 'Submit'
          }
        </div>
        <div className="text-sm text-slate-500">
          {Math.round((currentStep / 6) * 100)}% complete
        </div>
      </div>
    );
  };
  
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-md overflow-hidden">
      <div className="p-6 md:p-8">
        <h1 className="text-center text-3xl font-serif font-bold text-navy-900 mb-2">
          Financial Firm Registration
        </h1>
        <p className="text-center text-slate-600 mb-8 max-w-3xl mx-auto">
          Complete the following steps to register your financial firm on our platform.
          This will enable your firm and advisors to connect with potential clients.
        </p>
        
        {renderSteps()}
        {renderMobileProgress()}
        
        <div className="min-h-[460px]">
          {renderStep()}
        </div>
        
        {currentStep !== 6 && (
          <div className="flex justify-between mt-10 pt-6 border-t border-slate-200">
            {currentStep > 1 ? (
              <Button
                variant="outline"
                onClick={prevStep}
              >
                Back
              </Button>
            ) : (
              <div></div>
            )}
            <Button
              className="bg-teal-600 hover:bg-teal-700"
              onClick={nextStep}
              disabled={!isStepComplete()}
            >
              {currentStep < 5 ? (
                <>
                  Continue
                  <ChevronRight className="ml-1 h-4 w-4" />
                </>
              ) : (
                <>
                  Review & Submit
                  <ChevronRight className="ml-1 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FirmRegistrationForm;
