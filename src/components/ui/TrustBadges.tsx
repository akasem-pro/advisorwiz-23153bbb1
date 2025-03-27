
import React from 'react';
import { Shield, Users, Award, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TrustBadgeProps {
  icon: React.ReactNode;
  text: string;
  className?: string;
}

const TrustBadge: React.FC<TrustBadgeProps> = ({ icon, text, className }) => {
  return (
    <div className={cn(
      "flex items-center px-3 py-2 text-sm md:text-base text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 rounded-md shadow-sm border border-gray-100 dark:border-gray-700",
      className
    )}>
      <div className="text-blue-600 dark:text-blue-400 mr-2">{icon}</div>
      <span>{text}</span>
    </div>
  );
};

interface TrustBadgesProps {
  className?: string;
  compact?: boolean;
}

const TrustBadges: React.FC<TrustBadgesProps> = ({ 
  className = '', 
  compact = false 
}) => {
  const iconSize = compact ? "h-3 w-3" : "h-4 w-4";
  
  return (
    <div className={cn(
      "flex flex-wrap items-center gap-3 justify-center",
      className
    )}>
      <TrustBadge 
        icon={<Shield className={iconSize} />} 
        text="Bank-Level Security" 
      />
      <TrustBadge 
        icon={<Users className={iconSize} />} 
        text="500+ Verified Advisors" 
      />
      <TrustBadge 
        icon={<Award className={iconSize} />} 
        text="Certified Professionals" 
      />
      <TrustBadge 
        icon={<Lock className={iconSize} />} 
        text="Data Protection" 
      />
    </div>
  );
};

export default TrustBadges;
