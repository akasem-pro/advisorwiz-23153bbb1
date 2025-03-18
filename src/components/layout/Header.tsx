import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import NavigationMenu from './NavigationMenu';
import MobileMenu from './MobileMenu';
import { Menu, X } from 'lucide-react';
import { useMobile } from '../../hooks/use-mobile';
import { useUser } from '../../context/UserContext';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useMobile();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const { isAuthenticated, userType } = useUser();
  
  const getDashboardLink = () => {
    if (userType === 'consumer') return '/consumer-dashboard';
    if (userType === 'advisor') return '/advisor-dashboard';
    if (userType === 'firm_admin') return '/firm-dashboard';
    return '/sign-in';
  };
  

  return (
    <header className="fixed w-full bg-white shadow-sm z-50">
      
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Logo className="h-8 md:h-10" />
            </Link>
            
            {!isMobile && (
              <NavigationMenu className="ml-8" />
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            {isAuthenticated ? (
              <Link 
                to={getDashboardLink()}
                className="btn-primary"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link 
                  to="/sign-in" 
                  className="hidden md:flex items-center px-4 py-2 text-navy-800 hover:text-navy-900"
                >
                  Sign In
                </Link>
                <Link 
                  to="/onboarding" 
                  className="btn-primary"
                >
                  Get Started
                </Link>
              </>
            )}
            
            {isMobile && (
              <button
                onClick={toggleMobileMenu}
                className="p-2 text-navy-800 focus:outline-none"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobile && mobileMenuOpen && <MobileMenu />}
    </header>
  );
};

export default Header;
