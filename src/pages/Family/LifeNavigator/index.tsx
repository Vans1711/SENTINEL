import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  LifeBuoy, 
  HelpCircle, 
  Calendar, 
  Clock, 
  Clipboard, 
  Shield, 
  GraduationCap, 
  FileText, 
  UserCircle, 
  Users,
  ChevronRight,
  AlertTriangle,
  Volume,
  CheckCircle
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import InitialProfileSetup from './InitialProfileSetup';
import GovernmentProcesses from './GovernmentProcesses';
import EducationCareerPlanner from './EducationCareerPlanner';
import SkillJobGuidance from './SkillJobGuidance';
import Timeline from './Timeline';
import FamilyDashboard from './FamilyDashboard';

// Type definitions
export interface UserProfile {
  id?: string;
  name?: string;
  relationship?: 'widow' | 'child' | 'parent' | 'other';
  age?: number;
  educationLevel?: string;
  challenges?: string[];
  martyr?: {
    name?: string;
    rank?: string;
    force?: string;
    dateOfMartyrdom?: string;
  };
  identification?: {
    idType?: string;
    idNumber?: string;
    aadhaarNumber?: string;
  };
  isProfileComplete?: boolean;
  generatedPaths?: string[];
  lifeRoadmap?: {
    pathName: string;
    description: string;
    steps: Array<{
      title: string;
      description: string;
      deadline?: string;
      status: 'not-started' | 'in-progress' | 'completed';
    }>;
  }[];
}

export interface Task {
  id: string;
  title: string;
  description: string;
  deadline?: string;
  status: 'not-started' | 'in-progress' | 'pending' | 'completed';
  category: 'pension' | 'education' | 'skill' | 'job' | 'document' | 'other';
  relatedPath?: string;
  documents?: {name: string, isSubmitted: boolean}[];
}

