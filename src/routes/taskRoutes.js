const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const {
  taskValidationRules,
  handleValidationErrors,
} = require("../validation/taskValidation");

// Create a new task
router.post("/tasks", taskValidationRules, handleValidationErrors, async (req, res) => {
  try {
    const { name, dueDate, priority } = req.body;
    if (!name || !dueDate || !priority) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const task = new Task({ name, dueDate, priority });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all tasks
router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a task by ID
router.put("/tasks/:id", taskValidationRules, handleValidationErrors, async (req, res) => {
  try {
    const { name, dueDate, priority } = req.body;
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    task.name = name || task.name;
    task.dueDate = dueDate || task.dueDate;
    task.priority = priority || task.priority;
    await task.save();
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a task by ID
router.delete("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
