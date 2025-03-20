
import React from 'react';
import FAQAccordion, { FAQItem } from '../shared/FAQAccordion';

interface FAQSectionProps {
  faqs: FAQItem[];
}

const FAQSection: React.FC<FAQSectionProps> = ({ faqs }) => {
  return (
    <section className="py-16 bg-slate-50 dark:bg-navy-800" aria-labelledby="faq-heading">
      <div className="container mx-auto px-4">
        <h2 id="faq-heading" className="text-3xl font-serif font-bold text-center text-navy-900 dark:text-white mb-12">
          Frequently Asked Questions
        </h2>
        
        <div className="max-w-3xl mx-auto">
          <FAQAccordion 
            faqs={faqs} 
            defaultValue="item-0"
            className="bg-white dark:bg-navy-700 shadow-sm"
          />
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
