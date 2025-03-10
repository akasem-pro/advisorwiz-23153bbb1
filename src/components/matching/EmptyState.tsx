
import React from 'react';
import { Inbox, RotateCcw } from 'lucide-react';

interface EmptyStateProps {
  isEmpty: boolean;
  onReset: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ isEmpty, onReset }) => {
  return (
    <div className="glass-card rounded-2xl p-10 text-center">
      <div className="mx-auto w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
        <Inbox className="w-8 h-8 text-slate-400" />
      </div>
      <h3 className="text-xl font-serif font-semibold text-navy-900 mb-2">
        No Matching Profiles
      </h3>
      <p className="text-slate-600 mb-6">
        {isEmpty 
          ? "You've reviewed all available profiles for now. Adjust your filters or check back later."
          : "No profiles match your current filters. Try adjusting your search criteria."}
      </p>
      <button
        onClick={onReset}
        className="btn-outline"
      >
        {isEmpty ? "Start Over" : "Clear Filters"}
      </button>
    </div>
  );
};

export default EmptyState;
