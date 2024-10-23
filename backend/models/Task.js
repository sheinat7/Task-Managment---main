const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  time: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  imageUrl: { type: String }, // הוסף שדה לתמונה
  completed: { type: Boolean, default: false },
});

module.exports = mongoose.model('Task', taskSchema);
