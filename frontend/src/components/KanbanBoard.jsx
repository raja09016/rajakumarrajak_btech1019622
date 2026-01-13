// frontend/src/components/KanbanBoard.jsx
import { useState, useEffect, useCallback } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { taskAPI } from '../services/api';
import TaskCard from './TaskCard';
import AddTaskModal from './AddTaskModal';
import EditTaskModal from './EditTaskModal';
import { Plus } from 'lucide-react';

const KanbanBoard = () => {
  const [tasks, setTasks] = useState({
    pending: [],
    'in-progress': [],
    completed: [],
  });

  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editTask, setEditTask] = useState(null);

  const fetchTasks = useCallback(async () => {
    try {
      const response = await taskAPI.getTasks();
      const fetchedTasks = response.data.data || [];

      const grouped = {
        pending: fetchedTasks.filter((t) => t.status === 'pending'),
        'in-progress': fetchedTasks.filter((t) => t.status === 'in-progress'),
        completed: fetchedTasks.filter((t) => t.status === 'completed'),
      };

      setTasks(grouped);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleDragEnd = async (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const sourceCol = source.droppableId; // 'pending' | 'in-progress' | 'completed'
    const destCol = destination.droppableId;

    // optimistic UI update (use functional setState to avoid stale state bugs)
    setTasks((prev) => {
      const sourceTasks = Array.from(prev[sourceCol]);
      const destTasks =
        sourceCol === destCol ? sourceTasks : Array.from(prev[destCol]);

      const [movedTask] = sourceTasks.splice(source.index, 1);

      // ensure status is updated in UI immediately
      const updatedMovedTask = { ...movedTask, status: destCol };

      destTasks.splice(destination.index, 0, updatedMovedTask);

      return {
        ...prev,
        [sourceCol]: sourceTasks,
        [destCol]: destTasks,
      };
    });

    // persist to backend
    try {
      await taskAPI.updateTask(String(draggableId), { status: destCol });
    } catch (error) {
      console.error('Error updating task:', error);
      fetchTasks(); // revert by refetching
    }
  };

  const handleAddTask = async (taskData) => {
    try {
      await taskAPI.createTask(taskData);
      fetchTasks();
      setShowAddModal(false);
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  };

  const handleEditTask = async (taskId, taskData) => {
    try {
      await taskAPI.updateTask(taskId, taskData);
      fetchTasks();
      setEditTask(null);
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    try {
      await taskAPI.deleteTask(taskId);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const columns = [
    { id: 'pending', title: 'Pending', color: 'bg-yellow-500' },
    { id: 'in-progress', title: 'In Progress', color: 'bg-blue-500' },
    { id: 'completed', title: 'Completed', color: 'bg-green-500' },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Task Board</h1>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <Plus size={20} />
          Add Task
        </button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {columns.map((column) => (
            <div key={column.id} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-4">
                <div className={`w-3 h-3 rounded-full ${column.color}`} />
                <h2 className="font-semibold text-lg">{column.title}</h2>
                <span className="text-sm text-gray-500">
                  ({tasks[column.id]?.length ?? 0})
                </span>
              </div>

              <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`min-h-[200px] ${
                      snapshot.isDraggingOver ? 'bg-gray-100' : ''
                    } transition rounded-md`}
                  >
                    {(tasks[column.id] || []).map((task, index) => (
                      <Draggable
                        key={task._id}
                        draggableId={String(task._id)}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={provided.draggableProps.style}
                          >
                            <TaskCard
                              task={task}
                              onEdit={() => setEditTask(task)}
                              onDelete={() => handleDeleteTask(task._id)}
                              isDragging={snapshot.isDragging}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}

                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>

      {showAddModal && (
        <AddTaskModal
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddTask}
        />
      )}

      {editTask && (
        <EditTaskModal
          task={editTask}
          onClose={() => setEditTask(null)}
          onSubmit={handleEditTask}
        />
      )}
    </div>
  );
};

export default KanbanBoard;
