
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  Calendar, 
  MessageCircle,
  Award, 
  TrendingUp, 
  Users 
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '../components/ui/card';
import PageSEO from '../components/seo/PageSEO';
import ConsistentContainer from '../components/ui/design-system/ConsistentContainer';
import AppLayout from '../components/layout/AppLayout';
import { teamMembers } from '../components/team/teamData';
import { Avatar } from '../components/ui/avatar';
import { toast } from 'sonner';

const TeamMemberDetail: React.FC = () => {
  const { memberId } = useParams<{ memberId: string }>();
  const navigate = useNavigate();
  
  const member = teamMembers.find(m => m.id === Number(memberId));
  
  if (!member) {
    return (
      <AppLayout>
        <ConsistentContainer className="px-4 py-8 pt-28">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Team Member Not Found</h1>
            <p className="mb-6">The team member you are looking for doesn't exist.</p>
            <Button onClick={() => navigate('/team')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Team
            </Button>
          </div>
        </ConsistentContainer>
      </AppLayout>
    );
  }
  
  const handleSendMessage = () => {
    toast.success("Message window opened", {
      description: `You can now send a message to ${member.name}`
    });
    navigate(`/messages?recipient=${member.id}`);
  };
  
  return (
    <AppLayout>
      <PageSEO 
        title={`${member.name} | Team Member Profile | AdvisorWiz`}
        description={`Profile and performance details for ${member.name}`}
      />

      <ConsistentContainer className="px-4 py-8 pt-28">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/team')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Team
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card className="bg-white dark:bg-navy-800 border border-slate-200 dark:border-navy-700">
              <CardHeader className="flex flex-col items-center text-center pb-2">
                <Avatar className="h-24 w-24 border-2 border-white dark:border-navy-600 shadow-sm mb-4">
                  <img src={member.avatar} alt={member.name} />
                </Avatar>
                <h1 className="text-2xl font-bold text-navy-900 dark:text-white">{member.name}</h1>
                <p className="text-slate-600 dark:text-slate-300">{member.role}</p>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-slate-500" />
                    <span className="text-sm">{member.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-slate-500" />
                    <span className="text-sm">{member.phone}</span>
                  </div>
                  
                  <div className="pt-4 flex flex-col gap-2">
                    <Button 
                      variant="default" 
                      className="w-full bg-teal-600 hover:bg-teal-700"
                      onClick={handleSendMessage}
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Send Message
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => {
                        toast.success("Opening calendar", {
                          description: `Scheduling a meeting with ${member.name}`
                        });
                        navigate(`/schedule?advisor=${member.id}`);
                      }}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      Schedule Meeting
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-white dark:bg-navy-800 border border-slate-200 dark:border-navy-700">
              <CardHeader>
                <CardTitle className="text-lg">Performance Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-slate-50 dark:bg-navy-700 p-4 rounded-lg text-center">
                    <TrendingUp className="h-6 w-6 mx-auto mb-2 text-teal-500" />
                    <div className="text-2xl font-bold">{member.clients + member.leads}</div>
                    <div className="text-sm text-slate-500">Total Leads</div>
                  </div>
                  
                  <div className="bg-slate-50 dark:bg-navy-700 p-4 rounded-lg text-center">
                    <Users className="h-6 w-6 mx-auto mb-2 text-blue-500" />
                    <div className="text-2xl font-bold">{member.clients}</div>
                    <div className="text-sm text-slate-500">Active Clients</div>
                  </div>
                  
                  <div className="bg-slate-50 dark:bg-navy-700 p-4 rounded-lg text-center">
                    <Award className="h-6 w-6 mx-auto mb-2 text-amber-500" />
                    <div className="text-2xl font-bold">{(4 + Math.random()).toFixed(1)}/5</div>
                    <div className="text-sm text-slate-500">Client Rating</div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Recent Activity</h3>
                  <div className="space-y-2">
                    <div className="p-3 bg-slate-50 dark:bg-navy-700 rounded-lg">
                      <div className="text-sm font-medium">Added new client</div>
                      <div className="text-xs text-slate-500">Yesterday</div>
                    </div>
                    <div className="p-3 bg-slate-50 dark:bg-navy-700 rounded-lg">
                      <div className="text-sm font-medium">Completed financial review</div>
                      <div className="text-xs text-slate-500">3 days ago</div>
                    </div>
                    <div className="p-3 bg-slate-50 dark:bg-navy-700 rounded-lg">
                      <div className="text-sm font-medium">Received new lead</div>
                      <div className="text-xs text-slate-500">1 week ago</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white dark:bg-navy-800 border border-slate-200 dark:border-navy-700">
              <CardHeader>
                <CardTitle className="text-lg">Expertise & Specialization</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
                  <div className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 px-3 py-1 rounded-full text-sm text-center">Retirement</div>
                  <div className="bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300 px-3 py-1 rounded-full text-sm text-center">Investments</div>
                  <div className="bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 px-3 py-1 rounded-full text-sm text-center">Estate Planning</div>
                  <div className="bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 px-3 py-1 rounded-full text-sm text-center">Tax Strategy</div>
                  <div className="bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300 px-3 py-1 rounded-full text-sm text-center">Insurance</div>
                </div>
                
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {member.name} specializes in helping clients navigate complex financial situations with a focus on 
                  long-term wealth building and preservation strategies. With years of experience in the industry,
                  they provide exceptional service and tailored advice to meet each client's unique goals.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </ConsistentContainer>
    </AppLayout>
  );
};

export default TeamMemberDetail;
