
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import AnimatedRoute from '../ui/AnimatedRoute';
import SocialProofBar from '../ui/SocialProofBar';
import FloatingSupportButton from '../support/FloatingSupportButton';
import TrustBadges from '../ui/TrustBadges';

interface AppLayoutProps {
  children: React.ReactNode;
  hideSocialProof?: boolean;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children, hideSocialProof = false }) => {
  return (
    <AnimatedRoute animation="fade">
      <div className="min-h-screen flex flex-col">
        <Header />
        {!hideSocialProof && <SocialProofBar />}
        <main className="flex-grow pt-20">
          {children}
          <div className="container mx-auto px-4 my-8">
            <TrustBadges className="justify-center" />
          </div>
        </main>
        <FloatingSupportButton />
        <Footer />
      </div>
    </AnimatedRoute>
  );
};

export default AppLayout;
