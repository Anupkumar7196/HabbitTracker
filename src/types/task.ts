
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';
export type TaskCategory = 'personal' | 'work' | 'shopping' | 'health' | 'education' | 'other';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  category: TaskCategory;
  dueDate?: string;
  completed: boolean;
  recurring?: {
    enabled: boolean;
    frequency: 'daily' | 'weekly' | 'monthly';
    interval: number;
  };
  assignees?: string[];
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}
