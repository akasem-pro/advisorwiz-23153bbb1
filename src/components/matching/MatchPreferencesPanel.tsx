
import React, { useState } from 'react';
import { Slider } from "../ui/slider";
import { Switch } from "../ui/switch";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { ServiceCategory } from "../../types/userTypes";
import { MatchPreferences } from "../../context/UserContextDefinition";
import { Badge } from "../ui/badge";
import { Check, Info, X } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { toast } from "sonner";
import { trackPreferenceUpdate } from "../../utils/analytics/userBehaviorTracker";
import { useUser } from "../../context/UserContext";

interface MatchPreferencesPanelProps {
  preferences: MatchPreferences;
  onUpdatePreferences: (preferences: MatchPreferences) => void;
  onClose: () => void;
}

const MatchPreferencesPanel: React.FC<MatchPreferencesPanelProps> = ({
  preferences,
  onUpdatePreferences,
  onClose
}) => {
  const { userType, advisorProfile, consumerProfile } = useUser();
  const [localPreferences, setLocalPreferences] = useState<MatchPreferences>({...preferences});
  const [excludedCategories, setExcludedCategories] = useState<ServiceCategory[]>(
    preferences.excludedCategories || []
  );

  // Factor weights (0-100)
  const [weights, setWeights] = useState({
    language: preferences.weightFactors?.language || 50,
    expertise: preferences.weightFactors?.expertise || 50,
    availability: preferences.weightFactors?.availability || 30,
    location: preferences.weightFactors?.location || 20,
    interaction: preferences.weightFactors?.interaction || 40,
  });
  
  // Service categories for filtering
  const serviceCategories: ServiceCategory[] = [
    "retirement", "investment", "estate", "tax", "insurance", 
    "business", "education", "philanthropic"
  ];
  
  const handleWeightChange = (factor: string, value: number[]) => {
    setWeights(prev => ({
      ...prev,
      [factor]: value[0]
    }));
  };
  
  const handleSwitchChange = (key: keyof MatchPreferences) => {
    setLocalPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  
  const toggleExcludedCategory = (category: ServiceCategory) => {
    setExcludedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };
  
  const handleApply = async () => {
    // Prepare the updated preferences
    const updatedPreferences: MatchPreferences = {
      ...localPreferences,
      excludedCategories: excludedCategories,
      weightFactors: weights
    };
    
    // Track the preference update if user is authenticated
    const userId = userType === 'consumer' 
      ? consumerProfile?.id 
      : advisorProfile?.id;
      
    if (userId) {
      await trackPreferenceUpdate(userId, preferences, updatedPreferences);
    }
    
    // Update the preferences
    onUpdatePreferences(updatedPreferences);
    
    // Show success notification
    toast.success("Match preferences updated", {
      description: "Your preferences have been saved and matches will be updated accordingly."
    });
    
    // Close the panel
    onClose();
  };
  
  return (
    <div className="p-4 bg-white rounded-lg shadow-lg max-w-md w-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Customize Match Preferences</h3>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <Separator className="mb-4" />
      
      <div className="space-y-6">
        {/* Prioritized factors */}
        <div>
          <h4 className="text-sm font-medium mb-2">Prioritize Factors</h4>
          <p className="text-xs text-slate-500 mb-4">
            Adjust the importance of each factor in finding your matches
          </p>
          
          <div className="space-y-4">
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
            </div>
          </div>
        </div>
        
        <Separator />
        
        {/* Toggle options */}
        <div>
          <h4 className="text-sm font-medium mb-2">Matching Options</h4>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="prioritizeLanguage">Prioritize Language</Label>
                <p className="text-xs text-slate-500">Match with people who speak your language</p>
              </div>
              <Switch
                id="prioritizeLanguage"
                checked={localPreferences.prioritizeLanguage}
                onCheckedChange={() => handleSwitchChange('prioritizeLanguage')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="prioritizeExpertise">Prioritize Expertise</Label>
                <p className="text-xs text-slate-500">Match based on financial service expertise</p>
              </div>
              <Switch
                id="prioritizeExpertise"
                checked={localPreferences.prioritizeExpertise}
                onCheckedChange={() => handleSwitchChange('prioritizeExpertise')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="prioritizeAvailability">Prioritize Availability</Label>
                <p className="text-xs text-slate-500">Favor advisors with more available slots</p>
              </div>
              <Switch
                id="prioritizeAvailability"
                checked={localPreferences.prioritizeAvailability}
                onCheckedChange={() => handleSwitchChange('prioritizeAvailability')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="prioritizeLocation">Prioritize Location</Label>
                <p className="text-xs text-slate-500">Match with nearby advisors</p>
              </div>
              <Switch
                id="prioritizeLocation"
                checked={localPreferences.prioritizeLocation}
                onCheckedChange={() => handleSwitchChange('prioritizeLocation')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="considerInteractionData">Consider Interaction History</Label>
                <p className="text-xs text-slate-500">Include past calls and messages in matching</p>
              </div>
              <Switch
                id="considerInteractionData"
                checked={localPreferences.considerInteractionData}
                onCheckedChange={() => handleSwitchChange('considerInteractionData')}
              />
            </div>
          </div>
        </div>
        
        <Separator />
        
        {/* Excluded categories */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium">Exclude Categories</h4>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="cursor-help">
                    <Info className="h-4 w-4 text-slate-400" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs max-w-xs">
                    Advisors who specialize in these categories will be excluded from your matches.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-2">
            {serviceCategories.map((category) => (
              <Badge
                key={category}
                variant={excludedCategories.includes(category) ? "default" : "outline"}
                className={`cursor-pointer ${
                  excludedCategories.includes(category) ? "bg-red-100 text-red-800 hover:bg-red-200" : ""
                }`}
                onClick={() => toggleExcludedCategory(category)}
              >
                {excludedCategories.includes(category) && (
                  <X className="mr-1 h-3 w-3" />
                )}
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Badge>
            ))}
          </div>
        </div>
        
        {/* Minimum match score */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Minimum Match Score</Label>
            <span className="text-xs font-medium">{localPreferences.minimumMatchScore || 40}%</span>
          </div>
          <Slider
            value={[localPreferences.minimumMatchScore || 40]}
            min={0}
            max={100}
            step={5}
            onValueChange={(value) => setLocalPreferences(prev => ({
              ...prev,
              minimumMatchScore: value[0]
            }))}
          />
          <p className="text-xs text-slate-500">
            Only show matches with a score above this threshold
          </p>
        </div>
        
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleApply}>
            Apply Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MatchPreferencesPanel;
