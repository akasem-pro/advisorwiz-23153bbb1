
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
  
  // Define navigation links with improved user journey focus
  const navLinks = [
    { name: 'Home', path: '/' },
    { 
      name: 'Consumer', 
      path: '/for-consumers',
      subLinks: [
        { name: 'How It Works', path: '/for-consumers#how-it-works' },
        { name: 'Find an Advisor', path: '/matches' },
        { name: 'Success Stories', path: '/for-consumers#testimonials' },
      ]
    },
    { 
      name: 'Advisors', 
      path: '/for-advisors',
      subLinks: [
        { name: 'Benefits', path: '/for-advisors#benefits' },
        { name: 'Join as Advisor', path: '/advisor-profile' },
        { name: 'Success Stories', path: '/for-advisors#testimonials' },
      ]
    },
    { 
      name: 'Firms', 
      path: '/for-firms',
      subLinks: [
        { name: 'Enterprise Solutions', path: '/for-firms#solutions' },
        { name: 'Register Your Firm', path: '/firm-profile' },
        { name: 'Case Studies', path: '/for-firms#case-studies' },
      ]
    },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Resources', path: '/resources' },
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
