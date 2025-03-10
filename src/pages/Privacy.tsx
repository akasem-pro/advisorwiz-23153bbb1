
import React from 'react';
import AppLayout from '../components/layout/AppLayout';

const Privacy = () => {
  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="glass-card rounded-2xl overflow-hidden shadow-lg">
          <div className="p-6 md:p-8">
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-navy-900 mb-2">
                Privacy Policy
              </h1>
              <p className="text-slate-500 text-sm">Last Updated: Feb 20th 2025</p>
            </div>

            <div className="prose max-w-none text-slate-700">
              <p className="mb-6">
                Welcome to AdvisorWiz! Your privacy is important to us. This Privacy Policy outlines how we collect, use, and protect your personal information when you use our platform. By accessing or using AdvisorWiz, you agree to the terms of this Privacy Policy.
              </p>

              <section className="mb-8">
                <h2 className="text-xl font-serif font-semibold text-navy-800 mb-4">1. Information We Collect</h2>
                <p className="mb-4">We collect information from both users (consumers) and financial advisors or firms:</p>

                <h3 className="text-lg font-serif font-medium text-navy-700 mb-2">1.1 Information Collected from Users (Consumers)</h3>
                <ul className="list-disc pl-6 mb-4 space-y-1">
                  <li><strong>Personal Information:</strong> Name, email address, phone number, and other contact details provided when signing up.</li>
                  <li><strong>Financial Information:</strong> Information provided for financial advisory services (we do not store sensitive financial data).</li>
                  <li><strong>Usage Data:</strong> Information on how you interact with our platform, such as page visits, clicks, and preferences.</li>
                  <li><strong>Device Information:</strong> IP address, browser type, and operating system for security and analytics purposes.</li>
                </ul>

                <h3 className="text-lg font-serif font-medium text-navy-700 mb-2">1.2 Information Collected from Financial Advisors or Firms</h3>
                <ul className="list-disc pl-6 mb-4 space-y-1">
                  <li><strong>Business Information:</strong> Name, company details, regulatory certifications, and professional credentials.</li>
                  <li><strong>Contact Information:</strong> Email, phone number, business address.</li>
                  <li><strong>Profile Data:</strong> Information related to expertise, services, and availability provided to match consumers with advisors.</li>
                  <li><strong>Transaction Information:</strong> Payment details for subscription services (processed securely, we do not store sensitive financial details).</li>
                  <li><strong>Platform Engagement:</strong> Logins, interactions with users, and service history.</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-serif font-semibold text-navy-800 mb-4">2. How We Use Your Information</h2>
                <p className="mb-2">We use collected data to:</p>
                <ul className="list-disc pl-6 mb-4 space-y-1">
                  <li>Provide, personalize, and improve our services.</li>
                  <li>Connect consumers with financial advisors.</li>
                  <li>Verify financial advisors' credentials and compliance with regulatory standards.</li>
                  <li>Send important updates, newsletters, and promotional materials.</li>
                  <li>Ensure platform security and fraud prevention.</li>
                  <li>Comply with legal obligations.</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-serif font-semibold text-navy-800 mb-4">3. Sharing Your Information</h2>
                <p className="mb-4">We do not sell or rent your personal data. However, we may share your information with:</p>
                <ul className="list-disc pl-6 mb-4 space-y-1">
                  <li><strong>Consumers:</strong> When financial advisors create profiles, relevant details are displayed to users seeking financial services.</li>
                  <li><strong>Financial Advisors:</strong> When consumers request a consultation, their contact information may be shared with relevant advisors.</li>
                  <li><strong>Service Providers:</strong> Third-party vendors who assist with platform operations, such as hosting and payment processing.</li>
                  <li><strong>Legal Authorities:</strong> When required by law or to protect our platform and users.</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-serif font-semibold text-navy-800 mb-4">4. Data Security</h2>
                <p className="mb-4">We implement industry-standard security measures to protect your information. However, no method of transmission over the internet is 100% secure. We encourage users and advisors to take necessary precautions when sharing personal data.</p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-serif font-semibold text-navy-800 mb-4">5. Your Rights & Choices</h2>
                <p className="mb-2">You have the right to:</p>
                <ul className="list-disc pl-6 mb-4 space-y-1">
                  <li>Access, update, or delete your personal data.</li>
                  <li>Opt out of marketing communications.</li>
                  <li>Request a copy of your data.</li>
                  <li>Restrict or object to data processing under certain circumstances.</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-serif font-semibold text-navy-800 mb-4">6. Cookies & Tracking Technologies</h2>
                <p className="mb-4">We use cookies to enhance user experience and analyze website traffic. You can manage your cookie preferences through your browser settings.</p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-serif font-semibold text-navy-800 mb-4">7. Third-Party Links</h2>
                <p className="mb-4">Our platform may contain links to third-party websites. We are not responsible for their privacy practices and encourage users and advisors to review their policies.</p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-serif font-semibold text-navy-800 mb-4">8. Changes to This Privacy Policy</h2>
                <p className="mb-4">We reserve the right to update this policy at any time. Continued use of our platform after changes means you accept the revised terms.</p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-serif font-semibold text-navy-800 mb-4">9. Contact Us</h2>
                <p className="mb-4">If you have any questions or concerns about this Privacy Policy, please contact us at:</p>
                <p className="mb-2">📩 privacy@advisorwiz.com</p>
                <p className="mb-2">🌍 www.advisorwiz.com</p>
                <p>By using AdvisorWiz, you acknowledge and agree to this Privacy Policy. Thank you for trusting us with your information!</p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Privacy;
