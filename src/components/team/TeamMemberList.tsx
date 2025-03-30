
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Plus } from 'lucide-react';
import TeamMemberCard from './TeamMemberCard';

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
  return (
    <Card className="bg-white dark:bg-navy-800 border border-slate-200 dark:border-navy-700 mb-6">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Team Members</CardTitle>
          <Button variant="outline" size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Filter
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {members.map(member => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamMemberList;
