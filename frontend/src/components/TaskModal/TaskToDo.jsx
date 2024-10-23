import React, { useState } from 'react';

const TaskToDo = ({ date, onClose, onSave }) => {
  const [task, setTask] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState('');
  const [images, setImages] = useState([]);

  console.log('TaskToDo component rendered');

  const handleImageChange = (event) => {
    const selectedImages = Array.from(event.target.files);
    setImages(selectedImages);
    console.log('Selected images:', selectedImages); // לוג של התמונות שנבחרו
  };

  const handleSubmit = () => {
    // ודא שהזמן תקין לפני השימוש
    const formattedTime = time || '12:00'; // אם אין זמן נבחר, השתמש בזמן דיפולטיבי

    const taskData = { title: task, description, date, time: formattedTime, images };
    console.log('Task to submit:', task); // לוג של שם המשימה
    console.log('Description:', description); // לוג של תיאור המשימה
    console.log('Date:', date); // לוג של תאריך המשימה
    console.log('Time:', formattedTime); // לוג של זמן המשימה
    console.log('Images:', images); // לוג של התמונות
    console.log('Submitting task data:', taskData); // לוג לפני שליחת
    if (task === '' || description === '' || formattedTime === '') {
      console.warn('Task, description, or time is missing!'); // אזהרה אם שדות חסרים
      return;
    }
    if (images.length === 0) {
      console.warn('No images selected!'); // אזהרה אם אין תמונות
    }
    console.log('Submitting task data:', taskData); // לוג לפני שליחת
    onSave(taskData);
    onClose();
  };

  return (
    <div>
      <h2>Add New Task</h2>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="שם המשימה"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="תיאור"
      />
      <input type="date" value={new Date(date).toISOString().split('T')[0]} readOnly />
      <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
      <input type="file" multiple onChange={handleImageChange} />
      <button onClick={handleSubmit}>Save</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default TaskToDo;
