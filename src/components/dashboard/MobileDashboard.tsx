
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BellRing } from 'lucide-react';
import { UserType } from '../../context/UserContext';
import AnimatedRoute from '../ui/AnimatedRoute';
import Logo from '../layout/Logo';
import MobileNavbar from '../layout/MobileNavbar';

interface MobileDashboardProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  userType: UserType;
}

const MobileDashboard: React.FC<MobileDashboardProps> = ({ 
  children, 
  title, 
  subtitle,
  userType
}) => {
  const navigate = useNavigate();
  
  const getProfileLink = () => {
    if (userType === 'consumer') return '/consumer-profile';
    if (userType === 'advisor') return '/advisor-profile';
    if (userType === 'firm_admin') return '/firm-profile';
    return '/';
  };
  
  return (
    <AnimatedRoute animation="fade">
      <div className="min-h-screen bg-slate-50 dark:bg-navy-900 flex flex-col">
        <header className="bg-white dark:bg-navy-800 border-b border-slate-200 dark:border-navy-700 px-2 py-1.5 flex items-center justify-between fixed top-0 left-0 right-0 z-10 h-12">
          <Logo forceLightMode={true} />
          <div className="flex items-center space-x-1.5">
            <button className="relative">
              <BellRing className="h-4 w-4 text-slate-600 dark:text-slate-300" />
              <span className="absolute top-0 right-0 h-1.5 w-1.5 bg-red-500 rounded-full"></span>
            </button>
            <button 
              onClick={() => navigate(getProfileLink())}
              className="w-6 h-6 bg-teal-100 dark:bg-teal-800 rounded-full flex items-center justify-center text-teal-700 dark:text-teal-200 text-xs font-medium"
            >
              {userType === 'consumer' ? 'C' : userType === 'advisor' ? 'A' : 'F'}
            </button>
          </div>
        </header>
        
        <main className="flex-grow p-2 mb-12 mt-12">
          <div className="mb-2">
            <h1 className="text-lg font-serif font-bold text-navy-900 dark:text-slate-100">{title}</h1>
            {subtitle && <p className="text-xs text-slate-600 dark:text-slate-400">{subtitle}</p>}
          </div>
          {children}
        </main>
        
        <MobileNavbar />
      </div>
    </AnimatedRoute>
  );
};

export default MobileDashboard;
