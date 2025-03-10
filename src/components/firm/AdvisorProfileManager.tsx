
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdvisorProfile, FinancialFirm, useUser } from '../../context/UserContext';
import { UserPlus, Users, ExternalLink, UserCog, Mail, User, Search } from 'lucide-react';
import { Button } from '../ui/button';
import { useToast } from '../../components/ui/use-toast';

interface AdvisorProfileManagerProps {
  firm: FinancialFirm;
}

const AdvisorProfileManager: React.FC<AdvisorProfileManagerProps> = ({ firm }) => {
  const { advisorProfile, getFilteredAdvisors } = useUser();
  const navigate = useNavigate();
  const [showInvite, setShowInvite] = useState(false);
  const [email, setEmail] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();
  
  // Placeholder function to get advisors for this firm
  // In a real implementation, this would filter from the database
  const firmAdvisors = getFilteredAdvisors({}).filter(advisor => 
    firm.advisorIds.includes(advisor.id)
  );
  
  const filteredAdvisors = firmAdvisors.filter(advisor => 
    advisor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    advisor.expertise.some(exp => exp.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  const handleInvite = () => {
    // In a real app, this would send an invitation email
    toast({
      title: "Invitation sent",
      description: `An invitation has been sent to ${email}`,
    });
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
        <h2 className="text-2xl font-serif font-semibold text-navy-800 flex items-center">
          <Users className="mr-2 h-6 w-6 text-teal-600" />
          Advisor Profiles
        </h2>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowInvite(!showInvite)}
            className="border-teal-600 text-teal-600 hover:bg-teal-50"
          >
            <Mail className="mr-1 h-4 w-4" />
            Invite Advisor
          </Button>
          <Button 
            variant="default" 
            size="sm"
            onClick={handleCreateAdvisor}
            className="bg-teal-600 hover:bg-teal-700"
          >
            <UserCog className="mr-1 h-4 w-4" />
            Create New Advisor
          </Button>
        </div>
      </div>
      
      {showInvite && (
        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
          <h3 className="text-lg font-medium text-navy-800 mb-4">Invite an Advisor</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="inviteEmail" className="block text-sm font-medium text-navy-800 mb-1">
                Email Address
              </label>
              <input
                id="inviteEmail"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field w-full"
                placeholder="advisor@example.com"
              />
            </div>
            <div className="flex justify-end space-x-3">
              <Button 
                variant="outline" 
                onClick={() => setShowInvite(false)}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleInvite}
                disabled={!email.trim()}
                className="bg-teal-600 hover:bg-teal-700"
              >
                <UserPlus className="mr-2 h-4 w-4" />
                Send Invite
              </Button>
            </div>
          </div>
        </div>
      )}
      
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search advisors by name or expertise..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="divide-y divide-slate-100">
          {filteredAdvisors.length > 0 ? (
            filteredAdvisors.map(advisor => (
              <div key={advisor.id} className="p-4 hover:bg-slate-50 transition-colors">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    {advisor.profilePicture ? (
                      <img 
                        src={advisor.profilePicture} 
                        alt={advisor.name} 
                        className="w-12 h-12 rounded-full object-cover mr-4 border border-slate-200" 
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white text-lg font-medium mr-4">
                        {advisor.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <h3 className="font-medium text-navy-800">{advisor.name}</h3>
                      <p className="text-sm text-slate-600">{advisor.expertise.join(', ')}</p>
                      <div className="mt-1 flex items-center text-xs text-slate-500">
                        <User className="h-3 w-3 mr-1" />
                        <span className="mr-3">{advisor.organization}</span>
                        {advisor.isAccredited && (
                          <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs">
                            Accredited
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => navigate(`/advisor-profile?id=${advisor.id}`)}
                    className="text-teal-600 hover:text-teal-700 hover:bg-teal-50"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Profile
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-navy-800 mb-1">No Advisors Found</h3>
              <p className="text-slate-600 mb-4 max-w-md mx-auto">
                {searchQuery ? 'No advisors match your search criteria.' : 'You haven\'t added any advisors to your firm yet.'}
              </p>
              <Button onClick={handleCreateAdvisor} className="bg-teal-600 hover:bg-teal-700">
                <UserPlus className="mr-2 h-4 w-4" />
                {searchQuery ? 'Create New Advisor' : 'Create First Advisor'}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdvisorProfileManager;
