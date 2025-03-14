
import React, { useState } from 'react';
import { useUser } from '../../context/UserContext';
import { Lead, LeadStatus } from '../../types/leadTypes';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { format } from 'date-fns';
import { formatCurrency } from '../../utils/formatters';
import LeadStatusBadge from './LeadStatusBadge';
import LeadStats from './LeadStats';

interface LeadManagementProps {
  className?: string;
}

const LeadManagement: React.FC<LeadManagementProps> = ({ className }) => {
  const { leads, updateLeadStatus, getAdvisorLeads, advisorProfile, getLeadStats } = useUser();
  const [activeTab, setActiveTab] = useState('all');
  
  if (!advisorProfile) {
    return <div>Loading...</div>;
  }
  
  const advisorLeads = getAdvisorLeads(advisorProfile.id);
  const leadStats = getLeadStats(advisorProfile.id);
  
  // Filter leads based on active tab
  const filteredLeads = activeTab === 'all' 
    ? advisorLeads 
    : advisorLeads.filter(lead => {
        if (activeTab === 'active') {
          return lead.status !== 'converted' && lead.status !== 'lost';
        }
        return lead.status === activeTab;
      });
  
  // Sort leads by most recent first
  const sortedLeads = [...filteredLeads].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  const handleStatusChange = (leadId: string, status: LeadStatus) => {
    updateLeadStatus(leadId, status);
  };

  return (
    <div className={className}>
      <div className="mb-6">
        <h1 className="text-2xl font-serif text-navy-900 mb-2">Lead Management</h1>
        <p className="text-slate-600">Track and manage your prospects from match to conversion.</p>
      </div>
      
      <LeadStats stats={leadStats} className="mb-6" />
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Leads ({advisorLeads.length})</TabsTrigger>
          <TabsTrigger value="active">Active ({leadStats.activeLeads})</TabsTrigger>
          <TabsTrigger value="converted">Converted ({leadStats.convertedLeads})</TabsTrigger>
          <TabsTrigger value="lost">Lost</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="mt-0">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Lead List</CardTitle>
            </CardHeader>
            <CardContent>
              {sortedLeads.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Consumer</TableHead>
                      <TableHead>Match Score</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedLeads.map((lead) => (
                      <LeadRow 
                        key={lead.id} 
                        lead={lead} 
                        onStatusChange={handleStatusChange} 
                      />
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8 text-slate-500">
                  No leads found in this category.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface LeadRowProps {
  lead: Lead;
  onStatusChange: (leadId: string, status: LeadStatus) => void;
}

const LeadRow: React.FC<LeadRowProps> = ({ lead, onStatusChange }) => {
  return (
    <TableRow>
      <TableCell className="font-medium">{lead.consumerName}</TableCell>
      <TableCell>
        <Badge variant={lead.matchScore > 70 ? "success" : "secondary"}>
          {lead.matchScore}%
        </Badge>
      </TableCell>
      <TableCell>
        <LeadStatusBadge status={lead.status} />
      </TableCell>
      <TableCell>{format(new Date(lead.updatedAt), 'MMM d, yyyy')}</TableCell>
      <TableCell>
        <Select 
          defaultValue={lead.status}
          onValueChange={(value) => onStatusChange(lead.id, value as LeadStatus)}
        >
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Update" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="matched">Matched</SelectItem>
            <SelectItem value="contacted">Contacted</SelectItem>
            <SelectItem value="appointment_scheduled">Meeting Scheduled</SelectItem>
            <SelectItem value="appointment_completed">Meeting Completed</SelectItem>
            <SelectItem value="proposal_sent">Proposal Sent</SelectItem>
            <SelectItem value="converted">Converted</SelectItem>
            <SelectItem value="lost">Lost</SelectItem>
          </SelectContent>
        </Select>
      </TableCell>
    </TableRow>
  );
};

export default LeadManagement;
