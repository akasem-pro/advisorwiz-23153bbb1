
import React from 'react';
import { generateFAQSchema } from '../../utils/schemas';
import StructuredData from '../seo/StructuredData';
import { Link } from 'react-router-dom';
import FAQAccordion, { FAQItem } from '../shared/FAQAccordion';

const faqs: FAQItem[] = [
  {
    question: "How does AdvisorWiz match me with a financial advisor?",
    answer: "AdvisorWiz uses a proprietary matching algorithm that considers your financial goals, preferences, and needs. We analyze our network of pre-vetted advisors based on their expertise, credentials, fee structures, and approach to find the best match for your specific situation.",
    relatedLinks: [
      { text: "Learn more about our matching process", url: "/for-consumers" },
      { text: "Start finding your advisor match", url: "/onboarding" }
    ]
  },
  {
    question: "Is there a fee to use AdvisorWiz as a consumer?",
    answer: "No, AdvisorWiz is completely free for consumers. Our service is funded by the financial advisors and firms who join our platform to connect with clients like you.",
    relatedLinks: [
      { text: "View our pricing for advisors", url: "/pricing" }
    ]
  },
  {
    question: "How are the financial advisors vetted?",
    answer: "All advisors on our platform undergo a comprehensive verification process. We check their credentials, regulatory history, professional experience, and client reviews. We also conduct interviews to ensure they meet our standards for professionalism and expertise.",
    relatedLinks: [
      { text: "For advisors: Learn about joining AdvisorWiz", url: "/for-advisors" }
    ]
  },
  {
    question: "What if I'm not satisfied with my advisor match?",
    answer: "If you're not completely satisfied with your advisor match, simply let us know and we'll work to find you a more suitable advisor. Your satisfaction is our priority, and we're committed to helping you find the right financial partner.",
    relatedLinks: [
      { text: "Contact our support team", url: "/contact" }
    ]
  },
  {
    question: "What types of financial advisors are on AdvisorWiz?",
    answer: "AdvisorWiz features a diverse network of financial professionals including Certified Financial Planners (CFPs), Registered Investment Advisors (RIAs), wealth managers, retirement specialists, tax planners, and more. Whether you need comprehensive financial planning or specialized advice, we can match you with the right expert.",
    relatedLinks: [
      { text: "Browse advisor specialties", url: "/matches" }
    ]
  },
  {
    question: "How quickly can I expect to be matched with an advisor?",
    answer: "After completing our matching questionnaire, you'll typically receive advisor recommendations within 24-48 hours. You can then review their profiles and schedule initial consultations at your convenience."
  },
  {
    question: "How is my personal information protected?",
    answer: "We take data security seriously. All personal and financial information is encrypted using industry-standard protocols. We never share your information with third parties without your explicit consent.",
    relatedLinks: [
      { text: "Read our privacy policy", url: "/privacy" }
    ]
  }
];

const FAQSection: React.FC = () => {
  return (
    <section id="faq" className="py-16 bg-slate-50 dark:bg-navy-900" aria-labelledby="faq-heading">
      <StructuredData data={generateFAQSchema(faqs.map(faq => ({
        question: faq.question,
        answer: faq.answer
      })))} />
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 id="faq-heading" className="text-3xl font-serif font-bold text-navy-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Get answers to common questions about how AdvisorWiz works for both consumers and financial advisors.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="faq-schema-container" itemScope itemType="https://schema.org/FAQPage">
            <FAQAccordion faqs={faqs} defaultValue="item-0" />
          </div>
          
          <div className="mt-10 text-center">
            <p className="text-slate-600 dark:text-slate-300 mb-4">Have more questions? We're here to help.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="btn-outline dark:border-slate-600 dark:text-slate-300 dark:hover:bg-navy-800">Contact Us</Link>
              <Link to="/for-consumers" className="text-teal-600 dark:text-teal-400 hover:underline">
                Learn more about AdvisorWiz
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
