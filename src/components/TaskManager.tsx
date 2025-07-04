import React, { useState } from 'react';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import TaskItem from './TaskItem';
import TaskStats from './TaskStats';
import CategoryFilter from './CategoryFilter';
import { Task } from '@/types/task';
import { Button } from './ui/button';

const demoTask: Task = {
  id: '1',
  title: 'Demo Task',
  description: 'This is a demo task for preview.',
  priority: 'medium',
  category: 'personal',
  completed: false,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const pages = [
  { key: 'TaskList', label: 'Task List' },
  { key: 'TaskForm', label: 'Task Form' },
  { key: 'TaskItem', label: 'Task Item' },
  { key: 'TaskStats', label: 'Task Stats' },
  { key: 'CategoryFilter', label: 'Category Filter' },
];

const TaskManager: React.FC = () => {
  const [page, setPage] = useState('TaskList');

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      {/* Sidebar Navigation */}
      <nav className="flex md:flex-col bg-white/30 backdrop-blur-lg shadow-xl p-2 md:p-8 space-x-2 md:space-x-0 md:space-y-4 w-full md:w-72 md:min-h-screen border-b md:border-b-0 md:border-r border-white/20 transition-all duration-300">
        <div className="hidden md:block mb-8 text-center">
          <span className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-pink-500 drop-shadow-lg tracking-tight select-none">TaskManager</span>
        </div>
        {pages.map((p) => (
          <Button
            key={p.key}
            variant={page === p.key ? 'default' : 'ghost'}
            className={`w-full py-3 rounded-xl font-semibold text-lg transition-all duration-200 shadow-md hover:scale-105 hover:bg-gradient-to-r hover:from-blue-400 hover:to-pink-400 hover:text-white ${
              page === p.key
                ? 'bg-gradient-to-r from-blue-500 to-pink-500 text-white shadow-lg scale-105'
                : 'bg-white/60 text-gray-700 hover:shadow-xl'
            }`}
            style={{backdropFilter: 'blur(8px)'}}
            onClick={() => setPage(p.key)}
          >
            {p.label}
          </Button>
        ))}
      </nav>
      {/* Main Content */}
      <main className="flex-1 p-4 md:p-12 flex items-center justify-center transition-all duration-300">
        <div className="w-full max-w-3xl bg-white/70 rounded-3xl shadow-2xl p-4 md:p-10 backdrop-blur-lg border border-white/30">
          {page === 'TaskList' && (
            <TaskList
              tasks={[demoTask]}
              onToggleComplete={() => {}}
              onEditTask={() => {}}
              onDeleteTask={() => {}}
            />
          )}
          {page === 'TaskForm' && (
            <TaskForm
              onSubmit={() => {}}
              onClose={() => {}}
            />
          )}
          {page === 'TaskItem' && (
            <TaskItem
              task={demoTask}
              onToggleComplete={() => {}}
              onEdit={() => {}}
              onDelete={() => {}}
            />
          )}
          {page === 'TaskStats' && <TaskStats tasks={[demoTask]} />}
          {page === 'CategoryFilter' && (
            <CategoryFilter
              selectedCategory={demoTask.category}
              onCategoryChange={() => {}}
              selectedPriority={demoTask.priority}
              onPriorityChange={() => {}}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default TaskManager;