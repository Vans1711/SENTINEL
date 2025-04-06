import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  Building,
  Star,
  FileEdit
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const VolunteerProfile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // If user is not authenticated or not a volunteer, redirect to login
  React.useEffect(() => {
    if (!user) {
      navigate('/auth/login');
    } else if (user.userType !== 'volunteer') {
      navigate('/family/profile');
    }
  }, [user, navigate]);

  if (!user || user.userType !== 'volunteer') {
    return null; // Don't render anything while redirecting
  }

  // Fallback data for demo purposes (for fields not collected during registration)
  const demoData = {
    joinedDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    status: 'active',
    totalHours: 0,
    assignedFamilies: 0,
    completedTasks: 0,
    upcomingTasks: 0,
    badgesEarned: [],
    supportHistory: [],
    upcomingSupport: []
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
                {user.volunteerType === 'ngo' ? <Building /> : <User />}
              </div>
              <div className="ml-4 mt-auto pb-2">
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <div className="flex items-center space-x-2 text-white/70">
                  <span>{user.volunteerType === 'ngo' ? 'Organization' : 'Volunteer'}</span>
                  <span>•</span>
                  <span>ID: {user.id}</span>
                </div>
              </div>
              <div className="ml-auto mt-auto pb-2">
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
                  value="history"
                  className={`rounded-md px-4 py-2 ${activeTab === 'history' 
                    ? 'bg-military text-white' 
                    : 'text-white/70 hover:text-white hover:bg-[#2A2A2A]'}`}
                >
                  Support History
                </TabsTrigger>
                <TabsTrigger 
                  value="schedule"
                  className={`rounded-md px-4 py-2 ${activeTab === 'schedule' 
                    ? 'bg-military text-white' 
                    : 'text-white/70 hover:text-white hover:bg-[#2A2A2A]'}`}
                >
                  Schedule
                </TabsTrigger>
                <TabsTrigger 
                  value="achievements"
                  className={`rounded-md px-4 py-2 ${activeTab === 'achievements' 
                    ? 'bg-military text-white' 
                    : 'text-white/70 hover:text-white hover:bg-[#2A2A2A]'}`}
                >
                  Achievements
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Personal Information Card */}
                  <Card className="bg-[#1A1A1A]/40 border-military/30 col-span-1">
                    <CardHeader>
                      <CardTitle className="text-lg">Personal Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center">
                        <User className="text-military h-5 w-5 mr-3" />
                        <div>
                          <p className="text-white/60 text-sm">Full Name</p>
                          <p>{user.name}</p>
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
                      
                      {user.volunteerType === 'ngo' && user.organization && (
                        <div className="flex items-center">
                          <Building className="text-military h-5 w-5 mr-3" />
                          <div>
                            <p className="text-white/60 text-sm">Organization</p>
                            <p>{user.organization}</p>
                          </div>
                        </div>
                      )}
                      
                      {user.role && (
                        <div className="flex items-center">
                          <Award className="text-military h-5 w-5 mr-3" />
                          <div>
                            <p className="text-white/60 text-sm">Role</p>
                            <p>{user.role}</p>
                          </div>
                        </div>
                      )}
                      
                      <div className="flex items-center">
                        <Calendar className="text-military h-5 w-5 mr-3" />
                        <div>
                          <p className="text-white/60 text-sm">Joined</p>
                          <p>{demoData.joinedDate}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Statistics & Skills Card */}
                  <Card className="bg-[#1A1A1A]/40 border-military/30 col-span-2">
                    <CardHeader>
                      <CardTitle className="text-lg">Volunteer Statistics</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-military/20 p-4 rounded-md text-center">
                          <div className="text-2xl font-bold">{demoData.totalHours}</div>
                          <div className="text-sm text-white/70">Volunteer Hours</div>
                        </div>
                        
                        <div className="bg-military/20 p-4 rounded-md text-center">
                          <div className="text-2xl font-bold">{demoData.assignedFamilies}</div>
                          <div className="text-sm text-white/70">Families Supported</div>
                        </div>
                        
                        <div className="bg-military/20 p-4 rounded-md text-center">
                          <div className="text-2xl font-bold">{demoData.completedTasks}</div>
                          <div className="text-sm text-white/70">Tasks Completed</div>
                        </div>
                        
                        <div className="bg-military/20 p-4 rounded-md text-center">
                          <div className="text-2xl font-bold">{demoData.badgesEarned.length}</div>
                          <div className="text-sm text-white/70">Badges Earned</div>
                        </div>
                      </div>
                      
                      {user.skills && (
                        <div>
                          <h3 className="font-medium mb-2">Skills & Expertise</h3>
                          <div className="flex flex-wrap gap-2">
                            {user.skills.split(',').map((skill, index) => (
                              <Badge key={index} className="bg-military text-white px-3 py-1">
                                {skill.trim()}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {user.availability && (
                        <div>
                          <h3 className="font-medium mb-2">Availability</h3>
                          <Badge className="bg-[#1A1A1A] border border-military text-white">
                            {user.availability}
                          </Badge>
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
                          {demoData.upcomingSupport.map((task, index) => (
                            <div key={index} className="flex items-center p-3 bg-military/10 rounded-md">
                              <div className="h-10 w-10 rounded-full bg-military flex items-center justify-center mr-3">
                                <Calendar className="h-5 w-5" />
                              </div>
                              <div className="flex-1">
                                <p className="font-medium">{task.activity}</p>
                                <div className="flex text-sm text-white/70">
                                  <span>Family ID: {task.familyId}</span>
                                  <span className="mx-2">•</span>
                                  <span>{new Date(task.date).toLocaleDateString('en-US', { 
                                    weekday: 'short', 
                                    month: 'short', 
                                    day: 'numeric' 
                                  })}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-6 text-white/70">
                          <p>No upcoming support activities scheduled.</p>
                          <Button className="mt-3 bg-military text-white hover:bg-military-light">
                            Find Opportunities
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="history" className="space-y-6">
                <Card className="bg-[#1A1A1A]/40 border-military/30">
                  <CardHeader>
                    <CardTitle className="text-lg">Support History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {demoData.supportHistory.length > 0 ? (
                      <div className="space-y-4">
                        {demoData.supportHistory.map((task, index) => (
                          <div key={index} className="flex items-center p-3 bg-military/10 rounded-md">
                            <div className="h-10 w-10 rounded-full bg-military/40 flex items-center justify-center mr-3">
                              <Clock className="h-5 w-5" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">{task.activity}</p>
                              <div className="flex text-sm text-white/70">
                                <span>Family ID: {task.familyId}</span>
                                <span className="mx-2">•</span>
                                <span>{new Date(task.date).toLocaleDateString('en-US', { 
                                  month: 'short', 
                                  day: 'numeric', 
                                  year: 'numeric' 
                                })}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-6 text-white/70">
                        <p>No support history available yet.</p>
                        <Button className="mt-3 bg-military text-white hover:bg-military-light">
                          Start Supporting
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="schedule">
                <Card className="bg-[#1A1A1A]/40 border-military/30">
                  <CardHeader>
                    <CardTitle className="text-lg">Your Schedule</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12 text-white/70">
                      <Calendar className="h-12 w-12 mx-auto mb-4 text-military" />
                      <p className="mb-2">Calendar interface will be available here</p>
                      <p className="text-sm">Manage your volunteer schedule and availability</p>
                      <Button className="mt-4 bg-military text-white hover:bg-military-light">
                        Update Availability
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="achievements">
                <Card className="bg-[#1A1A1A]/40 border-military/30">
                  <CardHeader>
                    <CardTitle className="text-lg">Badges & Achievements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {demoData.badgesEarned.length > 0 ? (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {demoData.badgesEarned.map((badge, index) => (
                          <div key={index} className="flex flex-col items-center text-center">
                            <div className="h-24 w-24 rounded-full bg-military/20 border-2 border-military flex items-center justify-center mb-3">
                              {badge.icon === 'Heart' && <Heart className="h-12 w-12 text-military" />}
                              {badge.icon === 'Clock' && <Clock className="h-12 w-12 text-military" />}
                              {badge.icon === 'Award' && <Award className="h-12 w-12 text-military" />}
                            </div>
                            <p className="font-medium">{badge.name}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 text-white/70">
                        <Award className="h-12 w-12 mx-auto mb-4 text-military" />
                        <p className="mb-2">No badges earned yet</p>
                        <p className="text-sm">Complete volunteer activities to earn recognition badges</p>
                        <Button className="mt-4 bg-military text-white hover:bg-military-light">
                          Explore Opportunities
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default VolunteerProfile; 