
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { initializeTagManager, trackPageView } from '../utils/tagManager';
import AppLayout from '../components/layout/AppLayout';
import { Button } from '@/components/ui/button';

const IndexPage: React.FC = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    // Initialize tag manager and track page view
    initializeTagManager();
    trackPageView('Home Page');
  }, []);

  return (
    <AppLayout animation="fade" pageTitle="AdvisorWiz - Find Your Perfect Financial Advisor">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-navy-900 mb-6">
            Find Your Perfect Financial Advisor Match
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
            Connect with qualified financial advisors that match your specific needs and goals. Our intelligent matching platform makes finding the right advisor simple and seamless.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-teal-600 hover:bg-teal-700 text-white font-medium px-8 py-3"
              onClick={() => navigate('/onboarding')}
            >
              Get Started
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-navy-700 text-navy-700 hover:bg-navy-50"
              onClick={() => navigate('/advisors')}
            >
              Browse Advisors
            </Button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default IndexPage;
