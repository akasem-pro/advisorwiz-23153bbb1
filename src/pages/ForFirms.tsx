
import React from 'react';
import AnimatedRoute from '../components/ui/AnimatedRoute';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import HeroSection from '../components/firms/HeroSection';
import BenefitsSection from '../components/firms/BenefitsSection';
import HowItWorksSection from '../components/firms/HowItWorksSection';
import CTASection from '../components/firms/CTASection';
import FAQSection from '../components/firms/FAQSection';
import BreadcrumbNav from '../components/firms/BreadcrumbNav';

const ForFirms: React.FC = () => {
  return (
    <AnimatedRoute animation="fade">
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow pt-20">
          <BreadcrumbNav 
            items={[
              { name: 'Home', url: '/' },
              { name: 'For Financial Firms', url: '/for-firms' }
            ]} 
          />
          
          <HeroSection />
          <BenefitsSection />
          <HowItWorksSection />
          <FAQSection 
            faqs={[
              {
                question: "How does AdvisorWiz help my firm manage advisors?",
                answer: "AdvisorWiz provides a central dashboard for firm administrators to manage all advisor profiles, monitor client interactions, and track performance metrics. Our platform makes it easy to assign leads to the right advisors and maintain regulatory compliance."
              },
              {
                question: "Can I customize the platform to match my firm's branding?",
                answer: "Yes, enterprise accounts include white-labeling options that allow you to customize the interface with your firm's logo, colors, and branding elements. This creates a seamless experience for both your advisors and clients."
              },
              {
                question: "How secure is my firm's and clients' data on AdvisorWiz?",
                answer: "We implement bank-level security measures including end-to-end encryption, regular security audits, and strict access controls. We're compliant with financial industry regulations and never share your data with third parties without explicit permission."
              },
              {
                question: "Can I integrate AdvisorWiz with our existing CRM or financial planning software?",
                answer: "Yes, AdvisorWiz offers API integrations with popular CRM platforms, financial planning software, and portfolio management tools. Our team can work with you to ensure smooth data flow between all your systems."
              },
              {
                question: "How does pricing work for firms with multiple advisors?",
                answer: "We offer tiered pricing for firms based on the number of advisors. Enterprise plans include volume discounts, dedicated support, and additional features like advanced analytics and compliance tools. Contact us for a custom quote."
              }
            ]} 
          />
          <CTASection />
        </main>
        
        <Footer />
      </div>
    </AnimatedRoute>
  );
};

export default ForFirms;
