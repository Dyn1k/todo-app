import React from 'react';

import PropTypes from 'prop-types';

import Task from '../Task';

import './TaskList.css';

function TaskList({ tasks, onDelete, onToggleDone, onEdit, filterValue }) {
  const filteredElements = tasks.filter((task) => {
    switch (filterValue) {
      case 'all': {
        return task;
      }
      case 'active': {
        return task.done === false;
      }
      case 'completed': {
        return task.done === true;
      }
      default: {
        return task;
      }
    }
  });

  const elements = filteredElements.map((task) => (
    <Task
      key={task.id}
      task={task}
      onDelete={() => onDelete(task.id)}
      onToggleDone={() => onToggleDone(task.id)}
      onEdit={onEdit}
    />
  ));

  return <ul className="todo-list">{elements}</ul>;
}

TaskList.defaultProps = {
  tasks: [],
  onDelete: () => {},
  onToggleDone: () => {},
  onEdit: () => {},
  filterValue: 'all',
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string,
      done: PropTypes.bool,
      isVisible: PropTypes.bool,
      created: PropTypes.shape(),
      id: PropTypes.number,
    })
  ),
  onDelete: PropTypes.func,
  onToggleDone: PropTypes.func,
  onEdit: PropTypes.func,
  filterValue: PropTypes.string,
};

export default TaskList;
