const User = require('../models/User');
const Task = require('../models/Task');

// פונקציה להחזרת מידע על המשתמש והמשימות שלו
const getProfile = async (req, res) => {
  console.log('Received request for user profile:', req.user);
  console.log('Received request for user profile:', req.user.id);
  try {
    const user = await User.findById(req.user.id);
    const tasks = await Task.find({ userId: req.user.id });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        profilePicture: user.profilePicture,
      },
      tasks,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error });
  }
};

module.exports = { getProfile };
