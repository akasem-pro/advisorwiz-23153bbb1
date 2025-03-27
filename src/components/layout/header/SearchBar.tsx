
import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Button } from '../../ui/button';
import { cn } from '@/lib/utils';
import { useIsMobile } from '../../../hooks/use-mobile';

interface SearchBarProps {
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ className }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <>
        <Button variant="ghost" size="icon" className="text-slate-500" onClick={() => setSearchOpen(true)}>
          <Search className="h-5 w-5" />
        </Button>
        
        {searchOpen && (
          <div className="fixed inset-0 bg-white dark:bg-navy-900 z-50 p-4">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={() => setSearchOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
              <div className="flex-1 relative">
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="w-full bg-slate-100 dark:bg-navy-800 px-4 py-2 pl-10 rounded-lg text-navy-900 dark:text-slate-200 outline-none"
                  autoFocus
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <div className={cn("relative mr-2", className)}>
      <div className="flex items-center relative bg-slate-100 dark:bg-navy-800/70 rounded-full h-9 w-36 md:w-48 px-3 transition-all">
        <Search className="h-4 w-4 text-slate-500 dark:text-slate-400" />
        <input 
          type="text" 
          placeholder="Search..." 
          className="bg-transparent border-none outline-none text-sm px-2 py-1 w-full text-slate-700 dark:text-slate-300 placeholder-slate-500 dark:placeholder-slate-400"
        />
      </div>
    </div>
  );
};

export default SearchBar;
