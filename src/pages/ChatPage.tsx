
import React, { useEffect } from 'react';
import { initializeTagManager, trackPageView } from '../utils/tagManager';
import AnimatedRoute from '../components/ui/AnimatedRoute';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const ChatPage: React.FC = () => {
  useEffect(() => {
    // Initialize tag manager and track page view
    initializeTagManager();
    trackPageView('Chat Page');
  }, []);

  return (
    <AnimatedRoute animation="fade">
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow pt-20">
          <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold">Chat</h1>
            <p className="mt-4">Connect with financial advisors through our secure messaging platform.</p>
            <div className="mt-8 bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4 border-b">
                <h2 className="font-semibold">Chat Messages</h2>
              </div>
              <div className="h-96 p-4 bg-gray-50">
                <p className="text-center text-gray-500">No messages yet</p>
              </div>
              <div className="p-4 border-t">
                <div className="flex">
                  <input 
                    type="text" 
                    className="flex-1 rounded-l-md border-r-0 focus:ring-blue-500 focus:border-blue-500" 
                    placeholder="Type a message..." 
                  />
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition-colors">
                    Send
                  </button>
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

export default ChatPage;
