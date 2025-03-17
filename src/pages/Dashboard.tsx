
import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import AnimatedRoute from '../components/ui/AnimatedRoute';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import AdvisorPerformanceDashboard from '../components/dashboard/AdvisorPerformanceDashboard';
import FirmManagementDashboard from '../components/dashboard/FirmManagementDashboard';
import { initializeTagManager, trackPageView } from '../utils/tagManager';

const Dashboard: React.FC = () => {
  const { userType, isAuthenticated, advisorProfile, getFirmByAdmin } = useUser();
  const [isDashboardReady, setIsDashboardReady] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Initialize tag manager
    initializeTagManager();
    trackPageView('Performance Dashboard');
    
    // Redirect if not authenticated
    if (!isAuthenticated) {
      navigate('/');
      return;
    }
    
    // Allow dashboard to initialize
    const timer = setTimeout(() => {
      setIsDashboardReady(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }
  
  // Get firm for firm admin
  const adminId = advisorProfile?.id || '';
  const userFirms = getFirmByAdmin(adminId);
  const activeFirm = userFirms.length > 0 ? userFirms[0] : null;
  
  return (
    <AnimatedRoute animation="fade">
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Header />
        
        <main className="flex-grow pt-20">
          <div className="container mx-auto px-4 py-8 max-w-screen-xl">
            <div className="mb-6">
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-navy-900 mb-2">
                Performance Dashboard
              </h1>
              <p className="text-slate-600 max-w-2xl">
                Track your performance metrics, analyze lead engagement, and optimize your advisor profile.
              </p>
            </div>
            
            {!isDashboardReady ? (
              <div className="flex justify-center items-center h-96">
                <div className="animate-pulse text-slate-400">Loading dashboard data...</div>
              </div>
            ) : (
              <>
                {userType === 'firm_admin' && activeFirm ? (
                  <FirmManagementDashboard firm={activeFirm} />
                ) : (
                  <AdvisorPerformanceDashboard />
                )}
              </>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </AnimatedRoute>
  );
};

export default Dashboard;
