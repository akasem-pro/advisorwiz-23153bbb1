
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { Button } from '../ui/button';
import { toast } from 'sonner';

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
  
  const handleCTAClick = () => {
    toast.success("Great choice!", {
      description: userType === 'consumer' 
        ? "Let's find the perfect advisor for you." 
        : userType === 'advisor'
        ? "We're excited to have you join our platform."
        : "We'll be in touch shortly to schedule your demo."
    });
    navigate(getDestination());
  };
  
  const benefits = userType === 'consumer' 
    ? ['Personalized advisor matching', 'No-pressure introductions', 'Transparent advisor information'] 
    : userType === 'advisor'
    ? ['Qualified lead generation', 'Automated scheduling', 'Client relationship tools']
    : ['Enterprise dashboard', 'Team management features', 'Bulk client processing'];
  
  return (
    <div className="text-center mt-16 max-w-2xl mx-auto">
      <h3 className="text-2xl font-serif font-bold text-navy-900 dark:text-white mb-4">
        Ready to Take the Next Step?
      </h3>
      <p className="text-slate-700 dark:text-slate-300 mb-6">
        {userType === 'consumer' 
          ? 'Start your journey to finding the right financial advisor today.' 
          : userType === 'advisor'
          ? 'Join thousands of successful advisors growing their practice with AdvisorWiz.'
          : 'Transform how your firm connects with clients and manages advisors.'}
      </p>
      
      <div className="bg-slate-50 dark:bg-navy-800/50 p-6 rounded-lg mb-8">
        <ul className="text-left mb-6 space-y-2">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-5 w-5 text-teal-500 mt-0.5 mr-2 flex-shrink-0" />
              <span className="text-slate-700 dark:text-slate-300">{benefit}</span>
            </li>
          ))}
        </ul>
        
        <Button 
          size="lg"
          onClick={handleCTAClick}
          className="bg-teal-600 hover:bg-teal-700 dark:bg-teal-600 dark:hover:bg-teal-700 text-white px-8 py-6 h-auto text-lg w-full sm:w-auto group"
        >
          {getCtaText()} <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
      
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Questions? <a href="/contact" className="text-teal-600 hover:underline">Contact our support team</a>
      </p>
    </div>
  );
};

export default PricingCTA;
