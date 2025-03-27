
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Search, ShieldCheck, Users } from 'lucide-react';
import ConsistentButton from '../ui/design-system/ConsistentButton';
import HeroStatistics from './hero/HeroStatistics';
import Heading from '../ui/design-system/Heading';
import TooltipHelper from '../ui/TooltipHelper';
import { useIsMobile } from '../../hooks/use-mobile';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white dark:from-navy-950 dark:to-navy-900 pt-0 pb-4 sm:pb-8">
      <div className="container mx-auto px-3 sm:px-4 relative z-10">
        {/* Hero Content */}
        <div className="text-center max-w-4xl mx-auto pt-2 pb-4">
          <Heading 
            level={1} 
            variant="serif" 
            size={isMobile ? "3xl" : "4xl"}
            className="mb-3 animate-fade-in"
          >
            Find Your Perfect Financial Match
          </Heading>
          
          <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 mb-4 animate-fade-in" style={{animationDelay: '0.1s'}}>
            Personalized connections with qualified financial advisors who understand 
            your unique needs and goals.
          </p>
          
          <div className={`flex ${isMobile ? 'flex-col' : 'sm:flex-row'} justify-center gap-3 animate-fade-in`} style={{animationDelay: '0.2s'}}>
            <ConsistentButton 
              variant="primary" 
              size={isMobile ? "md" : "lg"}
              onClick={() => navigate('/match')}
              icon={<Search className="h-4 w-4" />}
              className="w-full sm:w-auto"
            >
              Find My Advisor Match
            </ConsistentButton>
            
            <ConsistentButton 
              variant="outline" 
              size={isMobile ? "md" : "lg"}
              onClick={() => navigate('/for-advisors')}
              icon={<ArrowRight className="h-4 w-4" />}
              iconPosition="right"
              className="w-full sm:w-auto mt-2 sm:mt-0"
            >
              Advisor Sign Up
            </ConsistentButton>
          </div>
          
          {/* Trust badges */}
          <div className="mt-4 flex flex-wrap justify-center gap-4 animate-fade-in" style={{animationDelay: '0.3s'}}>
            <div className="flex items-center text-navy-700 dark:text-slate-300">
              <ShieldCheck className="h-4 w-4 mr-1 text-teal-600 dark:text-teal-400" />
              <span className="text-xs md:text-sm">Bank-Level Security</span>
              <TooltipHelper 
                title="Secure Data" 
                content="Your financial information is protected with bank-level encryption and security measures"
                className="ml-1"
              />
            </div>
            
            <div className="flex items-center text-navy-700 dark:text-slate-300">
              <Users className="h-4 w-4 mr-1 text-teal-600 dark:text-teal-400" />
              <span className="text-xs md:text-sm">500+ Verified Advisors</span>
            </div>
          </div>
        </div>
        
        {/* Statistics Bar - Hide on mobile */}
        {!isMobile && <HeroStatistics className="mt-3" />}
      </div>
      
      {/* Background Elements */}
      <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-br from-teal-50/30 to-navy-50/30 dark:from-teal-900/10 dark:to-navy-800/10 -z-10"></div>
      
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-navy-700 to-transparent"></div>
    </div>
  );
};

export default HeroSection;
