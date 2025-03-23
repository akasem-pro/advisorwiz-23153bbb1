
import React from 'react';
import AppLayout from '../components/layout/AppLayout';
import HeroSection from '../components/home/HeroSection';
import BenefitsSection from '../components/home/BenefitsSection';
import HowItWorksSection from '../components/home/HowItWorksSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import FAQSection from '../components/home/FAQSection';
import PricingCTASection from '../components/home/PricingCTASection';
import MainCTASection from '../components/home/MainCTASection';
import { Helmet } from 'react-helmet';

const LandingPage: React.FC = () => {
  return (
    <AppLayout>
      <Helmet>
        <title>AdvisorWiz - Connecting Financial Advisors with Clients</title>
        <meta 
          name="description" 
          content="AdvisorWiz connects consumers with trusted financial advisors through an innovative matching platform." 
        />
      </Helmet>
      
      <HeroSection />
      <BenefitsSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <FAQSection />
      <PricingCTASection />
      <MainCTASection />
    </AppLayout>
  );
};

export default LandingPage;
