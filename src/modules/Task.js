import React, { useState } from 'react';
import PropTypes from 'prop-types';

function Task({
  task,
  onRemove,
  onToggleCompletion,
  onEdit,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(task.text);

  const handleSave = () => {
    onEdit(task.id, newText);
    setIsEditing(false);
  };

  return (
    <li className={`task ${task.isCompleted ? 'completed' : ''}`}>
      <div className="task-content">
        <input
          type="checkbox"
          checked={task.isCompleted}
          onChange={() => onToggleCompletion(task.id)}
        />
        <span className={`task-text ${task.isCompleted ? 'completed-text' : ''}`}>
          {isEditing ? (
            <input
              type="text"
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
            />
          ) : (
            task.text
          )}
        </span>
      </div>
      <div className="task-buttons">
        {isEditing ? (
          <button type="button" onClick={handleSave}>
            Save
          </button>
        ) : (
          <>
            <button type="button" onClick={() => setIsEditing(true)}>
              Edit
            </button>
            <button type="button" onClick={() => onRemove(task.id)}>
              Delete
            </button>
          </>
        )}
      </div>
    </li>
  );
}

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool.isRequired,
  }).isRequired,
  onRemove: PropTypes.func.isRequired,
  onToggleCompletion: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default Task;
