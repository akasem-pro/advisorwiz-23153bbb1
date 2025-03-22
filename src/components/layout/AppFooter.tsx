
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const AppFooter: React.FC = () => {
  const { theme } = useTheme();
  const isLightMode = theme === 'light';
  
  return (
    <footer className={`${isLightMode ? 'bg-gray-50 text-gray-800' : 'bg-navy-900 text-white'} pt-16 pb-8 border-t ${isLightMode ? 'border-gray-200' : 'border-navy-800'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center">
              <img 
                src="/lovable-uploads/b3a65a71-f4f7-40ae-b3ef-dcc1ce0725c1.png" 
                alt="AdvisorWiz Logo" 
                className="h-16 w-auto" 
                loading="lazy"
              />
            </div>
            <p className={`${isLightMode ? 'text-gray-600' : 'text-slate-300'} max-w-xs`}>
              Connecting consumers with qualified financial advisors through an innovative matching platform.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="https://www.x.com/advisorwiz" target="_blank" rel="noopener noreferrer" className={`${isLightMode ? 'text-gray-500 hover:text-teal-600' : 'text-slate-300 hover:text-teal-400'} transition-colors`} aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://www.facebook.com/379597858579446" target="_blank" rel="noopener noreferrer" className={`${isLightMode ? 'text-gray-500 hover:text-teal-600' : 'text-slate-300 hover:text-teal-400'} transition-colors`} aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/company/advisorwiz/" target="_blank" rel="noopener noreferrer" className={`${isLightMode ? 'text-gray-500 hover:text-teal-600' : 'text-slate-300 hover:text-teal-400'} transition-colors`} aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/advisorwiz" target="_blank" rel="noopener noreferrer" className={`${isLightMode ? 'text-gray-500 hover:text-teal-600' : 'text-slate-300 hover:text-teal-400'} transition-colors`} aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className={`text-lg font-medium ${isLightMode ? 'text-gray-900' : 'text-white'}`}>For Users</h4>
            <ul className="space-y-2">
              <li><Link to="/for-consumers" className={`${isLightMode ? 'text-gray-600 hover:text-teal-600' : 'text-slate-300 hover:text-teal-400'} transition-colors`}>Find an Advisor</Link></li>
              <li><Link to="/matches" className={`${isLightMode ? 'text-gray-600 hover:text-teal-600' : 'text-slate-300 hover:text-teal-400'} transition-colors`}>Browse Matches</Link></li>
              <li><Link to="/resources" className={`${isLightMode ? 'text-gray-600 hover:text-teal-600' : 'text-slate-300 hover:text-teal-400'} transition-colors`}>Resources</Link></li>
              <li><Link to="/pricing" className={`${isLightMode ? 'text-gray-600 hover:text-teal-600' : 'text-slate-300 hover:text-teal-400'} transition-colors`}>Pricing</Link></li>
              <li><Link to="/blog" className={`${isLightMode ? 'text-gray-600 hover:text-teal-600' : 'text-slate-300 hover:text-teal-400'} transition-colors`}>Blog</Link></li>
              <li><Link to="/careers" className={`${isLightMode ? 'text-gray-600 hover:text-teal-600' : 'text-slate-300 hover:text-teal-400'} transition-colors`}>Careers</Link></li>
              <li><Link to="/sitemap" className={`${isLightMode ? 'text-gray-600 hover:text-teal-600' : 'text-slate-300 hover:text-teal-400'} transition-colors`}>Sitemap</Link></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className={`text-lg font-medium ${isLightMode ? 'text-gray-900' : 'text-white'}`}>For Advisors</h4>
            <ul className="space-y-2">
              <li><Link to="/for-advisors" className={`${isLightMode ? 'text-gray-600 hover:text-teal-600' : 'text-slate-300 hover:text-teal-400'} transition-colors`}>Join Network</Link></li>
              <li><Link to="/for-firms" className={`${isLightMode ? 'text-gray-600 hover:text-teal-600' : 'text-slate-300 hover:text-teal-400'} transition-colors`}>Firm Solutions</Link></li>
              <li><Link to="/pricing" className={`${isLightMode ? 'text-gray-600 hover:text-teal-600' : 'text-slate-300 hover:text-teal-400'} transition-colors`}>Pricing Plans</Link></li>
              <li><Link to="/resources#compliance-regulations" className={`${isLightMode ? 'text-gray-600 hover:text-teal-600' : 'text-slate-300 hover:text-teal-400'} transition-colors`}>Compliance Resources</Link></li>
              <li><Link to="/resources#tools-calculators" className={`${isLightMode ? 'text-gray-600 hover:text-teal-600' : 'text-slate-300 hover:text-teal-400'} transition-colors`}>Advisor Tools</Link></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className={`text-lg font-medium ${isLightMode ? 'text-gray-900' : 'text-white'}`}>Legal</h4>
            <ul className="space-y-2">
              <li><Link to="/terms" className={`${isLightMode ? 'text-gray-600 hover:text-teal-600' : 'text-slate-300 hover:text-teal-400'} transition-colors`}>Terms of Service</Link></li>
              <li><Link to="/privacy" className={`${isLightMode ? 'text-gray-600 hover:text-teal-600' : 'text-slate-300 hover:text-teal-400'} transition-colors`}>Privacy Policy</Link></li>
              <li><Link to="/disclaimer" className={`${isLightMode ? 'text-gray-600 hover:text-teal-600' : 'text-slate-300 hover:text-teal-400'} transition-colors`}>Disclaimer</Link></li>
              <li><Link to="/cookies" className={`${isLightMode ? 'text-gray-600 hover:text-teal-600' : 'text-slate-300 hover:text-teal-400'} transition-colors`}>Cookies Policy</Link></li>
              <li><Link to="/contact" className={`${isLightMode ? 'text-gray-600 hover:text-teal-600' : 'text-slate-300 hover:text-teal-400'} transition-colors`}>Contact Us</Link></li>
            </ul>
          </div>
        </div>

        <div className={`mt-12 pt-8 border-t ${isLightMode ? 'border-gray-200' : 'border-navy-800'}`}>
          <div className={`${isLightMode ? 'text-gray-600' : 'text-slate-400'} text-sm mb-6 max-w-4xl mx-auto`}>
            <p className="mb-4 text-center">
              By using AdvisorWiz, you agree to our Terms & Conditions. AdvisorWiz connects consumers with financial advisors but does not provide financial advice. All advisors are independent professionals, and users are responsible for their own financial decisions.
            </p>
            <p className="text-center italic">
              Disclaimer: All financial decisions should be reviewed with a licensed financial advisor. AdvisorWiz does not provide financial, legal, or tax advice. Any information provided on this platform is for informational purposes only and should not be considered as professional guidance.
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className={`text-sm ${isLightMode ? 'text-gray-600' : 'text-slate-400'} mb-2 md:mb-0`}>
              &copy; {new Date().getFullYear()} AdvisorWiz. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <a href="mailto:contact@advisorwiz.com" className={`text-sm ${isLightMode ? 'text-gray-600 hover:text-teal-600' : 'text-slate-400 hover:text-teal-400'}`}>
                contact@advisorwiz.com
              </a>
              <Link to="/contact" className={`text-sm ${isLightMode ? 'text-gray-600 hover:text-teal-600' : 'text-slate-400 hover:text-teal-400'}`}>
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