const LifeNavigator: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('welcome');
  const [profile, setProfile] = useState<UserProfile>({
    challenges: [],
    isProfileComplete: false,
    generatedPaths: []
  });
  const [tasks, setTasks] = useState<Task[]>([]);
  const [voiceGuidance, setVoiceGuidance] = useState(false);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    const savedTasks = localStorage.getItem('userTasks');
    
    if (savedProfile) {
      try {
        setProfile(JSON.parse(savedProfile));
      } catch (e) {
        console.error('Error parsing profile from localStorage', e);
      }
    }
    
    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks));
      } catch (e) {
        console.error('Error parsing tasks from localStorage', e);
      }
    } else {
      // Load sample tasks if none exist
      setTasks(getSampleTasks());
    }
  }, []);

  // Save data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('userProfile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('userTasks', JSON.stringify(tasks));
  }, [tasks]);

  // Handle profile updates
  const handleProfileUpdate = (updates: Partial<UserProfile>) => {
    setProfile(prevProfile => {
      const updatedProfile = { ...prevProfile, ...updates };
      
      // Generate life paths if profile is complete and doesn't have paths
      if (updatedProfile.isProfileComplete && 
          (!updatedProfile.generatedPaths || updatedProfile.generatedPaths.length === 0)) {
        updatedProfile.generatedPaths = generateLifePaths(updatedProfile);
        updatedProfile.lifeRoadmap = generateLifeRoadmap(updatedProfile);
        
        // Generate tasks based on profile and paths
        const generatedTasks = generateTasks(updatedProfile);
        setTasks(prevTasks => [...prevTasks, ...generatedTasks]);
        
        // Navigate to dashboard after profile completion
        setActiveTab('dashboard');
      }
      
      return updatedProfile;
    });
  };

  // Handle task updates
  const handleTaskUpdate = (taskId: string, updates: Partial<Task>) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId ? { ...task, ...updates } : task
      )
    );
  };

  // Generate life paths based on profile
  const generateLifePaths = (profile: UserProfile): string[] => {
    const paths: string[] = [];
    
    if (profile.challenges?.includes('pension') || 
        profile.challenges?.includes('document') ||
        profile.challenges?.includes('legal')) {
      paths.push('government-processes');
    }
    
    if (profile.challenges?.includes('education') || 
        profile.relationship === 'child' || 
        (profile.age && profile.age < 25)) {
      paths.push('education-career');
    }
    
    if (profile.challenges?.includes('job') || 
        profile.challenges?.includes('skill') || 
        profile.relationship === 'widow' ||
        profile.challenges?.includes('finance')) {
      paths.push('skill-job');
    }
    
    // Always add family dashboard and timeline
    paths.push('family-dashboard');
    
    return paths;
  };

  // Generate detailed life roadmap
  const generateLifeRoadmap = (profile: UserProfile) => {
    const roadmap = [];
    
    // Government processes roadmap
    if (profile.generatedPaths?.includes('government-processes')) {
      roadmap.push({
        pathName: 'Government Processes',
        description: 'Obtain necessary government benefits and complete required documentation',
        steps: [
          {
            title: 'Gather Required Documents',
            description: 'Collect martyr certificate, service record, and ID proofs',
            status: 'not-started'
          },
          {
            title: 'Submit Pension Application',
            description: 'Apply for family pension at concerned department',
            status: 'not-started',
            deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
          },
          {
            title: 'Apply for Canteen Card',
            description: 'Visit nearest CSD canteen office with ID proof',
            status: 'not-started'
          },
          {
            title: 'Check Pension Application Status',
            description: 'Check application status after 45 days',
            status: 'not-started',
            deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString()
          }
        ]
      });
    }
    
    // Education roadmap
    if (profile.generatedPaths?.includes('education-career')) {
      roadmap.push({
        pathName: 'Education & Career Path',
        description: 'Access educational benefits and career planning resources',
        steps: [
          {
            title: 'Apply for Scholarship',
            description: 'Submit application for PM Scholarship Scheme or relevant education support',
            status: 'not-started'
          },
          {
            title: 'School/College Admission',
            description: 'Apply using martyr family quota in schools or colleges',
            status: 'not-started'
          },
          {
            title: 'Career Counseling',
            description: 'Schedule appointment with education counselor',
            status: 'not-started'
          },
          {
            title: 'Entrance Exam Registration',
            description: 'Register for relevant entrance exams with special category',
            status: 'not-started'
          }
        ]
      });
    }
    
    // Skill and job roadmap
    if (profile.generatedPaths?.includes('skill-job')) {
      roadmap.push({
        pathName: 'Skill Development & Employment',
        description: 'Develop skills and find employment opportunities',
        steps: [
          {
            title: 'Skill Assessment',
            description: 'Complete skill assessment at nearest employment center',
            status: 'not-started'
          },
          {
            title: 'Join Skill Training',
            description: 'Enroll in recommended skill development program',
            status: 'not-started',
            deadline: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString()
          },
          {
            title: 'Create Resume',
            description: 'Prepare professional resume with assistance',
            status: 'not-started'
          },
          {
            title: 'Apply for Government Jobs',
            description: 'Apply through special quota in government departments',
            status: 'not-started'
          }
        ]
      });
    }
    
    return roadmap;
  };

  // Generate tasks based on profile and paths
  const generateTasks = (profile: UserProfile): Task[] => {
    const newTasks: Task[] = [];
    
    if (profile.generatedPaths?.includes('government-processes')) {
      newTasks.push({
        id: `task-${Date.now()}-1`,
        title: 'Submit Family Pension Application',
        description: 'Fill out pension form and submit required documents',
        deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'not-started',
        category: 'pension',
        relatedPath: 'government-processes',
        documents: [
          {name: 'Death Certificate', isSubmitted: false},
          {name: 'Service Record', isSubmitted: false},
          {name: 'NOK Certificate', isSubmitted: false}
        ]
      });
    }
    
    if (profile.generatedPaths?.includes('education-career')) {
      newTasks.push({
        id: `task-${Date.now()}-2`,
        title: 'Apply for Education Scholarship',
        description: 'Complete scholarship application for martyr children',
        deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'not-started',
        category: 'education',
        relatedPath: 'education-career'
      });
    }
    
    if (profile.generatedPaths?.includes('skill-job')) {
      newTasks.push({
        id: `task-${Date.now()}-3`,
        title: 'Register for Skill Training Program',
        description: 'Register for government-sponsored skill development program',
        deadline: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'not-started',
        category: 'skill',
        relatedPath: 'skill-job'
      });
    }
    
    return newTasks;
  };

  // Sample tasks for demonstration
  const getSampleTasks = (): Task[] => [
    {
      id: 'sample-1',
      title: 'Submit Pension Application',
      description: 'Complete and submit the family pension application form with all necessary documents',
      deadline: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'in-progress',
      category: 'pension',
      relatedPath: 'government-processes',
      documents: [
        {name: 'Death Certificate', isSubmitted: true},
        {name: 'Service Record', isSubmitted: false},
        {name: 'NOK Certificate', isSubmitted: false}
      ]
    },
    {
      id: 'sample-2',
      title: 'Upload Educational Certificates',
      description: 'Scan and upload educational certificates for scholarship application',
      deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'not-started',
      category: 'education',
      relatedPath: 'education-career'
    },
    {
      id: 'sample-3',
      title: 'Computer Skills Training',
      description: 'Complete the basic computer skills training program',
      deadline: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'pending',
      category: 'skill',
      relatedPath: 'skill-job'
    }
  ];

  // Function to toggle voice guidance
  const toggleVoiceGuidance = () => {
    setVoiceGuidance(!voiceGuidance);
    
    // Announce when enabled
    if (!voiceGuidance) {
      try {
        const message = "Voice guidance has been enabled. You will now receive spoken instructions.";
        const utterance = new SpeechSynthesisUtterance(message);
        window.speechSynthesis.speak(utterance);
      } catch (error) {
        console.error("Speech synthesis failed:", error);
      }
    }
  };

  // Function to get the next action based on profile state
  const getNextAction = () => {
    if (!profile.isProfileComplete) {
      return {
        text: 'Complete Your Profile',
        action: () => setActiveTab('profile')
      };
    }
    
    if (profile.generatedPaths?.length) {
      const incompleteTasks = tasks.filter(task => task.status !== 'completed');
      if (incompleteTasks.length) {
        return {
          text: 'View Your Tasks',
          action: () => setActiveTab('timeline')
        };
      }
    }
    
    return {
      text: 'View Your Dashboard',
      action: () => setActiveTab('dashboard')
    };
  };

  const nextAction = getNextAction();

  // Functions to navigate between sections
  const goToProfile = () => setActiveTab('profile');
  const goToTimeline = () => setActiveTab('timeline');

  // Handle profile completion
  const handleProfileCompletion = () => {
    setActiveTab('dashboard');
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white pb-10">
      {/* Header */}
      <div className="bg-gradient-to-br from-military/30 to-[#121212] p-6 mb-6">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold flex items-center">
              <LifeBuoy className="mr-2 h-8 w-8 text-military" />
              {t('life_navigator.title', 'Life Navigator')}
            </h1>
            <p className="text-white/70 mt-1">
              {t('life_navigator.description', 'Your personalized roadmap for essential life support')}
            </p>
          </div>
          <Button 
            variant="outline" 
            className="border-military/50 text-military"
            onClick={() => window.history.back()}
          >
            Back to Previous Page
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4">
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="bg-[#1A1A1A]/30 p-1 rounded-lg flex overflow-x-auto">
            <TabsTrigger 
              value="welcome" 
              className="flex-1"
            >
              Welcome
            </TabsTrigger>
            <TabsTrigger 
              value="profile" 
              className="flex-1"
            >
              Profile Setup
            </TabsTrigger>
            {profile.generatedPaths?.includes('government-processes') && (
              <TabsTrigger 
                value="government" 
                className="flex-1"
              >
                Government Processes
              </TabsTrigger>
            )}
            {profile.generatedPaths?.includes('education-career') && (
              <TabsTrigger 
                value="education" 
                className="flex-1"
              >
                Education
              </TabsTrigger>
            )}
            {profile.generatedPaths?.includes('skill-job') && (
              <TabsTrigger 
                value="skills" 
                className="flex-1"
              >
                Skills & Jobs
              </TabsTrigger>
            )}
            <TabsTrigger 
              value="timeline" 
              className="flex-1"
            >
              Timeline
            </TabsTrigger>
            <TabsTrigger 
              value="dashboard" 
              className="flex-1"
            >
              Dashboard
            </TabsTrigger>
          </TabsList>

          {/* Welcome Tab */}
          <TabsContent value="welcome" className="border-none p-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Welcome card */}
              <div className="bg-[#1A1A1A]/30 p-6 rounded-xl border border-[#2D3748] md:col-span-2">
                <h2 className="text-2xl font-semibold mb-3">Welcome to Life Navigator</h2>
                <p className="text-white/70 mb-4">
                  Your personalized roadmap for navigating life after martyrdom. We'll guide you through government processes, 
                  educational opportunities, skill development, and more based on your specific needs.
                </p>
                
                {!profile.isProfileComplete ? (
                  <div>
                    <p className="text-amber-400 font-medium mb-4">Please complete your profile to generate your personalized life roadmap.</p>
                    <div className="flex space-x-3">
                      <Button 
                        className="bg-military hover:bg-military-light text-white"
                        onClick={nextAction.action}
                      >
                        {nextAction.text}
                        <ChevronRight className="h-4 w-4 ml-2" />
                      </Button>
                      <Button 
                        variant="outline" 
                        className="border-military text-military hover:bg-military hover:text-white flex items-center gap-2"
                        onClick={toggleVoiceGuidance}
                      >
                        <Volume className="h-4 w-4" />
                        {voiceGuidance ? 'Voice Guidance: On' : 'Voice Guidance: Off'}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="p-4 bg-green-900/20 border border-green-600/30 rounded-lg mb-4">
                      <div className="flex items-start">
                        <div className="bg-green-900/40 p-2 rounded mr-3">
                          <CheckCircle className="h-5 w-5 text-green-400" />
                        </div>
                        <div>
                          <h3 className="text-green-400 font-medium">Your Life Roadmap is Ready</h3>
                          <p className="text-green-200/70 text-sm">
                            We've created a personalized pathway based on your profile. Access your dashboard to see your complete roadmap.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-3">
                      <Button 
                        className="bg-military hover:bg-military-light text-white"
                        onClick={() => setActiveTab('dashboard')}
                      >
                        Go to Dashboard
                        <ChevronRight className="h-4 w-4 ml-2" />
                      </Button>
                      <Button 
                        variant="outline" 
                        className="border-military text-military hover:bg-military hover:text-white"
                        onClick={() => setActiveTab('timeline')}
                      >
                        View Timeline & Tasks
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {profile.isProfileComplete && (
                <>
                  {/* Life Roadmap Preview */}
                  <div className="bg-[#1A1A1A]/30 p-6 rounded-xl border border-[#2D3748]">
                    <div className="flex space-x-3">
                      <Button 
                        className="bg-military hover:bg-military-light text-white"
                        onClick={nextAction.action}
                      >
                        {nextAction.text}
                        <ChevronRight className="h-4 w-4 ml-2" />
                      </Button>
                      <Button 
                        variant="outline" 
                        className="border-military text-military hover:bg-military hover:text-white flex items-center gap-2"
                        onClick={toggleVoiceGuidance}
                      >
                        <Volume className="h-4 w-4" />
                        {voiceGuidance ? 'Voice Guidance: On' : 'Voice Guidance: Off'}
                      </Button>
                    </div>

                    {/* Progress indicator */}
                    {profile.isProfileComplete && (
                      <div className="mt-6 p-3 bg-green-900/20 border border-green-600/30 rounded-lg">
                        <div className="flex items-start">
                          <div className="bg-green-900/40 p-2 rounded mr-3">
                            <CheckCircle className="h-5 w-5 text-green-400" />
                          </div>
                          <div>
                            <h3 className="text-green-400 font-medium">Profile Complete</h3>
                            <p className="text-green-200/70 text-sm">
                              Your personalized life path has been generated. You can now access all features.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* Quick stats */}
              <div className="bg-[#1A1A1A]/30 p-6 rounded-xl border border-[#2D3748]">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Clock className="mr-2 h-5 w-5 text-military" />
                  Task Overview
                </h2>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-[#1A1A1A]/50 rounded-lg border border-[#2D3748]">
                      <p className="text-xs text-white/70">Pending Tasks</p>
                      <p className="text-2xl font-bold text-amber-400">
                        {tasks.filter(t => t.status !== 'completed').length}
                      </p>
                    </div>
                    <div className="p-3 bg-[#1A1A1A]/50 rounded-lg border border-[#2D3748]">
                      <p className="text-xs text-white/70">Completed</p>
                      <p className="text-2xl font-bold text-green-400">
                        {tasks.filter(t => t.status === 'completed').length}
                      </p>
                    </div>
                  </div>
                  
                  {/* Upcoming task preview */}
                  <div className="mt-3">
                    <p className="text-sm font-medium mb-2">Upcoming Deadline:</p>
                    {tasks.length > 0 ? (
                      <div className="p-3 bg-[#1A1A1A]/50 rounded-lg border border-military/30 hover:bg-[#1A1A1A]/70 transition">
                        <h3 className="font-medium text-sm">
                          {tasks
                            .filter(t => t.status !== 'completed' && t.deadline)
                            .sort((a, b) => 
                              new Date(a.deadline || '').getTime() - new Date(b.deadline || '').getTime()
                            )[0]?.title || 'No upcoming deadlines'}
                        </h3>
                        <Button
                          variant="link"
                          size="sm"
                          className="text-military p-0 h-auto mt-1"
                          onClick={goToTimeline}
                        >
                          View All Tasks
                        </Button>
                      </div>
                    ) : (
                      <div className="p-3 bg-[#1A1A1A]/50 rounded-lg border border-[#2D3748]">
                        <p className="text-white/70 text-sm">No tasks yet</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Quick access */}
              <div className="bg-[#1A1A1A]/30 p-6 rounded-xl border border-[#2D3748]">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Clipboard className="mr-2 h-5 w-5 text-military" />
                  Quick Access
                </h2>
                <div className="space-y-3">
                  <div 
                    className="p-3 bg-[#1A1A1A]/50 rounded-lg border border-[#2D3748] hover:bg-[#1A1A1A]/70 transition cursor-pointer"
                    onClick={goToProfile}
                  >
                    <div className="flex items-center">
                      <UserCircle className="h-5 w-5 text-military mr-2" />
                      <h3 className="font-medium">Profile Setup</h3>
                    </div>
                    <p className="text-white/70 text-sm mt-1">
                      {profile.isProfileComplete 
                        ? 'View or update your profile information' 
                        : 'Complete your profile to get personalized assistance'}
                    </p>
                  </div>
                  
                  {profile.generatedPaths?.map(path => {
                    let icon, title, description, tabValue;
                    
                    switch(path) {
                      case 'government-processes':
                        icon = <Shield className="h-5 w-5 text-military mr-2" />;
                        title = 'Government Processes';
                        description = 'Manage pension applications and government schemes';
                        tabValue = 'government';
                        break;
                      case 'education-career':
                        icon = <GraduationCap className="h-5 w-5 text-military mr-2" />;
                        title = 'Education & Career';
                        description = 'Educational opportunities and career planning';
                        tabValue = 'education';
                        break;
                      case 'skill-job':
                        icon = <FileText className="h-5 w-5 text-military mr-2" />;
                        title = 'Skill & Job';
                        description = 'Skill development and job opportunities';
                        tabValue = 'skills';
                        break;
                      case 'family-dashboard':
                        icon = <Users className="h-5 w-5 text-military mr-2" />;
                        title = 'Family Dashboard';
                        description = 'Overview of your family support status';
                        tabValue = 'dashboard';
                        break;
                      default:
                        return null;
                    }
                    
                    return (
                      <div 
                        key={path}
                        className="p-3 bg-[#1A1A1A]/50 rounded-lg border border-[#2D3748] hover:bg-[#1A1A1A]/70 transition cursor-pointer"
                        onClick={() => setActiveTab(tabValue || 'welcome')}
                      >
                        <div className="flex items-center">
                          {icon}
                          <h3 className="font-medium">{title}</h3>
                        </div>
                        <p className="text-white/70 text-sm mt-1">{description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="border-none p-0">
            <InitialProfileSetup 
              profile={profile} 
              onProfileUpdate={handleProfileUpdate}
              voiceGuidance={voiceGuidance}
              onComplete={handleProfileCompletion}
            />
          </TabsContent>

          {/* Government Processes Tab */}
          <TabsContent value="government" className="border-none p-0">
            <GovernmentProcesses 
              profile={profile}
              tasks={tasks.filter(task => task.relatedPath === 'government-processes')}
              onUpdateTask={handleTaskUpdate}
              voiceGuidance={voiceGuidance}
            />
          </TabsContent>

          {/* Education Tab */}
          <TabsContent value="education" className="border-none p-0">
            <EducationCareerPlanner 
              profile={profile}
              tasks={tasks.filter(task => task.relatedPath === 'education-career')}
              onUpdateTask={handleTaskUpdate}
              voiceGuidance={voiceGuidance}
            />
          </TabsContent>

          {/* Skills & Jobs Tab */}
          <TabsContent value="skills" className="border-none p-0">
            <SkillJobGuidance 
              profile={profile}
              tasks={tasks.filter(task => task.relatedPath === 'skill-job')}
              onUpdateTask={handleTaskUpdate}
              voiceGuidance={voiceGuidance}
            />
          </TabsContent>

          {/* Timeline Tab */}
          <TabsContent value="timeline" className="border-none p-0">
            <Timeline 
              tasks={tasks}
              onUpdateTask={handleTaskUpdate}
              voiceGuidance={voiceGuidance}
            />
          </TabsContent>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="border-none p-0">
            <FamilyDashboard 
              profile={profile}
              tasks={tasks}
              voiceGuidance={voiceGuidance}
            />
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Floating action button for help */}
      <div className="fixed bottom-6 right-6">
        <Button 
          className="rounded-full p-4 h-14 w-14 bg-military hover:bg-military-light"
          variant="default"
        >
          <HelpCircle className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};

export default LifeNavigator; 