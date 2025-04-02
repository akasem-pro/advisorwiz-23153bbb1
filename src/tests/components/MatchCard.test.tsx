
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MatchCard from '../../components/matching/MatchCard';
import { AdvisorProfile, ConsumerProfile } from '../../types/profileTypes';

describe('MatchCard Component', () => {
  // Mock event handlers
  const mockSwipeRight = jest.fn();
  const mockSwipeLeft = jest.fn();
  
  // Sample advisor profile for testing
  const advisorItem: AdvisorProfile = {
    id: 'advisor-1',
    name: 'Jane Smith',
    organization: 'Financial Future',
    expertise: ['retirement', 'tax', 'estate'],
    languages: ['English', 'Spanish'],
    chats: [],
    chatEnabled: true,
    appointmentCategories: ['consultation', 'planning'],
    appointments: [],
    onlineStatus: 'online',
    lastOnline: new Date().toISOString(),
    showOnlineStatus: true,
    isAccredited: true,
    testimonials: [
      {
        author: 'John D.',
        text: 'Great advisor, helped me plan for retirement.',
        rating: 5
      }
    ],
    pricing: {
      hourlyRate: 150,
      consultationFee: 75
    },
    assetsUnderManagement: 5000000,
    matches: []
  };
  
  // Sample consumer profile for testing
  const consumerItem: ConsumerProfile = {
    id: 'consumer-1',
    name: 'Bob Johnson',
    preferredLanguage: ['English'],
    riskTolerance: 'medium',
    serviceNeeds: ['retirement'],
    status: 'active',
    investableAssets: 250000,
    preferredCommunication: ['email', 'video'],
    matches: [],
    chats: [],
    chatEnabled: true,
    appointments: [],
    onlineStatus: 'online',
    lastOnline: new Date().toISOString(),
    showOnlineStatus: true,
    age: 45
  };

  it('renders advisor card correctly', () => {
    render(
      <MatchCard
        item={advisorItem}
        userType="consumer"
        onSwipeRight={mockSwipeRight}
        onSwipeLeft={mockSwipeLeft}
      />
    );
    
    // Check that basic information is displayed
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('Financial Future')).toBeInTheDocument();
    expect(screen.getByText(/retirement/i)).toBeInTheDocument();
    expect(screen.getByText(/tax/i)).toBeInTheDocument();
    expect(screen.getByText(/estate/i)).toBeInTheDocument();
    
    // Check for language information
    expect(screen.getByText(/english/i)).toBeInTheDocument();
    expect(screen.getByText(/spanish/i)).toBeInTheDocument();
    
    // Check for online status indicator
    const statusIndicator = screen.getByTestId('online-status-indicator');
    expect(statusIndicator).toHaveClass('bg-green-500');
  });
  
  it('renders consumer card correctly', () => {
    render(
      <MatchCard
        item={consumerItem}
        userType="advisor"
        onSwipeRight={mockSwipeRight}
        onSwipeLeft={mockSwipeLeft}
      />
    );
    
    // Check that basic information is displayed
    expect(screen.getByText('Bob Johnson')).toBeInTheDocument();
    expect(screen.getByText(/45 years old/i)).toBeInTheDocument();
    expect(screen.getByText(/retirement/i)).toBeInTheDocument();
    
    // Check for risk tolerance
    expect(screen.getByText(/medium risk tolerance/i)).toBeInTheDocument();
    
    // Check for investable assets
    expect(screen.getByText(/\$250,000/i)).toBeInTheDocument();
  });
  
  it('calls swipe right handler when right button is clicked', () => {
    render(
      <MatchCard
        item={advisorItem}
        userType="consumer"
        onSwipeRight={mockSwipeRight}
        onSwipeLeft={mockSwipeLeft}
      />
    );
    
    const rightButton = screen.getByLabelText(/accept/i);
    fireEvent.click(rightButton);
    
    expect(mockSwipeRight).toHaveBeenCalledWith(advisorItem);
    expect(mockSwipeLeft).not.toHaveBeenCalled();
  });
  
  it('calls swipe left handler when left button is clicked', () => {
    render(
      <MatchCard
        item={advisorItem}
        userType="consumer"
        onSwipeRight={mockSwipeRight}
        onSwipeLeft={mockSwipeLeft}
      />
    );
    
    const leftButton = screen.getByLabelText(/decline/i);
    fireEvent.click(leftButton);
    
    expect(mockSwipeLeft).toHaveBeenCalledWith(advisorItem);
    expect(mockSwipeRight).not.toHaveBeenCalled();
  });
  
  it('displays compatibility score when provided', () => {
    // Add compatibility score to the advisor
    const advisorWithScore = {
      ...advisorItem,
      compatibilityScores: {
        'consumer-1': 85
      }
    };
    
    render(
      <MatchCard
        item={advisorWithScore}
        userType="consumer"
        onSwipeRight={mockSwipeRight}
        onSwipeLeft={mockSwipeLeft}
      />
    );
    
    expect(screen.getByText(/85%/)).toBeInTheDocument();
  });
  
  it('handles loading state correctly', () => {
    render(
      <MatchCard
        item={advisorItem}
        userType="consumer"
        onSwipeRight={mockSwipeRight}
        onSwipeLeft={mockSwipeLeft}
        isLoading={true}
      />
    );
    
    // Check for loading skeleton
    expect(screen.getByTestId('card-skeleton')).toBeInTheDocument();
    
    // Buttons should be disabled during loading
    const leftButton = screen.getByLabelText(/decline/i);
    const rightButton = screen.getByLabelText(/accept/i);
    
    expect(leftButton).toBeDisabled();
    expect(rightButton).toBeDisabled();
  });
  
  it('renders the correct action buttons based on user type', () => {
    // First test the consumer view
    const { rerender } = render(
      <MatchCard
        item={advisorItem}
        userType="consumer"
        onSwipeRight={mockSwipeRight}
        onSwipeLeft={mockSwipeLeft}
      />
    );
    
    expect(screen.getByText(/schedule/i)).toBeInTheDocument();
    expect(screen.getByText(/message/i)).toBeInTheDocument();
    
    // Now test the advisor view
    rerender(
      <MatchCard
        item={consumerItem}
        userType="advisor"
        onSwipeRight={mockSwipeRight}
        onSwipeLeft={mockSwipeLeft}
      />
    );
    
    expect(screen.getByText(/contact/i)).toBeInTheDocument();
    expect(screen.getByText(/invite/i)).toBeInTheDocument();
  });
});
