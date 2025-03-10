
// Function to generate Organization schema
export const generateOrganizationSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "AdvisorWiz",
    "url": "https://advisorwiz.com",
    "logo": "https://advisorwiz.com/lovable-uploads/d66162b8-d098-4ffe-a300-d14aa6ffe38e.png",
    "sameAs": [
      "https://www.facebook.com/advisorwiz",
      "https://www.twitter.com/advisorwiz",
      "https://www.linkedin.com/company/advisorwiz",
      "https://www.instagram.com/advisorwiz"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-800-555-1234",
      "contactType": "customer service",
      "availableLanguage": ["English"]
    },
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

// Function to generate BreadcrumbList schema
export const generateBreadcrumbSchema = (items: Array<{name: string, url: string}>) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
};

// Function to generate Article schema
export const generateArticleSchema = (article: {
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified: string;
  authorName: string;
  publisherName: string;
  publisherLogo: string;
  url: string;
}) => {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.headline,
    "description": article.description,
    "image": article.image,
    "datePublished": article.datePublished,
    "dateModified": article.dateModified,
    "author": {
      "@type": "Person",
      "name": article.authorName
    },
    "publisher": {
      "@type": "Organization",
      "name": article.publisherName,
      "logo": {
        "@type": "ImageObject",
        "url": article.publisherLogo
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": article.url
    }
  };
};

// Function to generate LocalBusiness schema
export const generateLocalBusinessSchema = (locations: Array<{
  name: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  telephone: string;
  latitude?: number;
  longitude?: number;
}>) => {
  return locations.map(location => ({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `AdvisorWiz - ${location.name}`,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": location.address,
      "addressLocality": location.city,
      "addressRegion": location.state,
      "postalCode": location.postalCode,
      "addressCountry": "US"
    },
    "telephone": location.telephone,
    "url": "https://advisorwiz.com",
    ...(location.latitude && location.longitude ? {
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": location.latitude,
        "longitude": location.longitude
      }
    } : {})
  }));
};

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

// Function to generate Person schema (for team members, advisors)
export const generatePersonSchema = (person: {
  name: string;
  jobTitle: string;
  image: string;
  description: string;
  sameAs?: string[];
  url?: string;
}) => {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": person.name,
    "jobTitle": person.jobTitle,
    "image": person.image,
    "description": person.description,
    "url": person.url || "https://advisorwiz.com",
    "sameAs": person.sameAs || [],
    "worksFor": {
      "@type": "Organization",
      "name": "AdvisorWiz"
    }
  };
};

// Function to generate Review schema
export const generateReviewSchema = (review: {
  authorName: string;
  reviewBody: string;
  ratingValue: number;
  datePublished: string;
  itemReviewed?: string;
}) => {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    "author": {
      "@type": "Person",
      "name": review.authorName
    },
    "reviewBody": review.reviewBody,
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": review.ratingValue,
      "bestRating": "5",
      "worstRating": "1"
    },
    "datePublished": review.datePublished,
    "itemReviewed": {
      "@type": "Service",
      "name": review.itemReviewed || "AdvisorWiz"
    }
  };
};
