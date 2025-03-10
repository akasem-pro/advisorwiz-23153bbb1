
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { generateFAQSchema } from '../../utils/jsonLdData';
import StructuredData from '../seo/StructuredData';

type FAQItem = {
  question: string;
  answer: string;
};

const faqs: FAQItem[] = [
  {
    question: "How does AdvisorWiz match me with a financial advisor?",
    answer: "AdvisorWiz uses a proprietary matching algorithm that considers your financial goals, preferences, and needs. We analyze our network of pre-vetted advisors based on their expertise, credentials, fee structures, and approach to find the best match for your specific situation."
  },
  {
    question: "Is there a fee to use AdvisorWiz as a consumer?",
    answer: "No, AdvisorWiz is completely free for consumers. Our service is funded by the financial advisors and firms who join our platform to connect with clients like you."
  },
  {
    question: "How are the financial advisors vetted?",
    answer: "All advisors on our platform undergo a comprehensive verification process. We check their credentials, regulatory history, professional experience, and client reviews. We also conduct interviews to ensure they meet our standards for professionalism and expertise."
  },
  {
    question: "What if I'm not satisfied with my advisor match?",
    answer: "If you're not completely satisfied with your advisor match, simply let us know and we'll work to find you a more suitable advisor. Your satisfaction is our priority, and we're committed to helping you find the right financial partner."
  },
  {
    question: "What types of financial advisors are on AdvisorWiz?",
    answer: "AdvisorWiz features a diverse network of financial professionals including Certified Financial Planners (CFPs), Registered Investment Advisors (RIAs), wealth managers, retirement specialists, tax planners, and more. Whether you need comprehensive financial planning or specialized advice, we can match you with the right expert."
  },
  {
    question: "How quickly can I expect to be matched with an advisor?",
    answer: "After completing our matching questionnaire, you'll typically receive advisor recommendations within 24-48 hours. You can then review their profiles and schedule initial consultations at your convenience."
  },
  {
    question: "How is my personal information protected?",
    answer: "We take data security seriously. All personal and financial information is encrypted using industry-standard protocols. We never share your information with third parties without your explicit consent."
  }
];

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 bg-slate-50" aria-labelledby="faq-heading">
      <StructuredData data={generateFAQSchema(faqs)} />
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 id="faq-heading" className="text-3xl font-serif font-bold text-navy-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Get answers to common questions about how AdvisorWiz works for both consumers and financial advisors.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="mb-4 border border-slate-200 rounded-lg overflow-hidden"
              itemScope
              itemType="https://schema.org/Question"
            >
              <button
                className="w-full px-6 py-4 text-left bg-white hover:bg-slate-50 transition-colors flex justify-between items-center"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="font-medium text-navy-900" itemProp="name">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-teal-600 flex-shrink-0" aria-hidden="true" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-teal-600 flex-shrink-0" aria-hidden="true" />
                )}
              </button>
              <div 
                id={`faq-answer-${index}`}
                className={`px-6 py-4 bg-white text-slate-700 ${openIndex === index ? 'block' : 'hidden'}`}
                itemScope
                itemProp="acceptedAnswer"
                itemType="https://schema.org/Answer"
              >
                <p itemProp="text">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
