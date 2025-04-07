
import React from 'react';
import AppLayout from '../components/layout/AppLayout';
import HeroSection from '../components/home/HeroSection';
import HowItWorksSection from '../components/home/HowItWorksSection';
import BenefitsSection from '../components/home/BenefitsSection';
import MainCTASection from '../components/home/MainCTASection';
import FAQSection from '../components/home/FAQSection';

const LandingPage: React.FC = () => {
  console.log("Rendering LandingPage component");
  
  return (
    <AppLayout
      fullWidth={true}
      className="landing-page-layout"
      contentClassName="p-0"
      headerProps={{ transparent: true }}
      hideFooter={false}
    >
      <div className="landing-page">
        <HeroSection />
        <HowItWorksSection />
        <BenefitsSection />
        <MainCTASection />
        <FAQSection />
      </div>
    </AppLayout>
  );
};

export default LandingPage;
