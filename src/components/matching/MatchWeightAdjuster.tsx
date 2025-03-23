
import React from 'react';
import { Button } from '../ui/button';
import { Sliders } from 'lucide-react';
import WeightAdjustmentPanel from './feedback/WeightAdjustmentPanel';
import { useWeightOptimization } from '../../hooks/useWeightOptimization';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';

interface MatchWeightAdjusterProps {
  buttonVariant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link';
  className?: string;
}

const MatchWeightAdjuster: React.FC<MatchWeightAdjusterProps> = ({ 
  buttonVariant = 'outline',
  className = ''
}) => {
  const { 
    isAdjusting, 
    startAdjusting, 
    cancelAdjusting, 
    saveWeightPreferences, 
    currentPreferences,
    resetToDefaults
  } = useWeightOptimization();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button 
          variant={buttonVariant} 
          size="sm" 
          className={`flex items-center ${className}`}
          onClick={startAdjusting}
        >
          <Sliders className="mr-2 h-4 w-4" />
          Adjust Match Weights
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Match Weight Preferences</SheetTitle>
          <SheetDescription>
            Customize how different factors influence your matching results
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6 space-y-6">
          <WeightAdjustmentPanel 
            preferences={currentPreferences} 
            onSave={saveWeightPreferences}
            onCancel={cancelAdjusting}
          />
          
          <div className="border-t pt-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs text-muted-foreground"
              onClick={resetToDefaults}
            >
              Reset to default weights
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MatchWeightAdjuster;
