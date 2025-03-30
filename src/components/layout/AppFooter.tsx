
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram, ExternalLink } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { cn } from '@/lib/utils';

const AppFooter: React.FC = () => {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-navy-900 text-white py-6 border-t border-navy-800">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
          <div>
            <h4 className="text-sm font-medium text-white mb-3">Company</h4>
            <ul className="space-y-1.5 text-xs">
              <li><Link to="/about" className="text-slate-300 hover:text-teal-400 transition-colors">About Us</Link></li>
              <li><Link to="/careers" className="text-slate-300 hover:text-teal-400 transition-colors">Careers</Link></li>
              <li><Link to="/team" className="text-slate-300 hover:text-teal-400 transition-colors">Our Team</Link></li>
              <li><Link to="/contact" className="text-slate-300 hover:text-teal-400 transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-white mb-3">Services</h4>
            <ul className="space-y-1.5 text-xs">
              <li><Link to="/for-consumers" className="text-slate-300 hover:text-teal-400 transition-colors">For Consumers</Link></li>
              <li><Link to="/for-advisors" className="text-slate-300 hover:text-teal-400 transition-colors">For Advisors</Link></li>
              <li><Link to="/for-firms" className="text-slate-300 hover:text-teal-400 transition-colors">For Firms</Link></li>
              <li><Link to="/pricing" className="text-slate-300 hover:text-teal-400 transition-colors">Pricing</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-white mb-3">Resources</h4>
            <ul className="space-y-1.5 text-xs">
              <li><Link to="/blog" className="text-slate-300 hover:text-teal-400 transition-colors">Blog</Link></li>
              <li><Link to="/resources" className="text-slate-300 hover:text-teal-400 transition-colors">Resources</Link></li>
              <li><Link to="/sitemap" className="text-slate-300 hover:text-teal-400 transition-colors">Sitemap</Link></li>
              <li><Link to="/download" className="text-slate-300 hover:text-teal-400 transition-colors">Download App</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-white mb-3">Legal</h4>
            <ul className="space-y-1.5 text-xs">
              <li><Link to="/terms" className="text-slate-300 hover:text-teal-400 transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-slate-300 hover:text-teal-400 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/disclaimer" className="text-slate-300 hover:text-teal-400 transition-colors">Disclaimer</Link></li>
              <li><Link to="/cookies" className="text-slate-300 hover:text-teal-400 transition-colors">Cookies Policy</Link></li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="pt-4 border-t border-navy-800 flex flex-col md:flex-row justify-between items-center text-xs">
          <div className="flex space-x-4 mb-3 md:mb-0">
            <a href="https://www.x.com/advisorwiz" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-teal-400 transition-colors" aria-label="Twitter">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="https://www.facebook.com/379597858579446" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-teal-400 transition-colors" aria-label="Facebook">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="https://www.linkedin.com/company/advisorwiz/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-teal-400 transition-colors" aria-label="LinkedIn">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="https://www.instagram.com/advisorwiz" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-teal-400 transition-colors" aria-label="Instagram">
              <Instagram className="w-4 h-4" />
            </a>
          </div>
          
          <div className="text-slate-400 mb-3 md:mb-0 text-center md:text-left">
            <p className="text-xs italic">
              Financial decisions should be reviewed with a licensed advisor. AdvisorWiz does not provide financial advice.
            </p>
          </div>
          
          <div className="text-slate-400 text-center md:text-right">
            &copy; {currentYear} AdvisorWiz. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
