
import React from 'react';
import BreadcrumbNav from '../components/navigation/BreadcrumbNav';
import PageSEO from '../components/seo/PageSEO';

const Privacy: React.FC = () => {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Privacy Policy', url: '/privacy' }
  ];

  return (
    <>
      <PageSEO 
        title="Privacy Policy | AdvisorWiz"
        description="Learn how we collect, use, and protect your personal information."
        canonicalUrl="https://advisorwiz.com/privacy"
      />
      
      <BreadcrumbNav items={breadcrumbs} />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-navy-900 dark:text-slate-100 mb-4">Privacy Policy</h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
            How we collect, use, and protect your personal information.
          </p>
          
          <div className="prose prose-slate max-w-none dark:prose-invert">
            <p>Last Updated: September 2023</p>
            
            <h2>Introduction</h2>
            <p>
              At AdvisorWiz, we take your privacy seriously. This Privacy Policy explains how we collect, 
              use, disclose, and safeguard your information when you visit our website or use our services.
            </p>
            
            <h2>Information We Collect</h2>
            <p>
              We may collect personal information that you provide directly to us, such as when you create an account,
              fill out a form, or communicate with us. This may include your name, email address, phone number,
              and financial information relevant to matching you with financial advisors.
            </p>
            
            <h2>How We Use Your Information</h2>
            <p>
              We use the information we collect to provide, maintain, and improve our services,
              to process transactions, send you related information, and communicate with you.
            </p>
            
            <h2>Sharing Your Information</h2>
            <p>
              We may share your personal information with financial advisors as part of our matching service,
              but only with your explicit consent. We do not sell your personal data to third parties.
            </p>
            
            <h2>Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information.
              However, no Internet transmission is completely secure, and we cannot guarantee the security of your information.
            </p>
            
            <h2>Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us at privacy@advisorwiz.com.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Privacy;
