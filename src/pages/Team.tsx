
import React from 'react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Avatar } from '../components/ui/avatar';
import { Mail, Phone, Plus, UserPlus } from 'lucide-react';

// Mock team data
const teamMembers = [
  {
    id: 1,
    name: 'Jennifer Wilson',
    role: 'Senior Financial Advisor',
    email: 'jennifer@advisorwiz.com',
    phone: '(416) 555-1234',
    avatar: '/lovable-uploads/54700f01-bc3e-46e6-a14f-7cc0101fe21f.png',
    clients: 28,
    leads: 12
  },
  {
    id: 2,
    name: 'Michael Thompson',
    role: 'Financial Advisor',
    email: 'michael@advisorwiz.com',
    phone: '(416) 555-2345',
    avatar: '/lovable-uploads/baef6309-ad9b-4df1-8768-ca1e2df1f72c.png',
    clients: 15,
    leads: 8
  },
  {
    id: 3,
    name: 'Sarah Chen',
    role: 'Estate Planning Specialist',
    email: 'sarah@advisorwiz.com',
    phone: '(416) 555-3456',
    avatar: '/lovable-uploads/6212697e-73f6-458d-a12d-296c66576ee5.png',
    clients: 22,
    leads: 5
  },
  {
    id: 4,
    name: 'David Rodriguez',
    role: 'Retirement Specialist',
    email: 'david@advisorwiz.com',
    phone: '(416) 555-4567',
    avatar: '/lovable-uploads/d66162b8-d098-4ffe-a300-d14aa6ffe38e.png',
    clients: 18,
    leads: 7
  }
];

const Team: React.FC = () => {
  return (
    <DashboardLayout 
      title="Team Management" 
      subtitle="Manage your advisors and team members"
      actionButtons={
        <Button className="bg-teal-600 hover:bg-teal-700 text-white">
          <UserPlus className="mr-2 h-4 w-4" />
          Invite Advisor
        </Button>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <Card className="bg-white dark:bg-navy-800 border border-slate-200 dark:border-navy-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Total Team</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-navy-900 dark:text-white">12</div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Active advisors</p>
          </CardContent>
        </Card>
        
        <Card className="bg-white dark:bg-navy-800 border border-slate-200 dark:border-navy-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Total Clients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-navy-900 dark:text-white">187</div>
            <p className="text-sm text-green-600 dark:text-green-400 mt-1">+16 this month</p>
          </CardContent>
        </Card>
        
        <Card className="bg-white dark:bg-navy-800 border border-slate-200 dark:border-navy-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Active Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-navy-900 dark:text-white">43</div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">In progress</p>
          </CardContent>
        </Card>
        
        <Card className="bg-white dark:bg-navy-800 border border-slate-200 dark:border-navy-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Avg. Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-navy-900 dark:text-white">4.7/5</div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Client satisfaction</p>
          </CardContent>
        </Card>
      </div>
      
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
            {teamMembers.map(member => (
              <div 
                key={member.id} 
                className="flex flex-col sm:flex-row p-4 bg-slate-50 dark:bg-navy-700 rounded-lg border border-slate-200 dark:border-navy-600"
              >
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                  <Avatar className="h-16 w-16 border-2 border-white dark:border-navy-600 shadow-sm">
                    <img src={member.avatar} alt={member.name} />
                  </Avatar>
                  
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="font-medium text-navy-900 dark:text-white text-lg">{member.name}</h3>
                    <p className="text-slate-600 dark:text-slate-300 text-sm mb-2">{member.role}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-1 mb-3">
                      <div className="flex items-center text-xs text-slate-600 dark:text-slate-300">
                        <Mail className="h-3 w-3 mr-1" />
                        {member.email}
                      </div>
                      <div className="flex items-center text-xs text-slate-600 dark:text-slate-300">
                        <Phone className="h-3 w-3 mr-1" />
                        {member.phone}
                      </div>
                    </div>
                    
                    <div className="flex justify-center sm:justify-start space-x-4 text-sm">
                      <div>
                        <span className="text-navy-900 dark:text-white font-medium">{member.clients}</span>
                        <span className="text-slate-600 dark:text-slate-300 ml-1">Clients</span>
                      </div>
                      <div>
                        <span className="text-navy-900 dark:text-white font-medium">{member.leads}</span>
                        <span className="text-slate-600 dark:text-slate-300 ml-1">Leads</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center sm:justify-end items-end mt-4 sm:mt-0 sm:self-end">
                  <Button variant="outline" size="sm" className="text-xs px-2 mr-2">Profile</Button>
                  <Button variant="outline" size="sm" className="text-xs px-2 bg-teal-50 text-teal-600 border-teal-200 hover:bg-teal-100 dark:bg-teal-900/20 dark:text-teal-400 dark:border-teal-800 dark:hover:bg-teal-900/40">Message</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
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
                {teamMembers.map(member => (
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
    </DashboardLayout>
  );
};

export default Team;
