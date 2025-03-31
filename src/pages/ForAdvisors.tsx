
import React from 'react';
import AppLayout from '../components/layout/AppLayout';
import BreadcrumbNav from '../components/navigation/BreadcrumbNav';
import BenefitsSection from '../components/advisors/BenefitsSection';
import FeaturesSection from '../components/advisors/FeaturesSection'; 
import HeroSection from '../components/advisors/HeroSection';
import PageFAQ from '../components/shared/PageFAQ';
import PageCTA from '../components/shared/PageCTA';
import ShareAndDownloadSection from '../components/marketing/ShareAndDownloadSection';
import FAQSection from '../components/advisors/FAQSection';

const ForAdvisors: React.FC = () => {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Advisors', url: '/for-advisors' }
  ];

  // FAQs for advisors
  const faqs = [
    {
      question: "How do I sign up as a financial advisor?",
      answer: "To join our platform, click the 'Sign In' button in the header, then select 'Create an Account' and choose 'Advisor' as your account type. Once registered, you'll complete a profile with your professional information."
    },
    {
      question: "What types of advisors can join the platform?",
      answer: "We welcome a wide range of financial professionals including CFPs, investment advisors, insurance specialists, tax professionals, estate planners, and wealth managers. All advisors must meet our verification standards."
    },
    {
      question: "Is there a fee to join?",
      answer: "We offer several flexible pricing options including a basic free tier with limited features, and premium subscription tiers with advanced functionality. Visit our Pricing page for detailed information."
    },
    {
      question: "How does the matching process work?",
      answer: "Our proprietary algorithm matches advisors with potential clients based on expertise, location, specialty, and client needs. The more complete your profile, the better your matching results will be."
    },
    {
      question: "Can I manage my availability on the platform?",
      answer: "Yes, our platform includes a comprehensive scheduling system where you can set your availability, block off time, and manage appointment requests from potential clients."
    }
  ];

  console.log("Rendering ForAdvisors page");

  return (
    <AppLayout showTrustBadges={true} animation="none" contentClassName="p-0">
      <div className="w-full">
        <BreadcrumbNav items={breadcrumbs} />
        
        <HeroSection />
        
        <BenefitsSection />
        
        <FeaturesSection />
        
        <ShareAndDownloadSection variant="minimal" />
        
        <FAQSection faqs={faqs} />
        
        <PageCTA
          title="Ready to Grow Your Advisory Practice?"
          description="Join thousands of advisors who are expanding their client base through our platform."
          buttonText="Get Started Now"
          buttonLink="/contact"
        />
      </div>
    </AppLayout>
  );
};

export default ForAdvisors;
