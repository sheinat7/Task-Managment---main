import { createSlice } from '@reduxjs/toolkit';

const tasksSlice = createSlice({
  name: 'tasks',

  initialState: [],

  reducers: {
    // פעולה להוספת משימה חדשה
    addTask: (state, action) => {
      const { images, ...restOfTask } = action.payload;

      console.log('Adding task:', restOfTask); // לוג של נתוני המשימה
      console.log('Task images:', images); // לוג של התמונות

      // שמירת המשימה עם URLs לתמונות
      state.push({
        ...restOfTask,
        imageUrls: images.map((image) => image.url), // שמירת URL של כל תמונה
      });

      console.log('State after adding task:', state); // לוג של הסטייט לאחר הוספת המשימה
    },

    // פעולה לעדכון משימה קיימת לפי ה-ID
    updateTask: (state, action) => {
      const { id, completed } = action.payload;

      console.log('Updating task with ID:', id); // לוג של ID המשימה שמתעדכנת
      console.log('Completed status:', completed); // לוג של הסטטוס החדש

      const index = state.findIndex((task) => task._id === id);

      if (index !== -1) {
        state[index].completed = completed; // עדכון הסטטוס של המשימה
        console.log('Updated task:', state[index]); // לוג של המשימה לאחר העדכון
      } else {
        console.warn('Task not found for update:', id); // אזהרה אם לא נמצא ID
      }
    },

    // פעולה להחלפת כל המשימות בסט חדש
    setTasks: (state, action) => {
      console.log('Setting tasks:', action.payload); // לוג של כל המשימות שמתקבלות מהשרת

      const newTasks = action.payload.map((task) => ({
        ...task,
        imageUrls: task.images ? task.images.map((image) => image.url) : [], // שמירת URL-ים לתמונות
      }));

      console.log('New tasks after processing:', newTasks); // לוג של המשימות המעובדות
      return newTasks;
    },

    // פעולה למחיקת משימה לפי ה-ID
    removeTask: (state, action) => {
      console.log('Removing task with ID:', action.payload); // לוג של ה-ID של המשימה למחיקה
      const updatedState = state.filter((task) => task._id !== action.payload); // מחיקת המשימה על פי ה-ID
      console.log('State after task removal:', updatedState); // לוג של הסטייט לאחר המחיקה
      return updatedState;
    },
  },
});

// ייצוא הפעולות
export const { addTask, updateTask, setTasks, removeTask } = tasksSlice.actions;

// ייצוא ה-reducer
export default tasksSlice.reducer;
