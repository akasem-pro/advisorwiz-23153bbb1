import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import NavigationMenu from './NavigationMenu';
import Logo from '../ui/Logo';
import { trackEvent } from '../../utils/tagManager';

interface HeaderProps {
  transparent?: boolean;
}

const Header: React.FC<HeaderProps> = ({ transparent = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'For Advisors', path: '/for-advisors' },
    { name: 'For Firms', path: '/for-firms' },
    { name: 'For Consumers', path: '/for-consumers' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Blog', path: '/blog' }, // Added Blog link
    { name: 'Contact', path: '/contact' },
  ];
  
  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
      transparent && !isScrolled ? 'bg-transparent' : 'bg-white shadow-md'
    }`}>
      <div className="container mx-auto py-4 px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <Logo className="h-8 w-auto" />
        </Link>
        
        <div className="hidden md:block">
          <NavigationMenu links={navLinks} showGetStarted onClick={closeMenu} />
        </div>
        
        <div className="md:hidden">
          <button 
            onClick={toggleMenu}
            className="text-navy-700 hover:text-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 rounded-md p-2"
            aria-label={isMenuOpen ? 'Close Menu' : 'Open Menu'}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={`fixed top-0 right-0 w-64 h-full bg-white shadow-lg transform ${
        isMenuOpen ? 'translate-x-0' : 'translate-x-full'
      } transition-transform duration-300 ease-in-out z-50 md:hidden`}>
        <div className="p-4">
          <div className="flex justify-end">
            <button 
              onClick={toggleMenu}
              className="text-navy-700 hover:text-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 rounded-md p-2"
              aria-label="Close Menu"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <NavigationMenu links={navLinks} showGetStarted onClick={closeMenu} />
        </div>
      </div>
    </header>
  );
};

export default Header;
