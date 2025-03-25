
import React from 'react';
import AppLayout from '../components/layout/AppLayout';
import AccessibilityDashboard from '../components/admin/AccessibilityDashboard';

const AccessibilityTestPage: React.FC = () => {
  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-6">Accessibility Testing</h1>
        <AccessibilityDashboard />
      </div>
    </AppLayout>
  );
};

export default AccessibilityTestPage;
