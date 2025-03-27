
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
  className?: string;
  backgroundStyle?: 'default' | 'gradient' | 'blue' | 'dark';
}

const PageHero: React.FC<PageHeroProps> = ({
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  features,
  className = '',
  backgroundStyle = 'default'
}) => {
  // Define background styles based on the chosen style
  const getBackgroundClass = () => {
    switch (backgroundStyle) {
      case 'gradient':
        return 'bg-gradient-to-b from-slate-50 to-white dark:from-gray-900 dark:to-gray-950';
      case 'blue':
        return 'bg-blue-50 dark:bg-blue-900/20';
      case 'dark':
        return 'bg-gray-900 text-white';
      default:
        return 'bg-slate-50 dark:bg-gray-900';
    }
  };
  
  // Adjust text color for dark background
  const isDarkBg = backgroundStyle === 'dark';
  const titleClass = isDarkBg ? 'text-white' : 'text-gray-900 dark:text-white';
  const subtitleClass = isDarkBg ? 'text-gray-200' : 'text-gray-600 dark:text-gray-300';
  
  return (
    <section className={`py-12 ${getBackgroundClass()} ${className}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className={`text-3xl md:text-4xl font-serif font-bold ${titleClass} mb-4`}>
            {title}
          </h1>
          <p className={`text-lg ${subtitleClass} mb-8 leading-relaxed`}>
            {subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
            <Button asChild size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 dark:text-gray-900 rounded-md px-6 py-3 text-base h-auto shadow-md">
              <Link to={primaryCta.link}>
                {primaryCta.text}
                {primaryCta.icon && <ArrowRight className="ml-2 h-5 w-5" />}
              </Link>
            </Button>
            
            {secondaryCta && (
              <Button asChild variant="outline" size="lg" className="border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-200 rounded-md px-6 py-3 text-base h-auto">
                <Link to={secondaryCta.link}>
                  {secondaryCta.text}
                </Link>
              </Button>
            )}
          </div>
          
          {features && features.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              {features.map((feature, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
                  <div className="mb-3">
                    <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center mx-auto">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{feature.description}</p>
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
