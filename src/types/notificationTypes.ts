
// Types for notifications

// Notification type
export type Notification = {
  id: string;
  userId: string;
  type: 'match' | 'message' | 'appointment' | 'system';
  title: string;
  message?: string;
  read: boolean;
  actionLink?: string;
  timestamp: string; // ISO string format
};
