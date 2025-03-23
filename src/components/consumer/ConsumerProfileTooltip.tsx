
import React, { useState } from 'react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card';
import { HelpCircle } from 'lucide-react';

interface ConsumerProfileTooltipProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const ConsumerProfileTooltip: React.FC<ConsumerProfileTooltipProps> = ({
  title,
  description,
  children,
}) => {
  return (
    <div className="inline-flex items-center">
      {children}
      <HoverCard openDelay={200} closeDelay={100}>
        <HoverCardTrigger asChild>
          <button className="ml-1 p-0.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-200">
            <HelpCircle size={14} />
          </button>
        </HoverCardTrigger>
        <HoverCardContent className="w-80 text-sm" side="top">
          <div className="space-y-2">
            <h4 className="font-medium">{title}</h4>
            <p className="text-slate-500">{description}</p>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};

export default ConsumerProfileTooltip;
