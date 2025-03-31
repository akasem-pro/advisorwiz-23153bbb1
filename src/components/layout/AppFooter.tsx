
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Twitter, Facebook, Linkedin, Instagram } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { cn } from '@/lib/utils';
import { Separator } from "../ui/separator";
import Logo from './Logo';

const AppFooter: React.FC = () => {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-navy-950 text-white py-10">
      <div className="container mx-auto px-4 md:px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Column 1: Logo and description */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-6">
              <Logo forceLightMode={true} />
            </div>
            <p className="text-slate-300 mb-6">
              Connecting consumers with trusted financial advisors through an innovative matching platform.
            </p>
            <div className="flex space-x-5">
              <a href="https://twitter.com/advisorwiz" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-teal-400 transition-colors" aria-label="Twitter">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="https://www.facebook.com/379597858579446" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-teal-400 transition-colors" aria-label="Facebook">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="https://www.linkedin.com/company/advisorwiz/" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-teal-400 transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="https://www.instagram.com/advisorwiz" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-teal-400 transition-colors" aria-label="Instagram">
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>
          
          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-xl font-medium mb-5 text-teal-400">Quick Links</h3>
            <ul className="space-y-2">
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
              <li><Link to="/signin" className="text-slate-300 hover:text-teal-400 transition-colors">Sign In</Link></li>
            </ul>
          </div>
          
          {/* Column 3: Contact Us */}
          <div>
            <h3 className="text-xl font-medium mb-5 text-teal-400">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-teal-400 mr-3 mt-1 flex-shrink-0" />
                <span className="text-slate-300">123 Financial District, Toronto, ON M5J 2Y7</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 text-teal-400 mr-3 flex-shrink-0" />
                <span className="text-slate-300">+1 (800) 555-1234</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 text-teal-400 mr-3 flex-shrink-0" />
                <span className="text-slate-300">info@advisorwiz.com</span>
              </li>
            </ul>
          </div>
          
          {/* Column 4: Legal */}
          <div>
            <h3 className="text-xl font-medium mb-5 text-teal-400">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/terms" className="text-slate-300 hover:text-teal-400 transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-slate-300 hover:text-teal-400 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/disclaimer" className="text-slate-300 hover:text-teal-400 transition-colors">Financial Disclaimer</Link></li>
              <li><Link to="/cookies" className="text-slate-300 hover:text-teal-400 transition-colors">Cookies Policy</Link></li>
            </ul>
          </div>
        </div>
        
        {/* Separator Line */}
        <Separator className="bg-navy-800 my-6" />
        
        {/* Disclaimer text */}
        <div className="text-center text-slate-400 text-sm mb-6">
          <p className="mb-4">
            By using AdvisorWiz, you agree to our Terms & Conditions. AdvisorWiz connects consumers with financial advisors but does not provide financial advice. All advisors are independent professionals, and users are responsible for their own financial decisions.
          </p>
          <p className="italic">
            Disclaimer: All financial decisions should be reviewed with a licensed financial advisor. AdvisorWiz does not provide financial, legal, or tax advice. Any information provided on this platform is for informational purposes only and should not be considered as professional guidance.
          </p>
        </div>
        
        {/* Copyright */}
        <div className="text-center">
          <p className="text-sm text-slate-400">
            &copy; {currentYear} AdvisorWiz. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
