
// Function to generate Service schema for financial advisory services
export const generateServiceSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Financial Advisor Matching",
    "provider": {
      "@type": "Organization",
      "name": "AdvisorWiz",
      "url": "https://advisorwiz.com"
    },
    "description": "AdvisorWiz connects consumers with experienced financial advisors who match their specific needs and preferences.",
    "areaServed": "United States",
    "audience": {
      "@type": "PeopleAudience",
      "audienceType": "Individuals seeking financial advice"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "termsOfService": "https://advisorwiz.com/terms",
    "brand": {
      "@type": "Brand",
      "name": "AdvisorWiz"
    }
  };
};
