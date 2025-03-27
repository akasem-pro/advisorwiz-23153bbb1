
import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';

interface AuthWarningBannerProps {
  isVisible: boolean;
}

const AuthWarningBanner: React.FC<AuthWarningBannerProps> = ({ isVisible }) => {
  if (!isVisible) return null;
  
  return (
    <div className="fixed top-14 md:top-16 left-0 right-0 z-40 bg-red-100 text-red-800 px-3 py-1 text-center shadow-md">
      <div className="flex items-center justify-center gap-1 text-xs md:text-sm">
        <AlertCircle className="h-3 w-3 md:h-4 md:w-4" />
        <span>You must be signed in to access this page</span>
        <Link to="/sign-in" className="ml-2 bg-red-700 text-white px-2 py-0.5 rounded text-xs font-medium hover:bg-red-800">
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default AuthWarningBanner;
