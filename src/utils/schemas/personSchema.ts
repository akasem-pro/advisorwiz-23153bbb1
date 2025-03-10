
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
