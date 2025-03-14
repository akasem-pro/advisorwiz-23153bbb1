
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '../ui/card';
import { LeadStats as LeadStatsType } from '../../types/leadTypes';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface LeadStatsProps {
  stats: LeadStatsType;
  className?: string;
}

const LeadStats: React.FC<LeadStatsProps> = ({ stats, className }) => {
  // Format status data for chart
  const statusData = Object.entries(stats.leadsByStatus || {}).map(([status, count]) => ({
    name: formatStatusName(status),
    value: count
  }));
  
  // Format source data for chart
  const sourceData = Object.entries(stats.leadsBySource || {}).map(([source, count]) => ({
    name: formatSourceName(source),
    value: count
  }));
  
  // Colors for pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#83a6ed'];

  return (
    <div className={className}>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3 mb-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">{stats.totalLeads}</CardTitle>
            <CardDescription>Total Leads</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">{stats.convertedLeads}</CardTitle>
            <CardDescription>Converted Leads</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">{stats.conversionRate.toFixed(1)}%</CardTitle>
            <CardDescription>Conversion Rate</CardDescription>
          </CardHeader>
        </Card>
      </div>
      
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        {/* Leads by status chart */}
        <Card>
          <CardHeader>
            <CardTitle>Leads by Status</CardTitle>
            <CardDescription>Distribution of leads across different stages</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              {statusData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={statusData} layout="vertical">
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip />
                    <Bar dataKey="value" fill="#0ea5e9" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-slate-500">
                  No data available
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        {/* Leads by source chart */}
        <Card>
          <CardHeader>
            <CardTitle>Leads by Source</CardTitle>
            <CardDescription>Where your leads are coming from</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              {sourceData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={sourceData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {sourceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-slate-500">
                  No data available
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Helper functions to format status and source names
const formatStatusName = (status: string): string => {
  switch (status) {
    case 'matched': return 'Matched';
    case 'contacted': return 'Contacted';
    case 'appointment_scheduled': return 'Meeting Scheduled';
    case 'appointment_completed': return 'Meeting Completed';
    case 'proposal_sent': return 'Proposal Sent';
    case 'converted': return 'Converted';
    case 'lost': return 'Lost';
    default: return status.replace('_', ' ');
  }
};

const formatSourceName = (source: string): string => {
  switch (source) {
    case 'platform_match': return 'Platform Match';
    case 'direct_search': return 'Direct Search';
    case 'referral': return 'Referral';
    case 'external': return 'External';
    default: return source.replace('_', ' ');
  }
};

export default LeadStats;
