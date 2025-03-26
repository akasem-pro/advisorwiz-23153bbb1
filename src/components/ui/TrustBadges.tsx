
import React from 'react';
import { Shield, Lock, CheckCircle2, Award, Database, CreditCard } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip';

interface BadgeProps {
  icon: React.ReactNode;
  label: string;
  description: string;
  className?: string;
}

const TrustBadge: React.FC<BadgeProps> = ({ icon, label, description, className }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={`flex items-center bg-white dark:bg-navy-800 border border-slate-200 dark:border-navy-700 rounded-lg px-3 py-2 hover:shadow-md transition-shadow ${className}`}>
            <div className="mr-2 text-teal-600 dark:text-teal-400">
              {icon}
            </div>
            <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{label}</span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-sm">{description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export const TrustBadges: React.FC<{ className?: string; compact?: boolean }> = ({ className, compact = false }) => {
  const badges = [
    {
      icon: <Shield className="h-4 w-4" />,
      label: "SSL Secured",
      description: "Your data is protected with 256-bit encryption"
    },
    {
      icon: <CheckCircle2 className="h-4 w-4" />,
      label: "SEC Compliant",
      description: "We adhere to all SEC regulatory requirements"
    },
    {
      icon: <Lock className="h-4 w-4" />,
      label: "GDPR Ready",
      description: "Fully compliant with data protection regulations"
    },
    {
      icon: <Award className="h-4 w-4" />,
      label: "FINRA Approved",
      description: "Financial Industry Regulatory Authority verified"
    },
    {
      icon: <Database className="h-4 w-4" />,
      label: "Data Protection",
      description: "Your financial data is securely stored and protected"
    },
    {
      icon: <CreditCard className="h-4 w-4" />,
      label: "Secure Payments",
      description: "All transactions are processed through secure channels"
    }
  ];

  if (compact) {
    return (
      <div className={`flex flex-wrap gap-2 ${className}`}>
        {badges.map((badge, index) => (
          <div key={index} className="flex items-center text-teal-600 dark:text-teal-400">
            {badge.icon}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {badges.map((badge, index) => (
        <TrustBadge key={index} {...badge} />
      ))}
    </div>
  );
};

export default TrustBadges;
