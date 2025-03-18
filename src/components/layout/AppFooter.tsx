
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const AppFooter: React.FC = () => {
  return (
    <footer className="bg-navy-50 py-8 mt-auto">
      <div className="container mx-auto px-4">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center mb-4">
              <img 
                src="/lovable-uploads/d66162b8-d098-4ffe-a300-d14aa6ffe38e.png" 
                alt="AdvisorWiz Logo" 
                className="h-10 w-auto" 
                loading="lazy"
              />
            </div>
            <p className="text-slate-600 text-sm">
              Connecting consumers with qualified financial advisors.
            </p>
            <div className="flex space-x-3 mt-4">
              <a href="https://www.x.com/advisorwiz" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-teal-600 transition-colors" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://www.facebook.com/379597858579446" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-teal-600 transition-colors" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://www.linkedin.com/company/advisorwiz/" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-teal-600 transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://www.instagram.com/advisorwiz" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-teal-600 transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-navy-900 font-serif font-semibold mb-4">For Users</h3>
            <ul className="space-y-2">
              <li><Link to="/for-consumers" className="text-slate-600 text-sm hover:text-teal-600">Find an Advisor</Link></li>
              <li><Link to="/matches" className="text-slate-600 text-sm hover:text-teal-600">Browse Matches</Link></li>
              <li><Link to="/pricing" className="text-slate-600 text-sm hover:text-teal-600">Pricing</Link></li>
              <li><Link to="/blog" className="text-slate-600 text-sm hover:text-teal-600">Blog</Link></li>
              <li><Link to="/careers" className="text-slate-600 text-sm hover:text-teal-600">Careers</Link></li>
              <li><Link to="/sitemap" className="text-slate-600 text-sm hover:text-teal-600">Sitemap</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-navy-900 font-serif font-semibold mb-4">Advisors</h3>
            <ul className="space-y-2">
              <li><Link to="/for-advisors" className="text-slate-600 text-sm hover:text-teal-600">Join Network</Link></li>
              <li><Link to="/for-firms" className="text-slate-600 text-sm hover:text-teal-600">Firm Solutions</Link></li>
              <li><Link to="/pricing" className="text-slate-600 text-sm hover:text-teal-600">Pricing Plans</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-navy-900 font-serif font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/terms" className="text-slate-600 text-sm hover:text-teal-600">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-slate-600 text-sm hover:text-teal-600">Privacy Policy</Link></li>
              <li><Link to="/disclaimer" className="text-slate-600 text-sm hover:text-teal-600">Disclaimer</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-200 pt-6">
          <div className="bg-white p-4 rounded-lg border border-slate-200 mb-4">
            <p className="text-sm text-slate-600 mb-3">
              By using AdvisorWiz, you agree to our Terms & Conditions. AdvisorWiz connects consumers with financial advisors but does not provide financial advice. All advisors are independent professionals, and users are responsible for their own financial decisions.
            </p>
            <p className="text-xs text-slate-500">
              <strong>Disclaimer:</strong> All financial decisions should be reviewed with a licensed financial advisor. AdvisorWiz does not provide financial, legal, or tax advice. Any information provided on this platform is for informational purposes only and should not be considered as professional guidance.
            </p>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-slate-500 mb-2 md:mb-0">
              &copy; {new Date().getFullYear()} AdvisorWiz. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <a href="mailto:contact@advisorwiz.com" className="text-sm text-slate-500 hover:text-teal-600">
                contact@advisorwiz.com
              </a>
              <Link to="/contact" className="text-sm text-slate-500 hover:text-teal-600">
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
