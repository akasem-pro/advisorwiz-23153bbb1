
import React from 'react';
import { CheckCircle } from 'lucide-react';

interface SuccessMessageProps {
  message: string;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ message }) => {
  return (
    <div className="bg-teal-500/20 border border-teal-400/30 rounded-lg p-4 text-center animate-fade-in">
      <CheckCircle className="w-10 h-10 text-teal-400 mx-auto mb-2" />
      <p className="text-white">{message}</p>
    </div>
  );
};

export default SuccessMessage;
