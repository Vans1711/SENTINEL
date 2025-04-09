import React from 'react';
import { Button } from '@/components/ui/button';
import { LifeBuoy, HelpCircle, Calendar, Clock, Clipboard, Shield, GraduationCap, FileText, UserCircle, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const LifeNavigator = () => {
  const { t } = useTranslation();

  // Mock data for the page
  const sections = [
    {
      id: 'profile',
      title: 'Profile Setup',
      icon: <UserCircle className="h-5 w-5 text-military" />,
      description: 'Complete your profile to get personalized assistance'
    },
    {
      id: 'government',
      title: 'Government Processes',
      icon: <Shield className="h-5 w-5 text-military" />,
      description: 'Manage pension applications and government schemes'
    },
    {
      id: 'education',
      title: 'Education & Career',
      icon: <GraduationCap className="h-5 w-5 text-military" />,
      description: 'Educational opportunities and career planning'
    },
    {
      id: 'skill',
      title: 'Skill & Job',
      icon: <FileText className="h-5 w-5 text-military" />,
      description: 'Skill development and job opportunities'
    },
    {
      id: 'timeline',
      title: 'Timeline & Tasks',
      icon: <Clipboard className="h-5 w-5 text-military" />,
      description: 'Track your progress and pending tasks'
    },
    {
      id: 'dashboard',
      title: 'Family Dashboard',
      icon: <Users className="h-5 w-5 text-military" />,
      description: 'Overview of your family support status'
    }
  ];

  const recentTasks = [
    {
      title: 'Submit Pension Application',
      deadline: 'May 15, 2025',
      status: 'In Progress'
    },
    {
      title: 'Upload Educational Certificates',
      deadline: 'June 1, 2025',
      status: 'Not Started'
    },
    {
      title: 'Computer Skills Training',
      deadline: 'Apr 25, 2025',
      status: 'Pending'
    }
  ];

  return (
    <div className="min-h-screen bg-[#121212] text-white pb-10">
      {/* Header */}
      <div className="bg-gradient-to-br from-military/30 to-[#121212] p-6 mb-6">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold flex items-center">
            <LifeBuoy className="mr-2 h-8 w-8 text-military" />
            {t('life_navigator.title', 'Life Navigator')}
          </h1>
          <p className="text-white/70 mt-1">
            {t('life_navigator.description', 'Your personalized guide for essential life support')}
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Welcome card */}
          <div className="bg-[#1A1A1A]/30 p-6 rounded-xl border border-[#2D3748] md:col-span-2">
            <h2 className="text-2xl font-semibold mb-3">Welcome to Life Navigator</h2>
            <p className="text-white/80 mb-4">
              This is your personalized guide to access various government schemes, educational opportunities, 
              and support services available to martyr families.
            </p>
            <div className="flex space-x-3">
              <Button className="bg-military hover:bg-military-light text-white">
                Complete Your Profile
              </Button>
              <Button variant="outline" className="border-military text-military hover:bg-military hover:text-white">
                Explore Resources
              </Button>
            </div>
          </div>

          {/* Recent tasks */}
          <div className="bg-[#1A1A1A]/30 p-6 rounded-xl border border-[#2D3748]">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Clock className="mr-2 h-5 w-5 text-military" />
              Recent Tasks
            </h2>
            <div className="space-y-3">
              {recentTasks.map((task, index) => (
                <div key={index} className="p-3 bg-[#1A1A1A]/50 rounded-lg border border-[#2D3748] hover:bg-[#1A1A1A]/70 transition">
                  <h3 className="font-medium">{task.title}</h3>
                  <div className="flex justify-between items-center mt-2 text-sm">
                    <div className="flex items-center text-white/70">
                      <Calendar className="h-4 w-4 mr-1" />
                      {task.deadline}
                    </div>
                    <span className={`px-2 py-1 rounded text-xs ${
                      task.status === 'Completed' ? 'bg-green-900/30 text-green-400' :
                      task.status === 'In Progress' ? 'bg-blue-900/30 text-blue-400' :
                      task.status === 'Pending' ? 'bg-amber-900/30 text-amber-400' :
                      'bg-slate-900/30 text-slate-400'
                    }`}>
                      {task.status}
                    </span>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full mt-2 border-military/50 text-military hover:bg-military/10">
                View All Tasks
              </Button>
            </div>
          </div>

          {/* Quick access */}
          <div className="bg-[#1A1A1A]/30 p-6 rounded-xl border border-[#2D3748]">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Clipboard className="mr-2 h-5 w-5 text-military" />
              Quick Access
            </h2>
            <div className="space-y-3">
              {sections.map(section => (
                <div key={section.id} className="p-3 bg-[#1A1A1A]/50 rounded-lg border border-[#2D3748] hover:bg-[#1A1A1A]/70 transition cursor-pointer">
                  <div className="flex items-center">
                    {section.icon}
                    <h3 className="font-medium ml-2">{section.title}</h3>
                  </div>
                  <p className="text-white/70 text-sm mt-1">{section.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Features section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-6">Services Available</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: "Pension Assistance",
                description: "Guidance on pension application and documentation",
                icon: <Shield className="h-10 w-10 text-military" />
              },
              {
                title: "Educational Support",
                description: "Scholarship programs and educational resources",
                icon: <GraduationCap className="h-10 w-10 text-military" />
              },
              {
                title: "Skill Development",
                description: "Training programs and skill enhancement opportunities",
                icon: <FileText className="h-10 w-10 text-military" />
              }
            ].map((feature, index) => (
              <div key={index} className="p-6 bg-[#1A1A1A]/30 rounded-xl border border-[#2D3748] flex flex-col items-center text-center">
                <div className="p-3 bg-military/10 rounded-full mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
                <p className="text-white/70">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
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