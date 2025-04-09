import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ResourceMatcher from '@/components/ResourceMatcher';
import { 
  User, 
  Phone, 
  Mail, 
  Clock, 
  Calendar, 
  MapPin, 
  Award,
  Edit,
  Heart,
  Users,
  FileText,
  GraduationCap,
  FileEdit,
  CheckCircle2,
  AlarmClock,
  Bookmark,
  Puzzle,
  LifeBuoy
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const FamilyProfile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // If user is not authenticated or not a family, redirect to login
  React.useEffect(() => {
    if (!user) {
      navigate('/auth/login');
    } else if (user.userType !== 'family') {
      navigate('/volunteer/profile');
    }
  }, [user, navigate]);

  if (!user || user.userType !== 'family') {
    return null; // Don't render anything while redirecting
  }

  // Fallback data for demo purposes (for fields not collected during registration)
  const demoData = {
    martyrInfo: {
      name: user.martyrName || 'Unknown',
      rank: user.martyrRank || 'Unknown',
      unit: user.martyrUnit || 'Unknown',
      dateOfMartyrdom: '2022-06-15',
      placeOfMartyrdom: 'Unknown',
      awards: []
    },
    
    familyMembers: [
      { id: 1, name: user.name, relationship: user.relationship || 'Primary Contact', age: '-' }
    ],
    
    supportStatus: {
      pension: 'Pending',
      housing: 'Pending',
      education: 'Pending',
      healthcare: 'Pending',
      employment: 'Pending'
    },
    
    assignedVolunteers: [],
    upcomingSupport: [],
    supportHistory: [],
    supportRequests: []
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Profile Header */}
          <div className="relative mb-8">
            <div className="h-32 bg-military/20 rounded-t-xl"></div>
            <div className="absolute bottom-0 left-0 w-full transform translate-y-1/2 flex px-6">
              <div className="w-24 h-24 rounded-xl bg-military flex items-center justify-center text-white text-3xl border-4 border-[#121212]">
                <Users />
              </div>
              <div className="ml-4 mt-auto pb-2">
                <h1 className="text-2xl font-bold">{demoData.martyrInfo.name}'s Family</h1>
                <div className="flex items-center space-x-2 text-white/70">
                  <span>Martyr Family</span>
                  <span>•</span>
                  <span>ID: {user.id}</span>
                </div>
              </div>
              <div className="ml-auto mt-auto pb-2">
                <Button className="bg-military text-white hover:bg-military-light mr-2" onClick={() => navigate('/family/life-navigator')}>
                  <LifeBuoy className="h-4 w-4 mr-2" /> Life Navigator
                </Button>
                <Button className="bg-military text-white hover:bg-military-light">
                  <Edit className="h-4 w-4 mr-2" /> Edit Profile
                </Button>
              </div>
            </div>
          </div>
          
          {/* Tab Navigation (with some extra space for the overlapping profile header) */}
          <div className="pt-16">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="bg-[#1A1A1A] p-1 rounded-lg mb-6">
                <TabsTrigger 
                  value="overview"
                  className={`rounded-md px-4 py-2 ${activeTab === 'overview' 
                    ? 'bg-military text-white' 
                    : 'text-white/70 hover:text-white hover:bg-[#2A2A2A]'}`}
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger 
                  value="martyr"
                  className={`rounded-md px-4 py-2 ${activeTab === 'martyr' 
                    ? 'bg-military text-white' 
                    : 'text-white/70 hover:text-white hover:bg-[#2A2A2A]'}`}
                >
                  Martyr Information
                </TabsTrigger>
                <TabsTrigger 
                  value="support"
                  className={`rounded-md px-4 py-2 ${activeTab === 'support' 
                    ? 'bg-military text-white' 
                    : 'text-white/70 hover:text-white hover:bg-[#2A2A2A]'}`}
                >
                  Support Status
                </TabsTrigger>
                <TabsTrigger 
                  value="resources"
                  className={`rounded-md px-4 py-2 ${activeTab === 'resources' 
                    ? 'bg-military text-white' 
                    : 'text-white/70 hover:text-white hover:bg-[#2A2A2A]'}`}
                >
                  Resources
                </TabsTrigger>
                <TabsTrigger 
                  value="requests"
                  className={`rounded-md px-4 py-2 ${activeTab === 'requests' 
                    ? 'bg-military text-white' 
                    : 'text-white/70 hover:text-white hover:bg-[#2A2A2A]'}`}
                >
                  Requests
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Family Contact Information */}
                  <Card className="bg-[#1A1A1A]/40 border-military/30 col-span-1">
                    <CardHeader>
                      <CardTitle className="text-lg">Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center">
                        <User className="text-military h-5 w-5 mr-3" />
                        <div>
                          <p className="text-white/60 text-sm">Primary Contact</p>
                          <p>{user.name}</p>
                          {user.relationship && (
                            <p className="text-white/60 text-xs">{user.relationship} of Martyr</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <Mail className="text-military h-5 w-5 mr-3" />
                        <div>
                          <p className="text-white/60 text-sm">Email</p>
                          <p>{user.email}</p>
                        </div>
                      </div>
                      
                      {user.phone && (
                        <div className="flex items-center">
                          <Phone className="text-military h-5 w-5 mr-3" />
                          <div>
                            <p className="text-white/60 text-sm">Phone</p>
                            <p>{user.phone}</p>
                          </div>
                        </div>
                      )}
                      
                      {user.address && (
                        <div className="flex items-start">
                          <MapPin className="text-military h-5 w-5 mr-3 mt-1" />
                          <div>
                            <p className="text-white/60 text-sm">Address</p>
                            <p>{user.address}</p>
                            {user.district && user.state && user.pincode && (
                              <p>{user.district}, {user.state} - {user.pincode}</p>
                            )}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                  
                  {/* Family Members Card */}
                  <Card className="bg-[#1A1A1A]/40 border-military/30 col-span-1">
                    <CardHeader>
                      <CardTitle className="text-lg">Family Members</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {demoData.familyMembers.map(member => (
                          <div key={member.id} className="flex items-center p-3 bg-military/10 rounded-md">
                            <div className="h-10 w-10 rounded-full bg-military/30 flex items-center justify-center mr-3">
                              <User className="h-5 w-5" />
                            </div>
                            <div>
                              <p className="font-medium">{member.name}</p>
                              <div className="flex text-sm text-white/70">
                                <span>{member.relationship}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                        
                        <div className="text-center py-3">
                          <Button variant="outline" className="border-military/50 text-sm">
                            <User className="h-4 w-4 mr-2" /> Add Family Member
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Assigned Volunteers Card */}
                  <Card className="bg-[#1A1A1A]/40 border-military/30 col-span-1">
                    <CardHeader>
                      <CardTitle className="text-lg">Assigned Volunteers</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {demoData.assignedVolunteers.length > 0 ? (
                        <div className="space-y-4">
                          {demoData.assignedVolunteers.map(volunteer => (
                            <div key={volunteer.id} className="flex items-center p-3 bg-military/10 rounded-md">
                              <div className="h-10 w-10 rounded-full bg-military/30 flex items-center justify-center mr-3">
                                <Heart className="h-5 w-5" />
                              </div>
                              <div>
                                <p className="font-medium">{volunteer.name}</p>
                                <div className="flex text-sm text-white/70">
                                  <span>{volunteer.role}</span>
                                  <span className="mx-2">•</span>
                                  <span>{volunteer.contact}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-6 text-white/70">
                          <Heart className="h-12 w-12 mx-auto mb-4 text-military/40" />
                          <p>No volunteers assigned yet</p>
                          <p className="text-sm mt-1">Volunteers will be assigned to help with your needs</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                  
                  {/* Upcoming Support Card */}
                  <Card className="bg-[#1A1A1A]/40 border-military/30 col-span-1 md:col-span-3">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle className="text-lg">Upcoming Support Activities</CardTitle>
                      <Button variant="outline" className="border-military/50 h-8 px-3 py-1">
                        View All
                      </Button>
                    </CardHeader>
                    <CardContent>
                      {demoData.upcomingSupport.length > 0 ? (
                        <div className="space-y-3">
                          {demoData.upcomingSupport.map(support => (
                            <div key={support.id} className="flex items-center p-3 bg-military/10 rounded-md">
                              <div className="h-10 w-10 rounded-full bg-military flex items-center justify-center mr-3">
                                <Calendar className="h-5 w-5" />
                              </div>
                              <div className="flex-1">
                                <div className="flex justify-between">
                                  <p className="font-medium">{support.activity}</p>
                                  <Badge className="bg-military text-white">
                                    {new Date(support.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                                  </Badge>
                                </div>
                                <div className="flex text-sm text-white/70">
                                  <span>Volunteer: {support.volunteer}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-6 text-white/70">
                          <p>No upcoming support activities scheduled.</p>
                          <Button className="mt-3 bg-military text-white hover:bg-military-light">
                            Request Support
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="martyr" className="space-y-6">
                <Card className="bg-[#1A1A1A]/40 border-military/30">
                  <CardHeader>
                    <CardTitle className="text-lg">Martyr Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-white/60 text-sm mb-1">Full Name</h3>
                          <p className="text-lg font-medium">{demoData.martyrInfo.name}</p>
                        </div>
                        
                        <div>
                          <h3 className="text-white/60 text-sm mb-1">Rank</h3>
                          <p>{demoData.martyrInfo.rank}</p>
                        </div>
                        
                        <div>
                          <h3 className="text-white/60 text-sm mb-1">Unit</h3>
                          <p>{demoData.martyrInfo.unit}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-white/60 text-sm mb-1">Date of Martyrdom</h3>
                          <p>{new Date(demoData.martyrInfo.dateOfMartyrdom).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                        </div>
                        
                        <div>
                          <h3 className="text-white/60 text-sm mb-1">Place of Martyrdom</h3>
                          <p>{demoData.martyrInfo.placeOfMartyrdom}</p>
                        </div>
                        
                        {demoData.martyrInfo.awards.length > 0 && (
                          <div>
                            <h3 className="text-white/60 text-sm mb-1">Awards & Honors</h3>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {demoData.martyrInfo.awards.map((award, index) => (
                                <Badge key={index} className="bg-military/20 text-military border border-military">
                                  <Award className="h-3 w-3 mr-1" /> {award}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="p-4 bg-military/10 rounded-md">
                      <p className="text-center italic">
                        "We honor the supreme sacrifice made for our nation."
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="support" className="space-y-6">
                <Card className="bg-[#1A1A1A]/40 border-military/30">
                  <CardHeader>
                    <CardTitle className="text-lg">Support Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                        <div className="bg-[#1A1A1A]/50 p-4 rounded-md">
                          <div className="flex items-center mb-2">
                            <FileText className="h-5 w-5 mr-2 text-military" />
                            <h3 className="font-medium">Pension</h3>
                          </div>
                          <Badge className={`${
                            demoData.supportStatus.pension === 'Approved' ? 'bg-green-600' :
                            demoData.supportStatus.pension === 'Pending' ? 'bg-yellow-500' :
                            'bg-blue-500'
                          } text-white`}>
                            {demoData.supportStatus.pension}
                          </Badge>
                        </div>
                        
                        <div className="bg-[#1A1A1A]/50 p-4 rounded-md">
                          <div className="flex items-center mb-2">
                            <MapPin className="h-5 w-5 mr-2 text-military" />
                            <h3 className="font-medium">Housing</h3>
                          </div>
                          <Badge className={`${
                            demoData.supportStatus.housing === 'Provided' ? 'bg-green-600' :
                            demoData.supportStatus.housing === 'Pending' ? 'bg-yellow-500' :
                            'bg-blue-500'
                          } text-white`}>
                            {demoData.supportStatus.housing}
                          </Badge>
                        </div>
                        
                        <div className="bg-[#1A1A1A]/50 p-4 rounded-md">
                          <div className="flex items-center mb-2">
                            <GraduationCap className="h-5 w-5 mr-2 text-military" />
                            <h3 className="font-medium">Education</h3>
                          </div>
                          <Badge className={`${
                            demoData.supportStatus.education === 'Approved' ? 'bg-green-600' :
                            demoData.supportStatus.education === 'In Progress' ? 'bg-blue-500' :
                            'bg-yellow-500'
                          } text-white`}>
                            {demoData.supportStatus.education}
                          </Badge>
                        </div>
                        
                        <div className="bg-[#1A1A1A]/50 p-4 rounded-md">
                          <div className="flex items-center mb-2">
                            <Heart className="h-5 w-5 mr-2 text-military" />
                            <h3 className="font-medium">Healthcare</h3>
                          </div>
                          <Badge className={`${
                            demoData.supportStatus.healthcare === 'Approved' ? 'bg-green-600' :
                            demoData.supportStatus.healthcare === 'Pending' ? 'bg-yellow-500' :
                            'bg-blue-500'
                          } text-white`}>
                            {demoData.supportStatus.healthcare}
                          </Badge>
                        </div>
                        
                        <div className="bg-[#1A1A1A]/50 p-4 rounded-md">
                          <div className="flex items-center mb-2">
                            <Award className="h-5 w-5 mr-2 text-military" />
                            <h3 className="font-medium">Employment</h3>
                          </div>
                          <Badge className={`${
                            demoData.supportStatus.employment === 'Approved' ? 'bg-green-600' :
                            demoData.supportStatus.employment === 'Pending' ? 'bg-yellow-500' :
                            'bg-blue-500'
                          } text-white`}>
                            {demoData.supportStatus.employment}
                          </Badge>
                        </div>
                      </div>
                      
                      {demoData.supportHistory.length > 0 ? (
                        <div className="p-4 bg-military/20 rounded-md">
                          <h3 className="font-medium mb-2">Support History</h3>
                          <div className="space-y-4">
                            {demoData.supportHistory.map(support => (
                              <div key={support.id} className="flex items-start">
                                <div className="h-6 w-6 rounded-full bg-green-600/20 flex items-center justify-center mr-3 mt-1">
                                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                                </div>
                                <div>
                                  <div className="flex items-center">
                                    <p className="font-medium">{support.activity}</p>
                                    <span className="mx-2 text-white/50">•</span>
                                    <p className="text-white/70">{new Date(support.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                                  </div>
                                  <p className="text-sm text-white/70">Volunteer: {support.volunteer}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="p-4 bg-military/10 rounded-md text-center">
                          <p className="text-white/70">No support history available yet.</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* New Resources Tab */}
              <TabsContent value="resources" className="space-y-6">
                <Card className="bg-[#1A1A1A]/40 border-military/30">
                  <CardHeader className="pb-2">
                    <div className="flex items-center">
                      <Puzzle className="h-5 w-5 text-orange-400 mr-2" />
                      <CardTitle className="text-lg">Automated Resource Matching</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ResourceMatcher />
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="requests">
                <div className="space-y-6">
                  <Card className="bg-[#1A1A1A]/40 border-military/30">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle className="text-lg">My Support Requests</CardTitle>
                      <Button className="bg-military text-white hover:bg-military-light">
                        New Request
                      </Button>
                    </CardHeader>
                    <CardContent>
                      {demoData.supportRequests.length > 0 ? (
                        <div className="space-y-4">
                          {demoData.supportRequests.map(request => (
                            <div key={request.id} className="p-4 bg-[#1A1A1A]/50 rounded-md">
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <h3 className="font-medium">{request.type} Support Request</h3>
                                  <p className="text-sm text-white/70">{new Date(request.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                                </div>
                                <Badge className={`${
                                  request.status === 'approved' ? 'bg-green-600' :
                                  request.status === 'in-review' ? 'bg-blue-500' :
                                  request.status === 'pending' ? 'bg-yellow-500' :
                                  'bg-red-500'
                                } text-white`}>
                                  {request.status === 'approved' ? 'Approved' : 
                                   request.status === 'in-review' ? 'In Review' : 
                                   request.status === 'pending' ? 'Pending' : 'Rejected'}
                                </Badge>
                              </div>
                              <p>{request.description}</p>
                              <div className="flex mt-3 space-x-2">
                                <Button variant="outline" className="text-xs h-8 border-military/50">
                                  View Details
                                </Button>
                                {request.status !== 'approved' && (
                                  <Button variant="outline" className="text-xs h-8 border-military/50">
                                    <FileEdit className="h-3 w-3 mr-1" /> Edit
                                  </Button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-6 text-white/70">
                          <p>You have no support requests.</p>
                          <Button className="mt-3 bg-military text-white hover:bg-military-light">
                            Submit a Request
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-[#1A1A1A]/40 border-military/30">
                    <CardHeader>
                      <CardTitle className="text-lg">Available Support Programs</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-[#1A1A1A]/50 rounded-md hover:bg-military/10 transition-colors cursor-pointer">
                          <div className="flex items-center mb-2">
                            <GraduationCap className="h-5 w-5 mr-2 text-military" />
                            <h3 className="font-medium">Educational Scholarships</h3>
                          </div>
                          <p className="text-sm text-white/70">Scholarships for martyr children's education</p>
                          <Button variant="link" className="px-0 text-military mt-1">Learn More</Button>
                        </div>
                        
                        <div className="p-4 bg-[#1A1A1A]/50 rounded-md hover:bg-military/10 transition-colors cursor-pointer">
                          <div className="flex items-center mb-2">
                            <MapPin className="h-5 w-5 mr-2 text-military" />
                            <h3 className="font-medium">Housing Assistance</h3>
                          </div>
                          <p className="text-sm text-white/70">Help with home repairs and maintenance</p>
                          <Button variant="link" className="px-0 text-military mt-1">Learn More</Button>
                        </div>
                        
                        <div className="p-4 bg-[#1A1A1A]/50 rounded-md hover:bg-military/10 transition-colors cursor-pointer">
                          <div className="flex items-center mb-2">
                            <Heart className="h-5 w-5 mr-2 text-military" />
                            <h3 className="font-medium">Healthcare Support</h3>
                          </div>
                          <p className="text-sm text-white/70">Medical assistance and health insurance</p>
                          <Button variant="link" className="px-0 text-military mt-1">Learn More</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FamilyProfile; 