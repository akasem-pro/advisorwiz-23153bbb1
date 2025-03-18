
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import NavigationMenu from './NavigationMenu';
import MobileMenu from './MobileMenu';
import { useIsMobile } from '../../hooks/use-mobile';
import { useUser } from '../../context/UserContext';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

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
  
  // Define navigation links for mobile menu
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Consumer', path: '/for-consumers' },
    { name: 'Advisors', path: '/for-advisors' },
    { name: 'Firms', path: '/for-firms' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <header className="fixed w-full bg-white shadow-sm z-50">
      
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Logo />
            </Link>
            
            {!isMobile && (
              <NavigationMenu 
                links={navLinks}
              />
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
              <MobileMenu
                isMenuOpen={mobileMenuOpen}
                toggleMenu={toggleMobileMenu}
                links={navLinks}
                isAuthenticated={isAuthenticated}
                showGetStarted={!isAuthenticated}
                onLogout={() => {}}
              />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
