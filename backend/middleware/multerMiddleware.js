const multer = require('multer');

// הגדרה היכן וכיצד לאחסן את הקבצים
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // תיקייה בה יישמרו התמונות
  },
  filename: function (req, file, cb) {
    const userId = req.user.id; // הנח שיש לך גישה ל-id של המשתמש דרך req.user
    cb(null, `${userId}-${Date.now()}-${file.originalname}`); // שם הקובץ כולל את ה-id של המשתמש
  },
});

// יצירת אינסטנס של multer
const upload = multer({ storage: storage });

module.exports = upload;
