
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';

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

interface TeamPerformanceProps {
  members: TeamMember[];
}

const TeamPerformance: React.FC<TeamPerformanceProps> = ({ members }) => {
  return (
    <Card className="bg-white dark:bg-navy-800 border border-slate-200 dark:border-navy-700">
      <CardHeader>
        <CardTitle>Team Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-slate-50 dark:bg-navy-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-slate-700 dark:text-slate-300">Advisor</th>
                <th scope="col" className="px-6 py-3 text-slate-700 dark:text-slate-300">Leads</th>
                <th scope="col" className="px-6 py-3 text-slate-700 dark:text-slate-300">Conversion</th>
                <th scope="col" className="px-6 py-3 text-slate-700 dark:text-slate-300">Rating</th>
                <th scope="col" className="px-6 py-3 text-slate-700 dark:text-slate-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.map(member => (
                <tr key={member.id} className="border-b dark:border-navy-600">
                  <td className="px-6 py-4 font-medium text-navy-900 dark:text-white whitespace-nowrap">
                    {member.name}
                  </td>
                  <td className="px-6 py-4">{member.leads + member.clients}</td>
                  <td className="px-6 py-4">{Math.round((member.clients / (member.leads + member.clients)) * 100)}%</td>
                  <td className="px-6 py-4">{(4 + Math.random()).toFixed(1)}/5</td>
                  <td className="px-6 py-4">
                    <Button variant="ghost" size="sm" className="text-xs px-2 text-blue-600 dark:text-blue-400">View Stats</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamPerformance;
