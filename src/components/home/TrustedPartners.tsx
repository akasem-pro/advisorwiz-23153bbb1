
import React from 'react';
import { Shield } from 'lucide-react';

const TrustedPartners: React.FC = () => {
  // Companies that trust AdvisorWiz - we'll use placeholder names but in a real app you'd use actual logos
  const partners = [
    { name: 'Morgan Financial', logo: '/lovable-uploads/182395d5-e6d3-41ac-a0d8-349a9c33bdc5.png' },
    { name: 'Fidelity', logo: '/placeholder.svg' },
    { name: 'Capital One', logo: '/placeholder.svg' },
    { name: 'Vanguard', logo: '/placeholder.svg' },
    { name: 'BlackRock', logo: '/placeholder.svg' },
    { name: 'JP Morgan', logo: '/placeholder.svg' },
  ];

  return (
    <section className="py-12 bg-white dark:bg-navy-850 border-y border-slate-100 dark:border-navy-700">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-serif font-bold text-center text-navy-900 dark:text-white mb-8">
          Trusted by Industry Leaders
        </h2>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {partners.map((partner, index) => (
            <div key={index} className="text-center">
              <div className="w-32 h-16 flex items-center justify-center grayscale hover:grayscale-0 transition-all">
                {partner.logo === '/placeholder.svg' ? (
                  <div className="bg-slate-100 dark:bg-navy-700 w-full h-full rounded-md flex items-center justify-center">
                    <Shield className="text-slate-400 h-8 w-8" />
                    <span className="text-xs font-medium text-slate-500 ml-1">{partner.name}</span>
                  </div>
                ) : (
                  <img 
                    src={partner.logo} 
                    alt={`${partner.name} logo`} 
                    className="max-h-full max-w-full object-contain" 
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedPartners;
