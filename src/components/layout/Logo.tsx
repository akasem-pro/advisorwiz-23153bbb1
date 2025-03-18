
import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  return (
    <Link to="/" className="flex items-center space-x-2">
      <img 
        src="/lovable-uploads/d66162b8-d098-4ffe-a300-d14aa6ffe38e.png" 
        alt="AdvisorWiz Logo" 
        className={`h-12 w-auto ${className}`}
        loading="eager" 
        fetchPriority="high"
      />
    </Link>
  );
};

export default Logo;
