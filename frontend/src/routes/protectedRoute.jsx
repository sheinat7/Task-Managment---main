import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('authToken');

  // אם לא נמצא טוקן, העבר ל-login
  if (!token) {
    return <Navigate to="/login" />;
  }

  // אם יש טוקן, החזר את הילדים
  return children;
};

export default ProtectedRoute;
