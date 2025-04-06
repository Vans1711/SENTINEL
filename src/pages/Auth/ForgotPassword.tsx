
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Mail, ArrowLeft, Shield } from 'lucide-react';

const ForgotPassword = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Mock API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Password reset requested for:', email);
      
      setSubmitted(true);
      
      toast({
        title: "Reset Link Sent",
        description: "Check your email for instructions to reset your password.",
      });
    } catch (error) {
      console.error('Error requesting password reset:', error);
      
      toast({
        title: "Request Failed",
        description: "We couldn't process your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-navy p-4 md:p-0">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <Link to="/" className="inline-block">
            <h1 className="text-3xl font-montserrat font-bold text-white">
              AI-<span className="text-saffron">Sentinel</span>
            </h1>
          </Link>
          <p className="text-white/70 mt-2">Password Recovery</p>
        </div>
        
        <Card className="military-card border-military/30">
          <CardHeader>
            <CardTitle className="text-xl text-center">
              {submitted ? "Check Your Email" : "Forgot Your Password?"}
            </CardTitle>
            <CardDescription className="text-center text-white/70">
              {submitted
                ? "We've sent you instructions to reset your password"
                : "Enter your email address and we'll send you a link to reset your password"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {submitted ? (
              <div className="text-center space-y-6">
                <div className="flex justify-center">
                  <div className="p-3 rounded-full bg-saffron/20 inline-flex">
                    <Mail className="h-12 w-12 text-saffron" />
                  </div>
                </div>
                
                <p className="text-white/80">
                  We've sent a password reset link to <strong>{email}</strong>. Please check your inbox and follow the instructions.
                </p>
                
                <div className="py-2 text-white/60 text-sm">
                  <p>Didn't receive the email?</p>
                  <p className="mt-1">
                    Check your spam folder or{" "}
                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-saffron hover:underline"
                    >
                      try again
                    </button>
                  </p>
                </div>
                
                <Button
                  className="w-full bg-saffron text-navy hover:bg-saffron-light"
                  onClick={() => window.location.href = '/auth/login'}
                >
                  Back to Login
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium block">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 h-4 w-4" />
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="your.email@example.com"
                        className="w-full pl-10 pr-4 py-2 bg-navy/50 border border-military/50 rounded-md focus:outline-none focus:ring-2 focus:ring-saffron"
                      />
                    </div>
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-saffron text-navy hover:bg-saffron-light h-10"
                  >
                    {loading ? "Sending Reset Link..." : "Send Reset Link"}
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Link
              to="/auth/login"
              className="flex items-center justify-center text-sm text-saffron hover:underline"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Login
            </Link>
            
            <div className="flex items-center text-xs text-white/50 justify-center">
              <Shield className="h-3 w-3 mr-1" />
              Secured with end-to-end encryption
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
