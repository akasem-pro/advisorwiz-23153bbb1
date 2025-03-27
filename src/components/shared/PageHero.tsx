
import React from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface PageHeroProps {
  title: string;
  subtitle: string;
  primaryCta: {
    text: string;
    link: string;
    icon?: boolean;
  };
  secondaryCta?: {
    text: string;
    link: string;
  };
  features?: Array<{
    title: string;
    description: string;
    icon: React.ReactNode;
  }>;
}

const PageHero: React.FC<PageHeroProps> = ({
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  features
}) => {
  return (
    <section className="bg-gradient-to-b from-slate-50 to-white dark:from-navy-950 dark:to-navy-900 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-navy-900 dark:text-white mb-3">
            {title}
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">
            {subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
            <Button asChild size="lg" className="bg-teal-600 hover:bg-teal-700 text-white rounded-lg px-6 py-2.5 text-base h-auto">
              <Link to={primaryCta.link}>
                {primaryCta.text}
                {primaryCta.icon && <ArrowRight className="ml-2 h-5 w-5" />}
              </Link>
            </Button>
            
            {secondaryCta && (
              <Button asChild variant="outline" size="lg" className="border-navy-300 text-navy-700 dark:border-navy-600 dark:text-slate-200 rounded-lg px-6 py-2.5 text-base h-auto">
                <Link to={secondaryCta.link}>
                  {secondaryCta.text}
                </Link>
              </Button>
            )}
          </div>
          
          {features && features.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
              {features.map((feature, index) => (
                <div key={index} className="bg-white dark:bg-navy-800 p-4 rounded-lg shadow-sm border border-slate-100 dark:border-navy-700">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900/40 flex items-center justify-center">
                      {feature.icon}
                    </div>
                    <h3 className="text-base font-medium ml-3 text-navy-900 dark:text-slate-100">{feature.title}</h3>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300">{feature.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PageHero;
