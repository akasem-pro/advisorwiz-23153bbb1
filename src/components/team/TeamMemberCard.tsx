
import React from 'react';
import { Avatar } from '../../components/ui/avatar';
import { Button } from '../../components/ui/button';
import { Mail, Phone, User, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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

interface TeamMemberCardProps {
  member: TeamMember;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member }) => {
  const navigate = useNavigate();
  
  const handleViewProfile = () => {
    toast.info("Opening profile", {
      description: `Viewing ${member.name}'s profile details`
    });
    navigate(`/team/member/${member.id}`);
  };
  
  const handleSendMessage = () => {
    toast.success("Message window opened", {
      description: `You can now send a message to ${member.name}`
    });
    navigate(`/messages?recipient=${member.id}`);
  };
  
  return (
    <div 
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
        <Button 
          variant="outline" 
          size="sm" 
          className="text-xs px-2 mr-2"
          onClick={handleViewProfile}
        >
          <User className="h-3 w-3 mr-1" />
          Profile
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="text-xs px-2 bg-teal-50 text-teal-600 border-teal-200 hover:bg-teal-100 dark:bg-teal-900/20 dark:text-teal-400 dark:border-teal-800 dark:hover:bg-teal-900/40"
          onClick={handleSendMessage}
        >
          <MessageCircle className="h-3 w-3 mr-1" />
          Message
        </Button>
      </div>
    </div>
  );
};

export default TeamMemberCard;
