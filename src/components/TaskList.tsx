
import React from 'react';
import { Task } from '@/types/task';
import TaskItem from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (id: string) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onToggleComplete,
  onEditTask,
  onDeleteTask,
}) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-lg mb-2">No tasks found</div>
        <div className="text-gray-500 text-sm">
          Create your first task to get started!
        </div>
      </div>
    );
  }

  const incompleteTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className="space-y-6">
      {/* Incomplete Tasks */}
      {incompleteTasks.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">
            Active Tasks ({incompleteTasks.length})
          </h3>
          <div className="space-y-2">
            {incompleteTasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onToggleComplete={onToggleComplete}
                onEdit={onEditTask}
                onDelete={onDeleteTask}
              />
            ))}
          </div>
        </div>
      )}

      {/* Completed Tasks */}
      {completedTasks.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">
            Completed ({completedTasks.length})
          </h3>
          <div className="space-y-2">
            {completedTasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onToggleComplete={onToggleComplete}
                onEdit={onEditTask}
                onDelete={onDeleteTask}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
