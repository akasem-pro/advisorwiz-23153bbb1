
import React from 'react';
import AppLayout from '../components/layout/AppLayout';
import PageSEO from '../components/seo/PageSEO';

const Resources: React.FC = () => {
  return (
    <AppLayout>
      <PageSEO
        title="Resources | AdvisorWiz"
        description="Access financial planning resources, guides, and tools to help you make informed decisions."
      />
      
      <div className="container max-w-5xl px-4 py-12 mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Resources</h1>
        <p className="text-lg mb-8">
          Browse our collection of financial planning resources, guides, and tools to help you make informed decisions.
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Resource cards would go here */}
          <div className="bg-white dark:bg-navy-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Financial Planning Guides</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              Step-by-step guides to help you create a solid financial plan.
            </p>
            <button className="text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300 font-medium">
              Browse Guides →
            </button>
          </div>
          
          <div className="bg-white dark:bg-navy-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Investment Resources</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              Learn about different investment options and strategies.
            </p>
            <button className="text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300 font-medium">
              Explore Resources →
            </button>
          </div>
          
          <div className="bg-white dark:bg-navy-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Financial Calculators</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              Tools to help you plan for retirement, calculate loan payments, and more.
            </p>
            <button className="text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300 font-medium">
              Use Calculators →
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Resources;
