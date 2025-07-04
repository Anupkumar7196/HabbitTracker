
import React from 'react';
import { CheckCircle, Clock, AlertTriangle, Calendar } from 'lucide-react';
import { Task } from '@/types/task';

interface TaskStatsProps {
  tasks: Task[];
}

const TaskStats: React.FC<TaskStatsProps> = ({ tasks }) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const overdueTasks = tasks.filter(task => 
    task.dueDate && 
    new Date(task.dueDate) < new Date() && 
    !task.completed
  ).length;
  const dueTodayTasks = tasks.filter(task => {
    if (!task.dueDate || task.completed) return false;
    const today = new Date().toDateString();
    const taskDate = new Date(task.dueDate).toDateString();
    return today === taskDate;
  }).length;

  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const stats = [
    {
      label: 'Total Tasks',
      value: totalTasks,
      icon: <Clock className="h-5 w-5 text-blue-600" />,
      color: 'text-blue-600',
    },
    {
      label: 'Completed',
      value: completedTasks,
      icon: <CheckCircle className="h-5 w-5 text-green-600" />,
      color: 'text-green-600',
    },
    {
      label: 'Pending',
      value: pendingTasks,
      icon: <Clock className="h-5 w-5 text-orange-600" />,
      color: 'text-orange-600',
    },
    {
      label: 'Overdue',
      value: overdueTasks,
      icon: <AlertTriangle className="h-5 w-5 text-red-600" />,
      color: 'text-red-600',
    },
    {
      label: 'Due Today',
      value: dueTodayTasks,
      icon: <Calendar className="h-5 w-5 text-purple-600" />,
      color: 'text-purple-600',
    },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">Overview</h3>
        
        {/* Completion Rate */}
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Completion Rate</span>
            <span className="text-sm font-medium text-gray-900">{completionRate}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${completionRate}%` }}
            />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="space-y-3">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {stat.icon}
                <span className="text-sm text-gray-600">{stat.label}</span>
              </div>
              <span className={`text-sm font-medium ${stat.color}`}>
                {stat.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskStats;
