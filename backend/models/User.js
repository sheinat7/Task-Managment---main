// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  resetToken: {
    type: String,
    default: null,
  },
  resetTokenExpiration: {
    type: Date,
    default: null,
  },
  firstName: {
    // שם פרטי
    type: String,
    required: true,
  },
  lastName: {
    // שם משפחה
    type: String,
    required: true,
  },
  profilePicture: {
    // תמונת פרופיל
    type: String,
    default: null, // שדה אופציונלי
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
