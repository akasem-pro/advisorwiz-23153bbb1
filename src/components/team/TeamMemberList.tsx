
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Plus, Search, Filter, X } from 'lucide-react';
import TeamMemberCard from './TeamMemberCard';
import { toast } from 'sonner';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  email: string;
  phone: string;
  avatar: string;
  clients: number;
  leads: number;
}

interface TeamMemberListProps {
  members: TeamMember[];
}

const TeamMemberList: React.FC<TeamMemberListProps> = ({ members }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [filteredMembers, setFilteredMembers] = useState<TeamMember[]>(members);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  
  const handleToggleFilters = () => {
    setShowFilters(!showFilters);
    if (!showFilters) {
      toast.info("Filters enabled", { 
        description: "You can now filter team members by role and name" 
      });
    }
  };
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    
    filterMembers(query, roleFilter);
  };
  
  const handleRoleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const role = e.target.value;
    setRoleFilter(role);
    
    filterMembers(searchQuery, role);
  };
  
  const filterMembers = (query: string, role: string) => {
    const filtered = members.filter(member => {
      const nameMatch = member.name.toLowerCase().includes(query);
      const roleMatch = role === '' || member.role === role;
      
      return nameMatch && roleMatch;
    });
    
    setFilteredMembers(filtered);
  };
  
  const clearFilters = () => {
    setSearchQuery('');
    setRoleFilter('');
    setFilteredMembers(members);
    toast.success("Filters cleared", { description: "Showing all team members" });
  };
  
  const displayedMembers = searchQuery || roleFilter ? filteredMembers : members;
  const roles = Array.from(new Set(members.map(member => member.role)));

  return (
    <Card className="bg-white dark:bg-navy-800 border border-slate-200 dark:border-navy-700 mb-6">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Team Members</CardTitle>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleToggleFilters}
            className={showFilters ? "bg-slate-100 border-slate-300" : ""}
          >
            {showFilters ? <X className="mr-2 h-4 w-4" /> : <Filter className="mr-2 h-4 w-4" />}
            {showFilters ? "Hide Filters" : "Add Filter"}
          </Button>
        </div>
      </CardHeader>
      
      {showFilters && (
        <div className="px-6 pb-3">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search by name..."
                className="w-full pl-9 pr-4 py-2 border border-slate-200 dark:border-navy-600 rounded-md"
              />
            </div>
            <div className="w-full md:w-48">
              <select
                value={roleFilter}
                onChange={handleRoleFilter}
                className="w-full px-3 py-2 border border-slate-200 dark:border-navy-600 rounded-md bg-white dark:bg-navy-800"
              >
                <option value="">All Roles</option>
                {roles.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>
            {(searchQuery || roleFilter) && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearFilters}
                className="text-slate-600"
              >
                <X className="mr-1 h-4 w-4" />
                Clear
              </Button>
            )}
          </div>
        </div>
      )}
      
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayedMembers.map(member => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>
        
        {displayedMembers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-600 mb-2">No team members match your filters.</p>
            <Button variant="outline" size="sm" onClick={clearFilters}>Clear Filters</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TeamMemberList;
