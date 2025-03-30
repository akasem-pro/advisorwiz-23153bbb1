
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { cn } from '@/lib/utils';
import { Separator } from "../ui/separator";
import Logo from './Logo';

const AppFooter: React.FC = () => {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-navy-950 text-white py-12">
      <div className="container mx-auto px-4 md:px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Column 1: Logo and description */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <Logo forceLightMode={true} />
            </div>
            <p className="text-sm text-slate-300 mb-6">
              Connecting consumers with trusted financial advisors through an innovative matching platform.
            </p>
            <div className="flex space-x-4">
              <a href="https://twitter.com/advisorwiz" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-teal-400 transition-colors" aria-label="Twitter">
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
          
          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-slate-300 hover:text-teal-400 transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-slate-300 hover:text-teal-400 transition-colors">About Us</Link></li>
              <li><Link to="/for-advisors" className="text-slate-300 hover:text-teal-400 transition-colors">Advisors</Link></li>
              <li><Link to="/for-consumers" className="text-slate-300 hover:text-teal-400 transition-colors">Consumer</Link></li>
              <li><Link to="/resources" className="text-slate-300 hover:text-teal-400 transition-colors">Resources</Link></li>
              <li><Link to="/pricing" className="text-slate-300 hover:text-teal-400 transition-colors">Pricing</Link></li>
              <li><Link to="/blog" className="text-slate-300 hover:text-teal-400 transition-colors">Blog</Link></li>
              <li><Link to="/careers" className="text-slate-300 hover:text-teal-400 transition-colors">Careers</Link></li>
              <li><Link to="/contact" className="text-slate-300 hover:text-teal-400 transition-colors">Contact Us</Link></li>
              <li><Link to="/sitemap" className="text-slate-300 hover:text-teal-400 transition-colors">Sitemap</Link></li>
              <li><Link to="/sign-in" className="text-slate-300 hover:text-teal-400 transition-colors">Sign In</Link></li>
            </ul>
          </div>
          
          {/* Column 3: Contact Us */}
          <div>
            <h3 className="text-lg font-medium mb-4">Contact Us</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-teal-400 mr-3 mt-0.5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span className="text-slate-300">123 Financial District, Toronto, ON M5J 2Y7</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-teal-400 mr-3 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <span className="text-slate-300">+1 (800) 555-1234</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-teal-400 mr-3 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <span className="text-slate-300">info@advisorwiz.com</span>
              </li>
            </ul>
          </div>
          
          {/* Column 4: Legal */}
          <div>
            <h3 className="text-lg font-medium mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/terms" className="text-slate-300 hover:text-teal-400 transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-slate-300 hover:text-teal-400 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/disclaimer" className="text-slate-300 hover:text-teal-400 transition-colors">Financial Disclaimer</Link></li>
              <li><Link to="/cookies" className="text-slate-300 hover:text-teal-400 transition-colors">Cookies Policy</Link></li>
            </ul>
          </div>
        </div>
        
        {/* Separator Line */}
        <Separator className="bg-navy-800 my-6" />
        
        {/* Disclaimer & Copyright */}
        <div className="text-center space-y-4">
          <p className="text-sm text-slate-400 max-w-4xl mx-auto">
            By using AdvisorWiz, you agree to our Terms & Conditions. AdvisorWiz connects consumers with financial advisors but does not provide financial advice. All advisors are independent professionals, and users are responsible for their own financial decisions.
          </p>
          <p className="text-sm italic text-slate-400 max-w-4xl mx-auto">
            Disclaimer: All financial decisions should be reviewed with a licensed financial advisor. AdvisorWiz does not provide financial, legal, or tax advice. Any information provided on this platform is for informational purposes only and should not be considered as professional guidance.
          </p>
          <p className="text-sm text-slate-400 pt-2">
            &copy; {currentYear} AdvisorWiz. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
