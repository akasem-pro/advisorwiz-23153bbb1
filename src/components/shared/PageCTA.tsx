
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
    <section className="py-16 bg-teal-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-serif font-bold mb-6">{title}</h2>
        <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
          {description}
        </p>
        <Button asChild size="lg" className="bg-white text-teal-700 hover:bg-teal-50 rounded-full px-8 py-6 text-lg h-auto">
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
