
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-navy-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-serif font-medium text-white">AdvisorWiz</h3>
            <p className="text-slate-300 max-w-xs">
              Connecting consumers with trusted financial advisors through an innovative matching platform.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-slate-300 hover:text-teal-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-300 hover:text-teal-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-300 hover:text-teal-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-300 hover:text-teal-400 transition-colors">
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
                  For Advisors
                </Link>
              </li>
              <li>
                <Link to="/for-consumers" className="text-slate-300 hover:text-teal-400 transition-colors">
                  For Consumers
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-slate-300 hover:text-teal-400 transition-colors">
                  Pricing
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

        <div className="mt-12 pt-8 border-t border-navy-800">
          <p className="text-center text-slate-400 text-sm">
            &copy; {new Date().getFullYear()} AdvisorWiz. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
