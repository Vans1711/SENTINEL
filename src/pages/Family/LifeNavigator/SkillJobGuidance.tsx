import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserProfile, Task } from './index';
import { FileText, Briefcase, Hammer, Book, Calendar, CheckCircle2, AlertTriangle, Clipboard, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface SkillJobGuidanceProps {
  profile: UserProfile;
  tasks: Task[];
  onAddTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onUpdateTask: (taskId: string, updates: Partial<Task>) => void;
  voiceGuidance: boolean;
}

const SkillJobGuidance: React.FC<SkillJobGuidanceProps> = ({
  profile,
  tasks,
  onAddTask,
  onUpdateTask,
  voiceGuidance
}) => {
  const { t } = useTranslation();

  // Voice guidance effect
  useEffect(() => {
    if (voiceGuidance) {
      try {
        const message = t('life_navigator.skill_job.voice_guidance', 'This is the skill development and job guidance section. Here you can find employment opportunities and skill training programs.');
        const utterance = new SpeechSynthesisUtterance(message);
        window.speechSynthesis.speak(utterance);
      } catch (error) {
        console.error("Speech synthesis failed:", error);
      }
    }
  }, [voiceGuidance, t]);

  // Get status badge for a task
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'completed':
        return <Badge className="bg-green-600"><CheckCircle2 className="h-3 w-3 mr-1" /> Completed</Badge>;
      case 'in-progress':
        return <Badge className="bg-blue-600"><Calendar className="h-3 w-3 mr-1" /> In Progress</Badge>;
      case 'pending':
        return <Badge className="bg-amber-600"><AlertTriangle className="h-3 w-3 mr-1" /> Pending</Badge>;
      case 'not-started':
      default:
        return <Badge className="bg-slate-600"><Clipboard className="h-3 w-3 mr-1" /> Not Started</Badge>;
    }
  };

  const handleAddTask = (category: 'skill' | 'job') => {
    const newTask = {
      title: category === 'skill' ? 'New Skill Training' : 'Job Application',
      description: category === 'skill' 
        ? 'Complete a skill development course or training program' 
        : 'Apply for employment opportunity',
      status: 'not-started' as const,
      category,
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      documents: [{ name: 'ID Proof', isUploaded: false }]
    };
    
    onAddTask(newTask);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold flex items-center">
          <FileText className="mr-2 h-6 w-6 text-military" />
          {t('life_navigator.skill_job.title', 'Skill Development & Employment')}
        </h2>
      </div>

      {/* Information Card */}
      <Card className="bg-purple-900/20 border-purple-800/30">
        <CardContent className="p-4 flex items-start">
          <Hammer className="text-purple-400 mr-3 mt-0.5 h-5 w-5 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-purple-300 mb-1">
              {t('life_navigator.skill_job.important_note', 'Special Programs Available')}
            </h3>
            <p className="text-purple-200/90 text-sm">
              {t('life_navigator.skill_job.note_content', 'As a family member of a martyr, you have access to special skill development programs and reserved employment opportunities in government and private sectors.')}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Skill Development */}
      <Card className="bg-[#1A1A1A]/30 border-[#2D3748]">
        <CardHeader>
          <CardTitle className="text-xl flex items-center">
            <Hammer className="mr-2 h-5 w-5 text-military" />
            {t('life_navigator.skill_job.skill_title', 'Skill Development')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-white/70">
            {t('life_navigator.skill_job.skill_desc', 'Develop marketable skills through government-sponsored training programs.')}
          </p>

          <div className="space-y-3 mt-4">
            <h3 className="text-lg font-medium">
              {t('life_navigator.skill_job.active_skill_tasks', 'Active Skill Development Tasks')}
            </h3>
            
            {tasks.filter(task => task.category === 'skill').length > 0 ? (
              <div className="space-y-3">
                {tasks
                  .filter(task => task.category === 'skill')
                  .map(task => (
                    <div key={task.id} className="p-3 rounded-md bg-[#1A1A1A]/50 flex justify-between items-center">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{task.title}</p>
                          {getStatusBadge(task.status)}
                        </div>
                        <p className="text-sm text-white/60 mt-1">{task.description}</p>
                        {task.deadline && (
                          <div className="flex items-center text-xs text-white/50 mt-1">
                            <Calendar className="h-3 w-3 mr-1" />
                            <span>Deadline: {new Date(task.deadline).toLocaleDateString()}</span>
                          </div>
                        )}
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0 text-white/70 hover:text-white"
                        onClick={() => {}}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="text-center py-6 text-white/60 bg-[#1A1A1A]/20 rounded-md">
                <Hammer className="h-10 w-10 mx-auto mb-2 text-white/30" />
                <p>{t('life_navigator.skill_job.no_skill_tasks', 'No skill development tasks created yet')}</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-3 border-military text-military hover:bg-military/10"
                  onClick={() => handleAddTask('skill')}
                >
                  {t('life_navigator.skill_job.add_skill_task', 'Add Skill Development Task')}
                </Button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <Card className="bg-[#1A1A1A]/50 border-[#2D3748]">
              <CardContent className="p-4">
                <h3 className="text-sm font-medium mb-2">
                  {t('life_navigator.skill_job.digital_skills', 'Digital Skills Training')}
                </h3>
                <p className="text-xs text-white/70 mb-3">
                  {t('life_navigator.skill_job.digital_skills_desc', 'Computer literacy, office software, and digital marketing courses.')}
                </p>
                <div className="flex items-center justify-between">
                  <Badge className="bg-green-600/50">
                    {t('life_navigator.skill_job.free', 'Free')}
                  </Badge>
                  <Button variant="outline" size="sm" className="border-military text-military hover:bg-military/10">
                    {t('life_navigator.skill_job.view_details', 'View Details')}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#1A1A1A]/50 border-[#2D3748]">
              <CardContent className="p-4">
                <h3 className="text-sm font-medium mb-2">
                  {t('life_navigator.skill_job.vocational_training', 'Vocational Training')}
                </h3>
                <p className="text-xs text-white/70 mb-3">
                  {t('life_navigator.skill_job.vocational_training_desc', 'Hands-on skills in various trades with certification.')}
                </p>
                <div className="flex items-center justify-between">
                  <Badge className="bg-green-600/50">
                    {t('life_navigator.skill_job.free', 'Free')}
                  </Badge>
                  <Button variant="outline" size="sm" className="border-military text-military hover:bg-military/10">
                    {t('life_navigator.skill_job.view_details', 'View Details')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Employment Opportunities */}
      <Card className="bg-[#1A1A1A]/30 border-[#2D3748]">
        <CardHeader>
          <CardTitle className="text-xl flex items-center">
            <Briefcase className="mr-2 h-5 w-5 text-military" />
            {t('life_navigator.skill_job.job_title', 'Employment Opportunities')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-white/70">
            {t('life_navigator.skill_job.job_desc', 'Find reserved employment opportunities and job assistance programs.')}
          </p>

          <div className="space-y-3 mt-4">
            <h3 className="text-lg font-medium">
              {t('life_navigator.skill_job.active_job_tasks', 'Active Employment Tasks')}
            </h3>
            
            {tasks.filter(task => task.category === 'job').length > 0 ? (
              <div className="space-y-3">
                {tasks
                  .filter(task => task.category === 'job')
                  .map(task => (
                    <div key={task.id} className="p-3 rounded-md bg-[#1A1A1A]/50 flex justify-between items-center">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{task.title}</p>
                          {getStatusBadge(task.status)}
                        </div>
                        <p className="text-sm text-white/60 mt-1">{task.description}</p>
                        {task.deadline && (
                          <div className="flex items-center text-xs text-white/50 mt-1">
                            <Calendar className="h-3 w-3 mr-1" />
                            <span>Deadline: {new Date(task.deadline).toLocaleDateString()}</span>
                          </div>
                        )}
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0 text-white/70 hover:text-white"
                        onClick={() => {}}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="text-center py-6 text-white/60 bg-[#1A1A1A]/20 rounded-md">
                <Briefcase className="h-10 w-10 mx-auto mb-2 text-white/30" />
                <p>{t('life_navigator.skill_job.no_job_tasks', 'No employment tasks created yet')}</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-3 border-military text-military hover:bg-military/10"
                  onClick={() => handleAddTask('job')}
                >
                  {t('life_navigator.skill_job.add_job_task', 'Add Employment Task')}
                </Button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <Card className="bg-[#1A1A1A]/50 border-[#2D3748]">
              <CardContent className="p-4">
                <h3 className="text-sm font-medium mb-2">
                  {t('life_navigator.skill_job.government_quota', 'Government Job Reservation')}
                </h3>
                <p className="text-xs text-white/70 mb-3">
                  {t('life_navigator.skill_job.government_quota_desc', 'Special quota for martyrs\' family members in government jobs.')}
                </p>
                <Button variant="outline" size="sm" className="w-full border-military text-military hover:bg-military/10">
                  {t('life_navigator.skill_job.explore_opportunities', 'Explore Opportunities')}
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-[#1A1A1A]/50 border-[#2D3748]">
              <CardContent className="p-4">
                <h3 className="text-sm font-medium mb-2">
                  {t('life_navigator.skill_job.corporate_partners', 'Corporate Partners')}
                </h3>
                <p className="text-xs text-white/70 mb-3">
                  {t('life_navigator.skill_job.corporate_partners_desc', 'Private companies with special hiring programs for martyrs\' families.')}
                </p>
                <Button variant="outline" size="sm" className="w-full border-military text-military hover:bg-military/10">
                  {t('life_navigator.skill_job.view_partners', 'View Partner Companies')}
                </Button>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Resume Building Help */}
      <Card className="bg-orange-950/30 border-orange-900/30 mt-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-orange-300 flex items-center">
            <Book className="h-5 w-5 mr-2" />
            {t('life_navigator.skill_job.resume_help', 'Resume & Interview Help')}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-orange-200/80 text-sm">
          <p className="mb-4">
            {t('life_navigator.skill_job.resume_help_desc', 'Get professional help with resume building, interview preparation, and job application processes.')}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="border-orange-500/50 text-orange-300 hover:bg-orange-900/30">
              {t('life_navigator.skill_job.resume_builder', 'Resume Builder Tool')}
            </Button>
            <Button variant="outline" className="border-orange-500/50 text-orange-300 hover:bg-orange-900/30">
              {t('life_navigator.skill_job.mock_interview', 'Book Mock Interview')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SkillJobGuidance; 