
// Function to generate Organization schema
export const generateOrganizationSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "AdvisorWiz",
    "url": "https://advisorwiz.com",
    "logo": "https://advisorwiz.com/logo.png",
    "sameAs": [
      "https://www.facebook.com/advisorwiz",
      "https://www.twitter.com/advisorwiz",
      "https://www.linkedin.com/company/advisorwiz"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-800-555-1234",
      "contactType": "customer service",
      "availableLanguage": ["English"]
    }
  };
};

// Function to generate FAQ schema
export const generateFAQSchema = (faqs: Array<{question: string, answer: string}>) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
};

// Function to generate Service schema for financial advisory services
export const generateServiceSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Financial Advisor Matching",
    "provider": {
      "@type": "Organization",
      "name": "AdvisorWiz"
    },
    "description": "AdvisorWiz connects consumers with experienced financial advisors who match their specific needs and preferences.",
    "areaServed": "United States",
    "audience": {
      "@type": "PeopleAudience",
      "audienceType": "Individuals seeking financial advice"
    }
  };
};
