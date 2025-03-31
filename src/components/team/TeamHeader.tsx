
import React from 'react';
import { Button } from '../../components/ui/button';
import { UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface TeamHeaderProps {
  title: string;
  description: string;
}

const TeamHeader: React.FC<TeamHeaderProps> = ({ title, description }) => {
  const navigate = useNavigate();
  
  const handleInviteClick = () => {
    toast.success("Invitation form opened", {
      description: "You can now invite a new advisor to your team"
    });
    navigate('/team/invite');
  };

  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-3xl font-bold text-navy-900 dark:text-white">{title}</h1>
        <p className="text-slate-600 dark:text-slate-300">{description}</p>
      </div>
      <Button 
        className="bg-teal-600 hover:bg-teal-700 text-white"
        onClick={handleInviteClick}
      >
        <UserPlus className="mr-2 h-4 w-4" />
        Invite Advisor
      </Button>
    </div>
  );
};

export default TeamHeader;
