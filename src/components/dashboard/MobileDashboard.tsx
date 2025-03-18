
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
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <header className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
          <Logo />
          <div className="flex items-center space-x-4">
            <button className="relative">
              <BellRing className="h-6 w-6 text-slate-600" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>
            <button 
              onClick={() => navigate(getProfileLink())}
              className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 font-medium"
            >
              {userType === 'consumer' ? 'C' : userType === 'advisor' ? 'A' : 'F'}
            </button>
          </div>
        </header>
        
        <main className="flex-grow p-4 mb-16">
          <div className="mb-4">
            <h1 className="text-2xl font-serif font-bold text-navy-900">{title}</h1>
            {subtitle && <p className="text-slate-600 mt-1">{subtitle}</p>}
          </div>
          {children}
        </main>
        
        <MobileNavbar />
      </div>
    </AnimatedRoute>
  );
};

export default MobileDashboard;
