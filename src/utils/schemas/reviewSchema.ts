
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
