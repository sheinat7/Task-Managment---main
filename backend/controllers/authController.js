const User = require('../models/User'); // אם יש לך מודל משתמש
const { sendEmail } = require('../services/emailServise'); // עדכן את הנתיב אם צריך
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// פונקציה לרישום משתמש חדש
const registerUser = async (req, res) => {
  const { email, password, firstName, lastName, profilePicture } = req.body;

  // בדוק אם השדות לא ריקים
  if (!email || !password || !firstName || !lastName) {
    return res
      .status(400)
      .json({ message: 'Email, password, first name, and last name are required' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      password: hashedPassword,
      firstName, // הוסף את שם הפרטי
      lastName, // הוסף את שם המשפחה
      profilePicture, // הוסף את תמונת הפרופיל (אופציונלי, אם יש)
    });

    // שלח דוא"ל אישור רישום
    const subject = 'Welcome to Our Service';
    const text = `Hi ${newUser.firstName} ${newUser.lastName},\n\nThank you for registering with us! We are excited to have you on board.`;
    await sendEmail(newUser.email, subject, text);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Error registering user' });
  }
};

// פונקציה לכניסת משתמש
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // בדוק אם השדות לא ריקים
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid password' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // הוסף את ה-ID של המשתמש לתגובה
    res.status(200).json({ message: 'Login successful', token, user: { _id: user._id } });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Login failed' });
  }
};

// פונקציה לשליחת דוא"ל עם קישור לאיפוס סיסמה
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // צור קוד איפוס סיסמה ייחודי
    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetToken = resetToken;
    user.resetTokenExpiration = Date.now() + 3600000; // תוקף של שעה
    await user.save();

    // שלח דוא"ל עם קישור לאיפוס סיסמה
    const resetLink = `http://localhost:5173/reset-password/${resetToken}`;
    const subject = 'Password Reset Request';
    const text = `You requested a password reset. Click the link below to reset your password:\n\n${resetLink}`;
    await sendEmail(user.email, subject, text);

    res.status(200).json({ message: 'Reset password email sent' });
  } catch (error) {
    console.error('Error during password reset:', error);
    res.status(500).json({ message: 'Error sending reset email' });
  }
};

// פונקציה לאיפוס סיסמה
const resetPassword = async (req, res) => {
  const token = req.params.token;
  const { password } = req.body;

  try {
    // מצא את המשתמש לפי הטוקן
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiration: { $gt: Date.now() }, // בדוק אם הטוקן בתוקף
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    // כאן תקבע סיסמה חדשה למשתמש
    user.password = await bcrypt.hash(password, 10); // דאג להוסיף את bcrypt אם לא הוספת
    user.resetToken = undefined; // נקה את הטוקן לאחר האיפוס
    user.resetTokenExpiration = undefined; // נקה את תוקף הטוקן
    await user.save();

    res.status(200).json({ message: 'Password has been reset successfully!' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ message: 'Error resetting password' });
  }
};

module.exports = { registerUser, loginUser, forgotPassword, resetPassword };
