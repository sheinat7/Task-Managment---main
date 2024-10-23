const express = require('express');
const {
  createTask,
  getAllTasks,
  deleteTask,
  addTask,
  updateTask,
} = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/multerMiddleware');
const router = express.Router();

router.post('/create', authMiddleware, createTask);
router.get('/get-all', authMiddleware, getAllTasks);
router.delete('/delete/:id', authMiddleware, deleteTask);
router.post('/add', upload.array('images'), addTask);
router.patch('/update/:id', updateTask);

module.exports = router;
