const mongoose = require("mongoose");

const todoListSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },
});
const ToDoList = mongoose.model(
    "ToDoList",
    todoListSchema
  );
  module.exports = ToDoList