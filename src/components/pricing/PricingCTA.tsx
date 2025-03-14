
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';

interface PricingCTAProps {
  userType: 'consumer' | 'advisor' | 'enterprise';
}

const PricingCTA: React.FC<PricingCTAProps> = ({ userType }) => {
  const navigate = useNavigate();
  
  const getCTAContent = () => {
    switch (userType) {
      case 'consumer':
        return {
          heading: "Ready to Find Your Financial Advisor?",
          subheading: "Get matched with professionals who understand your unique needs.",
          buttonText: "Find My Advisor",
          buttonAction: () => navigate('/onboarding')
        };
      case 'advisor':
        return {
          heading: "Ready to Grow Your Practice?",
          subheading: "Start connecting with qualified prospects today.",
          buttonText: "Join as an Advisor",
          buttonAction: () => navigate('/onboarding')
        };
      case 'enterprise':
        return {
          heading: "Ready to Scale Your Firm?",
          subheading: "Get in touch with our enterprise team for a customized solution.",
          buttonText: "Contact Sales",
          buttonAction: () => navigate('/contact-us')
        };
    }
  };
  
  const ctaContent = getCTAContent();
  
  return (
    <div className="bg-navy-50 rounded-xl p-8 text-center my-12">
      <h3 className="text-2xl font-serif font-bold text-navy-900 mb-3">
        {ctaContent.heading}
      </h3>
      <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
        {ctaContent.subheading}
      </p>
      <Button 
        onClick={ctaContent.buttonAction}
        className={`${userType === 'consumer' ? 'bg-teal-600 hover:bg-teal-700' : 
                     userType === 'advisor' ? 'bg-navy-600 hover:bg-navy-700' : 
                     'bg-purple-600 hover:bg-purple-700'}`}
        size="lg"
      >
        {ctaContent.buttonText}
        <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </div>
  );
};

export default PricingCTA;
