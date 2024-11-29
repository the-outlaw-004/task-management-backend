const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dueDate: { type: Date, required: true },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High", "Very High"],
    required: true,
  },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
