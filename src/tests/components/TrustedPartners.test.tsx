
import React from 'react';
import { render, screen } from '../setup/testUtils';
import TrustedPartners from '../../components/home/TrustedPartners';

describe('TrustedPartners Component', () => {
  test('renders the section title correctly', () => {
    render(<TrustedPartners />);
    
    const titleElement = screen.getByText(/trusted by industry leaders/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('renders all partner logos', () => {
    render(<TrustedPartners />);
    
    // Check that we have the expected number of partner logos
    const partners = [
      'Financial Planning Association',
      'Investment Management Consultants Association',
      'National Association of Personal Financial Advisors',
      'Certified Financial Planner Board'
    ];
    
    // Verify all partner logos are present
    partners.forEach(partner => {
      const logoElement = screen.getByAltText(partner);
      expect(logoElement).toBeInTheDocument();
      expect(logoElement).toHaveAttribute('src');
    });
  });
  
  test('applies proper styling to logos', () => {
    render(<TrustedPartners />);
    
    // Get all logo images
    const logoElements = screen.getAllByRole('img');
    
    // Check that each logo has the expected classes for styling
    logoElements.forEach(logo => {
      expect(logo).toHaveClass('h-12', 'md:h-16');
      expect(logo).toHaveClass('opacity-80', 'dark:opacity-70', 'hover:opacity-100', 'transition-opacity');
    });
  });
  
  test('renders responsive layout', () => {
    render(<TrustedPartners />);
    
    // Check that the container has responsive layout classes
    const container = screen.getByText(/trusted by industry leaders/i).parentElement?.parentElement;
    expect(container).toHaveClass('container', 'mx-auto', 'px-4');
    
    // Check that the logo container has flex layout
    const logoContainer = screen.getAllByRole('img')[0].parentElement?.parentElement;
    expect(logoContainer).toHaveClass('flex', 'flex-wrap', 'justify-center', 'items-center');
  });
});
