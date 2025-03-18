
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const HowItWorksSection: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <section className="py-16 bg-slate-50 dark:bg-navy-950">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl font-serif font-bold text-navy-900 dark:text-white mb-8 text-center">
          How It Works
        </h2>
        
        <div className="space-y-8">
          <div className="bg-white dark:bg-navy-800 rounded-xl shadow-sm p-6 flex gap-6">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-teal-100 dark:bg-teal-900/40 text-teal-600 dark:text-teal-400 flex items-center justify-center text-xl font-bold">
              1
            </div>
            <div>
              <h3 className="text-xl font-semibold text-navy-900 dark:text-white mb-2">Create Your Firm Profile</h3>
              <p className="text-slate-600 dark:text-slate-300">
                Set up your firm's profile with details about your organization, services, and specialties.
              </p>
            </div>
          </div>
          
          <div className="bg-white dark:bg-navy-800 rounded-xl shadow-sm p-6 flex gap-6">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-teal-100 dark:bg-teal-900/40 text-teal-600 dark:text-teal-400 flex items-center justify-center text-xl font-bold">
              2
            </div>
            <div>
              <h3 className="text-xl font-semibold text-navy-900 dark:text-white mb-2">Add Advisor Profiles</h3>
              <p className="text-slate-600 dark:text-slate-300">
                Create profiles for each advisor in your firm, highlighting their unique expertise and experience.
              </p>
            </div>
          </div>
          
          <div className="bg-white dark:bg-navy-800 rounded-xl shadow-sm p-6 flex gap-6">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-teal-100 dark:bg-teal-900/40 text-teal-600 dark:text-teal-400 flex items-center justify-center text-xl font-bold">
              3
            </div>
            <div>
              <h3 className="text-xl font-semibold text-navy-900 dark:text-white mb-2">Manage Client Matches</h3>
              <p className="text-slate-600 dark:text-slate-300">
                Connect with potential clients and assign them to the most suitable advisors within your firm.
              </p>
            </div>
          </div>
          
          <div className="bg-white dark:bg-navy-800 rounded-xl shadow-sm p-6 flex gap-6">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-teal-100 dark:bg-teal-900/40 text-teal-600 dark:text-teal-400 flex items-center justify-center text-xl font-bold">
              4
            </div>
            <div>
              <h3 className="text-xl font-semibold text-navy-900 dark:text-white mb-2">Grow Your Business</h3>
              <p className="text-slate-600 dark:text-slate-300">
                Leverage analytics and client feedback to continuously improve your firm's service offerings.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <button 
            onClick={() => navigate('/firm-profile')}
            className="btn-primary inline-flex items-center"
          >
            Start Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
