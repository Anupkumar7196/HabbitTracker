
import React, { useState, useEffect } from "react";
import { Plus, Search, Filter, Calendar, User, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import TaskList from '@/components/TaskList';
import TaskForm from '@/components/TaskForm';
import CategoryFilter from '@/components/CategoryFilter';
import TaskStats from '@/components/TaskStats';
import { Task, TaskPriority, TaskCategory } from '@/types/task';

const Index = () => {
  const [showDashboard, setShowDashboard] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<TaskCategory | 'all'>('all');
  const [selectedPriority, setSelectedPriority] = useState<TaskPriority | 'all'>('all');

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTasks(prev => [...prev, newTask]);
    setShowTaskForm(false);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task =>
      task.id === id
        ? { ...task, ...updates, updatedAt: new Date().toISOString() }
        : task
    ));
    setEditingTask(null);
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const toggleTaskComplete = (id: string) => {
    setTasks(prev => prev.map(task =>
      task.id === id
        ? { ...task, completed: !task.completed, updatedAt: new Date().toISOString() }
        : task
    ));
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || task.category === selectedCategory;
    const matchesPriority = selectedPriority === 'all' || task.priority === selectedPriority;
    return matchesSearch && matchesCategory && matchesPriority;
  });

  if (!showDashboard) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-6">
        <div className="bg-white bg-opacity-80 rounded-3xl shadow-2xl p-10 max-w-xl w-full flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-pink-500 mb-4 text-center">
            Welcome to Habit Tracker
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8 text-center">
            Build better habits, track your progress, and achieve your goals with ease. Start your journey to a better you today!
          </p>
          <Button
            onClick={() => setShowDashboard(true)}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-500 to-pink-500 text-white font-semibold text-lg shadow-lg hover:scale-105 transition-transform duration-200"
          >
            Get Started
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center h-auto md:h-16 py-4 md:py-0">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <h1 className="text-2xl font-bold text-gray-900">TaskFlow</h1>
              <div className="hidden md:flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-gray-500" />
                <span className="text-sm text-gray-600">
                  {new Date().toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 w-full md:w-auto">
              <div className="relative w-full md:w-auto mb-2 md:mb-0">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full md:w-64"
                />
              </div>
              <Button
                onClick={() => setShowTaskForm(true)}
                className="bg-blue-600 hover:bg-blue-700 w-full md:w-auto"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Task
              </Button>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <TaskStats tasks={tasks} />
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <CategoryFilter
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                selectedPriority={selectedPriority}
                onPriorityChange={setSelectedPriority}
              />
            </div>
          </div>
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900 mb-2 md:mb-0">
                    Tasks ({filteredTasks.length})
                  </h2>
                  <div className="flex items-center space-x-2">
                    <Filter className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      {selectedCategory !== 'all' && `${selectedCategory} • `}
                      {selectedPriority !== 'all' && `${selectedPriority} priority`}
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <TaskList
                  tasks={filteredTasks}
                  onToggleComplete={toggleTaskComplete}
                  onEditTask={setEditingTask}
                  onDeleteTask={deleteTask}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Task Form Modal */}
      {showTaskForm && (
        <TaskForm
          onSubmit={addTask}
          onClose={() => setShowTaskForm(false)}
        />
      )}
      {/* Edit Task Modal */}
      {editingTask && (
        <TaskForm
          task={editingTask}
          onSubmit={(updates) => updateTask(editingTask.id, updates)}
          onClose={() => setEditingTask(null)}
        />
      )}
    </div>
  );
};

export default Index;
