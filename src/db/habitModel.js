// db/habitModel.js
const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema({
  title: String,
  frequency: [String], // e.g., ["Monday", "Wednesday"]
  color: String,
  icon: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Habit", habitSchema);
