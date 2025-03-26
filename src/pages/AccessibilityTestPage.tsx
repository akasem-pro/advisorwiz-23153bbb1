
import React, { useState } from 'react';
import AppLayout from '../components/layout/AppLayout';
import AccessibilityDashboard from '../components/admin/AccessibilityDashboard';
import OnboardingTour from '../components/onboarding/OnboardingTour';
import TooltipHelper from '../components/ui/TooltipHelper';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useToast } from '../hooks/use-toast';

const AccessibilityTestPage: React.FC = () => {
  const [showTour, setShowTour] = useState(false);
  const { toast } = useToast();
  
  const startTour = () => {
    // Clear local storage to allow tour to show
    localStorage.removeItem('hasSeenOnboardingTour');
    setShowTour(true);
    
    toast({
      title: "Tour Started",
      description: "Follow the guided tour to learn about the platform features.",
      duration: 3000,
    });
  };
  
  return (
    <AppLayout>
      {showTour && (
        <OnboardingTour 
          onComplete={() => setShowTour(false)} 
          onSkip={() => setShowTour(false)}
        />
      )}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Accessibility Testing</h1>
          <Button onClick={startTour}>Start Guided Tour</Button>
        </div>
        
        <div className="mb-8 p-6 bg-white dark:bg-navy-800 shadow rounded-lg border border-slate-200 dark:border-navy-700">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            Accessibility Features
            <TooltipHelper 
              title="Accessibility"
              content="These features ensure our app is usable by everyone, including those with disabilities."
              className="ml-2"
            />
          </h2>
          
          <Tabs defaultValue="visual" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="visual">Visual</TabsTrigger>
              <TabsTrigger value="keyboard">Keyboard</TabsTrigger>
              <TabsTrigger value="screen-reader">Screen Reader</TabsTrigger>
              <TabsTrigger value="cognitive">Cognitive</TabsTrigger>
            </TabsList>
            
            <TabsContent value="visual" className="p-4 border rounded-md mt-4">
              <h3 className="font-medium mb-2">Visual Accessibility</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>High contrast text with minimum 4.5:1 ratio</li>
                <li>Resizable text without loss of functionality</li>
                <li>Clear focus indicators for interactive elements</li>
                <li>Alternative text for all images</li>
              </ul>
            </TabsContent>
            
            <TabsContent value="keyboard" className="p-4 border rounded-md mt-4">
              <h3 className="font-medium mb-2">Keyboard Accessibility</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>All functionality available via keyboard</li>
                <li>Logical tab order follows visual layout</li>
                <li>Keyboard shortcuts for common actions</li>
                <li>No keyboard traps or focus issues</li>
              </ul>
            </TabsContent>
            
            <TabsContent value="screen-reader" className="p-4 border rounded-md mt-4">
              <h3 className="font-medium mb-2">Screen Reader Support</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Semantic HTML structure with proper headings</li>
                <li>ARIA labels for custom components</li>
                <li>Announcement of dynamic content changes</li>
                <li>Descriptive link text and button labels</li>
              </ul>
            </TabsContent>
            
            <TabsContent value="cognitive" className="p-4 border rounded-md mt-4">
              <h3 className="font-medium mb-2">Cognitive Accessibility</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Clear, simple language throughout the interface</li>
                <li>Consistent navigation patterns</li>
                <li>Error prevention and clear error messages</li>
                <li>Ability to pause or disable animations</li>
              </ul>
            </TabsContent>
          </Tabs>
        </div>
        
        <AccessibilityDashboard />
      </div>
    </AppLayout>
  );
};

export default AccessibilityTestPage;
