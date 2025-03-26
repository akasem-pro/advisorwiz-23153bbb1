
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import AnimatedRoute from '../ui/AnimatedRoute';
import SocialProofBar from '../ui/SocialProofBar';
import FloatingSupportButton from '../support/FloatingSupportButton';
import TrustBadges from '../ui/TrustBadges';
import { cn } from '@/lib/utils';

interface AppLayoutProps {
  children: React.ReactNode;
  hideSocialProof?: boolean;
  fullWidth?: boolean;
  className?: string;
  showTrustBadges?: boolean;
}

const AppLayout: React.FC<AppLayoutProps> = ({ 
  children, 
  hideSocialProof = false,
  fullWidth = false,
  className = '',
  showTrustBadges = true
}) => {
  return (
    <AnimatedRoute animation="fade">
      <div className={cn(
        "min-h-screen flex flex-col bg-slate-50 dark:bg-navy-950 text-navy-900 dark:text-slate-100",
        className
      )}>
        <Header />
        {!hideSocialProof && <SocialProofBar />}
        
        <main className="flex-grow pt-28 md:pt-32">
          {children}
          
          {showTrustBadges && (
            <div className={cn(
              fullWidth ? 'w-full px-4' : 'container mx-auto px-4',
              'my-8'
            )}>
              <TrustBadges className="justify-center" />
            </div>
          )}
        </main>
        
        <FloatingSupportButton />
        <Footer />
      </div>
    </AnimatedRoute>
  );
};

export default AppLayout;
