
import React from 'react';
import LegalPageLayout from '../components/legal/LegalPageLayout';
import PrivacyContent from '../components/legal/PrivacyContent';

const Privacy: React.FC = () => {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Privacy Policy', url: '/privacy' }
  ];

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
