
import React from 'react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import { useUser } from '../context/UserContext';
import AuthGuard from '../components/auth/AuthGuard';
import { Building, Users, BarChart3, Plus, Shield } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
import FirmMetricsDashboard from '../components/firm/FirmMetricsDashboard';
import TrustBadges from '../components/ui/TrustBadges';
import FloatingSupportButton from '../components/support/FloatingSupportButton';

const FirmDashboard: React.FC = () => {
  const { firms } = useUser();
  
  // For demo, we assume the firm is the first one in the array
  const firm = firms && firms.length > 0 ? firms[0] : null;
  
  return (
    <AuthGuard userTypes={['firm_admin']}>
      <DashboardLayout 
        title="Firm Dashboard" 
        subtitle="Manage your advisory firm and team"
      >
        <FloatingSupportButton />
        
        <div className="bg-white dark:bg-navy-800 rounded-lg shadow-sm border border-slate-200 dark:border-navy-700 p-4 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-serif font-bold text-navy-900 dark:text-white">Welcome, {firm?.name || 'Setup your firm'}</h2>
              <p className="text-slate-600 dark:text-slate-400">Manage your advisory practice</p>
            </div>
            <TrustBadges compact className="hidden md:flex" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Firm Profile Card */}
          <div className="bg-white dark:bg-navy-800 rounded-xl shadow-sm p-6 border border-slate-200 dark:border-navy-700">
            <div className="flex items-start justify-between mb-4">
              <h3 className="font-serif font-semibold text-lg text-navy-900 dark:text-white">Firm Profile</h3>
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">
                {firm?.logo ? '90% Complete' : '70% Complete'}
              </span>
            </div>
            
            <div className="flex items-center space-x-4 mb-4">
              {firm?.logo ? (
                <img src={firm.logo} alt="Firm Logo" className="w-16 h-16 rounded-full object-cover" />
              ) : (
                <div className="w-16 h-16 bg-slate-200 dark:bg-navy-600 rounded-full flex items-center justify-center">
                  <Building className="w-8 h-8 text-slate-400 dark:text-slate-300" />
                </div>
              )}
              <div>
                <h4 className="font-medium text-navy-900 dark:text-white">
                  {firm?.name || 'Complete Firm Profile'}
                </h4>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {firm?.city && firm?.state ? `${firm.city}, ${firm.state}` : 'Add location details'}
                </p>
              </div>
            </div>
            
            <Link to="/firm-profile">
              <Button variant="outline" className="w-full">
                <Building className="mr-2 h-4 w-4" />
                Edit Firm Profile
              </Button>
            </Link>
          </div>
          
          {/* Team Management Card */}
          <div className="bg-white dark:bg-navy-800 rounded-xl shadow-sm p-6 border border-slate-200 dark:border-navy-700">
            <div className="mb-4">
              <h3 className="font-serif font-semibold text-lg text-navy-900 dark:text-white">Team Management</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Manage your advisory team members
              </p>
            </div>
            
            <div className="flex justify-center my-4">
              <Users className="w-12 h-12 text-blue-500" />
            </div>
            
            <div className="space-y-2">
              <Link to="/team">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  View Team
                </Button>
              </Link>
              
              <Link to="/team/invite">
                <Button variant="outline" className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Invite Advisor
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Analytics Card */}
          <div className="bg-white dark:bg-navy-800 rounded-xl shadow-sm p-6 border border-slate-200 dark:border-navy-700">
            <div className="mb-4">
              <h3 className="font-serif font-semibold text-lg text-navy-900 dark:text-white">Firm Analytics</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Track performance and client metrics
              </p>
            </div>
            
            <div className="flex justify-center my-4">
              <BarChart3 className="w-12 h-12 text-purple-500" />
            </div>
            
            <Link to="/analytics">
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                View Analytics
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Compliance Banner - New Trust Element */}
        <div className="my-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <div className="flex items-center">
            <Shield className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-3" />
            <div>
              <h3 className="font-medium text-blue-800 dark:text-blue-300">Compliance Status: All Systems Active</h3>
              <p className="text-sm text-blue-600 dark:text-blue-400">Your firm is up to date with all regulatory requirements</p>
            </div>
            <Button className="ml-auto" variant="outline">Compliance Center</Button>
          </div>
        </div>
        
        {/* Metrics Dashboard */}
        <div className="mt-6">
          <FirmMetricsDashboard />
        </div>
      </DashboardLayout>
    </AuthGuard>
  );
};

export default FirmDashboard;
