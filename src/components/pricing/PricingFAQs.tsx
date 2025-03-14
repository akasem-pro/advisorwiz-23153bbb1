
import React from 'react';
import FAQAccordion, { FAQItem } from '../shared/FAQAccordion';
import { useUser } from '../../context/UserContext';

// Separate FAQ data by user type
const consumerFaqs: FAQItem[] = [
  {
    question: "Is AdvisorWiz really free for consumers?",
    answer: "Yes, AdvisorWiz is completely free for consumers. We earn revenue from advisors and firms who subscribe to our platform, so we never charge consumers for our matching service."
  },
  {
    question: "How does AdvisorWiz find the right advisor for me?",
    answer: "We use a sophisticated matching algorithm that considers your financial goals, investment preferences, communication style, and other factors to connect you with advisors who are best equipped to help you achieve your objectives."
  },
  {
    question: "Are the financial advisors on AdvisorWiz vetted?",
    answer: "Yes, all advisors on our platform undergo a verification process. We confirm their professional credentials, regulatory standing, and other qualifications before they can be matched with clients."
  },
  {
    question: "How quickly can I expect to be matched with an advisor?",
    answer: "Most users receive their first match recommendations within 24 hours of completing their profile. The more complete your profile is, the better matches we can provide."
  }
];

const advisorFaqs: FAQItem[] = [
  {
    question: "How does AdvisorWiz generate leads?",
    answer: "We attract consumers looking for financial guidance through content marketing, SEO, partnerships, and referrals. When consumers create profiles, our matching algorithm connects them with advisors based on their needs and your expertise."
  },
  {
    question: "What's the typical ROI for advisors on the platform?",
    answer: "Most advisors report a positive ROI within 3 months. The average advisor converts 2-3 clients from our platform per month, with an average lifetime value that far exceeds the subscription cost."
  },
  {
    question: "Can I change plans later?",
    answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be applied at the start of your next billing cycle."
  },
  {
    question: "Is there a trial period?",
    answer: "We offer a 14-day free trial for all advisor plans. No credit card required until you're ready to continue."
  }
];

const enterpriseFaqs: FAQItem[] = [
  {
    question: "How does the enterprise plan differ from individual advisor plans?",
    answer: "Enterprise plans are designed for firms with multiple advisors and include features for team management, firm branding, centralized billing, custom reporting, and more extensive client matching capabilities."
  },
  {
    question: "Can we add or remove advisors from our enterprise account?",
    answer: "Yes, enterprise accounts have flexible advisor seats. You can add new advisors as your firm grows, and you'll be billed accordingly based on your plan tier."
  },
  {
    question: "Do you offer custom branding or white labeling?",
    answer: "Yes, our enterprise plans include custom branding options. The top-tier Enterprise plan includes full white labeling capabilities for seamless integration with your firm's brand identity."
  },
  {
    question: "Do you offer discounts for non-profits?",
    answer: "Yes, we offer special pricing for non-profit organizations. Please contact our sales team for more information."
  }
];

const PricingFAQs: React.FC = () => {
  const { userType } = useUser();
  
  const getFaqsByUserType = (): FAQItem[] => {
    switch (userType) {
      case 'consumer':
        return consumerFaqs;
      case 'advisor':
        return advisorFaqs;
      case 'firm_admin':
        return enterpriseFaqs;
      default:
        // If no user type or on pricing page before login
        return [...consumerFaqs.slice(0, 2), ...advisorFaqs.slice(0, 2), ...enterpriseFaqs.slice(0, 2)];
    }
  };

  return (
    <FAQAccordion 
      faqs={getFaqsByUserType()} 
      defaultValue="item-0"
      type="single"
      collapsible={true}
    />
  );
};

export default PricingFAQs;
