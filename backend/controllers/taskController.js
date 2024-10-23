const Task = require('../models/Task');

const createTask = async (req, res) => {
  const { title, description, date, time, userId, images } = req.body;

  // בדוק שהשדות הנדרשים קיימים
  if (!title || !userId) {
    return res.status(400).send({ error: 'Title and User ID are required' });
  }

  const task = new Task({
    title,
    description,
    date,
    time,
    userId,
    images, // ודא שזה מתוארת נכון במודל
  });

  try {
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).send({ error: 'Failed to create task' });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find(); // מביא את כל המשימות
    res.status(200).json(tasks); // מחזיר את המשימות
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).send({ error: 'Failed to fetch tasks' });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).send({ error: 'Task not found' }); // אם המשימה לא נמצאה
    }
    res.status(200).send({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error); // הוסף לוג שגיאה
    res.status(500).send({ error: 'Failed to delete task' });
  }
};

// פונקציה להוספת משימה חדשה
const addTask = async (req, res) => {
  const { title, description, date, time } = req.body; // הוסף שדות נוספים לפי הצורך

  const newTask = new Task({
    title,
    description,
    date,
    time,
    images: req.files ? req.files.map((file) => file.path) : [], // שמירת נתיב הקובץ
  });

  try {
    const savedTask = await newTask.save();

    // החזרת הנתונים של המשימה החדשה
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).send({ error: 'Failed to add task' });
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const updates = req.body; // קבלת הנתונים לעדכון מה-body של הבקשה

  try {
    const updatedTask = await Task.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedTask) {
      return res.status(404).send({ error: 'Task not found' }); // אם המשימה לא נמצאה
    }
    res.status(200).send(updatedTask); // מחזיר את המשימה המעודכנת
  } catch (error) {
    console.error('Error updating task:', error); // הוסף לוג שגיאה
    res.status(500).send({ error: 'Failed to update task' });
  }
};

module.exports = { createTask, getAllTasks, deleteTask, addTask, updateTask };
