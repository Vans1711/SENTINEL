import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserProfile, Task } from './index';
import { Shield, AlertTriangle, Calendar, CheckCircle2, Clipboard, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface GovernmentProcessesProps {
  profile: UserProfile;
  tasks: Task[];
  onAddTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onUpdateTask: (taskId: string, updates: Partial<Task>) => void;
  voiceGuidance: boolean;
}

const GovernmentProcesses: React.FC<GovernmentProcessesProps> = ({
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
        const message = t('life_navigator.government.voice_guidance', 'This is the government processes section. Here you can find information about pension, documentation, and other government-related processes.');
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

  const handleAddTask = (category: 'pension' | 'document') => {
    const newTask = {
      title: category === 'pension' ? 'New Pension Application' : 'New Document Submission',
      description: category === 'pension' 
        ? 'Complete and submit pension application form' 
        : 'Submit required documentation',
      status: 'not-started' as const,
      category,
      deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      documents: []
    };
    
    onAddTask(newTask);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold flex items-center">
          <Shield className="mr-2 h-6 w-6 text-military" />
          {t('life_navigator.government.title', 'Government Processes')}
        </h2>
      </div>

      {/* Information Card */}
      <Card className="bg-amber-900/20 border-amber-800/30">
        <CardContent className="p-4 flex items-start">
          <AlertTriangle className="text-amber-400 mr-3 mt-0.5 h-5 w-5 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-amber-300 mb-1">
              {t('life_navigator.government.important_note', 'Important Information')}
            </h3>
            <p className="text-amber-200/90 text-sm">
              {t('life_navigator.government.note_content', 'Completing government processes requires original documents and may take time. Make sure to track deadlines carefully and keep copies of all submissions.')}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Pension Process */}
      <Card className="bg-[#1A1A1A]/30 border-[#2D3748]">
        <CardHeader>
          <CardTitle className="text-xl flex items-center">
            <Shield className="mr-2 h-5 w-5 text-military" />
            {t('life_navigator.government.pension_title', 'Pension Process')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-white/70">
            {t('life_navigator.government.pension_desc', 'Martyr family members are eligible for various pension schemes. Track the application process here.')}
          </p>

          <div className="space-y-3 mt-4">
            <h3 className="text-lg font-medium">
              {t('life_navigator.government.active_pension_tasks', 'Active Pension Tasks')}
            </h3>
            
            {tasks.filter(task => task.category === 'pension').length > 0 ? (
              <div className="space-y-3">
                {tasks
                  .filter(task => task.category === 'pension')
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
                <Clipboard className="h-10 w-10 mx-auto mb-2 text-white/30" />
                <p>{t('life_navigator.government.no_pension_tasks', 'No pension tasks created yet')}</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-3 border-military text-military hover:bg-military/10"
                  onClick={() => handleAddTask('pension')}
                >
                  {t('life_navigator.government.add_pension_task', 'Add Pension Task')}
                </Button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <Card className="bg-[#1A1A1A]/50 border-[#2D3748]">
              <CardContent className="p-4">
                <h3 className="text-sm font-medium mb-2">
                  {t('life_navigator.government.family_pension', 'Family Pension')}
                </h3>
                <p className="text-xs text-white/70 mb-3">
                  {t('life_navigator.government.family_pension_desc', 'Available to spouse, dependent children, and parents of martyrs.')}
                </p>
                <Button variant="outline" size="sm" className="w-full border-military text-military hover:bg-military/10">
                  {t('life_navigator.government.view_details', 'View Details')}
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-[#1A1A1A]/50 border-[#2D3748]">
              <CardContent className="p-4">
                <h3 className="text-sm font-medium mb-2">
                  {t('life_navigator.government.special_pension', 'Special Family Pension')}
                </h3>
                <p className="text-xs text-white/70 mb-3">
                  {t('life_navigator.government.special_pension_desc', 'Enhanced pension rates for battle casualties and special operations.')}
                </p>
                <Button variant="outline" size="sm" className="w-full border-military text-military hover:bg-military/10">
                  {t('life_navigator.government.view_details', 'View Details')}
                </Button>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Documents Process */}
      <Card className="bg-[#1A1A1A]/30 border-[#2D3748]">
        <CardHeader>
          <CardTitle className="text-xl flex items-center">
            <Clipboard className="mr-2 h-5 w-5 text-military" />
            {t('life_navigator.government.document_title', 'Essential Documentation')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-white/70">
            {t('life_navigator.government.document_desc', 'Track the submission and processing of essential documentation required for various benefits.')}
          </p>

          <div className="space-y-3 mt-4">
            <h3 className="text-lg font-medium">
              {t('life_navigator.government.active_document_tasks', 'Active Document Tasks')}
            </h3>
            
            {tasks.filter(task => task.category === 'document').length > 0 ? (
              <div className="space-y-3">
                {tasks
                  .filter(task => task.category === 'document')
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
                <Clipboard className="h-10 w-10 mx-auto mb-2 text-white/30" />
                <p>{t('life_navigator.government.no_document_tasks', 'No document tasks created yet')}</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-3 border-military text-military hover:bg-military/10"
                  onClick={() => handleAddTask('document')}
                >
                  {t('life_navigator.government.add_document_task', 'Add Document Task')}
                </Button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <Card className="bg-[#1A1A1A]/50 border-[#2D3748]">
              <CardContent className="p-4">
                <h3 className="text-sm font-medium mb-2">
                  {t('life_navigator.government.death_certificate', 'Death Certificate')}
                </h3>
                <p className="text-xs text-white/70">
                  {t('life_navigator.government.death_certificate_desc', 'Essential for all benefits and claims.')}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-[#1A1A1A]/50 border-[#2D3748]">
              <CardContent className="p-4">
                <h3 className="text-sm font-medium mb-2">
                  {t('life_navigator.government.service_records', 'Service Records')}
                </h3>
                <p className="text-xs text-white/70">
                  {t('life_navigator.government.service_records_desc', 'Proof of service and circumstances.')}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-[#1A1A1A]/50 border-[#2D3748]">
              <CardContent className="p-4">
                <h3 className="text-sm font-medium mb-2">
                  {t('life_navigator.government.relationship_proof', 'Relationship Proof')}
                </h3>
                <p className="text-xs text-white/70">
                  {t('life_navigator.government.relationship_proof_desc', 'Marriage certificate or birth certificate.')}
                </p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Assistance Contact */}
      <Card className="bg-blue-950/30 border-blue-900 mt-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-blue-300 flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            {t('life_navigator.government.need_help', 'Need Assistance?')}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-blue-200/80 text-sm">
          <p className="mb-4">
            {t('life_navigator.government.help_content', 'Our specialized team can help you navigate complex government processes and documentation requirements.')}
          </p>
          <Button className="bg-military hover:bg-military/80 text-white">
            {t('life_navigator.government.connect_assistant', 'Connect with Support Team')}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default GovernmentProcesses; 