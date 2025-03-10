
import React from 'react';
import Header from './Header';
import AppFooter from './AppFooter';
import AnimatedRoute from '../ui/AnimatedRoute';
import { Toaster } from '../ui/toaster';

interface AppLayoutProps {
  children: React.ReactNode;
  animation?: 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'scale' | 'none';
  withHeader?: boolean;
  withFooter?: boolean;
}

const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  animation = 'fade',
  withHeader = true,
  withFooter = true
}) => {
  const Content = () => <>{children}</>;
  
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {withHeader && <Header />}
      
      <main className="flex-grow">
        {animation !== 'none' ? (
          <AnimatedRoute animation={animation as 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'scale'}>
            <Content />
          </AnimatedRoute>
        ) : (
          <Content />
        )}
      </main>
      
      {withFooter && <AppFooter />}
      <Toaster />
    </div>
  );
};

export default AppLayout;
