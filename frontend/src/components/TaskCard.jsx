// frontend/src/components/TaskCard.jsx
import { Edit, Trash2, Calendar } from 'lucide-react';

const TaskCard = ({ task, onEdit, onDelete, isDragging }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const isOverdue = new Date(task.due_date) < new Date() && task.status !== 'completed';

  return (
    <div
      className={`bg-white rounded-lg p-4 mb-3 shadow-sm border border-gray-200 hover:shadow-md transition ${
        isDragging ? 'opacity-50 rotate-2' : ''
      }`}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-gray-800 line-clamp-2">{task.title}</h3>
        <div className="flex gap-1">
          <button
            onClick={onEdit}
            className="p-1 hover:bg-gray-100 rounded transition"
            title="Edit task"
          >
            <Edit size={16} className="text-blue-600" />
          </button>
          <button
            onClick={onDelete}
            className="p-1 hover:bg-gray-100 rounded transition"
            title="Delete task"
          >
            <Trash2 size={16} className="text-red-600" />
          </button>
        </div>
      </div>

      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{task.description}</p>

      <div className="flex items-center gap-1 text-xs">
        <Calendar size={14} className={isOverdue ? 'text-red-500' : 'text-gray-400'} />
        <span className={isOverdue ? 'text-red-500 font-medium' : 'text-gray-500'}>
          {formatDate(task.due_date)}
          {isOverdue && ' (Overdue)'}
        </span>
      </div>
    </div>
  );
};

export default TaskCard;