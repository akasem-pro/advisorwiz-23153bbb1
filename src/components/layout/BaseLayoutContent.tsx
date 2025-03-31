
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import TrustBadges from '../ui/TrustBadges';
import FloatingSupportButton from '../support/FloatingSupportButton';

interface BaseLayoutContentProps {
  children: ReactNode;
  showTrustBadges?: boolean;
  fullWidth?: boolean;
  contentClassName?: string;
  withoutPadding?: boolean;
  skipToContentId?: string;
  contentVisible?: boolean;
  showFloatingSupport?: boolean;
  isInitialLoad: boolean;
}

const BaseLayoutContent: React.FC<BaseLayoutContentProps> = ({
  children,
  showTrustBadges = true,
  fullWidth = false,
  contentClassName = '',
  withoutPadding = false,
  skipToContentId,
  contentVisible = true,
  showFloatingSupport = true,
  isInitialLoad
}) => {
  return (
    <>
      <main className={cn(
        "flex-grow",
        withoutPadding ? '' : 'py-4'
      )} id={skipToContentId}>
        <div className={cn(
          "container mx-auto px-4 py-8",
          withoutPadding ? '' : contentClassName
        )}>
          {children}
        </div>
        
        {showTrustBadges && (
          <div className={cn(
            fullWidth ? 'w-full' : 'container mx-auto',
            'my-2'
          )}>
            <TrustBadges className="justify-center" />
          </div>
        )}
      </main>
      
      {/* Only render FloatingSupportButton after initial load */}
      {showFloatingSupport && !isInitialLoad && (
        <React.Suspense fallback={null}>
          <FloatingSupportButton />
        </React.Suspense>
      )}
    </>
  );
};

export default BaseLayoutContent;
