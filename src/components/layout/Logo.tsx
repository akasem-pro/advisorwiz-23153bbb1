
import React from 'react';
import { Link } from 'react-router-dom';

const Logo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center space-x-2">
      <img 
        src="/lovable-uploads/d66162b8-d098-4ffe-a300-d14aa6ffe38e.png" 
        alt="AdvisorWiz Logo" 
        className="h-12 w-auto" 
        loading="eager" 
        fetchPriority="high"
      />
    </Link>
  );
};

export default Logo;
