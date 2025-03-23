
import React from 'react';
import AnimatedRoute from '../components/ui/AnimatedRoute';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import PageSEO from '../components/seo/PageSEO';
import { generateServiceSchema, generateFAQSchema, generateBreadcrumbSchema } from '../utils/schemas';

// Import our components
import BreadcrumbNav from '../components/navigation/BreadcrumbNav';
import HeroSection from '../components/advisors/HeroSection';
import BenefitsSection from '../components/advisors/BenefitsSection';
import FeaturesSection from '../components/advisors/FeaturesSection';
import FAQSection from '../components/advisors/FAQSection';
import CTASection from '../components/advisors/CTASection';

const ForAdvisors: React.FC = () => {
  // FAQs for this page
  const faqs = [
    {
      question: "How does AdvisorWiz help financial advisors grow their practice?",
      answer: "AdvisorWiz connects you with pre-qualified potential clients who are actively seeking financial guidance. Our matching algorithm ensures you connect with prospects who align with your expertise and practice style."
    },
    {
      question: "What does it cost to join AdvisorWiz as an advisor?",
      answer: "AdvisorWiz offers flexible pricing plans designed for advisors at every stage. Visit our pricing page for detailed information on our subscription options and features."
    },
    {
      question: "How are potential clients vetted before matching?",
      answer: "All potential clients complete a comprehensive profile detailing their financial situation, goals, and advisor preferences. Our platform verifies basic information and uses advanced algorithms to match clients with advisors who can best meet their needs."
    }
  ];
  
  // Breadcrumb data
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "For Advisors", url: "/for-advisors" }
  ];
  
  // Combined structured data
  const structuredData = [
    generateServiceSchema(),
    generateFAQSchema(faqs),
    generateBreadcrumbSchema(breadcrumbs)
  ];
  
  return (
    <AnimatedRoute animation="fade">
      <PageSEO 
        title="Grow Your Advisory Practice | Financial Advisor Platform"
        description="Connect with qualified clients and streamline your financial advisory practice with our advanced advisor-client matching platform. Join thousands of successful advisors."
        keywords="financial advisor platform, advisor growth, client acquisition, financial practice management, grow advisory business, find clients financial advisor"
        canonicalUrl="https://advisorwiz.com/for-advisors"
        structuredData={structuredData}
      />
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow pt-20">
          <BreadcrumbNav items={breadcrumbs} />
          <HeroSection />
          <BenefitsSection />
          <FeaturesSection />
          <FAQSection faqs={faqs} />
          <CTASection />
        </main>
        
        <Footer />
      </div>
    </AnimatedRoute>
  );
};

export default ForAdvisors;
