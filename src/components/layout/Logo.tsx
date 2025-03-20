
import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  const { theme } = useTheme();
  
  // Use the white logo from the footer in dark mode, and the regular logo in light mode
  const logoSrc = theme === 'dark' 
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
