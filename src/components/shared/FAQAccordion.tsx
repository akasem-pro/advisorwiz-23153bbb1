
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "../ui/accordion";
import { ArrowRight } from 'lucide-react';

export interface FAQItem {
  question: string;
  answer: string;
  relatedLinks?: Array<{
    text: string;
    url: string;
  }>;
}

interface FAQAccordionProps {
  faqs: FAQItem[];
  defaultValue?: string;
  type?: "single" | "multiple";
  collapsible?: boolean;
  className?: string;
}

const FAQAccordion: React.FC<FAQAccordionProps> = ({ 
  faqs, 
  defaultValue, 
  type = "single",
  collapsible = true,
  className = ""
}) => {
  // Create the correct props based on the type
  const accordionProps = type === "single" 
    ? { 
        type: "single" as const, 
        defaultValue, 
        collapsible 
      } 
    : { 
        type: "multiple" as const, 
        defaultValue: defaultValue ? [defaultValue] : undefined,
        collapsible 
      };

  return (
    <Accordion 
      {...accordionProps}
      className={`w-full ${className}`}
    >
      {faqs.map((faq, index) => (
        <AccordionItem 
          key={index} 
          value={`item-${index}`}
          className="border border-slate-200 rounded-lg mb-4 overflow-hidden"
        >
          <AccordionTrigger className="px-6 py-4 text-left bg-white hover:bg-slate-50 transition-colors text-navy-900 font-medium">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 bg-white text-slate-700">
            <p>{faq.answer}</p>
            
            {faq.relatedLinks && faq.relatedLinks.length > 0 && (
              <div className="mt-4 space-y-2">
                {faq.relatedLinks.map((link, linkIndex) => (
                  <div key={linkIndex} className="text-sm">
                    <Link 
                      to={link.url} 
                      className="text-teal-600 hover:underline inline-flex items-center"
                    >
                      {link.text}
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default FAQAccordion;
