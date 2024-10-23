import React from 'react';
import Button from '../buttonComponent/Button';

const TaskDetailsModal = ({ task, onClose, onComplete, onDelete }) => {
  if (!task) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>{task.title}</h3>
        <p>Date: {task.date}</p>
        <p>Time: {task.time}</p>
        <p>Description: {task.description}</p>
        {task.imageUrls && task.imageUrls.length > 0 && (
          <div>
            <h4>Images:</h4>
            {task.imageUrls.map((url, index) => (
              <img key={index} src={url} alt={`Task Image ${index}`} style={{ width: '100px' }} />
            ))}
          </div>
        )}
        <Button onClick={() => onComplete(task._id)}>Mark as Complete</Button>
        <Button onClick={() => onDelete(task._id)}>Delete Task</Button>
        <Button onClick={onClose}>Close</Button>
      </div>
    </div>
  );
};

export default TaskDetailsModal;
