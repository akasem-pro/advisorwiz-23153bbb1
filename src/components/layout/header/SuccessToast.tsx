
import React from 'react';
import SuccessMessage from '../../ui/SuccessMessage';

interface SuccessToastProps {
  isVisible: boolean;
  message: string;
}

const SuccessToast: React.FC<SuccessToastProps> = ({ isVisible, message }) => {
  if (!isVisible) return null;
  
  return (
    <div className="fixed top-16 right-2 z-50 animate-fade-in-down">
      <SuccessMessage message={message} />
    </div>
  );
};

export default SuccessToast;
