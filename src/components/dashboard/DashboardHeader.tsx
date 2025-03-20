
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, BellRing, HelpCircle } from 'lucide-react';
import { UserType } from '../../context/UserContext';

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  userType: UserType;
  sidebarCollapsed: boolean;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ 
  title, 
  subtitle, 
  userType,
  sidebarCollapsed
}) => {
  const navigate = useNavigate();
  
  const getProfileLink = () => {
    if (userType === 'consumer') return '/consumer-profile';
    if (userType === 'advisor') return '/advisor-profile';
    if (userType === 'firm_admin') return '/firm-profile';
    return '/';
  };
  
  return (
    <header className="bg-white dark:bg-navy-800 border-b border-slate-200 dark:border-navy-700 h-16 flex items-center justify-between px-6 sticky top-0 z-20">
      <div>
        <h1 className="text-lg font-medium text-navy-900 dark:text-slate-100">{title}</h1>
        {subtitle && <p className="text-sm text-slate-600 dark:text-slate-400">{subtitle}</p>}
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search..." 
            className="pl-10 pr-4 py-2 rounded-lg border border-slate-300 dark:border-navy-600 dark:bg-navy-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500 h-5 w-5" />
        </div>
        
        <button className="relative">
          <BellRing className="h-6 w-6 text-slate-600 dark:text-slate-300" />
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>
        
        <button className="relative">
          <HelpCircle className="h-6 w-6 text-slate-600 dark:text-slate-300" />
        </button>
        
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => navigate(getProfileLink())}
            className="w-10 h-10 bg-teal-100 dark:bg-teal-800 rounded-full flex items-center justify-center text-teal-700 dark:text-teal-200 font-medium"
          >
            {userType === 'consumer' ? 'C' : userType === 'advisor' ? 'A' : 'F'}
          </button>
          {!sidebarCollapsed && (
            <div>
              <p className="text-sm font-medium text-navy-900 dark:text-slate-100">
                {userType === 'consumer' ? 'Consumer' : userType === 'advisor' ? 'Advisor' : 'Firm Admin'}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {userType === 'consumer' ? 'Member' : userType === 'advisor' ? 'Professional' : 'Organization'}
              </p>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
