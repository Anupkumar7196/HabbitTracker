
import React, { useState, useEffect } from 'react';
import { X, Calendar, Repeat, Users, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Task, TaskPriority, TaskCategory } from '@/types/task';

interface TaskFormProps {
  task?: Task;
  onSubmit: (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onClose: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ task, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium' as TaskPriority,
    category: 'personal' as TaskCategory,
    dueDate: '',
    completed: false,
    recurring: {
      enabled: false,
      frequency: 'weekly' as const,
      interval: 1,
    },
    assignees: [] as string[],
    tags: [] as string[],
  });

  const [newAssignee, setNewAssignee] = useState('');
  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        priority: task.priority,
        category: task.category,
        dueDate: task.dueDate || '',
        completed: task.completed,
        recurring: task.recurring || {
          enabled: false,
          frequency: 'weekly',
          interval: 1,
        },
        assignees: task.assignees || [],
        tags: task.tags || [],
      });
    }
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    onSubmit({
      ...formData,
      dueDate: formData.dueDate || undefined,
      recurring: formData.recurring.enabled ? formData.recurring : undefined,
      assignees: formData.assignees.length > 0 ? formData.assignees : undefined,
      tags: formData.tags.length > 0 ? formData.tags : undefined,
    });
  };

  const addAssignee = () => {
    if (newAssignee.trim() && !formData.assignees.includes(newAssignee.trim())) {
      setFormData(prev => ({
        ...prev,
        assignees: [...prev.assignees, newAssignee.trim()],
      }));
      setNewAssignee('');
    }
  };

  const removeAssignee = (assignee: string) => {
    setFormData(prev => ({
      ...prev,
      assignees: prev.assignees.filter(a => a !== assignee),
    }));
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag('');
    }
  };

  const removeTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag),
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">
            {task ? 'Edit Task' : 'Create New Task'}
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          <div>
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Enter task title"
              required
            />
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Enter task description"
              rows={3}
            />
          </div>

          {/* Priority and Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Priority</Label>
              <Select
                value={formData.priority}
                onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value as TaskPriority }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData(prev => ({ ...prev, category: value as TaskCategory }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="personal">Personal</SelectItem>
                  <SelectItem value="work">Work</SelectItem>
                  <SelectItem value="shopping">Shopping</SelectItem>
                  <SelectItem value="health">Health</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Due Date */}
          <div>
            <Label htmlFor="dueDate">Due Date</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                id="dueDate"
                type="datetime-local"
                value={formData.dueDate}
                onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                className="pl-10"
              />
            </div>
          </div>

          {/* Recurring */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="recurring"
                checked={formData.recurring.enabled}
                onCheckedChange={(checked) => 
                  setFormData(prev => ({ 
                    ...prev, 
                    recurring: { ...prev.recurring, enabled: !!checked }
                  }))
                }
              />
              <Label htmlFor="recurring" className="flex items-center">
                <Repeat className="h-4 w-4 mr-2" />
                Recurring Task
              </Label>
            </div>

            {formData.recurring.enabled && (
              <div className="ml-6 grid grid-cols-2 gap-4">
                <div>
                  <Label>Frequency</Label>
                  <Select
                    value={formData.recurring.frequency}
                    onValueChange={(value) => 
                      setFormData(prev => ({ 
                        ...prev, 
                        recurring: { ...prev.recurring, frequency: value as any }
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Interval</Label>
                  <Input
                    type="number"
                    min="1"
                    value={formData.recurring.interval}
                    onChange={(e) => 
                      setFormData(prev => ({ 
                        ...prev, 
                        recurring: { ...prev.recurring, interval: parseInt(e.target.value) || 1 }
                      }))
                    }
                  />
                </div>
              </div>
            )}
          </div>

          {/* Assignees */}
          <div>
            <Label className="flex items-center">
              <Users className="h-4 w-4 mr-2" />
              Assignees
            </Label>
            <div className="flex space-x-2 mt-2">
              <Input
                value={newAssignee}
                onChange={(e) => setNewAssignee(e.target.value)}
                placeholder="Add assignee"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAssignee())}
              />
              <Button type="button" onClick={addAssignee} variant="outline">
                Add
              </Button>
            </div>
            {formData.assignees.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.assignees.map(assignee => (
                  <span
                    key={assignee}
                    className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm flex items-center"
                  >
                    {assignee}
                    <button
                      type="button"
                      onClick={() => removeAssignee(assignee)}
                      className="ml-1 text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Tags */}
          <div>
            <Label className="flex items-center">
              <Tag className="h-4 w-4 mr-2" />
              Tags
            </Label>
            <div className="flex space-x-2 mt-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add tag"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              />
              <Button type="button" onClick={addTag} variant="outline">
                Add
              </Button>
            </div>
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.tags.map(tag => (
                  <span
                    key={tag}
                    className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm flex items-center"
                  >
                    #{tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-1 text-gray-600 hover:text-gray-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-3 pt-6 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              {task ? 'Update Task' : 'Create Task'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
