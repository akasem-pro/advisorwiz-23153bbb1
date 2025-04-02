
import React from 'react';
import ContactHeader from "../components/contact/ContactHeader";
import ContactInfo from "../components/contact/ContactInfo";
import ContactForm from "../components/contact/ContactForm";

const ContactUs: React.FC = () => {
  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-28">
        <div className="max-w-4xl mx-auto">
          <ContactHeader />
          <ContactInfo />
          <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
            <ContactForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
