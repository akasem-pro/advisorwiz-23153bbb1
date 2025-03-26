
import React from 'react';

interface StepProps {
  number: number;
  title: string;
  description: string;
}

interface PageHowItWorksProps {
  title: string;
  subtitle?: string;
  steps: StepProps[];
}

const PageHowItWorks: React.FC<PageHowItWorksProps> = ({ title, subtitle, steps }) => {
  return (
    <section className="py-12 bg-white dark:bg-navy-900" aria-labelledby="how-it-works-heading">
      <div className="container mx-auto px-4">
        <h2 id="how-it-works-heading" className="text-2xl md:text-3xl font-serif font-bold text-center text-navy-900 dark:text-slate-100 mb-3">
          {title}
        </h2>
        
        {subtitle && (
          <p className="text-base text-slate-600 dark:text-slate-300 text-center max-w-2xl mx-auto mb-10">
            {subtitle}
          </p>
        )}
        
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute left-7 top-0 bottom-0 w-0.5 bg-teal-200 dark:bg-teal-900/60"></div>
            
            {steps.map((step, index) => (
              <div key={index} className="relative z-10 mb-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-teal-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg mr-6">
                    {step.number}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-navy-900 dark:text-slate-100 mb-2">{step.title}</h3>
                    <p className="text-slate-600 dark:text-slate-300 text-base mb-2">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageHowItWorks;
