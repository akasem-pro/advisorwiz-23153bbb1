
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Progress } from '../ui/progress';
import { Button } from '../ui/button';
import { supabase } from '../../integrations/supabase/client';

interface ExperimentData {
  experimentId: string;
  name: string;
  startDate: string;
  status: 'active' | 'completed' | 'draft';
  variants: {
    id: string;
    name: string;
    impressions: number;
    conversions: number;
    conversionRate: number;
  }[];
}

const ABTestDashboard: React.FC = () => {
  const [experiments, setExperiments] = useState<ExperimentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('active');

  useEffect(() => {
    // In a real app, this would fetch data from your analytics database
    const fetchExperiments = async () => {
      try {
        setLoading(true);
        
        // Example of how you might query this data from Supabase
        // This is simplified and would need to be adapted to your schema
        const { data, error } = await supabase
          .rpc('get_ab_test_results')
          .eq('status', activeTab);
          
        if (error) throw error;
        
        // For demo, using mock data
        const mockData: ExperimentData[] = [
          {
            experimentId: 'premium_promo_test',
            name: 'Premium Promotion Test',
            startDate: '2023-09-15',
            status: 'active',
            variants: [
              { 
                id: 'control', 
                name: 'Control',
                impressions: 543,
                conversions: 32,
                conversionRate: 5.89
              },
              { 
                id: 'variant_a', 
                name: 'Value Proposition',
                impressions: 278,
                conversions: 24,
                conversionRate: 8.63
              },
              { 
                id: 'variant_b', 
                name: 'Speed Focus',
                impressions: 262,
                conversions: 18,
                conversionRate: 6.87
              }
            ]
          },
          {
            experimentId: 'onboarding_flow_test',
            name: 'Onboarding Flow Test',
            startDate: '2023-10-01',
            status: 'active',
            variants: [
              { 
                id: 'control', 
                name: 'Standard Flow',
                impressions: 329,
                conversions: 210,
                conversionRate: 63.83
              },
              { 
                id: 'simplified', 
                name: 'Simplified Flow',
                impressions: 342,
                conversions: 245,
                conversionRate: 71.64
              }
            ]
          }
        ];
        
        setExperiments(mockData);
      } catch (error) {
        console.error('Error fetching A/B test data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchExperiments();
  }, [activeTab]);
  
  // Function to determine if a variant is winning
  const isWinningVariant = (experiment: ExperimentData, variantId: string) => {
    const variant = experiment.variants.find(v => v.id === variantId);
    if (!variant) return false;
    
    const highestRate = Math.max(...experiment.variants.map(v => v.conversionRate));
    return variant.conversionRate === highestRate && experiment.variants.length > 1;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">A/B Test Dashboard</h1>
        <Button>Create New Test</Button>
      </div>
      
      <Tabs defaultValue="active" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="active">Active Tests</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="draft">Drafts</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="space-y-4 mt-4">
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
            </div>
          ) : experiments.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No {activeTab} experiments found
            </div>
          ) : (
            experiments.map(experiment => (
              <Card key={experiment.experimentId} className="overflow-hidden">
                <CardHeader>
                  <CardTitle>{experiment.name}</CardTitle>
                  <CardDescription>
                    Started: {new Date(experiment.startDate).toLocaleDateString()} | 
                    Total Participants: {experiment.variants.reduce((sum, v) => sum + v.impressions, 0)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Variant</TableHead>
                        <TableHead className="text-right">Impressions</TableHead>
                        <TableHead className="text-right">Conversions</TableHead>
                        <TableHead className="text-right">Rate</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {experiment.variants.map(variant => (
                        <TableRow key={variant.id} className={isWinningVariant(experiment, variant.id) ? "bg-green-50 dark:bg-green-900/20" : ""}>
                          <TableCell className="font-medium">
                            {variant.name}
                            {isWinningVariant(experiment, variant.id) && (
                              <span className="ml-2 text-green-600 dark:text-green-400 text-xs font-bold">LEADING</span>
                            )}
                          </TableCell>
                          <TableCell className="text-right">{variant.impressions.toLocaleString()}</TableCell>
                          <TableCell className="text-right">{variant.conversions.toLocaleString()}</TableCell>
                          <TableCell className="text-right font-medium">
                            {variant.conversionRate.toFixed(2)}%
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  
                  <div className="mt-6 space-y-3">
                    <div className="text-sm font-medium">Conversion Rate Comparison</div>
                    {experiment.variants.map(variant => (
                      <div key={variant.id} className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>{variant.name}</span>
                          <span>{variant.conversionRate.toFixed(2)}%</span>
                        </div>
                        <Progress value={variant.conversionRate} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="bg-slate-50 dark:bg-slate-900/50 flex justify-between">
                  <Button variant="outline" size="sm">View Details</Button>
                  {experiment.status === 'active' && (
                    <Button size="sm">End Test</Button>
                  )}
                </CardFooter>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ABTestDashboard;
