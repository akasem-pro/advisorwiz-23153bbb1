
import React from 'react';
import { useAdvisors } from '../../hooks/useAdvisors';
import AdvisorProfileCard from '../matching/AdvisorProfileCard';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';

const AdvisorList: React.FC = () => {
  const { advisors, loading, error } = useAdvisors(6); // Limit to 6 advisors for home page
  const navigate = useNavigate();
  
  const handleContact = (advisorId: string) => {
    // For now, just navigate to the advisor profile
    navigate(`/advisor/${advisorId}`);
  };
  
  const handleSchedule = (advisorId: string) => {
    // For now, just navigate to the advisor profile
    navigate(`/advisor/${advisorId}/schedule`);
  };
  
  if (loading) {
    return (
      <div className="flex justify-center p-12">
        <Loader2 className="h-8 w-8 animate-spin text-teal-600" />
      </div>
    );
  }
  
  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Error</CardTitle>
          <CardDescription>Failed to load advisors</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-red-500">{error}</p>
          <Button 
            onClick={() => window.location.reload()} 
            className="mt-4"
          >
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }
  
  if (advisors.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Advisors Found</CardTitle>
          <CardDescription>There are no advisors available at this time.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Please check back later or adjust your search criteria.</p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {advisors.map(advisor => (
          <AdvisorProfileCard
            key={advisor.id}
            advisor={advisor}
            onContact={handleContact}
            onSchedule={handleSchedule}
          />
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <Button 
          onClick={() => navigate('/find-advisor')}
          className="bg-navy-600 hover:bg-navy-700"
        >
          View All Advisors
        </Button>
      </div>
    </div>
  );
};

export default AdvisorList;
