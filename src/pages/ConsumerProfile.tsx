
import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { ConsumerProfile as ConsumerProfileType } from '../types/profileTypes';
import CommonProfileLayout from '../components/profile/CommonProfileLayout';
import { ProfileFormActions } from '../components/profile/ProfileFormActions';
import ConsumerOnboardingTour from '../components/onboarding/ConsumerOnboardingTour';
import { InvestmentAmount, RiskTolerance } from '../types/investmentTypes';

const ConsumerProfile: React.FC = () => {
  const { consumerProfile, handleProfileUpdate, updateOnlineStatus } = useUser();
  const [saved, setSaved] = useState(false);
  
  const [formData, setFormData] = useState({
    name: consumerProfile?.name || '',
    email: consumerProfile?.email || '',
    phone: consumerProfile?.phone || '',
    age: consumerProfile?.age || 30,
    investableAssets: consumerProfile?.investableAssets || 0,
    riskTolerance: consumerProfile?.riskTolerance || 'medium',
    startTimeline: consumerProfile?.startTimeline || 'not_sure',
    financialGoals: consumerProfile?.financialGoals || [],
    preferredAdvisorSpecialties: consumerProfile?.preferredAdvisorSpecialties || [],
    profilePicture: consumerProfile?.profilePicture || '',
    chatEnabled: consumerProfile?.chatEnabled !== false,
    showOnlineStatus: consumerProfile?.showOnlineStatus !== false,
    onlineStatus: consumerProfile?.onlineStatus || 'online'
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedProfile: Partial<ConsumerProfileType> = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      age: Number(formData.age),
      investableAssets: Number(formData.investableAssets),
      riskTolerance: formData.riskTolerance as RiskTolerance,
      startTimeline: formData.startTimeline as 'immediately' | 'next_3_months' | 'next_6_months' | 'not_sure' | null,
      financialGoals: formData.financialGoals,
      preferredAdvisorSpecialties: formData.preferredAdvisorSpecialties,
      profilePicture: formData.profilePicture,
      chatEnabled: formData.chatEnabled,
      showOnlineStatus: formData.showOnlineStatus,
      onlineStatus: formData.onlineStatus as 'online' | 'offline' | 'away',
      lastOnline: new Date().toISOString()
    };
    
    handleProfileUpdate(updatedProfile);
    updateOnlineStatus(updatedProfile.onlineStatus as 'online' | 'offline' | 'away');
    
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };
  
  const handleContinue = () => {
    // Navigate to matches or another appropriate page
    window.location.href = '/matches';
  };
  
  return (
    <CommonProfileLayout
      pageTitle="Consumer Profile"
      pageDescription="Update your personal information and preferences to find the right financial advisor"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information Section */}
        <div className="bg-white dark:bg-navy-800 p-6 rounded-lg shadow-sm border border-slate-100 dark:border-navy-700">
          <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm p-2 dark:bg-navy-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm p-2 dark:bg-navy-900"
              />
            </div>
          </div>
        </div>
        
        {/* Investment Profile Section */}
        <div className="bg-white dark:bg-navy-800 p-6 rounded-lg shadow-sm border border-slate-100 dark:border-navy-700">
          <h2 className="text-xl font-semibold mb-4">Investment Profile</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Investable Assets</label>
              <select 
                name="investableAssets" 
                value={formData.investableAssets} 
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm p-2 dark:bg-navy-900"
              >
                <option value="10000">Under $10,000</option>
                <option value="50000">$10,000 - $50,000</option>
                <option value="100000">$50,000 - $100,000</option>
                <option value="250000">$100,000 - $250,000</option>
                <option value="500000">$250,000 - $500,000</option>
                <option value="1000000">$500,000 - $1,000,000</option>
                <option value="5000000">Over $1,000,000</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Risk Tolerance</label>
              <select 
                name="riskTolerance" 
                value={formData.riskTolerance} 
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm p-2 dark:bg-navy-900"
              >
                <option value="low">Conservative</option>
                <option value="medium">Moderate</option>
                <option value="high">Aggressive</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Preferences Section */}
        <div className="bg-white dark:bg-navy-800 p-6 rounded-lg shadow-sm border border-slate-100 dark:border-navy-700">
          <h2 className="text-xl font-semibold mb-4">Communication Preferences</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                <input 
                  type="checkbox" 
                  name="chatEnabled" 
                  checked={formData.chatEnabled} 
                  onChange={(e) => setFormData(prev => ({ ...prev, chatEnabled: e.target.checked }))}
                  className="mr-2"
                />
                Enable Chat
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                <input 
                  type="checkbox" 
                  name="showOnlineStatus" 
                  checked={formData.showOnlineStatus} 
                  onChange={(e) => setFormData(prev => ({ ...prev, showOnlineStatus: e.target.checked }))}
                  className="mr-2"
                />
                Show Online Status
              </label>
            </div>
          </div>
        </div>
        
        {/* Form Actions */}
        <ProfileFormActions 
          handleSubmit={handleSubmit}
          handleContinue={handleContinue}
        />
      </form>
      
      {saved && (
        <div className="mt-4 p-3 bg-green-100 border border-green-300 text-green-700 rounded text-center">
          Profile saved successfully!
        </div>
      )}
      
      {/* Add consumer onboarding tour */}
      <ConsumerOnboardingTour />
    </CommonProfileLayout>
  );
};

export default ConsumerProfile;
