import React from 'react';
import AppLayout from '../components/layout/AppLayout';
import BreadcrumbNav from '../components/navigation/BreadcrumbNav';

const Privacy: React.FC = () => {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Privacy Policy', url: '/privacy' }
  ];

  return (
    <AppLayout>
      <BreadcrumbNav items={breadcrumbs} />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="section-title">Privacy Policy</h1>
          <p className="section-description">
            How we collect, use, and protect your personal information.
          </p>
          
          <div className="mt-8 p-8 bg-slate-50 dark:bg-navy-800/50 rounded-lg">
            <p className="text-lg text-navy-700 dark:text-slate-300 mb-4">
              This page is under construction. Our complete privacy policy will be available soon.
            </p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Privacy;
