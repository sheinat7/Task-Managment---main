//task.jsx
import React from 'react';
import Checkbox from '../checkBoxComponent/CheckBox';

const Task = ({ task, onTaskChange }) => {
  return (
    <li>
      <Checkbox checked={task.done} onChange={() => onTaskChange(task.id)} label={task.task} />
    </li>
  );
};

export default Task;
