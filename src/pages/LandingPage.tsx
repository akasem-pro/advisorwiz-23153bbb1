
import React, { useEffect } from 'react';
import AppLayout from '../components/layout/AppLayout';

const LandingPage: React.FC = () => {
  console.log("LandingPage component rendering");
  
  useEffect(() => {
    console.log("LandingPage mounted");
    document.title = "AdvisorWiz - Connect with Financial Advisors";
    return () => console.log("LandingPage unmounted");
  }, []);
  
  return (
    <AppLayout
      fullWidth={true}
      className="landing-page-layout"
      contentClassName="p-0"
      headerProps={{ transparent: false }}
      hideFooter={false}
      withoutPadding={true}
    >
      <div className="landing-page p-8 text-center">
        <h1 className="text-4xl font-bold mb-6">Welcome to AdvisorWiz</h1>
        <p className="text-xl mb-8">Connect with top financial advisors tailored to your needs</p>
        <div className="flex justify-center gap-4">
          <a href="/sign-up" className="px-6 py-3 bg-teal-600 text-white rounded-md hover:bg-teal-700">
            Get Started
          </a>
          <a href="/for-advisors" className="px-6 py-3 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
            For Advisors
          </a>
        </div>
      </div>
    </AppLayout>
  );
};

export default LandingPage;
