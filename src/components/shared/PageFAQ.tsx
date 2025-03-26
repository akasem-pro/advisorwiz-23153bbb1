
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export interface FAQItem {
  question: string;
  answer: string;
}

interface PageFAQProps {
  title: string;
  subtitle?: string;
  faqs: FAQItem[];
}

const PageFAQ: React.FC<PageFAQProps> = ({ title, subtitle, faqs }) => {
  return (
    <section className="py-16 bg-slate-50 dark:bg-navy-800">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-center text-navy-900 dark:text-slate-100 mb-4">
            {title}
          </h2>
          
          {subtitle && (
            <p className="text-lg text-slate-600 dark:text-slate-300 text-center mb-12">
              {subtitle}
            </p>
          )}
          
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg font-medium text-navy-900 dark:text-slate-200">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 dark:text-slate-300">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default PageFAQ;
