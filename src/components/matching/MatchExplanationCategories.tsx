
import React from 'react';
import { Badge } from '../ui/badge';

interface MatchExplanationCategoriesProps {
  explanationCategories: {
    primary: string[];
    secondary: string[];
  };
  expanded: boolean;
}

const MatchExplanationCategories: React.FC<MatchExplanationCategoriesProps> = ({ 
  explanationCategories, 
  expanded 
}) => {
  return (
    <div className="mt-2">
      {/* Always show primary reasons */}
      {explanationCategories.primary.length > 0 && (
        <div className="mb-2">
          <p className="text-xs text-slate-600 mb-1">Key factors:</p>
          <div className="flex flex-wrap gap-1">
            {explanationCategories.primary.map((explanation, index) => (
              <Badge key={`primary-${index}`} variant="outline" className="bg-white text-slate-700 border-teal-200">
                {explanation}
              </Badge>
            ))}
          </div>
        </div>
      )}
      
      {/* Show secondary reasons if expanded or few explanations */}
      {(expanded || explanationCategories.primary.length + explanationCategories.secondary.length <= 3) && 
       explanationCategories.secondary.length > 0 && (
        <div className="mt-2">
          <p className="text-xs text-slate-600 mb-1">Additional factors:</p>
          <div className="flex flex-wrap gap-1">
            {explanationCategories.secondary.map((explanation, index) => (
              <Badge key={`secondary-${index}`} variant="outline" className="bg-white text-slate-700">
                {explanation}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchExplanationCategories;
