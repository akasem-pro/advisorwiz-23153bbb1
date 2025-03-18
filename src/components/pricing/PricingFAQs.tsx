
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';

const PricingFAQs: React.FC = () => {
  const faqs = [
    {
      question: 'How much does it cost for consumers to use AdvisorWiz?',
      answer: 'AdvisorWiz is completely free for consumers. We do not charge any fees for matching you with financial advisors, scheduling appointments, or using our platform. Our revenue comes from the advisors and firms who pay for premium placement and access to our tools.'
    },
    {
      question: 'Are there any hidden fees for advisors?',
      answer: 'No, there are no hidden fees. The pricing displayed is all-inclusive for the features listed in each plan. You can cancel your subscription at any time. We believe in complete transparency with our pricing structure.'
    },
    {
      question: 'Can I change my plan later?',
      answer: 'Yes! You can upgrade or downgrade your plan at any time. When upgrading, you'll get immediate access to the new features and we'll prorate the billing. When downgrading, your new rate will take effect at the next billing cycle.'
    },
    {
      question: 'Do you offer discounts for multiple advisors in the same firm?',
      answer: 'Yes, our Enterprise plans are specifically designed for firms with multiple advisors. These plans offer volume discounts and additional features to help manage team collaboration. Contact our sales team for custom pricing based on your firm's specific needs.'
    },
    {
      question: 'Is there a free trial for advisor plans?',
      answer: 'Yes, we offer a 14-day free trial for all advisor plans. You can test out the features and see if AdvisorWiz is the right fit for your practice before committing to a subscription.'
    },
    {
      question: 'How do I cancel my subscription?',
      answer: 'You can cancel your subscription at any time from your account settings. If you cancel, you'll continue to have access to your paid features until the end of your billing period. We don't offer refunds for partial months.'
    }
  ];

  return (
    <Accordion type="single" collapsible className="w-full bg-white dark:bg-navy-800 rounded-lg overflow-hidden border border-slate-200 dark:border-navy-700">
      {faqs.map((faq, index) => (
        <AccordionItem key={index} value={`item-${index}`} className="border-b border-slate-200 dark:border-navy-700 last:border-0">
          <AccordionTrigger className="px-6 py-4 hover:bg-slate-50 dark:hover:bg-navy-700 text-left font-medium text-navy-900 dark:text-white">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-4 pt-0 text-slate-600 dark:text-slate-300">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default PricingFAQs;
