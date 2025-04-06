import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Shield, Lock, User, Users, Heart } from 'lucide-react';
import { useAuth, UserData, UserType } from '@/contexts/AuthContext';

const Login = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showUserTypeSelection, setShowUserTypeSelection] = useState(true);
  const [userType, setUserType] = useState<UserType | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  
  const selectUserType = (type: UserType) => {
    setUserType(type);
    setShowUserTypeSelection(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setLoading(false);
      
      // Create user data based on form input
      const userData: UserData = {
        id: `USER-${Math.floor(Math.random() * 10000)}`,
        name: formData.email.split('@')[0], // Using email as name for demo
        email: formData.email,
        userType: userType as UserType,
      };
      
      // Log the user in
      login(userData);
      
      // Navigate to the appropriate profile page based on user type
      if (userType === 'volunteer') {
        navigate('/volunteer/profile');
      } else {
        navigate('/family/profile');
      }
      
      toast({
        title: "Login successful",
        description: `Welcome back! You are now logged in as a ${userType === 'volunteer' ? 'Volunteer/NGO' : 'Martyr Family'}.`,
      });
    }, 1500);
  };
  
  const handleBack = () => {
    setShowUserTypeSelection(true);
    setUserType(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121212] p-4 md:p-0">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <Link to="/" className="inline-block">
            <h1 className="text-3xl font-montserrat font-bold text-white">
              AI-<span className="text-military">Sentinel</span>
            </h1>
          </Link>
          <p className="text-white/70 mt-2">Welcome back to the mission</p>
        </div>
        
        {showUserTypeSelection ? (
          <Card className="military-card border-military/30">
            <CardHeader>
              <CardTitle className="text-xl text-center">Select Account Type</CardTitle>
              <CardDescription className="text-center text-white/70">
                Please select how you would like to proceed
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                onClick={() => selectUserType('volunteer')}
                className="w-full h-24 bg-military hover:bg-military-light flex flex-col items-center justify-center"
              >
                <Users className="h-8 w-8 mb-2" />
                <span className="text-lg font-medium">Login as Volunteer/NGO</span>
              </Button>
              
              <Button 
                onClick={() => selectUserType('family')}
                className="w-full h-24 bg-military hover:bg-military-light flex flex-col items-center justify-center"
              >
                <Heart className="h-8 w-8 mb-2" />
                <span className="text-lg font-medium">Login as Martyr Family</span>
              </Button>
            </CardContent>
            <CardFooter className="flex justify-center">
              <p className="text-sm text-white/70">
                New to AI-Sentinel? <Link to="/auth/register" className="text-military hover:underline">Sign up now</Link>
              </p>
            </CardFooter>
          </Card>
        ) : (
          <Card className="military-card border-military/30">
            <CardHeader>
              <div className="flex items-center mb-2">
                <Button 
                  variant="ghost" 
                  className="h-8 px-2 mr-2" 
                  onClick={handleBack}
                >
                  ← Back
                </Button>
                <CardTitle className="text-xl text-center flex-1">
                  {userType === 'volunteer' ? 'Volunteer/NGO Login' : 'Martyr Family Login'}
                </CardTitle>
              </div>
              <CardDescription className="text-center text-white/70">
                Access your dashboard to {userType === 'volunteer' ? 'support martyr families' : 'access support services'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium block">
                      Email Address
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 h-4 w-4" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="your.email@example.com"
                        className="w-full pl-10 pr-4 py-2 bg-[#1A1A1A]/50 border border-military/50 rounded-md focus:outline-none focus:ring-2 focus:ring-military"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-medium block">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 h-4 w-4" />
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        placeholder="••••••••"
                        className="w-full pl-10 pr-10 py-2 bg-[#1A1A1A]/50 border border-military/50 rounded-md focus:outline-none focus:ring-2 focus:ring-military"
                      />
                      <button
                        type="button"
                        onClick={toggleShowPassword}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white/70"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="rememberMe"
                        name="rememberMe"
                        checked={formData.rememberMe}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-military bg-[#1A1A1A] border-military/50 rounded focus:ring-military focus:ring-offset-[#1A1A1A]"
                      />
                      <label htmlFor="rememberMe" className="ml-2 text-sm text-white/70">
                        Remember me
                      </label>
                    </div>
                    
                    <Link to="/auth/forgot-password" className="text-sm text-military hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-military text-white hover:bg-military-light flex items-center justify-center h-10"
                  >
                    {loading ? "Logging in..." : "Login"}
                  </Button>
                </div>
              </form>
              
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-military/50"></div>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="px-2 bg-[#1A1A1A]/80 text-white/50">Or continue with</span>
                  </div>
                </div>
                
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <Button variant="outline" className="border-military/50">
                    <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Google
                  </Button>
                  <Button variant="outline" className="border-military/50">
                    <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 22 22">
                      <path d="M16.1 0H5.9C2.65 0 0 2.65 0 5.9v10.2C0 19.35 2.65 22 5.9 22h10.2c3.25 0 5.9-2.65 5.9-5.9V5.9C22 2.65 19.35 0 16.1 0zM7.15 18.7H4.4V9.35h2.75V18.7zm-1.375-10.67c-.825 0-1.54-.715-1.54-1.54s.715-1.54 1.54-1.54 1.54.715 1.54 1.54-.715 1.54-1.54 1.54zM18.7 18.7h-2.75v-4.95c0-2.75-2.75-2.475-2.75 0V18.7h-2.75V9.35h2.75v1.65c1.21-2.2 5.5-2.365 5.5 2.2V18.7z" />
                    </svg>
                    LinkedIn
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-sm text-center text-white/70">
                Don't have an account?{" "}
                <Link to={`/auth/register?type=${userType}`} className="text-military hover:underline">
                  Sign up now
                </Link>
              </div>
              
              <div className="flex items-center text-xs text-white/50 justify-center">
                <Shield className="h-3 w-3 mr-1" />
                Secured with end-to-end encryption
              </div>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Login;
