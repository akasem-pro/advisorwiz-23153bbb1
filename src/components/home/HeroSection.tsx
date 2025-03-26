
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Search, ShieldCheck, Users } from 'lucide-react';
import ConsistentButton from '../ui/design-system/ConsistentButton';
import HeroStatistics from './hero/HeroStatistics';
import Heading from '../ui/design-system/Heading';
import TooltipHelper from '../ui/TooltipHelper';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white dark:from-navy-950 dark:to-navy-900 pt-10 pb-16 sm:pb-20 lg:pb-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Hero Content */}
        <div className="text-center max-w-4xl mx-auto pt-10 pb-12">
          <Heading 
            level={1} 
            variant="serif" 
            size="4xl"
            className="mb-6 animate-fade-in"
          >
            Find Your Ideal Financial Advisor Match
          </Heading>
          
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-8 animate-fade-in" style={{animationDelay: '0.1s'}}>
            Personalized connections with qualified financial advisors who understand 
            your unique needs and goals. Start your journey to financial well-being today.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in" style={{animationDelay: '0.2s'}}>
            <ConsistentButton 
              variant="primary" 
              size="lg"
              onClick={() => navigate('/match')}
              icon={<Search className="h-5 w-5" />}
            >
              Find My Advisor Match
            </ConsistentButton>
            
            <ConsistentButton 
              variant="outline" 
              size="lg"
              onClick={() => navigate('/for-advisors')}
              icon={<ArrowRight className="h-5 w-5" />}
              iconPosition="right"
            >
              Advisor Sign Up
            </ConsistentButton>
          </div>
          
          {/* Trust badges */}
          <div className="mt-10 flex flex-wrap justify-center gap-8 animate-fade-in" style={{animationDelay: '0.3s'}}>
            <div className="flex items-center text-navy-700 dark:text-slate-300">
              <ShieldCheck className="h-5 w-5 mr-2 text-teal-600 dark:text-teal-400" />
              <span className="text-sm md:text-base">Bank-Level Security</span>
              <TooltipHelper 
                title="Secure Data" 
                content="Your financial information is protected with bank-level encryption and security measures"
                className="ml-1"
              />
            </div>
            
            <div className="flex items-center text-navy-700 dark:text-slate-300">
              <Users className="h-5 w-5 mr-2 text-teal-600 dark:text-teal-400" />
              <span className="text-sm md:text-base">500+ Verified Advisors</span>
            </div>
          </div>
        </div>
        
        {/* Statistics Bar */}
        <HeroStatistics className="mt-12" />
      </div>
      
      {/* Background Elements */}
      <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-br from-teal-50/30 to-navy-50/30 dark:from-teal-900/10 dark:to-navy-800/10 -z-10"></div>
      
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-navy-700 to-transparent"></div>
    </div>
  );
};

export default HeroSection;
