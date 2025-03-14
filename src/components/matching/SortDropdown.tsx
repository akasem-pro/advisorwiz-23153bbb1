
import React from 'react';
import { ArrowUpAZ, ArrowDownAZ, Banknote, Briefcase } from 'lucide-react';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

interface SortDropdownProps {
  userType: 'consumer' | 'advisor' | null;
  sortOption: string;
  sortDirection: 'asc' | 'desc';
  onSortChange: (option: any) => void;
}

const SortDropdown: React.FC<SortDropdownProps> = ({
  userType,
  sortOption,
  sortDirection,
  onSortChange,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-9">
          {sortDirection === 'asc' ? 
            <ArrowUpAZ className="h-4 w-4 mr-1" /> : 
            <ArrowDownAZ className="h-4 w-4 mr-1" />}
          Sort
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>Sort By</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={() => onSortChange('name')}
          className={sortOption === 'name' ? 'bg-slate-100' : ''}
        >
          <ArrowUpAZ className="h-4 w-4 mr-2" />
          Name {sortOption === 'name' && (sortDirection === 'asc' ? '(A-Z)' : '(Z-A)')}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => onSortChange('assets')}
          className={sortOption === 'assets' ? 'bg-slate-100' : ''}
        >
          <Banknote className="h-4 w-4 mr-2" />
          {userType === 'consumer' ? 'Assets Under Management' : 'Investable Assets'} {' '}
          {sortOption === 'assets' && (sortDirection === 'asc' ? '(Low-High)' : '(High-Low)')}
        </DropdownMenuItem>
        {userType === 'consumer' && (
          <DropdownMenuItem 
            onClick={() => onSortChange('expertise')}
            className={sortOption === 'expertise' ? 'bg-slate-100' : ''}
          >
            <Briefcase className="h-4 w-4 mr-2" />
            Expertise Areas {sortOption === 'expertise' && (sortDirection === 'asc' ? '(Fewer-More)' : '(More-Fewer)')}
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortDropdown;
