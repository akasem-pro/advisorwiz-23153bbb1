
import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

interface EmptyNotesStateProps {
  onAddNote: () => void;
}

const EmptyNotesState: React.FC<EmptyNotesStateProps> = ({ onAddNote }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center bg-slate-50 dark:bg-navy-800/50 rounded-lg">
      <div className="p-3 bg-slate-100 dark:bg-navy-700 rounded-full mb-4">
        <PlusCircle className="h-8 w-8 text-slate-400" />
      </div>
      <h4 className="text-lg font-medium mb-2">No Notes Yet</h4>
      <p className="text-slate-500 mb-4 max-w-sm">
        Add notes about client interactions, preferences, and follow-up items.
      </p>
      <Button 
        variant="outline" 
        onClick={onAddNote}
        className="flex items-center"
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        Add Your First Note
      </Button>
    </div>
  );
};

export default EmptyNotesState;
