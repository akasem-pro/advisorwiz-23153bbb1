
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
    <section className="py-12 bg-slate-50 dark:bg-navy-800">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-center text-navy-900 dark:text-slate-100 mb-3">
            {title}
          </h2>
          
          {subtitle && (
            <p className="text-base text-slate-600 dark:text-slate-300 text-center mb-8">
              {subtitle}
            </p>
          )}
          
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-slate-200 dark:border-navy-700">
                <AccordionTrigger className="text-left text-base font-medium text-navy-900 dark:text-slate-200 py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 dark:text-slate-300 text-base">
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
