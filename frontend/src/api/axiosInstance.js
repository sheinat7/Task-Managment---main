import axios from 'axios';
import { backendApi } from './api'; // אם יש לך קובץ שמגדיר את ה-backendApi

const axiosInstance = axios.create({
  baseURL: backendApi || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// הוסף אינטרספטור שידאג להוסיף את ה-Authorization header לפני כל בקשה
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  const userId = localStorage.getItem('userId'); // הוסף את השורה הזו כדי לקבל את ה-ID של המשתמש
  console.log('Sending token:', token); // הוסף כאן לוג
  console.log('Sending user ID:', userId); // הוסף כאן לוג של ה-ID

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (userId) {
    config.headers['X-User-ID'] = userId; // הוסף את ה-ID כהכותרת
  }

  return config;
});

export default axiosInstance;
