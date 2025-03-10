
import React from 'react';
import { CallMetrics } from '../../types/callTypes';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
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

interface CallMetricsDisplayProps {
  metrics: CallMetrics[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const CallMetricsDisplay: React.FC<CallMetricsDisplayProps> = ({ metrics }) => {
  if (!metrics.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Call Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No call data available yet.</p>
        </CardContent>
      </Card>
    );
  }
  
  // Calculate total metrics across all contacts
  const totalCalls = metrics.reduce((sum, m) => sum + m.totalCalls, 0);
  const totalDuration = metrics.reduce((sum, m) => sum + m.totalDuration, 0);
  const avgCallDuration = totalCalls > 0 ? Math.round(totalDuration / totalCalls) : 0;
  
  // Generate data for charts
  const callTypeData = [
    { name: 'Audio', value: metrics.reduce((sum, m) => sum + m.callTypes.audio, 0) },
    { name: 'Video', value: metrics.reduce((sum, m) => sum + m.callTypes.video, 0) }
  ];
  
  const callOutcomeData = [
    { name: 'Completed', value: metrics.reduce((sum, m) => sum + m.callOutcomes.completed, 0) },
    { name: 'Missed', value: metrics.reduce((sum, m) => sum + m.callOutcomes.missed, 0) },
    { name: 'Declined', value: metrics.reduce((sum, m) => sum + m.callOutcomes.declined, 0) }
  ];
  
  // Format duration
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    
    return [
      hours > 0 ? `${hours}h` : '',
      minutes > 0 ? `${minutes}m` : '',
      `${remainingSeconds}s`
    ].filter(Boolean).join(' ');
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Call Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col gap-2">
              <span className="text-sm text-muted-foreground">Total Calls</span>
              <span className="text-2xl font-bold">{totalCalls}</span>
            </div>
            
            <div className="flex flex-col gap-2">
              <span className="text-sm text-muted-foreground">Total Duration</span>
              <span className="text-2xl font-bold">{formatTime(totalDuration)}</span>
            </div>
            
            <div className="flex flex-col gap-2">
              <span className="text-sm text-muted-foreground">Average Call</span>
              <span className="text-2xl font-bold">{formatTime(avgCallDuration)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Call Type Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Call Types</CardTitle>
          </CardHeader>
          <CardContent className="h-64 flex flex-col justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={callTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {callTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} calls`, 'Count']} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        {/* Call Outcomes */}
        <Card>
          <CardHeader>
            <CardTitle>Call Outcomes</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={callOutcomeData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value} calls`, 'Count']} />
                <Bar dataKey="value" fill="#8884d8">
                  {callOutcomeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      {/* Call Details Per Contact */}
      <Card>
        <CardHeader>
          <CardTitle>Call Details by Contact</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {metrics.map((metric, index) => (
              <div key={index} className="border-b pb-4 last:border-b-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">Consumer ID: {metric.consumerId}</h4>
                    <p className="text-sm text-muted-foreground">
                      Last interaction: {formatDistanceToNow(new Date(metric.lastInteraction))} ago
                    </p>
                  </div>
                  <Badge>{metric.totalCalls} calls</Badge>
                </div>
                
                <div className="mt-2 space-y-2">
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Call Completion Rate</span>
                      <span>
                        {metric.totalCalls > 0 
                          ? Math.round((metric.callOutcomes.completed / metric.totalCalls) * 100) 
                          : 0}%
                      </span>
                    </div>
                    <Progress 
                      value={metric.totalCalls > 0 
                        ? (metric.callOutcomes.completed / metric.totalCalls) * 100 
                        : 0
                      } 
                      className="h-2 mt-1"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Audio Calls:</span> {metric.callTypes.audio}
                    </div>
                    <div>
                      <span className="text-muted-foreground">Video Calls:</span> {metric.callTypes.video}
                    </div>
                    <div>
                      <span className="text-muted-foreground">Total Duration:</span> {formatTime(metric.totalDuration)}
                    </div>
                    <div>
                      <span className="text-muted-foreground">Avg. Duration:</span> {formatTime(metric.averageCallDuration)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CallMetricsDisplay;
