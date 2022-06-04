import React, { Component } from 'react';

import NewTaskForm from './components/NewTaskForm';
import TaskList from './components/TaskList';
import Footer from './components/Footer';

import './App.css';

class App extends Component {
  constructor() {
    super();

    this.maxId = 1;

    this.state = {
      tasks: [],
      taskFilter: 'all',
    };

    this.onToggleDone = this.onToggleDone.bind(this);
    this.createNewTask = this.createNewTask.bind(this);
    this.addTask = this.addTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.clearCompletedTasks = this.clearCompletedTasks.bind(this);
    this.onCompletedFilter = this.onCompletedFilter.bind(this);
    this.onActiveFilter = this.onActiveFilter.bind(this);
    this.onAllFilter = this.onAllFilter.bind(this);
  }

  onToggleDone(id) {
    this.setState(({ tasks, taskFilter }) => {
      const newArray = tasks.map((el) => {
        if (el.id === id) {
          if (taskFilter === 'active') {
            return { ...el, done: !el.done, isVisible: false };
          }
          if (taskFilter === 'completed' && el.done === true) {
            return { ...el, done: !el.done, isVisible: false };
          }
          if (taskFilter === 'all') {
            return { ...el, done: !el.done };
          }
        }
        return el;
      });

      return {
        tasks: newArray,
      };
    });
  }

  onToggleFilter(array, boolean) {
    return this.doVisibleTasks(array).map((el) =>
      el.done === boolean ? el : { ...el, isVisible: false }
    );
  }

  onCompletedFilter() {
    const { tasks } = this.state;

    this.setState({
      tasks: this.onToggleFilter(tasks, true),
      taskFilter: 'completed',
    });
  }

  onActiveFilter() {
    const { tasks } = this.state;

    this.setState({
      tasks: this.onToggleFilter(tasks, false),
      taskFilter: 'active',
    });
  }

  onAllFilter() {
    const { tasks } = this.state;

    this.setState({
      tasks: this.doVisibleTasks(tasks),
      taskFilter: 'all',
    });
  }

  createNewTask(description) {
    const { taskFilter } = this.state;
    this.maxId++;

    return {
      description,
      done: false,
      isVisible: taskFilter !== 'completed',
      created: new Date(),
      id: this.maxId,
    };
  }

  addTask(text) {
    const newTask = this.createNewTask(text);

    this.setState(({ tasks }) => ({
      tasks: [newTask, ...tasks],
    }));
  }

  deleteTask(id) {
    this.setState(({ tasks }) => ({
      tasks: tasks.filter((el) => el.id !== id),
    }));
  }

  clearCompletedTasks() {
    this.setState(({ tasks }) => {
      const newArray = tasks.filter((el) => !el.done);
      return {
        tasks: newArray,
      };
    });
  }

  doVisibleTasks(array) {
    return array.map((el) => ({ ...el, isVisible: true }));
  }

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
          />
          <Footer
            onCompletedFilter={this.onCompletedFilter}
            onActiveFilter={this.onActiveFilter}
            onAllFilter={this.onAllFilter}
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
