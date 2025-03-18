
import React from 'react';
import { CheckCircle } from 'lucide-react';

const FeaturesSection: React.FC = () => {
  return (
    <section className="py-16 bg-white dark:bg-navy-900" aria-labelledby="features-heading">
      <div className="container mx-auto px-4">
        <h2 id="features-heading" className="text-3xl font-serif font-bold text-center text-navy-900 dark:text-white mb-12">
          Key Platform Features
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-slate-50 dark:bg-navy-800 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4 text-navy-800 dark:text-white">Client Acquisition Tools</h3>
            <ul className="space-y-3">
              {[
                "AI-powered matching algorithm for high-quality leads",
                "Customizable advisor profile to showcase your expertise",
                "Direct messaging with potential clients",
                "Scheduling integration for seamless appointments",
                "Client relationship management tools"
              ].map((feature, index) => (
                <li key={index} className="flex">
                  <CheckCircle className="h-5 w-5 text-teal-500 dark:text-teal-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700 dark:text-slate-200">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-slate-50 dark:bg-navy-800 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4 text-navy-800 dark:text-white">Practice Management</h3>
            <ul className="space-y-3">
              {[
                "Client dashboard to track relationships and progress",
                "Secure document sharing and storage",
                "Compliance-ready communication records",
                "Calendar integration with major providers",
                "Performance analytics and reporting"
              ].map((feature, index) => (
                <li key={index} className="flex">
                  <CheckCircle className="h-5 w-5 text-teal-500 dark:text-teal-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700 dark:text-slate-200">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
