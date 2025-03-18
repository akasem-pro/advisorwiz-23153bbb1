
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';

interface PricingCTAProps {
  userType: 'consumer' | 'advisor' | 'enterprise';
}

const PricingCTA: React.FC<PricingCTAProps> = ({ userType }) => {
  const navigate = useNavigate();
  
  const getCtaText = () => {
    switch (userType) {
      case 'consumer': return 'Find Your Advisor';
      case 'advisor': return 'Join as an Advisor';
      case 'enterprise': return 'Schedule a Demo';
      default: return 'Get Started';
    }
  };
  
  const getDestination = () => {
    switch (userType) {
      case 'enterprise': return '/contact';
      default: return '/onboarding';
    }
  };
  
  return (
    <div className="text-center mt-16 max-w-2xl mx-auto">
      <h3 className="text-2xl font-serif font-bold text-navy-900 dark:text-white mb-4">
        Ready to Take the Next Step?
      </h3>
      <p className="text-slate-700 dark:text-slate-200 mb-6">
        {userType === 'consumer' 
          ? 'Start your journey to finding the right financial advisor today.' 
          : userType === 'advisor'
          ? 'Join thousands of successful advisors growing their practice with AdvisorWiz.'
          : 'Transform how your firm connects with clients and manages advisors.'}
      </p>
      <Button 
        size="lg"
        onClick={() => navigate(getDestination())}
        className="bg-teal-600 hover:bg-teal-700 dark:bg-teal-600 dark:hover:bg-teal-700"
      >
        {getCtaText()} <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </div>
  );
};

export default PricingCTA;
