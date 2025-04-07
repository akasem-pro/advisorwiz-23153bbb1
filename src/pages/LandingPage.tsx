
import React, { useEffect } from 'react';
import AppLayout from '../components/layout/AppLayout';
import HeroSection from '../components/home/HeroSection';
import HowItWorksSection from '../components/home/HowItWorksSection';
import BenefitsSection from '../components/home/BenefitsSection';
import MainCTASection from '../components/home/MainCTASection';
import FAQSection from '../components/home/FAQSection';

const LandingPage: React.FC = () => {
  console.log("Rendering LandingPage component");
  
  useEffect(() => {
    // Additional logging to debug rendering
    console.log("LandingPage mounted");
    return () => console.log("LandingPage unmounted");
  }, []);
  
  return (
    <AppLayout
      fullWidth={true}
      className="landing-page-layout min-h-screen"
      contentClassName="p-0"
      headerProps={{ transparent: true }}
      hideFooter={false}
    >
      <main className="landing-page">
        <HeroSection />
        <HowItWorksSection />
        <BenefitsSection />
        <MainCTASection />
        <FAQSection />
      </main>
    </AppLayout>
  );
};

export default LandingPage;
