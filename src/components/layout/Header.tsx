
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LogOut } from 'lucide-react';
import { useUser } from '../../context/UserContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, setIsAuthenticated, setUserType, setConsumerProfile, setAdvisorProfile } = useUser();
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

  const navLinks = isAuthenticated
    ? []
    : [
        { name: 'Home', path: '/' },
        { name: 'For Advisors', path: '/for-advisors' },
        { name: 'For Consumers', path: '/for-consumers' },
        { name: 'For Firms', path: '/for-firms' },
      ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm h-16">
      <div className="h-full px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-navy-900 font-serif text-xl font-bold">AdvisorWiz</span>
        </Link>

        {!isAuthenticated && (
          <>
            <button
              className="text-navy-900 focus:outline-none"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Mobile Menu */}
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

        {isAuthenticated && (
          <button 
            onClick={handleLogout}
            className="flex items-center space-x-1 font-medium text-navy-700"
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
