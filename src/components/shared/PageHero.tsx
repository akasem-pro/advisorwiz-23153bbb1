
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
    <section className="bg-gradient-to-b from-slate-50 to-white dark:from-navy-950 dark:to-navy-900 pt-16 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-navy-900 dark:text-white mb-6 leading-tight">
            {title}
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-10 leading-relaxed">
            {subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Button asChild size="lg" className="bg-teal-600 hover:bg-teal-700 text-white rounded-full px-8 py-6 text-lg h-auto">
              <Link to={primaryCta.link}>
                {primaryCta.text}
                {primaryCta.icon && <ArrowRight className="ml-2 h-5 w-5" />}
              </Link>
            </Button>
            
            {secondaryCta && (
              <Button asChild variant="outline" size="lg" className="border-navy-300 text-navy-700 dark:border-navy-600 dark:text-slate-200 rounded-full px-8 py-6 text-lg h-auto">
                <Link to={secondaryCta.link}>
                  {secondaryCta.text}
                </Link>
              </Button>
            )}
          </div>
          
          {features && features.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
              {features.map((feature, index) => (
                <div key={index} className="bg-white dark:bg-navy-800 p-6 rounded-xl shadow-sm">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-900/40 flex items-center justify-center">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-semibold ml-3 text-navy-900 dark:text-slate-100">{feature.title}</h3>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300">{feature.description}</p>
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
