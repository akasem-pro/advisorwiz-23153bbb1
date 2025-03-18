
import React from 'react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { 
  Users, 
  Calendar, 
  BarChart3, 
  Building, 
  DollarSign, 
  TrendingUp, 
  UserPlus,
  Download,
  Filter
} from 'lucide-react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import PageSEO from '../components/seo/PageSEO';

const FirmDashboard: React.FC = () => {
  const { firms } = useUser();
  const navigate = useNavigate();
  
  // For demo purposes, we'll just use the first firm in the list
  const currentFirm = firms && firms.length > 0 ? firms[0] : null;
  
  // Mock data for the dashboard
  const advisorTeam = [
    { 
      id: 1, 
      name: 'Jennifer Reynolds', 
      position: 'Senior Advisor',
      clients: 28,
      leadConversion: 34,
      rating: 4.9
    },
    { 
      id: 2, 
      name: 'Mark Davidson', 
      position: 'Retirement Specialist',
      clients: 22,
      leadConversion: 28,
      rating: 4.7
    },
    { 
      id: 3, 
      name: 'Samantha Chen', 
      position: 'Investment Advisor',
      clients: 19,
      leadConversion: 31,
      rating: 4.8
    },
    { 
      id: 4, 
      name: 'Robert Wilson', 
      position: 'Tax Planning Specialist',
      clients: 24,
      leadConversion: 26,
      rating: 4.6
    },
  ];
  
  const recentLeads = [
    { 
      id: 1, 
      consumer: 'Thomas Wilson', 
      matchScore: 95, 
      assignedTo: 'Jennifer Reynolds',
      date: '2023-09-10',
      status: 'new'
    },
    { 
      id: 2, 
      consumer: 'Laura Johnson', 
      matchScore: 88, 
      assignedTo: 'Mark Davidson',
      date: '2023-09-09',
      status: 'contacted'
    },
    { 
      id: 3, 
      consumer: 'Daniel Lee', 
      matchScore: 92, 
      assignedTo: null,
      date: '2023-09-08',
      status: 'unassigned'
    },
  ];
  
  const firmMetrics = {
    totalAdvisors: 12,
    totalClients: 345,
    activeLeads: 42,
    leadConversionRate: 32,
    monthlyRevenue: 48500,
    growthRate: 8.5
  };

  return (
    <>
      <PageSEO 
        title="Firm Dashboard | AdvisorWiz"
        description="Manage your financial advisory firm, monitor advisor performance, and optimize lead distribution with the AdvisorWiz firm dashboard."
        canonicalUrl="https://advisorwiz.com/firm-dashboard"
      />
      
      <DashboardLayout 
        title={`${currentFirm?.name || 'Firm'} Dashboard`} 
        subtitle="Manage your advisory team and monitor performance"
      >
        {/* Summary stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4">
            <div className="flex items-center">
              <div className="bg-teal-100 rounded-full p-3 mr-4">
                <Users className="h-6 w-6 text-teal-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Total Advisors</p>
                <h3 className="text-xl font-semibold text-navy-800">{firmMetrics.totalAdvisors}</h3>
                <p className="text-xs text-teal-600">↑ 2 this quarter</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center">
              <div className="bg-blue-100 rounded-full p-3 mr-4">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Total Clients</p>
                <h3 className="text-xl font-semibold text-navy-800">{firmMetrics.totalClients}</h3>
                <p className="text-xs text-teal-600">↑ 12 this month</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center">
              <div className="bg-purple-100 rounded-full p-3 mr-4">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Lead Conversion</p>
                <h3 className="text-xl font-semibold text-navy-800">{firmMetrics.leadConversionRate}%</h3>
                <p className="text-xs text-teal-600">↑ 3.2% vs last month</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center">
              <div className="bg-amber-100 rounded-full p-3 mr-4">
                <DollarSign className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Monthly Revenue</p>
                <h3 className="text-xl font-semibold text-navy-800">${(firmMetrics.monthlyRevenue / 1000).toFixed(1)}k</h3>
                <p className="text-xs text-teal-600">↑ {firmMetrics.growthRate}% this month</p>
              </div>
            </div>
          </Card>
        </div>
        
        {/* Quick actions */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Button onClick={() => navigate('/team')}>
            <UserPlus className="mr-2 h-4 w-4" />
            Add Advisor
          </Button>
          <Button variant="outline" onClick={() => navigate('/firm-profile')}>
            <Building className="mr-2 h-4 w-4" />
            Update Firm Profile
          </Button>
          <Button variant="outline" onClick={() => navigate('/analytics')}>
            <BarChart3 className="mr-2 h-4 w-4" />
            Analytics Report
          </Button>
          <Button variant="outline" onClick={() => {}}>
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>
        
        {/* Main dashboard sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Advisor Performance */}
          <Card className="p-6 col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-navy-800">Advisor Performance</h2>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-1" />
                  Filter
                </Button>
                <Button variant="outline" size="sm" onClick={() => navigate('/team')}>
                  View All
                </Button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Advisor
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Position
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Clients
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Conversion
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Rating
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {advisorTeam.map((advisor) => (
                    <tr key={advisor.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-slate-200 rounded-full flex items-center justify-center text-navy-700 font-medium">
                            {advisor.name.charAt(0)}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-navy-800">{advisor.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-slate-500">{advisor.position}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-navy-800">{advisor.clients}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-navy-800">{advisor.leadConversion}%</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-sm text-navy-800 mr-1">{advisor.rating}</span>
                          <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Button size="sm" variant="ghost" className="text-teal-600 hover:text-teal-800">
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
          
          {/* Lead Distribution */}
          <Card className="p-6 col-span-1">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-navy-800">Lead Distribution</h2>
              <Button variant="outline" size="sm" onClick={() => navigate('/leads')}>
                View All
              </Button>
            </div>
            
            <div className="space-y-4">
              {recentLeads.map((lead) => (
                <div key={lead.id} className="border border-slate-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-navy-700">{lead.consumer}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      lead.status === 'new' 
                        ? 'bg-blue-100 text-blue-800' 
                        : lead.status === 'contacted'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-amber-100 text-amber-800'
                    }`}>
                      {lead.status === 'new' 
                        ? 'New' 
                        : lead.status === 'contacted'
                          ? 'Contacted'
                          : 'Unassigned'
                      }
                    </span>
                  </div>
                  <div className="flex items-center text-xs text-slate-500 mb-2">
                    <span className="bg-teal-50 text-teal-700 rounded-full px-2 py-1 mr-2">
                      {lead.matchScore}% Match
                    </span>
                    <span>{lead.date}</span>
                  </div>
                  {lead.assignedTo ? (
                    <p className="text-sm text-slate-600 mb-3">
                      Assigned to <span className="font-medium">{lead.assignedTo}</span>
                    </p>
                  ) : (
                    <p className="text-sm text-amber-600 mb-3">
                      Needs assignment
                    </p>
                  )}
                  <div className="flex space-x-2">
                    {!lead.assignedTo ? (
                      <Button size="sm" className="w-full">
                        Assign Lead
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm" className="w-full">
                        Reassign
                      </Button>
                    )}
                    <Button variant="outline" size="sm" className="w-full">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
              
              <div className="text-center mt-2">
                <Button variant="ghost" className="w-full text-teal-600 hover:text-teal-800">
                  View All Leads
                </Button>
              </div>
            </div>
          </Card>
        </div>
        
        {/* Compliance and Licensing Section */}
        <div className="mt-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-navy-800">Compliance & Licensing</h2>
              <Button variant="outline" size="sm">
                View All Records
              </Button>
            </div>
            
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
              <div className="flex items-start">
                <div className="bg-amber-100 rounded-full p-2 mr-3">
                  <svg className="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-amber-800">Attention Required</h3>
                  <p className="text-xs text-amber-700 mt-1">
                    3 advisors have licenses expiring in the next 30 days.
                  </p>
                </div>
                <Button size="sm" variant="outline" className="ml-auto">
                  Review
                </Button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Advisor
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      License Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Expiration
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-navy-800">Jennifer Reynolds</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-500">Series 7</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                        Expiring Soon
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      Oct 12, 2023
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Button size="sm" variant="ghost" className="text-teal-600 hover:text-teal-800">
                        Send Reminder
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-navy-800">Mark Davidson</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-500">Series 66</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      Mar 28, 2024
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Button size="sm" variant="ghost" className="text-teal-600 hover:text-teal-800">
                        View Details
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-navy-800">Samantha Chen</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-500">CFP</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-amber-100 text-amber-800">
                        Renewal Needed
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      Sep 25, 2023
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Button size="sm" variant="ghost" className="text-teal-600 hover:text-teal-800">
                        Send Reminder
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </DashboardLayout>
    </>
  );
};

export default FirmDashboard;
