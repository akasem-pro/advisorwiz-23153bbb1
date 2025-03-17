
import React, { useEffect } from 'react';
import { initializeTagManager, trackPageView } from '../utils/tagManager';
import AnimatedRoute from '../components/ui/AnimatedRoute';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const SchedulerPage: React.FC = () => {
  useEffect(() => {
    // Initialize tag manager and track page view
    initializeTagManager();
    trackPageView('Scheduler Page');
  }, []);

  return (
    <AnimatedRoute animation="fade">
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow pt-20">
          <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold">Appointment Scheduler</h1>
            <p className="mt-4">Schedule meetings with financial advisors at your convenience.</p>
            <div className="mt-8 bg-white rounded-lg shadow-md p-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h2 className="text-xl font-semibold mb-4">Calendar</h2>
                  <div className="bg-gray-100 p-4 rounded-md h-80">
                    {/* Calendar placeholder */}
                    <p className="text-center text-gray-500">Calendar will appear here</p>
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-4">Available Slots</h2>
                  <div className="space-y-2">
                    {/* Time slot placeholders */}
                    {[9, 10, 11, 13, 14, 15, 16].map((hour) => (
                      <button 
                        key={hour} 
                        className="w-full py-2 px-4 border rounded-md hover:bg-blue-50 hover:border-blue-500 transition-colors"
                      >
                        {hour}:00 {hour < 12 ? 'AM' : 'PM'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </AnimatedRoute>
  );
};

export default SchedulerPage;
