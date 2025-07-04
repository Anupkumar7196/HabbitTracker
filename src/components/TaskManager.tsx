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
    { key: 'TaskList', label: 'Task List', icon: '📝' },
    { key: 'TaskForm', label: 'Task Form', icon: '➕' },
    { key: 'TaskItem', label: 'Task Item', icon: '📋' },
    { key: 'TaskStats', label: 'Task Stats', icon: '📊' },
    { key: 'CategoryFilter', label: 'Category Filter', icon: '🔖' },
];

const TaskManager: React.FC = () => {
    const [page, setPage] = useState('TaskList');
    // Demo handlers to avoid errors
    const handleSubmit = () => { };
    const handleClose = () => { };
    const handleToggleComplete = () => { };
    const handleEdit = () => { };
    const handleDelete = () => { };
    const handleCategoryChange = () => { };
    const handlePriorityChange = () => { };

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex flex-col md:flex-row">
            {/* Sidebar for desktop, bottom nav for mobile */}
            <nav
                className="
          fixed md:static z-20
          bottom-0 left-0 right-0 md:top-0 md:left-0 md:h-screen
          flex md:flex-col
          bg-white/40 md:bg-white/30 backdrop-blur-lg
          shadow-2xl md:shadow-xl
          border-t md:border-t-0 md:border-r border-white/30
          px-2 py-2 md:px-6 md:py-8
          space-x-2 md:space-x-0 md:space-y-4
          w-full md:w-64
          rounded-t-3xl md:rounded-t-none md:rounded-r-3xl
          transition-all duration-300
        "
            >
                {pages.map((p) => (
                    <Button
                        key={p.key}
                        variant={page === p.key ? 'default' : 'ghost'}
                        className={`
              flex-1 md:flex-none
              flex items-center justify-center md:justify-start gap-2
              text-base md:text-lg font-semibold
              rounded-2xl md:rounded-xl
              transition-all duration-200
              shadow-md md:shadow-none
              bg-white/60 md:bg-transparent
              hover:bg-gradient-to-r hover:from-blue-200 hover:to-pink-200
              focus-visible:ring-2 focus-visible:ring-blue-400
              ${page === p.key ? 'bg-gradient-to-r from-blue-400 to-pink-400 text-white shadow-lg' : 'text-gray-700'}
            `}
                        onClick={() => setPage(p.key)}
                    >
                        <span className="text-xl md:text-2xl">{p.icon}</span>
                        <span className="hidden md:inline">{p.label}</span>
                    </Button>
                ))}
            </nav>
            {/* Main Content */}
            <main className="flex-1 flex items-center justify-center p-4 md:p-12 transition-all duration-300">
                <div className="w-full max-w-3xl bg-white/80 rounded-3xl shadow-2xl p-4 md:p-10 backdrop-blur-lg border border-white/40">
                    {page === 'TaskList' && (
                        <TaskList
                            tasks={[demoTask]}
                            onToggleComplete={handleToggleComplete}
                            onEditTask={handleEdit}
                            onDeleteTask={handleDelete}
                        />
                    )}
                    {page === 'TaskForm' && (
                        <TaskForm
                            onSubmit={handleSubmit}
                            onClose={handleClose}
                        />
                    )}
                    {page === 'TaskItem' && (
                        <TaskItem
                            task={demoTask}
                            onToggleComplete={handleToggleComplete}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    )}
                    {page === 'TaskStats' && <TaskStats tasks={[demoTask]} />}
                    {page === 'CategoryFilter' && (
                        <CategoryFilter
                            selectedCategory={demoTask.category}
                            onCategoryChange={handleCategoryChange}
                            selectedPriority={demoTask.priority}
                            onPriorityChange={handlePriorityChange}
                        />
                    )}
                </div>
            </main>
        </div>
    );
};

export default TaskManager;