
import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactInfo: React.FC = () => {
  return (
    <div className="grid md:grid-cols-3 gap-8 mb-12">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 text-center">
        <div className="bg-teal-50 w-12 h-12 flex items-center justify-center rounded-full mx-auto mb-4">
          <Mail className="text-teal-600 w-5 h-5" />
        </div>
        <h3 className="font-medium text-lg mb-2">Email Us</h3>
        <a href="mailto:info@advisorwiz.com" className="text-teal-600 hover:text-teal-700">
          info@advisorwiz.com
        </a>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 text-center">
        <div className="bg-teal-50 w-12 h-12 flex items-center justify-center rounded-full mx-auto mb-4">
          <Phone className="text-teal-600 w-5 h-5" />
        </div>
        <h3 className="font-medium text-lg mb-2">Call Us</h3>
        <a href="tel:+18005551234" className="text-teal-600 hover:text-teal-700">
          +1 (800) 555-1234
        </a>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 text-center">
        <div className="bg-teal-50 w-12 h-12 flex items-center justify-center rounded-full mx-auto mb-4">
          <MapPin className="text-teal-600 w-5 h-5" />
        </div>
        <h3 className="font-medium text-lg mb-2">Visit Us</h3>
        <p className="text-slate-600">
          123 Financial District,<br />
          Toronto, ON M5J 2Y7
        </p>
      </div>
    </div>
  );
};

export default ContactInfo;
