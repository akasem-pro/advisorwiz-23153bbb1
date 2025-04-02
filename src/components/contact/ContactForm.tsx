
import React, { useState } from 'react';
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Send, Loader2, Mail } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { useFeedbackSystem } from "@/hooks/use-feedback-system";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  consent: boolean;
}

const ContactForm: React.FC = () => {
  const { showInlineFeedback } = useFeedbackSystem();
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
    consent: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, consent: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Call the Supabase Edge Function to handle the contact form
      const { data, error } = await supabase.functions.invoke('handle-contact', {
        body: formData,
      });

      if (error) {
        throw new Error(error.message || 'Failed to submit form');
      }

      // Show success message
      toast.success("Message sent successfully", {
        description: "We'll get back to you as soon as possible."
      });

      // Use our feedback system to show inline feedback
      showInlineFeedback({
        variant: 'success',
        title: 'Message Sent',
        description: 'Thank you for contacting us. We will get back to you shortly.',
        autoDisappear: true,
        duration: 5000
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        consent: false
      });
      
      setSubmitSuccess(true);
      
      // Reset success state after a delay
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
      
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast.error("Failed to send message", {
        description: "Please try again or contact us directly via email."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="text-center py-8">
        <div className="bg-teal-50 w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-6">
          <Mail className="text-teal-600 w-8 h-8" />
        </div>
        <h2 className="text-2xl font-serif font-medium mb-4">Thank You!</h2>
        <p className="text-slate-600 mb-6">
          Your message has been sent successfully. We'll get back to you as soon as possible.
        </p>
        <Button
          variant="outline"
          onClick={() => setSubmitSuccess(false)}
          className="mt-2"
        >
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <>
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
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Send Message
            </>
          )}
        </Button>
      </form>
    </>
  );
};

export default ContactForm;
