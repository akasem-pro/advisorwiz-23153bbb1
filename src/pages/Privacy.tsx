
import React from 'react';
import LegalPageLayout from '../components/legal/LegalPageLayout';
import PrivacyContent from '../components/legal/PrivacyContent';
import { useIsMobile } from '../hooks/use-mobile';
import MobileLayout from '../components/layout/MobileLayout';

const Privacy: React.FC = () => {
  const isMobile = useIsMobile();
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Privacy Policy', url: '/privacy' }
  ];

  // Use mobile layout for small screens, otherwise use the standard legal page layout
  if (isMobile) {
    return (
      <MobileLayout
        contentClassName="mobile-container"
        showFooter={true}
      >
        <div className="mobile-section">
          <h1 className="mobile-header text-center mb-6">Privacy Policy</h1>
          <div className="mobile-card">
            <div className="prose prose-sm dark:prose-invert">
              <PrivacyContent />
            </div>
          </div>
        </div>
      </MobileLayout>
    );
  }

  return (
    <LegalPageLayout
      title="Privacy Policy"
      description="How we collect, use, and protect your personal information."
      canonicalUrl="https://advisorwiz.com/privacy"
      breadcrumbs={breadcrumbs}
      lastUpdated="Feb 20th, 2025"
    >
      <PrivacyContent />
    </LegalPageLayout>
  );
};

export default Privacy;
