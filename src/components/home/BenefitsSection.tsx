
import React from 'react';
import { CheckCircle } from 'lucide-react';

const BenefitsSection: React.FC = () => {
  const benefitCategories = [
    {
      title: "For Consumers",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f",
      alt: "Person reviewing financial documents with an advisor",
      iconColor: "text-teal-500 dark:text-teal-400",
      benefits: [
        "Personalized matching based on your financial goals and preferences",
        "Transparent advisor profiles with verified credentials",
        "Direct communication with potential advisors",
        "Free initial consultations to ensure compatibility",
        "Secure platform to share financial information",
        "Rate and review your experience"
      ]
    },
    {
      title: "For Advisors",
      image: "https://images.unsplash.com/photo-1591696205602-2f950c417cb9",
      alt: "Financial advisor meeting with clients in office",
      iconColor: "text-navy-500 dark:text-navy-400",
      benefits: [
        "Connect with pre-qualified potential clients",
        "Showcase your expertise and credentials",
        "Display client testimonials and success stories",
        "Efficient client acquisition without cold calling",
        "Manage appointments and communications in one place",
        "Build your reputation through verified reviews"
      ]
    },
    {
      title: "For Financial Firms",
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf",
      alt: "Group of financial professionals in a business meeting",
      iconColor: "text-purple-500 dark:text-purple-400",
      benefits: [
        "Manage multiple advisor profiles under one organization",
        "Streamline client acquisition for your entire team",
        "Maintain consistent branding across all advisors",
        "Track performance metrics for your firm",
        "Centralized management and administration",
        "Showcase your firm's unique value proposition"
      ]
    }
  ];

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-navy-50 dark:bg-navy-900" aria-labelledby="benefits-heading">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-teal-600 dark:text-teal-400 font-medium">Benefits</span>
          <h2 id="benefits-heading" className="mt-2 text-3xl md:text-4xl font-serif font-bold text-navy-900 dark:text-white">
            Why Choose AdvisorWiz
          </h2>
          <p className="mt-4 text-lg text-slate-700 dark:text-slate-300">
            Our platform provides unique advantages for consumers, financial advisors, and firms.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {benefitCategories.map((category, index) => (
            <div key={index} className="bg-white dark:bg-navy-800 rounded-xl shadow-sm overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.alt} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-serif font-semibold text-navy-900 dark:text-white mb-6">
                  {category.title}
                </h3>
                <ul className="space-y-4">
                  {category.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle className={`w-5 h-5 ${category.iconColor} mt-1 mr-3 flex-shrink-0`} />
                      <span className="text-slate-700 dark:text-slate-300">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
