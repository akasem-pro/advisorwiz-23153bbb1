
import React from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useIsMobile } from '../../hooks/use-mobile';

interface PageCTAProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

const PageCTA: React.FC<PageCTAProps> = ({
  title,
  description,
  buttonText,
  buttonLink
}) => {
  const isMobile = useIsMobile();
  
  return (
    <section className="py-4 bg-teal-600 text-white">
      <div className="container mx-auto px-2 text-center">
        <h2 className={`${isMobile ? 'text-lg' : 'text-xl md:text-2xl'} font-serif font-bold mb-1.5`}>{title}</h2>
        <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-teal-100 mb-2 max-w-xl mx-auto`}>
          {description}
        </p>
        <Button asChild size={isMobile ? "sm" : "default"} className="bg-white text-teal-700 hover:bg-teal-50 rounded-lg px-4 py-1.5 text-sm h-auto">
          <Link to={buttonLink}>
            {buttonText}
            <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default PageCTA;
