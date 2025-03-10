
import React, { ReactNode } from 'react';
import { CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { Section } from '../../types/advisorTypes';

interface ProfileSectionProps {
  section: Section;
  toggleSection: (id: string) => void;
  children: ReactNode;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({ 
  section, 
  toggleSection, 
  children 
}) => {
  return (
    <div className="rounded-lg border border-slate-200 overflow-hidden">
      <div 
        className={`flex justify-between items-center p-4 cursor-pointer ${section.isCompleted ? 'bg-green-50' : 'bg-slate-50'}`}
        onClick={() => toggleSection(section.id)}
      >
        <div className="flex items-center">
          <div className={`mr-3 ${section.isCompleted ? 'text-green-600' : 'text-slate-700'}`}>
            {section.icon}
          </div>
          <h3 className="text-lg font-medium text-navy-800 flex items-center">
            {section.title}
            {section.isCompleted && (
              <CheckCircle className="ml-2 h-4 w-4 text-green-600" />
            )}
          </h3>
        </div>
        <div>
          {section.isOpen ? (
            <ChevronUp className="h-5 w-5 text-slate-500" />
          ) : (
            <ChevronDown className="h-5 w-5 text-slate-500" />
          )}
        </div>
      </div>
      
      {section.isOpen && children}
    </div>
  );
};
