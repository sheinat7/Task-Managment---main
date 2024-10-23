const axios = require('axios');

// הגדרת ה-URL שלך
const backendApi = 'http://localhost:3000';

// פונקציה לשליחת בקשה לקבלת פרופיל משתמש
const getUserProfile = async () => {
  try {
    const response = await axios.get(`${backendApi}/profile`, {
      headers: {
        Authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MGZjMDhlMjgxNzlmNjA4NGY4NDU3OCIsImlhdCI6MTcyOTA4NTc3NiwiZXhwIjoxNzI5MDg5Mzc2fQ.RCpy5GTsKTNJbTUF9HsoIRz8MG_ZtUqA5JNNckiLiQQ', // אם אתה משתמש באימות, הכנס כאן את ה-token שלך
      },
    });
    console.log('User Profile:', response.data);
  } catch (error) {
    console.error(
      'Error fetching user profile:',
      error.response ? error.response.data : error.message,
    );
  }
};

// קריאה לפונקציה
getUserProfile();
