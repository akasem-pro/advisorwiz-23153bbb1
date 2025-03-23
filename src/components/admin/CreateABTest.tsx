
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, Form } from '../ui/form';
import { Slider } from '../ui/slider';
import { useForm } from 'react-hook-form';
import { Plus, Trash } from 'lucide-react';
import { toast } from 'sonner';

interface Variant {
  id: string;
  name: string;
  description: string;
  weight: number;
}

interface TestForm {
  name: string;
  description: string;
  goal: string;
  targetAudience: 'all' | 'authenticated' | 'advisors' | 'consumers';
  successMetric: 'click' | 'signup' | 'purchase' | 'custom';
  customMetric?: string;
  variants: Variant[];
}

const CreateABTest: React.FC = () => {
  const form = useForm<TestForm>({
    defaultValues: {
      name: '',
      description: '',
      goal: '',
      targetAudience: 'all',
      successMetric: 'click',
      variants: [
        { id: 'control', name: 'Control', description: '', weight: 50 },
        { id: 'variant-a', name: 'Variant A', description: '', weight: 50 }
      ]
    }
  });
  
  const [activeTab, setActiveTab] = useState('setup');

  const handleAddVariant = () => {
    const variants = form.getValues('variants');
    const nextId = `variant-${String.fromCharCode(97 + variants.length)}`;
    
    form.setValue('variants', [
      ...variants, 
      { 
        id: nextId, 
        name: `Variant ${String.fromCharCode(65 + variants.length)}`, 
        description: '', 
        weight: 100 / (variants.length + 1) 
      }
    ]);
    
    // Rebalance weights
    const newVariants = form.getValues('variants');
    const evenWeight = 100 / newVariants.length;
    form.setValue('variants', newVariants.map(v => ({ ...v, weight: evenWeight })));
  };
  
  const handleRemoveVariant = (index: number) => {
    const variants = form.getValues('variants');
    if (variants.length <= 2) {
      toast.error("You must have at least two variants");
      return;
    }
    
    const newVariants = variants.filter((_, i) => i !== index);
    form.setValue('variants', newVariants);
    
    // Rebalance weights
    const evenWeight = 100 / newVariants.length;
    form.setValue('variants', newVariants.map(v => ({ ...v, weight: evenWeight })));
  };
  
  const handleWeightChange = (index: number, value: number[]) => {
    const variants = [...form.getValues('variants')];
    variants[index].weight = value[0];
    
    // Ensure weights sum to 100%
    const sum = variants.reduce((acc, v) => acc + v.weight, 0);
    if (sum !== 100) {
      // Adjust other weights proportionally
      const adjustment = (100 - variants[index].weight) / (variants.length - 1);
      variants.forEach((v, i) => {
        if (i !== index) {
          v.weight = adjustment;
        }
      });
    }
    
    form.setValue('variants', variants);
  };
  
  const onSubmit = (data: TestForm) => {
    // In a real app, this would save to the database
    console.log('Submitting test:', data);
    toast.success("A/B Test Created", {
      description: `${data.name} has been created and is ready to launch`
    });
  };

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Create A/B Test</CardTitle>
        <CardDescription>
          Set up a new A/B test to optimize your user experience or marketing campaigns
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="setup">Basic Setup</TabsTrigger>
                <TabsTrigger value="variants">Variants</TabsTrigger>
                <TabsTrigger value="targeting">Targeting</TabsTrigger>
                <TabsTrigger value="goals">Goals</TabsTrigger>
              </TabsList>
              
              <TabsContent value="setup" className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Test Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Homepage Hero Test" {...field} />
                      </FormControl>
                      <FormDescription>
                        A descriptive name for your test
                      </FormDescription>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="What are you testing and why?" 
                          rows={3}
                          {...field} 
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </TabsContent>
              
              <TabsContent value="variants" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Test Variants</h3>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={handleAddVariant}
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add Variant
                  </Button>
                </div>
                
                {form.watch('variants').map((variant, index) => (
                  <div key={variant.id} className="p-4 border rounded-md space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">{variant.name}</h4>
                      {index > 0 && (
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleRemoveVariant(index)}
                        >
                          <Trash className="h-4 w-4 text-red-500" />
                        </Button>
                      )}
                    </div>
                    
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <Label htmlFor={`variant-name-${index}`}>Variant Name</Label>
                        <Input
                          id={`variant-name-${index}`}
                          value={variant.name}
                          onChange={(e) => {
                            const newVariants = [...form.getValues('variants')];
                            newVariants[index].name = e.target.value;
                            form.setValue('variants', newVariants);
                          }}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor={`variant-id-${index}`}>Variant ID</Label>
                        <Input
                          id={`variant-id-${index}`}
                          value={variant.id}
                          onChange={(e) => {
                            const newVariants = [...form.getValues('variants')];
                            newVariants[index].id = e.target.value;
                            form.setValue('variants', newVariants);
                          }}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor={`variant-description-${index}`}>Description</Label>
                      <Textarea
                        id={`variant-description-${index}`}
                        rows={2}
                        value={variant.description}
                        onChange={(e) => {
                          const newVariants = [...form.getValues('variants')];
                          newVariants[index].description = e.target.value;
                          form.setValue('variants', newVariants);
                        }}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>Traffic Weight</Label>
                        <span className="text-sm">{variant.weight}%</span>
                      </div>
                      <Slider
                        value={[variant.weight]}
                        min={5}
                        max={95}
                        step={5}
                        onValueChange={(values) => handleWeightChange(index, values)}
                      />
                    </div>
                  </div>
                ))}
              </TabsContent>
              
              <TabsContent value="targeting" className="space-y-4">
                <FormField
                  control={form.control}
                  name="targetAudience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Target Audience</FormLabel>
                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          type="button"
                          variant={field.value === 'all' ? 'default' : 'outline'}
                          className="justify-start"
                          onClick={() => field.onChange('all')}
                        >
                          All Visitors
                        </Button>
                        <Button
                          type="button"
                          variant={field.value === 'authenticated' ? 'default' : 'outline'}
                          className="justify-start"
                          onClick={() => field.onChange('authenticated')}
                        >
                          Authenticated Users
                        </Button>
                        <Button
                          type="button"
                          variant={field.value === 'advisors' ? 'default' : 'outline'}
                          className="justify-start"
                          onClick={() => field.onChange('advisors')}
                        >
                          Advisors
                        </Button>
                        <Button
                          type="button"
                          variant={field.value === 'consumers' ? 'default' : 'outline'}
                          className="justify-start"
                          onClick={() => field.onChange('consumers')}
                        >
                          Consumers
                        </Button>
                      </div>
                    </FormItem>
                  )}
                />
                
                <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-md">
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Advanced targeting options like geographic location, device type, and custom segments are available in the full version.
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="goals" className="space-y-4">
                <FormField
                  control={form.control}
                  name="goal"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Test Goal</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="What outcome are you hoping to improve?" 
                          rows={3}
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Clearly define what you want to achieve with this test
                      </FormDescription>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="successMetric"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Success Metric</FormLabel>
                      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                        <Button
                          type="button"
                          variant={field.value === 'click' ? 'default' : 'outline'}
                          className="justify-start"
                          onClick={() => field.onChange('click')}
                        >
                          Click
                        </Button>
                        <Button
                          type="button"
                          variant={field.value === 'signup' ? 'default' : 'outline'}
                          className="justify-start"
                          onClick={() => field.onChange('signup')}
                        >
                          Sign Up
                        </Button>
                        <Button
                          type="button"
                          variant={field.value === 'purchase' ? 'default' : 'outline'}
                          className="justify-start"
                          onClick={() => field.onChange('purchase')}
                        >
                          Purchase
                        </Button>
                        <Button
                          type="button"
                          variant={field.value === 'custom' ? 'default' : 'outline'}
                          className="justify-start"
                          onClick={() => field.onChange('custom')}
                        >
                          Custom
                        </Button>
                      </div>
                      {field.value === 'custom' && (
                        <Input 
                          placeholder="Enter custom metric name"
                          className="mt-2"
                          {...form.register('customMetric')}
                        />
                      )}
                    </FormItem>
                  )}
                />
              </TabsContent>
            </Tabs>
            
            <div className="flex justify-between">
              {activeTab !== 'setup' && (
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => {
                    const tabs = ['setup', 'variants', 'targeting', 'goals'];
                    const currentIndex = tabs.indexOf(activeTab);
                    if (currentIndex > 0) {
                      setActiveTab(tabs[currentIndex - 1]);
                    }
                  }}
                >
                  Previous
                </Button>
              )}
              
              {activeTab !== 'goals' ? (
                <Button 
                  type="button"
                  onClick={() => {
                    const tabs = ['setup', 'variants', 'targeting', 'goals'];
                    const currentIndex = tabs.indexOf(activeTab);
                    if (currentIndex < tabs.length - 1) {
                      setActiveTab(tabs[currentIndex + 1]);
                    }
                  }}
                  className="ml-auto"
                >
                  Next
                </Button>
              ) : (
                <Button type="submit" className="ml-auto">
                  Create Test
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreateABTest;
