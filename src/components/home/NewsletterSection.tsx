
import React, { useState, lazy, Suspense } from 'react';
import { Mail, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { toast } from 'sonner';

// Lazy load the success message component for optimization
const SuccessMessage = lazy(() => import('../ui/SuccessMessage'));

const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast.error("Invalid email", {
        description: "Please enter a valid email address."
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast.success("Success!", {
        description: "You've been subscribed to our newsletter."
      });
      setEmail('');
      setIsSubmitting(false);
      setIsSubscribed(true);
      
      // Track conversion for analytics
      if (typeof window !== 'undefined' && 'gtag' in window) {
        // @ts-ignore
        window.gtag('event', 'newsletter_subscription', {
          'event_category': 'engagement',
          'event_label': 'homepage_newsletter'
        });
      }
    }, 1000);
  };

  return (
    <section id="newsletter" className="py-16 bg-gradient-to-br from-navy-800 to-navy-900 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <Mail className="w-12 h-12 text-teal-400 mb-4 mx-auto" aria-hidden="true" />
          <h2 className="text-3xl font-serif font-bold mb-4 text-white">
            Stay Updated with Financial Insights
          </h2>
          <p className="text-lg text-slate-300 mb-8">
            Join our newsletter for expert financial tips, industry trends, and exclusive resources to help you make informed decisions.
          </p>
          
          {isSubscribed ? (
            <Suspense fallback={<div className="text-white">Loading...</div>}>
              <SuccessMessage message="Thanks for subscribing! Check your inbox soon for financial insights." />
            </Suspense>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                aria-label="Email address"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-teal-400"
                required
                data-testid="newsletter-email-input"
              />
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-teal-500 hover:bg-teal-600 text-white font-medium"
                data-testid="newsletter-submit-button"
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                <ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
              </Button>
            </form>
          )}
          
          <p className="text-sm text-slate-400 mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
