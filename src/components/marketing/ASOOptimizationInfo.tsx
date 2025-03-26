
import React, { useState } from 'react';
import { Award, ExternalLink, CheckSquare, Smartphone, SearchIcon, TrendingUp } from 'lucide-react';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { trackUserBehavior } from '../../utils/analytics/eventTracker';

interface ASOOptimizationInfoProps {
  className?: string;
  compact?: boolean;
}

const ASOOptimizationInfo: React.FC<ASOOptimizationInfoProps> = ({
  className = '',
  compact = false
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    trackUserBehavior('aso_tab_change', { tab: value });
  };
  
  const handleLearnMore = (topic: string) => {
    trackUserBehavior('aso_learn_more', { topic });
    window.open('/resources/aso-guide', '_blank');
  };
  
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm ${className}`}>
      <div className="p-5 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
            <Award className="h-5 w-5 mr-2 text-indigo-500" />
            App Store Optimization
          </h3>
          {!compact && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => handleLearnMore('aso_guide')}
            >
              Learn more <ExternalLink className="ml-1 h-4 w-4" />
            </Button>
          )}
        </div>
        {!compact && (
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            Optimize your app's visibility and conversion rate in the app stores with these proven strategies.
          </p>
        )}
      </div>
      
      <Tabs defaultValue="overview" value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="w-full border-b border-gray-200 dark:border-gray-700">
          <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
          <TabsTrigger value="keywords" className="flex-1">Keywords</TabsTrigger>
          <TabsTrigger value="visuals" className="flex-1">Visuals</TabsTrigger>
          <TabsTrigger value="reviews" className="flex-1">Reviews</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="p-4">
          <div className="space-y-4">
            <div className="flex">
              <div className="mr-3 mt-1">
                <SearchIcon className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Discovery Optimization</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Make your app easily discoverable through strategic keyword optimization and category placement.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="mr-3 mt-1">
                <TrendingUp className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Conversion Rate Optimization</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Turn store visits into downloads with compelling visuals, clear messaging, and social proof.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="mr-3 mt-1">
                <Smartphone className="h-5 w-5 text-purple-500" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Cross-Platform Strategy</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Optimize for both App Store and Google Play with platform-specific best practices.
                </p>
              </div>
            </div>
            
            {!compact && (
              <Button 
                className="w-full mt-4" 
                onClick={() => handleLearnMore('aso_overview')}
              >
                Download ASO Guide
              </Button>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="keywords" className="p-4">
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900 dark:text-white">Keyword Strategy</h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckSquare className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                <span className="text-sm">Research high-volume, relevant keywords</span>
              </li>
              <li className="flex items-start">
                <CheckSquare className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                <span className="text-sm">Place primary keywords in title and subtitle</span>
              </li>
              <li className="flex items-start">
                <CheckSquare className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                <span className="text-sm">Distribute secondary keywords throughout description</span>
              </li>
              <li className="flex items-start">
                <CheckSquare className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                <span className="text-sm">Update keywords periodically based on performance</span>
              </li>
            </ul>
            {!compact && (
              <Button 
                variant="outline" 
                className="w-full mt-2"
                onClick={() => handleLearnMore('keyword_optimization')}
              >
                Keyword Optimization Tips
              </Button>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="visuals" className="p-4">
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900 dark:text-white">Visual Assets</h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckSquare className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                <span className="text-sm">Create an eye-catching, recognizable app icon</span>
              </li>
              <li className="flex items-start">
                <CheckSquare className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                <span className="text-sm">Design screenshots that highlight key features</span>
              </li>
              <li className="flex items-start">
                <CheckSquare className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                <span className="text-sm">Create a compelling app preview video</span>
              </li>
              <li className="flex items-start">
                <CheckSquare className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                <span className="text-sm">A/B test different visual assets</span>
              </li>
            </ul>
            {!compact && (
              <Button 
                variant="outline" 
                className="w-full mt-2"
                onClick={() => handleLearnMore('visual_optimization')}
              >
                Visual Design Guide
              </Button>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="reviews" className="p-4">
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900 dark:text-white">Review Management</h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckSquare className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                <span className="text-sm">Prompt happy users to leave positive reviews</span>
              </li>
              <li className="flex items-start">
                <CheckSquare className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                <span className="text-sm">Respond promptly to all reviews, especially negative ones</span>
              </li>
              <li className="flex items-start">
                <CheckSquare className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                <span className="text-sm">Address issues mentioned in negative reviews</span>
              </li>
              <li className="flex items-start">
                <CheckSquare className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                <span className="text-sm">Feature testimonials from satisfied users</span>
              </li>
            </ul>
            {!compact && (
              <Button 
                variant="outline" 
                className="w-full mt-2"
                onClick={() => handleLearnMore('review_management')}
              >
                Review Management Strategy
              </Button>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ASOOptimizationInfo;
