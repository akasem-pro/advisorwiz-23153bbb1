
// Types for reviews

// Review type
export type Review = {
  id: string;
  advisorId: string;
  consumerId: string;
  rating: number;
  reviewText?: string;
  timestamp: string; // ISO string format
  isPublic: boolean;
};
