const express = require('express');
const cors = require('cors');
const connectDB = require('./services/database');
const authRoutes = require('./routes/authRotes');
const tasksRoutes = require('./routes/tasksRoutes');
const profileRoutes = require('./routes/profileRoutes');
const upload = require('./middleware/multerMiddleware');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/', authRoutes);
app.use('/tasks', tasksRoutes);
app.use('/profile', profileRoutes);

// Upload route
app.post('/upload', upload.single('profilePicture'), (req, res) => {
  try {
    res.status(200).json({ message: 'File uploaded successfully', file: req.file });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading file', error });
  }
});

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
