
import React from 'react';

interface FeedbackCommentProps {
  comment: string;
  setComment: (value: string) => void;
  isHelpful: boolean;
}

const FeedbackComment: React.FC<FeedbackCommentProps> = ({ comment, setComment, isHelpful }) => {
  return (
    <textarea
      className="w-full p-2 text-xs border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500 mt-1 mb-2"
      placeholder={isHelpful ? "What did you like about this match?" : "How could this match be improved?"}
      rows={2}
      value={comment}
      onChange={(e) => setComment(e.target.value)}
    ></textarea>
  );
};

export default FeedbackComment;
