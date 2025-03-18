
export const generateBlogPostSchema = (post: {
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
  authorUrl?: string;
  publisherName: string;
  publisherLogo: string;
  url: string;
}) => {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.headline,
    "description": post.description,
    "image": post.image,
    "datePublished": post.datePublished,
    "dateModified": post.dateModified || post.datePublished,
    "author": {
      "@type": "Person",
      "name": post.authorName,
      "url": post.authorUrl
    },
    "publisher": {
      "@type": "Organization",
      "name": post.publisherName,
      "logo": {
        "@type": "ImageObject",
        "url": post.publisherLogo
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": post.url
    }
  };
};

export const generateBlogListingSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "AdvisorWiz Financial Blog",
    "description": "Expert financial advice, industry insights, and resources to help you make informed financial decisions.",
    "url": "https://advisorwiz.com/blog",
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
