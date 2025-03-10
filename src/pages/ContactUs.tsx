
import React, { useState } from 'react';
import { useToast } from "../hooks/use-toast";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { Checkbox } from "../components/ui/checkbox";
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";

const ContactUs: React.FC = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    consent: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, consent: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent",
        description: "We'll get back to you as soon as possible.",
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        consent: false
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-serif font-medium mb-4">Contact Us</h1>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Have questions or need assistance? We're here to help. Fill out the form below or reach out to us directly.
              </p>
            </div>

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

            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
              <h2 className="text-2xl font-serif font-medium mb-6">Send Us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium text-navy-800">
                      Full Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-navy-800">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="phone" className="block text-sm font-medium text-navy-800">
                    Phone Number (Optional)
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (123) 456-7890"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-medium text-navy-800">
                    Your Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    rows={5}
                    required
                  />
                </div>
                
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="consent"
                    checked={formData.consent}
                    onCheckedChange={handleCheckboxChange}
                    required
                  />
                  <label
                    htmlFor="consent"
                    className="text-sm text-slate-600 leading-tight"
                  >
                    I consent to AdvisorWiz processing my data to respond to my inquiry. I understand that I can unsubscribe at any time.
                  </label>
                </div>
                
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto"
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactUs;
