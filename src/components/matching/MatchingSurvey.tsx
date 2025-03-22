
import React, { useState } from 'react';
import { UserType, ServiceCategory } from '../../types/userTypes';
import { Button } from '../ui/button';
import { Slider } from '../ui/slider';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Checkbox } from '../ui/checkbox';
import { Separator } from '../ui/separator';
import { toast } from 'sonner';

interface MatchPreferencesSurveyProps {
  userType: 'consumer' | 'advisor' | null;
  onPreferencesUpdate: (preferences: any) => void;
}

const MatchingSurvey: React.FC<MatchPreferencesSurveyProps> = ({ 
  userType, 
  onPreferencesUpdate 
}) => {
  const [preferences, setPreferences] = useState({
    prioritizeLanguage: true,
    prioritizeExpertise: true,
    prioritizeAvailability: true,
    prioritizeLocation: true,
    minimumMatchScore: 50,
    considerInteractionData: true,
    excludedCategories: [] as ServiceCategory[]
  });

  const handleToggleChange = (field: string) => {
    setPreferences(prev => ({
      ...prev,
      [field]: !prev[field as keyof typeof prev]
    }));
  };

  const handleCategoryToggle = (category: ServiceCategory) => {
    setPreferences(prev => {
      const currentExcluded = [...prev.excludedCategories];
      const categoryIndex = currentExcluded.indexOf(category);
      
      if (categoryIndex > -1) {
        currentExcluded.splice(categoryIndex, 1);
      } else {
        currentExcluded.push(category);
      }
      
      return {
        ...prev,
        excludedCategories: currentExcluded
      };
    });
  };

  const handleSubmit = () => {
    onPreferencesUpdate(preferences);
    toast.success("Your matching preferences have been updated");
  };

  const serviceCategories = [
    { value: 'retirement' as ServiceCategory, label: 'Retirement Planning' },
    { value: 'investment' as ServiceCategory, label: 'Investment Management' },
    { value: 'tax' as ServiceCategory, label: 'Tax Planning' },
    { value: 'estate' as ServiceCategory, label: 'Estate Planning' },
    { value: 'business' as ServiceCategory, label: 'Business Planning' },
    { value: 'insurance' as ServiceCategory, label: 'Insurance' },
    { value: 'philanthropic' as ServiceCategory, label: 'Philanthropic Planning' },
    { value: 'education' as ServiceCategory, label: 'Education Planning' }
  ];

  return (
    <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-sm">
      <h3 className="text-lg font-medium text-navy-800 mb-4">
        Customize Your Matching Preferences
      </h3>
      
      <div className="space-y-6">
        <div>
          <p className="text-sm text-slate-600 mb-4">
            Adjust how we match you with {userType === 'consumer' ? 'advisors' : 'clients'} 
            by setting your preferences below.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label 
                htmlFor="prioritizeLanguage" 
                className="text-sm font-medium text-navy-700"
              >
                Prioritize language matches
              </Label>
              <Switch 
                id="prioritizeLanguage"
                checked={preferences.prioritizeLanguage}
                onCheckedChange={() => handleToggleChange('prioritizeLanguage')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label 
                htmlFor="prioritizeExpertise" 
                className="text-sm font-medium text-navy-700"
              >
                Prioritize expertise matches
              </Label>
              <Switch 
                id="prioritizeExpertise"
                checked={preferences.prioritizeExpertise}
                onCheckedChange={() => handleToggleChange('prioritizeExpertise')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label 
                htmlFor="prioritizeAvailability" 
                className="text-sm font-medium text-navy-700"
              >
                Prioritize availability
              </Label>
              <Switch 
                id="prioritizeAvailability"
                checked={preferences.prioritizeAvailability}
                onCheckedChange={() => handleToggleChange('prioritizeAvailability')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label 
                htmlFor="prioritizeLocation" 
                className="text-sm font-medium text-navy-700"
              >
                Prioritize location
              </Label>
              <Switch 
                id="prioritizeLocation"
                checked={preferences.prioritizeLocation}
                onCheckedChange={() => handleToggleChange('prioritizeLocation')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label 
                htmlFor="considerInteractionData" 
                className="text-sm font-medium text-navy-700"
              >
                Consider past interactions
              </Label>
              <Switch 
                id="considerInteractionData"
                checked={preferences.considerInteractionData}
                onCheckedChange={() => handleToggleChange('considerInteractionData')}
              />
            </div>
          </div>
        </div>
        
        <Separator />
        
        <div>
          <Label className="text-sm font-medium text-navy-700 mb-2 block">
            Minimum match score (%)
          </Label>
          <Slider
            defaultValue={[preferences.minimumMatchScore]}
            max={100}
            step={1}
            onValueChange={([value]) => {
              setPreferences(prev => ({
                ...prev,
                minimumMatchScore: value
              }));
            }}
          />
          <div className="flex justify-between mt-1">
            <span className="text-xs text-slate-500">0%</span>
            <span className="text-xs text-teal-600 font-medium">{preferences.minimumMatchScore}%</span>
            <span className="text-xs text-slate-500">100%</span>
          </div>
        </div>
        
        <Separator />
        
        <div>
          <Label className="text-sm font-medium text-navy-700 mb-2 block">
            Exclude these service categories
          </Label>
          <div className="grid grid-cols-2 gap-2">
            {serviceCategories.map(category => (
              <div key={category.value} className="flex items-center space-x-2">
                <Checkbox 
                  id={`exclude-${category.value}`}
                  checked={preferences.excludedCategories.includes(category.value)}
                  onCheckedChange={() => handleCategoryToggle(category.value)}
                />
                <Label 
                  htmlFor={`exclude-${category.value}`}
                  className="text-sm text-slate-700"
                >
                  {category.label}
                </Label>
              </div>
            ))}
          </div>
        </div>
        
        <Button 
          onClick={handleSubmit} 
          className="w-full bg-teal-600 hover:bg-teal-700"
        >
          Update Matching Preferences
        </Button>
      </div>
    </div>
  );
};

export default MatchingSurvey;
