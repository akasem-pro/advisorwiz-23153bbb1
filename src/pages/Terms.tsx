
import React from 'react';
import LegalPageLayout from '../components/legal/LegalPageLayout';
import TermsContent from '../components/legal/TermsContent';

const Terms: React.FC = () => {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Terms of Service', url: '/terms' }
  ];

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
