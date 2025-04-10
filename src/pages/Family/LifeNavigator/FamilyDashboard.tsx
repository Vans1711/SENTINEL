import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Shield, 
  Clock, 
  GraduationCap, 
  FileText, 
  Calendar, 
  Bell, 
  User,
  ChevronRight,
  LogOut,
  Calendar as CalendarIcon,
  CheckCircle2,
  Share2,
  Download,
  Clipboard,
} from 'lucide-react';
import { UserProfile, Task } from './index';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface FamilyDashboardProps {
  profile: UserProfile;
  tasks: Task[];
  voiceGuidance: boolean;
}

const FamilyDashboard: React.FC<FamilyDashboardProps> = ({
  profile,
  tasks,
  voiceGuidance
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [sharePin, setSharePin] = useState('');

  // Generate a random 6-digit PIN for sharing access
  const generateSharePin = () => {
    const pin = Math.floor(100000 + Math.random() * 900000).toString();
    setSharePin(pin);
    setShowShareDialog(true);
  };

  // Calculate progress percentages
  const getProgressPercentage = (category: string): number => {
    const categoryTasks = tasks.filter(task => task.category === category);
    if (categoryTasks.length === 0) return 0;
    
    const completedTasks = categoryTasks.filter(task => task.status === 'completed');
    return Math.round((completedTasks.length / categoryTasks.length) * 100);
  };

  // Get counts for summary
  const counts = {
    pendingTasks: tasks.filter(task => task.status !== 'completed').length,
    completedTasks: tasks.filter(task => task.status === 'completed').length,
    upcomingDeadlines: tasks.filter(task => 
      task.status !== 'completed' && 
      task.deadline && 
      new Date(task.deadline) > new Date() && 
      new Date(task.deadline) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    ).length
  };

  // Format date string
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'No date';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-IN', { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric' 
      });
    } catch (e) {
      return 'Invalid date';
    }
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Capitalize the first letter of a string
  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  // Calculate task completion percentage
  const getTaskCompletionPercentage = () => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.status === 'completed').length;
    return Math.round((completedTasks / totalTasks) * 100);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold flex items-center">
            <Users className="mr-2 h-6 w-6 text-military" />
            {t('life_navigator.dashboard.title', 'Family Dashboard')}
          </h2>
          <p className="text-white/70 text-sm">
            {t('life_navigator.dashboard.welcome', 'Welcome')} {profile.name}, {t('life_navigator.dashboard.here_is_your_overview', 'here is your family support overview')}
          </p>
        </div>

        <div className="flex space-x-3">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button 
                variant="outline" 
                className="border-military/50 text-military"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-[#1A1A1A] border-[#2D3748]">
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
                <AlertDialogDescription>
                  Your profile data will remain saved on this device.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="bg-[#2D3748] text-white hover:bg-[#3D4758]">Cancel</AlertDialogCancel>
                <AlertDialogAction 
                  className="bg-military text-white hover:bg-military-light"
                  onClick={handleLogout}
                >
                  Logout
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* Personal Info Summary */}
      <Card className="bg-[#1A1A1A]/30 border-[#2D3748]">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="shrink-0">
              <div className="w-20 h-20 bg-military/20 rounded-full flex items-center justify-center text-2xl font-bold">
                {profile.name?.substring(0, 2).toUpperCase() || 'U'}
              </div>
            </div>
            
            <div className="flex-grow">
              <h3 className="text-xl font-medium">{profile.name || 'User'}</h3>
              <div className="grid grid-cols-4 gap-2 mb-4">
                <div className="p-3 rounded-lg bg-[#1A1A1A]/50 border border-[#2D3748] text-center">
                  <div className="text-xs text-white/70 text-center">Relationship</div>
                  <div className="font-medium text-white mt-1">
                    {profile.relationship ? capitalizeFirstLetter(profile.relationship) : 'Not specified'}
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-[#1A1A1A]/50 border border-[#2D3748] text-center">
                  <div className="text-xs text-white/70 text-center">Force</div>
                  <div className="font-medium text-white mt-1">
                    {profile.martyr?.force || 'Not specified'}
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-[#1A1A1A]/50 border border-[#2D3748] text-center">
                  <div className="text-xs text-white/70 text-center">Martyrdom Date</div>
                  <div className="font-medium text-white mt-1">
                    {profile.martyr?.dateOfMartyrdom 
                      ? formatDate(profile.martyr.dateOfMartyrdom)
                      : 'Not specified'}
                  </div>
                </div>
                {profile.identification?.idType && profile.identification.idType !== "None" && (
                  <div className="p-3 rounded-lg bg-[#1A1A1A]/50 border border-[#2D3748] text-center">
                    <div className="text-xs text-white/70 text-center">ID Type</div>
                    <div className="font-medium text-white mt-1">
                      {profile.identification?.idType || 'Not specified'}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Support Status */}
              <div className="bg-[#1A1A1A]/30 p-4 rounded-lg border border-[#2D3748] mb-6">
                <h3 className="text-lg font-medium mb-3">Support Status</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Clipboard className="h-5 w-5 text-military mr-2" />
                      <span>Tasks Completion</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-48 h-2 bg-[#1A1A1A]/50 rounded-full mr-3">
                        <div 
                          className="h-2 bg-gradient-to-r from-military to-military-light rounded-full" 
                          style={{ width: `${getTaskCompletionPercentage()}%` }}
                        />
                      </div>
                      <span className="text-sm">{getTaskCompletionPercentage()}%</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Shield className="h-5 w-5 text-military mr-2" />
                      <span>Service Access</span>
                    </div>
                    <Badge className="bg-green-700">
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Full Access
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="shrink-0 space-y-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full border-military/50 text-military"
                onClick={generateSharePin}
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share Access
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Life Roadmap Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card className="bg-[#1A1A1A]/30 border-military/30 h-full">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-military" />
                Your Life Roadmap
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {profile.lifeRoadmap?.map((path, index) => (
                <div key={index} className="bg-[#1A1A1A]/50 border border-[#2D3748] rounded-lg p-4">
                  <h3 className="font-medium text-lg mb-2">{path.pathName}</h3>
                  <p className="text-white/70 text-sm mb-4">{path.description}</p>
                  
                  <div className="space-y-3 mb-2">
                    {path.steps.map((step, stepIndex) => (
                      <div key={stepIndex} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className={`w-2 h-2 rounded-full mr-2 ${
                            step.status === 'completed' ? 'bg-green-500' : 
                            step.status === 'in-progress' ? 'bg-blue-500' : 'bg-gray-500'
                          }`} />
                          <div>
                            <span className="text-sm">{step.title}</span>
                            {step.deadline && (
                              <div className="flex items-center text-xs text-white/50 mt-0.5">
                                <CalendarIcon className="h-3 w-3 mr-1" />
                                {formatDate(step.deadline)}
                              </div>
                            )}
                          </div>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded ${
                          step.status === 'completed' ? 'bg-green-900/30 text-green-400' : 
                          step.status === 'in-progress' ? 'bg-blue-900/30 text-blue-400' : 'bg-gray-900/30 text-gray-400'
                        }`}>
                          {step.status.replace('-', ' ')}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    variant="link" 
                    className="text-military p-0 h-auto mt-2 text-sm"
                    onClick={() => {
                      if (path.pathName.includes('Government')) {
                        navigate('/family/life-navigator/government');
                      } else if (path.pathName.includes('Education')) {
                        navigate('/family/life-navigator/education');
                      } else if (path.pathName.includes('Skill')) {
                        navigate('/family/life-navigator/skill');
                      }
                    }}
                  >
                    View details →
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          {/* Progress Summary */}
          <Card className="bg-[#1A1A1A]/30 border-[#2D3748]">
            <CardHeader className="pb-2">
              <CardTitle>Progress Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Pension & Documents</span>
                  <span>{getProgressPercentage('pension')}%</span>
                </div>
                <Progress value={getProgressPercentage('pension')} className="h-2 bg-[#2D3748]" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Education</span>
                  <span>{getProgressPercentage('education')}%</span>
                </div>
                <Progress value={getProgressPercentage('education')} className="h-2 bg-[#2D3748]" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Skills & Employment</span>
                  <span>{getProgressPercentage('skill') + getProgressPercentage('job')}%</span>
                </div>
                <Progress value={(getProgressPercentage('skill') + getProgressPercentage('job')) / 2} className="h-2 bg-[#2D3748]" />
              </div>
              
              <div className="pt-2">
                <Button 
                  variant="outline" 
                  className="w-full border-military/50 text-military"
                  onClick={() => navigate('/family/life-navigator/timeline')}
                >
                  <Clock className="h-4 w-4 mr-2" />
                  View All Tasks
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Upcoming Events */}
          <Card className="bg-[#1A1A1A]/30 border-[#2D3748]">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Bell className="mr-2 h-5 w-5 text-military" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {counts.upcomingDeadlines > 0 ? (
                  <div className="bg-amber-900/20 border border-amber-800/30 rounded-lg p-3 text-sm">
                    <p className="font-medium text-amber-400">Upcoming Deadlines</p>
                    <p className="text-white/70 mt-1">You have {counts.upcomingDeadlines} task(s) due within the next 7 days</p>
                  </div>
                ) : (
                  <div className="bg-green-900/20 border border-green-800/30 rounded-lg p-3 text-sm">
                    <p className="font-medium text-green-400">No Upcoming Deadlines</p>
                    <p className="text-white/70 mt-1">You have no immediate deadlines in the next 7 days</p>
                  </div>
                )}
                
                <div className="bg-[#1A1A1A]/50 border border-[#2D3748] rounded-lg p-3 text-sm">
                  <p className="font-medium">Document Updates</p>
                  <p className="text-white/70 mt-1">Remember to keep your documents up-to-date for smoother processing</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Download Report */}
          <Card className="bg-[#1A1A1A]/30 border-[#2D3748]">
            <CardContent className="p-4">
              <Button variant="outline" className="w-full border-military/50 text-military">
                <Download className="h-4 w-4 mr-2" />
                Download Status Report
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Share Access Dialog */}
      <AlertDialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <AlertDialogContent className="bg-[#1A1A1A] border-[#2D3748]">
          <AlertDialogHeader>
            <AlertDialogTitle>Share Dashboard Access</AlertDialogTitle>
            <AlertDialogDescription>
              Use this PIN to allow a trusted family member or support person to access your dashboard. This PIN will expire in 24 hours.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex justify-center py-6">
            <div className="bg-[#2D3748] rounded-lg px-8 py-4 font-mono text-xl tracking-widest">
              {sharePin}
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogAction 
              className="bg-military text-white hover:bg-military-light"
              onClick={() => setShowShareDialog(false)}
            >
              Done
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default FamilyDashboard; 