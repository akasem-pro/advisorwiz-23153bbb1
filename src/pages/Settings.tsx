
import React from 'react';
import { BreadcrumbTrail } from '../components/navigation/BreadcrumbTrail';

const Settings: React.FC = () => {
  console.log("Rendering Settings page");
  
  const breadcrumbItems = [
    { label: 'Dashboard', path: '/advisor-dashboard' },
    { label: 'Settings' }
  ];

  return (
    <div className="settings-page">
      <BreadcrumbTrail items={breadcrumbItems} className="mb-4" />
      
      <div className="bg-white dark:bg-navy-800 rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-navy-900 dark:text-white mb-6">
          Account Settings
        </h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-lg font-medium text-navy-900 dark:text-white mb-4">Profile Information</h2>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              Manage your personal information and account settings.
            </p>
            <button className="px-4 py-2 bg-navy-600 text-white rounded hover:bg-navy-700">
              Edit Profile
            </button>
          </section>
          
          <section>
            <h2 className="text-lg font-medium text-navy-900 dark:text-white mb-4">Preferences</h2>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              Set your notifications, display, and other preferences.
            </p>
            <button className="px-4 py-2 bg-navy-600 text-white rounded hover:bg-navy-700">
              Manage Preferences
            </button>
          </section>
          
          <section>
            <h2 className="text-lg font-medium text-navy-900 dark:text-white mb-4">Security</h2>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              Update your password and security settings.
            </p>
            <button className="px-4 py-2 bg-navy-600 text-white rounded hover:bg-navy-700">
              Change Password
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Settings;
