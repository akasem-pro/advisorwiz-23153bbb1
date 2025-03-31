
import React from 'react';
import { useUser } from '../context/UserContext';
import { Link } from 'react-router-dom';
import PageSEO from '../components/seo/PageSEO';
import BreadcrumbNav from '../components/navigation/BreadcrumbNav';
import LeadManagement from '../components/lead/LeadManagement';
import AppLayout from '../components/layout/AppLayout';

const LeadManagementPage: React.FC = () => {
  const { userType, isAuthenticated } = useUser();
  
  const isAdvisor = userType === 'advisor' && isAuthenticated;

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Lead Management", url: "/leads" }
  ];
  
  return (
    <AppLayout>
      <PageSEO 
        title="Lead Management | Track Your Prospect Pipeline"
        description="Track and manage your leads from match to conversion. Monitor your sales pipeline and improve conversion rates."
        keywords="lead management, sales pipeline, prospect tracking, financial advisor leads"
        canonicalUrl="https://advisorwiz.com/leads"
      />
      
      {isAdvisor && <BreadcrumbNav items={breadcrumbs} />}
      
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {isAdvisor ? (
          <LeadManagement />
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-serif text-navy-900 dark:text-slate-100 mb-4">Access Restricted</h2>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              This feature is only available to financial advisors.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/signup" className="btn-primary">Get Started</Link>
              <Link to="/" className="btn-outline">Return Home</Link>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default LeadManagementPage;
