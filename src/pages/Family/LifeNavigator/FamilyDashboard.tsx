import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserProfile, Task } from './index';
import { Users, Calendar, CheckCircle2, Clipboard } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

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

  // Voice guidance effect
  useEffect(() => {
    if (voiceGuidance) {
      try {
        const message = t('life_navigator.dashboard.voice_guidance', 'This is your family dashboard. Here you can see an overview of your family profile and task progress.');
        const utterance = new SpeechSynthesisUtterance(message);
        window.speechSynthesis.speak(utterance);
      } catch (error) {
        console.error("Speech synthesis failed:", error);
      }
    }
  }, [voiceGuidance, t]);

  // Calculate task statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Group tasks by category
  const tasksByCategory = tasks.reduce((acc, task) => {
    if (!acc[task.category]) {
      acc[task.category] = [];
    }
    acc[task.category].push(task);
    return acc;
  }, {} as Record<string, Task[]>);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold flex items-center">
          <Users className="mr-2 h-6 w-6 text-military" />
          {t('life_navigator.dashboard.title', 'Family Dashboard')}
        </h2>
      </div>

      {/* Family Profile Card */}
      <Card className="bg-[#1A1A1A]/30 border-[#2D3748]">
        <CardHeader>
          <CardTitle className="text-xl flex items-center">
            <Users className="mr-2 h-5 w-5 text-military" />
            {t('life_navigator.dashboard.family_profile', 'Family Profile')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-white/70 text-sm mb-1">
                {t('life_navigator.dashboard.member_name', 'Member Name')}
              </h3>
              <p className="text-white font-medium">{profile.name || 'Not specified'}</p>
            </div>
            <div>
              <h3 className="text-white/70 text-sm mb-1">
                {t('life_navigator.dashboard.relationship', 'Relationship')}
              </h3>
              <p className="text-white font-medium capitalize">{profile.relationship || 'Not specified'}</p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-[#2D3748]">
            <h3 className="text-white/70 text-sm mb-2">
              {t('life_navigator.dashboard.martyr_details', 'Martyr Details')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-white/70 text-sm mb-1">
                  {t('life_navigator.dashboard.martyr_name', 'Name')}
                </h3>
                <p className="text-white font-medium">{profile.martyr?.name || 'Not specified'}</p>
              </div>
              <div>
                <h3 className="text-white/70 text-sm mb-1">
                  {t('life_navigator.dashboard.martyr_rank', 'Rank')}
                </h3>
                <p className="text-white font-medium">{profile.martyr?.rank || 'Not specified'}</p>
              </div>
              <div>
                <h3 className="text-white/70 text-sm mb-1">
                  {t('life_navigator.dashboard.force', 'Force')}
                </h3>
                <p className="text-white font-medium">{profile.martyr?.force || 'Not specified'}</p>
              </div>
              <div>
                <h3 className="text-white/70 text-sm mb-1">
                  {t('life_navigator.dashboard.date_of_martyrdom', 'Date of Martyrdom')}
                </h3>
                <p className="text-white font-medium">{profile.martyr?.dateOfMartyrdom || 'Not specified'}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Task Progress Overview */}
      <Card className="bg-[#1A1A1A]/30 border-[#2D3748]">
        <CardHeader>
          <CardTitle className="text-xl flex items-center">
            <Clipboard className="mr-2 h-5 w-5 text-military" />
            {t('life_navigator.dashboard.task_progress', 'Task Progress')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex-1 w-full">
              <div className="flex justify-between mb-1">
                <span className="text-sm text-white/70">
                  {t('life_navigator.dashboard.overall_progress', 'Overall Progress')}
                </span>
                <span className="text-sm text-white font-medium">{completionPercentage}%</span>
              </div>
              <Progress value={completionPercentage} className="h-2 bg-[#1A1A1A]/50" />
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              <Badge variant="outline" className="border-white/20 text-white bg-[#1A1A1A]/50">
                {t('life_navigator.dashboard.total_tasks', 'Total')}: {totalTasks}
              </Badge>
              <Badge variant="outline" className="border-green-600/40 text-green-400 bg-green-900/10">
                {t('life_navigator.dashboard.completed', 'Completed')}: {completedTasks}
              </Badge>
              <Badge variant="outline" className="border-blue-600/40 text-blue-400 bg-blue-900/10">
                {t('life_navigator.dashboard.pending', 'Pending')}: {tasks.filter(t => t.status !== 'completed').length}
              </Badge>
            </div>
          </div>

          {/* Tasks by Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
            {Object.entries(tasksByCategory).map(([category, categoryTasks]) => {
              const categoryCompletedTasks = categoryTasks.filter(task => task.status === 'completed').length;
              const categoryCompletionPercentage = Math.round((categoryCompletedTasks / categoryTasks.length) * 100);
              
              return (
                <Card key={category} className="bg-[#1A1A1A]/50 border-[#2D3748]">
                  <CardContent className="p-4">
                    <h3 className="text-sm font-medium mb-2 capitalize">{category} Tasks</h3>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-white/70">{categoryCompletedTasks}/{categoryTasks.length}</span>
                      <span className="text-xs text-white/70">{categoryCompletionPercentage}%</span>
                    </div>
                    <Progress value={categoryCompletionPercentage} className="h-1.5 bg-[#1A1A1A]/50" />
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="bg-[#1A1A1A]/30 border-[#2D3748]">
        <CardHeader>
          <CardTitle className="text-xl flex items-center">
            <Calendar className="mr-2 h-5 w-5 text-military" />
            {t('life_navigator.dashboard.recent_activity', 'Recent Activity')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {tasks.length > 0 ? (
            <div className="space-y-4">
              {tasks
                .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
                .slice(0, 5)
                .map(task => (
                  <div key={task.id} className="flex items-start gap-3 pb-3 border-b border-[#2D3748] last:border-0">
                    <div className={`p-2 rounded-full 
                      ${task.status === 'completed' ? 'bg-green-900/20' : 
                        task.status === 'in-progress' ? 'bg-blue-900/20' : 
                        task.status === 'pending' ? 'bg-amber-900/20' : 'bg-slate-900/20'}`}>
                      {task.status === 'completed' ? (
                        <CheckCircle2 className="h-4 w-4 text-green-400" />
                      ) : (
                        <Clipboard className="h-4 w-4 text-white/50" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className="text-sm font-medium">{task.title}</h4>
                        <span className="text-xs text-white/50">
                          {new Date(task.updatedAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-xs text-white/70 mt-1">{task.description.substring(0, 60)}...</p>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="text-center py-6">
              <Calendar className="h-10 w-10 mx-auto text-white/30 mb-3" />
              <h3 className="text-lg font-medium text-white/80">
                {t('life_navigator.dashboard.no_activity', 'No recent activity')}
              </h3>
              <p className="text-white/60 mt-1">
                {t('life_navigator.dashboard.activity_description', 'Your recent task updates will appear here')}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FamilyDashboard; 