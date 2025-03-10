
import React from 'react';
import { Check, X } from 'lucide-react';

interface FeatureItemProps {
  included: boolean;
  text: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ included, text }) => (
  <div className="flex items-center gap-2 py-1">
    {included ? (
      <Check className="h-5 w-5 flex-shrink-0 text-teal-500" />
    ) : (
      <X className="h-5 w-5 flex-shrink-0 text-slate-300" />
    )}
    <span className={included ? "text-slate-700" : "text-slate-400"}>{text}</span>
  </div>
);

export default FeatureItem;
