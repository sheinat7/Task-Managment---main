import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TaskDetail from '../Taskd/TaskDetail'; // ודא שהייבוא נכון
import { updateTask, removeTask } from '../redux/tasksSlice';
import axiosInstance from '../../api/axiosInstance';

const TaskList = ({ tasks }) => {
  const dispatch = useDispatch();
  const [selectedTask, setSelectedTask] = useState(null);

  console.log('Current tasks in TaskList:', tasks); // לוג של המשימות

  const handleComplete = async (id) => {
    console.log('Completing task with ID:', id); // לוג לפני עדכון
    if (!id) {
      console.error('No ID provided for completion');
      return; // אם אין ID, צא מהפונקציה
    }
    try {
      const response = await axiosInstance.patch(`/tasks/update/${id}`, { completed: true }); // שליחת הבקשה לעדכן את המשימה
      dispatch(updateTask({ id, completed: true })); // עדכון הסטייט של Redux
      setSelectedTask(null); // סגירת פרטי המשימה הנבחרת, אם פתוחה
      console.log('Task completed successfully:', response.data);
    } catch (error) {
      console.error('Error completing task:', error); // לוג שגיאה במידה ויש
    }
  };

  const handleDelete = async (id) => {
    console.error('No ID provided for deletion');
    console.log('Deleting task with ID:', id); // לוג לפני מחיקה
    try {
      await axiosInstance.delete(`/tasks/delete/${id}`); // שליחת הבקשה למחוק מהשרת
      dispatch(removeTask(id)); // עדכון הסטייט של Redux
      setSelectedTask(null); // סגירת פרטי המשימה הנבחרת, אם פתוחה
    } catch (error) {
      console.error('Error deleting task:', error); // לוג שגיאה במידה ויש
    }
  };

  return (
    <div>
      <h2>Your Tasks</h2>
      <ul>
        {tasks.length === 0 ? (
          <li>Empty List</li>
        ) : (
          tasks.map((task, index) => (
            <li key={task._id || index} onClick={() => setSelectedTask(task)}>
              {task.title} - {task.date} - {task.time}
            </li>
          ))
        )}
      </ul>
      {selectedTask && (
        <TaskDetail
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onComplete={handleComplete}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default TaskList;
