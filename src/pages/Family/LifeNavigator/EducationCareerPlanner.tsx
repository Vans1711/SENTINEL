import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserProfile, Task } from './index';
import { GraduationCap, BookOpen, Award, Calendar, CheckCircle2, AlertTriangle, Clipboard, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface EducationCareerPlannerProps {
  profile: UserProfile;
  tasks: Task[];
  onAddTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onUpdateTask: (taskId: string, updates: Partial<Task>) => void;
  voiceGuidance: boolean;
}

const EducationCareerPlanner: React.FC<EducationCareerPlannerProps> = ({
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
        const message = t('life_navigator.education.voice_guidance', 'This is the education and career planning section. Here you can find scholarship information and educational opportunities.');
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

  const handleAddTask = () => {
    const newTask = {
      title: 'New Scholarship Application',
      description: 'Complete and submit scholarship application form',
      status: 'not-started' as const,
      category: 'education' as const,
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      documents: [
        { name: 'Educational Certificates', isUploaded: false },
        { name: 'Income Certificate', isUploaded: false }
      ]
    };
    
    onAddTask(newTask);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold flex items-center">
          <GraduationCap className="mr-2 h-6 w-6 text-military" />
          {t('life_navigator.education.title', 'Education & Career Planning')}
        </h2>
      </div>

      {/* Information Card */}
      <Card className="bg-blue-900/20 border-blue-800/30">
        <CardContent className="p-4 flex items-start">
          <BookOpen className="text-blue-400 mr-3 mt-0.5 h-5 w-5 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-blue-300 mb-1">
              {t('life_navigator.education.important_note', 'Education Benefits')}
            </h3>
            <p className="text-blue-200/90 text-sm">
              {t('life_navigator.education.note_content', 'As a family member of a martyr, you are eligible for various educational scholarships and benefits provided by the government and private institutions.')}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Scholarship Process */}
      <Card className="bg-[#1A1A1A]/30 border-[#2D3748]">
        <CardHeader>
          <CardTitle className="text-xl flex items-center">
            <Award className="mr-2 h-5 w-5 text-military" />
            {t('life_navigator.education.scholarship_title', 'Scholarship Opportunities')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-white/70">
            {t('life_navigator.education.scholarship_desc', 'Track scholarship applications and explore available educational opportunities.')}
          </p>

          <div className="space-y-3 mt-4">
            <h3 className="text-lg font-medium">
              {t('life_navigator.education.active_tasks', 'Active Education Tasks')}
            </h3>
            
            {tasks.length > 0 ? (
              <div className="space-y-3">
                {tasks.map(task => (
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
                <GraduationCap className="h-10 w-10 mx-auto mb-2 text-white/30" />
                <p>{t('life_navigator.education.no_tasks', 'No education tasks created yet')}</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-3 border-military text-military hover:bg-military/10"
                  onClick={handleAddTask}
                >
                  {t('life_navigator.education.add_task', 'Add Education Task')}
                </Button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <Card className="bg-[#1A1A1A]/50 border-[#2D3748]">
              <CardContent className="p-4">
                <h3 className="text-sm font-medium mb-2">
                  {t('life_navigator.education.pm_scholarship', 'Prime Minister\'s Scholarship')}
                </h3>
                <p className="text-xs text-white/70 mb-3">
                  {t('life_navigator.education.pm_scholarship_desc', 'Scholarships for children of ex-servicemen and martyred personnel.')}
                </p>
                <div className="flex items-center justify-between">
                  <Badge className="bg-green-600/50">
                    {t('life_navigator.education.annual', 'Annual')}
                  </Badge>
                  <Button variant="outline" size="sm" className="border-military text-military hover:bg-military/10">
                    {t('life_navigator.education.view_details', 'View Details')}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#1A1A1A]/50 border-[#2D3748]">
              <CardContent className="p-4">
                <h3 className="text-sm font-medium mb-2">
                  {t('life_navigator.education.kendriya_vidyalaya', 'Kendriya Vidyalaya Priority')}
                </h3>
                <p className="text-xs text-white/70 mb-3">
                  {t('life_navigator.education.kendriya_vidyalaya_desc', 'Priority admission and fee waiver for martyrs\' children.')}
                </p>
                <div className="flex items-center justify-between">
                  <Badge className="bg-blue-600/50">
                    {t('life_navigator.education.ongoing', 'Ongoing')}
                  </Badge>
                  <Button variant="outline" size="sm" className="border-military text-military hover:bg-military/10">
                    {t('life_navigator.education.view_details', 'View Details')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Education Guidance */}
      <Card className="bg-[#1A1A1A]/30 border-[#2D3748]">
        <CardHeader>
          <CardTitle className="text-xl flex items-center">
            <GraduationCap className="mr-2 h-5 w-5 text-military" />
            {t('life_navigator.education.guidance_title', 'Career Guidance')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-white/70">
            {t('life_navigator.education.guidance_desc', 'Access personalized career counseling and education planning resources.')}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <Card className="bg-[#1A1A1A]/50 border-[#2D3748]">
              <CardContent className="p-4">
                <h3 className="text-sm font-medium mb-2">
                  {t('life_navigator.education.counseling', 'Career Counseling')}
                </h3>
                <p className="text-xs text-white/70 mb-3">
                  {t('life_navigator.education.counseling_desc', 'One-on-one career advice and planning sessions.')}
                </p>
                <Button variant="outline" size="sm" className="w-full border-military text-military hover:bg-military/10">
                  {t('life_navigator.education.book_session', 'Book Session')}
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-[#1A1A1A]/50 border-[#2D3748]">
              <CardContent className="p-4">
                <h3 className="text-sm font-medium mb-2">
                  {t('life_navigator.education.skill_assessment', 'Skill Assessment')}
                </h3>
                <p className="text-xs text-white/70 mb-3">
                  {t('life_navigator.education.skill_assessment_desc', 'Identify strengths and suitable career paths.')}
                </p>
                <Button variant="outline" size="sm" className="w-full border-military text-military hover:bg-military/10">
                  {t('life_navigator.education.take_assessment', 'Take Assessment')}
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-[#1A1A1A]/50 border-[#2D3748]">
              <CardContent className="p-4">
                <h3 className="text-sm font-medium mb-2">
                  {t('life_navigator.education.mentorship', 'Mentorship Program')}
                </h3>
                <p className="text-xs text-white/70 mb-3">
                  {t('life_navigator.education.mentorship_desc', 'Connect with professionals for guidance and support.')}
                </p>
                <Button variant="outline" size="sm" className="w-full border-military text-military hover:bg-military/10">
                  {t('life_navigator.education.find_mentor', 'Find Mentor')}
                </Button>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Educational Resources */}
      <Card className="bg-green-950/30 border-green-900/30 mt-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-green-300 flex items-center">
            <BookOpen className="h-5 w-5 mr-2" />
            {t('life_navigator.education.resources', 'Educational Resources')}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-green-200/80 text-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center p-2 rounded bg-green-900/20">
              <BookOpen className="h-5 w-5 mr-2 text-green-400" />
              <span>{t('life_navigator.education.online_courses', 'Free Online Courses')}</span>
            </div>
            <div className="flex items-center p-2 rounded bg-green-900/20">
              <GraduationCap className="h-5 w-5 mr-2 text-green-400" />
              <span>{t('life_navigator.education.university_partners', 'University Partners')}</span>
            </div>
            <div className="flex items-center p-2 rounded bg-green-900/20">
              <Award className="h-5 w-5 mr-2 text-green-400" />
              <span>{t('life_navigator.education.skill_certifications', 'Skill Certifications')}</span>
            </div>
            <div className="flex items-center p-2 rounded bg-green-900/20">
              <Calendar className="h-5 w-5 mr-2 text-green-400" />
              <span>{t('life_navigator.education.scholarship_calendar', 'Scholarship Calendar')}</span>
            </div>
          </div>
          <Button className="bg-military hover:bg-military/80 text-white mt-4 w-full">
            {t('life_navigator.education.explore_resources', 'Explore All Resources')}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default EducationCareerPlanner; 