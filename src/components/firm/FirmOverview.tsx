
import React from 'react';
import { Users } from 'lucide-react';
import { FinancialFirm } from '../../context/UserContext';
import { Button } from '../ui/button';

interface FirmOverviewProps {
  firm: FinancialFirm;
  onSwitchTab: (tab: string) => void;
}

const FirmOverview: React.FC<FirmOverviewProps> = ({ firm, onSwitchTab }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <div className="flex justify-center py-8 bg-gradient-to-br from-slate-50 to-teal-50">
          {firm.logo ? (
            <img 
              src={firm.logo} 
              alt={firm.name} 
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md" 
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white text-4xl font-bold border-4 border-white shadow-md">
              {firm.name.charAt(0)}
            </div>
          )}
        </div>
        
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-sm font-medium text-slate-500 mb-1">Firm Name</h3>
              <p className="text-lg font-medium text-navy-800">{firm.name}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-slate-500 mb-1">Website</h3>
              {firm.website ? (
                <a 
                  href={firm.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-lg text-teal-600 hover:text-teal-700 flex items-center"
                >
                  {firm.website}
                </a>
              ) : (
                <p className="text-slate-600">Not provided</p>
              )}
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-slate-500 mb-2">Description</h3>
            <p className="text-navy-800 whitespace-pre-wrap">{firm.description}</p>
          </div>
          
          <div className="mt-6 pt-6 border-t border-slate-100">
            <div className="flex items-center text-sm text-slate-500">
              <span>Firm created on {new Date(firm.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="text-lg font-medium text-navy-800 mb-4 flex items-center">
            <Users className="mr-2 h-5 w-5 text-teal-600" />
            Team Overview
          </h3>
          
          <div className="flex items-center justify-between">
            <p className="text-navy-800">
              Your firm has {firm.advisorIds.length} advisor{firm.advisorIds.length !== 1 ? 's' : ''}.
            </p>
            <Button
              variant="link"
              onClick={() => onSwitchTab('advisors')}
              className="p-0 h-auto font-normal text-teal-600 hover:text-teal-700"
            >
              Manage your advisor team →
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirmOverview;
