
import React from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

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
  return (
    <section className="py-12 bg-teal-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4">{title}</h2>
        <p className="text-base text-teal-100 mb-6 max-w-xl mx-auto">
          {description}
        </p>
        <Button asChild size="lg" className="bg-white text-teal-700 hover:bg-teal-50 rounded-lg px-6 py-3 text-base h-auto">
          <Link to={buttonLink}>
            {buttonText}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default PageCTA;
