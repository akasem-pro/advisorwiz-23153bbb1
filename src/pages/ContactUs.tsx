
import React from 'react';
import ContactHeader from "../components/contact/ContactHeader";
import ContactInfo from "../components/contact/ContactInfo";
import ContactForm from "../components/contact/ContactForm";
import EnhancedBreadcrumbNav from "../components/navigation/EnhancedBreadcrumbNav";
import PageSEO from "../components/seo/PageSEO";
import { useFeedbackSystem } from "../hooks/use-feedback-system";

const ContactUs: React.FC = () => {
  const { inlineFeedback, showInlineFeedback, clearInlineFeedback } = useFeedbackSystem();
  
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Contact Us', url: '/contact' }
  ];
  
  return (
    <>
      <PageSEO
        title="Contact Us - AdvisorWiz"
        description="Get in touch with our team for support, inquiries, or feedback. We're here to help with all your financial advisory needs."
        breadcrumbs={breadcrumbs}
      />
      
      <EnhancedBreadcrumbNav items={breadcrumbs} />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="max-w-4xl mx-auto">
          <ContactHeader />
          <ContactInfo />
          
          {inlineFeedback && (
            <div className="mb-6">
              <InlineFeedback
                variant={inlineFeedback.variant as any}
                message={inlineFeedback.description}
                title={inlineFeedback.title}
                onDismiss={clearInlineFeedback}
              />
            </div>
          )}
          
          <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
            <ContactForm 
              onSubmit={() => {
                showInlineFeedback({
                  variant: 'success',
                  title: 'Message Sent',
                  description: 'Thank you for contacting us. We will get back to you shortly.',
                  autoDisappear: true,
                  duration: 5000
                });
              }} 
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
