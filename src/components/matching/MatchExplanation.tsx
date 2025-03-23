
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { trackMatchEngagement } from '../../utils/analytics/matchEngagementTracker';
import type { MatchExplanation as MatchExplanationType } from './MatchExplanation.d';

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
  
  const renderExplanations = (isPrimary: boolean) => {
    const filteredExplanations = matchExplanations.filter(exp => exp.isPrimary === isPrimary);
    
    return filteredExplanations.map((explanation, index) => (
      <Card key={index} className="mb-3 border border-slate-200 hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <h4 className="text-base font-medium text-slate-800">{explanation.category}</h4>
          <p className="text-sm text-slate-600 mt-1">{explanation.explanation}</p>
          <p className="text-xs text-slate-500 mt-2">Score Impact: {explanation.scoreImpact.toFixed(2)}</p>
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
      <div className="match-explanation-compact">
        <div className="mb-2">
          {categories.primary.map((category, index) => (
            <Badge key={index} variant="outline" className="mr-1 mb-1 bg-white text-slate-800 border-teal-200">
              {category}
            </Badge>
          ))}
          {categories.secondary.length > 0 && categories.secondary.slice(0, 2).map((category, index) => (
            <Badge key={index} variant="outline" className="mr-1 mb-1 bg-white text-slate-600">
              {category}
            </Badge>
          ))}
        </div>
      </div>
    );
  }
  
  return (
    <div className="match-explanation">
      <h3 className="text-lg font-semibold text-slate-800 mb-3">Match Explanation</h3>
      
      <div className="mb-4">
        <h4 className="text-sm font-medium text-slate-700 mb-2">Primary Categories:</h4>
        <div className="flex flex-wrap gap-1">
          {categories.primary.map((category, index) => (
            <Badge key={index} variant="outline" className="bg-white text-slate-800 border-teal-200">
              {category}
            </Badge>
          ))}
        </div>
      </div>
      
      {categories.secondary.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-slate-700 mb-2">Secondary Categories:</h4>
          <div className="flex flex-wrap gap-1">
            {categories.secondary.map((category, index) => (
              <Badge key={index} variant="outline" className="bg-white text-slate-600">
                {category}
              </Badge>
            ))}
          </div>
        </div>
      )}
      
      <Separator className="my-4" />
      
      <h4 className="text-sm font-medium text-slate-700 mb-2">Primary Explanations</h4>
      {renderExplanations(true)}
      
      {matchExplanations.some(exp => !exp.isPrimary) && (
        <>
          <h4 className="text-sm font-medium text-slate-700 mt-4 mb-2">Secondary Explanations</h4>
          {renderExplanations(false)}
        </>
      )}
    </div>
  );
};

export default MatchExplanation;
