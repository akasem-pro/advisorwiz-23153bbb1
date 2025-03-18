
import React from 'react';
import { Quote } from 'lucide-react';

type Testimonial = {
  id: number;
  quote: string;
  author: string;
  title: string;
  company?: string;
  image?: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "AdvisorWiz helped me find a financial advisor who truly understood my needs. The matching process was seamless and I've been working with my advisor for over a year now.",
    author: "Sarah Johnson",
    title: "Small Business Owner",
    company: "Bright Ideas LLC",
  },
  {
    id: 2,
    quote: "As someone planning for retirement, I needed specialized advice. Through AdvisorWiz, I connected with an advisor who specializes in retirement planning, and the results have been exceptional.",
    author: "Michael Chen",
    title: "Pre-Retiree",
  },
  {
    id: 3,
    quote: "The advisor matching service saved me hours of research. The advisor I was matched with has deep expertise in estate planning, exactly what I was looking for.",
    author: "Emily Rodriguez",
    title: "Healthcare Professional",
    company: "City General Hospital",
  },
];

const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-16 bg-white dark:bg-navy-900" aria-labelledby="testimonials-heading">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 id="testimonials-heading" className="text-3xl font-serif font-bold text-navy-900 dark:text-white mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Don't take our word for it — hear from people who have found their perfect financial match through AdvisorWiz.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-slate-50 dark:bg-navy-800 p-6 md:p-8 rounded-xl shadow-sm border border-slate-100 dark:border-navy-700 hover:shadow-md transition-shadow"
            >
              <Quote className="text-teal-500 mb-4 w-10 h-10" aria-hidden="true" />
              <blockquote className="mb-6">
                <p className="text-slate-700 dark:text-slate-200 italic mb-4">"{testimonial.quote}"</p>
                <footer className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-navy-200 dark:bg-navy-600 flex items-center justify-center text-white font-medium mr-3">
                    {testimonial.image ? (
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.author} 
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <span>{testimonial.author.charAt(0)}</span>
                    )}
                  </div>
                  <div>
                    <cite className="font-medium text-navy-900 dark:text-white not-italic block">
                      {testimonial.author}
                    </cite>
                    <span className="text-slate-600 dark:text-slate-400 text-sm">
                      {testimonial.title}
                      {testimonial.company && ` • ${testimonial.company}`}
                    </span>
                  </div>
                </footer>
              </blockquote>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
