
import React from 'react';
import { NavigateFunction } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';
import { Button } from '../../ui/button';
import { User } from '@supabase/supabase-js';

interface HeroActionsProps {
  user: User | null;
  navigate: NavigateFunction;
}

const HeroActions: React.FC<HeroActionsProps> = ({ user, navigate }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
      {user ? (
        <Button 
          className="w-full sm:w-auto text-base sm:text-lg bg-teal-600 hover:bg-teal-700 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg flex items-center justify-center"
          onClick={() => navigate('/matches')}
        >
          <Search className="mr-2 h-5 w-5" />
          Find Your Match
        </Button>
      ) : (
        <>
          <Button 
            className="w-full sm:w-auto text-base sm:text-lg bg-teal-600 hover:bg-teal-700 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg flex items-center justify-center"
            onClick={() => navigate('/sign-in')}
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full sm:w-auto text-base sm:text-lg border-white text-white hover:bg-white/20 dark:border-slate-300 dark:text-slate-300 px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg"
            onClick={() => navigate('/for-advisors')}
          >
            For Advisors
          </Button>
        </>
      )}
    </div>
  );
};

export default HeroActions;
