
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Building, Users } from 'lucide-react';
import { FinancialFirm } from '../../context/UserContext';
import { Button } from '../ui/button';

interface FirmCardProps {
  firm: FinancialFirm;
}

const FirmCard: React.FC<FirmCardProps> = ({ firm }) => {
  const navigate = useNavigate();
  
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center mb-4">
        {firm.logo ? (
          <img src={firm.logo} alt={firm.name} className="w-16 h-16 rounded-full object-cover mr-4" />
        ) : (
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white text-xl font-bold mr-4">
            {firm.name.charAt(0)}
          </div>
        )}
        <div>
          <h3 className="text-xl font-medium text-navy-900">{firm.name}</h3>
          <p className="text-sm text-slate-500 flex items-center">
            <Users className="w-4 h-4 mr-1 text-slate-400" />
            {firm.advisorIds.length} advisor{firm.advisorIds.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>
      
      <p className="text-slate-700 mb-4 line-clamp-2">{firm.description}</p>
      
      <div className="flex justify-end">
        <Button 
          variant="default" 
          size="sm"
          onClick={() => navigate(`/firm/${firm.id}`)}
          className="bg-teal-600 hover:bg-teal-700"
        >
          Manage
        </Button>
      </div>
    </div>
  );
};

export default FirmCard;
