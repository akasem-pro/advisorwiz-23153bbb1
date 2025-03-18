
import React from 'react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Users, Calendar, MessageCircle, BarChart3, User, DollarSign, TrendingUp, Bell } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import PageSEO from '../components/seo/PageSEO';

// You would typically get this from your API
const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 18) return 'Good Afternoon';
  return 'Good Evening';
};

const AdvisorDashboard: React.FC = () => {
  const { advisorProfile } = useUser();
  const navigate = useNavigate();
  
  // Mock data for the dashboard
  const upcomingAppointments = [
    { 
      id: 1, 
      client: 'Robert Smith', 
      date: '2023-09-15T14:00:00', 
      topic: 'Retirement Planning',
      status: 'confirmed' 
    },
    { 
      id: 2, 
      client: 'Jessica Brown', 
      date: '2023-09-18T10:30:00', 
      topic: 'Investment Portfolio Review',
      status: 'pending' 
    },
  ];
  
  const recentLeads = [
    { 
      id: 1, 
      name: 'Thomas Wilson', 
      matchScore: 95,
      interests: 'Retirement, Investment', 
      date: '2023-09-10T09:15:00',
      status: 'new'
    },
    { 
      id: 2, 
      name: 'Laura Johnson', 
      matchScore: 88,
      interests: 'Tax Planning, Estate', 
      date: '2023-09-09T16:45:00',
      status: 'contacted'
    },
    { 
      id: 3, 
      name: 'Daniel Lee', 
      matchScore: 92,
      interests: 'Business, Retirement', 
      date: '2023-09-08T11:20:00',
      status: 'new'
    },
  ];
  
  const performanceMetrics = {
    profileViews: {
      value: 248,
      change: 12.5,
      period: 'vs. last week'
    },
    responseRate: {
      value: 92,
      change: 3.2,
      period: 'vs. last week'
    },
    conversionRate: {
      value: 28,
      change: -2.1,
      period: 'vs. last week'
    },
    averageRating: {
      value: 4.8,
      change: 0.2,
      period: 'vs. last month'
    }
  };

  return (
    <>
      <PageSEO 
        title="Advisor Dashboard | AdvisorWiz"
        description="Manage your client relationships, track leads, and monitor your performance metrics as a financial advisor."
        canonicalUrl="https://advisorwiz.com/advisor-dashboard"
      />
      
      <DashboardLayout 
        title={`${getGreeting()}, ${advisorProfile?.name || 'Advisor'}`} 
        subtitle="Here's an overview of your advisor activity"
      >
        {/* Summary stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4">
            <div className="flex items-center">
              <div className="bg-teal-100 rounded-full p-3 mr-4">
                <Users className="h-6 w-6 text-teal-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Total Leads</p>
                <h3 className="text-xl font-semibold text-navy-800">42</h3>
                <p className="text-xs text-green-600">↑ 8% this week</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center">
              <div className="bg-blue-100 rounded-full p-3 mr-4">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Scheduled Calls</p>
                <h3 className="text-xl font-semibold text-navy-800">12</h3>
                <p className="text-xs text-green-600">↑ 2 from last week</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center">
              <div className="bg-purple-100 rounded-full p-3 mr-4">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Conversion Rate</p>
                <h3 className="text-xl font-semibold text-navy-800">28%</h3>
                <p className="text-xs text-red-600">↓ 2.1% this week</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center">
              <div className="bg-amber-100 rounded-full p-3 mr-4">
                <DollarSign className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Projected Revenue</p>
                <h3 className="text-xl font-semibold text-navy-800">$18.5k</h3>
                <p className="text-xs text-green-600">↑ $2.3k this month</p>
              </div>
            </div>
          </Card>
        </div>
        
        {/* Quick actions */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Button onClick={() => navigate('/advisor-profile')}>
            <User className="mr-2 h-4 w-4" />
            Update Profile
          </Button>
          <Button variant="outline" onClick={() => navigate('/schedule')}>
            <Calendar className="mr-2 h-4 w-4" />
            Manage Calendar
          </Button>
          <Button variant="outline" onClick={() => navigate('/leads')}>
            <Users className="mr-2 h-4 w-4" />
            View All Leads
          </Button>
          <Button variant="outline" onClick={() => navigate('/analytics')}>
            <BarChart3 className="mr-2 h-4 w-4" />
            Full Analytics
          </Button>
        </div>
        
        {/* Main dashboard sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upcoming appointments */}
          <Card className="p-6 col-span-1">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-navy-800">Upcoming Appointments</h2>
              <Button variant="outline" size="sm" onClick={() => navigate('/schedule')}>
                View Calendar
              </Button>
            </div>
            
            <div className="space-y-4">
              {upcomingAppointments.length > 0 ? (
                upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="border border-slate-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-navy-700">{appointment.topic}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        appointment.status === 'confirmed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {appointment.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 mb-2">
                      With <span className="font-medium">{appointment.client}</span>
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
                      <Button variant="default" size="sm" className="w-full">
                        Join Meeting
                      </Button>
                      <Button variant="outline" size="sm" className="w-full">
                        Reschedule
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6">
                  <Calendar className="h-12 w-12 mx-auto text-slate-300 mb-2" />
                  <h3 className="font-medium text-navy-800 mb-1">No Appointments</h3>
                  <p className="text-sm text-slate-500 mb-4">
                    You have no upcoming appointments.
                  </p>
                  <Button onClick={() => navigate('/schedule')}>Update Availability</Button>
                </div>
              )}
            </div>
          </Card>
          
          {/* Latest Leads */}
          <Card className="p-6 col-span-1">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-navy-800">Recent Leads</h2>
              <Button variant="outline" size="sm" onClick={() => navigate('/leads')}>
                View All Leads
              </Button>
            </div>
            
            <div className="space-y-4">
              {recentLeads.map((lead) => (
                <div key={lead.id} className="border border-slate-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-slate-200 rounded-full mr-3 flex items-center justify-center font-medium text-navy-700">
                        {lead.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-medium text-navy-700">{lead.name}</h3>
                        <p className="text-xs text-slate-500">{lead.interests}</p>
                      </div>
                    </div>
                    <span className={`ml-auto px-2 py-1 rounded-full text-xs font-medium ${
                      lead.status === 'new' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {lead.status === 'new' ? 'New' : 'Contacted'}
                    </span>
                  </div>
                  <div className="flex items-center text-xs text-slate-500 mb-3">
                    <span className="bg-teal-50 text-teal-700 rounded-full px-2 py-1 mr-2">
                      {lead.matchScore}% Match
                    </span>
                    <span>
                      {new Date(lead.date).toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" className="w-full">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      Message
                    </Button>
                    <Button variant="outline" size="sm" className="w-full">
                      View Profile
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          
          {/* Performance Metrics */}
          <Card className="p-6 col-span-1">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-navy-800">Performance Overview</h2>
              <Button variant="outline" size="sm" onClick={() => navigate('/analytics')}>
                Full Analytics
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="border border-slate-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-navy-700">Profile Views</h3>
                  <span className={`text-xs ${performanceMetrics.profileViews.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {performanceMetrics.profileViews.change >= 0 ? '↑' : '↓'} {Math.abs(performanceMetrics.profileViews.change)}% {performanceMetrics.profileViews.period}
                  </span>
                </div>
                <div className="flex items-end">
                  <span className="text-2xl font-semibold text-navy-800">{performanceMetrics.profileViews.value}</span>
                  <span className="text-sm text-slate-500 ml-2 mb-1">views</span>
                </div>
                {/* This would be a chart component in a real app */}
                <div className="h-8 bg-slate-100 rounded-lg mt-2"></div>
              </div>
              
              <div className="border border-slate-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-navy-700">Response Rate</h3>
                  <span className={`text-xs ${performanceMetrics.responseRate.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {performanceMetrics.responseRate.change >= 0 ? '↑' : '↓'} {Math.abs(performanceMetrics.responseRate.change)}% {performanceMetrics.responseRate.period}
                  </span>
                </div>
                <div className="flex items-end">
                  <span className="text-2xl font-semibold text-navy-800">{performanceMetrics.responseRate.value}%</span>
                </div>
                {/* This would be a chart component in a real app */}
                <div className="h-8 bg-slate-100 rounded-lg mt-2"></div>
              </div>
              
              <div className="border border-slate-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-navy-700">Conversion Rate</h3>
                  <span className={`text-xs ${performanceMetrics.conversionRate.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {performanceMetrics.conversionRate.change >= 0 ? '↑' : '↓'} {Math.abs(performanceMetrics.conversionRate.change)}% {performanceMetrics.conversionRate.period}
                  </span>
                </div>
                <div className="flex items-end">
                  <span className="text-2xl font-semibold text-navy-800">{performanceMetrics.conversionRate.value}%</span>
                </div>
                {/* This would be a chart component in a real app */}
                <div className="h-8 bg-slate-100 rounded-lg mt-2"></div>
              </div>
              
              <div className="text-center mt-2">
                <Button variant="ghost" className="w-full text-teal-600 hover:text-teal-800">
                  <BarChart3 className="h-4 w-4 mr-1" />
                  View Detailed Analytics
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </DashboardLayout>
    </>
  );
};

export default AdvisorDashboard;
