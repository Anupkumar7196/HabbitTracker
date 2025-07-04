
import React from 'react';
import { Calendar, Edit2, Trash2, User, Repeat } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Task } from '@/types/task';

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggleComplete,
  onEdit,
  onDelete,
}) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'work': return 'bg-blue-100 text-blue-800';
      case 'personal': return 'bg-purple-100 text-purple-800';
      case 'shopping': return 'bg-pink-100 text-pink-800';
      case 'health': return 'bg-emerald-100 text-emerald-800';
      case 'education': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;

  return (
    <div className={`p-4 border rounded-lg hover:shadow-md transition-shadow ${
      task.completed ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-200'
    } ${isOverdue ? 'border-red-200 bg-red-50' : ''}`}>
      <div className="flex items-start space-x-3">
        <Checkbox
          checked={task.completed}
          onCheckedChange={() => onToggleComplete(task.id)}
          className="mt-1"
        />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className={`text-sm font-medium ${
                task.completed ? 'line-through text-gray-500' : 'text-gray-900'
              }`}>
                {task.title}
              </h4>
              
              {task.description && (
                <p className={`text-sm mt-1 ${
                  task.completed ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {task.description}
                </p>
              )}
              
              <div className="flex items-center space-x-2 mt-2">
                <Badge variant="secondary" className={getPriorityColor(task.priority)}>
                  {task.priority}
                </Badge>
                <Badge variant="secondary" className={getCategoryColor(task.category)}>
                  {task.category}
                </Badge>
                
                {task.dueDate && (
                  <div className={`flex items-center text-xs ${
                    isOverdue ? 'text-red-600' : 'text-gray-500'
                  }`}>
                    <Calendar className="h-3 w-3 mr-1" />
                    {new Date(task.dueDate).toLocaleDateString()}
                  </div>
                )}
                
                {task.recurring?.enabled && (
                  <div className="flex items-center text-xs text-blue-600">
                    <Repeat className="h-3 w-3 mr-1" />
                    {task.recurring.frequency}
                  </div>
                )}
                
                {task.assignees && task.assignees.length > 0 && (
                  <div className="flex items-center text-xs text-gray-500">
                    <User className="h-3 w-3 mr-1" />
                    {task.assignees.length}
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-1 ml-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(task)}
                className="h-8 w-8 p-0"
              >
                <Edit2 className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(task.id)}
                className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
