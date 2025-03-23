
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { Button } from '../components/ui/button';
import AdvisorList from '../components/home/AdvisorList';
import { useAuth } from '../features/auth/context/AuthProvider';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { userType } = useUser();
  const { user } = useAuth();
  
  const handleFindAdvisor = () => {
    navigate('/find-advisor');
  };
  
  const handleGetStarted = () => {
    navigate('/onboarding');
  };
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-navy-900 mb-6">
          Find Your Perfect Financial Advisor Match
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8">
          Connect with qualified financial advisors that match your specific needs and preferences.
        </p>
        
        {!user ? (
          <Button 
            onClick={handleGetStarted} 
            className="text-lg bg-teal-600 hover:bg-teal-700 text-white h-12 px-8"
          >
            Get Started
          </Button>
        ) : userType === 'consumer' ? (
          <Button 
            onClick={handleFindAdvisor} 
            className="text-lg bg-teal-600 hover:bg-teal-700 text-white h-12 px-8"
          >
            Find My Advisor Match
          </Button>
        ) : null}
      </div>
      
      <div className="mb-16">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-bold text-navy-800">Featured Advisors</h2>
            <p className="text-slate-600">Connect with top-rated financial professionals</p>
          </div>
          
          <Button 
            variant="link" 
            onClick={handleFindAdvisor} 
            className="text-teal-600 hover:text-teal-700"
          >
            View all
          </Button>
        </div>
        
        <AdvisorList />
      </div>
      
      <div className="bg-navy-50 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold text-navy-800 mb-4">
          Ready to take control of your financial future?
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto mb-6">
          Our matching algorithm connects you with advisors who specialize in your specific needs.
        </p>
        
        <Button 
          onClick={user ? handleFindAdvisor : handleGetStarted}
          className="bg-navy-600 hover:bg-navy-700 text-white"
        >
          {user ? 'Find My Advisor Match' : 'Create Free Account'}
        </Button>
      </div>
    </div>
  );
};

export default Home;
