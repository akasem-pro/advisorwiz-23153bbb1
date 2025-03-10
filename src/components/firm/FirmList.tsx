
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Building } from 'lucide-react';
import { FinancialFirm } from '../../context/UserContext';
import { Button } from '../ui/button';
import FirmCard from './FirmCard';

interface FirmListProps {
  firms: FinancialFirm[];
}

const FirmList: React.FC<FirmListProps> = ({ firms }) => {
  const navigate = useNavigate();
  
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-serif font-semibold text-navy-800 mb-6 flex items-center">
        <Building className="mr-2 h-6 w-6 text-teal-600" />
        Your Firms
      </h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        {firms.map(firm => (
          <FirmCard key={firm.id} firm={firm} />
        ))}
      </div>
      
      <div className="mt-8 flex justify-center">
        <Button 
          onClick={() => navigate('/firm-profile')} 
          className="bg-teal-600 hover:bg-teal-700"
        >
          Register New Firm
        </Button>
      </div>
    </div>
  );
};

export default FirmList;
