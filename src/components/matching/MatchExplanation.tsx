
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { ChevronDown, ChevronUp, Info } from 'lucide-react';
import { Button } from '../ui/button';
import { trackMatchEngagement } from '../../utils/analytics/matchEngagementTracker';
import type { MatchExplanation as MatchExplanationType } from './MatchExplanation.d';
import { convertToMatchExplanations } from './utils/matchExplanationUtils';
import { toast } from 'sonner';

// Define a type for the props that the component will receive
interface MatchExplanationProps {
  matchId: string;
  explanations?: MatchExplanationType[];
  score?: number;
  advisorId?: string;
  consumerId?: string;
  compact?: boolean;
  showFeedback?: boolean;
}

const MatchExplanation = ({ 
  matchId, 
  explanations, 
  score, 
  advisorId, 
  consumerId,
  compact = false,
  showFeedback = true
}: MatchExplanationProps) => {
  const [loading, setLoading] = useState(true);
  const [matchExplanations, setMatchExplanations] = useState<MatchExplanationType[]>([]);
  const [categories, setCategories] = useState<{ primary: string[]; secondary: string[] }>({ 
    primary: [], 
    secondary: [] 
  });
  const [expandedSection, setExpandedSection] = useState<'primary' | 'secondary' | null>(null);
  
  useEffect(() => {
    if (explanations) {
      setMatchExplanations(explanations);
      setCategories(getMatchCategoriesFromExplanations(explanations));
      setLoading(false);
    } else {
      // Fetch explanations based on matchId if not provided as props
      const fetchExplanations = async () => {
        setLoading(true);
        try {
          // Placeholder for fetching logic - replace with your actual data fetching
          const fetchedExplanations: MatchExplanationType[] = [
            { category: 'Category A', explanation: 'Explanation for A', scoreImpact: 0.8, isPrimary: true },
            { category: 'Category B', explanation: 'Explanation for B', scoreImpact: 0.6, isPrimary: false },
          ];
          setMatchExplanations(fetchedExplanations);
          setCategories(getMatchCategoriesFromExplanations(fetchedExplanations));
        } catch (error) {
          console.error("Failed to load match explanations:", error);
          toast.error("Couldn't load match explanations", {
            description: "Please try again later"
          });
        } finally {
          setLoading(false);
        }
      };
      
      fetchExplanations();
    }
    
    // Track view of match explanation
    if (score !== undefined && advisorId && consumerId) {
      trackMatchEngagement('view_explanation', matchId, score, advisorId, {
        consumer_id: consumerId
      });
    }
  }, [matchId, explanations, score, advisorId, consumerId]);
  
  const getMatchCategoriesFromExplanations = (explanations: MatchExplanationType[]): { primary: string[]; secondary: string[] } => {
    const categs: { primary: string[]; secondary: string[] } = {
      primary: [],
      secondary: []
    };
    
    explanations.forEach(explanation => {
      if (explanation.isPrimary) {
        if (!categs.primary.includes(explanation.category)) {
          categs.primary.push(explanation.category);
        }
      } else {
        if (!categs.secondary.includes(explanation.category)) {
          categs.secondary.push(explanation.category);
        }
      }
    });
    
    return categs;
  };
  
  const toggleSection = (section: 'primary' | 'secondary') => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };
  
  const handleFeedbackClick = (positive: boolean) => {
    toast.success(positive ? "Thanks for your feedback!" : "We'll use your feedback to improve matches", {
      description: positive ? "We're glad this match was helpful." : "We appreciate your honesty."
    });
    
    // Track feedback engagement
    trackMatchEngagement('feedback', matchId, score, advisorId, {
      consumer_id: consumerId,
      feedback_type: positive ? 'positive' : 'negative'
    });
  };
  
  const renderExplanations = (isPrimary: boolean) => {
    const filteredExplanations = matchExplanations.filter(exp => exp.isPrimary === isPrimary);
    
    return filteredExplanations.map((explanation, index) => (
      <Card key={index} className="mb-3 border border-slate-200 hover:shadow-md transition-shadow dark:border-navy-700 dark:bg-navy-800/50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <h4 className="text-base font-medium text-slate-800 dark:text-slate-200">{explanation.category}</h4>
            <Badge 
              variant={isPrimary ? "default" : "outline"}
              className={isPrimary 
                ? "bg-teal-100 text-teal-800 dark:bg-teal-900/50 dark:text-teal-300" 
                : "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300"}
            >
              {isPrimary ? "Primary" : "Secondary"}
            </Badge>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">{explanation.explanation}</p>
          <div className="flex items-center justify-between mt-2">
            <p className="text-xs text-slate-500 dark:text-slate-500">Score Impact: {explanation.scoreImpact.toFixed(2)}</p>
            <div className="w-full max-w-24 bg-slate-200 dark:bg-navy-700 rounded-full h-1.5 ml-2">
              <div 
                className={`h-1.5 rounded-full ${isPrimary ? 'bg-teal-500' : 'bg-slate-400'}`} 
                style={{ width: `${explanation.scoreImpact * 100}%` }}
              ></div>
            </div>
          </div>
        </CardContent>
      </Card>
    ));
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
      </div>
    );
  }
  
  if (compact) {
    return (
      <div className="match-explanation-compact bg-white dark:bg-navy-800/50 border border-slate-100 dark:border-navy-700 rounded-lg p-3 animate-fade-in">
        <div className="mb-2">
          {categories.primary.map((category, index) => (
            <Badge key={index} variant="outline" className="mr-1 mb-1 bg-teal-50 dark:bg-teal-900/30 text-teal-800 dark:text-teal-300 border-teal-200 dark:border-teal-800">
              {category}
            </Badge>
          ))}
          {categories.secondary.length > 0 && categories.secondary.slice(0, 2).map((category, index) => (
            <Badge key={index} variant="outline" className="mr-1 mb-1 bg-white dark:bg-navy-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-navy-700">
              {category}
            </Badge>
          ))}
        </div>
      </div>
    );
  }
  
  return (
    <div className="match-explanation bg-white dark:bg-navy-800/50 border border-slate-200 dark:border-navy-700 rounded-lg p-5 shadow-sm animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-50">Match Explanation</h3>
        {score !== undefined && (
          <div className="flex items-center space-x-2">
            <span className="text-sm text-slate-600 dark:text-slate-400">Match Score:</span>
            <Badge className="bg-teal-500 text-white">
              {Math.round(score * 100)}%
            </Badge>
          </div>
        )}
      </div>
      
      <div className="mb-4 bg-slate-50 dark:bg-navy-900/50 rounded-lg p-3">
        <div className="flex flex-wrap gap-1">
          {categories.primary.length > 0 && (
            <div className="flex items-center mr-2">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 mr-2">Primary:</span>
              {categories.primary.map((category, index) => (
                <Badge key={index} variant="outline" className="bg-teal-50 dark:bg-teal-900/30 text-teal-800 dark:text-teal-300 border-teal-200 dark:border-teal-800 mr-1">
                  {category}
                </Badge>
              ))}
            </div>
          )}
          
          {categories.secondary.length > 0 && (
            <div className="flex items-center">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 mr-2">Secondary:</span>
              {categories.secondary.map((category, index) => (
                <Badge key={index} variant="outline" className="bg-white dark:bg-navy-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-navy-600 mr-1">
                  {category}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {showFeedback && (
        <div className="p-3 mb-4 border border-slate-200 dark:border-navy-700 rounded-lg bg-slate-50 dark:bg-navy-900/50">
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-2 flex items-center">
            <Info className="h-4 w-4 mr-2 text-teal-500" />
            Is this match helpful for your needs?
          </p>
          <div className="flex space-x-2">
            <Button 
              size="sm" 
              variant="outline"
              className="w-full border-green-500 text-green-600 hover:bg-green-50 dark:border-green-700 dark:text-green-400 dark:hover:bg-green-900/20"
              onClick={() => handleFeedbackClick(true)}
            >
              Yes, it's helpful
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              className="w-full border-red-500 text-red-600 hover:bg-red-50 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-900/20"
              onClick={() => handleFeedbackClick(false)}
            >
              Not quite right
            </Button>
          </div>
        </div>
      )}
      
      <Separator className="my-4" />
      
      <div className="space-y-4">
        <div>
          <Button
            variant="ghost"
            className="w-full justify-between p-2 h-auto"
            onClick={() => toggleSection('primary')}
          >
            <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300">Primary Factors ({matchExplanations.filter(exp => exp.isPrimary).length})</h4>
            {expandedSection === 'primary' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
          
          {expandedSection === 'primary' && renderExplanations(true)}
        </div>
        
        {matchExplanations.some(exp => !exp.isPrimary) && (
          <div>
            <Button
              variant="ghost"
              className="w-full justify-between p-2 h-auto"
              onClick={() => toggleSection('secondary')}
            >
              <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300">Secondary Factors ({matchExplanations.filter(exp => !exp.isPrimary).length})</h4>
              {expandedSection === 'secondary' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
            
            {expandedSection === 'secondary' && renderExplanations(false)}
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchExplanation;
