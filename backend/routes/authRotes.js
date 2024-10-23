const express = require('express');
const {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
} = require('../controllers/authController');
const router = express.Router();

// נתיב לרישום משתמש
router.post('/register', registerUser);

// נתיב לכניסת משתמש
router.post('/login', loginUser);

// נתיב לשכחת סיסמה
router.post('/forgot-password', forgotPassword);

// נתיב לאיפוס סיסמה
router.post('/reset-password/:token', resetPassword);

// ניתן להוסיף נתיב GET כאן אם צריך
// router.get('/', (req, res) => { ... });

module.exports = router;
