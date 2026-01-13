// backend/controllers/taskController.js
const Task = require('../models/Task');

// @desc    Get all tasks for logged-in user
// @route   GET /api/tasks
// @access  Private
const getTasks = async (req, res) => {
  try {
    const { status } = req.query;
    
    const filter = { user: req.user._id };
    
    // Filter by status if provided
    if (status && ['pending', 'in-progress', 'completed'].includes(status)) {
      filter.status = status;
    }

    const tasks = await Task.find(filter).sort({ created_at: -1 });

    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single task
// @route   GET /api/tasks/:id
// @access  Private
const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404);
      throw new Error('Task not found');
    }

    // Check if task belongs to user
    if (task.user.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('Not authorized to access this task');
    }

    res.status(200).json({
      success: true,
      data: task
    });
  } catch (error) {
    res.status(res.statusCode || 500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create new task
// @route   POST /api/tasks
// @access  Private
const createTask = async (req, res) => {
  try {
    const { title, description, status, due_date } = req.body;

    // Validation
    if (!title || !description || !due_date) {
      res.status(400);
      throw new Error('Please provide title, description, and due date');
    }

    // Validate status if provided
    if (status && !['pending', 'in-progress', 'completed'].includes(status)) {
      res.status(400);
      throw new Error('Status must be pending, in-progress, or completed');
    }

    // Create task
    const task = await Task.create({
      title,
      description,
      status: status || 'pending',
      due_date,
      user: req.user._id
    });

    res.status(201).json({
      success: true,
      data: task
    });
  } catch (error) {
    res.status(res.statusCode || 500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404);
      throw new Error('Task not found');
    }

    // Check if task belongs to user
    if (task.user.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('Not authorized to update this task');
    }

    // Validate status if provided
    if (req.body.status && !['pending', 'in-progress', 'completed'].includes(req.body.status)) {
      res.status(400);
      throw new Error('Status must be pending, in-progress, or completed');
    }

    // Update task
    task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: task
    });
  } catch (error) {
    res.status(res.statusCode || 500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404);
      throw new Error('Task not found');
    }

    // Check if task belongs to user
    if (task.user.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('Not authorized to delete this task');
    }

    await Task.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
      data: {}
    });
  } catch (error) {
    res.status(res.statusCode || 500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask
};