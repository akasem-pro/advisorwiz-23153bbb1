import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const Footer: React.FC = () => {
  const { theme } = useTheme();
  const isLightMode = theme === 'light';
  
  return (
    <footer className="bg-navy-900 text-white pt-16 pb-8 border-t border-navy-800">
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
            <p className="text-slate-300 max-w-xs">
              Connecting consumers with trusted financial advisors through an innovative matching platform.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="https://www.x.com/advisorwiz" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-teal-400 transition-colors" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://www.facebook.com/379597858579446" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-teal-400 transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/company/advisorwiz/" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-teal-400 transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/advisorwiz" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-teal-400 transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-medium text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-slate-300 hover:text-teal-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/for-advisors" className="text-slate-300 hover:text-teal-400 transition-colors">
                  Advisors
                </Link>
              </li>
              <li>
                <Link to="/for-consumers" className="text-slate-300 hover:text-teal-400 transition-colors">
                  Consumer
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-slate-300 hover:text-teal-400 transition-colors">
                  Resources
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-slate-300 hover:text-teal-400 transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-slate-300 hover:text-teal-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-slate-300 hover:text-teal-400 transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-300 hover:text-teal-400 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/sitemap" className="text-slate-300 hover:text-teal-400 transition-colors">
                  Sitemap
                </Link>
              </li>
              <li>
                <Link to="/onboarding" className="text-slate-300 hover:text-teal-400 transition-colors">
                  Get Started
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-medium text-white">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-teal-400 mt-0.5" />
                <span className="text-slate-300">123 Financial District, Toronto, ON M5J 2Y7</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-teal-400" />
                <span className="text-slate-300">+1 (800) 555-1234</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-teal-400" />
                <a href="mailto:info@advisorwiz.com" className="text-slate-300 hover:text-teal-400 transition-colors">
                  info@advisorwiz.com
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-medium text-white">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-slate-300 hover:text-teal-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-slate-300 hover:text-teal-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="text-slate-300 hover:text-teal-400 transition-colors">
                  Financial Disclaimer
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-slate-300 hover:text-teal-400 transition-colors">
                  Cookies Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-navy-800">
          <div className="text-white text-sm mb-6 max-w-4xl mx-auto">
            <p className="mb-4 text-center">
              By using AdvisorWiz, you agree to our Terms & Conditions. AdvisorWiz connects consumers with financial advisors but does not provide financial advice. All advisors are independent professionals, and users are responsible for their own financial decisions.
            </p>
            <p className="text-center italic">
              Disclaimer: All financial decisions should be reviewed with a licensed financial advisor. AdvisorWiz does not provide financial, legal, or tax advice. Any information provided on this platform is for informational purposes only and should not be considered as professional guidance.
            </p>
          </div>

          <p className="text-center text-white text-sm">
            &copy; {new Date().getFullYear()} AdvisorWiz. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
