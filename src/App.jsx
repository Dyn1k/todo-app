import React, { useState } from 'react';

import { v4 as uuid } from 'uuid';

import NewTaskForm from './components/NewTaskForm';
import TaskList from './components/TaskList';
import Footer from './components/Footer';

import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskFilter, setTaskFilter] = useState('all');

  const onStartTimer = (id, count) => {
    setTasks((item) =>
      item.map((el) => (el.id === id ? { ...el, timer: count } : el))
    );
  };

  const onToggleDone = (id) => {
    setTasks((item) =>
      item.map((el) => (el.id === id ? { ...el, done: !el.done } : el))
    );
  };

  const onToggleFilter = (e) => {
    setTaskFilter(e.target.id);
  };

  const createNewTask = (description, timer) => ({
    description,
    timer,
    done: false,
    created: new Date(),
    id: parseInt(uuid(), 16),
  });

  const addTask = (text, minutes, seconds) => {
    const newTask = createNewTask(text, minutes, seconds);

    setTasks((items) => [newTask, ...items]);
  };

  const deleteTask = (id) => {
    setTasks((items) => items.filter((el) => el.id !== id));
  };

  const clearCompletedTasks = () => {
    setTasks((items) => items.filter((el) => !el.done));
  };

  const editTask = (id, taskText) => {
    setTasks((items) =>
      items.map((el) => (el.id === id ? { ...el, description: taskText } : el))
    );
  };

  const todoCount = tasks.filter((el) => !el.done).length;

  return (
    <section className="todoapp">
      <NewTaskForm onAdd={addTask} />

      <section className="main">
        <TaskList
          tasks={tasks}
          onDelete={deleteTask}
          onToggleDone={onToggleDone}
          onEdit={editTask}
          onStartTimer={onStartTimer}
          filterValue={taskFilter}
        />
        <Footer
          onToggleFilter={onToggleFilter}
          clearCompletedTasks={clearCompletedTasks}
          filterValue={taskFilter}
          todo={todoCount}
        />
      </section>
    </section>
  );
};

export default App;
