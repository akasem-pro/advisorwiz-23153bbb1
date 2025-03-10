
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const Privacy: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-slate-50">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-navy-900 mb-8">Privacy Policy</h1>
          <p className="text-slate-500 mb-8">Last Updated: Feb 20th 2025</p>
          
          <div className="prose prose-slate max-w-none">
            <p className="mb-6">
              Welcome to AdvisorWiz! Your privacy is important to us. This Privacy Policy outlines how we collect, use, 
              and protect your personal information when you use our platform. By accessing or using AdvisorWiz, 
              you agree to the terms of this Privacy Policy.
            </p>
            
            <h2 className="text-2xl font-serif font-semibold text-navy-900 mt-10 mb-4">1. Information We Collect</h2>
            <p className="mb-2">We collect information from both users (consumers) and financial advisors or firms:</p>
            
            <h3 className="text-xl font-serif font-semibold text-navy-800 mt-6 mb-2">1.1 Information Collected from Users (Consumers)</h3>
            <ul className="pl-6 mb-4 space-y-2 list-none">
              <li><strong>Personal Information:</strong> Name, email address, phone number, and other contact details provided when signing up.</li>
              <li><strong>Financial Information:</strong> Information provided for financial advisory services (we do not store sensitive financial data).</li>
              <li><strong>Usage Data:</strong> Information on how you interact with our platform, such as page visits, clicks, and preferences.</li>
              <li><strong>Device Information:</strong> IP address, browser type, and operating system for security and analytics purposes.</li>
            </ul>
            
            <h3 className="text-xl font-serif font-semibold text-navy-800 mt-6 mb-2">1.2 Information Collected from Financial Advisors or Firms</h3>
            <ul className="pl-6 mb-6 space-y-2 list-none">
              <li><strong>Business Information:</strong> Name, company details, regulatory certifications, and professional credentials.</li>
              <li><strong>Contact Information:</strong> Email, phone number, business address.</li>
              <li><strong>Profile Data:</strong> Information related to expertise, services, and availability provided to match consumers with advisors.</li>
              <li><strong>Transaction Information:</strong> Payment details for subscription services (processed securely, we do not store sensitive financial details).</li>
              <li><strong>Platform Engagement:</strong> Logins, interactions with users, and service history.</li>
            </ul>
            
            <h2 className="text-2xl font-serif font-semibold text-navy-900 mt-10 mb-4">2. How We Use Your Information</h2>
            <p className="mb-2">We use collected data to:</p>
            <ul className="pl-6 mb-6 space-y-2 list-none">
              <li>Provide, personalize, and improve our services.</li>
              <li>Connect consumers with financial advisors.</li>
              <li>Verify financial advisors' credentials and compliance with regulatory standards.</li>
              <li>Send important updates, newsletters, and promotional materials.</li>
              <li>Ensure platform security and fraud prevention.</li>
              <li>Comply with legal obligations.</li>
            </ul>
            
            <h2 className="text-2xl font-serif font-semibold text-navy-900 mt-10 mb-4">3. Sharing Your Information</h2>
            <p className="mb-2">We do not sell or rent your personal data. However, we may share your information with:</p>
            <ul className="pl-6 mb-6 space-y-2 list-none">
              <li><strong>Consumers:</strong> When financial advisors create profiles, relevant details are displayed to users seeking financial services.</li>
              <li><strong>Financial Advisors:</strong> When consumers request a consultation, their contact information may be shared with relevant advisors.</li>
              <li><strong>Service Providers:</strong> Third-party vendors who assist with platform operations, such as hosting and payment processing.</li>
              <li><strong>Legal Authorities:</strong> When required by law or to protect our platform and users.</li>
            </ul>
            
            <h2 className="text-2xl font-serif font-semibold text-navy-900 mt-10 mb-4">4. Data Security</h2>
            <p className="mb-6">
              We implement industry-standard security measures to protect your information. However, no method of transmission 
              over the internet is 100% secure. We encourage users and advisors to take necessary precautions when sharing personal data.
            </p>
            
            <h2 className="text-2xl font-serif font-semibold text-navy-900 mt-10 mb-4">5. Your Rights & Choices</h2>
            <p className="mb-2">You have the right to:</p>
            <ul className="pl-6 mb-6 space-y-2 list-none">
              <li>Access, update, or delete your personal data.</li>
              <li>Opt out of marketing communications.</li>
              <li>Request a copy of your data.</li>
              <li>Restrict or object to data processing under certain circumstances.</li>
            </ul>
            
            <h2 className="text-2xl font-serif font-semibold text-navy-900 mt-10 mb-4">6. Cookies & Tracking Technologies</h2>
            <p className="mb-6">
              We use cookies to enhance user experience and analyze website traffic. You can manage your cookie preferences through your browser settings.
            </p>
            
            <h2 className="text-2xl font-serif font-semibold text-navy-900 mt-10 mb-4">7. Third-Party Links</h2>
            <p className="mb-6">
              Our platform may contain links to third-party websites. We are not responsible for their privacy practices and encourage 
              users and advisors to review their policies.
            </p>
            
            <h2 className="text-2xl font-serif font-semibold text-navy-900 mt-10 mb-4">8. Changes to This Privacy Policy</h2>
            <p className="mb-6">
              We reserve the right to update this policy at any time. Continued use of our platform after changes means you accept the revised terms.
            </p>
            
            <h2 className="text-2xl font-serif font-semibold text-navy-900 mt-10 mb-4">9. Contact Us</h2>
            <p className="mb-6">
              If you have any questions or concerns about this Privacy Policy, please contact us at:
            </p>
            <ul className="list-none mb-6 space-y-2">
              <li>📩 <a href="mailto:privacy@advisorwiz.com" className="text-teal-600 hover:text-teal-800">privacy@advisorwiz.com</a></li>
              <li>🌍 <a href="https://www.advisorwiz.com" className="text-teal-600 hover:text-teal-800">www.advisorwiz.com</a></li>
            </ul>
            
            <p className="mt-8 mb-6 font-medium">
              By using AdvisorWiz, you acknowledge and agree to this Privacy Policy. Thank you for trusting us with your information!
            </p>
          </div>
          
          <div className="mt-12 mb-8">
            <Link to="/" className="text-teal-600 hover:text-teal-800 font-medium">
              ← Return to Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
