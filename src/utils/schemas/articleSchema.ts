
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
