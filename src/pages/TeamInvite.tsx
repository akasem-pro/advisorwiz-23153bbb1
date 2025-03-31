
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { ArrowLeft, Mail } from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '../components/ui/card';
import PageSEO from '../components/seo/PageSEO';
import ConsistentContainer from '../components/ui/design-system/ConsistentContainer';
import AppLayout from '../components/layout/AppLayout';
import { toast } from 'sonner';

const TeamInvite: React.FC = () => {
  const navigate = useNavigate();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Invitation sent", {
      description: "An invitation email has been sent to the advisor"
    });
    navigate('/team');
  };
  
  return (
    <AppLayout>
      <PageSEO 
        title="Invite Team Member | AdvisorWiz"
        description="Invite a new advisor to join your team"
      />

      <ConsistentContainer className="px-4 py-8 pt-28">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/team')}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Team
          </Button>
          
          <h1 className="text-3xl font-bold text-navy-900 dark:text-white mb-2">Invite Team Member</h1>
          <p className="text-slate-600 dark:text-slate-300">Send an invitation to a new advisor to join your team</p>
        </div>
        
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>New Team Member</CardTitle>
            <CardDescription>Send an invitation via email</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                <input 
                  id="name" 
                  type="text" 
                  placeholder="John Smith" 
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                <input 
                  id="email" 
                  type="email" 
                  placeholder="advisor@example.com" 
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="role" className="text-sm font-medium">Role</label>
                <select 
                  id="role" 
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select a role</option>
                  <option value="Senior Advisor">Senior Advisor</option>
                  <option value="Financial Advisor">Financial Advisor</option>
                  <option value="Junior Advisor">Junior Advisor</option>
                  <option value="Specialist">Specialist</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">Personal Message (Optional)</label>
                <textarea 
                  id="message" 
                  placeholder="Join our team!" 
                  className="w-full p-2 border border-gray-300 rounded-md h-24"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700">
                <Mail className="mr-2 h-4 w-4" />
                Send Invitation
              </Button>
            </CardFooter>
          </form>
        </Card>
      </ConsistentContainer>
    </AppLayout>
  );
};

export default TeamInvite;
