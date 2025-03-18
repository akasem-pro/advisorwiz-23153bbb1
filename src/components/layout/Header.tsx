
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';
import NavigationMenu from './NavigationMenu';
import ThemeToggle from '../ui/ThemeToggle';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
  // Navigation links configuration
  const navigationLinks = [
    { name: 'For Consumers', path: '/for-consumers' },
    { name: 'For Advisors', path: '/for-advisors' },
    { name: 'For Firms', path: '/for-firms' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Resources', path: '/resources' }
  ];
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Add shadow and background when scrolled
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 py-4 px-4 sm:px-6 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 dark:bg-navy-950/90 backdrop-blur-md shadow-sm' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center" aria-label="AdvisorWiz Home">
            <Logo />
          </Link>
          
          <div className="hidden md:flex items-center space-x-1">
            <NavigationMenu links={navigationLinks} />
            <ThemeToggle className="ml-2" />
            <Link 
              to="/sign-in" 
              className="ml-4 text-navy-700 dark:text-slate-300 hover:text-navy-900 dark:hover:text-white px-4 py-2 rounded-lg transition-colors"
            >
              Sign In
            </Link>
            <Link 
              to="/onboarding" 
              className="ml-2 bg-navy-600 dark:bg-navy-700 hover:bg-navy-700 dark:hover:bg-navy-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Get Started
            </Link>
          </div>
          
          <div className="flex items-center md:hidden">
            <ThemeToggle className="mr-2" />
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-navy-700 dark:text-white hover:text-navy-900 dark:hover:text-slate-300 focus:outline-none"
              aria-expanded={isOpen}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden mt-4 py-4 bg-white dark:bg-navy-900 rounded-lg shadow-lg">
            <nav>
              <ul className="space-y-2">
                {navigationLinks.map((link) => (
                  <li key={link.path}>
                    <Link 
                      to={link.path} 
                      className="block px-4 py-2 text-navy-700 dark:text-white hover:bg-slate-100 dark:hover:bg-navy-800 rounded-lg"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link 
                    to="/sign-in" 
                    className="block px-4 py-2 text-navy-700 dark:text-white hover:bg-slate-100 dark:hover:bg-navy-800 rounded-lg"
                  >
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/onboarding" 
                    className="block px-4 py-2 bg-navy-600 dark:bg-navy-700 text-white hover:bg-navy-700 dark:hover:bg-navy-600 rounded-lg"
                  >
                    Get Started
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
