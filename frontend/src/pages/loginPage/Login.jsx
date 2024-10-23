import React, { useState } from 'react';
import './login.module.css';
import Form from '../../components/formComponent/Form';
import axiosInstance from '../../api/axiosInstance'; // Axios instance
import { useNavigate } from 'react-router-dom'; // Import navigate

const Login = () => {
  const fields = [
    { name: 'email', type: 'email', label: 'Email', required: true },
    { name: 'password', type: 'password', label: 'Password', required: true },
  ];

  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = async (formData) => {
    try {
      const response = await axiosInstance.post('/login', formData);
      console.log('Login successful:', response.data);

      // הוסף כאן לוג עבור התגובה
      console.log('Response from server:', response.data);

      localStorage.setItem('authToken', response.data.token); // שמירת הטוקן ב-localStorage

      // ודא שה-ID של המשתמש נמצא בתגובה
      if (response.data.user && response.data.user._id) {
        localStorage.setItem('userId', response.data.user._id); // שמירת ה-ID ב-localStorage
        console.log('User ID saved:', response.data.user._id);
      } else {
        console.error('User ID not found in response');
      }

      navigate('/profile'); // ניווט לעמוד הפרופיל
    } catch (error) {
      console.error(
        'Error logging in:',
        error.response ? error.response.data.message : 'Something went wrong',
      );
    }
  };

  return (
    <div>
      <h2>Login Form</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Form fields={fields} onSubmit={handleSubmit}>
        Login
      </Form>
    </div>
  );
};

export default Login;
