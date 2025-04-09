import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  AlertTriangle, 
  Calendar, 
  CheckCircle2, 
  Clipboard, 
  Clock, 
  Filter,
  Info
} from 'lucide-react';
import { Task } from './index';
import { useTranslation } from 'react-i18next';
import { format, parseISO, isBefore, addDays } from 'date-fns';

interface TimelineProps {
  tasks: Task[];
  onUpdateTask: (taskId: string, updates: Partial<Task>) => void;
  voiceGuidance: boolean;
}

const Timeline: React.FC<TimelineProps> = ({
  tasks,
  onUpdateTask,
  voiceGuidance
}) => {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState('all');
  
  // Get status badge for a task
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'completed':
        return (
          <Badge className="bg-green-600">
            <CheckCircle2 className="h-4 w-4 mr-2" />
            Completed
          </Badge>
        );
      case 'in-progress':
        return (
          <Badge className="bg-blue-600">
            <Calendar className="h-4 w-4 mr-2" />
            In Progress
          </Badge>
        );
      case 'pending':
        return (
          <Badge className="bg-amber-600">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Pending
          </Badge>
        );
      default:
        return (
          <Badge className="bg-slate-600">
            <Clock className="h-4 w-4 mr-2" />
            Not Started
          </Badge>
        );
    }
  };

  // Get deadline as string
  const getDeadlineString = (deadline?: string) => {
    if (!deadline) return 'No deadline';
    
    try {
      const date = parseISO(deadline);
      const today = new Date();
      
      if (isBefore(date, today)) {
        return `${format(date, 'PPP')} (Overdue)`;
      }
      
      return format(date, 'PPP');
    } catch (error) {
      console.error("Error formatting date:", error);
      return 'Invalid date';
    }
  };
  
  // Group tasks by deadline proximity
  const getGroupedTasks = () => {
    const today = new Date();
    const grouped = {
      overdue: [] as Task[],
      upcoming: [] as Task[],
      future: [] as Task[],
      noDeadline: [] as Task[]
    };
    
    tasks.forEach(task => {
      if (!task.deadline) {
        grouped.noDeadline.push(task);
      } else {
        try {
          const deadline = parseISO(task.deadline);
          if (isBefore(deadline, today)) {
            grouped.overdue.push(task);
          } else if (isBefore(deadline, addDays(today, 7))) {
            grouped.upcoming.push(task);
          } else {
            grouped.future.push(task);
          }
        } catch (error) {
          console.error("Error grouping task:", error);
          grouped.noDeadline.push(task);
        }
      }
    });
    
    return grouped;
  };
  
  const groupedTasks = getGroupedTasks();
  const filteredTasks = activeFilter === 'all' 
    ? tasks 
    : tasks.filter(task => task.category === activeFilter);
  
  // Render a single task card
  const renderTaskCard = (task: Task) => (
    <Card key={task.id} className="bg-[#1A1A1A]/40 border-[#2D3748] mb-3">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-base font-medium">{task.title}</CardTitle>
          {getStatusBadge(task.status)}
        </div>
        <p className="text-white/70 text-sm mt-1">{task.description}</p>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex justify-between text-sm text-white/70">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            {getDeadlineString(task.deadline)}
          </div>
          <div className="flex">
            <Button 
              size="sm" 
              variant="outline" 
              className="h-7 text-xs border-military text-military hover:bg-military/20"
              onClick={() => {
                const newStatus = task.status === 'completed' 
                  ? 'not-started' 
                  : task.status === 'not-started'
                  ? 'in-progress'
                  : task.status === 'in-progress'
                  ? 'pending'
                  : 'completed';
                
                onUpdateTask(task.id, { status: newStatus as Task['status'] });
              }}
            >
              Update Status
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold flex items-center">
          <Clipboard className="mr-2 h-6 w-6 text-military" />
          {t('life_navigator.timeline.title', 'Timeline & Tasks')}
        </h2>
      </div>
      
      <div className="bg-[#1A1A1A]/30 rounded-xl border border-[#2D3748] p-6 space-y-6">
        {/* Filter buttons */}
        <div className="flex flex-wrap gap-2">
          <Button 
            variant={activeFilter === 'all' ? 'default' : 'outline'} 
            size="sm"
            className={activeFilter === 'all' ? 'bg-military' : 'border-military text-military'}
            onClick={() => setActiveFilter('all')}
          >
            All Tasks
          </Button>
          <Button 
            variant={activeFilter === 'pension' ? 'default' : 'outline'} 
            size="sm"
            className={activeFilter === 'pension' ? 'bg-military' : 'border-military text-military'}
            onClick={() => setActiveFilter('pension')}
          >
            Pension
          </Button>
          <Button 
            variant={activeFilter === 'education' ? 'default' : 'outline'} 
            size="sm"
            className={activeFilter === 'education' ? 'bg-military' : 'border-military text-military'}
            onClick={() => setActiveFilter('education')}
          >
            Education
          </Button>
          <Button 
            variant={activeFilter === 'skill' ? 'default' : 'outline'} 
            size="sm"
            className={activeFilter === 'skill' ? 'bg-military' : 'border-military text-military'}
            onClick={() => setActiveFilter('skill')}
          >
            Skill
          </Button>
          <Button 
            variant={activeFilter === 'job' ? 'default' : 'outline'} 
            size="sm"
            className={activeFilter === 'job' ? 'bg-military' : 'border-military text-military'}
            onClick={() => setActiveFilter('job')}
          >
            Job
          </Button>
        </div>
        
        {/* Task stats */}
        <div className="flex flex-wrap gap-3">
          <Badge variant="outline" className="border-white/20 text-white bg-[#1A1A1A]/50">
            Total Tasks: {filteredTasks.length}
          </Badge>
          <Badge variant="outline" className="border-green-600/40 text-green-400 bg-green-900/10">
            Completed: {filteredTasks.filter(t => t.status === 'completed').length}
          </Badge>
          <Badge variant="outline" className="border-amber-600/40 text-amber-400 bg-amber-900/10">
            Pending: {filteredTasks.filter(t => t.status === 'pending').length}
          </Badge>
        </div>
        
        {/* Tasks sections */}
        <div className="space-y-6">
          {/* Overdue tasks */}
          {groupedTasks.overdue.length > 0 && (
            <div>
              <h3 className="text-lg font-medium text-red-400 flex items-center mb-3">
                <AlertTriangle className="h-5 w-5 mr-2" />
                Overdue Tasks
              </h3>
              {groupedTasks.overdue
                .filter(task => activeFilter === 'all' || task.category === activeFilter)
                .map(renderTaskCard)}
            </div>
          )}
          
          {/* Upcoming tasks */}
          {groupedTasks.upcoming.length > 0 && (
            <div>
              <h3 className="text-lg font-medium text-amber-400 flex items-center mb-3">
                <Calendar className="h-5 w-5 mr-2" />
                Upcoming Tasks (Next 7 Days)
              </h3>
              {groupedTasks.upcoming
                .filter(task => activeFilter === 'all' || task.category === activeFilter)
                .map(renderTaskCard)}
            </div>
          )}
          
          {/* Future tasks */}
          {groupedTasks.future.length > 0 && (
            <div>
              <h3 className="text-lg font-medium text-blue-400 flex items-center mb-3">
                <Calendar className="h-5 w-5 mr-2" />
                Future Tasks
              </h3>
              {groupedTasks.future
                .filter(task => activeFilter === 'all' || task.category === activeFilter)
                .map(renderTaskCard)}
            </div>
          )}
          
          {/* No deadline tasks */}
          {groupedTasks.noDeadline.length > 0 && (
            <div>
              <h3 className="text-lg font-medium text-gray-400 flex items-center mb-3">
                <Clock className="h-5 w-5 mr-2" />
                Tasks Without Deadline
              </h3>
              {groupedTasks.noDeadline
                .filter(task => activeFilter === 'all' || task.category === activeFilter)
                .map(renderTaskCard)}
            </div>
          )}
          
          {/* No tasks message */}
          {filteredTasks.length === 0 && (
            <div className="text-center py-6">
              <Clipboard className="h-10 w-10 mx-auto text-white/30 mb-3" />
              <h3 className="text-lg font-medium text-white/80">
                No tasks found
              </h3>
              <p className="text-white/60 mt-1">
                {activeFilter !== 'all'
                  ? 'Try a different filter or add new tasks'
                  : 'Start adding tasks from other sections'}
              </p>
              
              {activeFilter !== 'all' && (
                <Button 
                  variant="outline" 
                  className="mt-4 border-military text-military hover:bg-military hover:text-white"
                  onClick={() => setActiveFilter('all')}
                >
                  Clear Filter
                </Button>
              )}
            </div>
          )}
        </div>
        
        {/* Tips card */}
        <Card className="bg-blue-950/30 border-blue-900 mt-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-blue-300 flex items-center">
              <Info className="h-5 w-5 mr-2" />
              Timeline Management Tips
            </CardTitle>
          </CardHeader>
          <CardContent className="text-blue-200/80 text-sm">
            <ul className="space-y-2 list-disc pl-5">
              <li>Regularly update task statuses to keep track of your progress</li>
              <li>Focus on overdue and upcoming tasks first</li>
              <li>Tasks from all sections will appear here automatically</li>
              <li>Use filters to focus on specific categories</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Timeline; 