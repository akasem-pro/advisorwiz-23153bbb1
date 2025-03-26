
import React from 'react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import { useUser } from '../context/UserContext';
import AuthGuard from '../components/auth/AuthGuard';
import { ArrowRight, User, Calendar, MessageCircle, Search, Shield } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
import TrustBadges from '../components/ui/TrustBadges';
import FloatingSupportButton from '../components/support/FloatingSupportButton';

const ConsumerDashboard: React.FC = () => {
  const { consumerProfile } = useUser();
  
  return (
    <AuthGuard userTypes={['consumer']}>
      <DashboardLayout 
        title="Your Dashboard" 
        subtitle="Welcome back, manage your financial journey"
      >
        <FloatingSupportButton />
        
        <div className="bg-white dark:bg-navy-800 rounded-lg shadow-sm border border-slate-200 dark:border-navy-700 p-4 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-serif font-bold text-navy-900 dark:text-white">Welcome back, {consumerProfile?.name || 'there'}</h2>
              <p className="text-slate-600 dark:text-slate-400">Let's continue your financial planning journey</p>
            </div>
            <TrustBadges compact className="hidden md:flex" />
          </div>
        </div>
        
        {/* Security Banner - New Trust Element */}
        <div className="mb-6 bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800 rounded-lg p-4">
          <div className="flex items-center">
            <Shield className="h-6 w-6 text-teal-600 dark:text-teal-400 mr-3" />
            <div>
              <h3 className="font-medium text-teal-800 dark:text-teal-300">Your data is protected</h3>
              <p className="text-sm text-teal-600 dark:text-teal-400">All your financial information is encrypted and secure</p>
            </div>
          </div>
        </div>
        
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
          
          {/* Find Advisors Card - Enhanced */}
          <div className="bg-white dark:bg-navy-800 rounded-xl shadow-sm p-6 border border-slate-200 dark:border-navy-700">
            <div className="mb-4">
              <h3 className="font-serif font-semibold text-lg text-navy-900 dark:text-white">Find Your Advisor</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Our matching algorithm finds your perfect financial fit
              </p>
            </div>
            
            <div className="flex justify-center my-4">
              <Search className="w-12 h-12 text-teal-500" />
            </div>
            
            <div className="flex flex-col space-y-2">
              <Link to="/matches">
                <Button className="w-full bg-teal-600 hover:bg-teal-700">
                  Browse Recommended Matches
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              
              <div className="text-xs text-center text-slate-500 dark:text-slate-400 pt-2">
                <span>98% client satisfaction with our matches</span>
              </div>
            </div>
          </div>
          
          {/* Quick Actions Card - Enhanced */}
          <div className="bg-white dark:bg-navy-800 rounded-xl shadow-sm p-6 border border-slate-200 dark:border-navy-700">
            <h3 className="font-serif font-semibold text-lg text-navy-900 dark:text-white mb-4">Quick Actions</h3>
            
            <div className="space-y-3">
              <Link to="/schedule">
                <Button variant="outline" className="w-full justify-start bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/30">
                  <Calendar className="mr-2 h-4 w-4 text-purple-500" />
                  Schedule an Appointment
                </Button>
              </Link>
              
              <Link to="/chat">
                <Button variant="outline" className="w-full justify-start bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/30">
                  <MessageCircle className="mr-2 h-4 w-4 text-blue-500" />
                  View Messages
                </Button>
              </Link>
              
              <Link to="/matches">
                <Button variant="outline" className="w-full justify-start bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900/30">
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
