
import React from 'react';
import PageSEO from '../components/seo/PageSEO';
import TeamHeader from '../components/team/TeamHeader';
import TeamStats from '../components/team/TeamStats';
import TeamMemberList from '../components/team/TeamMemberList';
import TeamPerformance from '../components/team/TeamPerformance';
import { teamMembers } from '../components/team/teamData';
import ConsistentContainer from '../components/ui/design-system/ConsistentContainer';

const Team: React.FC = () => {
  // Stats data for the stats cards
  const statsData = [
    { title: 'Total Team', value: 12, description: 'Active advisors' },
    { title: 'Total Clients', value: 187, description: '+16 this month' },
    { title: 'Active Leads', value: 43, description: 'In progress' },
    { title: 'Avg. Rating', value: '4.7/5', description: 'Client satisfaction' }
  ];

  return (
    <>
      <PageSEO 
        title="Team Management | AdvisorWiz"
        description="Manage your financial advisory team members and view performance metrics"
      />

      <ConsistentContainer className="px-4 py-8">
        <TeamHeader 
          title="Team Management" 
          description="Manage your advisors and team members" 
        />
        
        <TeamStats stats={statsData} />
        
        <TeamMemberList members={teamMembers} />
        
        <TeamPerformance members={teamMembers} />
      </ConsistentContainer>
    </>
  );
};

export default Team;
