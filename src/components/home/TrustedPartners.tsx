
import React from 'react';

const TrustedPartners: React.FC = () => {
  const partners = [
    { id: 1, name: 'Financial Planning Association', logo: '/lovable-uploads/b3a65a71-f4f7-40ae-b3ef-dcc1ce0725c1.png' },
    { id: 2, name: 'Investment Management Consultants Association', logo: '/lovable-uploads/6212697e-73f6-458d-a12d-296c66576ee5.png' },
    { id: 3, name: 'National Association of Personal Financial Advisors', logo: '/lovable-uploads/d66162b8-d098-4ffe-a300-d14aa6ffe38e.png' },
    { id: 4, name: 'Certified Financial Planner Board', logo: '/lovable-uploads/baef6309-ad9b-4df1-8768-ca1e2df1f72c.png' },
  ];

  return (
    <section className="py-12 bg-white dark:bg-navy-850 border-y border-slate-100 dark:border-navy-700 mt-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-serif font-bold text-center text-navy-900 dark:text-white mb-8">
          Trusted by Industry Leaders
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {partners.map((partner) => (
            <div key={partner.id} className="w-1/2 md:w-auto flex justify-center">
              <img 
                src={partner.logo} 
                alt={partner.name} 
                className="h-12 md:h-16 opacity-80 dark:opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedPartners;
