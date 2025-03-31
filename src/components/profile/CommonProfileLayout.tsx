
import React, { ReactNode, useMemo } from 'react';
import AppLayout from '../layout/AppLayout';
import { PageLoadingFallback } from '../LazyComponents';

interface CommonProfileLayoutProps {
  children: ReactNode;
  isLoading?: boolean;
  pageTitle: string;
  pageDescription?: string;
  headerComponent?: ReactNode;
}

const CommonProfileLayout: React.FC<CommonProfileLayoutProps> = ({
  children,
  isLoading = false,
  pageTitle,
  pageDescription,
  headerComponent
}) => {
  // Memoize the header component to prevent unnecessary rerenders
  const renderHeader = useMemo(() => {
    if (headerComponent) return headerComponent;
    
    return (
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-navy-900 dark:text-white mb-4">
          {pageTitle}
        </h1>
        {pageDescription && (
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            {pageDescription}
          </p>
        )}
      </div>
    );
  }, [headerComponent, pageTitle, pageDescription]);

  return (
    <AppLayout>
      <div className="pt-6">
        <div className="container mx-auto px-4 py-6 md:py-12 max-w-4xl">
          {isLoading ? (
            <PageLoadingFallback />
          ) : (
            <div className="glass-card rounded-2xl overflow-hidden shadow-lg">
              <div className="p-6 md:p-8">
                {renderHeader}
                {children}
              </div>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default CommonProfileLayout;
