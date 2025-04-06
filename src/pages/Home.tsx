
import React from 'react';
import AppLayout from '../components/layout/AppLayout';
import HeroSection from '../components/home/HeroSection';
import BenefitsSection from '../components/home/BenefitsSection';
import HowItWorksSection from '../components/home/HowItWorksSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import MainCTASection from '../components/home/MainCTASection';

const Home: React.FC = () => {
  return (
    <AppLayout>
      <div className="overflow-hidden">
        <HeroSection />
        <BenefitsSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <MainCTASection />
      </div>
    </AppLayout>
  );
};

export default Home;
