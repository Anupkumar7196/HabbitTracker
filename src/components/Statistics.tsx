import React from 'react';
import { BarChart3, TrendingUp, Target, Award, Calendar, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { Task } from '@/types/task';

interface StatisticsProps {
  tasks: Task[];
}

const Statistics: React.FC<StatisticsProps> = ({ tasks }) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Calculate tasks by category
  const tasksByCategory = tasks.reduce((acc, task) => {
    acc[task.category] = (acc[task.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Calculate tasks by priority
  const tasksByPriority = tasks.reduce((acc, task) => {
    acc[task.priority] = (acc[task.priority] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Calculate weekly completion trend (last 4 weeks)
  const getWeeklyTrend = () => {
    const weeks = [];
    const today = new Date();

    for (let i = 3; i >= 0; i--) {
      const weekStart = new Date(today);
      weekStart.setDate(today.getDate() - (today.getDay() + 7 * i));
      weekStart.setHours(0, 0, 0, 0);

      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      weekEnd.setHours(23, 59, 59, 999);

      const weekTasks = tasks.filter(task => {
        const taskDate = new Date(task.updatedAt);
        return taskDate >= weekStart && taskDate <= weekEnd && task.completed;
      });

      weeks.push({
        week: `Week ${4 - i}`,
        completed: weekTasks.length,
        total: tasks.filter(task => {
          const taskDate = new Date(task.createdAt);
          return taskDate >= weekStart && taskDate <= weekEnd;
        }).length
      });
    }

    return weeks;
  };

  const weeklyTrend = getWeeklyTrend();

  const statsCards = [
    {
      title: 'Total Tasks',
      value: totalTasks,
      icon: Target,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Completed',
      value: completedTasks,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Pending',
      value: pendingTasks,
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      title: 'Completion Rate',
      value: `${completionRate}%`,
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="space-y-8">
        {/* Header */}
        <div className="bg-white/70 rounded-3xl shadow-2xl border border-white/30 backdrop-blur-lg p-8">
          <div className="flex items-center space-x-4 mb-6">
            <BarChart3 className="h-8 w-8 text-blue-500" />
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Statistics & Analytics</h2>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statsCards.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-white/60 rounded-2xl p-6 border border-white/30 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-full ${stat.bgColor}`}>
                      <Icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Category Distribution */}
          <div className="bg-white/70 rounded-3xl shadow-2xl border border-white/30 backdrop-blur-lg p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Tasks by Category</h3>
            <div className="space-y-4">
              {Object.entries(tasksByCategory).map(([category, count]) => (
                <div key={category} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 capitalize">{category}</span>
                  <div className="flex items-center space-x-3">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(count / totalTasks) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-gray-900">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Priority Distribution */}
          <div className="bg-white/70 rounded-3xl shadow-2xl border border-white/30 backdrop-blur-lg p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Tasks by Priority</h3>
            <div className="space-y-4">
              {Object.entries(tasksByPriority).map(([priority, count]) => {
                const priorityColors = {
                  urgent: 'from-red-500 to-red-600',
                  high: 'from-orange-500 to-orange-600',
                  medium: 'from-yellow-500 to-yellow-600',
                  low: 'from-green-500 to-green-600'
                };

                return (
                  <div key={priority} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 capitalize">{priority}</span>
                    <div className="flex items-center space-x-3">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div
                          className={`bg-gradient-to-r ${priorityColors[priority as keyof typeof priorityColors]} h-2 rounded-full transition-all duration-300`}
                          style={{ width: `${(count / totalTasks) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-gray-900">{count}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Weekly Trend */}
        <div className="bg-white/70 rounded-3xl shadow-2xl border border-white/30 backdrop-blur-lg p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Weekly Completion Trend</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {weeklyTrend.map((week, index) => (
              <div key={index} className="bg-white/60 rounded-2xl p-6 border border-white/30">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{week.week}</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Completed:</span>
                    <span className="text-sm font-semibold text-green-600">{week.completed}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total:</span>
                    <span className="text-sm font-semibold text-gray-900">{week.total}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${week.total > 0 ? (week.completed / week.total) * 100 : 0}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;