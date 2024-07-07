const Task = require("../models/taskModel");
const User = require("../models/userModel");

// Get all tasks for the logged-in user
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({ isPinned: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a task by ID
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "User not authorized" });
    }

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new task
exports.createTask = async (req, res) => {
  const { title, description, body, todoList, isPinned } = req.body;

  try {
    const task = new Task({
      title,
      description,
      body,
      todoList,
      isPinned,
      user: req.user.id,
    });

    await task.save();

    // Add task reference to user
    await User.findByIdAndUpdate(
      req.user.id,
      { $push: { tasks: task._id } },
      { new: true, useFindAndModify: false }
    );

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  const { title, description, body, todoList, isPinned } = req.body;

  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "User not authorized" });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.body = body || task.body;
    task.todoList = todoList || task.todoList;
    task.isPinned = isPinned !== undefined ? isPinned : task.isPinned;

    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "User not authorized" });
    }

    await Task.deleteOne({ _id: req.params.id });

    // Remove task reference from user
    await User.findByIdAndUpdate(
      req.user.id,
      { $pull: { tasks: task._id } },
      { new: true, useFindAndModify: false }
    );

    res.json({ message: "Task removed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};