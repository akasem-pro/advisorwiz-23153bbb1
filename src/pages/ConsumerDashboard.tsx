
import React from 'react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import { useUser } from '../context/UserContext';
import AuthGuard from '../components/auth/AuthGuard';
import { ArrowRight, User, Calendar, MessageCircle, Search } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';

const ConsumerDashboard: React.FC = () => {
  const { consumerProfile } = useUser();
  
  return (
    <AuthGuard userTypes={['consumer']}>
      <DashboardLayout 
        title="Your Dashboard" 
        subtitle="Welcome back, manage your financial journey"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="bg-white dark:bg-navy-800 rounded-xl shadow-sm p-6 border border-slate-200 dark:border-navy-700">
            <div className="flex items-start justify-between mb-4">
              <h3 className="font-serif font-semibold text-lg text-navy-900 dark:text-white">Your Profile</h3>
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">
                {consumerProfile?.profilePicture ? '80% Complete' : '50% Complete'}
              </span>
            </div>
            
            <div className="flex items-center space-x-4 mb-4">
              {consumerProfile?.profilePicture ? (
                <img src={consumerProfile.profilePicture} alt="Profile" className="w-16 h-16 rounded-full object-cover" />
              ) : (
                <div className="w-16 h-16 bg-slate-200 dark:bg-navy-600 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-slate-400 dark:text-slate-300" />
                </div>
              )}
              <div>
                <h4 className="font-medium text-navy-900 dark:text-white">
                  {consumerProfile?.name || 'Complete Your Profile'}
                </h4>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {consumerProfile?.email || 'Add your personal details'}
                </p>
              </div>
            </div>
            
            <Link to="/consumer-profile">
              <Button variant="outline" className="w-full">
                <User className="mr-2 h-4 w-4" />
                Complete Your Profile
              </Button>
            </Link>
          </div>
          
          {/* Find Advisors Card */}
          <div className="bg-white dark:bg-navy-800 rounded-xl shadow-sm p-6 border border-slate-200 dark:border-navy-700">
            <div className="mb-4">
              <h3 className="font-serif font-semibold text-lg text-navy-900 dark:text-white">Find Advisors</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Discover advisors that match your financial needs
              </p>
            </div>
            
            <div className="flex justify-center my-4">
              <Search className="w-12 h-12 text-teal-500" />
            </div>
            
            <Link to="/matches">
              <Button className="w-full bg-teal-600 hover:bg-teal-700">
                Browse Matches
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          {/* Quick Actions Card */}
          <div className="bg-white dark:bg-navy-800 rounded-xl shadow-sm p-6 border border-slate-200 dark:border-navy-700">
            <h3 className="font-serif font-semibold text-lg text-navy-900 dark:text-white mb-4">Quick Actions</h3>
            
            <div className="space-y-3">
              <Link to="/schedule">
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="mr-2 h-4 w-4 text-purple-500" />
                  Schedule an Appointment
                </Button>
              </Link>
              
              <Link to="/chat">
                <Button variant="outline" className="w-full justify-start">
                  <MessageCircle className="mr-2 h-4 w-4 text-blue-500" />
                  View Messages
                </Button>
              </Link>
              
              <Link to="/matches">
                <Button variant="outline" className="w-full justify-start">
                  <Search className="mr-2 h-4 w-4 text-green-500" />
                  Find New Advisors
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </AuthGuard>
  );
};

export default ConsumerDashboard;
