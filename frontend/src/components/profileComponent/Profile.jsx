import React, { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
import Button from '../buttonComponent/Button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setTasks } from '../redux/tasksSlice';
import TodoApp from '../ToDoAppComponent/Todo';

const Profile = () => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/profile');
        console.log('User data fetched:', response.data); // לוג לאחר שליפת נתוני המשתמש
        setUserData(response.data.user || {});
        dispatch(setTasks(response.data.tasks || []));
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [dispatch]);

  const logout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{`${userData.firstName} ${userData.lastName}`}</h1>
      <TodoApp />
      <Button onClick={logout}>Logout</Button>
    </div>
  );
};

export default Profile;
