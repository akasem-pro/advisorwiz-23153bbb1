
import React from 'react';
import AnimatedRoute from '../components/ui/AnimatedRoute';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import PageSEO from '../components/seo/PageSEO';
import { generateServiceSchema, generateFAQSchema, generateBreadcrumbSchema } from '../utils/schemas';

// Import our new components
import BreadcrumbNav from '../components/firms/BreadcrumbNav';
import HeroSection from '../components/firms/HeroSection';
import BenefitsSection from '../components/firms/BenefitsSection';
import HowItWorksSection from '../components/firms/HowItWorksSection';
import FAQSection from '../components/firms/FAQSection';
import CTASection from '../components/firms/CTASection';

const ForFirms: React.FC = () => {
  // FAQs for this page
  const faqs = [
    {
      question: "How does AdvisorWiz help financial firms manage their advisors?",
      answer: "AdvisorWiz provides a centralized dashboard where firms can manage multiple advisor profiles, assign clients based on expertise, and track performance metrics for their entire team."
    },
    {
      question: "What features does AdvisorWiz offer specifically for financial firms?",
      answer: "AdvisorWiz offers firms features like team collaboration tools, client allocation systems, centralized profile management, performance analytics, and compliance monitoring for their advisory teams."
    },
    {
      question: "Is there special pricing for firms with multiple advisors?",
      answer: "Yes, AdvisorWiz offers special enterprise pricing for firms with multiple advisors. Contact our sales team for customized solutions based on your firm's specific needs and team size."
    }
  ];
  
  // Breadcrumb data
  const breadcrumbs = [
    { name: "Home", url: "https://advisorwiz.com/" },
    { name: "For Firms", url: "https://advisorwiz.com/for-firms" }
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
        title="Financial Advisory Firm Solutions | AdvisorWiz"
        description="Empower your financial advisory firm with tools to manage multiple advisors, streamline client matching, and grow your business with our comprehensive platform."
        keywords="financial advisory firm, wealth management firm, advisory firm solutions, financial practice management, advisor team management"
        canonicalUrl="https://advisorwiz.com/for-firms"
        structuredData={structuredData}
      />
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow pt-20">
          <BreadcrumbNav items={breadcrumbs} />
          <HeroSection />
          <BenefitsSection />
          <HowItWorksSection />
          <FAQSection faqs={faqs} />
          <CTASection />
        </main>
        
        <Footer />
      </div>
    </AnimatedRoute>
  );
};

export default ForFirms;
