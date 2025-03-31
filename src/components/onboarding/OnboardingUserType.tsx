import React from 'react';
import { User, Briefcase, Building } from 'lucide-react';
import { UserType } from '../../types/profileTypes';

interface UserTypeOption {
  id: 'consumer' | 'advisor' | 'firm_admin';
  title: string;
  icon: React.ReactNode;
  description: string;
}

interface OnboardingUserTypeProps {
  selectedUserType: UserType;
  onSelect: (userType: 'consumer' | 'advisor' | 'firm_admin') => void;
}

const OnboardingUserType: React.FC<OnboardingUserTypeProps> = ({
  selectedUserType,
  onSelect
}) => {
  const userTypes: UserTypeOption[] = [
    {
      id: 'consumer',
      title: 'I\'m a Consumer',
      icon: <User className="w-6 h-6 text-teal-600" />,
      description: 'I\'m looking for a financial advisor who can help me with my financial goals and planning.'
    },
    {
      id: 'advisor',
      title: 'I\'m an Advisor',
      icon: <Briefcase className="w-6 h-6 text-navy-600" />,
      description: 'I\'m a financial professional looking to connect with potential clients who match my expertise.'
    },
    {
      id: 'firm_admin',
      title: 'I\'m a Financial Firm',
      icon: <Building className="w-6 h-6 text-purple-600" />,
      description: 'I represent a financial firm and want to manage multiple advisor profiles for our organization.'
    }
  ];
  
  return (
    <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
      {userTypes.map(userType => (
        <button
          key={userType.id}
          className={`relative p-8 rounded-xl border-2 transition-all duration-300 text-left ${
            selectedUserType === userType.id
              ? userType.id === 'consumer'
                ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20 dark:border-teal-700'
                : userType.id === 'advisor'
                ? 'border-navy-500 bg-navy-50 dark:bg-navy-800/50 dark:border-navy-600'
                : 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 dark:border-purple-700'
              : 'border-slate-200 dark:border-navy-700 hover:border-slate-300 dark:hover:border-navy-600 hover:bg-slate-50 dark:hover:bg-navy-800/50'
          }`}
          onClick={() => onSelect(userType.id)}
          aria-pressed={selectedUserType === userType.id}
        >
          <div className="flex items-center space-x-4 mb-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
              userType.id === 'consumer' 
                ? 'bg-teal-100 dark:bg-teal-900/50' 
                : userType.id === 'advisor'
                ? 'bg-navy-100 dark:bg-navy-800/70'
                : 'bg-purple-100 dark:bg-purple-900/50'
            }`}>
              {userType.icon}
            </div>
            <h3 className="text-xl font-serif font-semibold text-navy-900 dark:text-slate-100">
              {userType.title}
            </h3>
          </div>
          <p className="text-slate-600 dark:text-slate-300">
            {userType.description}
          </p>
          {selectedUserType === userType.id && (
            <div className="absolute top-4 right-4 w-5 h-5 bg-teal-500 dark:bg-teal-400 rounded-full flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
        </button>
      ))}
    </div>
  );
};

export default OnboardingUserType;
