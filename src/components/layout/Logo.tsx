
import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

interface LogoProps {
  className?: string;
  forceLightMode?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = '', forceLightMode = false }) => {
  const { theme } = useTheme();
  
  // Use the white logo when in dark mode or when forceLightMode is true
  const logoSrc = theme === 'dark' || forceLightMode
    ? "/lovable-uploads/b3a65a71-f4f7-40ae-b3ef-dcc1ce0725c1.png" 
    : "/lovable-uploads/d66162b8-d098-4ffe-a300-d14aa6ffe38e.png";
  
  return (
    <Link to="/" className="flex items-center space-x-2">
      <img 
        src={logoSrc} 
        alt="AdvisorWiz Logo" 
        className={`h-12 w-auto ${className}`}
        loading="eager" 
        fetchPriority="high"
      />
    </Link>
  );
};

export default Logo;
