import React, { useState } from 'react';
import Task from './Task';
import './style.css';

function AddRemove() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');

  const addTask = () => {
    if (taskText.trim() === '') return;
    setTasks([
      ...tasks,
      { text: taskText, id: Date.now(), isCompleted: false },
    ]);
    setTaskText('');
  };

  const removeTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => {
      if (task.id === taskId) {
        return !task.isCompleted;
      }
      return true;
    });

    setTasks(updatedTasks);
  };

  const toggleCompletion = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, isCompleted: !task.isCompleted };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const editTask = (taskId, newText) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, text: newText };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <div className="container">
      <div className="border-container">
        <div className="todo-app">
          <h1>todos</h1>
          <div className="add-task">
            <input
              type="text"
              placeholder="Add todo..."
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
            />
            <button type="button" onClick={addTask}>
              Add Task
            </button>
          </div>
          <ul className="task-list">
            {tasks.map((task) => (
              <Task
                key={task.id}
                task={task}
                onRemove={removeTask}
                onToggleCompletion={toggleCompletion}
                onEdit={editTask}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AddRemove;
