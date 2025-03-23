
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { toast } from 'sonner';
import { trackUserBehavior } from '../../utils/analytics/eventTracker';
import { UserBehaviorEvent } from '../../utils/analytics/types';

interface BetaTesterInvitationProps {
  userId?: string;
  onClose: () => void;
}

const BetaTesterInvitation: React.FC<BetaTesterInvitationProps> = ({ 
  userId,
  onClose 
}) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Track the beta program opt-in
      await trackUserBehavior('beta_program_opt_in', userId, {
        email: email
      });
      
      // In a real implementation, you would send this to your backend
      console.log('Beta tester sign up:', {
        userId,
        email
      });
      
      toast.success('Thanks for joining our beta program!', {
        description: 'We\'ll be in touch soon with exclusive access to new features.'
      });
      
      onClose();
    } catch (error) {
      toast.error('Unable to join beta program', {
        description: 'Please try again later.'
      });
      console.error('Error joining beta program:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Join Our Beta Program</CardTitle>
        <CardDescription>
          Get early access to new features and help shape the future of AdvisorWiz.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
      
          <CardFooter className="px-0 pt-4">
            <Button 
              type="submit" 
              className="w-full bg-teal-600 hover:bg-teal-700 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Join Beta Program'}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

export default BetaTesterInvitation;
