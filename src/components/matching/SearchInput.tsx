
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '../ui/input';

interface SearchInputProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  userType: 'consumer' | 'advisor' | null;
}

const SearchInput: React.FC<SearchInputProps> = ({
  searchTerm,
  onSearchChange,
  userType
}) => {
  return (
    <div className="relative flex-grow">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
      <Input
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder={`Search ${userType === 'consumer' ? 'advisors' : 'clients'}...`}
        className="w-full pl-9 h-9 text-sm"
      />
    </div>
  );
};

export default SearchInput;
