import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatedRoute } from '../components/ui/AnimatedRoute';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { useUser, ConsumerProfile as ConsumerProfileType } from '../context/UserContext';
import { ArrowRight, Save, CheckCircle } from 'lucide-react';
import ProfilePictureUpload from '../components/profile/ProfilePictureUpload';

const riskToleranceOptions = [
  { value: 'low', label: 'Low - I prefer safe investments with steady returns' },
  { value: 'medium', label: 'Medium - I can accept some volatility for better returns' },
  { value: 'high', label: 'High - I can tolerate significant volatility for maximum growth potential' }
];

const communicationOptions = [
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Phone' },
  { value: 'video', label: 'Video Call' },
  { value: 'inPerson', label: 'In-Person Meeting' }
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

const ConsumerProfile: React.FC = () => {
  const { consumerProfile, setConsumerProfile } = useUser();
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);
  
  const [formData, setFormData] = useState<Partial<ConsumerProfileType>>({
    id: 'consumer-1',
    name: consumerProfile?.name || '',
    age: consumerProfile?.age || 0,
    status: consumerProfile?.status || '',
    investableAssets: consumerProfile?.investableAssets || 0,
    riskTolerance: consumerProfile?.riskTolerance || 'medium',
    preferredCommunication: consumerProfile?.preferredCommunication || [],
    preferredLanguage: consumerProfile?.preferredLanguage || [],
    profilePicture: consumerProfile?.profilePicture || '',
    matches: [],
    chats: []
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'age' || name === 'investableAssets' ? Number(value) : value
    }));
  };

  const handleCommunicationChange = (method: string) => {
    setFormData(prev => {
      const currentMethods = prev.preferredCommunication || [];
      if (currentMethods.includes(method)) {
        return {
          ...prev,
          preferredCommunication: currentMethods.filter(m => m !== method)
        };
      } else {
        return {
          ...prev,
          preferredCommunication: [...currentMethods, method]
        };
      }
    });
  };

  const handleLanguageChange = (language: string) => {
    setFormData(prev => {
      const currentLanguages = prev.preferredLanguage || [];
      if (currentLanguages.includes(language)) {
        return {
          ...prev,
          preferredLanguage: currentLanguages.filter(l => l !== language)
        };
      } else {
        return {
          ...prev,
          preferredLanguage: [...currentLanguages, language]
        };
      }
    });
  };

  const handlePictureChange = (imageBase64: string) => {
    setFormData(prev => ({
      ...prev,
      profilePicture: imageBase64
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConsumerProfile(formData as ConsumerProfileType);
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
          <div className="container mx-auto px-4 py-12 max-w-4xl">
            <div className="glass-card rounded-2xl overflow-hidden shadow-lg">
              <div className="p-8 md:p-12">
                <div className="text-center mb-10">
                  <h1 className="text-3xl md:text-4xl font-serif font-bold text-navy-900 mb-4">
                    Your Consumer Profile
                  </h1>
                  <p className="text-slate-600 max-w-2xl mx-auto">
                    Tell us about yourself so we can match you with the perfect financial advisor.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
                  <div className="flex justify-center mb-8">
                    <ProfilePictureUpload 
                      currentPicture={formData.profilePicture}
                      onPictureChange={handlePictureChange}
                      size="lg"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-navy-800 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="age" className="block text-sm font-medium text-navy-800 mb-1">
                        Age
                      </label>
                      <input
                        type="number"
                        id="age"
                        name="age"
                        value={formData.age || ''}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="Your age"
                        required
                        min={18}
                        max={120}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="status" className="block text-sm font-medium text-navy-800 mb-1">
                      Financial Status
                    </label>
                    <select
                      id="status"
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="input-field"
                      required
                    >
                      <option value="" disabled>Select your financial status</option>
                      <option value="student">Student</option>
                      <option value="employed">Employed</option>
                      <option value="self-employed">Self-Employed</option>
                      <option value="retired">Retired</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="investableAssets" className="block text-sm font-medium text-navy-800 mb-1">
                      Investable Assets (CAD)
                    </label>
                    <input
                      type="number"
                      id="investableAssets"
                      name="investableAssets"
                      value={formData.investableAssets || ''}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="Amount in CAD"
                      required
                      min={0}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-navy-800 mb-1">
                      Risk Tolerance
                    </label>
                    <div className="space-y-2">
                      {riskToleranceOptions.map((option) => (
                        <div key={option.value} className="flex items-center">
                          <input
                            type="radio"
                            id={`risk-${option.value}`}
                            name="riskTolerance"
                            value={option.value}
                            checked={formData.riskTolerance === option.value}
                            onChange={handleChange}
                            className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-slate-300"
                          />
                          <label htmlFor={`risk-${option.value}`} className="ml-2 block text-sm text-slate-700">
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-navy-800 mb-1">
                      Preferred Communication Methods (Select all that apply)
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {communicationOptions.map((option) => (
                        <div key={option.value} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`comm-${option.value}`}
                            checked={(formData.preferredCommunication || []).includes(option.value)}
                            onChange={() => handleCommunicationChange(option.value)}
                            className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-slate-300 rounded"
                          />
                          <label htmlFor={`comm-${option.value}`} className="ml-2 block text-sm text-slate-700">
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-navy-800 mb-1">
                      Preferred Languages (Select all that apply)
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {languageOptions.map((option) => (
                        <div key={option.value} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`lang-${option.value}`}
                            checked={(formData.preferredLanguage || []).includes(option.value)}
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

                  <div className="pt-4 flex justify-between">
                    <button
                      type="submit"
                      className="btn-primary inline-flex items-center"
                    >
                      {saved ? (
                        <>
                          <CheckCircle className="mr-2 w-5 h-5" />
                          Saved!
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
                      Find Advisors
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
    </AnimatedRoute>
  );
};

export default ConsumerProfile;
