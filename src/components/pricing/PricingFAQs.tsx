
import React from 'react';
import { FAQItem } from '../shared/FAQAccordion';

// Export the FAQ data to be reused
export const pricingFaqs: FAQItem[] = [
  {
    question: "Can I change plans later?",
    answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be applied at the start of your next billing cycle."
  },
  {
    question: "Is there a trial period?",
    answer: "We offer a 14-day free trial for all advisor plans. No credit card required until you're ready to continue."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, and for annual plans, we can also accommodate invoicing for enterprise customers."
  },
  {
    question: "How do I get featured as an advisor?",
    answer: "The Premium plan includes featured advisor status, which gives you priority placement in search results and highlighted profiles."
  },
  {
    question: "Do you offer discounts for non-profits?",
    answer: "Yes, we offer special pricing for non-profit organizations. Please contact our sales team for more information."
  },
  {
    question: "How does the enterprise plan differ from individual advisor plans?",
    answer: "Enterprise plans are designed for firms with multiple advisors and include features for team management, firm branding, and more extensive client matching capabilities."
  }
];

const PricingFAQs: React.FC = () => {
  return pricingFaqs;
};

export default PricingFAQs;
