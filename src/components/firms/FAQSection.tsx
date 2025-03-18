
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import FAQAccordion, { FAQItem } from '../shared/FAQAccordion';

interface FAQSectionProps {
  faqs: FAQItem[];
}

const FAQSection: React.FC<FAQSectionProps> = ({ faqs }) => {
  return (
    <section className="py-16 bg-white dark:bg-navy-900" id="firm-faqs">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-3xl font-serif font-bold text-navy-900 dark:text-white mb-8 text-center">
          Frequently Asked Questions
        </h2>
        
        <FAQAccordion faqs={faqs} defaultValue="item-0" />
        
        <div className="mt-8 text-center">
          <p className="text-slate-600 dark:text-slate-300 mb-4">Have more questions about how AdvisorWiz can help your firm?</p>
          <Link to="/contact" className="text-teal-600 dark:text-teal-400 hover:underline inline-flex items-center">
            Contact our enterprise team
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
