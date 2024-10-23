const express = require('express');
const { getProfile } = require('../controllers/profileController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// רואט לפרופיל, מוגן עם middleware לאימות
router.get('/', authMiddleware, getProfile);

module.exports = router;
