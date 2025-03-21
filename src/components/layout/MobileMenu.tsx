import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Settings, User } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { Button } from '../ui/button';

interface MobileMenuProps {
  isAuthenticated: boolean;
  onClose: () => void;
  onSignOut: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isAuthenticated, onClose, onSignOut }) => {
  const { userType } = useUser();
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <div className="bg-white dark:bg-navy-900 py-4 px-6 fixed inset-x-0 top-16 h-auto z-40 md:hidden border-t border-slate-200 dark:border-navy-700 shadow-lg transition-all">
      {isAuthenticated ? (
        <div className="space-y-4">
          <div className="space-y-2">
            <button
              onClick={() => {
                if (userType === 'consumer') {
                  handleNavigation('/consumer-profile');
                } else if (userType === 'advisor') {
                  handleNavigation('/advisor-profile');
                } else if (userType === 'firm_admin') {
                  handleNavigation('/firm-profile');
                }
              }}
              className="flex items-center space-x-2 w-full p-2 rounded-md hover:bg-slate-100 dark:hover:bg-navy-800"
            >
              <User className="h-5 w-5 text-slate-400" />
              <span>My Profile</span>
            </button>
            
            <button
              onClick={() => handleNavigation('/settings')}
              className="flex items-center space-x-2 w-full p-2 rounded-md hover:bg-slate-100 dark:hover:bg-navy-800"
            >
              <Settings className="h-5 w-5 text-slate-400" />
              <span>Settings</span>
            </button>
            
            <button
              onClick={onSignOut}
              className="flex items-center space-x-2 w-full p-2 rounded-md hover:bg-slate-100 dark:hover:bg-navy-800"
            >
              <LogOut className="h-5 w-5 text-slate-400" />
              <span>Sign Out</span>
            </button>
          </div>
          
          <div className="pt-2 border-t border-slate-200 dark:border-navy-700 space-y-2">
            <Link 
              to="/matches" 
              className="block p-2 hover:bg-slate-100 dark:hover:bg-navy-800 rounded-md"
              onClick={onClose}
            >
              Find Advisors
            </Link>
            <Link 
              to="/for-advisors" 
              className="block p-2 hover:bg-slate-100 dark:hover:bg-navy-800 rounded-md"
              onClick={onClose}
            >
              For Advisors
            </Link>
            <Link 
              to="/for-firms" 
              className="block p-2 hover:bg-slate-100 dark:hover:bg-navy-800 rounded-md"
              onClick={onClose}
            >
              For Firms
            </Link>
            <Link 
              to="/pricing" 
              className="block p-2 hover:bg-slate-100 dark:hover:bg-navy-800 rounded-md"
              onClick={onClose}
            >
              Pricing
            </Link>
            <Link 
              to="/contact" 
              className="block p-2 hover:bg-slate-100 dark:hover:bg-navy-800 rounded-md"
              onClick={onClose}
            >
              Contact Us
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="space-y-2">
            <Link 
              to="/for-consumers" 
              className="block p-2 hover:bg-slate-100 dark:hover:bg-navy-800 rounded-md"
              onClick={onClose}
            >
              For Consumers
            </Link>
            <Link 
              to="/for-advisors" 
              className="block p-2 hover:bg-slate-100 dark:hover:bg-navy-800 rounded-md"
              onClick={onClose}
            >
              For Advisors
            </Link>
            <Link 
              to="/for-firms" 
              className="block p-2 hover:bg-slate-100 dark:hover:bg-navy-800 rounded-md"
              onClick={onClose}
            >
              For Firms
            </Link>
            <Link 
              to="/pricing" 
              className="block p-2 hover:bg-slate-100 dark:hover:bg-navy-800 rounded-md"
              onClick={onClose}
            >
              Pricing
            </Link>
          </div>
          
          <div className="pt-4 border-t border-slate-200 dark:border-navy-700 flex flex-col space-y-2">
            <Link to="/sign-in" onClick={onClose}>
              <Button variant="outline" className="w-full">
                Sign In
              </Button>
            </Link>
            <Link to="/onboarding" onClick={onClose}>
              <Button className="w-full">Get Started</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
