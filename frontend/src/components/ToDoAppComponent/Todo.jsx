import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTasks } from '../redux/tasksSlice';
import TaskList from '../TaskListComponent/TaskList';
import TaskToDo from '../TaskModal/TaskToDo';
import axiosInstance from '../../api/axiosInstance';
import Button from '../buttonComponent/Button';
import { format } from 'date-fns';

const TodoApp = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleAddTask = async (formData) => {
    try {
      const userId = localStorage.getItem('userId');
      const taskData = {
        title: formData.title,
        description: formData.description,
        date: formData.date || new Date().toISOString().split('T')[0], // אם התאריך לא תקין, השתמש בתאריך הנוכחי
        time: formData.time || '12:00', // אם הזמן לא תקין, השתמש בזמן ברירת מחדל
        images: formData.images || [],
        userId: userId,
      };

      console.log('Submitting task data:', taskData);
      await axiosInstance.post('/tasks/create', taskData);
      fetchTasks(); // Reload tasks after adding
      setIsModalOpen(false); // Close the modal
    } catch (error) {
      console.error('Error sending task:', error.response.data);
    }
  };

  const fetchTasks = async () => {
    console.log('Fetching tasks...');
    try {
      const response = await axiosInstance.get('/tasks/get-all');
      dispatch(setTasks(response.data));
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks(); // Fetch tasks on load
  }, [dispatch]);

  return (
    <div>
      <TaskList tasks={tasks} />
      {isModalOpen && (
        <TaskToDo
          date={selectedDate ? format(selectedDate, 'yyyy-MM-dd') : ''}
          onSave={handleAddTask}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      <Button onClick={() => setIsModalOpen(true)}>Add new task</Button>
    </div>
  );
};

export default TodoApp;
