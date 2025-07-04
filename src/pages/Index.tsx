
import React, { useState, useEffect } from "react";
import { Plus, Search, Filter, Calendar, User, Settings, BarChart3, Target, Bell, Home, List, PieChart, Award, X, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import TaskList from '@/components/TaskList';
import TaskForm from '@/components/TaskForm';
import CategoryFilter from '@/components/CategoryFilter';
import TaskStats from '@/components/TaskStats';
import { Task, TaskPriority, TaskCategory } from '@/types/task';

// Import new components (we'll create these)
import CalendarView from '@/components/CalendarView';
import Statistics from '@/components/Statistics';
import SettingsPage from '@/components/SettingsPage';
import ProfilePage from '@/components/ProfilePage';
import StreakTracker from '@/components/StreakTracker';

const Index = () => {
  const [showDashboard, setShowDashboard] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<TaskCategory | 'all'>('all');
  const [selectedPriority, setSelectedPriority] = useState<TaskPriority | 'all'>('all');
  const [showSidebar, setShowSidebar] = useState(false);
  const [theme, setTheme] = useState('light');
  const [showFAB, setShowFAB] = useState(false);

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

  // Show/hide FAB based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      setShowFAB(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const navigationItems = [
    { key: 'dashboard', label: 'Dashboard', icon: Home },
    { key: 'tasks', label: 'Tasks', icon: List },
    { key: 'calendar', label: 'Calendar', icon: Calendar },
    { key: 'statistics', label: 'Statistics', icon: BarChart3 },
    { key: 'streaks', label: 'Streaks', icon: Award },
    { key: 'profile', label: 'Profile', icon: User },
    { key: 'settings', label: 'Settings', icon: Settings },
  ];

  if (!showDashboard) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 p-6">
        <div className="bg-white/40 backdrop-blur-2xl rounded-3xl shadow-2xl p-10 max-w-xl w-full flex flex-col items-center border border-white/30 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 mb-4 text-center drop-shadow-lg tracking-tight animate-gradient-move">
            Welcome to Habit Tracker
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 text-center font-medium animate-fade-in delay-100">
            Build better habits, track your progress, and achieve your goals with ease. Start your journey to a better you today!
          </p>
          <Button
            onClick={() => setShowDashboard(true)}
            className="px-10 py-4 rounded-full bg-gradient-to-r from-blue-500 to-pink-500 text-white font-bold text-xl shadow-xl hover:scale-105 hover:from-pink-500 hover:to-blue-500 transition-all duration-300 animate-fade-in delay-200"
            style={{boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'}}
          >
            Get Started
          </Button>
        </div>
      </div>
    );
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-white/60 rounded-2xl shadow-xl p-6 mb-8 border border-white/30 backdrop-blur-lg">
                  <TaskStats tasks={tasks} />
                </div>
                <div className="bg-white/60 rounded-2xl shadow-xl p-6 border border-white/30 backdrop-blur-lg">
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
                <div className="bg-white/70 rounded-3xl shadow-2xl border border-white/30 backdrop-blur-lg">
                  <div className="p-8 border-b border-gray-200">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2 md:mb-0 tracking-tight">Tasks ({filteredTasks.length})</h2>
                      <div className="flex items-center space-x-2">
                        <Filter className="h-5 w-5 text-gray-500" />
                        <span className="text-lg text-gray-600 font-medium">
                          {selectedCategory !== 'all' && `${selectedCategory} • `}
                          {selectedPriority !== 'all' && `${selectedPriority} priority`}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="p-8">
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
        );
      case 'tasks':
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
            <div className="bg-white/70 rounded-3xl shadow-2xl border border-white/30 backdrop-blur-lg p-8">
              <div className="flex flex-col md:flex-row items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-900 tracking-tight">All Tasks</h2>
                <Button
                  onClick={() => setShowTaskForm(true)}
                  className="bg-gradient-to-r from-blue-500 to-pink-500 text-white font-bold shadow-lg rounded-xl px-6 py-3 hover:scale-105 transition-transform duration-200"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Add Task
                </Button>
              </div>
              <TaskList
                tasks={tasks}
                onToggleComplete={toggleTaskComplete}
                onEditTask={setEditingTask}
                onDeleteTask={deleteTask}
              />
            </div>
          </div>
        );
      case 'calendar':
        return <CalendarView tasks={tasks} onToggleComplete={toggleTaskComplete} />;
      case 'statistics':
        return <Statistics tasks={tasks} />;
      case 'streaks':
        return <StreakTracker tasks={tasks} />;
      case 'profile':
        return <ProfilePage />;
      case 'settings':
        return <SettingsPage theme={theme} setTheme={setTheme} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200">
      {/* Header */}
      <header className="bg-white/40 backdrop-blur-lg shadow-lg border-b border-white/30 animate-fade-in sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center h-auto md:h-20 py-4 md:py-0">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setShowSidebar(!showSidebar)}
              >
                <Menu className="h-6 w-6" />
              </Button>
              <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 drop-shadow-lg tracking-tight select-none animate-gradient-move">TaskFlow</h1>
              <div className="hidden md:flex items-center space-x-2">
                <Calendar className="h-6 w-6 text-gray-500" />
                <span className="text-lg text-gray-600 font-medium">
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
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 w-full md:w-72 rounded-xl shadow-inner border border-white/30 bg-white/60 focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <Button
                onClick={() => setShowTaskForm(true)}
                className="bg-gradient-to-r from-blue-500 to-pink-500 text-white font-bold shadow-lg w-full md:w-auto rounded-xl px-6 py-3 hover:scale-105 transition-transform duration-200"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Task
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-gradient-to-r hover:from-blue-100 hover:to-pink-100">
                <Bell className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Navigation */}
        <nav className={`fixed md:static inset-y-0 left-0 z-30 w-64 bg-white/40 backdrop-blur-lg shadow-xl transform ${showSidebar ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out`}>
          <div className="flex flex-col h-full p-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-gray-900">Navigation</h2>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setShowSidebar(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="flex-1 space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.key}
                    variant={currentPage === item.key ? 'default' : 'ghost'}
                    className={`w-full justify-start text-lg py-3 rounded-xl transition-all duration-200 ${
                      currentPage === item.key
                        ? 'bg-gradient-to-r from-blue-500 to-pink-500 text-white shadow-lg'
                        : 'hover:bg-gradient-to-r hover:from-blue-100 hover:to-pink-100'
                    }`}
                    onClick={() => {
                      setCurrentPage(item.key);
                      setShowSidebar(false);
                    }}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    {item.label}
                  </Button>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1">
          {renderPage()}
        </main>
      </div>

      {/* Mobile Overlay */}
      {showSidebar && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setShowSidebar(false)}
        />
      )}

      {/* Floating Action Button (Mobile) */}
      <div className={`fixed bottom-6 right-6 z-40 md:hidden transition-all duration-300 ${showFAB ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}>
        <Button
          onClick={() => setShowTaskForm(true)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-pink-500 text-white shadow-2xl hover:scale-110 transition-transform duration-200"
          style={{boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'}}
        >
          <Plus className="h-6 w-6" />
        </Button>
      </div>

      {/* Task Form Modal */}
      {showTaskForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 animate-fade-in p-4">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <TaskForm
              onSubmit={addTask}
              onClose={() => setShowTaskForm(false)}
            />
          </div>
        </div>
      )}

      {/* Edit Task Modal */}
      {editingTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 animate-fade-in p-4">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <TaskForm
              task={editingTask}
              onSubmit={(updates) => updateTask(editingTask.id, updates)}
              onClose={() => setEditingTask(null)}
            />
          </div>
        </div>
      )}

      {/* Animations */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.7s cubic-bezier(.4,0,.2,1) both; }
        @keyframes gradient-move {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        .animate-gradient-move {
          background-size: 200% 200%;
          animation: gradient-move 3s linear infinite alternate;
        }
      `}</style>
    </div>
  );
};

export default Index;
