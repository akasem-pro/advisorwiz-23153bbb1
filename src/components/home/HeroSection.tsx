
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Search } from 'lucide-react';
import ConsistentButton from '../ui/design-system/ConsistentButton';
import HeroStatistics from './hero/HeroStatistics';
import Heading from '../ui/design-system/Heading';
import TooltipHelper from '../ui/TooltipHelper';
import { useIsMobile } from '../../hooks/use-mobile';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white dark:from-navy-950 dark:via-navy-900 dark:to-navy-900 pt-6 pb-8 sm:pb-12">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Hero Content */}
        <div className="text-center max-w-4xl mx-auto pt-6 pb-8">
          <Heading 
            level={1} 
            variant="serif" 
            size={isMobile ? "3xl" : "4xl"}
            className="mb-4 animate-fade-in leading-tight"
          >
            Find the Perfect Financial Advisor for Your Needs
          </Heading>
          
          <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 mb-6 animate-fade-in max-w-2xl mx-auto" style={{animationDelay: '0.1s'}}>
            Connect with qualified financial advisors who understand your unique
            financial situation and help you achieve your goals.
          </p>
          
          <div className={`flex ${isMobile ? 'flex-col' : 'sm:flex-row'} justify-center gap-4 animate-fade-in`} style={{animationDelay: '0.2s'}}>
            <ConsistentButton 
              variant="primary" 
              size={isMobile ? "md" : "lg"}
              onClick={() => navigate('/match')}
              icon={<Search className="h-4 w-4" />}
              className="w-full sm:w-auto shadow-md hover:shadow-lg transition-all"
            >
              Find Your Advisor
            </ConsistentButton>
            
            <ConsistentButton 
              variant="outline" 
              size={isMobile ? "md" : "lg"}
              onClick={() => navigate('/for-advisors')}
              icon={<ArrowRight className="h-4 w-4" />}
              iconPosition="right"
              className="w-full sm:w-auto mt-2 sm:mt-0"
            >
              For Advisors
            </ConsistentButton>
          </div>
        </div>
        
        {/* Statistics Bar - Hide on mobile */}
        {!isMobile && <HeroStatistics className="mt-4 animate-fade-in" style={{animationDelay: '0.4s'}} />}
      </div>
      
      {/* Background Elements - More subtle and modern */}
      <div className="absolute top-0 inset-x-0 h-48 bg-gradient-to-br from-teal-50/20 to-navy-50/20 dark:from-teal-900/5 dark:to-navy-800/5 -z-10"></div>
      
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200/70 dark:via-navy-700/50 to-transparent"></div>
    </div>
  );
};

export default HeroSection;
