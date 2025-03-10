
import React, { useState } from 'react';
import { LogOut, Building, Calendar, MessageCircle, User } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import Logo from './Logo';
import NavigationMenu from './NavigationMenu';
import MobileMenu from './MobileMenu';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, setIsAuthenticated, setUserType, setConsumerProfile, setAdvisorProfile, userType } = useUser();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserType(null);
    setConsumerProfile(null);
    setAdvisorProfile(null);
  };

  // Basic nav links for non-authenticated users
  const navLinks = isAuthenticated
    ? userType === 'firm_admin'
      ? [{ name: 'Manage Firm', path: '/firm-profile' }]
      : [{ name: 'Matches', path: '/matches' }]
    : [
        { name: 'Home', path: '/' },
        { name: 'For Advisors', path: '/for-advisors' },
        { name: 'For Consumers', path: '/for-consumers' },
        { name: 'For Firms', path: '/for-firms' },
        { name: 'Pricing', path: '/pricing' },
        { name: 'Contact', path: '/contact' },
      ];

  // Auth user nav links
  const authNavLinks = [
    { name: 'Matches', path: '/matches', icon: <User className="w-5 h-5" /> },
    { name: 'Chat', path: '/chat', icon: <MessageCircle className="w-5 h-5" /> },
    { name: 'Schedule', path: '/schedule', icon: <Calendar className="w-5 h-5" /> },
    { 
      name: 'Profile', 
      path: userType === 'consumer' ? '/consumer-profile' : userType === 'advisor' ? '/advisor-profile' : '/firm-profile', 
      icon: <User className="w-5 h-5" />
    },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm h-16">
      <div className="h-full px-4 flex justify-between items-center">
        <Logo />

        {/* Navigation for non-authenticated users */}
        {!isAuthenticated && (
          <div className="hidden md:flex items-center space-x-6">
            <NavigationMenu links={navLinks} showGetStarted={true} />
          </div>
        )}

        {/* Navigation for authenticated users */}
        {isAuthenticated && (
          <div className="hidden md:flex items-center space-x-6">
            <NavigationMenu links={authNavLinks} />
          </div>
        )}

        {/* Mobile menu */}
        <MobileMenu 
          isMenuOpen={isMenuOpen}
          toggleMenu={toggleMenu}
          links={isAuthenticated ? authNavLinks : navLinks}
          isAuthenticated={isAuthenticated}
          showGetStarted={!isAuthenticated}
          onLogout={isAuthenticated ? handleLogout : undefined}
        />

        {/* Logout button for authenticated users (desktop) */}
        {isAuthenticated && (
          <button 
            onClick={handleLogout}
            className="hidden md:flex items-center space-x-1 font-medium text-navy-700"
          >
            <LogOut className="w-5 h-5" />
            <span className="sr-only md:not-sr-only">Logout</span>
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
