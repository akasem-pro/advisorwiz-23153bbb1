
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Slider } from '../../ui/slider';
import { Label } from '../../ui/label';
import { Button } from '../../ui/button';
import { MatchPreferences } from '../../../context/UserContextDefinition';
import { toast } from 'sonner';
import { PREFERENCE_WEIGHTS } from '../../../services/matching/constants/matchingWeights';

interface WeightAdjustmentPanelProps {
  preferences: MatchPreferences;
  onSave: (preferences: MatchPreferences) => void;
  onCancel?: () => void;
}

const WeightAdjustmentPanel: React.FC<WeightAdjustmentPanelProps> = ({
  preferences,
  onSave,
  onCancel
}) => {
  // Initialize weights with current values or defaults
  const [weights, setWeights] = React.useState({
    language: preferences.weightFactors?.language || PREFERENCE_WEIGHTS.LANGUAGE,
    expertise: preferences.weightFactors?.expertise || PREFERENCE_WEIGHTS.EXPERTISE,
    availability: preferences.weightFactors?.availability || PREFERENCE_WEIGHTS.AVAILABILITY,
    location: preferences.weightFactors?.location || 5,
    interaction: preferences.weightFactors?.interaction || 
      (PREFERENCE_WEIGHTS.CALL_INTERACTION.CALL_COUNT + 
       PREFERENCE_WEIGHTS.CALL_INTERACTION.DURATION + 
       PREFERENCE_WEIGHTS.CALL_INTERACTION.COMPLETION_RATE) / 3
  });

  const handleWeightChange = (factor: string, value: number[]) => {
    setWeights(prev => ({
      ...prev,
      [factor]: value[0]
    }));
  };

  const handleSave = () => {
    const updatedPreferences: MatchPreferences = {
      ...preferences,
      weightFactors: weights
    };
    
    onSave(updatedPreferences);
    toast.success("Weight preferences updated", {
      description: "Your match algorithm preferences have been saved."
    });
  };

  return (
    <Card className="w-full shadow-md">
      <CardHeader>
        <CardTitle className="text-lg">Customize Match Weights</CardTitle>
        <CardDescription>
          Adjust how much each factor influences your match results
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Language Match</Label>
              <span className="text-xs font-medium">{weights.language}%</span>
            </div>
            <Slider
              value={[weights.language]}
              min={0}
              max={100}
              step={5}
              onValueChange={(value) => handleWeightChange('language', value)}
            />
            <p className="text-xs text-slate-500">
              Importance of matching based on languages spoken
            </p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Expertise Match</Label>
              <span className="text-xs font-medium">{weights.expertise}%</span>
            </div>
            <Slider
              value={[weights.expertise]}
              min={0}
              max={100}
              step={5}
              onValueChange={(value) => handleWeightChange('expertise', value)}
            />
            <p className="text-xs text-slate-500">
              Importance of matching based on financial expertise
            </p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Availability</Label>
              <span className="text-xs font-medium">{weights.availability}%</span>
            </div>
            <Slider
              value={[weights.availability]}
              min={0}
              max={100}
              step={5}
              onValueChange={(value) => handleWeightChange('availability', value)}
            />
            <p className="text-xs text-slate-500">
              Importance of advisor availability
            </p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Location</Label>
              <span className="text-xs font-medium">{weights.location}%</span>
            </div>
            <Slider
              value={[weights.location]}
              min={0}
              max={100}
              step={5}
              onValueChange={(value) => handleWeightChange('location', value)}
            />
            <p className="text-xs text-slate-500">
              Importance of geographic proximity
            </p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Past Interactions</Label>
              <span className="text-xs font-medium">{weights.interaction}%</span>
            </div>
            <Slider
              value={[weights.interaction]}
              min={0}
              max={100}
              step={5}
              onValueChange={(value) => handleWeightChange('interaction', value)}
            />
            <p className="text-xs text-slate-500">
              Importance of call history and past interactions
            </p>
          </div>
        </div>
        
        <div className="flex justify-end space-x-2 pt-4">
          {onCancel && (
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button onClick={handleSave}>
            Save Preferences
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeightAdjustmentPanel;
