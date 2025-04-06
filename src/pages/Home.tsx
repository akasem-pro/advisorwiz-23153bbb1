
import React from 'react';
import AppLayout from '../components/layout/AppLayout';
import HeroSection from '../components/home/HeroSection';

const Home: React.FC = () => {
  return (
    <AppLayout>
      <HeroSection />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Welcome to AdvisorWiz</h1>
        <p className="mb-4">
          Find the perfect financial advisor for your unique needs and goals.
        </p>
      </div>
    </AppLayout>
  );
};

export default Home;
