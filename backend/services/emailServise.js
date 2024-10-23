const nodemailer = require('nodemailer');

// הגדר את המשלח
const transporter = nodemailer.createTransport({
  service: 'gmail', // או שירות דוא"ל אחר, כמו Yahoo, Outlook וכו'
  auth: {
    user: process.env.EMAIL_USER, // כתובת הדוא"ל שלך
    pass: process.env.EMAIL_PASSWORD, // הסיסמה שלך או App Password
  },
});

// פונקציה לשליחת דוא"ל
const sendEmail = (to, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL_USER, // כתובת המשלח
    to, // כתובת הנמען
    subject, // נושא ההודעה
    text, // תוכן ההודעה
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendEmail };
