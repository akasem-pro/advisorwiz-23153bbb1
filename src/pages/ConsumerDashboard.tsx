
import React from 'react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Search, Calendar, MessageCircle, FileText, User } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import PageSEO from '../components/seo/PageSEO';

const ConsumerDashboard: React.FC = () => {
  const { consumerProfile } = useUser();
  const navigate = useNavigate();
  
  // Mock data for the dashboard
  const upcomingAppointments = [
    { id: 1, advisor: 'Sarah Johnson', date: '2023-09-15T14:00:00', topic: 'Retirement Planning' },
    { id: 2, advisor: 'Michael Chen', date: '2023-09-18T10:30:00', topic: 'Investment Portfolio Review' },
  ];
  
  const recommendedAdvisors = [
    { id: 1, name: 'Emily Williams', specialty: 'Retirement Planning', rating: 4.9, matchScore: 95 },
    { id: 2, name: 'David Martinez', specialty: 'Tax Planning', rating: 4.7, matchScore: 92 },
    { id: 3, name: 'Jennifer Lee', specialty: 'Estate Planning', rating: 4.8, matchScore: 90 },
  ];
  
  const recommendedResources = [
    { id: 1, title: 'Understanding Investment Risk', type: 'Article', time: '5 min read' },
    { id: 2, title: 'Retirement Planning Basics', type: 'Video', time: '12 min watch' },
    { id: 3, title: 'Tax Strategies for Investors', type: 'Guide', time: '15 min read' },
  ];

  return (
    <>
      <PageSEO 
        title="Consumer Dashboard | AdvisorWiz"
        description="Manage your financial advisor consultations, appointments, and discover resources to help with your financial planning needs."
        canonicalUrl="https://advisorwiz.com/consumer-dashboard"
      />
      
      <DashboardLayout 
        title="Welcome to Your Dashboard" 
        subtitle="Manage your financial journey and connect with advisors"
      >
        {/* Quick actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/matches')}>
            <div className="flex items-center">
              <div className="bg-teal-100 rounded-full p-3 mr-4">
                <Search className="h-6 w-6 text-teal-600" />
              </div>
              <div>
                <h3 className="font-medium text-navy-800">Find Advisor</h3>
                <p className="text-sm text-slate-500">Discover perfect matches</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/schedule')}>
            <div className="flex items-center">
              <div className="bg-blue-100 rounded-full p-3 mr-4">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-navy-800">Appointments</h3>
                <p className="text-sm text-slate-500">View upcoming meetings</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/chat')}>
            <div className="flex items-center">
              <div className="bg-purple-100 rounded-full p-3 mr-4">
                <MessageCircle className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-medium text-navy-800">Messages</h3>
                <p className="text-sm text-slate-500">Chat with advisors</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/consumer-profile')}>
            <div className="flex items-center">
              <div className="bg-amber-100 rounded-full p-3 mr-4">
                <User className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <h3 className="font-medium text-navy-800">My Profile</h3>
                <p className="text-sm text-slate-500">Update your preferences</p>
              </div>
            </div>
          </Card>
        </div>
        
        {/* Main dashboard sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upcoming appointments */}
          <Card className="p-6 col-span-1">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-navy-800">Upcoming Appointments</h2>
              <Button variant="outline" size="sm" onClick={() => navigate('/schedule')}>
                View All
              </Button>
            </div>
            
            <div className="space-y-4">
              {upcomingAppointments.length > 0 ? (
                upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="border border-slate-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-navy-700">{appointment.topic}</h3>
                      <span className="text-xs bg-teal-100 text-teal-800 px-2 py-1 rounded-full">
                        Upcoming
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 mb-2">
                      With <span className="font-medium">{appointment.advisor}</span>
                    </p>
                    <p className="text-sm text-slate-500">
                      {new Date(appointment.date).toLocaleString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit'
                      })}
                    </p>
                    <div className="mt-3 flex space-x-2">
                      <Button variant="outline" size="sm" className="w-full">
                        Reschedule
                      </Button>
                      <Button variant="outline" size="sm" className="w-full">
                        Cancel
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6">
                  <Calendar className="h-12 w-12 mx-auto text-slate-300 mb-2" />
                  <h3 className="font-medium text-navy-800 mb-1">No Appointments</h3>
                  <p className="text-sm text-slate-500 mb-4">
                    You don't have any upcoming appointments.
                  </p>
                  <Button onClick={() => navigate('/matches')}>Find an Advisor</Button>
                </div>
              )}
            </div>
          </Card>
          
          {/* Advisor recommendations */}
          <Card className="p-6 col-span-1">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-navy-800">Recommended Advisors</h2>
              <Button variant="outline" size="sm" onClick={() => navigate('/matches')}>
                View All
              </Button>
            </div>
            
            <div className="space-y-4">
              {recommendedAdvisors.map((advisor) => (
                <div key={advisor.id} className="border border-slate-200 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <div className="w-10 h-10 bg-slate-200 rounded-full mr-3 flex items-center justify-center font-medium text-navy-700">
                      {advisor.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-medium text-navy-700">{advisor.name}</h3>
                      <p className="text-xs text-slate-500">{advisor.specialty}</p>
                    </div>
                    <div className="ml-auto px-2 py-1 bg-teal-50 rounded-full text-xs font-medium text-teal-700">
                      {advisor.matchScore}% Match
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm text-slate-600 ml-1">{advisor.rating}</span>
                    </div>
                    <Button size="sm">View Profile</Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          
          {/* Recommended resources */}
          <Card className="p-6 col-span-1">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-navy-800">Recommended Resources</h2>
              <Button variant="outline" size="sm" onClick={() => navigate('/resources')}>
                View All
              </Button>
            </div>
            
            <div className="space-y-4">
              {recommendedResources.map((resource) => (
                <div key={resource.id} className="border border-slate-200 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <div className="bg-blue-100 rounded-full p-2 mr-3">
                      <FileText className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-navy-700">{resource.title}</h3>
                      <p className="text-xs text-slate-500">{resource.type} • {resource.time}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-2">
                    Read Now
                  </Button>
                </div>
              ))}
              
              <div className="mt-4">
                <Button variant="ghost" className="w-full text-teal-600 hover:text-teal-800">
                  Browse More Resources
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </DashboardLayout>
    </>
  );
};

export default ConsumerDashboard;
