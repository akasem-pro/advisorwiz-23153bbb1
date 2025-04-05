
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedRoute from '../components/ui/AnimatedRoute';
import Header from '../components/layout/Header';
import { useUser } from '../context/UserContext';
import { 
  ArrowRight, 
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
  Info,
  XCircle
} from 'lucide-react';
import PageSEO from '../components/seo/PageSEO';
import { toast } from 'sonner';

interface FormSectionProps {
  title: string;
  children: React.ReactNode;
}

const FormSection: React.FC<FormSectionProps> = ({ title, children }) => (
  <div className="mb-8">
    <h2 className="text-xl font-semibold text-navy-900 dark:text-slate-100 mb-4">{title}</h2>
    {children}
  </div>
);

const ConsumerProfile: React.FC = () => {
  const { consumerProfile, setConsumerProfile, saveProfileChanges } = useUser();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    income: '',
    assets: '',
    riskTolerance: 'moderate',
    investmentGoals: ''
  });

  useEffect(() => {
    if (!consumerProfile) {
      console.warn("Consumer profile is not initialized.");
    } else {
      // Initialize form data from profile
      const nameParts = consumerProfile.name?.split(' ') || ['', ''];
      setFormData({
        firstName: nameParts[0] || '',
        lastName: nameParts[1] || '',
        email: consumerProfile.email || '',
        income: consumerProfile.investableAssets?.toString() || '',
        assets: consumerProfile.investableAssets?.toString() || '',
        riskTolerance: consumerProfile.riskTolerance || 'moderate',
        investmentGoals: consumerProfile.financialGoals?.join(', ') || ''
      });
    }
  }, [consumerProfile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setFormError('');
    setFormSuccess('');

    if (!consumerProfile) {
      setFormError('Consumer profile is not initialized. Please refresh the page.');
      setIsLoading(false);
      return;
    }

    try {
      // Update the consumer profile with form data
      const updatedProfile = {
        ...consumerProfile,
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        investableAssets: parseFloat(formData.assets) || 0,
        riskTolerance: formData.riskTolerance as 'low' | 'medium' | 'high',
        financialGoals: formData.investmentGoals.split(',').map(goal => goal.trim())
      };
      
      setConsumerProfile(updatedProfile);
      const success = await saveProfileChanges();
      
      if (success) {
        setFormSuccess('Profile updated successfully!');
        toast.success('Profile updated successfully!');
        setTimeout(() => {
          setFormSuccess('');
          navigate('/');
        }, 2000);
      } else {
        setFormError('Failed to update profile. Please try again.');
        toast.error('Failed to update profile. Please try again.');
      }
    } catch (error: any) {
      console.error("Profile update error:", error);
      setFormError(error.message || 'An unexpected error occurred.');
      toast.error(error.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatedRoute animation="fade">
      <div className="min-h-screen flex flex-col">
        <PageSEO 
          title="Complete Your Consumer Profile | AdvisorWiz"
          description="Tell us about your financial situation and goals so we can match you with advisors that best meet your needs."
          canonicalUrl="https://advisorwiz.com/consumer-profile"
        />
        
        <Header />
        
        <main className="flex-grow pt-20">
          <div className="container mx-auto px-4 py-8 max-w-4xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {formError && (
                <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-md flex items-center">
                  <XCircle className="h-5 w-5 mr-2" />
                  {formError}
                </div>
              )}

              {formSuccess && (
                <div className="bg-green-50 border border-green-200 text-green-600 p-4 rounded-md flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  {formSuccess}
                </div>
              )}

              <FormSection title="Personal Information">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-navy-800 dark:text-slate-200">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      className="input-field"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-navy-800 dark:text-slate-200">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      className="input-field"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-navy-800 dark:text-slate-200">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="input-field"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </FormSection>

              <FormSection title="Financial Situation">
                <div>
                  <label htmlFor="income" className="block text-sm font-medium text-navy-800 dark:text-slate-200">
                    Annual Income
                  </label>
                  <input
                    type="number"
                    id="income"
                    name="income"
                    className="input-field"
                    value={formData.income}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="assets" className="block text-sm font-medium text-navy-800 dark:text-slate-200">
                    Total Assets
                  </label>
                  <input
                    type="number"
                    id="assets"
                    name="assets"
                    className="input-field"
                    value={formData.assets}
                    onChange={handleChange}
                  />
                </div>
              </FormSection>

              <FormSection title="Investment Preferences">
                <div>
                  <label htmlFor="riskTolerance" className="block text-sm font-medium text-navy-800 dark:text-slate-200">
                    Risk Tolerance
                  </label>
                  <select
                    id="riskTolerance"
                    name="riskTolerance"
                    className="select-field"
                    value={formData.riskTolerance}
                    onChange={handleChange}
                  >
                    <option value="low">Conservative</option>
                    <option value="medium">Moderate</option>
                    <option value="high">Aggressive</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="investmentGoals" className="block text-sm font-medium text-navy-800 dark:text-slate-200">
                    Investment Goals
                  </label>
                  <textarea
                    id="investmentGoals"
                    name="investmentGoals"
                    rows={3}
                    className="textarea-field"
                    value={formData.investmentGoals}
                    onChange={handleChange}
                  />
                </div>
              </FormSection>

              <div>
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </>
                  ) : (
                    'Save Profile'
                  )}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </AnimatedRoute>
  );
};

export default ConsumerProfile;
