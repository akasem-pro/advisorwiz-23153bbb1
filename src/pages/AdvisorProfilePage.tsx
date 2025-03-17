
import React, { useEffect } from 'react';
import { initializeTagManager, trackPageView } from '../utils/tagManager';
import AnimatedRoute from '../components/ui/AnimatedRoute';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const AdvisorProfilePage: React.FC = () => {
  useEffect(() => {
    // Initialize tag manager and track page view
    initializeTagManager();
    trackPageView('Advisor Profile Page');
  }, []);

  return (
    <AnimatedRoute animation="fade">
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow pt-20">
          <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold">Advisor Profile</h1>
            <p className="mt-4">Manage your advisor profile and services here.</p>
          </div>
        </main>

        <Footer />
      </div>
    </AnimatedRoute>
  );
};

export default AdvisorProfilePage;
