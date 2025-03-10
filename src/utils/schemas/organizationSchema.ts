
// Function to generate Organization schema
export const generateOrganizationSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "AdvisorWiz",
    "url": "https://advisorwiz.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://advisorwiz.com/lovable-uploads/d66162b8-d098-4ffe-a300-d14aa6ffe38e.png",
      "width": "512",
      "height": "512"
    },
    "sameAs": [
      "https://www.facebook.com/advisorwiz",
      "https://www.twitter.com/advisorwiz",
      "https://www.linkedin.com/company/advisorwiz",
      "https://www.instagram.com/advisorwiz"
    ],
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+1-800-555-1234",
        "contactType": "customer service",
        "availableLanguage": ["English"],
        "contactOption": "TollFree"
      },
      {
        "@type": "ContactPoint",
        "telephone": "+1-800-555-4321",
        "contactType": "technical support",
        "availableLanguage": ["English"],
        "contactOption": "TollFree"
      }
    ],
    "description": "AdvisorWiz connects consumers with experienced financial advisors who match their specific needs and preferences. Our proprietary matching algorithm ensures you find your perfect financial advisor match.",
    "foundingDate": "2022-01-01",
    "founders": [
      {
        "@type": "Person",
        "name": "AdvisorWiz Founder"
      }
    ],
    "numberOfEmployees": {
      "@type": "QuantitativeValue",
      "value": "25"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Finance Street",
      "addressLocality": "Financial District",
      "addressRegion": "NY",
      "postalCode": "10005",
      "addressCountry": "US"
    },
    "areaServed": {
      "@type": "Country",
      "name": "United States"
    },
    "award": "Best Financial Technology Platform 2023",
    "slogan": "Find Your Perfect Financial Advisor Match"
  };
};
