
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LogOut, Building, Calendar, MessageCircle, User } from 'lucide-react';
import { useUser } from '../../context/UserContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, setIsAuthenticated, setUserType, setConsumerProfile, setAdvisorProfile, userType } = useUser();
  const location = useLocation();

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
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-navy-900 font-serif text-xl font-bold">AdvisorWiz</span>
        </Link>

        {/* Navigation for non-authenticated users */}
        {!isAuthenticated && (
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`py-2 px-1 font-medium ${
                  location.pathname === link.path
                    ? 'text-teal-600'
                    : 'text-navy-700 hover:text-teal-600'
                } transition-colors`}
              >
                {link.name}
              </Link>
            ))}
            
            <Link to="/onboarding" className="btn-primary">
              Get Started
            </Link>
          </div>
        )}

        {/* Navigation for authenticated users */}
        {isAuthenticated && (
          <div className="hidden md:flex items-center space-x-6">
            {authNavLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`py-2 px-1 font-medium flex items-center ${
                  location.pathname === link.path
                    ? 'text-teal-600'
                    : 'text-navy-700 hover:text-teal-600'
                } transition-colors`}
              >
                <span className="mr-1">{link.icon}</span>
                {link.name}
              </Link>
            ))}
          </div>
        )}

        {/* Mobile menu button for non-authenticated users */}
        {!isAuthenticated && (
          <>
            <button
              className="text-navy-900 md:hidden focus:outline-none"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Mobile Menu for non-authenticated users */}
            {isMenuOpen && (
              <div className="bg-white shadow-md py-4 px-6 absolute top-full left-0 right-0 animate-slide-down">
                <nav className="flex flex-col space-y-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`py-2 px-1 font-medium text-lg ${
                        location.pathname === link.path
                          ? 'text-teal-600'
                          : 'text-navy-700'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span>{link.name}</span>
                    </Link>
                  ))}
                  
                  <Link 
                    to="/onboarding" 
                    className="btn-primary mt-2 text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </nav>
              </div>
            )}
          </>
        )}

        {/* Mobile menu button for authenticated users */}
        {isAuthenticated && (
          <>
            <button
              className="text-navy-900 md:hidden focus:outline-none"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Mobile Menu for authenticated users */}
            {isMenuOpen && (
              <div className="bg-white shadow-md py-4 px-6 absolute top-full left-0 right-0 animate-slide-down">
                <nav className="flex flex-col space-y-4">
                  {authNavLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`py-2 px-1 font-medium text-lg flex items-center ${
                        location.pathname === link.path
                          ? 'text-teal-600'
                          : 'text-navy-700'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="mr-2">{link.icon}</span>
                      <span>{link.name}</span>
                    </Link>
                  ))}
                  
                  <button 
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 font-medium text-navy-700 py-2"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </nav>
              </div>
            )}
          </>
        )}

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
