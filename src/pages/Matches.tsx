
import React from 'react';
import AppLayout from '../components/layout/AppLayout';
import { useUser } from '../context/UserContext';

const Matches: React.FC = () => {
  const { userType, advisorProfile, consumerProfile, getTopMatches } = useUser();
  
  // Get top matches based on the user type
  const matches = getTopMatches(10);

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Your Matches</h1>
        
        {matches.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matches.map((match, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  {match.profilePicture ? (
                    <img 
                      src={match.profilePicture} 
                      alt={match.name} 
                      className="w-16 h-16 rounded-full object-cover mr-4"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-teal-500 flex items-center justify-center text-white text-xl font-bold">
                      {match.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h3 className="text-lg font-semibold">{match.name}</h3>
                    {'organization' in match ? (
                      <p className="text-gray-600">{match.organization}</p>
                    ) : (
                      <p className="text-gray-600">Consumer</p>
                    )}
                  </div>
                </div>
                
                <div className="mb-4">
                  {'expertise' in match ? (
                    <div className="flex flex-wrap gap-2">
                      {match.expertise.slice(0, 3).map((expertise, i) => (
                        <span key={i} className="bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded">
                          {expertise}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {match.financialGoals?.slice(0, 3).map((goal, i) => (
                        <span key={i} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                          {goal}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                
                <button className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded transition-colors">
                  View Profile
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-medium text-gray-800 mb-2">No matches found</h3>
            <p className="text-gray-600 mb-6">
              We haven't found any matches for you yet. Please complete your profile to get matched.
            </p>
            <button 
              onClick={() => window.location.href = userType === 'advisor' ? '/advisor-profile' : '/consumer-profile'}
              className="bg-teal-600 hover:bg-teal-700 text-white py-2 px-6 rounded transition-colors"
            >
              Complete Your Profile
            </button>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Matches;
