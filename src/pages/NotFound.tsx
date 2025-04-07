
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 dark:bg-navy-950 p-4">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold text-navy-900 dark:text-white mb-4">404 - Page Not Found</h1>
        <p className="text-slate-600 dark:text-slate-300 mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center px-4 py-2 bg-navy-600 text-white rounded-md hover:bg-navy-700 transition-colors"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
