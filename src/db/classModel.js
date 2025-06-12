// db/classModel.js
const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  title: String,
  schedule: {
    day: String,
    time: String,
    repeat: Boolean,
  },
  code: String,
  color: String,
  icon: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Class", classSchema);
