
// Function to generate WebSite schema
export const generateWebsiteSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "AdvisorWiz | Find Your Perfect Financial Advisor Match",
    "url": "https://advisorwiz.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://advisorwiz.com/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    "inLanguage": "en-US",
    "description": "AdvisorWiz connects you with experienced financial advisors who match your specific needs and preferences. Our proprietary algorithm ensures you find your ideal financial match.",
    "publisher": {
      "@type": "Organization",
      "name": "AdvisorWiz",
      "logo": {
        "@type": "ImageObject",
        "url": "https://advisorwiz.com/lovable-uploads/d66162b8-d098-4ffe-a300-d14aa6ffe38e.png"
      }
    }
  };
};
