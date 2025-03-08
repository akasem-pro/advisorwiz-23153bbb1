
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, MessageCircle, Calendar, LogOut } from 'lucide-react';
import { useUser } from '../../context/UserContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, userType, setIsAuthenticated, setUserType, setConsumerProfile, setAdvisorProfile } = useUser();
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
    ? [
        {
          name: 'Profile',
          path: userType === 'consumer' ? '/consumer-profile' : '/advisor-profile',
          icon: <User className="w-5 h-5" />,
        },
        {
          name: 'Matches',
          path: '/matches',
          icon: userType === 'consumer' ? <User className="w-5 h-5" /> : null,
        },
        {
          name: 'Messages',
          path: '/chat',
          icon: <MessageCircle className="w-5 h-5" />,
        },
        {
          name: 'Schedule',
          path: '/schedule',
          icon: <Calendar className="w-5 h-5" />,
        },
      ]
    : [
        { name: 'Home', path: '/' },
        { name: 'For Advisors', path: '/for-advisors' },
        { name: 'For Consumers', path: '/for-consumers' },
      ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-navy-900 font-serif text-xl font-bold">AdvisorWiz</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path}
                className={`flex items-center space-x-1 font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'text-teal-600'
                    : 'text-navy-700 hover:text-teal-500'
                }`}
              >
                {link.icon && <span>{link.icon}</span>}
                <span>{link.name}</span>
              </Link>
            ))}
            
            {isAuthenticated ? (
              <button 
                onClick={handleLogout}
                className="flex items-center space-x-1 font-medium text-navy-700 hover:text-teal-500 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            ) : (
              <Link to="/onboarding" className="btn-primary">
                Get Started
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-navy-900 focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md py-4 px-6 absolute top-full left-0 right-0 animate-slide-down">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center space-x-2 py-2 px-1 font-medium text-lg ${
                  location.pathname === link.path
                    ? 'text-teal-600'
                    : 'text-navy-700'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.icon && <span>{link.icon}</span>}
                <span>{link.name}</span>
              </Link>
            ))}
            
            {isAuthenticated ? (
              <button 
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="flex items-center space-x-2 py-2 px-1 font-medium text-lg text-navy-700"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            ) : (
              <Link 
                to="/onboarding" 
                className="btn-primary mt-2 text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Started
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
