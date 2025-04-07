
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import PageSEO from '../components/seo/PageSEO';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  console.log('Rendering SignIn component');

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // This would be implemented with actual auth integration
      console.log('Sign in with', { email, password });
      setTimeout(() => {
        navigate('/');
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('SignIn error:', error);
      setIsLoading(false);
    }
  };

  return (
    <AppLayout
      headerProps={{ transparent: false }}
      hideFooter={false}
      fullWidth={false}
    >
      <PageSEO
        title="Sign In | AdvisorWiz"
        description="Sign in to your AdvisorWiz account"
        canonicalUrl="https://advisorwiz.com/sign-in"
      />
      
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)] py-12">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Sign In</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <Input 
                  id="email" 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com" 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-medium">Password</label>
                  <a href="#" className="text-sm text-teal-600 hover:text-teal-500">
                    Forgot password?
                  </a>
                </div>
                <Input 
                  id="password" 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password" 
                  required 
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-teal-600 hover:bg-teal-700 text-white"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
              
              <div className="text-center text-sm">
                Don't have an account?{' '}
                <a 
                  onClick={() => navigate('/sign-up')}
                  className="text-teal-600 hover:text-teal-500 cursor-pointer"
                >
                  Sign up
                </a>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default SignIn;
