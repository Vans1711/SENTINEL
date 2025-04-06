import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Shield, Mail, User, Lock, Info, Users, Heart, ArrowLeft, Building, MapPin, Phone, Calendar, FileText } from 'lucide-react';
import { useAuth, UserData, UserType } from '@/contexts/AuthContext';

type UserType = 'volunteer' | 'family' | null;

type FormData = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  volunteerType: 'individual' | 'ngo';
  organization: string;
  role: string;
  skills: string;
  availability: string;
  martyrName: string;
  relationship: string;
  martyrRank: string;
  martyrUnit: string;
  dateOfMartyrdom: string;
  address: string;
  district: string;
  state: string;
  pincode: string;
  supportNeeded: string;
  agreeTerms: boolean;
  referralCode: string;
};

const Register = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showUserTypeSelection, setShowUserTypeSelection] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [userType, setUserType] = useState<UserType>(null);
  
  const [formData, setFormData] = useState({
    // Common fields
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    agreeTerms: false,
    
    // Volunteer/NGO specific fields
    organization: '',
    role: '',
    skills: '',
    availability: '',
    volunteerType: 'individual', // 'individual' or 'ngo'
    
    // Family specific fields
    martyrName: '',
    relationship: '',
    martyrRank: '',
    martyrUnit: '',
    dateOfMartyrdom: '',
    familyMembers: '',
    governmentId: '',
    address: '',
    district: '',
    state: '',
    pincode: '',
    supportNeeded: '',
  });

  useEffect(() => {
    // Check if user type is passed in URL params
    const typeFromUrl = searchParams.get('type');
    if (typeFromUrl === 'volunteer' || typeFromUrl === 'family') {
      setUserType(typeFromUrl);
      setShowUserTypeSelection(false);
    }
  }, [searchParams]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
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
    setCurrentStep(1);
  };
  
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      setShowUserTypeSelection(true);
      setUserType(null);
    }
  };

  const validateBasicInfo = () => {
    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword || !formData.phone) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return false;
    }
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Your passwords do not match.",
        variant: "destructive",
      });
      return false;
    }
    
    if (formData.password.length < 8) {
      toast({
        title: "Password Too Short",
        description: "Password must be at least 8 characters long.",
        variant: "destructive",
      });
      return false;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return false;
    }
    
    return true;
  };

  const validateVolunteerSpecificInfo = () => {
    if (formData.volunteerType === 'ngo' && !formData.organization) {
      toast({
        title: "Missing Fields",
        description: "Please provide your organization name.",
        variant: "destructive",
      });
      return false;
    }
    
    if (!formData.skills || !formData.availability) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return false;
    }
    
    return true;
  };

  const validateFamilySpecificInfo = () => {
    if (!formData.martyrName || !formData.relationship || !formData.address || !formData.state) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return false;
    }
    
    return true;
  };

  const validateFinalStep = () => {
    if (!formData.agreeTerms) {
      toast({
        title: "Terms Agreement Required",
        description: "Please agree to the terms and conditions.",
        variant: "destructive",
      });
      return false;
    }
    
    return true;
  };

  const nextStep = () => {
    if (currentStep === 1) {
      if (validateBasicInfo()) {
        setCurrentStep(2);
      }
    } else if (currentStep === 2) {
      if (
        (userType === 'volunteer' && validateVolunteerSpecificInfo()) ||
        (userType === 'family' && validateFamilySpecificInfo())
      ) {
        setCurrentStep(3);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentStep === 1 || currentStep === 2) {
      nextStep();
      return;
    }
    
    if (!validateFinalStep()) {
      return;
    }
    
    setLoading(true);
    
    // Simulate registration process
    setTimeout(() => {
      console.log('Registration data:', formData);
      setLoading(false);
      
      // Create user data from form
      const userData: UserData = {
        id: `USER-${Math.floor(Math.random() * 10000)}`,
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        userType: userType as UserType,
      };
      
      // Add user type specific data
      if (userType === 'volunteer') {
        userData.volunteerType = formData.volunteerType;
        userData.organization = formData.organization;
        userData.role = formData.role;
        userData.skills = formData.skills;
        userData.availability = formData.availability;
      } else {
        userData.martyrName = formData.martyrName;
        userData.relationship = formData.relationship;
        userData.martyrRank = formData.martyrRank;
        userData.martyrUnit = formData.martyrUnit;
        userData.address = formData.address;
        userData.district = formData.district;
        userData.state = formData.state;
        userData.pincode = formData.pincode;
      }
      
      // Log the user in
      login(userData);
      
      // Navigate to the appropriate profile page based on user type
      if (userType === 'volunteer') {
        navigate('/volunteer/profile');
      } else {
        navigate('/family/profile');
      }
      
      toast({
        title: "Registration successful",
        description: `Your account has been created as a ${userType === 'volunteer' ? 'Volunteer/NGO' : 'Martyr Family'}.`,
      });
    }, 1500);
  };

  const renderUserTypeSelection = () => (
    <Card className="military-card border-military/30">
      <CardHeader>
        <CardTitle className="text-xl text-center">Select Account Type</CardTitle>
        <CardDescription className="text-center text-white/70">
          Please select how you would like to register
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button 
          onClick={() => selectUserType('volunteer')}
          className="w-full h-24 bg-military hover:bg-military-light flex flex-col items-center justify-center"
        >
          <Users className="h-8 w-8 mb-2" />
          <span className="text-lg font-medium">Register as Volunteer/NGO</span>
        </Button>
        
        <Button 
          onClick={() => selectUserType('family')}
          className="w-full h-24 bg-military hover:bg-military-light flex flex-col items-center justify-center"
        >
          <Heart className="h-8 w-8 mb-2" />
          <span className="text-lg font-medium">Register as Martyr Family</span>
        </Button>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-white/70">
          Already have an account? <Link to="/auth/login" className="text-military hover:underline">Log in</Link>
        </p>
      </CardFooter>
    </Card>
  );

  const renderBasicInfoForm = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="fullName" className="text-sm font-medium block">
          Full Name
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 h-4 w-4" />
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            required
            placeholder="Your full name"
            className="w-full pl-10 pr-4 py-2 bg-[#1A1A1A]/50 border border-military/50 rounded-md focus:outline-none focus:ring-2 focus:ring-military"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium block">
          Email Address
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 h-4 w-4" />
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
        <label htmlFor="phone" className="text-sm font-medium block">
          Phone Number
        </label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 h-4 w-4" />
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
            placeholder="Your phone number"
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
        <p className="text-xs text-white/50">
          Must be at least 8 characters with a mix of letters, numbers, and symbols
        </p>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="confirmPassword" className="text-sm font-medium block">
          Confirm Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 h-4 w-4" />
          <input
            type={showPassword ? "text" : "password"}
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
            placeholder="••••••••"
            className="w-full pl-10 pr-4 py-2 bg-[#1A1A1A]/50 border border-military/50 rounded-md focus:outline-none focus:ring-2 focus:ring-military"
          />
        </div>
      </div>
    </div>
  );

  const renderVolunteerInfoForm = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium block">Type of Volunteer</label>
        <div className="grid grid-cols-2 gap-3">
          <label 
            className={`flex items-center justify-center p-3 rounded-md border cursor-pointer ${
              formData.volunteerType === 'individual' 
                ? 'bg-military/20 border-military' 
                : 'bg-[#1A1A1A]/30 border-[#2D3748] hover:bg-[#1A1A1A]/50'
            }`}
          >
            <input
              type="radio"
              name="volunteerType"
              value="individual"
              checked={formData.volunteerType === 'individual'}
              onChange={handleInputChange}
              className="sr-only"
            />
            <User className="h-5 w-5 mr-2" />
            <span>Individual</span>
          </label>
          <label 
            className={`flex items-center justify-center p-3 rounded-md border cursor-pointer ${
              formData.volunteerType === 'ngo' 
                ? 'bg-military/20 border-military' 
                : 'bg-[#1A1A1A]/30 border-[#2D3748] hover:bg-[#1A1A1A]/50'
            }`}
          >
            <input
              type="radio"
              name="volunteerType"
              value="ngo"
              checked={formData.volunteerType === 'ngo'}
              onChange={handleInputChange}
              className="sr-only"
            />
            <Building className="h-5 w-5 mr-2" />
            <span>NGO</span>
          </label>
        </div>
      </div>
      
      {formData.volunteerType === 'ngo' && (
        <div className="space-y-2">
          <label htmlFor="organization" className="text-sm font-medium block">
            Organization Name
          </label>
          <div className="relative">
            <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 h-4 w-4" />
            <input
              type="text"
              id="organization"
              name="organization"
              value={formData.organization}
              onChange={handleInputChange}
              required
              placeholder="NGO/Organization name"
              className="w-full pl-10 pr-4 py-2 bg-[#1A1A1A]/50 border border-military/50 rounded-md focus:outline-none focus:ring-2 focus:ring-military"
            />
          </div>
        </div>
      )}
      
      <div className="space-y-2">
        <label htmlFor="role" className="text-sm font-medium block">
          Role/Position {formData.volunteerType === 'ngo' ? 'in Organization' : ''}
        </label>
        <input
          type="text"
          id="role"
          name="role"
          value={formData.role}
          onChange={handleInputChange}
          placeholder="e.g. Counselor, Teacher, Coordinator"
          className="w-full px-4 py-2 bg-[#1A1A1A]/50 border border-military/50 rounded-md focus:outline-none focus:ring-2 focus:ring-military"
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="skills" className="text-sm font-medium block">
          Skills & Expertise*
        </label>
        <textarea
          id="skills"
          name="skills"
          value={formData.skills}
          onChange={handleInputChange}
          required
          rows={3}
          placeholder="List your skills relevant to supporting martyr families"
          className="w-full px-4 py-2 bg-[#1A1A1A]/50 border border-military/50 rounded-md focus:outline-none focus:ring-2 focus:ring-military"
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="availability" className="text-sm font-medium block">
          Availability*
        </label>
        <select
          id="availability"
          name="availability"
          value={formData.availability}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-2 bg-[#1A1A1A]/50 border border-military/50 rounded-md focus:outline-none focus:ring-2 focus:ring-military"
        >
          <option value="">Select your availability</option>
          <option value="weekends">Weekends Only</option>
          <option value="weekdays">Weekdays Only</option>
          <option value="evenings">Evenings Only</option>
          <option value="flexible">Flexible</option>
          <option value="full-time">Full-time</option>
          <option value="part-time">Part-time</option>
        </select>
      </div>
    </div>
  );

  const renderFamilyInfoForm = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="martyrName" className="text-sm font-medium block">
          Martyr's Full Name*
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 h-4 w-4" />
          <input
            type="text"
            id="martyrName"
            name="martyrName"
            value={formData.martyrName}
            onChange={handleInputChange}
            required
            placeholder="Full name of martyr"
            className="w-full pl-10 pr-4 py-2 bg-[#1A1A1A]/50 border border-military/50 rounded-md focus:outline-none focus:ring-2 focus:ring-military"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="relationship" className="text-sm font-medium block">
          Your Relationship to Martyr*
        </label>
        <select
          id="relationship"
          name="relationship"
          value={formData.relationship}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-2 bg-[#1A1A1A]/50 border border-military/50 rounded-md focus:outline-none focus:ring-2 focus:ring-military"
        >
          <option value="">Select relationship</option>
          <option value="spouse">Spouse</option>
          <option value="child">Child</option>
          <option value="parent">Parent</option>
          <option value="sibling">Sibling</option>
          <option value="other">Other Family Member</option>
        </select>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="martyrRank" className="text-sm font-medium block">
            Martyr's Rank
          </label>
          <input
            type="text"
            id="martyrRank"
            name="martyrRank"
            value={formData.martyrRank}
            onChange={handleInputChange}
            placeholder="e.g. Major, Constable"
            className="w-full px-4 py-2 bg-[#1A1A1A]/50 border border-military/50 rounded-md focus:outline-none focus:ring-2 focus:ring-military"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="martyrUnit" className="text-sm font-medium block">
            Unit/Department
          </label>
          <input
            type="text"
            id="martyrUnit"
            name="martyrUnit"
            value={formData.martyrUnit}
            onChange={handleInputChange}
            placeholder="e.g. CRPF, Army"
            className="w-full px-4 py-2 bg-[#1A1A1A]/50 border border-military/50 rounded-md focus:outline-none focus:ring-2 focus:ring-military"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="dateOfMartyrdom" className="text-sm font-medium block">
          Date of Martyrdom
        </label>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 h-4 w-4" />
          <input
            type="date"
            id="dateOfMartyrdom"
            name="dateOfMartyrdom"
            value={formData.dateOfMartyrdom}
            onChange={handleInputChange}
            className="w-full pl-10 pr-4 py-2 bg-[#1A1A1A]/50 border border-military/50 rounded-md focus:outline-none focus:ring-2 focus:ring-military"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="address" className="text-sm font-medium block">
          Current Residential Address*
        </label>
        <div className="relative">
          <MapPin className="absolute left-3 top-3 text-white/40 h-4 w-4" />
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
            rows={2}
            placeholder="Your full address"
            className="w-full pl-10 pr-4 py-2 bg-[#1A1A1A]/50 border border-military/50 rounded-md focus:outline-none focus:ring-2 focus:ring-military"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="district" className="text-sm font-medium block">
            District
          </label>
          <input
            type="text"
            id="district"
            name="district"
            value={formData.district}
            onChange={handleInputChange}
            placeholder="Your district"
            className="w-full px-4 py-2 bg-[#1A1A1A]/50 border border-military/50 rounded-md focus:outline-none focus:ring-2 focus:ring-military"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="state" className="text-sm font-medium block">
            State*
          </label>
          <input
            type="text"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            required
            placeholder="Your state"
            className="w-full px-4 py-2 bg-[#1A1A1A]/50 border border-military/50 rounded-md focus:outline-none focus:ring-2 focus:ring-military"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="pincode" className="text-sm font-medium block">
          PIN Code
        </label>
        <input
          type="text"
          id="pincode"
          name="pincode"
          value={formData.pincode}
          onChange={handleInputChange}
          placeholder="6-digit PIN code"
          className="w-full px-4 py-2 bg-[#1A1A1A]/50 border border-military/50 rounded-md focus:outline-none focus:ring-2 focus:ring-military"
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="supportNeeded" className="text-sm font-medium block">
          Support Needed
        </label>
        <select
          id="supportNeeded"
          name="supportNeeded"
          value={formData.supportNeeded}
          onChange={handleInputChange}
          className="w-full px-4 py-2 bg-[#1A1A1A]/50 border border-military/50 rounded-md focus:outline-none focus:ring-2 focus:ring-military"
        >
          <option value="">Select primary support needed</option>
          <option value="financial">Financial Support</option>
          <option value="education">Educational Support</option>
          <option value="healthcare">Healthcare Support</option>
          <option value="legal">Legal Assistance</option>
          <option value="employment">Employment Assistance</option>
          <option value="counseling">Counseling Services</option>
          <option value="multiple">Multiple Support Types</option>
        </select>
      </div>
    </div>
  );

  const renderFinalStep = () => (
    <div className="space-y-6">
      <div className="p-4 bg-military/10 rounded-md">
        <h3 className="font-medium mb-2 text-lg">Account Summary</h3>
        <div className="space-y-2 text-sm">
          <p><span className="text-white/60">Name:</span> {formData.fullName}</p>
          <p><span className="text-white/60">Email:</span> {formData.email}</p>
          <p><span className="text-white/60">Phone:</span> {formData.phone}</p>
          <p><span className="text-white/60">Account Type:</span> {userType === 'volunteer' ? 'Volunteer/NGO' : 'Martyr Family'}</p>
          
          {userType === 'volunteer' && formData.volunteerType === 'ngo' && (
            <p><span className="text-white/60">Organization:</span> {formData.organization}</p>
          )}
          
          {userType === 'family' && (
            <p><span className="text-white/60">Martyr's Name:</span> {formData.martyrName}</p>
          )}
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-start">
          <input
            type="checkbox"
            id="agreeTerms"
            name="agreeTerms"
            checked={formData.agreeTerms}
            onChange={handleInputChange}
            className="mt-1 h-4 w-4 text-military bg-[#1A1A1A] border-military/50 rounded focus:ring-military focus:ring-offset-[#1A1A1A]"
          />
          <label htmlFor="agreeTerms" className="ml-2 text-sm text-white/70">
            I agree to the <Link to="/terms" className="text-military hover:underline">Terms and Conditions</Link> and <Link to="/privacy" className="text-military hover:underline">Privacy Policy</Link>. I certify that all information provided is accurate and truthful.
          </label>
        </div>
        
        <div className="flex items-center justify-center p-3 bg-[#1A1A1A]/30 rounded-md">
          <Shield className="h-4 w-4 mr-2 text-military" />
          <span className="text-xs text-white/70">Your data is protected and will only be used to provide support services</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121212] p-4 md:p-0">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <Link to="/" className="inline-block">
            <h1 className="text-3xl font-montserrat font-bold text-white">
              AI-<span className="text-military">Sentinel</span>
            </h1>
          </Link>
          <p className="text-white/70 mt-2">Join our mission to support martyr families</p>
        </div>
        
        {showUserTypeSelection ? (
          renderUserTypeSelection()
        ) : (
          <Card className="military-card border-military/30">
            <CardHeader>
              <div className="flex items-center mb-2">
                <Button 
                  variant="ghost" 
                  className="h-8 px-2 mr-2" 
                  onClick={handleBack}
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <div className="flex-1">
                  <CardTitle className="text-xl text-center">
                    {userType === 'volunteer' ? 'Volunteer/NGO Registration' : 'Martyr Family Registration'}
                  </CardTitle>
                  <div className="flex justify-center mt-2">
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-military' : 'bg-[#1A1A1A]'}`}>
                        1
                      </div>
                      <div className={`w-12 h-1 ${currentStep >= 2 ? 'bg-military' : 'bg-[#1A1A1A]'}`}></div>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-military' : 'bg-[#1A1A1A]'}`}>
                        2
                      </div>
                      <div className={`w-12 h-1 ${currentStep >= 3 ? 'bg-military' : 'bg-[#1A1A1A]'}`}></div>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 3 ? 'bg-military' : 'bg-[#1A1A1A]'}`}>
                        3
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                {currentStep === 1 && renderBasicInfoForm()}
                {currentStep === 2 && userType === 'volunteer' && renderVolunteerInfoForm()}
                {currentStep === 2 && userType === 'family' && renderFamilyInfoForm()}
                {currentStep === 3 && renderFinalStep()}
                
                <div className="mt-6 flex justify-between">
                  {currentStep > 1 ? (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleBack}
                      className="border-military/50"
                    >
                      Previous
                    </Button>
                  ) : (
                    <div></div>
                  )}
                  
                  <Button
                    type={currentStep === 3 ? "submit" : "button"}
                    onClick={currentStep < 3 ? nextStep : undefined}
                    disabled={loading}
                    className="bg-military text-white hover:bg-military-light"
                  >
                    {currentStep < 3 ? "Continue" : (loading ? "Creating Account..." : "Create Account")}
                  </Button>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-center">
              <p className="text-sm text-white/70">
                Already have an account? <Link to="/auth/login" className="text-military hover:underline">Log in</Link>
              </p>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Register;
