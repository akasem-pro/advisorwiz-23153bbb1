
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdvisorProfile, FinancialFirm, useUser } from '../../context/UserContext';
import { UserPlus, Users, ExternalLink, UserCog } from 'lucide-react';
import { Button } from '../ui/button';

interface AdvisorProfileManagerProps {
  firm: FinancialFirm;
}

const AdvisorProfileManager: React.FC<AdvisorProfileManagerProps> = ({ firm }) => {
  const { advisorProfile, getFilteredAdvisors } = useUser();
  const navigate = useNavigate();
  const [showInvite, setShowInvite] = useState(false);
  const [email, setEmail] = useState('');
  
  // Placeholder function to get advisors for this firm
  // In a real implementation, this would filter from the database
  const firmAdvisors = getFilteredAdvisors({}).filter(advisor => 
    firm.advisorIds.includes(advisor.id)
  );
  
  const handleInvite = () => {
    // In a real app, this would send an invitation email
    // For now, just close the form
    setEmail('');
    setShowInvite(false);
  };
  
  const handleCreateAdvisor = () => {
    // Navigate to a new advisor creation page with the firm context
    navigate(`/advisor-profile?firmId=${firm.id}`);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-serif font-semibold text-navy-800 flex items-center">
          <Users className="mr-2 h-5 w-5" />
          Advisor Profiles
        </h2>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowInvite(!showInvite)}
          >
            <UserPlus className="mr-1 h-4 w-4" />
            Invite Advisor
          </Button>
          <Button 
            variant="default" 
            size="sm"
            onClick={handleCreateAdvisor}
          >
            <UserCog className="mr-1 h-4 w-4" />
            Create New Advisor
          </Button>
        </div>
      </div>
      
      {showInvite && (
        <div className="bg-slate-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-navy-800 mb-3">Invite an Advisor</h3>
          <div className="flex space-x-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field flex-grow"
              placeholder="advisor@example.com"
            />
            <Button 
              onClick={handleInvite}
              disabled={!email.trim()}
            >
              Send Invite
            </Button>
          </div>
        </div>
      )}
      
      <div className="space-y-4">
        {firmAdvisors.length > 0 ? (
          firmAdvisors.map(advisor => (
            <div key={advisor.id} className="bg-white rounded-lg shadow p-4 flex justify-between items-center">
              <div className="flex items-center">
                {advisor.profilePicture ? (
                  <img 
                    src={advisor.profilePicture} 
                    alt={advisor.name} 
                    className="w-10 h-10 rounded-full object-cover mr-3" 
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center text-lg font-medium mr-3">
                    {advisor.name.charAt(0)}
                  </div>
                )}
                <div>
                  <h3 className="font-medium text-navy-800">{advisor.name}</h3>
                  <p className="text-sm text-slate-600">{advisor.expertise.join(', ')}</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate(`/advisor-profile?id=${advisor.id}`)}
              >
                <ExternalLink className="h-4 w-4" />
                <span className="sr-only">View profile</span>
              </Button>
            </div>
          ))
        ) : (
          <div className="text-center py-8 bg-slate-50 rounded-lg">
            <Users className="h-12 w-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-navy-800 mb-1">No Advisors Yet</h3>
            <p className="text-slate-600 mb-4">
              Start by creating advisor profiles or inviting existing advisors to join your firm.
            </p>
            <Button onClick={handleCreateAdvisor}>
              <UserPlus className="mr-2 h-4 w-4" />
              Create First Advisor
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvisorProfileManager;
