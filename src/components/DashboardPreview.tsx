import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { 
  Calendar, 
  Bell, 
  FileText, 
  DollarSign, 
  Users, 
  AlertTriangle, 
  Puzzle, 
  GraduationCap, 
  Heart, 
  Home, 
  Briefcase 
} from 'lucide-react';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';

const DashboardPreview = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-saffron">Intuitive</span> Dashboard Experience
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Our comprehensive dashboards provide real-time insights and updates for families, volunteers, and administrators.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Family Dashboard Preview */}
          <div className="glass-card rounded-xl p-6 shadow-xl transform hover:scale-[1.02] transition-transform duration-300">
            <h3 className="text-2xl font-bold mb-6 text-white flex items-center">
              <Users className="mr-2 text-saffron" /> Family Dashboard
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <Card className="bg-navy/60 border-military/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-saffron" /> Welfare Check-In
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-lg font-bold">Next: 15 May</p>
                      <p className="text-xs text-white/60">Last visit: 2 weeks ago</p>
                    </div>
                    <Badge className="bg-green-600">Scheduled</Badge>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-navy/60 border-military/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <DollarSign className="h-4 w-4 mr-2 text-saffron" /> Pension Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-lg font-bold">₹45,000</p>
                      <p className="text-xs text-white/60">Last received: 1 Apr</p>
                    </div>
                    <Badge className="bg-saffron text-navy">Credited</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Automated Resource Matching Card */}
            <Card className="bg-navy/40 border-military/20 mb-6">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <Puzzle className="h-4 w-4 mr-2 text-orange-400" /> Personalized Resource Matches
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-white/70 mb-3">Based on your family profile and needs analysis:</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between bg-navy/60 p-2 rounded-md">
                    <div className="flex items-center">
                      <div className="bg-blue-500/20 p-1 rounded mr-2">
                        <GraduationCap className="h-3 w-3 text-blue-400" />
                      </div>
                      <div>
                        <p className="text-xs font-medium">PM's Scholarship Scheme</p>
                        <p className="text-[10px] text-white/60">Ministry of Defence</p>
                      </div>
                    </div>
                    <Badge className="bg-green-600 text-[10px]">95% Match</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between bg-navy/60 p-2 rounded-md">
                    <div className="flex items-center">
                      <div className="bg-red-500/20 p-1 rounded mr-2">
                        <Heart className="h-3 w-3 text-red-400" />
                      </div>
                      <div>
                        <p className="text-xs font-medium">ECHS Healthcare Coverage</p>
                        <p className="text-[10px] text-white/60">Ex-Servicemen Health Scheme</p>
                      </div>
                    </div>
                    <Badge className="bg-green-600 text-[10px]">98% Match</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between bg-navy/60 p-2 rounded-md">
                    <div className="flex items-center">
                      <div className="bg-yellow-500/20 p-1 rounded mr-2">
                        <FileText className="h-3 w-3 text-yellow-400" />
                      </div>
                      <div>
                        <p className="text-xs font-medium">Special Family Pension</p>
                        <p className="text-[10px] text-white/60">Dept. of Ex-Servicemen Welfare</p>
                      </div>
                    </div>
                    <Badge className="bg-green-600 text-[10px]">100% Match</Badge>
                  </div>
                </div>
                <div className="mt-2 flex justify-between items-center">
                  <p className="text-[10px] text-white/50">3 more resources available</p>
                  <Badge className="bg-orange-500/20 text-orange-400 border border-orange-500/30 text-[10px]">Auto-matched for your needs</Badge>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-navy/40 border-military/20 mb-6">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <Bell className="h-4 w-4 mr-2 text-saffron" /> Recent Notifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="w-2 h-2 rounded-full bg-green-500 mt-2 mr-2"></span>
                    <div>
                      <p className="text-sm">Scholarship application approved</p>
                      <p className="text-xs text-white/60">Today, 9:30 AM</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 rounded-full bg-saffron mt-2 mr-2"></span>
                    <div>
                      <p className="text-sm">New educational program available</p>
                      <p className="text-xs text-white/60">Yesterday, 2:15 PM</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 rounded-full bg-white/60 mt-2 mr-2"></span>
                    <div>
                      <p className="text-sm">Monthly welfare visit report updated</p>
                      <p className="text-xs text-white/60">3 days ago</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="bg-navy/40 border-military/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-saffron" /> Welfare Programs Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs">Education Support</span>
                      <span className="text-xs font-medium">75%</span>
                    </div>
                    <div className="relative">
                      <Progress value={75} className="h-2 bg-navy" />
                      <div className="absolute inset-0 bg-saffron h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs">Housing Allowance</span>
                      <span className="text-xs font-medium">100%</span>
                    </div>
                    <div className="relative">
                      <Progress value={100} className="h-2 bg-navy" />
                      <div className="absolute inset-0 bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs">Healthcare Benefits</span>
                      <span className="text-xs font-medium">60%</span>
                    </div>
                    <div className="relative">
                      <Progress value={60} className="h-2 bg-navy" />
                      <div className="absolute inset-0 bg-blue-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Admin Dashboard Preview */}
          <div className="glass-card rounded-xl p-6 shadow-xl transform hover:scale-[1.02] transition-transform duration-300">
            <h3 className="text-2xl font-bold mb-6 text-white flex items-center">
              <AlertTriangle className="mr-2 text-saffron" /> Alert Monitoring
            </h3>
            
            <Card className="bg-navy/40 border-military/20 mb-6">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-2 text-red-500" /> Critical Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="p-3 bg-military/20 rounded-md border border-red-500/30">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-red-400">Pension Payment Delayed</p>
                        <p className="text-xs text-white/70">Family ID: MAR-1234</p>
                        <p className="text-xs text-white/70">Region: Pathankot, Punjab</p>
                      </div>
                      <Badge className="bg-red-600">Urgent</Badge>
                    </div>
                    <div className="mt-2 text-xs text-white/80">
                      Pension payment missing for 45 days. Family has 2 dependents. Previous follow-up unsuccessful.
                    </div>
                  </li>
                  
                  <li className="p-3 bg-military/20 rounded-md border border-yellow-500/30">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-yellow-400">Emotional Support Needed</p>
                        <p className="text-xs text-white/70">Family ID: MAR-2856</p>
                        <p className="text-xs text-white/70">Region: Shimla, Himachal Pradesh</p>
                      </div>
                      <Badge className="bg-yellow-600">High</Badge>
                    </div>
                    <div className="mt-2 text-xs text-white/80">
                      AI detected distress in recent communications. Child's education concerns. Counseling recommended.
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <Card className="bg-navy/60 border-military/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <Users className="h-4 w-4 mr-2 text-saffron" /> Families Monitored
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <p className="text-3xl font-bold">1,240</p>
                    <div className="flex justify-center mt-2">
                      <Badge className="bg-green-600 mr-2">1,180 Safe</Badge>
                      <Badge className="bg-red-600">60 Alerts</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-navy/60 border-military/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <Puzzle className="h-4 w-4 mr-2 text-orange-400" /> Resource Matching
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <p className="text-3xl font-bold">92%</p>
                    <p className="text-xs text-white/60 mt-1">Resources successfully matched</p>
                    <div className="flex justify-center mt-2">
                      <Badge className="bg-blue-600">7,140 Resources</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="bg-navy/40 border-military/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <Puzzle className="h-4 w-4 mr-2 text-orange-400" /> Resource Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs flex items-center">
                        <GraduationCap className="h-3 w-3 mr-1 text-blue-400" /> Education
                      </span>
                      <span className="text-xs font-medium">428 families matched</span>
                    </div>
                    <div className="relative">
                      <Progress value={85} className="h-2 bg-navy" />
                      <div className="absolute inset-0 bg-blue-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs flex items-center">
                        <Heart className="h-3 w-3 mr-1 text-red-400" /> Healthcare
                      </span>
                      <span className="text-xs font-medium">612 families matched</span>
                    </div>
                    <div className="relative">
                      <Progress value={95} className="h-2 bg-navy" />
                      <div className="absolute inset-0 bg-red-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs flex items-center">
                        <Briefcase className="h-3 w-3 mr-1 text-purple-400" /> Employment
                      </span>
                      <span className="text-xs font-medium">216 families matched</span>
                    </div>
                    <div className="relative">
                      <Progress value={65} className="h-2 bg-navy" />
                      <div className="absolute inset-0 bg-purple-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs flex items-center">
                        <Home className="h-3 w-3 mr-1 text-green-400" /> Housing
                      </span>
                      <span className="text-xs font-medium">352 families matched</span>
                    </div>
                    <div className="relative">
                      <Progress value={78} className="h-2 bg-navy" />
                      <div className="absolute inset-0 bg-green-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPreview;
