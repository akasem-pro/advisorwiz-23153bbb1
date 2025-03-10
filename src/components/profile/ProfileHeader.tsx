
import React from 'react';

interface ProfileHeaderProps {
  progress: number;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ progress }) => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-3xl md:text-4xl font-serif font-bold text-navy-900 mb-4">
        Create Your Advisor Profile
      </h1>
      <p className="text-slate-600 max-w-2xl mx-auto">
        Tell us about yourself and your services to get matched with the right clients.
      </p>
      
      {/* Progress Bar */}
      <div className="w-full bg-slate-100 rounded-full h-2.5 mt-8">
        <div 
          className="bg-teal-600 h-2.5 rounded-full transition-all duration-500 ease-out" 
          style={{ width: `${progress}%` }}
        ></div>
        <p className="text-xs text-slate-500 text-right mt-1">
          Profile completion: {Math.round(progress)}%
        </p>
      </div>
    </div>
  );
};
