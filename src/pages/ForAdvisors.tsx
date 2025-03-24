import React from 'react';
import AppLayout from '../components/layout/AppLayout';
import BreadcrumbNav from '../components/navigation/BreadcrumbNav';

const ForAdvisors: React.FC = () => {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'For Advisors', url: '/for-advisors' }
  ];

  return (
    <AppLayout>
      <BreadcrumbNav items={breadcrumbs} />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="section-title">For Financial Advisors</h1>
          <p className="section-description">
            Join our network of trusted financial advisors and connect with clients who need your expertise.
          </p>
          
          <div className="mt-8 p-8 bg-slate-50 dark:bg-navy-800/50 rounded-lg text-center">
            <p className="text-lg text-navy-700 dark:text-slate-300">
              This page is under construction. Check back soon for more information.
            </p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ForAdvisors;
