
import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeroActions from './hero/HeroActions';
import HeroStatistics from './hero/HeroStatistics';
import { useAuth } from '../../features/auth/context/AuthProvider';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <section className="relative py-16 mt-8 overflow-hidden bg-gradient-to-b from-white to-slate-50 dark:from-navy-900 dark:to-navy-950">
      <div className="container mx-auto px-4 z-20 relative">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-navy-900 dark:text-white leading-tight mb-6">
            Find the Perfect Financial Advisor for Your Needs
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl">
            Connect with qualified financial advisors who understand your unique financial situation and goals.
          </p>
          
          <HeroActions user={user} navigate={navigate} />
          <HeroStatistics />
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-10 pointer-events-none">
        <div className="absolute top-1/4 left-5 w-64 h-64 bg-teal-300 dark:bg-teal-900 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute top-1/3 right-5 w-72 h-72 bg-indigo-300 dark:bg-indigo-900 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute top-2/3 left-1/3 w-80 h-80 bg-blue-300 dark:bg-blue-900 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>
    </section>
  );
};

export default HeroSection;
