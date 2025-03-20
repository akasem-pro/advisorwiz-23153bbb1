
import React from 'react';
import { Check } from 'lucide-react';

const HowItWorksSection: React.FC = () => {
  return (
    <section className="py-16 bg-slate-50 dark:bg-navy-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold text-navy-900 dark:text-white mb-4">
            How AdvisorWiz Works for Your Firm
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Our platform offers a streamlined approach to managing your advisory team and growing your business.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="flex flex-col">
            <div className="bg-white dark:bg-navy-700 rounded-lg p-6 shadow-sm border border-slate-200 dark:border-navy-600 h-full">
              <div className="w-12 h-12 rounded-full bg-teal-100 dark:bg-teal-800/30 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-teal-600 dark:text-teal-400">1</span>
              </div>
              <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-3">Create Your Firm Profile</h3>
              <p className="text-slate-600 dark:text-slate-300">
                Set up your firm's profile with details about your practice, services, and unique value proposition.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col">
            <div className="bg-white dark:bg-navy-700 rounded-lg p-6 shadow-sm border border-slate-200 dark:border-navy-600 h-full">
              <div className="w-12 h-12 rounded-full bg-teal-100 dark:bg-teal-800/30 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-teal-600 dark:text-teal-400">2</span>
              </div>
              <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-3">Add Advisor Profiles</h3>
              <p className="text-slate-600 dark:text-slate-300">
                Create and manage profiles for all advisors in your firm, showcasing their specialties and expertise.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col">
            <div className="bg-white dark:bg-navy-700 rounded-lg p-6 shadow-sm border border-slate-200 dark:border-navy-600 h-full">
              <div className="w-12 h-12 rounded-full bg-teal-100 dark:bg-teal-800/30 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-teal-600 dark:text-teal-400">3</span>
              </div>
              <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-3">Manage Client Connections</h3>
              <p className="text-slate-600 dark:text-slate-300">
                Oversee matches, assign clients to specific advisors, and track all client interactions in one place.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-16 max-w-3xl mx-auto bg-white dark:bg-navy-700 rounded-lg p-8 shadow-sm border border-slate-200 dark:border-navy-600">
          <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-4 text-center">
            Enterprise Benefits
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <Check className="h-5 w-5 text-teal-500 dark:text-teal-400 mt-1 flex-shrink-0" />
              <p className="text-slate-700 dark:text-slate-300">Centralized dashboard for all advisors</p>
            </div>
            <div className="flex items-start gap-3">
              <Check className="h-5 w-5 text-teal-500 dark:text-teal-400 mt-1 flex-shrink-0" />
              <p className="text-slate-700 dark:text-slate-300">Team-based client assignment</p>
            </div>
            <div className="flex items-start gap-3">
              <Check className="h-5 w-5 text-teal-500 dark:text-teal-400 mt-1 flex-shrink-0" />
              <p className="text-slate-700 dark:text-slate-300">Unified billing and subscription management</p>
            </div>
            <div className="flex items-start gap-3">
              <Check className="h-5 w-5 text-teal-500 dark:text-teal-400 mt-1 flex-shrink-0" />
              <p className="text-slate-700 dark:text-slate-300">Custom branding options</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
