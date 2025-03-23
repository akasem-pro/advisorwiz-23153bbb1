
import React from 'react';
import { Sliders, ChevronUp, ChevronDown } from 'lucide-react';
import { Label } from '../../ui/label';
import { Badge } from '../../ui/badge';
import WeightAdjustment from './WeightAdjustment';

interface AdvancedOptionsProps {
  showAdvanced: boolean;
  setShowAdvanced: (value: boolean) => void;
  adjustWeights: boolean;
  setAdjustWeights: (value: boolean) => void;
  weightAdjustments: Record<string, number>;
  handleWeightChange: (factor: string, direction: 'increase' | 'decrease') => void;
  explanations?: string[];
  isHelpful: boolean | null;
}

const AdvancedOptions: React.FC<AdvancedOptionsProps> = ({
  showAdvanced,
  setShowAdvanced,
  adjustWeights,
  setAdjustWeights,
  weightAdjustments,
  handleWeightChange,
  explanations = [],
  isHelpful
}) => {
  // Map of factors to display names
  const factorDisplayNames: Record<string, string> = {
    language: "Language match",
    expertise: "Expertise match",
    availability: "Availability",
    location: "Location"
  };

  return (
    <>
      <button
        className="text-xs h-7 w-full text-slate-600 flex items-center mb-2"
        onClick={() => setShowAdvanced(!showAdvanced)}
      >
        {showAdvanced ? <ChevronUp className="h-3 w-3 mr-1" /> : <ChevronDown className="h-3 w-3 mr-1" />}
        {showAdvanced ? "Hide advanced options" : "Show advanced options"}
      </button>
      
      {showAdvanced && (
        <div className="p-2 bg-slate-50 rounded-md mb-2">
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              id="adjustWeights"
              checked={adjustWeights}
              onChange={() => setAdjustWeights(!adjustWeights)}
              className="mr-2"
            />
            <Label htmlFor="adjustWeights" className="text-xs cursor-pointer flex items-center">
              <Sliders className="h-3 w-3 mr-1" />
              Adjust matching preferences
            </Label>
          </div>
          
          {adjustWeights && (
            <div className="mt-2 space-y-2">
              {explanations && explanations.length > 0 && (
                <div className="mb-2">
                  <Label className="text-xs">Match explanations:</Label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {explanations.map((explanation, idx) => (
                      <Badge key={idx} variant="outline" className="bg-white text-xs">
                        {explanation}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              <div>
                <Label className="text-xs">Adjust weights:</Label>
                <p className="text-xs text-slate-500">
                  {isHelpful 
                    ? "Increase weights for factors you liked" 
                    : "Decrease weights for factors you didn't like"}
                </p>
                
                <div className="space-y-2 mt-2">
                  {Object.entries(factorDisplayNames).map(([factor, displayName]) => (
                    <WeightAdjustment
                      key={factor}
                      factor={factor}
                      displayName={displayName}
                      value={weightAdjustments[factor]}
                      onChange={handleWeightChange}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AdvancedOptions;
