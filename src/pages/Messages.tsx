
import React from 'react';
import AppLayout from '../components/layout/AppLayout';
import PageSEO from '../components/seo/PageSEO';

const Messages: React.FC = () => {
  return (
    <AppLayout>
      <PageSEO
        title="Messages | AdvisorWiz"
        description="Manage your communication with financial advisors and clients."
      />
      
      <div className="container max-w-5xl px-4 py-12 mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Messages</h1>
        <p className="text-lg mb-8">
          Manage your communications with financial advisors and clients in one place.
        </p>
        
        <div className="bg-white dark:bg-navy-800 rounded-lg shadow-md">
          <div className="p-6 text-center">
            <h3 className="text-xl font-semibold mb-3">Your Inbox</h3>
            <p className="text-slate-600 dark:text-slate-300">
              You have no unread messages at this time.
            </p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Messages;
