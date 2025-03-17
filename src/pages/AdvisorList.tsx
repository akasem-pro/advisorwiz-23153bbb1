
import React, { useEffect } from 'react';
import { initializeTagManager, trackPageView } from '../utils/tagManager';
import AnimatedRoute from '../components/ui/AnimatedRoute';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const AdvisorList: React.FC = () => {
  useEffect(() => {
    // Initialize tag manager and track page view
    initializeTagManager();
    trackPageView('Advisor List Page');
  }, []);

  return (
    <AnimatedRoute animation="fade">
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow pt-20">
          <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold">Financial Advisors</h1>
            <p className="mt-4">Browse our list of qualified financial advisors.</p>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Placeholder for advisor cards */}
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white p-6 rounded-lg shadow-md">
                  <div className="h-12 w-12 bg-blue-100 rounded-full mb-4"></div>
                  <h3 className="text-lg font-semibold">Advisor {i}</h3>
                  <p className="text-sm text-gray-600 mt-2">Financial planning specialist with expertise in retirement planning.</p>
                </div>
              ))}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </AnimatedRoute>
  );
};

export default AdvisorList;
