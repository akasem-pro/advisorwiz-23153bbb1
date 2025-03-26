
import React, { useState, useEffect } from 'react';
import { Star, Heart, ThumbsUp, MessageSquare, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { trackUserBehavior } from '../../utils/analytics/eventTracker';
import { toast } from 'sonner';

interface ReviewRequestModalProps {
  sessionCount?: number; // Number of user sessions before showing
  minTimeOnSite?: number; // Minimum time on site in seconds
  pageVisitThreshold?: number; // Number of page visits before showing
  onReviewSubmitted?: (rating: number, feedback?: string) => void;
}

const ReviewRequestModal: React.FC<ReviewRequestModalProps> = ({
  sessionCount = 3,
  minTimeOnSite = 300, // 5 minutes by default
  pageVisitThreshold = 5,
  onReviewSubmitted
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState<number | null>(null);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const [feedback, setFeedback] = useState('');
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

  useEffect(() => {
    // Check if we should show the review modal
    const shouldShowReviewRequest = () => {
      // Get storage values
      const sessions = parseInt(localStorage.getItem('user_sessions') || '0');
      const timeOnSite = parseInt(localStorage.getItem('time_on_site') || '0');
      const pageVisits = parseInt(localStorage.getItem('page_visits') || '0');
      const lastReviewRequest = localStorage.getItem('last_review_request');
      
      // Increment session count if not already incremented
      if (!sessionStorage.getItem('session_counted')) {
        localStorage.setItem('user_sessions', (sessions + 1).toString());
        sessionStorage.setItem('session_counted', 'true');
      }
      
      // Don't show if requested in the last 30 days
      if (lastReviewRequest) {
        const lastRequestDate = new Date(parseInt(lastReviewRequest));
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        
        if (lastRequestDate > thirtyDaysAgo) {
          return false;
        }
      }
      
      // Check if all conditions are met
      return (
        sessions >= sessionCount &&
        timeOnSite >= minTimeOnSite &&
        pageVisits >= pageVisitThreshold
      );
    };
    
    // Update time on site counter
    const timeInterval = setInterval(() => {
      const currentTime = parseInt(localStorage.getItem('time_on_site') || '0');
      localStorage.setItem('time_on_site', (currentTime + 1).toString());
      
      // Check if we should show the modal
      if (shouldShowReviewRequest() && !isOpen) {
        setIsOpen(true);
        localStorage.setItem('last_review_request', Date.now().toString());
        trackUserBehavior('review_request_shown', {
          sessions: localStorage.getItem('user_sessions'),
          time_on_site: localStorage.getItem('time_on_site'),
          page_visits: localStorage.getItem('page_visits')
        });
      }
    }, 1000);
    
    return () => clearInterval(timeInterval);
  }, [sessionCount, minTimeOnSite, pageVisitThreshold, isOpen]);
  
  // Track page visits
  useEffect(() => {
    const pageVisits = parseInt(localStorage.getItem('page_visits') || '0');
    localStorage.setItem('page_visits', (pageVisits + 1).toString());
  }, []);
  
  const handleRatingSelect = (selectedRating: number) => {
    setRating(selectedRating);
    trackUserBehavior('review_rating_selected', { rating: selectedRating });
    
    if (selectedRating <= 3) {
      // For lower ratings, show feedback form instead of store redirect
      setShowFeedbackForm(true);
    } else {
      // High ratings - ask to go to app store
      openStoreReview();
    }
  };
  
  const openStoreReview = () => {
    const userAgent = navigator.userAgent || navigator.vendor;
    
    if (/android/i.test(userAgent)) {
      window.open('https://play.google.com/store/apps/details?id=com.advisorwiz', '_blank');
    } else if (/iPad|iPhone|iPod/.test(userAgent)) {
      window.open('https://apps.apple.com/app/advisorwiz/id123456789', '_blank');
    } else {
      window.open('https://advisorwiz.com/review', '_blank');
    }
    
    trackUserBehavior('app_store_redirect', { rating });
    handleClose();
  };
  
  const submitFeedback = () => {
    if (onReviewSubmitted) {
      onReviewSubmitted(rating || 0, feedback);
    }
    
    trackUserBehavior('feedback_submitted', { 
      rating,
      feedback_length: feedback.length
    });
    
    toast.success("Thank you for your feedback!");
    handleClose();
  };
  
  const handleClose = () => {
    setIsOpen(false);
    setRating(null);
    setHoveredRating(null);
    setFeedback('');
    setShowFeedbackForm(false);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">
            {showFeedbackForm ? 'We Value Your Feedback' : 'Enjoying AdvisorWiz?'}
          </DialogTitle>
          <button 
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100"
            onClick={handleClose}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        </DialogHeader>
        
        {!showFeedbackForm ? (
          <>
            <div className="py-6 flex flex-col items-center space-y-4">
              <p className="text-center text-muted-foreground">
                Would you mind taking a moment to rate your experience?
              </p>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    className="p-1 transition-transform hover:scale-110"
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(null)}
                    onClick={() => handleRatingSelect(star)}
                  >
                    <Star 
                      className={`h-8 w-8 ${(hoveredRating !== null ? star <= hoveredRating : star <= (rating || 0)) 
                        ? 'text-yellow-400 fill-yellow-400' 
                        : 'text-gray-300'}`}
                    />
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                <Button variant="outline" size="sm" onClick={() => handleRatingSelect(5)}>
                  <Heart className="mr-1 h-4 w-4 text-pink-500" />
                  Love it!
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleRatingSelect(4)}>
                  <ThumbsUp className="mr-1 h-4 w-4 text-blue-500" />
                  It's good
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleRatingSelect(2)}>
                  <MessageSquare className="mr-1 h-4 w-4 text-orange-500" />
                  Needs work
                </Button>
              </div>
            </div>
            <DialogFooter>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleClose}
                className="w-full sm:w-auto"
              >
                Maybe later
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <div className="py-4">
              <p className="text-sm text-muted-foreground mb-4">
                We're sorry to hear you're having issues. Please let us know how we can improve:
              </p>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="w-full p-2 h-24 border rounded-md"
                placeholder="Please share your thoughts..."
              />
            </div>
            <DialogFooter className="flex-col sm:flex-row gap-2">
              <Button variant="ghost" onClick={handleClose}>
                Cancel
              </Button>
              <Button onClick={submitFeedback} disabled={!feedback.trim()}>
                Submit Feedback
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ReviewRequestModal;
