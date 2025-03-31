import React from 'react';
import AppLayout from '../components/layout/AppLayout';
import BreadcrumbNav from '../components/navigation/BreadcrumbNav';

const Terms: React.FC = () => {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Terms of Service', url: '/terms' }
  ];

  return (
    <AppLayout>
      <BreadcrumbNav items={breadcrumbs} />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="section-title">Terms of Service</h1>
          <p className="section-description">
            Please read these terms carefully before using our platform.
          </p>
          
          <div className="mt-8 p-8 bg-slate-50 dark:bg-navy-800/50 rounded-lg">
            <p className="text-lg text-navy-700 dark:text-slate-300 mb-4">
              This page is under construction. Our complete terms of service will be available soon.
            </p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Terms;
