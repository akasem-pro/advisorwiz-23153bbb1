
import React from 'react';
import AppLayout from '../components/layout/AppLayout';
import PageSEO from '../components/seo/PageSEO';

const Appointments: React.FC = () => {
  return (
    <AppLayout>
      <PageSEO
        title="Appointments | AdvisorWiz"
        description="View and manage your appointments with financial advisors."
      />
      
      <div className="container max-w-5xl px-4 py-12 mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Appointments</h1>
        <p className="text-lg mb-8">
          View and manage your scheduled appointments with financial advisors.
        </p>
        
        <div className="bg-white dark:bg-navy-800 rounded-lg shadow-md">
          <div className="p-6 text-center">
            <h3 className="text-xl font-semibold mb-3">Upcoming Appointments</h3>
            <p className="text-slate-600 dark:text-slate-300">
              You have no upcoming appointments scheduled.
            </p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Appointments;
