
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { initializeTagManager, trackPageView } from '../utils/tagManager';
import AnimatedRoute from '../components/ui/AnimatedRoute';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const CallPage: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  
  useEffect(() => {
    // Initialize tag manager and track page view
    initializeTagManager();
    trackPageView(`Call Page - Room ${roomId}`);
  }, [roomId]);

  return (
    <AnimatedRoute animation="fade">
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow pt-20">
          <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold">Video Call</h1>
            <p className="mt-4">Room ID: {roomId}</p>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div className="bg-gray-900 rounded-lg overflow-hidden aspect-video">
                <div className="h-full flex items-center justify-center">
                  <p className="text-white">Your video</p>
                </div>
              </div>
              <div className="bg-gray-900 rounded-lg overflow-hidden aspect-video">
                <div className="h-full flex items-center justify-center">
                  <p className="text-white">Remote video</p>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-center space-x-4">
              <button className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors">
                <span className="sr-only">End Call</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <button className="p-3 bg-gray-700 text-white rounded-full hover:bg-gray-800 transition-colors">
                <span className="sr-only">Toggle Microphone</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </button>
              <button className="p-3 bg-gray-700 text-white rounded-full hover:bg-gray-800 transition-colors">
                <span className="sr-only">Toggle Video</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </AnimatedRoute>
  );
};

export default CallPage;
