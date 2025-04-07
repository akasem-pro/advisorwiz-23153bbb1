
import React, { useEffect } from 'react';
import AppLayout from '../components/layout/AppLayout';
import HeroSection from '../components/home/HeroSection';
import HowItWorksSection from '../components/home/HowItWorksSection';
import BenefitsSection from '../components/home/BenefitsSection';
import MainCTASection from '../components/home/MainCTASection';
import FAQSection from '../components/home/FAQSection';

const LandingPage: React.FC = () => {
  console.log("LandingPage component rendering");
  
  useEffect(() => {
    console.log("LandingPage mounted");
    return () => console.log("LandingPage unmounted");
  }, []);
  
  return (
    <AppLayout
      fullWidth={false}
      className="landing-page-layout"
      contentClassName="p-0"
      headerProps={{ transparent: false }}
      hideFooter={false}
      withoutPadding={true}
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
