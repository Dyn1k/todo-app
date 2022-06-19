import React, { Component } from 'react';

import NewTaskForm from './components/NewTaskForm';
import TaskList from './components/TaskList';
import Footer from './components/Footer';

import './App.css';

class App extends Component {
  constructor() {
    super();

    this.id = 0;

    this.state = {
      tasks: [],
      taskFilter: 'all',
    };
  }

  onStartTimer = (id) => {
    this.setState(({ tasks }) => {
      const newArray = tasks.map((el) =>
        el.id === id ? { ...el, timer: el.timer - 1 } : el
      );
      return {
        tasks: newArray,
      };
    });
  };

  onToggleDone = (id) => {
    this.setState(({ tasks }) => {
      const newArray = tasks.map((el) =>
        el.id === id ? { ...el, done: !el.done } : el
      );
      return {
        tasks: newArray,
      };
    });
  };

  onToggleFilter = (e) => {
    this.setState({
      taskFilter: e.target.id,
    });
  };

  createNewTask = (description, timer) => {
    this.id += 1;

    return {
      description,
      timer,
      done: false,
      created: new Date(),
      id: this.id,
    };
  };

  addTask = (text, minutes, seconds) => {
    const newTask = this.createNewTask(text, minutes, seconds);

    this.setState(({ tasks }) => ({
      tasks: [newTask, ...tasks],
    }));
  };

  deleteTask = (id) => {
    this.setState(({ tasks }) => ({
      tasks: tasks.filter((el) => el.id !== id),
    }));
  };

  clearCompletedTasks = () => {
    this.setState(({ tasks }) => {
      const newArray = tasks.filter((el) => !el.done);
      return {
        tasks: newArray,
      };
    });
  };

  editTask = (id, taskText) => {
    this.setState(({ tasks }) => {
      const newArray = tasks.map((el) =>
        el.id === id ? { ...el, description: taskText } : el
      );
      return {
        tasks: newArray,
      };
    });
  };

  render() {
    const { tasks, taskFilter } = this.state;

    const todoCount = tasks.filter((el) => !el.done).length;

    return (
      <section className="todoapp">
        <NewTaskForm onAdd={this.addTask} />

        <section className="main">
          <TaskList
            tasks={tasks}
            onDelete={this.deleteTask}
            onToggleDone={this.onToggleDone}
            onEdit={this.editTask}
            onStartTimer={this.onStartTimer}
            filterValue={taskFilter}
          />
          <Footer
            onToggleFilter={this.onToggleFilter}
            clearCompletedTasks={this.clearCompletedTasks}
            filterValue={taskFilter}
            todo={todoCount}
          />
        </section>
      </section>
    );
  }
}

export default App;
