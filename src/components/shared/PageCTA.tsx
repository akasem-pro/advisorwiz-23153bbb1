
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
    <section className="py-6 bg-teal-600 text-white"> {/* Reduced padding */}
      <div className="container mx-auto px-2 text-center"> {/* Reduced padding */}
        <h2 className="text-xl md:text-2xl font-serif font-bold mb-2">{title}</h2> {/* Reduced font size and margin */}
        <p className="text-sm text-teal-100 mb-3 max-w-xl mx-auto"> {/* Reduced font size and margin */}
          {description}
        </p>
        <Button asChild size="lg" className="bg-white text-teal-700 hover:bg-teal-50 rounded-lg px-6 py-2 text-base h-auto">
          <Link to={buttonLink}>
            {buttonText}
            <ArrowRight className="ml-2 h-4 w-4" /> {/* Smaller icon */}
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default PageCTA;
