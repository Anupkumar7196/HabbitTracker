
import React from 'react';
import { Filter, Folder, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TaskCategory, TaskPriority } from '@/types/task';

interface CategoryFilterProps {
  selectedCategory: TaskCategory | 'all';
  onCategoryChange: (category: TaskCategory | 'all') => void;
  selectedPriority: TaskPriority | 'all';
  onPriorityChange: (priority: TaskPriority | 'all') => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onCategoryChange,
  selectedPriority,
  onPriorityChange,
}) => {
  const categories: Array<{ value: TaskCategory | 'all'; label: string; icon?: React.ReactNode }> = [
    { value: 'all', label: 'All Categories', icon: <Folder className="h-4 w-4" /> },
    { value: 'work', label: 'Work', icon: <Folder className="h-4 w-4" /> },
    { value: 'personal', label: 'Personal', icon: <Folder className="h-4 w-4" /> },
    { value: 'shopping', label: 'Shopping', icon: <Folder className="h-4 w-4" /> },
    { value: 'health', label: 'Health', icon: <Folder className="h-4 w-4" /> },
    { value: 'education', label: 'Education', icon: <Folder className="h-4 w-4" /> },
    { value: 'other', label: 'Other', icon: <Folder className="h-4 w-4" /> },
  ];

  const priorities: Array<{ value: TaskPriority | 'all'; label: string; color: string }> = [
    { value: 'all', label: 'All Priorities', color: 'text-gray-600' },
    { value: 'urgent', label: 'Urgent', color: 'text-red-600' },
    { value: 'high', label: 'High', color: 'text-orange-600' },
    { value: 'medium', label: 'Medium', color: 'text-yellow-600' },
    { value: 'low', label: 'Low', color: 'text-green-600' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="flex items-center text-sm font-medium text-gray-900 mb-3">
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </h3>
        
        {/* Categories */}
        <div className="space-y-2 mb-6">
          <h4 className="text-xs font-medium text-gray-700 uppercase tracking-wide">
            Categories
          </h4>
          {categories.map(category => (
            <Button
              key={category.value}
              variant={selectedCategory === category.value ? "default" : "ghost"}
              size="sm"
              onClick={() => onCategoryChange(category.value)}
              className="w-full justify-start text-left"
            >
              {category.icon}
              <span className="ml-2">{category.label}</span>
            </Button>
          ))}
        </div>

        {/* Priorities */}
        <div className="space-y-2">
          <h4 className="text-xs font-medium text-gray-700 uppercase tracking-wide">
            Priority
          </h4>
          {priorities.map(priority => (
            <Button
              key={priority.value}
              variant={selectedPriority === priority.value ? "default" : "ghost"}
              size="sm"
              onClick={() => onPriorityChange(priority.value)}
              className="w-full justify-start text-left"
            >
              <AlertCircle className={`h-4 w-4 ${priority.color}`} />
              <span className="ml-2">{priority.label}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;
