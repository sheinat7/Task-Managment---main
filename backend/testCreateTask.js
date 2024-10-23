const axios = require('axios');

// הגדרת ה-URL שלך
const backendApi = 'http://localhost:3000';

// פונקציה לשליחת בקשה ליצירת משימה
// פונקציה לשליחת בקשה ליצירת משימה
const createTask = async (title, description, date, time, userId) => {
  try {
    const response = await axios.post(
      `${backendApi}/tasks/create`,
      {
        title,
        description,
        date,
        time,
        userId, // ודא שהשדה הזה מכיל ID חוקי
      },
      {
        headers: {
          Authorization:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MGZjMDhlMjgxNzlmNjA4NGY4NDU3OCIsImlhdCI6MTcyOTI1MDQ2OCwiZXhwIjoxNzI5MjU0MDY4fQ.ceccAM1GHDx8na15fIafCsbb5YWyEYmkSOpY0Mybtow', // הכנס כאן את ה-token שלך
        },
      },
    );
    console.log('Task created successfully:', response.data);
  } catch (error) {
    console.error('Error creating task:', error.response ? error.response.data : error.message);
  }
};

// קריאה לפונקציה לדוגמה עם נתונים של משימה חדשה
const userId = '605c72efb8c8f23b4c4c7f4e'; // הכנס כאן את ה-ID של המשתמש הקיים שלך
createTask('Nikita', 'Description of the new task Nikita', new Date(), '12:00', userId);
