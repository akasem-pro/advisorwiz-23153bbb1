
import React from 'react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import { useUser } from '../context/UserContext';
import AuthGuard from '../components/auth/AuthGuard';
import { User, Calendar, Users, BarChart3, MessageCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
import QuickActionPanel from '../components/advisor/QuickActionPanel';
import AdvisorQuickPathWidget from '../components/advisor/AdvisorQuickPathWidget';
import TrustBadges from '../components/ui/TrustBadges';
import FloatingSupportButton from '../components/support/FloatingSupportButton';
import ClientList from '../components/advisor/ClientList';

const AdvisorDashboard: React.FC = () => {
  const { advisorProfile } = useUser();
  
  return (
    <AuthGuard userTypes={['advisor']}>
      <DashboardLayout 
        title="Advisor Dashboard" 
        subtitle="Manage your practice and client relationships"
      >
        <FloatingSupportButton />
        
        <div className="bg-white dark:bg-navy-800 rounded-lg shadow-sm border border-slate-200 dark:border-navy-700 p-4 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-serif font-bold text-navy-900 dark:text-white">Welcome back, {advisorProfile?.name || 'Advisor'}</h2>
              <p className="text-slate-600 dark:text-slate-400">Here's your practice at a glance</p>
            </div>
            <TrustBadges compact className="hidden md:flex" />
          </div>
        </div>
        
        <AdvisorQuickPathWidget />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="bg-white dark:bg-navy-800 rounded-xl shadow-sm p-6 border border-slate-200 dark:border-navy-700">
            <div className="flex items-start justify-between mb-4">
              <h3 className="font-serif font-semibold text-lg text-navy-900 dark:text-white">Your Profile</h3>
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">
                {advisorProfile?.profilePicture ? '80% Complete' : '60% Complete'}
              </span>
            </div>
            
            <div className="flex items-center space-x-4 mb-4">
              {advisorProfile?.profilePicture ? (
                <img src={advisorProfile.profilePicture} alt="Profile" className="w-16 h-16 rounded-full object-cover" />
              ) : (
                <div className="w-16 h-16 bg-slate-200 dark:bg-navy-600 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-slate-400 dark:text-slate-300" />
                </div>
              )}
              <div>
                <h4 className="font-medium text-navy-900 dark:text-white">
                  {advisorProfile?.name || 'Complete Your Profile'}
                </h4>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {advisorProfile?.organization || 'Add your organization details'}
                </p>
              </div>
            </div>
            
            <Link to="/advisor-profile">
              <Button variant="outline" className="w-full">
                <User className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            </Link>
          </div>
          
          {/* Quick Actions Panel */}
          <div className="lg:col-span-2">
            <QuickActionPanel />
          </div>
          
          {/* Client List for Easy Calling - New Section */}
          <div className="lg:col-span-2">
            <ClientList />
          </div>
          
          {/* Appointments Card */}
          <div className="bg-white dark:bg-navy-800 rounded-xl shadow-sm p-6 border border-slate-200 dark:border-navy-700">
            <div className="mb-4">
              <h3 className="font-serif font-semibold text-lg text-navy-900 dark:text-white">Upcoming Appointments</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                View and manage your scheduled meetings
              </p>
            </div>
            
            <div className="flex justify-center my-4">
              <Calendar className="w-12 h-12 text-purple-500" />
            </div>
            
            <Link to="/schedule">
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                View Calendar
              </Button>
            </Link>
          </div>
          
          {/* Leads Card */}
          <div className="bg-white dark:bg-navy-800 rounded-xl shadow-sm p-6 border border-slate-200 dark:border-navy-700">
            <div className="mb-4">
              <h3 className="font-serif font-semibold text-lg text-navy-900 dark:text-white">Lead Management</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Track potential clients and conversions
              </p>
            </div>
            
            <div className="flex justify-center my-4">
              <Users className="w-12 h-12 text-blue-500" />
            </div>
            
            <Link to="/leads">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Manage Leads
              </Button>
            </Link>
          </div>
          
          {/* Performance Metrics Card */}
          <div className="bg-white dark:bg-navy-800 rounded-xl shadow-sm p-6 border border-slate-200 dark:border-navy-700">
            <div className="mb-4">
              <h3 className="font-serif font-semibold text-lg text-navy-900 dark:text-white">Performance Metrics</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Track your key performance indicators
              </p>
            </div>
            
            <div className="flex justify-center my-4">
              <BarChart3 className="w-12 h-12 text-green-500" />
            </div>
            
            <Link to="/analytics">
              <Button className="w-full bg-green-600 hover:bg-green-700">
                View Analytics
              </Button>
            </Link>
          </div>
        </div>
      </DashboardLayout>
    </AuthGuard>
  );
};

export default AdvisorDashboard;
