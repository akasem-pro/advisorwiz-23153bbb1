
import React from 'react';
import LegalPageLayout from '../components/legal/LegalPageLayout';
import TermsContent from '../components/legal/TermsContent';
import { useIsMobile } from '../hooks/use-mobile';
import MobileLayout from '../components/layout/MobileLayout';

const Terms: React.FC = () => {
  const isMobile = useIsMobile();
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Terms of Service', url: '/terms' }
  ];

  // Use mobile layout for small screens, otherwise use the standard legal page layout
  if (isMobile) {
    return (
      <MobileLayout
        contentClassName="mobile-container"
        showFooter={true}
      >
        <div className="mobile-section">
          <h1 className="mobile-header text-center mb-6">Terms of Service</h1>
          <div className="mobile-card">
            <div className="prose prose-sm dark:prose-invert">
              <TermsContent />
            </div>
          </div>
        </div>
      </MobileLayout>
    );
  }

  return (
    <LegalPageLayout
      title="Terms of Service"
      description="Please read these terms carefully before using our platform."
      canonicalUrl="https://advisorwiz.com/terms"
      breadcrumbs={breadcrumbs}
      lastUpdated="Feb 20th, 2025"
    >
      <TermsContent />
    </LegalPageLayout>
  );
};

export default Terms;
