
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { initializeTagManager, trackPageView } from '../utils/tagManager';
import AnimatedRoute from '../components/ui/AnimatedRoute';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const IndexPage: React.FC = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    // Initialize tag manager and track page view
    initializeTagManager();
    trackPageView('Home Page');
  }, []);

  return (
    <AnimatedRoute animation="fade">
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow pt-20">
          <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold text-center">Welcome to AdvisorWiz</h1>
            <p className="text-center mt-4">
              Find your perfect financial advisor match.
            </p>
            <div className="flex justify-center mt-8">
              <button
                onClick={() => navigate('/onboarding')}
                className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
              >
                Get Started
              </button>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </AnimatedRoute>
  );
};

export default IndexPage;
