import React from 'react';
import { useUser } from '../context/UserContext';
import FirmOnboardingTour from '../components/onboarding/FirmOnboardingTour';
import CommonProfileLayout from '../components/profile/CommonProfileLayout';

const FirmProfile: React.FC = () => {
  const { firms } = useUser();
  
  return (
    <CommonProfileLayout 
      pageTitle="Firm Profile"
      pageDescription="Manage your firm's information and team members"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-md mb-8" id="firm-basic-info">
            <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Firm Name</label>
                <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Website</label>
                <input type="url" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Contact Email</label>
                <input type="email" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md mb-8" id="firm-description">
            <h2 className="text-xl font-semibold mb-4">Firm Description</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea rows={4} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"></textarea>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md mb-8" id="firm-credentials">
            <h2 className="text-xl font-semibold mb-4">Credentials & Regulatory Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Registration Number</label>
                <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Regulatory Body</label>
                <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md mb-8" id="firm-assets">
            <h2 className="text-xl font-semibold mb-4">Assets & Metrics</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Assets Under Management</label>
                <input type="number" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Years in Business</label>
                <input type="number" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md" id="firm-subscription">
            <h2 className="text-xl font-semibold mb-4">Subscription Plan</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border border-gray-300 p-4 rounded-md">
                <h3 className="font-medium">Basic</h3>
                <p>For small firms</p>
              </div>
              <div className="border border-indigo-500 p-4 rounded-md bg-indigo-50">
                <h3 className="font-medium">Professional</h3>
                <p>For growing firms</p>
                <div className="mt-2 text-sm bg-indigo-100 text-indigo-700 px-2 py-1 rounded inline-block">CURRENT PLAN</div>
              </div>
              <div className="border border-gray-300 p-4 rounded-md">
                <h3 className="font-medium">Enterprise</h3>
                <p>For large firms</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-md mb-8" id="team-management">
            <h2 className="text-xl font-semibold mb-4">Team Management</h2>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md w-full mb-4 invite-advisor-button">
              + Invite Advisor
            </button>
            
            <div className="advisor-list space-y-3">
              <h3 className="font-medium text-sm text-gray-500">TEAM MEMBERS</h3>
              {firms && firms.length > 0 && firms[0].advisorIds ? (
                firms[0].advisorIds.map(advisorId => (
                  <div key={advisorId} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                    <div>
                      <p className="font-medium">John Doe</p>
                      <p className="text-sm text-gray-500">Financial Advisor</p>
                    </div>
                    <button className="text-indigo-600 hover:text-indigo-800">View</button>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-gray-500">
                  No team members yet
                </div>
              )}
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md analytics-dashboard">
            <h2 className="text-xl font-semibold mb-4">Analytics Overview</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">CLIENT ACQUISITIONS</p>
                <p className="text-2xl font-bold">24</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">CONVERSION RATE</p>
                <p className="text-2xl font-bold">18.5%</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">AVERAGE MATCH SCORE</p>
                <p className="text-2xl font-bold">87</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <a href="/analytics" className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">View detailed analytics →</a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-end">
        <button className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700">
          Save Changes
        </button>
      </div>
      
      <FirmOnboardingTour />
    </CommonProfileLayout>
  );
};

export default FirmProfile;
