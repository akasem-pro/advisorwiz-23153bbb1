
import React from 'react';
import { Link } from 'react-router-dom';

const Logo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center space-x-2">
      <img 
        src="/lovable-uploads/6212697e-73f6-458d-a12d-296c66576ee5.png" 
        alt="AdvisorWiz Logo" 
        className="h-10 w-auto" 
        loading="eager" 
        fetchPriority="high"
      />
      <span className="text-navy-900 font-serif text-xl font-bold">AdvisorWiz</span>
    </Link>
  );
};

export default Logo;
