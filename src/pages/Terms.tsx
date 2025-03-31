
import React from 'react';
import AppLayout from '../components/layout/AppLayout';
import BreadcrumbNav from '../components/navigation/BreadcrumbNav';
import { FileText } from 'lucide-react';

const Terms: React.FC = () => {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Privacy Policy', url: '/terms' }
  ];

  return (
    <AppLayout>
      <BreadcrumbNav items={breadcrumbs} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="h-8 w-8 text-teal-600" />
            <h1 className="section-title">Privacy Policy</h1>
          </div>
          
          <div className="text-right text-sm text-slate-600 dark:text-slate-400 mb-6">
            Last Updated: Feb 20th 2025
          </div>
          
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <p className="lead">
              Welcome to AdvisorWiz! Your privacy is important to us. This Privacy Policy outlines how we collect, use, and 
              protect your personal information when you use our platform. By accessing or using AdvisorWiz, you agree to the 
              terms of this Privacy Policy.
            </p>
            
            <h2 className="mt-8 text-xl font-bold">1. Information We Collect</h2>
            <p>We collect information from both users (consumers) and financial advisors or firms:</p>
            
            <h3 className="mt-4 text-lg font-semibold">1.1 Information Collected from Users (Consumers)</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Personal Information:</strong> Name, email address, phone number, and other contact details provided when signing up.</li>
              <li><strong>Financial Information:</strong> Information provided for financial advisory services (we do not store sensitive financial data).</li>
              <li><strong>Usage Data:</strong> Information on how you interact with our platform, such as page visits, clicks, and preferences.</li>
              <li><strong>Device Information:</strong> IP address, browser type, and operating system for security and analytics purposes.</li>
            </ul>
            
            <h3 className="mt-4 text-lg font-semibold">1.2 Information Collected from Financial Advisors or Firms</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Business Information:</strong> Name, company details, regulatory certifications, and professional credentials.</li>
              <li><strong>Contact Information:</strong> Email, phone number, business address.</li>
              <li><strong>Profile Data:</strong> Information related to expertise, services, and availability provided to match consumers with advisors.</li>
              <li><strong>Transaction Information:</strong> Payment details for subscription services (processed securely, we do not store sensitive financial details).</li>
              <li><strong>Platform Engagement:</strong> Logins, interactions with users, and service history.</li>
            </ul>
            
            <h2 className="mt-8 text-xl font-bold">2. How We Use Your Information</h2>
            <p>We use collected data to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide, personalize, and improve our services.</li>
              <li>Connect consumers with financial advisors.</li>
              <li>Verify financial advisors' credentials and compliance with regulatory standards.</li>
              <li>Send important updates, newsletters, and promotional materials.</li>
              <li>Ensure platform security and fraud prevention.</li>
              <li>Comply with legal obligations.</li>
            </ul>
            
            <h2 className="mt-8 text-xl font-bold">3. Sharing Your Information</h2>
            <p>We do not sell or rent your personal data. However, we may share your information with:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Consumers:</strong> When financial advisors create profiles, relevant details are displayed to users seeking financial services.</li>
              <li><strong>Financial Advisors:</strong> When consumers request a consultation, their contact information may be shared with relevant advisors.</li>
              <li><strong>Service Providers:</strong> Third-party vendors who assist with platform operations, such as hosting and payment processing.</li>
              <li><strong>Legal Authorities:</strong> When required by law or to protect our platform and users.</li>
            </ul>
            
            <h2 className="mt-8 text-xl font-bold">4. Data Security</h2>
            <p>We implement industry-standard security measures to protect your information. However, no method of transmission over the internet is 100% secure. We encourage users and advisors to take necessary precautions when sharing personal data.</p>
            
            <h2 className="mt-8 text-xl font-bold">5. Your Rights & Choices</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access, update, or delete your personal data.</li>
              <li>Opt out of marketing communications.</li>
              <li>Request a copy of your data.</li>
              <li>Restrict or object to data processing under certain circumstances.</li>
            </ul>
            
            <h2 className="mt-8 text-xl font-bold">6. Cookies & Tracking Technologies</h2>
            <p>We use cookies to enhance user experience and analyze website traffic. You can manage your cookie preferences through your browser settings.</p>
            
            <h2 className="mt-8 text-xl font-bold">7. Third-Party Links</h2>
            <p>Our platform may contain links to third-party websites. We are not responsible for their privacy practices and encourage users and advisors to review their policies.</p>
            
            <h2 className="mt-8 text-xl font-bold">8. Changes to This Privacy Policy</h2>
            <p>We reserve the right to update this policy at any time. Continued use of our platform after changes means you accept the revised terms.</p>
            
            <h2 className="mt-8 text-xl font-bold">9. Contact Us</h2>
            <p>If you have any questions or concerns about this Privacy Policy, please contact us at:</p>
            <ul className="list-none space-y-2 mt-2">
              <li className="flex items-center gap-2">
                <span className="text-lg">📩</span> privacy@advisorwiz.com
              </li>
              <li className="flex items-center gap-2">
                <span className="text-lg">🌍</span> www.advisorwiz.com
              </li>
            </ul>
            
            <div className="mt-10 p-4 bg-slate-100 dark:bg-navy-800 rounded-lg">
              <p className="text-center font-medium">
                By using AdvisorWiz, you acknowledge and agree to this Privacy Policy. Thank you for trusting us with your information!
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Terms;
